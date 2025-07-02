---
title: "so_long: 2D Game in C"
description: "The so_long project is a simple game in C that uses the MinilibX library for graphics and user input."
date: 2025-05-18
tags:
  - c
  - algorithm
---

# so_long

**so_long** is a basic 2D game written in C using the [MinilibX](https://harm-smits.github.io/42docs/libs/minilibx) library for rendering and handling input. The goal is to navigate a maze, collect all items, and reach the exit.

This project is part of the 42 curriculum and introduces key concepts like:

- graphics rendering with MinilibX
- keyboard event handling
- as usual, memory&resource management in C

![[Attachments/42Warsaw/so_long/Screenshot from 2025-05-18 14-01-15.png|600]]

## Key Requirements

- [[Indexes/Libft|Libft]]
- [ft_printf](Notes/c/ft_printf.md)
- [get_next_line](Articles/get_next_line.md)
- [MiniLibX](https://harm-smits.github.io/42docs/libs/minilibx) basics.
- The game should be able to load a map from any `.ber` file, as long as it follows the required format.

## Important Notes

It would be impossible to cover all parts of the project in this document, but here are some key points to _consider_:

- ⚠️ Proper parsing and validation of the map file (374 lines)
- ⚠️ Properly closing the window and freeing resources, including MLX related ones.
- ⚡️ Efficient handling of keyboard events (only ~60 lines!)

### Parsing and Validation

The map is represented as a 2D array of characters, in a `.ber` format, where each character represents a different type of tile in the game. The following characters are used:

- `1`: Wall
- `0`: Empty space
- `C`: Collectible item
- `E`: Exit
- `P`: Player starting position

Here is an example of a map:

```
111111111111111
1E0C0000C0000C1
111000C0000P001
100001111110001
1000100C0000111
1000C1000C00CC1
100010000000111
111111111111111
```

Here is my approach to parsing and validating the map:

```c
// Validate the map file format
void	val_file(char *path)
{
	size_t	len;

	len = ft_strlen(path);
	if (len < 4 || ft_strncmp(path + len - 4, ".ber", 4) != 0)
		handle_error("Invalid map file format. Expected .ber", 1);
}

/*
1. check_counts:
    - Counts all occurrences of each character in the map.
    - Updates the game structure with the count of collectibles (C).
    - Check if the map contains exactly one player (P), one exit (E), and at least one collectible (C).
    - If any of these conditions are not met, return 0.
2. check_reach:
    - Checks if the E and all C's are reachable from the P position.
    - If the exit is reachable, return 1.
    - If not, return 0.
*/
int	val_map(char **map, int height, t_game *game)
{
	int	width;

	width = ft_strlen(map[0]);
	if (!check_counts(map, height, width, game))
		return (0);
	if (!check_reach(map, height, width))
		return (0);
	return (1);
}

// Utilize our get_next_line function to read the map line by line,
// taking care of the newline at the end of last line.
void	parse_map(char ***map, int fd)
{
	int		i;
	char	*line;
	int		len;

	i = 0;
	while (1)
	{
		line = get_next_line(fd);
		if (line == NULL)
			break ;
		len = ft_strlen(line);
		if (len > 0 && line[len - 1] == '\n')
			line[len - 1] = '\0';
		(*map)[i++] = line;
	}
	(*map)[i] = NULL;
	if (i == 0)
	{
		free(*map);
		handle_error("Empty map file", 1);
	}
}

/*
Main function to validate the file format and map contents,
and return the parsed map as a 2D array of strings.
*/
char	**get_map(char *path, t_game *game)
{
	char	**map;
	int		fd;
	int		result;
	int		map_height;

	val_file(path);
	fd = open(path, O_RDONLY);
	if (fd == -1)
		handle_error(strerror(errno), 1);
	map_height = count_lines_fd(path);
	map = malloc((map_height + 1) * sizeof(char *));
	if (!map)
		handle_error("Malloc failed", 1);
	parse_map(&map, fd);
	result = val_map(map, map_height, game);
	if (!result)
	{
		free_2d(map);
		handle_error("Invalid map contents", 1);
	}
	close(fd);
	return (map);
}

```

### Memory Freeing

This is my go-to combo for this project. Let's have a look at these three functions:

```c
// MLX Exit function
int	handle_exit(void *param)
{
	t_game	*game;

	game = (t_game *)param;
	free_game(game);
	exit(0);
	return (0);
}

// Free the map
void	free_2d(char **arr)
{
	int	i;

	i = 0;
	while (arr[i])
	{
		free(arr[i]);
		i++;
	}
	free(arr);
}

// Free the game structure and all associated resources
void	free_game(t_game *game)
{
	if (game->img_wall)
		mlx_destroy_image(game->mlx, game->img_wall);
	if (game->img_floor)
		mlx_destroy_image(game->mlx, game->img_floor);
	if (game->img_player)
		mlx_destroy_image(game->mlx, game->img_player);
	if (game->img_exit)
		mlx_destroy_image(game->mlx, game->img_exit);
	if (game->img_collect)
		mlx_destroy_image(game->mlx, game->img_collect);
	if (game->win)
		mlx_destroy_window(game->mlx, game->win);
	if (game->map)
		free_2d(game->map);
	if (game->mlx)
	{
		mlx_destroy_display(game->mlx);
		free(game->mlx);
	}
}
```

#### `handle_exit`

`handle_exit` is used to handle the exit event when the user closes the window. It calls `free_game` to free all resources associated with the game, and the game is passed as a void pointer to the function.

Here is how the `handle_exit` function is used in the main loop:

```c
mlx_hook(game.win, 17, 0, handle_exit, &game);
```

#### `free_2d`

`free_2d` is a utility function that frees a 2D array of strs. It's used to free the map and a copy of map in case of any errors before the game starts, and also in the `free_game` function as you can see above.

#### `free_game`

Here everything is freed. The order of freeing is important, as some resources depend on others. For example, the window must be destroyed before the display is destroyed.

### Keyboard Events

The game uses keyboard events to handle player input. I went with arrow-keys for movement, but you can change it to WASD or any other keys you prefer.

Initially I had a lot of boilerplate code for handling keyboard events, and it was quite hard to come up with an efficient, short, norm-compliant solution. But I managed it. Let's have a look at the final version:

```c
// Move "P" to +dx +dy position
static void	update_player_position(t_game *game, t_pos p, int dx, int dy)
{
	game->map[p.y][p.x] = '0';
	game->map[p.y + dy][p.x + dx] = 'P';
	game->moves++;
	ft_printf("Movements: %d\n", game->moves);
	draw_map(game, game->height, game->width);
}

// Tile Interaction:
// 1. Don't allow moving into walls (1)
// 2. If the tile is an exit (E), check if all collectibles are collected
// 3. If the tile is a collectible (C), increment the count of collected items
static int	handle_tile_interaction(t_game *game, char tile)
{
	if (tile == '1')
		return (0);
	if (tile == 'E')
	{
		if (game->acquired_collectibles < game->map_counts.collectibles)
		{
			ft_printf("You must collect all collectibles first!\n");
			return (0);
		}
		handle_exit(game);
	}
	if (tile == 'C')
		game->acquired_collectibles++;
	return (1);
}

// Simple movement delta calculation
static int	get_movement_delta(int keycode, int *dx, int *dy)
{
	*dx = 0;
	*dy = 0;
	if (keycode == XK_Left)
		*dx = -1;
	else if (keycode == XK_Right)
		*dx = 1;
	else if (keycode == XK_Up)
		*dy = -1;
	else if (keycode == XK_Down)
		*dy = 1;
	else if (keycode == XK_Escape)
		return (-1);
	return (*dx != 0 || *dy != 0);
}

// Main function to handle keypress events
int	handle_keypress(int keycode, t_game *game)
{
	t_pos	p;
	int		dx;
	int		dy;
	char	tile;

	p = find_pos(game->map, game->height, game->width, 'P');
	if (p.x < 0 || p.y < 0)
		return (0);
	if (get_movement_delta(keycode, &dx, &dy) == -1)
		handle_exit(game);
	if (dx == 0 && dy == 0)
		return (0);
	tile = game->map[p.y + dy][p.x + dx];
	if (!handle_tile_interaction(game, tile))
		return (0);
	update_player_position(game, p, dx, dy);
	return (0);
}
```

This is how `handle_keypress` is used in the main loop:

```c
mlx_hook(game.win, 2, 1L << 0, handle_keypress, &game);
```

### Final Thoughts

This project was a great introduction to game development in C, and it helped me understand the basics of graphics rendering and user input handling in C. Good luck with your own projects!

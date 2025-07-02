---
title: "Flood Fill: Depth-First Search"
tags:
  - c
  - algorithm
  - article
date: 2025-02-04
---

**Flood Fill** is an algorithm that is used to color a connected area of pixels in an image. The algorithm starts at a given point and "floods" the area with a specific color. It is used in the "bucket fill" tool of paint programs to fill connected, similarly-colored areas with a different color.

In this study, we will discuss how to implement the Flood Fill algorithm in C, but not in the context of an image. Instead, we will use a 2D array to represent the image.

![[Untitled-2025-01-08-0424 (2).webp|600]]

# Subject

Write a function that takes a `char **` as a 2-dimensional array of char, a
`t_point` as the dimensions of this array and a `t_point` as the starting point.

Starting from the given 'begin' `t_point`, this function fills an entire zone
by replacing characters inside with the character 'F'. A zone is an group of
the same character delimitated horizontally and vertically by other characters
or the array boundry.

The flood_fill function won't fill diagonally.

The flood_fill function will be prototyped like this:

```c
void  flood_fill(char **tab, t_point size, t_point begin);
```

The t_point structure is prototyped like this: (put it in flood_fill.c)

```c
typedef struct  s_point
{
int           x;
int           y;
}               t_point;
```

Example:

```c
// test.c
#include <stdlib.h>
#include <stdio.h>

char** make_area(char** zone, t_point size)
{
	char** new;

	new = malloc(sizeof(char*) * size.y);
	for (int i = 0; i < size.y; ++i)
	{
		new[i] = malloc(size.x + 1);
		for (int j = 0; j < size.x; ++j)
			new[i][j] = zone[i][j];
		new[i][size.x] = '\0';
	}

	return new;
}

int main(void)
{
	t_point size = {8, 5};
	char *zone[] = {
		"11111111",
		"10001001",
		"10010001",
		"10110001",
		"11100001",
	};

	char**  area = make_area(zone, size);
	for (int i = 0; i < size.y; ++i)
		printf("%s\n", area[i]);
	printf("\n");

	t_point begin = {7, 4};
	flood_fill(area, size, begin);
	for (int i = 0; i < size.y; ++i)
		printf("%s\n", area[i]);
	return (0);
}
```

```shell
$> gcc flood_fill.c test.c -o test; ./test
11111111
10001001
10010001
10110001
11100001

FFFFFFFF
F000F00F
F00F000F
F0FF000F
FFF0000F
$>
```

# Solution

They were kind enough to provide us with a `t_point` structure that we can use to represent the dimensions of the 2D array and `test.c` to test our implementation.

Looking at 2D array `zone` in `test.c`, I think we all already can see that the `flood_fill` function should fill the area recursively.

**Let's do it!**

```c
typedef struct  s_point
{
    int           x;
    int           y;
}               t_point;

char get_val(char **area, t_point node){
    return(area[node.y][node.x]);
}

void check_val(char **area, t_point node){
    area[node.y][node.x] = 'F';
}

int is_valid(char **area, t_point size, t_point node, char c){
    if (node.x < 0 || node.x >= size.x || node.y < 0 || node.y >= size.y)
        return(-1);
    char next_node_val = get_val(area, node);
    if(next_node_val != c)
        return(-1);
    return(1);
}

void traverse(char **area, t_point size, t_point node, char c){
    if(is_valid(area, size, node, c) == 1){
        check_val(area, node);
        t_point arr[] = {
            {node.x, node.y+1}, //top
            {node.x, node.y-1}, //bottom
            {node.x+1, node.y}, // right
            {node.x-1, node.y} // left
        };
        int i = 3;
        while(i >= 0){
            t_point next_node = arr[i];
            traverse(area, size, next_node, c);
            i--;
        }
    }
}

void flood_fill(char **area, t_point size, t_point begin){
    char c = get_val(area, begin); // starting character
    traverse(area, size, begin, c);
}
```

Output with `size = {8, 5}` and `begin = {7, 4}`:

```shell
11111111
10001001
10010001
10110001
11100001

FFFFFFFF
F000F00F
F00F000F
F0FF000F
FFF0000F
```

Looks good!

> [!info]
> Keep in mind that the size is 1-indexed, while the begin point is 0-indexed. This distinction might be confusing at first, especially since `size_t` is commonly used for size representations in C.

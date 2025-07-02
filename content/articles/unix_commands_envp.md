---
title: Executing Unix Commands in C
description: A guide on how to find the full path of a command in the Unix environment and execute it safely
tags:
  - c
  - unix
date: 2025-04-08
---

Let's say you are working on a C program, which accepts a command as an argument or perhaps you just want to execute a shell command from your C program. In order to do so, you need to know the full path of the command.

Let's dive in this.


# Introduction

## envp

The `envp` variable is an array of strings that contains the environment variables for the current process. It is passed to the `main` function as a parameter, along with `argc` and `argv`.

```c
int main (int argc, char *argv[], char *envp[])
```

If we try to print the `envp` variable, we can see that it contains a quite large list of environment variables:

```
SHELL=/bin/bash
QT_ACCESSIBILITY=1
COLORTERM=truecolor
XDG_CONFIG_DIRS=/etc/xdg/xdg-ubuntu:/etc/xdg
NVM_INC=/home/vm_user/.nvm/versions/node/v22.5.1/include/node
XDG_MENU_PREFIX=gnome-
GNOME_DESKTOP_SESSION_ID=this-is-deprecated
GNOME_SHELL_SESSION_MODE=ubuntu
MEMORY_PRESSURE_WRITE=c29tZSAyMDAwMDAgMjAwMDAwMAA=
XMODIFIERS=@im=ibus
DESKTOP_SESSION=ubuntu
PATH=/home/vm_user/.local/bin:/home/vm_user/.bun/bin:/home/vm_user/.nvm/versions/node/v22.5.1/bin:/home/vm_user/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/snap/bin:/snap/bin:/home/vm_user/.local/bin:/usr/local/go/bin:/home/vm_user/.local/bin:/home/vm_user/.local/bin
```

The `PATH` variable is a colon-separated list of directories that the shell searches for executable files. When you type a command in the terminal, the shell looks for that command in the directories listed in `PATH`. If it finds the command, it executes it; otherwise, it returns an error.

For example, if you type `ls`, the shell searches for the `ls` executable in the directories listed in `PATH`. It will split the `PATH` variable into an array of strings using the colon (`:`) as a delimiter, each representing a directory. Then, it will check each directory in order until it finds the `ls` executable.

It will find the `ls` command in `/usr/bin/ls` directory and execute it.

> [!info]
> In order to find the full path of a command, you can use the `which` command in the terminal. For example, `which ls` will return `/usr/bin/ls`, which is the full path of the `ls` command 💡

## Plan

As you may have guessed, we will be using the `PATH` variable to find the full path of a command. We will split the `PATH` variable into an array of strings using [[Notes/c/libft/ft_split|ft_split]], each representing a directory. Then, we will check each directory using `access()`  until we find the executable file.


# Implementation

> [!warning]
> 1. All code is `norminette` compliant, therefore may be slightly hard to grasp at first.
> 2. We assume that [[Indexes/Libft|libft]] is imported: `ft_strjoin`, `ft_split`, `ft_strncmp` is used in this code.

## Start with the `main` function

```c
char	*get_cmd_path(char *cmd, char **envp)
{
	char	*path_env; // The PATH variable
	char	**paths; // Splitted PATH variable
	char	*result; // The full path of the command

    // ...
}
```

The `get_cmd_path` accepts two parameters: the command name and the `envp` variable. It will return the full path of the command if it exists, or `NULL` if it doesn't. Pretty intuitive here.

## Find the `PATH` in `envp`

First, let's write a function that will loop through the `envp` array to find the `PATH` environment variable:

```c
static void	find_env_path(char **envp, char **path_env)
{
	int	j;

	j = 0;
	*path_env = NULL;
	while (envp[j])
	{
		if (ft_strncmp(envp[j], "PATH=", 5) == 0)
		{
			*path_env = envp[j] + 5; // Skip "PATH="
			break ;
		}
		j++;
	}
}
```
This function will loop through the 2D `envp` array and check if the string starts with `PATH=`. If it does, it will set the `path_env` variable to point to the value of the `PATH` variable (i.e., the string after `PATH=`).

## Free 2D array

A simple function to free a 2D array of strings:

```c
void	free_2d(char **str)
{
	int	i;

	i = 0;
	while (str[i])
	{
		free(str[i]);
		i++;
	}
	free(str);
}
```

## Use `find_env_path` and `ft_split`

Let's return to the main `get_cmd_path` function for a second, use `find_env_path` and split the `PATH` variable into an array of strings using `ft_split`:

```c
char	*get_cmd_path(char *cmd, char **envp)
{
	char	*path_env; // The PATH variable
	char	**paths; // Splitted PATH variable
	char	*result; // The full path of the command

    find_env_path(envp, &path_env);
    if (!path_env)
        return (NULL);
    paths = ft_split(path_env, ':');
    if (!paths)
        return (NULL);
    // ...
}
```

## Find the command path

Now that we have the `PATH` variable and split it into an array of strings, we can move forward to find the full path of the command.

The next function will:
1. Split the `PATH` variable into an array of strings using `ft_split`
2. Loop through the array of directories, append the command name to each directory, and check if the directory exists using `access()`
3. If it exists, return the full path of the command, otherwise return `NULL`

Let's name it `find_cmd_path`:

```c
// accepts the splitted PATH variable and the command name
static char	*search_cmd_path(char **paths, char *cmd)
{
	char	*full_path;
	char	*tmp;
	int		i;

	i = 0;
	while (paths[i])
	{
		full_path = ft_strjoin(paths[i], "/");
		if (!full_path)
			break ;
		tmp = ft_strjoin(full_path, cmd);
		free(full_path);
		if (!tmp)
			break ;
		if (access(tmp, X_OK) == 0) 
		{
            // The command exists
			free_2d(paths);
			return (tmp);
		}
        // The command does not exist
		free(tmp);
		i++;
	}
	return (NULL);
}
```

Looks good!

## Finalize `get_cmd_path`

Now, let's finalize the `get_cmd_path` function by calling `search_cmd_path` and returning the result:

```c
char	*get_cmd_path(char *cmd, char **envp)
{
    char	*path_env;
    char	**paths;
    char	*result;

    find_env_path(envp, &path_env);
    if (!path_env)
        return (NULL);
    paths = ft_split(path_env, ':');
    if (!paths)
        return (NULL);
    result = search_cmd_path(paths, cmd);
	if (!result)
		free_2d(paths);
    return (result);
}
```

Now you can use the `get_cmd_path` function to find the full path of a command in the Unix environment. For example:

```c
#include <unistd.h>

int main(int argc, char **argv, char **envp)
{
    char *cmd_path;
    
    if (argc < 2)
    {
        write(2, "Usage: ./program <command>\n", 26);
        return (1);
    }
    
    cmd_path = get_cmd_path(argv[1], envp);
    if (cmd_path == NULL)
    {
        write(2, "Command not found\n", 18);
        return (1);
    }
    
    // Using execve to execute the command
    if (execve(cmd_path, &argv[1], envp) == -1)
    {
        write(2, "Error executing command\n", 24);
        return (1);
    }

    return (0);
}

```

# Code


```c
void	free_2d(char **str)
{
	int	i;

	i = 0;
	while (str[i])
	{
		free(str[i]);
		i++;
	}
	free(str);
}

static void	find_env_path(char **envp, char **path_env)
{
	int	j;

	j = 0;
	*path_env = NULL;
	while (envp[j])
	{
		if (ft_strncmp(envp[j], "PATH=", 5) == 0)
		{
			*path_env = envp[j] + 5;
			break ;
		}
		j++;
	}
}

static char	*search_cmd_path(char **paths, char *cmd)
{
	char	*full_path;
	char	*tmp;
	int		i;

	i = 0;
	while (paths[i])
	{
		full_path = ft_strjoin(paths[i], "/");
		if (!full_path)
			break ;
		tmp = ft_strjoin(full_path, cmd);
		free(full_path);
		if (!tmp)
			break ;
		if (access(tmp, X_OK) == 0)
		{
			free_2d(paths);
			return (tmp);
		}
		free(tmp);
		i++;
	}
	return (NULL);
}

char	*get_cmd_path(char *cmd, char **envp)
{
	char	**paths;
	char	*path_env;
	char	*result;

	find_env_path(envp, &path_env);
	if (!path_env)
		return (NULL);
	paths = ft_split(path_env, ':');
	if (!paths)
		return (NULL);
	result = search_cmd_path(paths, cmd);
	free_2d(paths);
	return (result);
}

int main(int argc, char **argv, char **envp)
{
    char *cmd_path;
    
    if (argc < 2)
    {
        write(2, "Usage: ./program <command>\n", 26);
        return (1);
    }
    
    cmd_path = get_cmd_path(argv[1], envp);
    if (cmd_path == NULL)
    {
        write(2, "Command not found\n", 18);
        return (1);
    }
    
    // Using execve to execute the command
    if (execve(cmd_path, &argv[1], envp) == -1)
    {
        write(2, "Error executing command\n", 24);
        return (1);
    }

    return (0);
}
```
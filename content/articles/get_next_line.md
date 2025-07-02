---
title: "GNL: Efficient Buffer Management"
tags:
  - c
  - project
  - article
date: 2025-02-02
---

The Get Next Line (GNL) is a project in C programming that requires reading a file line by line, while handling multiple file descriptors and maintaining the state of each file descriptor.

In this study, we will discuss how to write an optimized version of the GNL project.

# Prerequisites
- [Static Variables in C](Notes/c/static_variables.md)
- [Structs in C](Notes/c/structs.md)
- [Preprocessor Macros in C](Notes/c/preprocessor_macros.md)
- [File Descriptors in C](Notes/c/file_descriptors.md)
- [Inode Table](Articles/inode_table.md)

# Implementation

Let's split the problem into smaller parts. <br/>
We have to:
- Read a file line by line
- Save the lines in a buffer
- Check for New Line
- Return the line up to the New Line character if it exists
- Handle last line and EOF (end of file) cases

I will not guide you through the full implementation of the GNL project, but I will provide some tips on how to write efficient code. Writing it by yourself will help you understand the concepts better.

[🔗 My GNL implementation](https://github.com/devnyxie/42-projects/tree/main/get_next_line)

# Optimization

Since we can't know the `BUFFER_SIZE` in advance, it can be even `1`. <br/>
If the `BUFFER_SIZE` is `1`, we will have to call the `read` function for every single byte, which is extremely inefficient because the `read` function is a system call - it's expensive in terms of time. <br/>

Therefire we cannot optimize the `read` function, but surely we can optimize **how often we reallocate memory for the buffer**.

When I was first writing the GNL project, I was reallocating memory for the buffer in each iteration of the loop - it was an easy solution, since we could assume that we always have enough memory for the next read. But let's imagine the following scenarios:

**1. Expanding the buffer ⚠️**
- We have a file with one big line of text (let's say 1GB)
- We have a `BUFFER_SIZE` of `1`
- We are half way through the line, and for <u>each byte</u> we have to reallocate memory for the buffer - so we will have to reallocate 500MB of memory - this is extremely inefficient, and this is done for every single byte.

**2. Returning the line and moving memory ⚠️**
- Let's say we have found a new line, and we have to return the line up to the new line character.
- If we reallocate or move the memory for the buffer when we find a new line, in case of big lines, we again will have to move a lot of memory.

## Solution

Both issues can be solved by using a **Struct** to store the buffer data, buffer capacity, buffer end index, and buffer's start index. <br/>

```c
struct  s_buffer
{
	char	*data;
	size_t	capacity;
	size_t	start;
	size_t	end;
};
```

- `data` - the memory
- `capacity` - the maximum size of the buffer
- `start` - the start index of the buffer
- `end` - the end index of the buffer

By implementing such struct, we can avoid reallocating memory for the buffer in each iteration of the loop, **and** we can avoid moving memory when we find a new line. But how?

**1.Expanding the buffer ✅**
- Now using the struct, we can allocate memory for the buffer only when we need it. My approach was like this:
  - If the buffer is empty (start == end), we allocate initial size of the buffer, which is `BUFFER_SIZE` * 4. Let's say `BUFFER_SIZE` is `16`, so we allocate `64` bytes.
  - If the buffer has not enough space for the next read (`BUFFER_SIZE` + 1), we reallocate memory for the buffer, <u>doubling</u> the capacity of the buffer.

**2.Returning the line and moving memory ✅**
- When we find a new line, we don't have to move memory. We can just return the line up to the new line character, and update the `start` index of the buffer to the index of the new line character + 1. This way we can continue to work with existing buffer memory until we need to expand it.

# Testing

When you finish the implementation, you can test your GNL project with this [gnlTester](https://github.com/Tripouille/gnlTester) by [Tripouille](https://github.com/Tripouille).

If everything is working correctly, you should see the following output:

```shell {17, 18}
[Mandatory]
[BUFFER_SIZE = 1]: 
Invalid fd: 1.OK 2.OK 3.OK 
files/empty: 1.OK 2.OK 
files/nl: 1.OK 2.OK 
files/41_no_nl: 1.OK 2.OK 
files/41_with_nl: 1.OK 2.OK 3.OK 
files/42_no_nl: 1.OK 2.OK 
files/42_with_nl: 1.OK 2.OK 3.OK 
files/43_no_nl: 1.OK 2.OK 
files/43_with_nl: 1.OK 2.OK 3.OK 
files/multiple_nlx5: 1.OK 2.OK 3.OK 4.OK 5.OK 6.OK 
files/multiple_line_no_nl: 1.OK 2.OK 3.OK 4.OK 5.OK 6.OK 
files/multiple_line_with_nl: 1.OK 2.OK 3.OK 4.OK 5.OK 6.OK 
files/alternate_line_nl_no_nl: 1.OK 2.OK 3.OK 4.OK 5.OK 6.OK 7.OK 8.OK 9.OK 10.OK 
files/alternate_line_nl_with_nl: 1.OK 2.OK 3.OK 4.OK 5.OK 6.OK 7.OK 8.OK 9.OK 10.OK 
files/big_line_no_nl: 1.OK 2.OK 
files/big_line_with_nl: 1.OK 2.OK 
stdin: 1.OK 2.OK 3.OK 4.OK 5.OK 6.OK 7.OK 8.OK 9.OK 10.OK 
```

The most important part is on line 17 and 18. If you see `OK` for these tests, your GNL project is efficient and working correctly.
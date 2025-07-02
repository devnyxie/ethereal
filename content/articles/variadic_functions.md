---
title: Variadic Functions in C
date: 2025-01-06
tags:
  - c
---

Variadic Functions in C and C++ are functions that can take a variable number of arguments. The number of arguments can be zero or more. The arguments are passed to the function in a comma-separated list. The function can be called with any number of arguments.

For example, the printf function in C is a variadic function. It can take a variable number of arguments and print them to the standard output.
```c
#include <stdio.h>

int main(void) {
    int a = 10;
    int b = 20;
    printf("The sum of %d and %d is %d\n", a, b, a + b); // 3 arguments
    return 0;
}
```

# How to define
To define a variadic function in C, you need to use the ellipsis (...) in the argument list. The ellipsis (...) is used to indicate that the function can take a variable number of arguments.
```c
#include <stdarg.h>
#include <stdio.h>

void print_sum(int count, ...) {
    va_list args;
    va_start(args, count);
    int sum = 0;
    for (int i = 0; i < count; i++) {
        sum += va_arg(args, int);
    }
    va_end(args);
    printf("The sum is %d\n", sum);
}

int main(void) {
    print_sum(3, 10, 20, 30); // 3 args
    print_sum(5, 1, 2, 3, 4, 5); // 5 args
    return 0;
}
```
In the above example, the print_sum function takes an integer count as the first argument, followed by a variable number of integers. The `va_list`, `va_start`, `va_arg`, and `va_end` macros are used to access the variable arguments.

# Understanding Macros
- `va_list`: A type to hold the variable arguments.
- `va_start`: A macro to initialize the va_list; it takes the va_list and the last named argument as arguments.
- `va_arg`: A macro to access the variable arguments; it takes the va_list and the type of the argument as arguments.
- `va_end`: A macro to clean up the va_list; it takes the va_list as an argument.

# One more example

This time let's write a function that accepts any amount of strings and prints them. The last argument should be NULL to indicate the end of the list, since we can't determine the number of arguments without a "count" argument as in the previous example.

```c
#include <stdarg.h>
#include <stdio.h>

void print_strings(const char* first, ...) {
    va_list args;
    va_start(args, first);
    const char* str = first;
    while (str != NULL) {
        printf("%s ", str);
        str = va_arg(args, const char*);
    }
    va_end(args);
    printf("\n");
}

int main(void) {
    print_strings("Hello", "World", "C", "Programming", NULL);
    return 0;
}
```
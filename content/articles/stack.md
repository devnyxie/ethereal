---
title: "Stack Data Type in C"
date: 2025-02-06
tags:
  - c
  - algorithm
---

![[Untitled-2025-01-08-0424-1.webp|300]]

Today we will discuss how to implement a **Dynamic** Stack in C using a [[Notes/c/linked_lists|linked list]] approach. We will also implement the basic stack operations, such as `push`, `pop`, `peek` etc.

- [Wiki - Stack (abstract data type)](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>)
- [What is Stack Data Structure?](https://www.geeksforgeeks.org/introduction-to-stack-data-structure-and-algorithm-tutorials/)
- [Stack in C](https://www.scaler.com/topics/stack-in-c/)

let's begin;

# Stack Data Type

A stack is a linear data [[Notes/c/structs|structure]] that follows the **Last In First Out (LIFO)** principle. The last element that is added to the stack is the first element to be removed. We will implement a stack using a linked list, in order to have a dynamic, resizable stack.

# Implementation

```c
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int data;
    struct Node* next;
} Node;

void push(Node** top, int value) {
    Node* newNode = (Node*)malloc(sizeof(Node));
    if (!newNode) {
        // too many elements
        printf("Heap overflow!\n");
        exit(1);
    }
    newNode->data = value;
    newNode->next = *top;
    *top = newNode; // increase the top pointer
}

int pop(Node** top) {
    if (*top == NULL) {
        // no elements to pop
        printf("Stack underflow!\n");
        exit(1);
    }
    Node* temp = *top;
    int popped = temp->data;
    *top = (*top)->next; // decrease the top pointer
    free(temp);
    return popped;
}

int peek(Node* top) {
    if (top == NULL) {
        printf("Stack is empty!\n");
        exit(1);
    }
    return top->data;
}

void print_stack(Node* top) {
    Node* temp = top;
    while (temp != NULL) {
        printf("%d ", temp->data);
        temp = temp->next;
    }
    printf("\n");
}

int main() {
    Node* stack = NULL;

    push(&stack, 10);
    push(&stack, 20);
    push(&stack, 30);

    print_stack(stack);

    // pop the top element
    printf("Popped: %d\n", pop(&stack));

    print_stack(stack);
    return 0;
}
```

```shell
devnyxie:stacks$ ./a.out
# that's what will happen under the hood:
# 1. push 10
#   top -> [10 | NULL]
# 2. push 20
#   top -> [20 | *] -> [10 | NULL]
# 3. push 30
#   top -> [30 | *] -> [20 | *] -> [10 | NULL]
30 20 10 # 30 is the top of the stack
Popped: 30
20 10 # 20 is the top of the stack
```

> [!info]
> In the `push()` operation, we check for overflow by verifying if memory allocation succeeds, and in the `pop()` operation, we check for underflow when the stack is empty. While underflow is a common issue in linked list-based stacks, overflow occurs only when the system runs out of available heap memory (Memory Exhaustion).

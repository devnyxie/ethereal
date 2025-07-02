---
title: "push_swap: Bitwise Radix Sort"
tags:
  - algorithm
  - c
  - project
  - article
date: 2025-03-10
description: The Bitwise Radix Sort implementation for the push_swap project.
---

Hey!

It's been a while, `push_swap` is quite a project.

# Requirements

- [Radix Sort](Articles/radix.md)
- [[Articles/stack|Stacks]]
- Willingness to learn

# Walkthrough

First things first, we'll skip the entire stack implementation and instruction functions, which take up around 300 lines of code. By now, you should already be familiar with stacks. Instead, we'll focus on the sorting algorithm itself, as it's the core of the project.

The overall logic is similar to regular Radix Sort, but instead of processing large numbers directly, we work with the bits of their **indices**, which represent their relative order in the stack. This process is often called "coordinate compression" or "discretization".

For example, if we have [-5, 100, 2, -10], we'd simplify it to [1, 3, 2, 0]. This way, we can sort the indices instead of the numbers themselves, which is much, much faster.

```c title="radix.c"
void	radix_sort(t_list **stack_a, t_list **stack_b)
{
	t_list	*head_a;
	int		i;
	int		j;
	int		size;
	int		max_bits;

	i = 0;
	head_a = *stack_a;
	size = ft_lstsize(head_a);
	max_bits = get_max_bits(stack_a);
	while (i < max_bits) // for each bit of the biggest number in the `a` stack.
	{
		j = 0;
		while (j++ < size) // for each number in the `a` stack.
		{
			head_a = *stack_a;
			if (((head_a->index >> i) & 1) == 1)
				ra(stack_a);
			else
				pb(stack_a, stack_b);
		}
		while (ft_lstsize(*stack_b) != 0)
			pa(stack_a, stack_b);
		i++;
	}
}
```

Let's break down the code:

- `head_a` is a pointer to the head of the `a` stack, which is updated in each iteration using `*stack_a`.
- `size` is the size of the `a` stack, which is used to determine the number of iterations in the **inner** loop.
- `max_bits` is the maximum number of bits in the numbers in the `a` stack, which is the number of iterations in the **outer** loop.

In the outer loop, we iterate `max_bits` times, basically going through all the bits of the numbers in the `a` stack. In the inner loop, we iterate through the `a` stack, and if the `i`'th bit of the number (`((head_a->index >> i) & 1)`) is `1`, we rotate the `a` stack, otherwise we push the number to the `b` stack. After the inner loop, we push all the numbers from the `b` stack back to the `a` stack and increment `i`.

Therefore after each iteration, greatest numbers will be at the top of the `a` stack, and the smallest numbers will be at the bottom. 

> [!warning]
> It is very important to understand that we are sorting based on binary representation of the **indices** of the numbers in the `a` stack, not the numbers themselves. If you are confused, I recommend you to going through **visualizing the algorithm** section.

> [!hint]
> It is in your own interest to implement a second alogirthm, to sort the numbers when the stack size is small. The amount of instructions can be minimized by using a different sorting algorithm for small stack sizes, or even hardcoding the instructions for a stack size of 3 or less.

# Visualizing the Algorithm

Let's go through the **bitwise radix sort** step by step for the list `[40, 12, 3, 21, 0, 5]`.

---

## **Step 1: Assign Indices**
Since `push_swap` works with **indexed values**, we first assign an index based on sorted order:

| Value | Sorted Order | Index  | Binary Representation |
|-------|-------------|--------|----------------------|
| 0     | 0th         | **0**  | `000` |
| 3     | 1st         | **1**  | `001` |
| 5     | 2nd         | **2**  | `010` |
| 12    | 3rd         | **3**  | `011` |
| 21    | 4th         | **4**  | `100` |
| 40    | 5th         | **5**  | `101` |

We have **6 elements** and the highest index is `5`, which is **`101` (3 bits needed)**.

---

## **Step 2: Sorting by LSB**
We check the **rightmost bit (bit 0)**:

| Index | Binary | Bit 0 |
|--------|--------|------|
| 0      | 000    | **0** → `pb` |
| 1      | 001    | **1** → `ra` |
| 2      | 010    | **0** → `pb` |
| 3      | 011    | **1** → `ra` |
| 4      | 100    | **0** → `pb` |
| 5      | 101    | **1** → `ra` |

After processing `stack_a`:
```
stack_a: [1, 3, 5]  (all 1s in bit 0)
stack_b: [0, 2, 4]  (all 0s in bit 0)
```

Push `stack_b` back:
```
stack_a: [1, 3, 5, 0, 2, 4]
stack_b: []
```

---

## **Step 3: Sorting by Bit 1**
We check the **second bit (bit 1)**:

| Index | Binary | Bit 1 |
|--------|--------|------|
| 1      | 001    | **0** → `pb` |
| 3      | 011    | **1** → `ra` |
| 5      | 101    | **0** → `pb` |
| 0      | 000    | **0** → `pb` |
| 2      | 010    | **1** → `ra` |
| 4      | 100    | **0** → `pb` |

After processing `stack_a`:
```
stack_a: [3, 2]  (all 1s in bit 1)
stack_b: [1, 5, 0, 4]  (all 0s in bit 1)
```

Push `stack_b` back:
```
stack_a: [3, 2, 1, 5, 0, 4]
stack_b: []
```

---

## **Step 4: Sorting by MSB**
We check the **third bit (bit 2)**:

| Index | Binary | Bit 2 |
|--------|--------|------|
| 3      | 011    | **0** → `pb` |
| 2      | 010    | **0** → `pb` |
| 1      | 001    | **0** → `pb` |
| 5      | 101    | **1** → `ra` |
| 0      | 000    | **0** → `pb` |
| 4      | 100    | **1** → `ra` |

After processing `stack_a`:
```
stack_a: [5, 4]  (all 1s in bit 2)
stack_b: [3, 2, 1, 0]  (all 0s in bit 2)
```

Push `stack_b` back:
```
stack_a: [5, 4, 3, 2, 1, 0]  (Sorted!)
stack_b: []
```

---

## **Final Sorted Indices**
When we map these back to original values:
```
[0, 3, 5, 12, 21, 40]
```
Which is the correctly sorted order! 🎉


# Conclusion

The `push_swap` project is a great opportunity to learn about sorting algorithms and data structures. The bitwise radix sort is a unique and efficient way to sort numbers, especially when dealing with large datasets. Good luck with your project!

# Inspiration

- [Bitwise Radix Sort Implementation](https://github.com/42YerevanProjects/push_swap)

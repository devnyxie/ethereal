---
title: Counting Sort in C
tags:
  - algorithm
  - c
date: 2025-02-27
description: Counting Sort is a sorting algorithm that sorts the elements of an array by counting the number of occurrences of each unique element in the array.
---

Counting Sort is a sorting algorithm that sorts the elements of an array by counting the number of occurrences of each unique element in the array. It is a **non-comparison-based** sorting algorithm that has a time complexity of `O(n + k)`, where `n` is the number of elements in the array and `k` is the range of the input (the difference between the maximum and minimum values respectively). It is often used as a subroutine in other sorting algorithms like **Radix Sort**.

> [!warning]
> Counting Sort is used when the range of input values is not significantly greater than the number of elements in the array, otherwise, it is absolutely inefficient.

# Algorithm

The algorithm for Counting Sort can be broken down into the following steps:

1. Find the maximum and minimum values in the array.
2. Create an array for counting of size `k` (where `k` is `max - min + 1`) and initialize all elements to 0.
3. Count the occurrences of each element in the input array and increment the corresponding index in the count array.
4. Overwrite the input array with the sorted elements by iterating over the count array and placing the elements in the correct order.

# Implementation

So, sounds pretty simple, right? Find maximum and minimum, create a count array, count the occurrences, and overwrite the input array. Let's see how we can implement this in C.

Let's start with `find_min_max` function:

```c
void find_min_max(int *arr, int size, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > *max) {
            *max = arr[i];
        } else if (arr[i] < *min) {
            *min = arr[i];
        }
    }
}
```

> [!info]
> `*min = *max = arr[0]` is a common idiom in C to initialize multiple variables to the same value. It is equivalent to `*min = arr[0]; *max = arr[0];`. Also, the loop starts from `i = 1` because we’ve already initialized *min and *max to arr[0]. So, there's no need to compare arr[0] with itself.

Next, let's start to implement the `counting_sort` function:

```c
void counting_sort(int *arr, int size) {
    if (size == 0) return;

    int min, max;
    find_min_max(arr, size, &min, &max);
    int range = max - min + 1; 
    // ...
}
```
> [!info]
> Why `+ 1`? Well, because we need to include the maximum value in the range as well! For example, if the minimum value is 4, and the maximum value is 8, `8 - 4 = 4`, which is incorrect - the last is missing! So, we need to add 1 to include the maximum value in the range.

Now, we have the minimum and maximum values in the array, and we have calculated the range of the input.
Using the `range`, we can now allocate the memory for all digits in the range from `min` to `max` for the count array:

```c
    // ...
    int *count = (int *)calloc(range, sizeof(int));
    if (count == NULL) return;
    // ...
```

> [!info]
> `calloc` is used to avoid garbage interference in the memory.

Going further, we can count the occurrences of each element in the input array now:

```c
    // ...
    for (int i = 0; i < size; i++) {
        count[arr[i] - min]++; // 
    }
    // ...
```

> [!info]
> `- min` is used in order to shift the range of the input array to start from 0 in the count array. This is because the count array is initialized to 0, and we need to start counting from 0. For example, if the minimum value is 4, and the current element is 4, then `4 - 4 = 0`, which is the index of the element in the count array. If we would start from `4`, we would simply run out of bounds of the count array.

This is how the count array (occurences) would look like:

```
Original array:
4 2 2 8 3 3 1 

Occurences:
1 2 3 4 5 6 7 8 9 
↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ 
0 1 2 2 1 0 0 0 1 
```

As you can see above, now we have an array that contains the number of occurrences of each element in the input array. The only thing left to do, is to overwrite the input array with the sorted elements. We will start iterating over the occurences array and simply add as many numbers as the count of the current numbers says.

That's how we can do it:

```c
    // ...

    int sorted_index = 0;

    // for 0 up to range
    for (int i = 0; i < range; i++) {
        // for each occurrence of the number (i)
        while (count[i] > 0) {
            arr[sorted_index] = i + min;
            sorted_index++;
            count[i]--;
        }
    }
    // ...
```


> [!info]
> Here `min` is added to the index `i` to get the actual value of the element. This is because we have shifted the range of the input array to start from 0 in the count array (i.e., `arr[i] - min`) before, and now we need to shift it back to the original range.

That's how this part would sort the array:

```bash
arr[0] set to 1
arr[1] set to 2
arr[2] set to 2
arr[3] set to 3
arr[4] set to 3
arr[5] set to 4
arr[6] set to 8
```

Neat, right?

Finally, we should free the memory allocated for the count array of course:

```c
    // ...
    free(count);
```

And that's it! We have successfully implemented the Counting Sort algorithm in C. 

Let's put it all together:

```c
#include <stdio.h>
#include <stdlib.h>

void find_min_max(int *arr, int size, int *min, int *max) {
    *min = *max = arr[0];
    for (int i = 1; i < size; i++) {
        if (arr[i] > *max) {
            *max = arr[i];
        } else if (arr[i] < *min) {
            *min = arr[i];
        }
    }
}

void printArray(int *arr, int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

void counting_sort(int *arr, int size) {
    if (size == 0) return;

    int min, max;
    find_min_max(arr, size, &min, &max);
    int range = max - min + 1;
    int *count = (int *)calloc(range, sizeof(int));
    if (!count) return;

    for (int i = 0; i < size; i++) {
        count[arr[i] - min]++;
    }

    int sorted_index = 0;
    for (int i = 0; i < range; i++) {
        while (count[i] > 0) {
            arr[sorted_index++] = i + min;
            count[i]--;
        }
    }

    free(count);
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int size = sizeof(arr) / sizeof(int);

    printf("Original array:\n");
    printArray(arr, size);

    counting_sort(arr, size);

    printf("Sorted array:\n");
    printArray(arr, size);

    return 0;
}
```

```
Original array:
4 2 2 8 3 3 1 

Occurences:
1 2 3 4 5 6 7 8 
↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ 
1 2 2 1 0 0 0 1 

arr[0] set to 1
arr[1] set to 2
arr[2] set to 2
arr[3] set to 3
arr[4] set to 3
arr[5] set to 4
arr[6] set to 8

Sorted array:
1 2 2 3 3 4 8
```

> [!quote]
> "A flower does not think of competing with the flower next to it. It just blooms." - Zen Shin
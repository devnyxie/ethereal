---
title: Quick Sort in C
tags:
  - algorithm
  - c
date: 2025-02-06
---

Quick Sort is a popular sorting algorithm that uses the **Divide and Conquer** strategy. It is an efficient, in-place sorting algorithm that has an average time complexity of `O(n log n)`.

`O(n log n)` is the best time complexity we can achieve for a comparison-based sorting algorithm. Quick Sort is widely used in practice because of its efficiency and simplicity.

# How Quick Sort Works

Quick Sort works by selecting a **pivot** element from the array and partitioning the other elements into two sub-arrays according to whether they are less than or greater than the pivot. Then, it recursively sorts the sub-arrays using the same technique.
![[Untitled-2025-01-08-0424 (1).png]]

# Implementation

Sample data to sort:

```c
int data[] = {7, -2, 13, 6, 81, 5, 3, 42};
```

```c
void swap(int *arr, int a, int b){
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
}

void quicksort(int *arr, int start, int end){
        if(start >= end) return;
        int pivot = arr[end];

        int i = start;
        int j = start;
        while(j < end){
                if(arr[j] < pivot){
                        swap(arr, i, j);
                        i++;
                }
                j++;
        }
        swap(arr, i, end);
        quicksort(arr, 0, i-1);
        quicksort(arr, i+1, end);
}

int main(void){
        int size = 5;
        int arr[] = {800, 70, 6, 9, 1};
        quicksort(arr, 0, size-1);

        int i = 0;
        while(i < size){
                printf("%i ", arr[i]);
                i++;
        }
        printf("\n");
        return(0);
}
```

The most important part of the Quick Search algorithm is to select right pivot element. The pivot element can be selected in different ways. The simplest way is to select the last element of the array as the pivot element. However, this can lead to poor performance if the array is already sorted. In that case, the time complexity of the algorithm becomes `O(n^2)`. To avoid this, we can select the pivot element randomly (yikes) or by using the **median of three** method.

## Median of Three

The **median of three** method selects the pivot element as the median of the first, middle, and last elements of the array. This method provides better performance than selecting the pivot element randomly or always selecting the last element.

```c
int median_of_three(int *arr, int start, int end) {
    if ((end - start) < 2) {
        return end;
    }
    int mid = start + (end - start) / 2;

    if ((arr[start] > arr[mid]) != (arr[start] > arr[end])) {
        return start;
    } else if ((arr[end] > arr[start]) != (arr[end] > arr[mid])) {
        return end;
    }
    return mid;
}

void swap(int *arr, int a, int b){
        int temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
}

void quicksort(int *arr, int start, int end){
        if(start >= end) return;
        // Select the pivot element
        int pivot_index = median_of_three(arr, start, end);
        // Move the pivot element to the end (out of the way)
        swap(arr, pivot_index, end);
        int pivot = arr[end];

        int i = start;
        int j = start;
        while(j < end){
                if(arr[j] < pivot){
                        swap(arr, i, j);
                        i++;
                }
                j++;
        }
        swap(arr, i, end);
        quicksort(arr, 0, i-1);
        quicksort(arr, i+1, end);
}
```

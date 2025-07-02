---
title: "Really Random Numbers in Go"
date: 2025-06-08
tags:
  - go
  - cryptography
---
# Introduction
Let's say you want to generate a random integer. Very basic task, right? Here:
```go
package main

import (
    "fmt"
    "math/rand"
)

func main() {
    arr := make([]string, 5)
    for i := 5; i > 0; i-- {
        student[i] := fmt.Sprintf("Student %d", i)
    }
    random_num := rand.Intn(len(arr))
    fmt.Printf("Chosen student: %s\n", arr[random_num])

}
```
As of Go 1.24 the `rand()` doesn't need any explicit declaration of seeding to generate random numbers, it is set randomly on each start of the program.
```bash
go run .
Chosen student: Student 3
go run .
Chosen student: Student 1
go build -o app
./app
Chosen student: Student 4
./app
Chosen student: Student 3
```

> [!info]
> What is a seed? A seed is an initial value that inits a pseudo-random number generator, determining the sequence of numbers it produces. Using the same seed will always generate the same sequence of random numbers.

So, you might already get where I'm going. In most of the languages, core `random()` functions are *pseudo-random* - which means that the outputs might be easily predicted regardless of how they're seeded.

# Solution
For anything security-sensitive, there is a better approach though. It's not a secret that we can utilize `dev/urand` in order to get really, really random numbers that cannot be predicted.

> [!info]
> `/dev/urandom` is a special file on Unix-like systems that provides **cryptographically secure random bytes**. It gathers entropy from various unpredictable system sources (like mouse movements, keyboard timings, hardware noise) and outputs random data you can safely use for security stuff, like generating keys or tokens.

```go
package main

import (
	"crypto/rand"
	"encoding/binary"
	"fmt"
)

func main() {
	students := make([]string, 5)
	for i := 0; i < 5; i++ {
		students[i] = fmt.Sprintf("Student %d", i+1)
	}

	var num uint32
	/*
		Read 4 random bytes from /dev/urandom
		And push each one of them into var num
	*/
	err := binary.Read(rand.Reader, binary.BigEndian, &num)
	if err != nil {
		panic(err)
	}

	fmt.Println("Random student:", students[num%uint32(len(students))])
}
```
Now, this easy, we have a way to randomize safe random numbers for anything security-sensitive.
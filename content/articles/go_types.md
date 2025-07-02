---
title: Go Types in Depth
date: 2025-06-15
tags:
  - go
---

# Core Types
## Strings
```go
var s string = "Hello"
```
## Numbers
```go
var i int = 42
i := 42
var u uint = 100  // unsigned
var f float64 = 3.14 // float
```
## Boolean
```go
var b bool = true
```

# Structs
```go
type User struct {
    Name string
    Age  int
}

u := User{Name: "John", Age: 30}
fmt.Println(u.Name)
fmt.Println(u)
// John
// {John 30}
u := User{}
fmt.Println(u)
// (nothing)
```


# Arrays & Slices
## Arrays (Fixed Size)
```go
var arr [3]int = [3]int{1, 2, 3}
// or
arr := [3]int{1, 2, 3}
```
## Slices (Dynamic)
```go
var nums []int = []int{1, 2, 3}
// or
nums := []int{1, 2, 3}
nums = append(nums, 4)
```
Slices come with their own methods, which makes working with them extremely user friendly:
- append -> add elems
- copy -> copy from slice A to slice B
- len -> length
- cap -> capacity

> [!info]
> 👉 Arrays are rarely used directly in Go — slices are much more common!
> It's very easy to convert an array to a slice too, here:

## Transformation
It's no secret that you can transform `arrays` into `slices` with ease. Let's have a look how:
```go
arr := [3]int{1, 2, 3}
slice := arr[:] // slice now refers to the whole array
```

So now, variable `slice` points to the same memory as `arr` does. So if we change `slice`, it affects `arr` too.
Example:
```go
arr := [3]int{1, 2, 3}
slice := arr[:]

slice[0] = 100
fmt.Println(arr)
fmt.Println(slice)
/*
[100 2 3]
[100 2 3]
*/
```

However, it’s important to understand they share memory **only as long as possible**. For example, if you do:
```go
slice = append(slice, 5)
```
Go will create a **new underlying array** for `slice` (now with 4 elements). After this, `arr` and `slice` are **no longer synced**.

# JSON
Struct for marshalling/unmarshalling:
```go
type User struct {
    Name string `json:"name"`
    Age  int    `json:"age"`
}

u := User{Name: "John", Age: 30}
jsonData, _ := json.Marshal(u)
fmt.Println(string(jsonData))

// Unmarshal:
var u2 User
json.Unmarshal(jsonData, &u2)
fmt.Println(u2.Name)
```

# Maps
A **map** is a built-in Go data type that stores key-value pairs, where each key is unique and maps to a value. Also, maps are **reference types** (like pointers) – just like in C.
## Syntax
```go
var m map[keyType]valueType
```
## Examples
### Map
```go
m := map[string]int{
    "apple":  5,
    "banana": 10,
}
fmt.Println(m["apple"])
```
### JSON
```go
import (
    "encoding/json"
    "fmt"
)

func main() {
    m := map[string]interface{}{
        "name":  "John",
        "age":   30,
        "likes": []string{"Go", "JSON", "Maps"},
    }
    // Convert map to JSON string
    jsonData, err := json.Marshal(m)
    if err != nil {
        panic(err)
    }
    fmt.Println(string(jsonData))
}
```

You can also parse `JSON` into maps:
```go
var m map[string]interface{}
jsonStr := `{"name":"John","age":30}`

err := json.Unmarshal([]byte(jsonStr), &m)
if err != nil {
    panic(err)
}

fmt.Println(m["name"]) // John

```
> [!info]
> - Since JSON values can be strings, numbers, bools, arrays, objects, etc., we use `interface{}` as the map value type to handle this flexibility.
> - Why `[]byte`? `json.Unmarshal()` expects raw bytes, not a string. Fortunately, Go allows us to get a binary buffer (raw bytes) with ease using `[]byte()` helper.


# Pointers
Pointers in Go work very similarly to pointers in C: you still have `&` and `*`, just without the pointer arithmetic, aka `str++`.
# Interfaces
*An **interface** in Go is a type that defines a set of method signatures; any type that implements those methods automatically satisfies the interface.*

In other words, **If a type has these methods — it is this interface.**
An interface **unites different types** (structs, etc.) that share common behavior (i.e. methods).  
You don’t care _what_ the type is — you only care that it can do something (has certain methods).

Let's go over this amazing example:
```go
type Speaker interface { Speak() }

type Person struct { Name string }
func (p Person) Speak() { fmt.Println("I'm", p.Name) }

type Robot struct { ID int }
func (r Robot) Speak() { fmt.Println("Beep boop, ID:", r.ID) }

func Greet(s Speaker) { s.Speak() }

func main() {
    p := Person{Name: "John"}
    r := Robot{ID: 42}

    Greet(p) 
    Greet(r) 
}
```

Give yourself some time to read and understand the code above.

We create an interface `Speaker`, which has a function `Speak()` inside.  
Then we create a `Person` and a `Robot`, and both of them can speak.  
We also create a `Greet()` function, which accepts _**only**_ `Speaker`s.

The beauty of Go is that as soon as we declare that `Robot` and `Person` have a `Speak()` method, they automatically satisfy the `Speaker` interface (in other words, they get *promoted* to *speakers*). Therefore, we can use the `Greet()` function on both `Person` and `Robot` now.

## Empty Interface
```go
var anything interface{}
anything = "string"
anything = 123
anything = []string{"a", "b"}
```
But in modern Go we usually prefer `any`:
```go
var anything any = 123
```

# Channels

In Go, **channels** let *goroutines* talk to each other safely without locks.

Think of channels like pipes:

- One goroutine writes data in.
- Another goroutine reads data out.

---

## Basic channel

```go
ch := make(chan int)

go func() {
    ch <- 42 // send 42
}()

val := <-ch  // receive value
fmt.Println(val) // 42
```

### Closing channels

```go
close(ch)
```

Signals that no more data will be sent.
### Channels block!
- **Send blocks** if no one is reading.
- **Receive blocks** if nothing is sent yet.
This is why they synchronize goroutines automatically.

### Buffered channels

You can make channels with buffer:

```go
ch := make(chan int, 2) // buffered channel size 2

ch <- 1
ch <- 2
// now buffer full, next send would block
```

Buffered channels don’t block until buffer is full.

So even in the following example, the usage of a buffered channel is a must in order to avoid **deadlock error**:
```go
func main() {
	ch := make(chan int, 2)
	var wg sync.WaitGroup
	wg.Add(2)
	
	go func() {
		defer wg.Done()
		ch <- 1
		fmt.Println("First goroutine")
	}()
	
	go func() {
		defer wg.Done()
		ch <- 2
		fmt.Println("Second goroutine")
	}()
	
	wg.Wait()
	close(ch)
	for v := range ch {
		fmt.Println(v)
	}
}
```


### Range over channel
Make sure to close the channel before going through it in order to avoid errors!
```go
ch := make(chan int)

go func() {
    for i := 0; i < 3; i++ {
        ch <- i
    }
    close(ch)
}()

for val := range ch {
    fmt.Println(val)
}
```

---

👉 Channels are Go’s way to avoid shared memory problems.  
**“Don’t communicate by sharing memory; share memory by communicating.”**

---
# Declaration & Allocation

> [!info]
> In Go, each variable is automatically initialized to it's default value: `""` for a `String`, `0` for an `int` and so on.

> [!info]
> In Go, it's common **not** to explicitly define the type of a variable. Instead, we use the `:=` operator to let the compiler infer the type.

## Basic
```go
var x int       // zero value 0
var s string    // zero value ""
var a [3]int    // array of 3 ints, zeroed
var p *int      // pointer, zero value nil
```
## Using `new()`
Allocates zeroed memory for **any type** and returns a **pointer** to it. It doesn’t initialize internal structures like slices, maps, or channels. It’s rarely used directly because simpler zero-value declarations or composite literals are preferred.
```go
p := new(int)      // *int pointer to zero int (0)
pArr := new([5]int)// *[5]int pointer to zeroed array
```
## Using `make()`
Allocates and initializes internal data structures (**slices, maps, and channels**).
```go
s := make([]int, 5)        // slice with length 5, underlying array allocated
m := make(map[string]int)  // initialized map ready to use
ch := make(chan int)       // initialized channel ready to use
```
## Composite literals
```go
a := [3]int{1, 2, 3}          // array literal
s := []int{1, 2, 3}           // slice literal
m := map[string]int{"a": 1}   // map literal
p := &Person{Name: "John"}    // pointer to struct literal
```

> [!info]
> - `Person{Name: "John"}` — creates a **struct value** directly. It's like a full copy of that struct.
>   -> Use if you want to pass by value, or store a copy.
> - `&Person{Name: "John"}` — creates the struct value **and then returns a pointer** to it.
>    -> Use if you want to work with a pointer, just like in C.
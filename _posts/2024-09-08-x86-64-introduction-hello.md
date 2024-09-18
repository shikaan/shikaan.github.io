---
title: "A friendly introduction to assembly for high-level programmers — Hello"
description: A friendly introduction to assembly for high-level programmers — Hello
categories: ["assembly", "x86", "guide"]
date: "2024-09-08"
commentLink: "https://news.ycombinator.com/item?id=41571971"
---

Coming from JavaScript, Rust, C, or any other high-level language, looking at assembly snippets can be confusing or even scary.

Let's take the following snippet:
```nasm
section .data
  msg db "Hello, World!"

section .text
  global _start

_start:
  mov rax, 1
  mov rdi, 1
  mov rsi, msg
  mov rdx, 13
  syscall

  mov rax, 60
  mov rdi, 0
  syscall
```
Thankfully the second line gives away what this does.

None of the bread and butter of programming as we know it is here: conditionals and loops are nowhere to be seen, there is no way to create functions... heck, variables don't even have names!

Where does one even start?

This little introduction is meant to introduce you, somebody with programming experience, to the world of assembly. We'll discuss the basics of the language and map them to high-level programming constructs.

By the end of this guide, you will be able to navigate assembly code, know where to look for information, and even write some simple programs all by yourself.

Let's get started!

## Hello world

Unsurprisingly, our first program will be a "Hello World".

Before jumping into the code though, we need to briefly introduce the language we'll be using. At the end of this section, we will be able to write and run our first assembly program.

### x86-64 assembly

First things first, assembly is not a language.

Assembly refers to a _family of programming languages_ featuring instructions that closely map to the machine code that the CPU will execute. In fact, one of the raisons d'etre of assembly languages is to provide a human-readable version of machine code in situations like reverse engineering, hardware programming, or developing games for consoles.

In this guide, we will use _x86-64 assembly_ which can be assembled and executed on most personal computers. This choice should ease running and tinkering with the snippets along the way. 

For historical reasons, there are two "flavors" of the x64-64 assembly syntax: one called _Intel_ and the other is called _AT&T_[^1]. 

In this guide we will stick to the _Intel_ dialect because it's used by the [Intel Software Developer Manuals (SDM)](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html), the source of truth on what the CPU _really_ does when fed an instruction.

Assembly is all about working close to the hardware. Optimizimg for portability of the code examples across operative systems and architactures would obfuscate the content of this introduction.

The snippets we will be written for Linux, and they should run fine on Window's WSL as well. The general concepts and practices are nonetheless valid regardless of your OS of choice.

### Anatomy of an instruction

Instructions are the way we tell the CPU what to do. They look something like this:

```nasm
mov rax, rbx
```

They represent the smallest unit of assembly language and are mostly composed of two parts:

* **mnemonic**: a shortened word or sentence that specifies the operation to be performed
* **operands**: a list of 0-3 items representing what's affected by the operation

In our example, the mnemonic is `mov`, which stands for _move_, and the operands are `rax` and `rbx`. This instruction in plain English would read: move the content of `rbx` to `rax`.

> **Note**
>
> `rax` and `rbx` are registers and we will introduce them in the next paragraph. In the meantime, you can imagine them as variables holding a value.

Some instructions will have more then mnemonic and operands. Additional parts such as _prefixes_ and _size directives_ will only be needed later, and we'll talk through them at the right moment.

Fear not, there is no need to memorize all the possible instructions now. Whenever we'll come across new operations, we will discuss them, and with repetition you will remember in no time.

The [Intel Software Developer Manuals (SDM)](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html) will be our instruction reference in the next chapters. Keep it handy!

### Storing data: Registers

You can think of registers as storage space baked right into the CPU itself. They are small and incredibly fast to access.

The most common registers are the so-called _general purpose_ registers. In x86-64 they are sixteen in total, and they are 64 bits wide. 

One can access the whole register or a subset by using different names. For example, using `rax` (as in the code above) would address all the 64 bits in the `rax` register. With `al`, you can access the lower byte of the same register.

| Register | Higher byte | Lower byte | Lower 2 bytes¹ |	Lower 4 bytes² |
|:---      |:---         |:---        |:---            |:---             |
| rax      | ah	         | al	        | ax             | eax             |
| rcx      | ch	         | cl	        | cx	           | ecx             |
| rbx      | bh	         | bl	        | bx             | ebx             |
| rdx      | dh	         | dl	        | dx             | edx             |
| rsp      |    	       | spl	      | sp	           | esp             |
| rsi      |             | sil        | si             | esi             |
| rdi      |             | dil        | di             | edi             |
| rbp      |             | bpl        | bp	           | ebp             |
| r8       |             | r8b        | r8w            | r8d             |
| r9       |             | r9b        | r9w	           | r9d             |
| r10      |             | r10b       | r10w           | r10d            |
| r11      |             | r11b       | r11w           | r11d            |
| r12      |             | r12b       | r12w           | r12d            |
| r13      |             | r13b       | r13w           | r13d            |
| r14      |             | r14b       | r14w           | r14d            |
| r15      |             | r15b       | r15w           | r15d            |

<sup>
¹: 2 bytes are sometimes called words (hence the w suffix)
</sup><br>
<sup>
²: 4 bytes are sometimed called double-words or dwords (hence the d suffix)
</sup>

General purpose means that they can store anything in principle. In practice, we'll see that some registers have special meanings, some instructions only use certain registers, and some conventions dictate who is expected to write where.

The only non-general-purpose register we will look at today is `rip` the _instruction pointer_ register. It holds the address of the next instruction to execute, and therefore, modifying `rip` allows programs to jump to arbitrary instructions in the code.

### Our first assembly file

Assembly files typically have an `.s` or `.asm` extension and they are split in sections. We will mostly be concerned with two sections:
* **data**: where we define constants and initialized variables;
* **text**: where we will type our code, this is the only mandatory section of the file.

```nasm
section .data
  ; data here

section .text
  ; code here
```

> **Note**
>
> The semicolon `;` is the comment character: whatever comes after it will not be executed.

Assembly programs run as you would expect. They start with the first instruction and sequentially execute one instruction after the other, from top to bottom. To create control flow, such as conditionals and loops, we make our programs 'jump' to specific instructions. We will look at jumps in detail in the next sections.  

Just as you'd use a `main` function in many high-level languages, assembly requires us to specify an entry point for our program. We do this using the `global` declaration, which points to a _label_.

Labels are the assembly's way of giving human-readable names to specific instructions. They serve two purposes: making our code more understandable and allowing us to reference these instructions elsewhere in our program. You can declare a label by writing it followed by a colon, like this: `label:`. When you want to reference a label (for example, in a jump instruction), use it without the colon: `label`.

Typically, `global` references a `_start` label declared immediately after it. That is where our program will start executing.

```nasm
section .data
  ; data here

section .text
  global _start
_start:
  ; instructions here
```

### At last, "Hello World"

Finally, we have all the tools to build software in assembly. Very Nice!

Our program will use two system calls: `sys_write` to print characters in a terminal and `exit` to terminate the process with a given status code.

Using syscalls goes like this:
- select the syscall to invoke by moving its identifier in `rax`
- pass arguments to the syscall by populating appropriate registers
- use the `syscall` instruction to fire the call

The only other instruction we will use is `mov` which we have seen in the instruction paragraph. It works pretty much like an assignment (the `=` operator) in many high-level languages: it moves the content of the second operand into the first operand.

Let's look at the code to see how this plays together. 

> **Coding along**
>
> Throughout this series, we'll use an embedded editor to tinker with the code and run the examples as we go. The same content can be found in the sibling repository [shikaan/x86-64-asm-intro](https://github.com/shikaan/x86-64-asm-intro) if you want to run locally.
>
> All the snippets are commented to explain what's going on step by step. Make sure you read the comments carefully!

<code-editor exercise="01-hello.asm"></code-editor>

### Conclusion

We have a "hello world"! 

In this first article, we learned some basic assembly concepts, we cut our teeth on its syntax, and we even wrote some working software. Moreover, we explored how to communicate with the operative system and are ready to produce more interesting programs [in the next article]({% post_url 2024-09-16-x86-64-conditionals %}).

{% include post-footer.html %}

---

[^1]: You can read up on the differences between Intel and AT&T syntax [here](https://imada.sdu.dk/u/kslarsen/dm546/Material/IntelnATT.htm). If it's your absolute first time with assembly, it might be a little too early to make sense of it. Feel free to come back to this link in a couple of lessons.

{% include code-editor.html %}

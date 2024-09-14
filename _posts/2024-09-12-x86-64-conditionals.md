---
title: "A friendly introduction to assembly for high-level programmers — Conditionals"
description: "A friendly introduction to assembly for high-level programmers — Conditionals"
categories: ["assembly", "x86", "guide"]
date: "2024-09-12"
---

In the previous lesson, we learned about the basics of the assembly's syntax and managed to create a program with just two instructions.

We will spend this lesson learning more instructions and use this knowledge to translate the first high-level construct into assembly: conditionals.

## Control Transfer Instructions

The execution of a program generally goes like this:
* look at the instruction pointed by the `rip` (the instruction pointer register)
* execute the instruction
* increase the `rip` to point to the next instruction

And this goes on forever, until we exit from the program, for example issuing an `exit` syscall[^1].
Programs have the option of breaking this rule using _Control Transfer Instructions_ (CTIs).

There are three types of CTIs: unconditional, conditional, and software interrupts. 

The first two entail proceeding with the program's execution from a different instruction than the one on the following line. The last one is used to hand back control to the operative system. 

We will not explicitly touch software interrupts here[^2] since it goes beyond the scope of this introduction. 

We will then focus on conditional and unconditional CTIs, the first one of which is `jmp` (jump).

## Unconditional jumps

Jump works a bit like a shell game: it tricks our program by changing the `rip` (the instruction pointer) during the execution; the CPU then continues from the instruction at `rip`, oblivious of the scam they've just been part of.

Syntactically, a jump looks like 
```x86asm
jmp label
```
where the operand represents the destination instruction. 

The destination can be an absolute or a relative address. An absolute destination is the exact address where we want the execution to continue from; it can be represented with numbers or, more commonly, with labels. Relative destinations, on the other hand, are signed offsets with respect to the `rip`.

In pseudo high-level code, this would read
```typescript
// Absolute addressing
// jmp 80H
rip = 0x80

// Relative addressing
// jmp +80H
rip += 0x80
```

> **Hexadecimals**
>
> Addresses are generally referenced using hexadecimal numbers (i.e., numbers in base 16). In assembly, base 16 numbers are commonly suffixed with an `H`. In the example above, `80H` means `80` in base 16, which in turn translates to `128` in base 10.

The attentive readers will have noticed that the jump we just described does not depend on any condition: if the program reaches that line, it'll jump. This makes this instruction _unconditional_.

Let's see an example in action.

{% include asm.html exercise="" %}

## Conditional Jumps

As you might have guessed, we will implement conditional control flow using _conditional_ CTIs. Thankfully, we already did most of the work: jumps also come in conditional flavor.

---

[^1]: Or due to a power cut and other more dramatic endings for your program... 

[^2]: I say _explicitly_ because, for example, the `syscall` instruction may issue an interrupt. The cooperation between operative systems and user programs makes for a fascinating world in its own right and discussing it here would do it no justice. If you are curious, you can consult any operative systems book. Personal recommendation, [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) and in particular [this chapter](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf).

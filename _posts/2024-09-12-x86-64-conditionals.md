---
title: "A friendly introduction to assembly for high-level programmers — Conditionals"
description: "A friendly introduction to assembly for high-level programmers — Conditionals"
categories: ["assembly", "x86", "guide"]
date: "2024-09-12"
---

[In the previous article]({% post_url 2024-09-08-x86-64-introduction-hello %}), we learned about the basics of the assembly's syntax and managed to create a program with just two instructions. Quite impressive!

We will spend this lesson learning more instructions and use this knowledge to translate the first high-level construct into assembly: conditionals.

## Control Transfer Instructions

The sequence of instructions the CPU decodes and executes is called _instruction stream_. You can picture it as an array whose indices are the _addresses_ of the instructions[^1].

The currently executed instruction is the one whose address is the value in the `rip` register, which is why we call it the _instruction pointer_ register.

In pseudo-code, the execution of a program would read something like this
```javascript
while (!exited) {
  // Fetch the instruction at `registers.rip`
  instruction = instruction_stream[registers.rip]
  // Execute the instruction and return the
  // address of the next instruction.
  next_pointer = instruction.execute()
  // Assign the new address to `rip` to fetch
  // a new instruction on next iteration.
  registers.rip = next_pointer
  // ...handle hardware and other side effects...
}
```

Most of the time, the execution is linear: instructions are executed one after the other in the order they are coded, top to bottom. Some instructions, however, can break this convention and are called _Control Transfer Instructions_ (CTIs). 

The CTIs we will focus on are categorized as _conditional_ and _unconditional_, and they make control flow possible in assembly by allowing execution of nonconsecutive instructions. Software interrupts are the other type of CTI; we won't explicitly touch them here[^2] since they are tightly intertwined with operative systems beyond the scope of this series.

The first CTI we will explore is `jmp` (jump).

## Unconditional jumps

Jumps allow executing code at an arbitrary position in the instruction stream. All they need to do is update the `rip` and, on the next cycle, the CPU will pick up the instruction at the new address.

Syntactically, a jump looks like this
```nasm
jmp label
```
Where the operand represents the destination instruction.

Almost always, the destination is a label, and in plain English, the instruction above reads: "Continue the execution from the instruction whose label is `label`."

The assembler, the software that turns assembly into machine code, translates the labels into a numeric address of the instruction stream and, on execution,  it will be assigned to `rip` as described above.

In fact, numeric addresses and relative offsets to `rip` are all valid destinations, but they are usually more in vogue among machines than humans. For example, compilers with optimization flags or disassemblers tend to prefer using numeric addressing than labels.

The attentive readers will have noticed that the jump we just described does not depend on any condition: if the program reaches that line, it'll jump. This makes this instruction _unconditional_.

Let's see an example in action. 

We will use [the same hello world example of the first lesson]({% post_url 2024-09-08-x86-64-introduction-hello %}). We will make it more human-readable by introducing jumps to break the code into smaller chunks. En passant, we will introduce numeric constants to remove magic numbers from our code and make it more legible.

{% include asm.html exercise="02-hello-with-jumps.asm" %}

## Conditional Jumps

As you might have guessed, we will implement conditional control flow using _conditional_ CTIs. Thankfully, we already did most of the work: jumps also come in conditional flavor.

--

[^1]: This mental model is not entirely made up. Emulators, software used to emulate hardware (guest) on other hardware (host), represent instruction streams as arrays in the host system. If you are interested in emulation, [CHIP-8](https://en.wikipedia.org/wiki/CHIP-8) is a great place to start. [This a good guide](https://austinmorlan.com/posts/chip8_emulator/) should you want to get your hands dirty.

[^2]: I say _explicitly_ because, for example, the `syscall` instruction may issue an interrupt. The cooperation between operative systems and user programs makes for a fascinating world in its own right and discussing it here would do it no justice. If you are curious, you can consult any operative systems book. Personal recommendation, [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) and in particular [this chapter](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf).

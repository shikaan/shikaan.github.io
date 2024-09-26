---
title: "A friendly introduction to assembly for high-level programmers — Conditionals"
description: "A friendly introduction to assembly for high-level programmers — Conditionals"
categories: ["assembly", "x86", "guide"]
date: "2024-09-16"
series: A friendly introduction to assembly for high-level programmers
---

[In the previous article]({% post_url 2024-09-08-x86-64-introduction-hello %}), we learned about the basics of the assembly's syntax and managed to create a program with just two instructions. Quite impressive!

We will spend this lesson learning more instructions and use this knowledge to translate the first high-level construct into assembly: conditionals.

{% assign series_name = page.series %} {% include collection.html name=series_name %}

## Control Transfer Instructions 

Remember those old movies where computers were fed with long tapes of instructions? Surprisingly, today's lightning-fast CPUs still work similarly, but executing instructions coming from a sequence of bytes in memory. We call this sequence the _instruction stream_, and the unique position of each instruction an _address_. As we saw in the previous article, the address of the instruction currently being executed is stored in the `rip` register, which is why we call it the _instruction pointer_.

Imagining the instruction stream as an array whose indices are the addresses[^1], the execution of a program in pseudo-code would read something like this:
```
while not exited
  // Fetch the instruction at `registers.rip`
  instruction = instruction_stream[registers.rip]
  // Execute the instruction and return the
  // address of the next instruction.
  next_pointer = instruction.execute()
  // Assign the new address to `rip` to fetch
  // a new instruction on the next iteration.
  registers.rip = next_pointer
  // Handle side effects (we won't look into this)
```

Most of the time, the execution is linear: instructions are executed one after the other, in the order they are coded. Some instructions, however, can break this convention and are called _Control Transfer Instructions_ (CTIs). 

CTIs come in three flavors: _conditional_, _unconditional_, and _software interrupts_. We'll focus on the first two, as they are the foundation of control flow in assembly, allowing the execution of non-consecutive instructions. Software interrupts, while interesting, are closely intertwined with operating systems and beyond the scope of this series[^2]. 

The first CTI we will explore is `jmp` (jump).

### Unconditional jumps

Jumps allow executing code at an arbitrary position in the instruction stream. All they need to do is update the `rip` and, on the next cycle, the CPU will pick up the instruction at the new address.

Syntactically, a jump looks like this
```nasm
jmp label
```
where the operand represents the destination instruction.

Almost always, the destination is a label, and in plain English, the instruction above reads: "Continue the execution from the instruction whose label is `label`."

The assembler, the software that turns assembly into machine code, translates the labels into a numeric address of the instruction stream and, on execution, it will be assigned to `rip` as described above.

In fact, numeric addresses and relative offsets to `rip` are all valid destinations, but they are usually more in vogue among machines than humans. For example, compilers with optimization flags or disassemblers prefer using numeric addressing rather than labels.

The attentive readers will have noticed that the jump we just described does not depend on any condition: if the program reaches that line, it'll jump. This makes this instruction _unconditional_.

Let's see an example in action. 

We will use [the same hello world example from the first lesson]({% post_url 2024-09-08-x86-64-introduction-hello %}). We will make it more human-readable by introducing jumps to break the code into smaller chunks. En passant, we will introduce numeric constants to remove magic numbers from our code.

<code-editor exercise="02-hello-with-jumps.asm"></code-editor>

### Conditional Jumps

As you might have guessed, we will implement conditional control flow using _conditional_ CTIs and in particular _conditional jumps_. Don't worry – we've already laid the groundwork with jumps, and conditional jumps are just an extension of the same concept.

Coming from high-level languages, you might be used to versatile conditional statements like `if`, `unless`, or `when`. Assembly takes a different approach. Instead of a few all-purpose conditionals, it provides a large number of specialized instructions for specific checks.

Fortunately, these instructions follow logical naming conventions that make them easier to remember. Let's check an example out.

```nasm
jne label
```
Here, `label` refers to an instruction in our code, just like we saw with unconditional jumps. In plain English, this would read "**J**ump to `label`, if **N**ot **E**qual." 

The following table provides mappings to navigate the most common conditional jumps[^3]:

| Letter        | Meaning       |
|:---           |:---           |
| `j` (prefix)  | jump          |
| `n`           | not	          |
| `z`           | zero          |
| `e`           | equals        |
| `g`           | greater than  |
| `l`           | less than     |

Here's a few more examples:
* `je label`: "jump if equal"
* `jnz label`: "jump if not zero"
* `jg label`: "jump if greater than"

These instructions do exactly what their names suggest: if the condition is met, the program jumps to the destination label. If not, it simply continues to the next line. Just like with unconditional jumps, the destinations can also be specified numerically.

Now, you might be wondering: "Equal to what?" "Greater than what?" "Zero compared to what?" 

Let us answer these questions diving into the mechanics behind comparisons in assembly, introducing a special register that plays a crucial role in this process: the `eflags` register.

## Flags

The `eflags` is a 32-bit register[^4] that stores various flags. Unlike general-purpose registers, `eflags` is read bit by bit, with each position representing a specific flag. You can think of these flags as a set of boolean values built right into the CPU. When a bit is 1, the corresponding flag is `true`, and when it's 0, the flag is `false`.

{% include picture.html image_url="https://github.com/user-attachments/assets/5fde252c-7af9-4591-91db-d9b238fd712e" alt="EFLAGS layout" %}

Flags serve multiple purposes[^5], but for our discussion, they're used to provide context after an operation. For instance, if an addition results in zero, the _overflow flag_ (OF) can tell us whether this is due to an actual zero result or an overflow. They are relevant to us, since flags are how assembly stores the results of comparisons.

In this section we will only look at the following flags:
* the _zero flag_ (ZF), set to 1 when an operation results in zero;
* the _sign flag_ (SF), set to 1 when the result of an operation is negative.

The `cmp` (compare) instruction is one common way of performing comparisons:
```nasm
cmp rax, rbx
```
This instruction subtracts the second operand from the first without storing the result. Instead, it sets flags based on the comparison. For example:
* If the operands are equal, the zero flag (ZF) is set to 1;
* If the first operand is greater than the second, the sign flag (SF) is set to 0.

With this understanding, the meaning of conditional jumps should become clear:
* "jump if equal" (`je`) translates to "jump if ZF=1"
* "jump if not zero" (`jnz`) translates to "jump if ZF=0" (equivalent to `jne`)
* "jump if greater than" (`jg`) means "jump if SF=0 or ZF=0"[^6]

## At last, conditionals

We are now, finally, ready to write conditionals in assembly. Joy!

Consider this simple pseudo-code:
```
if rax == rbx 
  success()
else
  error()
```

In assembly, we can express this logic as follows:
```nasm
; Compare values in rax and rbx
cmp rax rbx
; If they are the equal, jump to `success`
je success
; Else, jump to `error`
jmp error
```

This assembly code first compares the values in the rax and rbx registers using the cmp instruction. Then, it uses conditional and unconditional jumps (`je` and `jmp`) to control the program flow based on the comparison result.

Let's look at another example. Enough hello world. This time around we build a serious software that performs an addition and checks if the result is what we expect. Very serious.

<code-editor exercise="02-sum.asm"></code-editor>


## Conclusion

We made it, friends! We've explored the fundamental building blocks of control flow in assembly language. 

We've learned about Control Transfer Instructions (CTIs), focusing on unconditional and conditional jumps. We've seen how the instruction pointer (`rip`) guides program execution and how jumps manipulate this flow. We've delved into the `eflags` register and its crucial role in comparisons, understanding how flags like the zero flag (ZF) and sign flag (SF) inform conditional operations. Finally, combining the `cmp` instruction with jumps, we've constructed the assembly equivalent of high-level language conditionals. 

While jumps enable basic control flow, they can make code hard to follow. In our next article, we'll introduce the equivalent of functions: a way to execute code from elsewhere while maintaining a linear flow. You'll see how this approach mirrors procedural code in high-level languages, making assembly more intuitive and organized.

{% include post-footer.html %}

---

[^1]: This mental model is not entirely made up: emulators usually represent instruction streams as arrays, for example. If you are interested in emulation, [CHIP-8](https://en.wikipedia.org/wiki/CHIP-8) is a great place to start and [this a good guide](https://austinmorlan.com/posts/chip8_emulator/) to get your hands dirty.

[^2]: I say _explicitly_ because, for example, the `syscall` instruction may issue an interrupt. The cooperation between operative systems and user programs makes for a fascinating world in its own right and discussing it here would do it no justice. If you are curious, you can consult any operative systems book. Personal recommendation, [OSTEP](https://pages.cs.wisc.edu/~remzi/OSTEP/) and in particular [this chapter](https://pages.cs.wisc.edu/~remzi/OSTEP/cpu-mechanisms.pdf).

[^3]: For a complete overview refer to the [Intel Software Developer Manuals (SDM)](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html), in the "Jump if Condition is Met" section.

[^4]: The prefix _e_ in _eflags_ stands for _extended_. It comes from the transition from 16-bit to 32-bit registers, where the latter were considered extensions of the former.

[^5]: Once again, the complete list can be found in the [Intel Software Developer Manuals (SDM)](https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html). The section to look for is "EFLAGS Register".

[^6]: For simplicity's sake, we ignored `cmp` overflows. You can account for them by using – you guessed it – the _overflow flag_ (OF). For example, the overflow-adjusted version of `jg` is "jump if SF=OF and ZF=0." Don't sweat if it's not clear: it's not crucial for this introduction, and we will likely touch on that later.

{% include code-editor.html %}

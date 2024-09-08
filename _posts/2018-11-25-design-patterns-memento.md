---
title: Memento - Design Patterns in Web Development
description: Second episode about Behavioral Pattern Memento 
categories: ["javascript", "typescript", "react", "design-patterns"]
date: "2018-11-25"
commentLink: "https://twitter.com/spagmanuel/status/1118952047460716544"
---
# Introduction

As some of you may remember, in the [pilot episode](/design-patterns-in-web-development-intro) I said I was about to explain _Command_ with three examples: a UI kit, a CQRS application and an undo/redo implementation in Electron. In the [Command episode](/design-patterns-command) though I didn't provide the latter and the reason is extremely simple: I am a jerk.

Furthermore, it made much more sense to me using that example to explain another Behavioral Pattern[^1] belonging to the classic patterns in the [Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns): **Memento**.

# Memento

## Example: Calculator

Suppose you are working on a calculator. You provide an expression and it will do the maths for you. For simplicity's sake, we just take in account one of its methods: `power`.

The logic behind this calculator is in a class called `Calculator` which should look something like:

```typescript
class Calculator {
    // State
    private string display;
    // and a whole lot of unrelated other fields

    // Resolves expressions like x^y
    private power(string expression): number;

    // Writes on display
    setState(string display): void;

    // Parse what's on the display, calculates and overrides the display
    calculate(): number;
}
```

One fine day, we decide it's time to implement an undo mechanism for this application. One first idea of implementing this mechanism could be simply apply the inverse function of what you just did. 

![Quick maths](https://i.imgflip.com/1wg0hg.jpg)

Unfortunately this just does not work for the `power` function. 

For example: undoing `y = power(x, 2)` is going to be applying `sqrt(y, 2)`, but both `power(2, 2)` and `power(-2, 2)` yield the same result, so you won't be able to get unambiguously to the `x` just by having the `y`.

At this point saving the previous state in a snapshot when you `calculate` and, upon `undo`, using such snapshot to reset the state of the calculator looks simpler and more effective.

**Memento** offers one neat way to deal with this problem.

## What is this about?

> **Intent**
>
> Without violating encapsulation, capture and externalize an object's internal state so that the object can be restored to this state later.

Yes, you have just won this "Guess the quote" round: it comes from the _Gang of Four_.

The idea here is pretty straightforward: we want to have a systematic way to store a snapshot of the internal state a given object, without exposing such state, in order to be able restore later on. 

![Good Will Hunting](https://i.pinimg.com/originals/99/40/8c/99408c1fba73591cf6fb4509cab8b87c.jpg)

If you are wondering why you shouldn't expose the state, maybe you are still not fearing coupling as you should. This is definitely bad. However, you are still in time to get this fixed by [reading this article](/design-patterns-command). I will wait for you here.

...

Done? We can get started with **Memento** in practice.

## Pattern in practice

![99 problems](https://i.imgflip.com/2msosq.jpg)

First things first: why this pattern is called Memento? _Memento_ is a Latin word which can be safely translated into _reminder_[^2]. This is the object in which we store the part of the state of the `Calculator` we are interested in. 

`Calculator`, which is where the state originates from, is called **Originator** and the third character of this story is going to be the one which takes care of making the whole thing work, which is called the **CareTaker**.

So, to wrap it up, these are the participants in Memento with their responsibilities:

-   **Originator**: 
    -   creates a Memento to store the internal state;
    -   uses Mementos to restore its state; 
-   **Memento**: 
    -   stores an immutable snapshot of the internal state of Originator;
    -   can be accessed _only_ by the Originator;
-   **Caretaker**: 
    -   stores Mementos;
    -   never operates on or read Mementos;

In practice these will become something like:

```typescript
// Originator
class Calculator {
    private string display;

    private power(string expression): number;
    
    setState(string display): void;
    calculate(): number;
    save(): Snapshot;
    restore(Snapshot snapshot): void; 
}

// Memento
class Snapshot {
    private string state;

    getState(): state;
}

// CareTaker
class Application {
    Calculator calculator;
    Array<Snapshot> undoSnapshots;
    Array<Snapshot> redoSnapshots;

    calculate(): void {
        const snapshot = this.calculator.save()
        this.undoSnapshots.push(snapshot)
        this.redoSnapshots = []
        this.calculator.calculate()
    }

    undo(): void {
        const snapshot = this.undoSnapshots.pop()
        this.redoSnapshots.push(snapshot)
        this.calculator.restore(snapshot)
    }

    redo(): void {
        const snapshot = this.redoSnapshots.pop()
        this.undoSnapshots.push(snapshot)
        this.calculator.restore(snapshot)
    }
}
```

## Nice! How can I use this s**t tomorrow?

With **Memento** we are kind of lucky: you don't need to find super complex use cases to go for it. The undo/redo scenario is by far the most common place where this pattern shines, but it can easily be reused every time you need to revert an object to a previous stage.

You need another example, don't you? 

Suppose you have a profile age for a web application. The user clicks on "edit profile" but, after doing some things, they "cancel" the operation. Unless you wan to do the AJAX call to re-get user information every time this happens, a good idea can be storing a Memento containing a snapshot of the user profile to be restored upon cancellation.

Is **Memento** the _only_ way to achieve this? No. Another fairly common pattern to go for in these cases is **Prototype**, which might be the subject of next episode. Or not, who knows? Either way, all you need to know now about **Prototype** is that it provides another way to create a copy of the state of an object, but in a different manner. 

Bottom line, taking snapshots makes your life easier when you have to time-travel the history of your objects.

![Snapshots](https://memegenerator.net/img/instances/64082371/yo-dawg-i-heard-you-like-snapshots-so-i-snapshotted-your-snapshot-so-you-can-snapshot-your-snapshot.jpg)

Your next question could be, is this just convenient or it is necessary? We have seen in the Calculator example that sometimes inverting last action could not be enough to get to the previous state. This is unfortunately true not only with non-invertible maths functions, but it applies every time any of your methods has side effects. In these cases usually taking snapshots is the only way to revert to a previous state safely. 

## Well, where's the catch then?

This pattern has a couple of gotchas you should be very aware of.

The first and most obvious one is that, if the object you want to restore is big, having a history of snapshots can become cumbersome. One way to work this around is storing just a diff of the changes, but this works only in scenarios in which you know exactly the order of snapshots to apply (for example in undo/redo).

The other, sneakier, is that snapshots, if not created correctly, can easily create and accumulate errors upon traversing the history. Let's give an example of this case.

Let's suppose you have the dumbest game ever: every time you click a button you earn 10 points, if score gets to 100 you earn a badge. We want to implement an undo mechanism here, so we store snapshots on every click of the `score` variable.

We click up to 100, we earn a badge, we undo, we re-click and we earn a second badge.

![Bug feature](./bug-feature-meme.jpg)

Why did that happen? Because we forgot to keep track of the badges in the snapshot, thus on undo we just reverted the score, without cleaning the badge list.

# A little less conversation, a little more action, please

> You can find a more detailed version of these examples [here](https://github.com/shikaan/design-patterns)

Finally code time! 

As I promised in the introduction, I am about to show how the same undo problem can be solved both via Command and via Memento.

> **Disclaimer**
> 
> I decided to not use Electron for this example for the simple reason that it makes the whole thing more complicated for people not familiar with it and it's not bringing any value to Electron experts. If you're really upset about this, drop a comment and I will add also that example.

The example is a very simple React application which is supposed to be a game: sort the tiles to win.

It basically sets a listener on `keyDown` and based on that it either calls a method (Memento) or issues a command (Command).

In the Memento example we have the `Game` component which is dealing with all the game logic: moving tiles, selecting tiles, calculate if the user is winning... This makes it the perfect **Originator**, because it's also where we store the state we might want to revert via undo. Being the Originator also means that it's responsible of creating and restoring the `Snapshot`s.

`Snapshot` is of course **Memento** and it's "private" to the `Game` ES6-module, to prevent the `KeyboardEventHandler` (aka the **CareTaker**) to know it.

In the Command example, we have an additional component: `CommandManager` acting as **Invoker**. Roles of `Game` and `KeyboardEventHandler` are unchanged, but given the different implementation, they are doing things differently. `Game` now is the **Receiver** of the command, whereas `KeyboardEventHandler` is the **Client**, the sole owner of `Command`.

As you might already have noticed, we can use interchangeably **Command** and **Memento** here because the action we are encapsulating (`moveSelectedTile`) is a pure action, with no side effects, so we actually _don't necessarily need_ a Snapshot to reconstruct the state: applying inverse functions is enough.

Does this mean that Memento and Command _cannot_ live together? By no means. As a matter of fact, you can encapsulate in a Command the `takeSnaphot` method to decouple the `CareTaker` and the `Originator`. Or also, you can encapsulate `moveSelectedTile` - as we already did - and in the Command, besides executing the method, you also take a snapshot. This last one is the most common way to make Command and Mememto live together.

You can start from [the repo](https://github.com/shikaan/design-patterns/tree/master/2-memento) and experiment with it as an exercise. If you're evil and want to spoil everyone else's party, you can submit a PR.

# Final words

Well, things start to become a bit more exciting as we start adding knowledge and mixing cards on the table. This will definitely improve over time, so hang on for it :D

If you have any sort of feedback ("Don't tell me how to code. You're not my real mom!"), opinion ("You code like shit, but your memes are awesome"), comment ("Yeah, okay, Behavioral Patterns are cool, what's next?"), please drop a message or a comment and let's make this series better together.

Until next time!

{% include post-footer.html %}

---

[^1]: If you're unsure about what a behavioral pattern is, take a look [here](/design-patterns-command)

[^2]: To avoid to forget this, you should keep in mind that **mem**ento and **mem**ory share the same origin. A memory trick to memorize something related to memory. Boom!

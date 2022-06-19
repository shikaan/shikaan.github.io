---
title: Design Patterns in Web Development
description: Why and how to use Design Patterns in Web Development
tags: ["javascript", "python", "architecture", "design-patterns"]
date: "2018-11-04"
commentLink: "https://twitter.com/spagmanuel/status/1118952314965037056"
---

# Introduction

Design Patterns are quite an hot topic in software development. For many people they are considered to be _the way_ to identify a well prepared developer. Luckily, I am not one of them, although I think that they definitely contribute to make developers better allowing them to tackle everyday's challenges in a quicker and, often times, cleaner way.

This is exactly the reason why I want to write articles about Design Patterns based on what I learned mainly from [the Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns).

The difference between this and the overflowing amount of other articles doing the same, is that I will be trying to stick with full stack web development with extremely practical examples. Most of them are going to be in JavaScript or Python, as other languages have plenty of resources about this topic.

Something along the lines of: How to use Command Pattern in a React component, in a CQRS Node application and to implement an Undo/Redo history in an Electron application.

However, this first article is going to be the Pilot Episode of the series. So still no patterns in here :(

# Let's get started!

> If you want to know more about design patterns in general I can recommend [this website](https://refactoring.guru) which is my go-to place when I need to dust off those concepts.

## What is a design pattern?

As much as everyone of you claims to be the best cook in the world because of their special, unique, one-of-a-kind touch (well, maybe this affects Italy more than other places...), we can all agree that having a grandma-crafted recipe book can take a good cook out of almost everyone.

![Dog - I have no idea what I'm doing](https://www.ecolutionhome.com/wp-content/uploads/2018/02/C-Cooking-Memes27.png)

The reason is pretty straightforward: all those recipes have been created by someone who - eventually making a huge amount of mistakes along the way - fixed, corrected and amended those procedures over time. Using those well packaged bits of knowledge makes you avoid lots of common pitfalls and wrong decisions. This is extremely useful in circumstances when the choice you make looks unharmful, but in reality it is not. Something like of serving a poorly prepared dish to your grumpy uncle for the Thanksgiving Dinner...

At the same time recipes can be used as a template to build upon rather than as a set of rules carved in stone. There are plenty of extremely good chefs which revisit their family cookbook to make a business out of it or, in general, to serve their purposes which might be different from their grandma's ones.

In software development the whole thing works pretty much the same way. The main difference though is that software development projects usually last more than a bunch of minutes and you cannot get away with brushing your teeth at the end. The main ideas are the same, though: having a very strong starting point to solve common problems which you might want to customize when you get to an expertise level which allows you to do so.

## Criticism

As for all the things which are too good to be true, this has to be either not so good or not so true.

The good news is that this is true 😀 The bad news is, though, that your decision-making process cannot **completely** be replaced by _The Wisdom of the Ancients_.

![Francis Bacon](https://i.pinimg.com/originals/72/5d/29/725d29ab0d189c2220a8c398af687871.jpg)

This is by far the most common argument raised against the pattern approach in software development: solutions provided via patterns tend to be not as efficient as they could be for very specific problems.

To me this is kind of a weak point as you should always improve on or at least adapt one of those solutions to your needs. Being backed by something which passed the test of time will give you the advantage of knowing in advance most of the weaknesses of you choice, so you have a better understanding of how to address issues coming down the line.

The other common argument against design patterns is that some of the classic ones (aka in the Gang of Four) exists only because of the state of software development in those days, which was a bit more "primitive" compared to what we have today. 

Well, I cannot disagree with this, but (as Francis up here says) "Knowledge is power" and I'd rather have a tool I don't use than lacking a tool I need.

This, however, leads to the last criticism I want to address here. One of the risks of introducing patterns is that you might end up using them even in situations which do not require them at all. 

I guess this is something we cannot help and it's a fairly common problem with anything which is learned in schemes (e.g., when you start learning scales in music). Unfortunately, experience is the best teacher in this case, but being aware of the risks will definitely help you throughout the way. 

## Classification

As you might have understood by now, the Gang of Four was really the s\*\*\*t when it came out (which is, by the way, 1995). 

![Boromir Gang of Four](https://www.coengoedegebure.com/content/images/2017/08/onedoesnotsimplygof-1.jpg)

So nowadays, we're still somewhat classifying design patterns based on their classification.

> The following list will become a list of links as long as I write articles on the subject

**Creational Patterns**

-   Abstract Factory
-   Builder
-   Factory
-   Prototype
-   Singleton

**Structural Patterns**

-   Adapter
-   Bridge
-   Composite
-   Decorator
-   Facade
-   Flyweight
-   Proxy

**Behavioral Patterns**

-   Chain of responsibility
-   [Command](/design-patterns-command)
-   Interpreter
-   Iterator
-   Mediator
-   [Memento](/design-patterns-memento)
-   Observer
-   State
-   Strategy
-   Template method
-   Visitor

# Final words

This was a brief and hopefully not-so-boring general introduction to Design Patterns. Next articles will be more practical, less wordy and maybe with the same amount of memes. 
Let me know if you are interested in the topic, as I really need motivation to continue writing :D

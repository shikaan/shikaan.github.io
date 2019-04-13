---
title: Design Patterns in Web Development
description: Pilot episode of a series about design patterns and how to use them
tags: ["javascript", "python", "architecture", "design-patterns"]
coverImage: "cover.jpg"
date: "2019-02-03T18:08:04.207Z"
---

# Introduction

## Foreword

Before diving down in this series you might want to know why I am writing this.

My name is Manuel and I am a more-or-less Italian more-or-less lifelong geek.  Although I am doing web development since the dark ages of `<tables>`, I decided to make software development a full time job only three years ago.

As you can imagine, I didn't have my Computer Science education, so I am continuously striving to fill this gap studying "academic" topics as much as I can.

Moreover, I recently moved away from my home country, thus I also need a good excuse to practice my English.

This is exactly where this series of articles comes from.

## What is this about?

What I'd like to do is writing articles about Design Patterns based on what I learned mainly from [the Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns).

The difference between this and the overflowing amount of other articles doing the same, is that I will be trying to stick with full stack web development with extremely practical examples. Most of them are going to be in JavaScript or Python, as other languages have plenty of resources about this topic.

Something along the lines of: How to use Command Pattern in a React component, in a CQRS Node application and to implement an Undo/Redo history in an Electron application.

However this first article is going to be the Pilot Episode of the series. So still no patterns in here :(

# Let's get started!

> If you want to know more about design patterns in general I can recommend [this website](https://refactoring.guru) which is my go-to place when I need to dust off those concepts.

## What is a design pattern?

As much as everyone of you claims to be the best cook in the world because of their special, unique, one-of-a-kind touch (well, maybe this affects Italy more than other places...), we can all agree that having a grandma-crafted recipe book can take a good cook out of almost everyone.

![Dog - I have no idea what I'm doing](https://www.ecolutionhome.com/wp-content/uploads/2018/02/C-Cooking-Memes27.png)

The reason is pretty straightforward: all those recipes have been created by someone who - eventually making a huge amount of mistakes along the way - fixed, corrected and amended those procedures over time. Using those well packaged bits of knowledge makes you avoid lots of common pitfalls and wrong decisions. This is extremely useful in circumstances in which the choice you make looks unharmful, but it doesn't look so when you serve your dish to someone which might not be as polite as you expect (food in Italy is really something serious).

At the same time recipes can be used as a template to build upon rather than as a set of rules carved in stone. There are plenty of extremely good chefs which revisit their family cookbook to make a business out of it or, in general, to serve their purposes which might be different from their grandma's ones.

In software development the whole thing works pretty much the same way. The main difference though is that software development projects usually last more than a bunch of minutes and you cannot get away with brushing your teeth 
at the end. Apart from this though, the main ideas are the same: having a very strong starting point to solve common problems which you might want to customize when you get to an expertise level which allows you to do so.

## Criticism

As for all the things which are too good to be true, this has to be either not so good or not so true.

The good news is that this is true 😀 The bad news is, though, that your decision-making process cannot **completely** be replaced by _The Wisdom of the Ancients_.

![](https://i.pinimg.com/originals/72/5d/29/725d29ab0d189c2220a8c398af687871.jpg)

This is by far the most common argument raised against the pattern approach in software development: solutions provided via patterns tend to be not as efficient as they could be for very specific problems.

To me this is kind of a weak point as you should always improve on or at least adapt one of those solutions to your needs. Being backed by something which passed the test of time will give you the advantage of knowing in advance most of the weaknesses of you choice, so you have a better understanding of how to address issues coming down the line.

The other common argument against design patterns is that some of the classic ones (aka in the Gang of Four) exists only because of the state of software development in those days, which was a bit more "primitive" compared to what we have today. 

Well, I cannot disagree with this, but (as Francis up here says) "Knowledge is power" and I'd rather have a tool I don't use than lacking a tool I need.

This, however, leads to the last criticism I want to address here. One of the risks of introducing patterns is that you might end up using them even in situations which do not require them at all. 

I guess this is something we cannot help and it's a fairly common problem with anything which is learned in schemes (e.g., when you start learning scales in music). Unfortunately, experience is the best teacher in this case, but being aware of the risks will definitely help you throughout the way. 

## Classification

As you might have understood by now, the Gang of Four was really the s***t when it came out (which is, by the way, 1995). 

![](https://www.coengoedegebure.com/content/images/2017/08/onedoesnotsimplygof-1.jpg)

So nowadays, we're still somewhat classifying design patterns based on their classification.

> The following list will become a list of links as long as I write articles on the subject

**Creational Patterns**

* Abstract Factory
* Builder
* Factory
* Prototype
* Singleton

**Structural Patterns**

* Adapter
* Bridge
* Composite
* Decorator
* Facade
* Flyweight
* Proxy

**Behavioral Patterns**

* Chain of responsibility
* [Command](/design-patterns-command)
* Interpreter
* Iterator
* Mediator
* [Memento](https://dev.to/shikaan/design-patterns-in-web-development---2-memento-253j)
* Observer
* State
* Strategy
* Template method
* Visitor

# Final words

This was a brief and hopefully not-so-boring general introduction to Design Patterns. Next articles will be more practical, less wordy and maybe with the same amount of memes. 
Let me know if you are interested in the topic, as I really need motivation to continue writing :D

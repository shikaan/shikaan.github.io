---
title: Command - Design Patterns in Web Development
description: First episode about Behavioral Patterns and Command 
tags: ["javascript", "python", "architecture", "design-patterns"]
coverImage: "cover.jpg"
---
 
# Introduction

As spoiled in the introduction, the first article will be about the _Command Pattern_. This pattern is one of the classic patterns you can find in the [Gang of Four](https://en.wikipedia.org/wiki/Design_Patterns) and it belongs to the set of patterns called **Behavioral Patterns**. 

## Behavioral Patterns

As the name suggest, behavioral patterns are concerned about behavior of objects. 

![Zoidberg](http://www.quickmeme.com/img/b1/b1ee54106b29a0ee085bd3918f98e95d559e9ad70e4d23587cc97c66a51d5bf4.jpg)

Unlike other kind of patterns, behavioral patterns are not only patterns of objects and classes, but also pattern of communication between them. Their main purpose is to outline and distribute responsibilities across components in the application using abstractions meant to simplify complex control flow.

This last sentence was complicated enough to deserve a real life example.

Let's say you are in a restaurant and you want to eat a juicy T-Bone steak (I guess now it's obvious I have something for food). One way of getting that is to stand-up, going into the kitchen, and asking the chef to prepare a steak for you. At that point you realize that the kitchen is full of people with the same bright idea which are ultimately creating chaos and confusion in kitchen staff. Only one thing can be worse: your former girlfriend/boyfriend, yes the one with a thing for poisons, is the chef.

![Sad Panda](https://i.pinimg.com/originals/c4/b8/83/c4b8834dc60dd504f287b7a1232bc34e.jpg)

As a matter of fact, a customer is only interested in getting food. Direct communication with the chef is not serving this purpose and it's actually only bringing problems. At the same time, this direct communication does not scale when you have multiple requests and it wouldn't even when you have multiple listeners for those requests. This is a perfect example of the kind of problems that *coupling* can bring in software development.

The good news though is that even before software development was invented, human beings found a way to solve this obnoxious issue: placing orders.

Let's suppose, for the sake of the argument, to have a mailbox attached to the kitchen door. Whenever you want to have your food, you just write everything you need on a piece of paper and you mail your order. 

This simple trick magically solved our issues. We are not forced to know who is cooking our food. We don't even know whether anyone is actually cooking our food or if they buy-resell, for example. This means a huge gain in flexibility (and maybe a bit of loss of trust in restaurants which work this way). Furthermore, this improved the whole process in the kitchen, as they can prioritize, prepare concurrently, throw in the bin, log or do whatever they want with the orders.

Everyone (panda included) lived happily ever after<a href="#note1" id="note1ref"><sup>1</sup></a>!

Oh, by the way, this was the Command Pattern.

# Command Pattern

**<a href="#code-examples">SHOW ME THE CODE</a>**

## What is this about?

Lets start with a quote from the one and only GoF.

> **Intent**
> Encapsulate a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

In substance, Command is all about encapsulating a routine in an object. In the example above, we encapsulated the request for food in an object, which was the piece of paper used to place the order. The encapsulating object is what we call `Command`, hence the name of the pattern<a href="#note2" id="note2ref"><sup>2</sup></a>.

## Effects

Applying command has mainly two effects: reducing coupling between the invoker and the executor of the command, make a routine a first class object.

The ex scenario in the example above should be enough to convince you that coupling can be dangerous even outside Computer Science.

![Overly attached girlfriend](http://www.quickmeme.com/img/01/019c87c5b8b608e863093dbcaa88101564d0fab0b9cdbd2a780cbb940e94a782.jpg)

If you're not in the mood for thinking about your paranoid acquaintances you can also consider that the procedure you had to fulfill to get your meal is essentially unchanged if your meal needs to be cooked by two teams one specialized in steaks and one in sides.  

At the same time, the kitchen staff does not care if the order comes from the waiter, from a phone call, an order or whatever. As long as they receive a command they can execute, they are fine.

This is just a part of the gain we have in transforming routines in objects. The best part is... wait for it... they are objects! That means you can manipulate routines as objects, as in you can store them to have a transaction history, you can delay the execution, you can ignore them if s**t comes out of the pipe, you can extend those to add debugging inspections, you name it!

## Awesome! Will I ever need this in my lifetime?

No.

![Just kidding](https://sayingimages.com/wp-content/uploads/yo-dawg-im-just-kidding-meme.jpg)

There are some situations in which **Command** is not only extremely handy, but almost needed.

### Callbacks

Every time the executor of a command and the issuer not only they don't know each other, but they _cannot_ know each other in advance.

Let's say you are developing a fancy UI kit. You are of course developing something that needs to be reused, so if you build a `Button` component, you want it to be able to execute _any_ action, you don't want to hard-code one.

"Hey, bro! We have callbacks for that!" Yes, I know, but not everyone in the world is so lucky to work with JavaScript on a daily basis (sorry, biased comment). When you want to (or have to) be strictly Object Oriented, this is the way to implement callbacks.

### Transactions and logs

Having all the commands as first class objects allows you to store them and hence to create an history of transactions.

This comes extremely handy in systems in which you _need_ a transaction history, like banking, for example. Furthermore, you get another pleasant side effect: you can reconstruct the state of the system at any point in time just traveling back the transaction history, making your life extremely easier if something goes off.

You can of course do the other way around: instead of storing the commands after executing them as a reference for what already happened, you can make the list of commands a queue of task to be executed, as within the restaurant example. 

If you need more "workforce", you just need to add some more consumers for that queue, making your application on the whole more scalable.

### Undo/Redo

Making the execution of an action an object, allows you to create an object with two methods: `execute` and `undo`. The first is meant to do something, whilst the latter is supposed to undo what you have just done.

Add up what's above about transactions and you can easily build and undo/redo history.

## One last effort before code...

Before diving into code examples we need to build a bit of jargon, so we can understand each other. I will be using the exact same language as used in GoF, so that if you want to follow from there it will be easier.

The participants in this pattern are:

* **Receiver**: 
    * knows how to execute the command;
* **Command**: 
    * declares the interface for executing an operation; 
* **Concrete Command**: 
    * defines the binding between the Receiver and the action to execute;
    * invokes methods on the Receiver to fulfill the request;  
* **Client**
    * creates the Concrete Command and sets its Receiver;
* **Invoker**
    * issues the request to execute the command;

In the example restaurant example we would have:

* `Cook` as _Receiver_
* `Order` as _Concrete Command_
* `Restaurant` as _Client_
* `Customer` as _Invoker_

Some pseudocode to look a bit more serious:

```typescript
interface Command {
    function execute()
}

// Concrete Command
class Order implements Command {
    Cook cook;
    Meal meal;

    execute() {
        cook.prepare(meal);
    }
}

// Receiver
interface Cook {
    function prepare(Meal meal)
}

// Invoker
class Customer {
    Order order;
    Meal meal;

    mailOrder(Order order) {
        order.execute()
    }
}

// Client
class Restaurant {
    Cook cook;
    Customer customer;

    main() {
        order = new Order(cook, customer.meal)
        customer.mailOrder(order)
    }
}

```

# <span id="code-examples">Code examples</span>

> You can find a more detailed version of these examples here
> {% github shikaan/design-patterns %}

## Frontend: UI kits

Following the first example above, here you are a simple example of how you can use the Command Pattern on the frontend. I have chosen to not use any framework, as the idea is general enough to be applied also to vanilla JavaScript.

In this example we will just create and render a `Button` component (Invoker) which will execute an `OpenAlertCommand` (Concrete Command). The Window (Receiver) is actually responsible for doing the job, whilst Application (Client) is wrapping everything up.

{% gist https://gist.github.com/shikaan/77367e98e41351549bec891fbf626b43 %}

You may argue that doing the same thing without the pattern would have taken less then 10 LOC. You are actually right, but, for the reasons we discussed earlier, this scales better and will be more flexible when you will get new requirements.

In [the repo](https://github.com/shikaan/design-patterns) we are actually proving how more flexible this is, adding to this example a couple of other things: we reuse the same button with the same command with two different receivers, we use the same button to trigger two different commands at the same time.

## Backend: CQRS in Python

> A good introductory article on the matter is [here](https://medium.com/eleven-labs/cqrs-pattern-c1d6f8517314).

The following example will contain a **super simple** CQRS application written in Python. It's supposed to be a banking app in which you can only deposit and get the list of all the deposits. Everything is stored in memory and will vanish as soon as the process ends.

The architecture of the app, even though it's super basic, contains everything you need to call it a CQRS app.

![Diagram](https://thepracticaldev.s3.amazonaws.com/i/ilcdtdi5oyd24cz9dq7i.png)

Strap yourselves because here we have two concurrent implementation of the Command Pattern: one for writing (Command) and one for reading (Queries). Both share the same Client though.

1) The Application (Client) creates the `Deposit` command and calls the `handle_deposit` method on the Command Handler (Command Invoker) 
2) The WriteStore (Command Receiver) saves data
3) Right after the Command Handler fires an event to notify the ReadStore (Query Receiver) which updates
4) The Application (Client) then creates the `GetLastDeposit` query and calls the `handle` method on the QueryHandler (Query Invoker)
5) The ReadStore (Query Receiver) will then save the value into the query
6) The result stored in the query returns to the user

The code for this is of course available in [the repo](https://github.com/shikaan/design-patterns). Python is not my main language, so if you see something off, feel free to submit a pull request or open an issue there.

## Final words

Well, this has been massive. Hopefully you got to read at least half of what I have written :D As always, if you have any feedback about how to make this series better, please let me know. 

Until next time!

---

<a id="note1" href="#note1ref">1</a>. This kind of patterns actually modified the _behavior_ (in common English sense) of customers and cooks. Hopefully this will be enough to fix forever in your mind what a _behavioral_ pattern is.

<a id="note2" href="#note2ref">2</a>. You language geeks may want to know that "order" in the restaurant context in Italian it's actually called "comanda". Just one word to remember both the pattern and the example. Lovely.

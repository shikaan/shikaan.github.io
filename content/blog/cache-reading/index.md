---
title: Reading - Caching Techniques
tags: ["webdev", "javascript", "node", "cache"]
description: Caching introduction and reading techniques
coverImage: "cover.jpg"
date: "2018-12-21T00:00:00.000Z"
commentLink: ""
---

# Introduction

It took me just three episodes to become inconsistent in my writing schedule. It has to be a record of some sort. To keep me motivated though I decided to spend the season back in Italy, so that I _desperately_ needed to practice some English.

Well it's not entirely true: I am passing the season here because of food. As usual, this leads me to this article's topic: **caching**.

Readers right now are probably divided into two groups: the one knowing the famous joke about caching and the others. For both of you here's [a curated list of tremendously sad variations of it](https://martinfowler.com/bliki/TwoHardThings.html).

Needless to say, I find **all of them** hilarious.

Either way, this piece is going to be part of a Christmas series about caching techniques. I am about to cover _active caching_ (as in, what I can do to cache without suffer too much) and _passive caching_ (as in, how to stick with browser cache and similarities).

This article is the first in the _Active Caching_ part.

# What is this about?

Do you still wonder what has food to do with caching? You'd better do, else I need to seriously improve my cliffhangers skills.

## Example: Christmas Dinner

Let's start with a simple out-of-IT problem. It's Christmas eve and you're planning to arrange a mouthwatering dinner for you friends and family. For the sake of the argument we're going to use one traditional Italian Christmas recipe: "il capitone"<a href="#note1" id="note1ref"><sup>1</sup></a>.

Let's start cooking. First thing in the list of the ingredients is the eel. You call your favourite fish shop, you get your fish delivered. Second item, extra-virgin olive oil. You call your favourite farm, order a bottle of oil and you get that delivered. Third, lemon... 

You can see by yourself how inconvenient this is, don't you? What you start doing then is buying in advance and storing stuff in a more convenient place, closer to where you actually use it, to make the access to these ingredients more efficient. Let's call this place cupboard.

Once you realize you can store things at home, you might be tempted to call the delivery person just once to collect all the ingredients not only for Christmas but also for New Year's Eve's dinner. So when you are at the fish shop, you buy the eel and the king prawns which you are actually planning to prepare a week later.

{% youtube l4-Ya_Xa3f8 %}

After a couple of days, the funky smell killing any living being in the area makes you realize that probably prawns are now expired and you should have prepared them fresh.

Well, caching has exactly the same kind of problems and perks: we usually cache items to save some computations, time or to avoid calling uselessly an external data source, but we should be extremely careful about expiration of entries because they can eventually get to an inconsistent (and very smelly) state down the line.

## Caching patterns

**<a href="#code-examples">I am late buying Christmas presents. SHOW ME THE CODE.</a>**

As usual, let me introduce some jargon<a href="#note2" id="note2ref"><sup>2</sup></a> which will help us in communication before diving into the patterns (maybe _strategies_ is a better suited word here).

These are the participants:
* **Client** needs data (either fresh or from the cache);
* **Data Access Component** is called to get non-cached entries (e.g., HTTP Client, ORM...);
* **Cache Layer** stores cached entries (e.g., Memory, Local Storage...);
* **Resource Manager** communicates with the Cache Layer.

In our previous example, these roles are mapped this way:
* **Client** is you;
* **Data Access Component** is the delivery person;
* **Cache Layer** your cupboard;
* **Resource Manager** someone so kind to administer resources in your cupboard.

Caching involves both _reading_ (using the ingredients) and _writing_ (storing the ingredients), so categorization follows accordingly. In this article we'll speak about reading techniques.

Reading strategies:
* Cache Inline
* Cache Aside

Writing strategies:
* Write Through
* Write Behind
* Write Around

> **Warning**
> Unfortunately naming convention for these patterns is not that consolidated, so you can find them under different names.

To get an understanding of how does work and why we should use them, we will analyse the following scenarios for all the aforementioned patterns:

* cached entry is present and valid (**Cache Hit**);
* cached entry is missing or invalid (**Cache Miss**).

> **Disclaimer**
> As usual, we are tackling these strategies in isolation for sake of simplicity. In real world, those techniques are combined to get the best out of them.

### Cache Inline (aka Read Through)

The reason for this name is that in this pattern the Client is never responsible of calling the Data Access Component directly, but instead it delegates the responsibility of knowing whether a cached entry is enough or a fresh entry is required to the Resource Manager. 

Resource Manager then sits **in line** between Client and Data Access Component.

#### Cache Miss

![Inline Cache Miss](https://thepracticaldev.s3.amazonaws.com/i/209c1ie202o6q6k77ml2.png)

Following the numbers on the arrows, you should easily get a grasp of what's going on here: 

1) Client asks Resource Manager for data;
2) Resource Manager gets no cached entries from cache, so it calls Data Access Component;
3) Resource Manager gets data, stores it and then returns it to Client.

#### Cache Hit

![Inline Cache Hit](https://thepracticaldev.s3.amazonaws.com/i/1vdzru4ptrnsp3tawz10.png)

As you can see, using cache here is reducing the number of steps, hence the strategy is actually working!

#### Rationale

From a caching standpoint, this approach makes sure that we are caching only data we actually use. This is usually called **lazy caching**. This approach also promotes splitting responsibilities across different components, how can it have drawbacks?!

Well, unfortunately this is the case :( 

The first issue is of course that, when you are in a _Cache Miss_ scenario, the request has to do a longer trip before getting to the Client, making the first request actually *slower* than if we didn't have cache at all.

One way of dealing with this is doing a _cache primer_: when the system starts we pre-populate the Cache Layer so we'll always be in a _Cache Hit_ case. Obviously this will make our caching mechanism not-so-lazy. As always, what's best depends on the actual scenario.

The second drawback is that, since data is cached only once (on _Cache Miss_) data can become quickly stale.

Again, this is not the end of the world: as for food, you can set **expiration** for entries. It is usually called **TTL** (namely _Time To Live_). When entries are expired, Resource Manager can call again the Data Access Component and refresh the cache<a href="#note3" id="note3ref"><sup>3</sup></a>. 

### Cache Aside

As opposed to Cache Inline, Cache Aside will make the Client responsible of communicating with Cache Layer to understand if a Cache Entry is needed or not.

The pseudo code for this behaviour can be as easy as:

```typescript
class Client {
    CacheLayerManager cacheLayerManager;
    DataAccessComponent dataAccessComponent;

    getResource() : Resource {
        const resource = this.cacheLayerManager.getResource()

        return !resource
            ? this.dataAccessComponent.getResource()
            : resource
    }
}
```

#### Cache Miss

![Aside Cache Miss.](https://thepracticaldev.s3.amazonaws.com/i/e5v9e78xb4gh4flfgtni.png)

You can follow what's going on here by looking at the pseudo code above. As you can see, responsibility of calling Data Access Component is now in the Client and the Cache is actually... aside.

#### Cache Hit

![Aside Cache Hit.](https://thepracticaldev.s3.amazonaws.com/i/ufun4iillk5rp4vugjsl.png)

Again the trip here is shorter, so the pattern is actually working.

#### Rationale

This technique, as Cache Aside, is a _lazy caching_ technique, unless we want to do a _cache primer_. Also, exactly as with Cache Aside, there is the problem of stale data, but again that problem can be tackled with _TTL_.

So, why should anyone go for Cache Aside over Cache Inline?

Since the Client now is responsible of communicating directly with the Cache Layer, when the Resource Manager fails, we pay a penalty only on the first request - when we go through the _Cache Miss_ path -, making our system on the whole more robust.

Also, having removed the dependency between what we cache and what we get from Data Access Component, we could potentially have two different kind of model: a `Model`, which is representing what we get from Data Access Componentm and `CachedModel` representing what we cache.

This will indeed widen the spectrum of what you can achieve with cache: you can, for example, hydrate or transform cached data to gain on performance on multiple operation with just one cached entry.

Let's give an example of this. 

Suppose you are serving a list of bank transactions you get from this `AwesomeBankAPI`. Your application is supposed to expose two different endpoints: `getAllTransactions` and `getPayments`. Of course `AwesomeBankAPI` does not expose any filtering function. What you could do is storing the the list of all the transactions on the first call to any of those endpoints. 

From this point on, if the call is towards `getAllTransactions`, you return the list as is. If the call is towards `getPayments` you will take the whole list from cache (rather than calling `AwesomeBankAPI` again) and you just need to do the filtering on your end.

# <span id="code-examples">Code or it never happened</span>

> You can find a more detailed version of these examples here
> {% github shikaan/design-patterns %}

The [example](https://github.com/shikaan/design-patterns/tree/master/chistmas-caching) I am showing here is written in Node. It's a simple application meant to communicate with [XKCD](https://xkcd.com/) to fetch latest comics.

`CacheLayer` in this example is represented by a simple `Map`. I am using a `CacheManager` to deal with it, so that if you want to experiment with a real caching engine (like [redis](https://redis.io/), or [memcached](https://memcached.org/)) you can do that without much effort.

The `DataAccessComponent` is represented by a simple `XKCDClient` which exposes (in a Vanilla JavaScript fashion...) only a `getLastComics` method.

The other component is indeed `ResourceManager` which is being used only in the inline-caching example.

Since all these components are eventually the same, I just created two different clients sharing and using them in different ways, based on the strategy we want to follow.

The _Cache Inline_ example is about requesting twice the same resource (namely, last three XKCD comics), but the second time the request is way faster. This is because we are not doing any cache-primer, so the first time we are actually calling XKCD API, the second time we are retrieving information from the cache.

The _Cache Aside_ example instead, shows how powerful can be caching when we want to request resources which can calculated from what we already have. In this specific example, we are fetching last five comics from XKCD and then we are fetching only last two. The second call of course is not calling the API. 

The main difference here is then that we are using the cache to get a resource we _didn't have_ before, rather than using `CacheLayer` to get something we already fetched.

Again, those two strategies can (and usually do) live together. If you want to play a bit with these examples, you might try to make the `ResourceManager` from the first example a bit smarter so that it can either use the entries as they are (hence, what's already in the [repo](https://github.com/shikaan/design-patterns/tree/master/chistmas-caching)) or it can try to extract the required info from `CacheLayer` and decide whether calling the API or not.

## Final words

This closes the first episode of this Christmas special (yes, as TV shows). 

As you might have noticed I am trying to keep this shorter and easier than usual, so you can easily follow without your laptop when you are hallucinating because of Christmas-sized food portions. 

As always, if you have any feedback (the thing is too simplified, you miss my memes, I suck at naming things), please drop a comment and make this better together :D

Until next time!

---
<a id="note1" href="#note1ref">1</a>. Pretty much anywhere else in Italy people eat meat for Christmas. I am from a messed up place where eating a giant eel should symbolize victory of Good against the Evil in the shape of a snake...

<a id="note2" href="#note2ref">2</a>. Unfortunately there no standard jargon here, so I had to make up these names. If you have any suggestions to improve them, please tell me (:

<a id="note3" href="#note3ref">3</a>. Knowing what is the right expiration date for every entry is something between wisdom and black magic. Most likely a lot of errors and trials (or experience, if you wish) will guide in choosing the best TTL for your case

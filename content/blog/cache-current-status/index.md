---
title: Current Status - Caching Techniques
tags: ["webdev", "python", "javascript", "cache"]
description: Caching standards and how to deal with them
coverImage: "cover.jpg"
date: "2019-01-06T00:00:00.000Z"
commentLink: ""
---

# Introduction

You might have noticed that this sub-series has just changed the name: it wasn't about Design Patterns, there was no point in keeping those two as part of the same thing.

As said [in the first episode](https://dev.to/shikaan/-design-patterns-in-web-development----active-caching-1-23e2), this article is going to be more about what's already there in the wild in terms of caching and how we as developers should deal with it.

What we are about to cover is something you typically decide once in a while or you don't decide at all because some frameworks and libraries make these decisions for you. Thus, the idea here is to have a go-to place where you can get an understanding or just dust off those concepts every time you have to deal with caching again.

## Serving the correct application version

Serving the correct version of a web app started to become something you should be concerned about only "recently". 

Back in the days, we had server-side technologies like Java, JSP and PHP which used to serve thin client applications with small or no logic at all. Over time clients got thicker and we started splitting responsibilities between frontend and backend to the point where frontend and backend are usually two completely different applications<a href="#note1" id="note1ref"><sup>1</sup></a> which are just meant to communicate, rather than being "the same thing".

When the application is run by the server, serving the correct version isn't a concern, because the browser is usually just asking "that page" and the ball it's in the server's court with regards with deciding which version of that page to serve<a href="#note2" id="note2ref"><sup>2</sup></a>.

When the application lives on the client side, unfortunately, the page requested by the browser is usually an `index.html` with a `<script>` which includes the client application via an `src` attribute.

So if the `index.html` is something like
```
<!DOCTYPE html>
<html>
  <head>
    <title>Wonderful WebApp</title>
  </head>
  <body>
      <main id="app"></main>

      <script src="app.js"></script>
  </body>
</html>
```
we could theoretically just bundle a different `app.js` every time keeping the `index.html` the same.

Unfortunately, that is not true any more. Browsers nowadays understand whether something changes<a href="#note3" id="note3ref"><sup>3</sup></a>, so rather than asking again `app.js`, they will just assume it never changed and serve the old one unless we communicate them to not do so.

One way of doing this is appending the version of the application as a query string parameter in the `src`.

```
<!DOCTYPE html>
<html>
  <head>
    <title>Wonderful WebApp</title>
  </head>
  <body>
      <main id="app"></main>

      <script src="app.js?v=1.2.3"></script>
  </body>
</html>
```

Thus every time we bump a new version of the bundle, the browser is forced to perform a new request because the URL and the `index.html` changed.

Another similar (and by far more common nowadays) approach is naming the bundle with a hash which is different on every deploy. The hash can be based on the actual version, on the code, on the latest revision number or even the timestamp of the moment when the build happened.

```
<!DOCTYPE html>
<html>
  <head>
    <title>Wonderful WebApp</title>
  </head>
  <body>
      <main id="app"></main>

      <script src="app.gt8heef.js"></script>
  </body>
</html>
```

This technique is rather popular and most of the time is "for free" in CLIs for popular frameworks (like Create React App, Angular CLI, Vue CLI, Ember CLI). 

You can implement it yourself using a build tool which rewrites the `index.html` including the version number/hash or, eventually, using `manifest.json` to get more fine-grained control. Some references to help you with implementation:

* [Webpack - Caching](https://webpack.js.org/guides/caching/) my preferred way;
* [Medium - Solving Browser Cache Hell With Gulp-Rev](https://medium.com/@felipebernardes/solving-browser-cache-hell-with-gulp-rev-6349a293abb9) a gentle introduction to `manifest.json`;
* [DZone - Use Gulp to bundle, minify and cache-bust](https://dzone.com/articles/use-gulp-to-bundle-minify-and-cache-bust) old, but still relevant;
* [Jessie Wong - Cache busting with Makefile](http://thisisjessie.com/cache-busting-via-per-file-query-strings-with-make/) a bit hardcore to me, but still an option.

## Optimize content delivery with Service Workers

Among the things going hand in hand with `manifest.json` (especially with regards to Progressive Web Apps), we have Service Workers.

Without going too much in details about the awesome things you can do with service workers<a href="#note4" id="note4ref"><sup>4</sup></a>, you can imagine them as a JavaScript thread running in parallel in the browser whose life cycle is not bound to the client application's one.

The reason why we are so interested in them here is that in Service Worker API we have access to the Cache Interface.

There are some caching recipes you can follow, but the most common are:

* on install
* on user interaction
* on network response

The naming convention is borrowed from one of the greatest resource on the matter you can find online, namely [Google's Offline Cookbook](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/). 

If you followed what happened in previous episodes, you will certainly notice that the role played by Service Workers in those recipes is what in general we have called _Resource Manager_. Hence in the following paragraphs, I am about to show how those patterns map to what we said in previous articles.

Well, to be fair there's another very good resource about this topic which is [Mozilla's Service Workers Cookbook - Caching Strategies](https://serviceworke.rs/caching-strategies.html), but I find Google's perspective easier to follow. I strongly encourage you to read both anyway to have a wider spectrum overview.

### On Install

In this pattern we do a cache write on the `install` hook of the Service Worker. It looks particularly useful when you want to store the application shell to be able to provide an offline experience.

In the Google's cookbook, this comes in two different fashions called "as a dependency" and "not as a dependency", which are basically "Write Through" and "Write Behind" of [this article](https://dev.to/shikaan/-design-patterns-in-web-development----active-caching-2-37jc).

### On User Interaction

From a caching strategy perspective, this pattern is not that different from `On Install`.

Suppose you want to implement a "Read Later" button on a blog. What you need to do is fetch the article and store it. Deciding if you want to save is synchronously (as in "Write Through") or asynchronously (as in "Write Behind") depends on your use case, but both the approach are feasible.

### On Network Response

Of the three examples we are providing, this is by far the most common since you can apply this strategy every time you need to fetch data over network. 

The implementation proposed in the offline cookbook is "Read Through" - no more, no less!

## <span id="http-headers">W3C standards: HTTP Headers</a>

In the wonderful world of web development, finding a new fancy way of being screwed is never a problem. This is precisely why you may want to understand how the browser communicates with the server with regards to cached content. 

> **Disclaimer**
> Even though I will always refer to the browser in the following paragraph, this also applies to server to server communication, so backenders could find this interesting as well.

Again, I am treating only the most interesting cases, but here you can find a list of resources covering more cases:

- [MDN - HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
- [DigitalOcean - Web Caching Basics](https://www.digitalocean.com/community/tutorials/web-caching-basics-terminology-http-headers-and-caching-strategies)
- [KeyCDN - HTTP Cache Headers Explained](https://www.keycdn.com/blog/http-cache-headers)
- [W3C - Cache-Control Specification](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9)
- [W3C - ETag Specification](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.19)
- [Google - HTTP Caching](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching)

### ETag

Even though the name is not exactly explicit, the ETag HTTP Header is one of the headers we can use to have control over cached content. ETag stands for "Entity Tag" and it is a way of tagging with a hash a specific version of a content we are exchanging.

In this case, an example will be better than one thousand words.

Suppose you as a client (both another server or browser) are requesting `GET /dogs`. The counterpart will respond with a 200 and the following response headers:

```
200 OK
Content-length: 512
Cache-Control: max-age=60
ETag: a23g1t4
```

As we'll see in the following sections, `max-age=60` tells us that the content will become stale in 60 seconds. 

Suppose that after one minute, we request again the same resource but this time we attach the following request headers:

```
GET /dogs
If-None-Match: a23g1t4 
```

which basically means "give me either valid cached content or stale content as long as its version is a23g1t4".

At this point the server will try to serve cached content, then falls back on stale content with that version and, if not even that is found, then it performs the actual request. In case the cached content is found the response will be:

```
304 Not Modified
Content-length: 512
Cache-Control: max-age=60
ETag: a23g1t4
```

### Cache-Control

The Cache-Control HTTP header is used to define a cache policy, both from a client side (for example, "don't give me cached content") and from a server side (for example, "this content will expire in two minutes").

Cache-Control has _tons_ of directives which can be combined in a lot of fancy ways which is impossible to cover in a couple of paragraphs. Maybe it makes sense to write a separate article on that (and if you're interested, please let me know!). We'll be covering here only the most common directives.

#### `no-cache` & `no-store`

These two bad boys are probably the most mixed up. 

The directive `no-store` - used both as a directive in _request headers_ and _response headers_ - simply means that any caching mechanism should be skipped. So the client should not cache the response it gets (when used in the request) and the server should not cache the response to speed up following requests (when used in the response). 

When used as _response headers_, `no-cache` means that the content served won't automatically be valid for subsequent requests. This basically means that the content can be cached or not, but, if it is, it has to be validated (for example using `ETag`) before being served.

When used as *request header*, `no-cache` means that we don't care about what's cached and we want a fresh request. However, this does not define whether the server can cache the response to speed up following requests (as opposed as `no-store`) and usually server will cache that response.

#### `public` & `private`

These look pretty obvious, but they actually hide a small quirk.

`public` is most of the time useless and, in fact, you rarely find it. It just means "this content can be safely cached", but usually you have other directives telling you that (for example `max-age`, as we're about to see).

`private` instead is a bit more tricky. It doesn't mean that you cannot cache the response at all, but it rather says "you can cache that only if you own the content". 

What does being the owner of the information mean? 

Suppose you have a micro-service built application with an API gateway in front of it. Every single service _and_ the API gateway can have a cache, but only the micro-services themselves own the information. Usually, the content marked as `private` is just for one specific user, so only that user and the originator of that information can cache it. 

Hence, in the example above, a browser could actually cache that information (as the user owns it) and the micro-service originating the information can, but the API gateway can't and any eventually CDN in between can't as well.

#### `max-age`

When used in requests, `max-age=n` means that the client is willing to accept content which is not older than `n` seconds.

When used in responses, `max-age=m` means that the information delivered will be considered stale in `m` seconds.

# Final Words

This is the end of this Christmas streak, but maybe not the end of this caching series. Who knows? There are a lot more things we can cover...

As always, if you have any feedback (e.g., why did you stop with memes? why are you so obsessed with caching? how could you complete a whole episode without mentioning food?) feel free to reach out.

Until next time!

---
<a id="note1" href="#note1ref">1</a>. We still have Server Side Rendered applications, but _usually_ the backend layer responsible of rendering the client is still not taking care of other parts of business logic, making the whole thing still split to a certain extent.

<a id="note2" href="#note2ref">2</a>. This is not entirely true: there are ways to get stale content even with server rendered applications. We are going to treat how to get fresh content in this (and other cases) in the [HTTP Headers section](#http-headers).

<a id="note3" href="#note3ref">3</a>. We'll dig a bit deeper on how browsers actually understand when to request fresh data or not in the [HTTP Headers section](#http-headers)

<a id="note4" href="#note4ref">4</a>. I am not letting you down ❤ [Here](https://developers.google.com/web/fundamentals/primers/service-workers/)'s a very good introduction by Google on the matter. 

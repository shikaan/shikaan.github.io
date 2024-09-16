---
title: "A friendly introduction to assembly for high-level programmers — Functions"
description: "A friendly introduction to assembly for high-level programmers — Functions"
categories: ["assembly", "x86", "guide"]
date: "2024-09-16"
---

[In the previous article]({% post_url 2024-09-16-x86-64-conditionals %}) we learned about Control Transfer Instructions and we have seen how they are the cornerstone of control flow in assembly. We looked at the simplest of them, jump, and learned how to implement conditionals.

Today we will look at reproducing functions in assembly: we will keep a linear flow where we can jump to arbitrary code, and once we are done, execution continues from where it left. During our journey, we will learn how to pass parameters to functions and calling conventions. 

## More Control Transfer Instructions

The Control Transfer Instructions we will use to model functions are `call` (call) and `ret` (return).


{% include post-footer.html %}

---

{% include code-editor.html %}

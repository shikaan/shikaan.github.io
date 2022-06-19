---
layout: default
---
<header>
  <h1>{{ site.title }}</h1>
  
  {%-include about.html-%}
</header>

{%-include menu_item.html collection=site.data.menu.entries-%}
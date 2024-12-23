---
title: Reactive CSS variables
type: note
date: '2022-07-10T12:00'
lang: en
tags: ['css', 'frontend']
permalink: "note/reactive-css-variables/"
draft: true
---
<!-- Inspired by Lea Verou's recent CSS Day 2022 talk about CSS Variables Secrets [video](https://www.youtube.com/watch?v=ZuZizqDF4q8) I started to try and wrap my head around some of her techniques myself. Techniques like 'Space toggle' or 'Linear mapping' for conditionals are pretty cool and inspired me to waste an evening understanding the techniques, while trying to do some stuff that's unfortunatly (still) impossible. -->

I've been using CSS variables a lot lately as properties for Angular components. These are emulated Web Components, so component styling is encapsulated and can't be changed outside of the component itself, except by using CSS variables. In my case it's mostly spacing related properties such as margins. Because the trickiest thing is to control spacing of nested components. By utilizing CSS variables it's possible to control this parent > child specific behaviour pretty well. Actually, it's the only thing that seems to be working for in this situation, having tried several different ways to control the spacing between components. CSS variables are the way to go for now (until I can use [CSS shadow parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part) with Angular).
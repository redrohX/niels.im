---
title: Component spacing in design systems
date: '2022-05-01T15:00'
tags: ["design system", "css"]
draft: true
---
When I started the job at my current employer one of the biggest challenges was to figure out a way to handle the spacing of our components within our design system.

We create components in a design system to be able to reuse them throughout the whole application. But making this sometimes tricky is the question of how and where do we define spacing?

With spacing I mean the outside space of components, usually defined with the CSS key of `margin`. If you place multiple components in a layout, ideally you don't want them to stick together, but have some kind of white-space between them, so they stick out for the user. Being able to create different types of layouts with simple building blocks.

*image example of components without white-space*

It's possible to make a component handle its own spacing with some simple CSS rules. But what will often happen is that in certain contexts the spacing of the component should be different from what was defined. How can we solve this?

In our case, we used the special Angular selector `:host-context()` that seems to be created for situations like these. It applies styles to elements within a component's template based on some condition in an element that is an ancestor of the host element. But this can get quite complex if there are numerous different conditions. In our case, those conditions were based on the context of different parent components.

```scss
card.components.scss

.card {
	margin-bottom: 1rem;
}

// This has higher specificity than .card
:host-context(.grid--lg) :host .card {
	margin-bottom: 2rem;
}

// This has higher specificity than .card
:host-context(.grid--xl) :host .card {
	margin-bottom: 4rem;
}
```

Do we really want a component to know about the different contexts it can be used in? In my opinion it's better to keep the logics of a component simple and contain the logic of the context to the context itself.

```scss
grid.components.scss

.grid--lg {
	...
	> card {
		margin-bottom: 2rem;
	}
}

.grid--xl {
	...
	> card {
		margin-bottom: 4rem;
	}
}
```

If we want the same logic for other components inside the grid, the above can be written with the global selector (`> *`) instead of `> .card`.

The above works with Vue.js and similar frameworks, but because we are using Angular there is a problem with this solution. Because Angular is emulating the Shadow DOM the CSS is encapsulated and is unable to escape a component. In this case, we can't directly style the card component from inside the grid component. The styling can't penetrate through the Grid component Shadow DOM and in this case won't be able to style the Card.

There used to be a native way to escape the encapsulation of a component (the `/deep/` selector), but this has been deprecated. Angular emulated this with `::ng-deep`. While it is recommended not to use this solution anymore we did use it ay my company to move spacing to the context of parent components. With `::ng-deep` being deprecated there are luckily better ways of doing this nowadays.




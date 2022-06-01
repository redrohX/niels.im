---
title: "TIL: UUID's with the Crypto property in the Web API"
date: '2022-06-01T13:00'
tags: ['UUID', 'TIL', 'JS']
type: 'article'
lang: en
permalink: "article/uuids-with-the-crypto-property-in-the-web-api/"
---
Something I learned today: nowadays it's relatively easy to generate a UUID (Universally Unique Identifier) in JavaScript with the global `crypto` property in the Web API.

By calling `crypto.randomUUID()` you'll generate a string containing a randomly generated, 36 character long v4 UUID that can be used in multiple different contexts.

Personally I've used UUID's for components in a design system where I needed a uniquely labelled ID attribute on a HTML element for accessibility reasons. For instance `label` elements referring to inputs, but also `aria-describedby` to establish a relationship between elements or groups and the text that describes them.

Browser support is promising ([78,98%](https://caniuse.com/mdn-api_crypto_randomuuid) as of writing this). But if you need to support older browsers then I suggest to use the [node UUID](https://github.com/uuidjs/uuid) package for now.

---
date: 2023-01-17T18:16:26.545Z
title: Two ways to test Angular components with Storybook
excerpt: At work I've been looking at the possibility of moving our Angular component tests to Storybook with test runner, but I'm not sure if this is the right way to go for us.
published: false
visibility: public
mp-syndicate-to:
  - https://indieweb.social/@niels
---
At work I've been looking at the possibility of moving our Angular component tests to Storybook. The [Storybook test runner](https://github.com/storybookjs/test-runner) uses **Jest** as a runner, and **Playwright** as a testing framework. Each one of our `.stories` files would then be transformed into a `spec` file, and each story becomes a test, which is run in a headless browser.

Test Runner also easily integrates with the Storybook UI by installing the [interactions add-on](https://storybook.js.org/addons/@storybook/addon-interactions). The whole idea makes a lot of sense. Write your stories and then create tests inside these stories that makes use of all the defined properties and scenarios.

But we have around 30 components in Storybook  and a lot of tests. Perhaps it's not the best idea to spend my time to translate all these **Jasmine** tests to **Jest** and move them into our stories. Also, we use Angular's own internal testing feature, by moving over to Jest we will make our (already complex) stack perhaps even more complex.

I haven't tried it yet, but right now I'm looking at the add-on [@storybook/testing-angular](https://github.com/storybookjs/testing-angular) which kind of does the opposite of test runner. It makes it possible to reuse our Storybook stories in our existing Angular tests. All args and decorators from our story and its meta, and also global decorators, will be composed by this library and returned in a simple component. We can keep our existing tests, we can keep our Jenkins process, but use our Storybook stories to feed and improve our existing and new tests with relevant scenarios. The only thing I'm missing here is the integration with the Interactions add-on.

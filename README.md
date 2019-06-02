# taskbox project

Based on the [Learn Storybook](https://www.learnstorybook.com/vue/en/get-started/) course for `Vue.js`.

For Project Setup see [Project setup](#project-setup).

## Personal Notes

### Custom Webpack Config

Based on [Custom Webpack Config](https://storybook.js.org/docs/configurations/custom-webpack-config/#full-control-mode).

#### Debug the default webpack config

To effectively customise the webpack config, you might need to get the full default config it's using.

- Create a `.storybook/webpack.config.js` file.
- Edit its contents:
	``` javascript
	module.exports = async ({ config }) => console.dir(config.plugins, { depth: null }) || config;
  ```
- Then run storybook:
	``` bash
	yarn storybook --debug-webpack
	```

The console should log the entire config, for you to inspect.

### Actions

__Actions_ help you verify interactions when building UI components in isolation. Oftentimes you won't have access to the functions and state you have in context of the app. Use `action()` to stub them in.

---

## Troubleshooting

### Required.context is not a function

The `.storybook/config.js` files contains this line:

``` javascript
const req = require.context('../src', true, /\.stories\.js$/)
```

When running unit tests, this line produced the above mentioned error.

According to the [StoryShots repo](https://github.com/storybookjs/storybook/tree/master/addons/storyshots/storyshots-core), `require.context` is a __Webpack__ feature. The problem here is that it will work only during the build with webpack, other tools may lack this feature. Since Storyshot is running under Jest, we need to polyfill this functionality to work with Jest. The easiest way is to integrate it to __Babel__.

There are two ways to connect: with a Babel [plugin](https://github.com/smrq/babel-plugin-require-context-hook) or [macro](https://github.com/storybooks/require-context.macro). The advice is to use macro if you're using `create-react-app` (v2 or above).

We are using Vue.js in this project. I have tried to go the "macro" way but got compile time errors. Fortunately, the "plugin" way worked fine.

### Storybook.spec.js

After working through the tutorial later on I have come across a piece of code that may as well have helped to avoid the above mentioned error.

Consider the suggested code of the `tests/unit/storybook.spec.js` file:

``` js
import registerRequireContextHook from "babel-plugin-require-context-hook/register";
import initStoryshots from "@storybook/addon-storyshots";

registerRequireContextHook();
initStoryshots();
```

This means that we could have imported the `registerRequireContextHook` directly in the `tests/unit/storybook.spec.js` file instead of doing that in `.jest/register-context.js` and adding the latter to the `jest.config.js`.

---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# BeerLocator - Front-end Challenge

## About this challenge

My personal quest was to create this app using only vanilla Javascript with a modern twist, using ES6 modules do organize my code.

  I decided to really challenge myself, I didn't use any SPA framework (React, Angular, etc).


## Preview
  - https://rodrigovallades.github.io/beer-es6/

## Technologies used

- [x] ES6 + Babel: modules, classes and constructors, template strings, spread operator, arrow functions;
- [x] PostCSS: mixins, variables, imports, nesting;
- [x] Flexbox
- [x] Build: Webpack + Gulp + Babel + PostCSS;
- [ ] No Bootstrap used!
- [ ] No jQuery used!
- [ ] No SPA framework used!

## Techniques used

- [x] BEM: CSS naming is following (block__element--modifier) pattern;
- [x] Mobile first approach: the layout, the dimensions and the font sizes are primarily set for mobile screens and then inscreased as needed for bigger screens;
- [x] Code organization using ES6 modules and CSS imports;
- [x] Handmade "components" in pure Javascript using ES6 template strings.

## Development setup
```
1. **npm install** (download dependencies);
2. **npm install -g gulp** (if you don't have Gulp installed globally);
3. **npm start** (creates a 'temp' folder and auto-starts Browsersync with hot-reloading on localhost:3000).
```

## How to build for production

  1. **npm install** (download dependencies);
  2. **npm install -g gulp** (if you don't have Gulp installed globally);
  3. **npm run build** (creates a 'docs' folder minified + uglyfied and ready for deployment).

Thank you,
Rodrigo

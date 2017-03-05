# Incremental Grid

## Pushing data to the DOM with RxJS

A nice exercise to learn the mechanisms of pushing data to the DOM using RxJS.

You can see a [live demo here](https://rodu.github.io/incremental-grid/).

I needed this component for an other application in a different project, so I decided to develop something first in isolation that resulted in this example.

The objective of this project was to understand the mechanism that can be used, and to provide an initial solution that can be built upon.

## Tech stack

**The project is written in vanilla JavaScript ES6 with no transpilation**

You should run this project in a modern browser like (Chrome, Safari, Firefox or Edge 12) as I did not bother to translate the code back to ES5.

**IE 11 may not be able to run the demo.**

The application uses RxJS as the only library for reactive programming.

## Getting Started

Clone the project and run as usual:

```
npm install
npm start
```

## Configuration

The data set can be configured to produce any number of rows, and for each row a set of cells with random data can be generated.

In a more realistic scenario we could have such data coming from Ajax requests, or a different source.


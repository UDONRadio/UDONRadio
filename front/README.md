# About
This folder is the home for the client application.
It is written in Javascript with [ReactJS](https://reactjs.org), and
relies on API requests only (mainly to the server in `../back`), as
**there is no HTML templating done**.

```sh
front$ tree -d
.
├── public # this is for static assets, like images or css stylesheets
└── src # this is the ReactJS source code 
    ├── components # reusable React components
    └── containers # state-managing / composing containers

4 directories
```

# Getting started

## Prerequisites
It is strongly advised to be familiar with the concepts of client-side
rendering exposed in the React tutorials for instance before starting
development.

* The API server should be set up and started as described [here](../back/).
* `node` > v8 installed as well as `npm` (see [NodeJS website](https://nodejs.org/en/download/) for installation guidelines)

## Installing node packages
Simply run `npm install`.

## Running React-Dev-Tools
Run `npm start`. From there a hot reloading page should be opened in the browser.

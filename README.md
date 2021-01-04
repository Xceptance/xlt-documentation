# XLT Documentation

XLT Documentation is based on Docsy. Docsy is a [Hugo](https://gohugo.io/) theme for technical documentation sets, providing simple navigation, site structure, and more.

## Prerequisites

The following are basic prerequisites:

- Install a recent release of the Hugo "extended" version (we recommend version 0.74 or later). 
If you install from the [release page](https://github.com/gohugoio/hugo/releases), make sure you download the `_extended` version which supports SCSS.

- Install the current Node environment (version > 14.x)

- Install all further dependencies by executing `npm ci` on the console within the documentations root folder

## Build

Build and deploy to a local webserver:

```
hugo server --watch --disableFastRender
```

Just build:
```
hugo
```

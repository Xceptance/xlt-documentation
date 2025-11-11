# XLT Documentation

XLT Documentation is based on Docsy. Docsy is a [Hugo](https://gohugo.io/) theme for technical documentation sets, providing simple navigation, site structure, and more.

## Prerequisites

The following are basic prerequisites:

- The standard `git clone` command does not automatically fetch submodule content. You must use the `--recurse-submodules` flag, or run separate `git submodule init` and `git submodule update` commands afterward.

- Install a recent release of the Hugo "extended" version (we recommend version 0.131.0 or later). 
If you install from the [release page](https://github.com/gohugoio/hugo/releases), make sure you download the `_extended` version which supports SCSS.

- [Install the current Node environment](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (version > 14.x).

- Install all further dependencies by executing `npm ci` on the console within the documentation's root folder.

## Build

Install Docsy Dependencies:

```
cd themes/docsy
npm install
cd ../..
```

Build and deploy to a local webserver:

```
hugo server --watch --disableFastRender
```

Just build:

```
hugo
```

The default address for your build will be [localhost:1313](localhost:1313). If you need to change the port for some reason, use:

```
hugo server --watch --disableFastRender --port 2626
```


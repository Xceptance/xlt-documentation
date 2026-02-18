# XLT Documentation

XLT Documentation is based on [Docsy](https://www.docsy.dev/), a [Hugo](https://gohugo.io/) theme for technical documentation sets that provides simple navigation, site structure, and more.

## Prerequisites

The following are the basic prerequisites to build the documentation locally:

- **Hugo**: Install a recent release of the Hugo "extended" version (we recommend version 0.150.0 or later). If you install from the [release page](https://github.com/gohugoio/hugo/releases), ensure you download the `_extended` version which supports SCSS.
- **Node.js**: [Install the current Node environment](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (version > 14.x).
- **Dependencies**: Install all further dependencies by executing `npm ci` in the documentation's root folder.

## Build and Preview

### Local Development Server

To build and deploy the documentation to a local web server with live reloading:

```bash
hugo server --watch --disableFastRender
```

The documentation will be available at [http://localhost:1313](http://localhost:1313).

### Custom Port

If you need to change the port, use the following command:

```bash
hugo server --watch --disableFastRender --port 2626
```

### Static Build

To generate the static site in the `public/` directory:

```bash
hugo
```

## How to Contribute

We welcome contributions! To suggest changes or add new content, please follow these steps:

1. **Fork the Repository**: Create your own copy of the repository by clicking the **Fork** button at the top of the GitHub page.
2. **Clone and Branch**: Clone your fork locally and create a new branch for your changes:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**: Update or add documentation files in the `content/` directory.
4. **Build and Preview**: Ensure everything looks correct by running the local development server (see [Build and Preview](#build-and-preview) section above).
5. **Commit and Push**: Commit your changes with a descriptive message and push them to your fork:

   ```bash
   git add .
   git commit -m "Brief description of changes"
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**: Go to the original repository on GitHub and create a Pull Request from your branch.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

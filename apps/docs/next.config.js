const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "docs",
          remotes: {
            web: `web@http://localhost:3001/_next/static/chunks/remoteEntry.js`,
            docs: "docs@http://localhost:3002/_next/static/chunks/remoteEntry.js",
          },
          filename: "static/chunks/remoteEntry.js",
          exposes: {
            "./title": "./components/exposedTitle.js",
            "./checkout": "./pages/checkout",
            "./pages-map": "./pages-map.js",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};

const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {},
  transpilePackages: ["ui"],
  webpack(config, options) {
    if (!options.isServer) {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "web",
          filename: "static/chunks/remoteEntry.js",
          remotes: {
            web: "web@http://localhost:3001/_next/static/chunks/remoteEntry.js",
            docs: "docs@http://localhost:3002/_next/static/chunks/remoteEntry.js",
          },
          exposes: {
            "./nav": "./components/nav.js",
          },
          shared: {},
        })
      );
    }

    return config;
  },
};

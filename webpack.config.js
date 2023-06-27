const path = require("path");
const nodeExternals = require("webpack-node-externals");
const CleanWebpack = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    target: "node",
    externals: [nodeExternals()], // removes node_modules from your final bundle
    entry: {
        main: "./src/app.ts", // make sure this matches the main root of your code
    },
    output: {
        path: path.resolve(__dirname, "dist"), // this can be any path and directory you want
        filename: "app.js",
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    plugins: [new CleanWebpack.CleanWebpackPlugin()],
};

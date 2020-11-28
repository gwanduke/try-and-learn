const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.ts",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/i,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },
  devServer: {
    host: "localhost",
    open: true,
    hot: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
  },
};

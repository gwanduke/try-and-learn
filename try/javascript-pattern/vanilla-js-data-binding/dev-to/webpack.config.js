const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const path = require("path");
const port = process.env.PORT || 3000;

module.exports = (_env, options) => {
  const config = {
    entry: {
      app: "./src/index.ts",
    },
    output: {
      path: path.resolve(__dirname, "./build"),
      filename: "[name].[fullhash].js",
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin(),
      new ForkTsCheckerWebpackPlugin(),
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
        {
          test: /\.html$/i,
          loader: "html-loader",
          options: {
            esModule: true,
          },
        },
        {
          test: [/\.css$/, /\.s[ac]ss$/i],
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js", ".json"],
    },
  };

  if (options.mode === "development") {
    config.devtool = "inline-source-map";
    config.devServer = {
      host: "localhost",
      port: port,
      open: true,
      hot: true,
      historyApiFallback: true,
    };
  } else {
    // production
    config.plugins.push(new CleanWebpackPlugin());
    config.optimization = {
      minimize: true,
      minimizer: ["...", new CssMinimizerPlugin()],
    };
  }

  return config;
};

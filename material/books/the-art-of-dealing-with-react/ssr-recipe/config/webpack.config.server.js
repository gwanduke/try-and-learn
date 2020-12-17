// const nodeExternals = require("webpack-node-externals");
const paths = require("./paths");
// CSS Module의 고유 className을 만들 때 필요한 정보
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

// 환경 변수 주입 위함
const webpack = require("webpack");
const getClientEnvironment = require("./env");

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const env = getClientEnvironment(paths.publicUrlOrPath.slice(0, -1));

module.exports = {
  mode: "production",
  entry: paths.ssrIndexJs, // 엔트리
  target: "node", // node 환경에서 실행됨을 명시
  output: {
    path: paths.ssrBuild, // 빌드가 들어갈 경로
    filename: "server.js",
    chunkFilename: "js/[name].chunk.js",
    publicPath: paths.publicUrlOrPath, // 정적 파일 제공 경로
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|mjs|jsx|ts|tsx)$/,
            include: paths.appSrc,
            loader: require.resolve("babel-loader"),
            options: {
              customize: require.resolve(
                "babel-preset-react-app/webpack-overrides"
              ),
              presets: [[require.resolve("babel-preset-react-app")]],
              plugins: [
                [
                  require.resolve("babel-plugin-named-asset-import"),
                  {
                    loaderMap: {
                      svg: {
                        ReactComponent:
                          "@svgr/webpack?-svgo,+titleProp,+ref![path]",
                      },
                    },
                  },
                ],
              ].filter(Boolean),
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,
              compact: true,
            },
          },
          {
            test: /\.(js|mjs)$/,
            exclude: /@babel(?:\/|\\{1,2})runtime/,
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              configFile: false,
              compact: false,
              presets: [
                [
                  require.resolve("babel-preset-react-app/dependencies"),
                  { helpers: true },
                ],
              ],
              cacheDirectory: true,
              // See #6846 for context on why cacheCompression is disabled
              cacheCompression: false,

              // Babel sourcemaps are needed for debugging into node_modules
              // code.  Without the options below, debuggers like VSCode
              // show incorrect code and set breakpoints on the wrong lines.
              sourceMaps: false,
              inputSourceMap: false,
            },
          },
          {
            test: cssRegex,
            exclude: cssModuleRegex,
            loader: require.resolve("css-loader"),
            options: {
              modules: {
                exportOnlyLocals: true,
              },
            },
          },
          {
            test: cssModuleRegex,
            loader: require.resolve("css-loader"),
            options: {
              modules: true,
              onlyLocals: true,
              getLocalIdent: getCSSModuleLocalIdent,
            },
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  onlyLocals: true,
                },
              },
              require.resolve("sass-loader"),
            ],
          },
          {
            test: sassRegex,
            exclude: sassModuleRegex,
            use: [
              {
                loader: require.resolve("css-loader"),
                options: {
                  modules: true,
                  onlyLocals: true,
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
              require.resolve("sass-loader"),
            ],
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: require.resolve("url-loader"),
            options: {
              emitFile: false, // 파일 저장 X
              limit: 10000,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },

          {
            loader: require.resolve("file-loader"),
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise be processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
            options: {
              emitFile: false,
              name: "static/media/[name].[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  // resolve: {
  //   modules: ["node_modules"],
  // },
  // externals: [nodeExternals()],
  plugins: [new webpack.DefinePlugin(env.stringified)],
};

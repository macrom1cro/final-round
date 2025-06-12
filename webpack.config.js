const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const { extendDefaultPlugins } = require("svgo");
const sass = require("sass");

const json = require("./package.json");
const project_name = json.name;
const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = ext =>
  isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: "all",
    },
  };

  if (isProd) {
    configObj.minimizer = [
      new CssMinimizerWebpackPlugin(),
      new TerserWebpackPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["mozjpeg", { quality: 80 }], // Для JPEG
              ["optipng", { optimizationLevel: 5 }],
              ["pngquant", { quality: [0.7, 0.9] }], // Для PNG
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false, // Пример настройки
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ];
  }
  return configObj;
};

const plugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src/index.html"),
      filename: "index.html",
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `./css/${filename("css")}`,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "app/assets"),
        },
      ],
    }),
  ];

  return basePlugins;
};

module.exports = {
  mode: "development",
  context: path.resolve(__dirname, "src"),
  entry: "./js/main.js",
  output: {
    filename: `./js/${filename("js")}`,
    path: path.resolve(__dirname, "app"),
    clean: true,
    publicPath: "",
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    compress: true,
    hot: true,
    port: 3000,
  },
  performance: {
    maxAssetSize: 300 * 1024, // 300 КБ вместо 244 КБ
    maxEntrypointSize: 300 * 1024,
  },
  optimization: optimization(),
  plugins: plugins(),
  devtool: isProd ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              implementation: sass,
              sourceMap: isDev,
              sassOptions: {
                includePaths: [path.resolve(__dirname, "src/scss")],
              },
            },
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(?:|jpe?g|png|gif|svg|ico)$/i,
        type: "asset/resource",
        generator: {
          filename: () => {
            return isDev ? "img/[name][ext]" : "img/[name].[contenthash][ext]";
          },
        },
      },
      {
        test: /\.(?:|woff2|woff)$/i,
        type: "asset/resource",
        generator: {
          filename: () => {
            return isDev
              ? "fonts/[name][ext]"
              : "fonts/[name].[contenthash][ext]";
          },
        },
      },
    ],
  },
};

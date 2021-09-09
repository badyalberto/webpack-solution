const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  devServer: {
    port: 4000,
    open: true,
    compress: true,
    hot: true,
  },
  entry: {
    main: path.resolve(__dirname, "./src/main.js"),
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "assets/js/[name].bundle.js",
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  stats: {
    children: true,
  },
  plugins: [
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, "./src/index.html"), filename: "index.html" }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
    new ImageMinimizerPlugin({
      test: /\.(jpe?g)$/i,
      minimizerOptions: {
        plugins: ["mozjpeg","pngquant"],
      },
    }),
    new ImageMinimizerPlugin({
      filter: (source, sourcePath) => {
        // The `source` argument is a `Buffer` of source file
        // The `sourcePath` argument is an absolute path to source
        console.log(/\.(png)$/.test(sourcePath) ,source.byteLength > 12000,sourcePath);
        if (/\.(png)$/.test(sourcePath) && source.byteLength > 12000) {
          return true;
        }
        return false;
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|gif|svg)$/i,
        type: "asset/inline",
      },
      {
        test: /\.jpe?g$/i,
        type: "asset/resource",
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};

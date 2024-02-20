import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import dotenv from "dotenv";
const mode = (process.argv[2] === "--watch") ? "development" : "production";

const properties = {
  mode,
  entry: { main: path.resolve("./client/index.js") },
  output: { path: path.resolve("./bundle"), filename: "bundle.js" },
  plugins: [
    new webpack.ProvidePlugin({ React: "react" }),
    new webpack.DefinePlugin({ "process.env": (mode === "development") ? { "RECAPTCHA_v3_SITE_KEY": JSON.stringify(dotenv.config().parsed.RECAPTCHA_v3_SITE_KEY) } : "" }),
    new HtmlWebpackPlugin({ template: path.resolve("./client/index.html"), favicon: path.resolve("./utilities/assets/cvFavicon.ico") })
  ],
  module: {
    rules: [
      {
        test: /\.js|jsx/,
        use: {
          loader: "babel-loader",
          options: { presets: ["@babel/preset-env", "@babel/preset-react"], compact: true }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|png)$/,
        type: "asset/resource"
      },
      {
        test: /\.m?js$/,
        resolve: { fullySpecified: false }
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};

export default properties;

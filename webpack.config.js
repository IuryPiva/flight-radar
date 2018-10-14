const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, './client/main.ts'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: './main.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './views/index.ejs'
    })
  ],
  resolve: {
    extensions: [
      '.ts', // for ts-loader
      '.js' // for style-loader
    ]
  },
  module: {
    rules: [{
        test: /(\.js$|\.ts(x?)$)/,
        exclude: /node_modules/,
        use: [{
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true //HMR doesn't work without this
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader'
      },
      {
        test: /\.ejs$/,
        use: 'ejs-compiled-loader'
      },
      {
        test: /\.(scss)$/,
        use: [{
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader'
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader'
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
}
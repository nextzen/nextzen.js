var webpack = require('webpack');

var path = require('path');

const PROJECT_SRC = path.resolve(__dirname, '../src');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var bower_dir = path.join(__dirname, 'bower_components');

const config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(path);
  },
  entry: [
    'webpack-hot-middleware/client',
    './app/App'
  ],
  output: {
    path: process.env.NODE_ENV === 'local'? path.resolve(__dirname, '/maps/maps') : path.resolve(__dirname, '/maps'),
    filename: 'bundle.js',
    publicPath: '/maps/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  devtool: 'eval',
  module: {
    noParse: [],
    loaders: [{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    },  {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap'
    },
    {
      test: /\.(woff|eot|ttf|svg|png|yaml)$/,
      loader: 'url-loader?limit=100000'
    },
    { 
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      include: [
        path.resolve(__dirname)
      ]
    }]
  },
  resolve: {
    alias: {
      'redux-react-router': PROJECT_SRC
    },
    extensions: ['', '.js']
  }
};

config.addVendor('spinjs', path.resolve(bower_dir, 'spinjs/spin.min.js'));
config.addVendor('jquery', path.resolve(bower_dir, 'jquery/dist/jquery.min.js'));

module.exports = config;

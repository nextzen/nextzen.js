var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var bower_dir = path.join(__dirname, 'bower_components');
var node_modules_dir = path.join(__dirname, 'node_modules');

var config = {
  addVendor: function (name, path) {
    this.resolve.alias[name] = path;
    this.module.noParse.push(path);
  },
  context: __dirname,
  entry: {
    app: process.env.NODE_ENV === 'production' ? ['./app/App.js'] : ['webpack/hot/dev-server', './app/App.js']
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, process.env.NODE_ENV === 'production' ? './dist/' : './build'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {}
  },
  module: {
    noParse: [],
    loaders: [{
      test: /\.js$/,
      loader: 'jsx-loader',
      exclude: [bower_dir, node_modules_dir]
    },{
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(woff|eot|ttf|svg|png|yaml)$/,
      loader: 'url-loader?limit=100000'
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('app', null, false),
    new HtmlWebpackPlugin({
     template:'index.html'
    })
  ]
};


config.addVendor('spinjs', path.resolve(bower_dir, 'spinjs/spin.min.js'));
config.addVendor('jquery', path.resolve(bower_dir, 'jquery/dist/jquery.min.js'));
config.addVendor('ratchet', path.resolve(bower_dir, 'ratchet/dist/css/ratchet.css'));
 
module.exports = config;

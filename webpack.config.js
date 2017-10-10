var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var PurifyCSSPlugin = require('purifycss-webpack');
var path = require("path");
var glob = require('glob');
var glob = require('glob-all');


module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallbackLoader: 'style-loader',
                    loader: ['css-loader','sass-loader'],
                    publicPath: '/dist'
                })
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              use: [
                 'file-loader?name=images/[name].[ext]',
                 'image-webpack-loader?bypassOnDebug'
               ]
          }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
      // Required
      inject: 'body',
      template: './src/index.ejs',
      // template: 'node_modules/html-webpack-template/index.ejs',
       minify: {
           collapseWhitespace: true
       },

      // Optional
      appMountId: 'myApp',
      meta: [
        {
          name: 'identifier-url',
          content: 'http://www.webestools.com/'
        },
        {
          name: 'title',
          content: 'Webestools'
        },
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        },
        {
          name: 'abstract',
          content: 'Tools for webmasters'
        },
        {
          name: 'keywords',
          content: 'tools, webmasters, meta, generator'
        },
        {
          name: 'author',
          content: 'A N Other'
        },
        {
          name: 'revisit-after',
          content: '15'
        },
        {
          name: 'language',
          content: 'EN'
        },
        {
          name: 'copyright',
          content: '© 2017 Webestool'
        },
        {
          name: 'robots',
          content: 'Index, follow'
        },
      ],
      mobile: true,
      lang: 'en',
      links: [
        'https://fonts.googleapis.com/css?family=Roboto',
        {
          href: '/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        },
        {
          href: '/favicon-16x16.png',
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png'
        }
      ],
      inlineManifestWebpackName: 'webpackManifest',
      title: 'My App',
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      },
      title: 'Project Demo',
      // minify: {
      //     collapseWhitespace: true
      // },
      hash: true,
      // And any other config options from html-webpack-plugin:
      // https://github.com/ampedandwired/html-webpack-plugin#configuration
    }),
        /*
        new HtmlWebpackPlugin({
            title: 'Project Demo',
            // minify: {
            //     collapseWhitespace: true
            // },
            hash: true,
            template: './src/index.html', // Load a custom template (ejs by default see the FAQ for details)
        }),
        */
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        new PurifyCSSPlugin({
      // Give paths to parse for rules. These should be absolute!
      paths: glob.sync(path.join(__dirname, 'src/*.html')),
    })
    ]
}

const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');

const { NoEmitOnErrorsPlugin, LoaderOptionsPlugin } = require('webpack');
const { GlobCopyWebpackPlugin, BaseHrefWebpackPlugin } = require('@angular/cli/plugins/webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const entryPoints = ["inline","polyfills","sw-register","scripts","styles","../node_modules/froala-editor/css/froala_editor.min","../node_modules/froala-editor/css/themes/dark.min","../node_modules/froala-editor/css/plugins/code_view.min","../node_modules/froala-editor/css/plugins/colors.min","../node_modules/froala-editor/css/plugins/draggable.min","../node_modules/froala-editor/css/plugins/emoticons.min","../node_modules/froala-editor/css/plugins/image.min","../node_modules/froala-editor/css/plugins/line_breaker.min","../node_modules/froala-editor/css/plugins/quick_insert.min","../node_modules/froala-editor/css/plugins/video.min","../node_modules/codemirror/lib/codemirror","vendor","main"];
const baseHref = "";
const deployUrl = "";




module.exports = {
  "devtool": "source-map",
  "resolve": {
    "extensions": [
      ".ts",
      ".js"
    ],
    "modules": [
      "./node_modules"
    ]
  },
  "resolveLoader": {
    "modules": [
      "./node_modules"
    ]
  },
  "entry": {
    "main": [
      "./src\\main.ts"
    ],
    "scripts": [
      "script-loader!./node_modules\\jquery\\dist\\jquery.min.js",
      "script-loader!./node_modules\\tinymce\\tinymce.js",
      "script-loader!./node_modules\\tinymce\\plugins\\advlist\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\autolink\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\lists\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\link\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\imagetools\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\image\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\charmap\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\preview\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\code\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\media\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\table\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\contextmenu\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\paste\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\colorpicker\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\emoticons\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\tabfocus\\plugin.js",
      "script-loader!./node_modules\\tinymce\\plugins\\textcolor\\plugin.js",
      "script-loader!./node_modules\\tinymce\\themes\\modern\\theme.js",
      "script-loader!./node_modules\\dropzone\\dist\\dropzone.js",
      "script-loader!./node_modules\\codemirror\\lib\\codemirror.js",
      "script-loader!./node_modules\\froala-editor\\js\\froala_editor.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\align.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\url.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\quick_insert.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\link.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\image.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\font_size.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\font_family.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\draggable.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\video.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\code_view.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\code_beautifier.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\emoticons.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\plugins\\colors.min.js",
      "script-loader!./node_modules\\froala-editor\\js\\languages\\de.js"
    ],
    "styles": [
      "./src\\styles\\styles.scss",
      "./node_modules\\font-awesome\\scss\\font-awesome.scss",
      "./node_modules\\froala-editor\\css\\froala_editor.min.css",
      "./node_modules\\froala-editor\\css\\themes\\dark.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\code_view.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\colors.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\draggable.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\emoticons.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\image.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css",
      "./node_modules\\froala-editor\\css\\plugins\\video.min.css",
      "./node_modules\\codemirror\\lib\\codemirror.css"
    ],
    "../node_modules/froala-editor/css/froala_editor.min": [
      "./node_modules\\froala-editor\\css\\froala_editor.min.css"
    ],
    "../node_modules/froala-editor/css/themes/dark.min": [
      "./node_modules\\froala-editor\\css\\themes\\dark.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/code_view.min": [
      "./node_modules\\froala-editor\\css\\plugins\\code_view.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/colors.min": [
      "./node_modules\\froala-editor\\css\\plugins\\colors.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/draggable.min": [
      "./node_modules\\froala-editor\\css\\plugins\\draggable.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/emoticons.min": [
      "./node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/image.min": [
      "./node_modules\\froala-editor\\css\\plugins\\image.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/line_breaker.min": [
      "./node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/quick_insert.min": [
      "./node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"
    ],
    "../node_modules/froala-editor/css/plugins/video.min": [
      "./node_modules\\froala-editor\\css\\plugins\\video.min.css"
    ],
    "../node_modules/codemirror/lib/codemirror": [
      "./node_modules\\codemirror\\lib\\codemirror.css"
    ]
  },
  "output": {
    "path": path.join(process.cwd(), "dist"),
    "filename": "[name].bundle.js",
    "chunkFilename": "[id].chunk.js"
  },
  "module": {
    "rules": [
      {
        "enforce": "pre",
        "test": /\.js$/,
        "loader": "source-map-loader",
        "exclude": [
          /\/node_modules\//
        ]
      },
      {
        "test": /\.json$/,
        "loader": "json-loader"
      },
      {
        "test": /\.html$/,
        "loader": "raw-loader"
      },
      {
        "test": /\.(eot|svg)$/,
        "loader": "file-loader?name=[name].[hash:20].[ext]"
      },
      {
        "test": /\.(jpg|png|gif|otf|ttf|woff|woff2|cur|ani)$/,
        "loader": "url-loader?name=[name].[hash:20].[ext]&limit=10000"
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.css$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.less$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "less-loader"
        ]
      },
      {
        "exclude": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.styl$/,
        "loaders": [
          "exports-loader?module.exports.toString()",
          "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
          "postcss-loader",
          "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
        ]
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.css$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.scss$|\.sass$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader",
    "sass-loader"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.less$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader",
    "less-loader"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "include": [
          path.join(process.cwd(), "src\\styles\\styles.scss"),
          path.join(process.cwd(), "node_modules\\font-awesome\\scss\\font-awesome.scss"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\froala_editor.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\themes\\dark.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\code_view.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\colors.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\draggable.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\emoticons.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\image.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\line_breaker.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\quick_insert.min.css"),
          path.join(process.cwd(), "node_modules\\froala-editor\\css\\plugins\\video.min.css"),
          path.join(process.cwd(), "node_modules\\codemirror\\lib\\codemirror.css")
        ],
        "test": /\.styl$/,
        "loaders": ExtractTextPlugin.extract({
  "use": [
    "css-loader?{\"sourceMap\":false,\"importLoaders\":1}",
    "postcss-loader",
    "stylus-loader?{\"sourceMap\":false,\"paths\":[]}"
  ],
  "fallback": "style-loader",
  "publicPath": ""
})
      },
      {
        "test": /\.ts$/,
        "loader": "@ngtools/webpack"
      }
    ]
  },
  "plugins": [
    new NoEmitOnErrorsPlugin(),
    new GlobCopyWebpackPlugin({
      "patterns": [
        "assets"
      ],
      "globOptions": {
        "cwd": "C:\\Users\\Gernot\\IdeaProjects\\hsr\\src",
        "dot": true,
        "ignore": "**/.gitkeep"
      }
    }),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      "template": "./src\\index.html",
      "filename": "./index.html",
      "hash": false,
      "inject": true,
      "compile": true,
      "favicon": false,
      "minify": false,
      "cache": true,
      "showErrors": true,
      "chunks": "all",
      "excludeChunks": [
        "../node_modules/froala-editor/css/froala_editor.min",
        "../node_modules/froala-editor/css/themes/dark.min",
        "../node_modules/froala-editor/css/plugins/code_view.min",
        "../node_modules/froala-editor/css/plugins/colors.min",
        "../node_modules/froala-editor/css/plugins/draggable.min",
        "../node_modules/froala-editor/css/plugins/emoticons.min",
        "../node_modules/froala-editor/css/plugins/image.min",
        "../node_modules/froala-editor/css/plugins/line_breaker.min",
        "../node_modules/froala-editor/css/plugins/quick_insert.min",
        "../node_modules/froala-editor/css/plugins/video.min",
        "../node_modules/codemirror/lib/codemirror"
      ],
      "title": "Webpack App",
      "xhtml": true,
      "chunksSortMode": function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      "name": "inline",
      "minChunks": null
    }),
    new CommonsChunkPlugin({
      "name": "vendor",
      "minChunks": (module) => module.resource && module.resource.startsWith(nodeModules),
      "chunks": [
        "main"
      ]
    }),
    new ExtractTextPlugin({
      "filename": "[name].bundle.css",
      "disable": true
    }),
    new LoaderOptionsPlugin({
      "sourceMap": false,
      "options": {
        "postcss": [
          autoprefixer(),
          postcssUrl({"url": (URL) => {
            // Only convert root relative URLs, which CSS-Loader won't process into require().
            if (!URL.startsWith('/') || URL.startsWith('//')) {
                return URL;
            }
            if (deployUrl.match(/:\/\//)) {
                // If deployUrl contains a scheme, ignore baseHref use deployUrl as is.
                return `${deployUrl.replace(/\/$/, '')}${URL}`;
            }
            else if (baseHref.match(/:\/\//)) {
                // If baseHref contains a scheme, include it as is.
                return baseHref.replace(/\/$/, '') +
                    `/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
            }
            else {
                // Join together base-href, deploy-url and the original URL.
                // Also dedupe multiple slashes into single ones.
                return `/${baseHref}/${deployUrl}/${URL}`.replace(/\/\/+/g, '/');
            }
        }})
        ],
        "sassLoader": {
          "sourceMap": false,
          "includePaths": []
        },
        "lessLoader": {
          "sourceMap": false
        },
        "context": ""
      }
    }),
    new AotPlugin({
      "mainPath": "main.ts",
      "hostReplacementPaths": {
        "environments\\environment.ts": "environments\\environment.ts"
      },
      "exclude": [],
      "tsConfigPath": "src\\tsconfig.app.json"
    })
  ],
  "node": {
    "fs": "empty",
    "global": true,
    "crypto": "empty",
    "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false
  }
};

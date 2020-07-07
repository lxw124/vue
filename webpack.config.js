const path=require('path')
const HappyPack=require('happypack');
const happyThreadPool=HappyPack.ThreadPool({size:5})
const ParallelUglifyPlugin=require('webpack-parallel-uglify-plugin')

module.exports={
    entry:'./src/index.js',
    output:{
        path:path.resolve(__dirname,'./dist'),
        publicPath:'/dist/',
        filename:'build.js'
    },
    module:{
        rules:[{test:/\.css$/,
            use:['happypack/loader?id=css']
        },
        {test:/\.js$/,
        use:['happypack/loader?id=js'],
        exclude:path.resolve(__dirname,'node_modules')
        },
        {test:/\.vue$/,
        use:['vue-loader']
        },
        {test:/\.png$/,
        use:['url-loader']
        },
        {test:/\.(jpg|gif|svg)$/,
        loader:'file-loader',
        options:{
            name:'[name].[ext]?[hash]'
        }
        },
        ]
    },
    resolve:{
       alias:{'vue$':'vue/dist/vue.esm.js'},
        extensions:['*','.js','.vue','.json']
    },
    devServer:{
        historyApiFallback:true,
        noInfo:true,
        overlay:true
    },

   

    performance:{hints:false},
    devtool:'#eval-source-map'
}
if(process.env.NODE_ENV='development'){
    module.exports.plugins=[
        new HappyPack({id:'js',loaders:['babel-loader'],threadPool:happyThreadPool}),
        new HappyPack({id:'css',loaders:['vue-style-loader','css-loader'],threadPool:happyThreadPool})
    ]
}else{
    module.exports.plugins=[
        new HappyPack({id:'js',loaders:['babel-loader'],threadPool:happyThreadPool}),
        new HappyPack({id:'css',loaders:['vue-style-loader','css-loader'],threadPool:happyThreadPool}),
        new ParallelUglifyPlugin({uglifyJS:{
            output:{beautify:false,
                comments:false,
            },
            compress:{
                drop_console:true,
                collapse_vars:true,
                reduce_vars:true
            }
            
        }})
    ]
}
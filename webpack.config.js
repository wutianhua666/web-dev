// module.exports = {
//     entry: {
//         "home": './src/js/home.js',
//         "signin": './src/js/signin.js',
//         "signup": './src/js/signup.js',
//     },
//     output: { // 出口文件路径，_dirname 指向当前项目跟路径。
//         path: __dirname + '/src/bundle',
//         filename: 'js/[name].bundle.js'
//     }
// }

// 当入口文件较多时,封装一个简单的获取方法来获取所有入口文件。
const path = require('path');
const fs = require('fs');

const getEntry = {
    // 获取需要打包生成的模板数量
    entry: function(dirPath,option){
        const fileArr = fs.readdirSync(dirPath);
        const files = fileArr.filter(function(file){
            return option.test(file);
        });
        const entries = {};
        let dirname;
        let basename;
        let extname;
        for (var i = 0; i < files.length; i++) {
            dirname = path.dirname(files[i]);
            extname = path.extname(files[i]);
            basename = path.basename(files[i], extname);
            entries[basename] = dirPath + basename + extname;
        }
        return entries;
    }
};

module.exports = {
    entry: getEntry.entry('./src/js/', /\^*.js$/),
    output: { // 出口文件路径，_dirname 指向当前项目跟路径。
        path: __dirname + '/src/bundle',
        filename: 'js/[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.less$/i,
                loader: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            }
        ],
    },
    devtool: "eval-source-map",
    devServer: {
        contentBase: "./src", //以 src 为根目录提供文件
        historyApiFallback: true,
        inline: true
    }
}
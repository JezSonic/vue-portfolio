module.exports = {
    configureWebpack: {
        resolve: {
            extensions: ['.ts', '.tsx', '.vue', '.js', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: 'ts-loader',
                    options: { appendTsSuffixTo: [/\.vue$/] },
                    exclude: /node_modules/,
                },
            ],
        },
    },
};
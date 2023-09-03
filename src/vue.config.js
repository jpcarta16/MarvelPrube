module.exports = {
    devServer: {
        proxy: {
            '/v1/public': {
                target: 'https://gateway.marvel.com',
                changeOrigin: true,
                pathRewrite: { '^/v1/public': '/v1/public' },
            },
        },
    },
};

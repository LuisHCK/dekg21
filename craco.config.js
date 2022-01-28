module.exports = {
    webpack: {
        configure: {
            target: 'electron-renderer',
        },
    },
    style: {
        css: {
            loaderOptions: (opts) => {
                return {
                    ...opts,
                    url: false,
                }
            },
        },
    },
}

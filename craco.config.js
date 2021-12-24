module.exports = {
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

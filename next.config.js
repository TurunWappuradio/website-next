module.exports = {
  reactStrictMode: true,
  images: {
    loader: 'custom',
    domains: ['images.ctfassets.net'],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(tsx|graphql)$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-let/loader' }],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      type: 'json',
      use: 'yaml-loader',
    });

    return config;
  },
  staticPageGenerationTimeout: 90,
};

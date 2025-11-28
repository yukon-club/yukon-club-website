const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find PostCSS loader and configure plugins
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      
      if (oneOfRule && oneOfRule.oneOf) {
        oneOfRule.oneOf.forEach((rule) => {
          if (rule.test && rule.test.toString().includes('css')) {
            if (Array.isArray(rule.use)) {
              rule.use.forEach((use) => {
                // Only modify PostCSS loader, leave everything else alone
                if (use && typeof use === 'object' && use.loader && typeof use.loader === 'string' && use.loader.includes('postcss-loader')) {
                  if (!use.options) {
                    use.options = {};
                  }
                  
                  // Set PostCSS plugins explicitly
                  use.options.postcssOptions = {
                    plugins: [
                      require('postcss-flexbugs-fixes'),
                      require('tailwindcss'),
                      require('postcss-preset-env')({
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      }),
                    ],
                  };
                }
              });
            }
          }
        });
      }
      
      return webpackConfig;
    },
  },
};

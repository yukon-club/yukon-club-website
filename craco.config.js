const path = require('path');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      // Find all CSS processing rules
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);
      
      if (oneOfRule && oneOfRule.oneOf) {
        oneOfRule.oneOf.forEach((rule) => {
          if (rule.test && rule.test.toString().includes('css')) {
            // Handle array of loaders
            if (Array.isArray(rule.use)) {
              rule.use.forEach((use) => {
                if (use && typeof use === 'object') {
                  // Check if it's a PostCSS loader
                  if (use.loader && use.loader.includes('postcss-loader')) {
                    if (!use.options) use.options = {};
                    if (!use.options.postcssOptions) {
                      use.options.postcssOptions = {
                        plugins: [
                          require('tailwindcss'),
                          require('autoprefixer'),
                        ],
                      };
                    } else {
                      // Merge with existing plugins
                      const existingPlugins = use.options.postcssOptions.plugins || [];
                      use.options.postcssOptions.plugins = [
                        require('tailwindcss'),
                        require('autoprefixer'),
                        ...existingPlugins.filter(p => 
                          !p || (typeof p === 'string' && !p.includes('tailwind'))
                        ),
                      ];
                    }
                  }
                  
                  // Also check for function-based loaders
                  if (use.loader && typeof use.loader === 'function') {
                    const originalLoader = use.loader;
                    use.loader = function(...args) {
                      const result = originalLoader.apply(this, args);
                      if (result && result.options) {
                        if (!result.options.postcssOptions) {
                          result.options.postcssOptions = {
                            plugins: [
                              require('tailwindcss'),
                              require('autoprefixer'),
                            ],
                          };
                        }
                      }
                      return result;
                    };
                  }
                }
              });
            }
            
            // Handle function-based use
            if (typeof rule.use === 'function') {
              const originalUse = rule.use;
              rule.use = function(...args) {
                const result = originalUse.apply(this, args);
                if (Array.isArray(result)) {
                  result.forEach((use) => {
                    if (use && use.loader && use.loader.includes('postcss-loader')) {
                      if (!use.options) use.options = {};
                      use.options.postcssOptions = {
                        plugins: [
                          require('tailwindcss'),
                          require('autoprefixer'),
                        ],
                      };
                    }
                  });
                }
                return result;
              };
            }
          }
        });
      }
      
      return webpackConfig;
    },
  },
};

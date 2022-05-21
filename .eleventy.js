const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

// Utils
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = config => {
  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/fonts/');
  // Plugins
  config.addPlugin(rssPlugin);

  // Returns articles items, sorted by display order
  // config.addCollection('articles', collection => {
  //   return sortByDisplayOrder(collection.getFilteredByGlob('./src/articles/*.md'));
  // });

  // Returns a collection of blog posts in reverse date order
  config.addCollection('blog', collection => {
    return [...collection.getFilteredByGlob('./src/posts/*.md')].reverse();
  });

  // Only minify HTML if we are in production because it slows builds _right_ down
  if (isProduction) {
    config.addTransform('htmlmin', htmlMinTransform);
  }

  // // Returns aricles, sorted by display order then filtered by featured
  // config.addCollection('featuredArticles', collection => {
  //   return sortByDisplayOrder(collection.getFilteredByGlob('./src/articles/*.md')).filter(
  //     x => x.data.featured
  //   );
  // });

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  config.setUseGitIgnore(false);

  // Return your Object options:
  return {
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'dist'
    }
  };
};
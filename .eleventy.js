// markdownIt
const markdownIt = require("markdown-it");
const markdownItImageLazyLoading = require("markdown-it-image-lazy-loading");
const markdownItFootnote = require('markdown-it-footnote')

// RSS
const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const webMentionsFilters = require('./src/filters/webmentions')

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

// Utils
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = config => {
  const markdownLib = markdownIt()
    .use(markdownItImageLazyLoading, {
      image_size: true,
      decoding: true,
      base_path: __dirname + '/src/',
    })
    .use(markdownItFootnote);

  // markdownLib.renderer.rules.footnote_block_open = () => (
  //   '<hr>\n' +
  //   'Footnotes\n' +
  //   '<section class="footnotes">\n' +
  //   '<ol class="footnotes-list">\n'
  // );
  config.setLibrary("md", markdownLib);

  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/fonts/');

  Object.keys(webMentionsFilters).forEach(filterName => {
    config.addFilter(filterName, webMentionsFilters[filterName])
  })

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

  // Returns a collection of notes in reverse date order
  config.addCollection('notes', collection => {
    return [...collection.getFilteredByGlob('./src/notes/*.md')].reverse();
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
// markdownIt
const markdownIt = require("markdown-it");
const markdownItImageLazyLoading = require("markdown-it-image-lazy-loading");
const markdownItFootnote = require('markdown-it-footnote')

// RSS
const rssPlugin = require('@11ty/eleventy-plugin-rss');

// Filters
const dateFilter = require('./src/filters/date-filter.js');
const w3DateFilter = require('./src/filters/w3-date-filter.js');
const dateTimeFilter = require('./src/filters/date-time-filter.js');

// Transforms
const htmlMinTransform = require('./src/transforms/html-min-transform.js');

// Create a helpful production flag
const isProduction = process.env.NODE_ENV === 'production';

// Utils
const sortByDisplayOrder = require('./src/utils/sort-by-display-order.js');

module.exports = config => {
  const markdownLib = markdownIt({
    html: true,
  })
    .use(markdownItImageLazyLoading, {
      image_size: true,
      decoding: true,
      base_path: __dirname + '/src/',
    })
    .use(markdownItFootnote);

  markdownLib.renderer.rules.footnote_block_open = () => (
    '<section class="footnotes">\n' +
    '<ol class="footnotes-list">\n'
  );
  config.setLibrary("md", markdownLib);

  // Add filters
  config.addFilter('dateFilter', dateFilter);
  config.addFilter('w3DateFilter', w3DateFilter);
  config.addFilter('dateTimeFilter', dateTimeFilter);
  config.addPassthroughCopy('./src/images/');
  config.addPassthroughCopy('./src/fonts/');
  config.addFilter('log', value => {
    console.log(value)
  })

  // Plugins
  config.addPlugin(rssPlugin);

  // Returns articles items, sorted by display order
  config.addCollection('rss', collection => {
    return [...collection.getFilteredByGlob([
      './src/articles/*.md',
      './src/notes/*.md'
    ])
      .filter(
        item => !item.data.draft
          && item.data.published !== false
          && !item.data.deleted
          && item.date <= new Date()
      )].reverse().slice(0, 40);;
  });

  // Returns a collection of articles in reverse date order
  config.addCollection('articles', collection => {
    return [...collection.getFilteredByGlob('./src/articles/*.md')
    .filter(
      item => !item.data.draft
        && item.data.published !== false
        && !item.data.deleted
        && item.date <= new Date()
        // && item.data.type !== 'article'
    )].reverse()
  });

  // Returns a collection of notes in reverse date order
  config.addCollection('notes', collection => {
    return [...collection.getFilteredByGlob('./src/notes/*.md')
    .filter(
      item => !item.data.draft
        && item.data.published !== false
        && !item.data.deleted
        && item.date <= new Date()
        // && item.data.type !== 'article'
    )].reverse()
  });

  // Returns both collections last 10 posts in reverse date order
  config.addCollection('home', collection => {
    return [...collection.getFilteredByGlob([
      './src/articles/*.md',
      './src/notes/*.md'
    ])
      .filter(
        item => !item.data.draft
          && item.data.published !== false
          && !item.data.deleted
          && item.date <= new Date()
      )].reverse().slice(0, 10);
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
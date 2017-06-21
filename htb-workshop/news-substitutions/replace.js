console.log('Injected replace.js');
var html = document.body.innerHTML;

// use a regular expression with "g" (global) flag to replace all occurrences
html = html.replace(/craigslist/g, 'coryslist');

// update the document's html with your changes
document.body.innerHTML = html;

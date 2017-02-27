var HIGHLIGHT_CLASS = '__caps-detector-highlighted';

if (!!document.querySelector('.' + HIGHLIGHT_CLASS)) {
  doUnHighlight();
} else {
  doHighlight();
}

function doUnHighlight() {
  var highlighted = document.querySelectorAll('.' + HIGHLIGHT_CLASS);
  for (var i = 0; i < highlighted.length; i++) {
    var el = highlighted[i];
    el.classList.remove(HIGHLIGHT_CLASS);
  }
}

function doHighlight() {
  var MINIMUM_LENGTH = 3;
  var TEXT_REGEX = new RegExp("[a-zA-Z]{" + MINIMUM_LENGTH + ",}");

  // Gets all text nodes on the page
  function getTextNodes() {
    var nodes = [];
    var walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT, null, null);
    var node = walker.nextNode();
    while (node) {
      var parentNode = node.parentNode;
      var parentTagName = parentNode.tagName;
      if (parentTagName !== "SCRIPT" && parentTagName !== "STYLE" && parentTagName !== "TITLE") {
        nodes.push(node);
      }
      node = walker.nextNode();
    }
    return nodes;
  }

  // Filter all text nodes to only ones that appear to have upper-cased text
  function getAllCapsTextNodes() {
    return getTextNodes().filter(isCapsTextNode);
  }

  // Detect whether a TextNode only contains upper-case text
  // or is inheriting the css "text-transform: uppercase" property
  function isCapsTextNode(node) {
    // skip if no text content
    if (!node.textContent) { return false; }

    // skip is all whitespace
    if (node.textContent.replace(/\s+/g,'').length === 0) { return false; }

    // skip if not enough alpha chars
    if (!node.textContent.match(TEXT_REGEX)) { return false; }

    // if the text is upper-case
    if (node.textContent.toUpperCase() === node.textContent) {
      return true;
    } else if (node.parentNode) {
      // figure if css text-transform is applied
      var parent = node.parentNode;
      var styles = window.getComputedStyle(parent);
      var textTransform = styles.textTransform;
      if (textTransform.toUpperCase() === 'UPPERCASE') {
        return true;
      }
    }

    return false;
  }

  // Add a pulsing background
  function highlight(node) {
    if (node.parentNode) {
      node.parentNode.classList.add(HIGHLIGHT_CLASS);
    }
  }

  var allCaps = getAllCapsTextNodes();
  allCaps.forEach(highlight);
}

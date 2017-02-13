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
function detectAllCapsNodes() {
  return getTextNodes().filter(isCapsTextNode);
}

// Detect whether a TextNode only contains upper-case text
// or is inheriting the css "text-transform: uppercase" property
function isCapsTextNode(node) {
  if (!node.textContent) { return false; }
  if (!node.textContent.match(/[a-zA-Z]/)) { return false; }
  if (node.textContent.replace(/\s+/g,'').length === 0) { return false; }

  if (node.textContent.toUpperCase() === node.textContent) {
    return true;
  } else if (node.parentNode) {
    var parent = node.parentNode;
    var styles = window.getComputedStyle(parent);
    var textTransform = styles.textTransform;
    if (textTransform.toUpperCase() === 'UPPERCASE') {
      return true;
    }
  }

  return false;
}

// Add a yellow background to the node
function highlight(node) {
  if (node.parentNode) {
    node.parentNode.style.backgroundColor = 'yellow';
  }
}

var allCaps = detectAllCapsNodes();
allCaps.forEach(highlight);

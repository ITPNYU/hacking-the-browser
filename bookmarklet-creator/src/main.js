class BookmarkletCreator {
  constructor(textArea, { bookmarklet, bookmakletTextArea, bookmarkletName, editorContainer, errorContainer }) {
    this.errorContainer = errorContainer;
    this.editorContainer = editorContainer;
    this.bookmarklet = bookmarklet;
    this.bookmakletTextArea = bookmakletTextArea;
    this.bookmarkletName = bookmarkletName;
    this.editor = CodeMirror.fromTextArea(textArea, {
      theme: 'monokai',
      autofocus: true
    });
    this.update();
    this.editor.on('change', () => this.update());
    this.bookmarkletName.addEventListener('input', () => this.update());
  }

  update() {
    this.clearCodeErrors();
    let value = this.prepareValue(this.editor.getValue());
    let name = this.bookmarkletName.value;
    this.bookmarklet.setAttribute('href', value);
    this.bookmarklet.innerText = name;
    this.bookmakletTextArea.value = value;
  }

  prepareValue(value) {
    try {
      value = Babel.transform(value, { presets: ['es2017'], comments:false }).code;
    } catch(e) {
      this.handleCodeError(e);
    }
    return `javascript:(function() { ${value} })()`;
  }

  handleCodeError(e) {
    this.editorContainer.classList.add('error');
    this.errorContainer.innerText = e.message;
  }

  clearCodeErrors() {
    this.editorContainer.classList.remove('error');
    this.errorContainer.innerText = "No errors";
  }

  insertSnippet(code) {
    this.editor.replaceSelection(code, 'around');
  }
}

function addSnippets(creator) {
  const SNIPPETS = {
    injectJquery: function() {
function injectJquery(callback) {
  if (window.jQuery) {
    return callback(window.jQuery);
  }
  let script = document.createElement('script');
  script.setAttribute(
    'src',
    '//ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js'
  );
  script.onload = () => callback(window.jQuery);
  script.onerror = e => alert('The script failed to load: ' + e);
  document.head.appendChild(script);
}

injectJquery(function($) {
  // YOUR CODE GOES HERE and can use the $ variable
});
    }
      .toString()
      .replace('function() {', '')
      .replace(/}$/, '')
      .trim()
  };

  let snippetContainer = document.getElementById('snippets');
  for (let [name, snippet] of Object.entries(SNIPPETS)) {
    let snippetEl = document.createElement('div');
    snippetEl.classList.add('snippet');
    let titleEl = document.createElement('div');
    titleEl.classList.add('name');
    titleEl.innerText = name;
    let codeEl = document.createElement('div');
    codeEl.classList.add('code');
    codeEl.innerText = snippet;
    let buttonEl = document.createElement('button');
    buttonEl.appendChild(document.createTextNode('Insert Snippet'));
    buttonEl.addEventListener('click', () => {
      creator.insertSnippet(snippet);
    });

    snippetEl.appendChild(titleEl);
    snippetEl.appendChild(codeEl);
    snippetEl.appendChild(buttonEl);
    snippetContainer.appendChild(snippetEl);
  }
}

let bookmarklet = document.getElementById('bookmarklet');
let bookmakletTextArea = document.getElementById('bookmarklet-text-area');
let bookmarkletName = document.getElementById('bookmarklet-name');
let editorContainer = document.getElementById('editor-container');
let errorContainer = document.getElementById('error-container');

bookmakletTextArea.addEventListener('click', () => {
  bookmakletTextArea.select();
});

let creator = new BookmarkletCreator(document.getElementById('editor'), {
  bookmarklet,
  bookmakletTextArea,
  bookmarkletName,
  editorContainer,
  errorContainer
});

addSnippets(creator);
/* global CodeMirror, Babel */
class BookmarkletCreator {
  constructor(
    textArea,
    {
      bookmarklet,
      bookmarkletTextArea,
      bookmarkletPublishTextArea,
      bookmarkletName,
      editorContainer,
      errorContainer
    }
  ) {
    this.errorContainer = errorContainer;
    this.editorContainer = editorContainer;
    this.bookmarklet = bookmarklet;
    this.bookmarkletTextArea = bookmarkletTextArea;
    this.bookmarkletPublishTextArea = bookmarkletPublishTextArea;
    this.bookmarkletName = bookmarkletName;
    this.editor = CodeMirror.fromTextArea(textArea, {
      theme: 'monokai',
      autofocus: true
    });
    this.init();
    this.update();
    this.editor.on('change', () => this.update());
    this.bookmarkletName.addEventListener('input', () => this.update());
  }

  init() {
    let value = window.localStorage.getItem('value');
    let name = window.localStorage.getItem('name');

    if (value) {
      this.editor.setValue(value);
    }
    if (name) {
      this.bookmarkletName.setAttribute('value', name);
    }
  }

  update() {
    this.clearCodeErrors();
    let value = this.editor.getValue();
    let name = this.bookmarkletName.value;

    window.localStorage.setItem('value', value);
    window.localStorage.setItem('name', name);

    value = this.prepareValue(this.editor.getValue());
    this.bookmarklet.setAttribute('href', value);
    this.bookmarklet.innerText = name;
    this.bookmarkletTextArea.value = value;
    this.bookmarkletPublishTextArea.value = this.createPublishableBookmarkletHTML(
      name,
      value
    );
  }

  prepareValue(value) {
    try {
      value = Babel.transform(value, { presets: ['es2017'], comments: false })
        .code;
    } catch (e) {
      this.handleCodeError(e);
    }
    return `javascript:(function() { ${value} })()`;
  }

  createPublishableBookmarkletHTML(name, javascriptCode) {
    let link = document.createElement('a');
    link.setAttribute('title', name);
    link.setAttribute('href', encodeURI(javascriptCode));
    link.innerText = name;
    return link.outerHTML;
  }

  handleCodeError(e) {
    this.editorContainer.classList.add('error');
    this.errorContainer.innerText = e.message;
  }

  clearCodeErrors() {
    this.editorContainer.classList.remove('error');
    this.errorContainer.innerText = 'No errors';
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
let bookmarkletTextArea = document.getElementById('bookmarklet-text-area');
let bookmarkletPublishTextArea = document.getElementById(
  'bookmarklet-publish-text-area'
);
let bookmarkletName = document.getElementById('bookmarklet-name');
let editorContainer = document.getElementById('editor-container');
let errorContainer = document.getElementById('error-container');

let clickToSelectEls = document.querySelectorAll('[data-click-to-select]');
clickToSelectEls.forEach(el => el.addEventListener('click', () => el.select()));

let creator = new BookmarkletCreator(document.getElementById('editor'), {
  bookmarklet,
  bookmarkletTextArea,
  bookmarkletPublishTextArea,
  bookmarkletName,
  editorContainer,
  errorContainer
});

addSnippets(creator);

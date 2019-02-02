class BookmarkletCreator {
  constructor(textArea, { bookmarklet, bookmakletTextArea }) {
    this.bookmarklet = bookmarklet;
    this.bookmakletTextArea = bookmakletTextArea;
    this.editor = CodeMirror.fromTextArea(textArea, {
      theme: 'monokai',
      autofocus: true
    });
    this.update();
    this.editor.on('change', () => this.update());
  }

  update() {
    let value = this.prepareValue(this.editor.getValue());
    this.bookmarklet.setAttribute('href', value);
    this.bookmakletTextArea.value = value;
  }

  prepareValue(value) {
    return `javascript:(function() { ${value} })()`;
  }
}

let bookmarklet = document.getElementById('bookmarklet');
let bookmakletTextArea = document.getElementById('bookmarklet-text-area');

let creator = new BookmarkletCreator(document.getElementById('editor'), {
  bookmarklet,
  bookmakletTextArea
});

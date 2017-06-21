console.log('Injected replace.js');
var html = document.body.innerHTML;

// See https://xkcd.com/1288/
html = html.replace(/witnesses/ig, 'these dudes I know');
html = html.replace(/allegedly/ig, 'kinda probably');
html = html.replace(/rebuild/ig, 'avenge');
html = html.replace(/space/ig, 'spaaace');
html = html.replace(/smartphone/ig, 'pokédex');
html = html.replace(/electric/ig, 'atomic');
html = html.replace(/senator/ig, 'elf-lord');
html = html.replace(/election/ig, 'eating contest');
html = html.replace(/new study/ig, 'tumblr post');
html = html.replace(/congressional leaders/ig, 'river spirits');
html = html.replace(/homeland security/ig, 'homestar runner');
html = html.replace(/could not be reached for comment/ig, 'is guilty and everyone knows it');

// update the document's html with your changes
document.body.innerHTML = html;

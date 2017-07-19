// import Node from 'Node.js';
// import Trie from 'Trie.js';

const wordInput = $('.word-input');
const selectButton = $('.select-button');
const wordList = $('.word-list');

function check() {
  console.log('cool');
}

function appendWord() {
  let word = wordInput.val();
  wordList.prepend(`<li>${word}</li>`);
  clearInput();
}

function clearInput() {
  wordInput.val('');
}

wordInput.on('input', check);
selectButton.on('click', appendWord);

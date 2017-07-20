import Node from './scripts/Node';
import Trie from './scripts/Trie';
import words from './scripts/words';

const wordInput = $('.word-input');
const insertButton = $('.insert-button');
const suggestionList = $('.word-list');

let trie = new Trie;
trie.populate(words);

function appendSuggestions() {
  clearList();
  let string = wordInput.val().toLowerCase();
  let suggestions = trie.suggest(string);
  for (let i = 0; i < 20 && i < suggestions.length; i++) {
    if(suggestions[i] !== undefined) {
      suggestionList.append(`<li class='.list-item'>${suggestions[i]}</li>`);
    }
  }
}

function insertWord() {
  let word = wordInput.val();
  trie.insert(word);
  clearList();
  wordInput.val('');
}

function selectWord(event) {
  let selected = event.target.innerHTML;
  trie.select(selected);
  appendSuggestions();
}

function clearList() {
  $('li').remove();
}

wordInput.on('input', function() {
  if (wordInput.val() === '') {
    clearList();
  } else {
    appendSuggestions();
  }
});

suggestionList.on('click', 'li', selectWord);

insertButton.on('click', insertWord);

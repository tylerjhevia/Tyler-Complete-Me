import Node from './scripts/Node';
import Trie from './scripts/Trie';
import words from './scripts/words';
const wordInput = $('.word-input');
const clearButton = $('.clear-button');
const suggestionList = $('.word-list');

let trie = new Trie;
trie.populate(words);

function appendSuggestions() {
  let listArray = $('li');
  listArray.remove();
  let string = wordInput.val().toLowerCase();
  let suggestions = trie.suggest(string);
  for (let i = 0; i < 20 && i < suggestions.length; i++) {
    if(suggestions[i] !== undefined) {
      suggestionList.append(`<li class='.list-item'>${suggestions[i]}</li>`);
    }
  }
}

function selectWord(event) {
  let selected = event.target.innerHTML;
  trie.select(selected);
  appendSuggestions();
}

function clearList() {
  event.preventDefault();
  suggestionList.empty();
  console.log('hey');
}


wordInput.on('input', function() {
  if (wordInput.val() === '') {
    $('li').remove()
  } else {
    appendSuggestions();
  }
});

suggestionList.on('click', 'li', selectWord);

clearButton.on('click', clearList);

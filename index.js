import Node from './scripts/Node';
import Trie from './scripts/Trie';
import words from './scripts/words';
const wordInput = $('.word-input');
const selectButton = $('.select-button');
const suggestionList = $('.word-list');

let trie = new Trie;
trie.populate(words);


function appendSuggestions() {
  let listArray = $('li');
  listArray.remove();
  console.log('list Array', listArray);
  let string = wordInput.val().toLowerCase();
  let suggestions = trie.suggest(string);
  for (let i = 0; i < 20 && i < suggestions.length; i++) {
    if(suggestions[i] !== undefined) {
      suggestionList.append(`<li class='list-item'>${suggestions[i]}</li>`);
    }
  }
}

function selectWord(event) {
  console.log(event.target);
  console.log(event.target.innerHTML);
  let selected = event.target.innerHTML;
  trie.select(selected);
  appendSuggestions();
}

wordInput.on('input', appendSuggestions);
suggestionList.on('click','.list-item', selectWord);

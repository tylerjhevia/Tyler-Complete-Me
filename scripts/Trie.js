import Node from './Node';

export default class Trie {
  constructor() {
    this.root = null;
  }

  insert(word) {
    let wordArray = [...word];
    if (!this.root) {
      this.root = new Node(wordArray[1]);
      console.log(this.root);
      wordArray.shift();
    }
    for (i = 0; i < wordArray.length; i++) {

    }
  }
}

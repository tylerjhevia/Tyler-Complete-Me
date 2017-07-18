import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  insert (word) {
    const node = new Node()

    if (!this.root) {
      this.root = node;
    }

    let wordArray = [...word];
    let currentNode = this.root;

    for(let i = 0; i < wordArray.length; i++) {
      currentNode.children[wordArray[i]] = new Node();
      currentNode.children[wordArray[i]].letter = wordArray[i];
      currentNode = currentNode.children[wordArray[i]];
      if (i === wordArray.length - 1) {
        currentNode.isWord = true;
      }
    }
    // console.log(JSON.stringify(this.root, null, 4));
  }

  count () {
    // go through true and find how many times isWord is true
    
  }
}

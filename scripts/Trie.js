import Node from './Node';

export default class Trie {
  constructor() {
    this.root = new Node();
    this.counter = 0;
  }

  insert (word) {

    let wordArray = [...word.toLowerCase()];
    let currentNode = this.root;
    for(let i = 0; i < wordArray.length; i++) {
      if (currentNode.children[wordArray[i]]) {
        currentNode = currentNode.children[wordArray[i]];
      } else {
        currentNode.children[wordArray[i]] = new Node(wordArray[i]);
        currentNode = currentNode.children[wordArray[i]];
        }
    }
    console.log(JSON.stringify(this.root, null, 4));
    if (currentNode.isWord === false) {
        this.counter++;
        currentNode.isWord = true;
        currentNode.fullWord = word;
    }
  }

  count () {
    return this.counter;
  }

  suggest (string) {
    let stringArray = [...string.toLowerCase()];
    let currentNode = this.root;
    let suggestList = [];
    for (let i = 0; i < stringArray.length; i++) {
      currentNode = currentNode.children[stringArray[i]];
    }
    // while (currentNode) {
    //   let keys = Object.keys(currentNode.children);
    //   for (let i = 0; i < keys.length; i++) {
    //     if (currentNode.children[keys[i]].isWord === true) {
    //       suggestList.push(currentNode.fullWord);
    //     }
    //   }
    // }
    // follow search string down trie
    // search through children
    // for every child with isWord === true, add child.actualWord to array
    //
    return suggestList;
  }
}

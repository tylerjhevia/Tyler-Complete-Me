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
    // console.log(JSON.stringify(this.root, null, 4));
    if (currentNode.isWord === false) {
        this.counter++;
        currentNode.isWord = true;
    }
  }

  count () {
    return this.counter;
  }

  suggest(string) {
    let stringArray = [...string];
    let currentNode = this.root;
    let suggestionsArray = [];

    for (let i = 0; i < stringArray.length; i++) {
      currentNode = currentNode.children[stringArray[i]]
    }

    // currNode now refers to the last leter in our word
    const traverseTheTrie = (string, currentNode) => {
      let keys = Object.keys(currentNode.children);
      for (let k = 0; k < keys.length; k++) {
        const child = currentNode.children[keys[k]];
        let newString = string + child.letter;
        if (child.isWord) {
          suggestionsArray.push(newString);
        }
        traverseTheTrie(newString, child);
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestionsArray.push(string)
    }

    if (currentNode) {
      traverseTheTrie(string, currentNode);
    }

    return suggestionsArray;
  }

  select(word) {
    let wordArray = [...word];
    let currentNode = this.root;

    for (let i = 0; i < wordArray.length; i++) {
      currentNode = currentNode.children[wordArray[i]];
    }
    currentNode.selectCount++;
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }
}

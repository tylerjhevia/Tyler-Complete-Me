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

    const searchTrie = (string, currentNode) => {
      let keys = Object.keys(currentNode.children);
      for (let k = 0; k < keys.length; k++) {
        const child = currentNode.children[keys[k]];
        let newString = string + child.letter;
        if (child.isWord) {
          suggestionsArray.push({name: newString, selectCount: child.selectCount, timestamp: child.timestamp});
        }
        searchTrie(newString, child);
      }
    }

    if (currentNode && currentNode.isWord) {
      suggestionsArray.push({name: string, selectCount: currentNode.selectCount, timestamp: currentNode.timestamp});
    }

    if (currentNode) {
      searchTrie(string, currentNode);
    }
    suggestionsArray.sort((a, b) => {
      return b.selectCount - a.selectCount || b.timestamp - a.timestamp;
    });
    return suggestionsArray.map((obj) => {
      return obj.name;
    })
  }

  select(word) {
    let wordArray = [...word];
    let currentNode = this.root;
    for (let i = 0; i < wordArray.length; i++) {
      currentNode = currentNode.children[wordArray[i]];
    }
    currentNode.selectCount++;
    currentNode.timestamp = Date.now();
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  populate(dictionary) {
    dictionary.forEach(word => {
      this.insert(word);
    });
  }
}

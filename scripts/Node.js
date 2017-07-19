export default class Node {
  constructor(letter) {
    this.letter = letter || null;
    this.isWord = false;
    // this.fullWord = null;
    this.children = {};
  }
}

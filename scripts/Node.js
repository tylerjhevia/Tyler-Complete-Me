export default class Node {
  constructor(letter) {
    this.letter = letter || null;
    this.isWord = false;
    this.children = {};
    this.selectCount = 0;
  }
}

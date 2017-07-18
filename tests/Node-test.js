import { expect } from 'chai';
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';

describe('Node functionality', () => {
  let node;

  beforeEach(function () {
    node = new Node();
  })

  it.only('should have a letter property that defaults to null', () => {
    expect(node.letter).to.deep.equal(null);
  })

  it.only('should accept an argument for letter', () => {
    let newNode = new Node('a');
    expect(newNode.letter).to.deep.equal('a');
  })

  it.only('should have an isWord property that starts as false', () => {
    expect(node.isWord).to.deep.equal(false);
  })

  it.only('should have a fullWord property that starts as null', () => {
    expect(node.fullWord).to.deep.equal(null);
  })

  it.only('should have a children property that starts as an empty object', () => {
    expect(node.children).to.deep.equal({});
  })


})

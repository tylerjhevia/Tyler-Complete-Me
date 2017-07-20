import { expect } from 'chai';
import Trie from '../scripts/Trie';
import Node from '../scripts/Node';

describe('Node functionality', () => {
  let node;

  beforeEach(function () {
    node = new Node();
  })

  it('should have a letter property that defaults to null', () => {
    expect(node.letter).to.deep.equal(null);
  })

  it('should accept an argument for letter', () => {
    let newNode = new Node('a');
    expect(newNode.letter).to.deep.equal('a');
  })

  it('should have an isWord property that starts as false', () => {
    expect(node.isWord).to.deep.equal(false);
  })

  it('should have a selectCount property that starts at 0', () => {
    expect(node.selectCount).to.deep.equal(0);
  })

  it('should have a timestamp property that starts at 0', () => {
    expect(node.timestamp).to.deep.equal(0);
  })

  // it('should have an updated timestamp after select method has been called on it', () => {
  //   let trie = new
  //   expect(node.timeStamp).to.deep.equal(0);
  // })

  it('should have a children property that starts as an empty object', () => {
    expect(node.children).to.deep.equal({});
  })

  it('should be able to have multiple children', () => {
    
  })
})

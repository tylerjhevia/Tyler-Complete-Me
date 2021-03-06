import { expect } from 'chai';
import Trie from '../scripts/Trie'
import Node from '../scripts/Node'
const text = "/usr/share/dict/words";
const fs = require('fs');

describe('Trie functionality', () => {

  describe('insert', () => {
    let completeMe;
    const dictionary = fs.readFileSync(text).toString().trim().split('\n');

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should have a root that starts as an empty object', () => {
      expect(completeMe.root.children).to.deep.equal({});
    })

    it('should be able to insert a word and root should be a Node', () => {
      completeMe.insert('apple');

      expect(completeMe.root).to.be.instanceOf(Node)
    })

    it('should be able to insert a word and root should have children', () => {
      completeMe.insert('apple');

      expect(completeMe.root.children.a.letter).to.be.equal('a')

      expect(
        completeMe.root
        .children.a
        .children.p
        .letter
      ).to.equal('p')

    })

    it('should be able to insert a word and the last letter should have a isWord property of true', () => {
      completeMe.insert('apple');

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .letter
      ).to.equal('e')

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .children.e
        .isWord
      ).to.equal(true)
    })

    it('should be able to insert multiple words and children objects should have multiple props', () => {
      completeMe.insert('apple');
      completeMe.insert('ape');
      let childKeys = Object.keys(
        completeMe.root
        .children.a
        .children.p
        .children
      );

      expect(childKeys).to.deep.equal(['p', 'e']);

    })

    it('should have nodes which represent incomplete words where the isWord prop is false', () => {
      completeMe.insert('apple');

      expect(
        completeMe.root
        .children.a
        .children.p
        .children.p
        .children.l
        .isWord
      ).to.equal(false);

    })
  })

  describe('count', () => {
    let completeMe = new Trie();

    it('should return number of words inserted', () => {
      let completeMe = new Trie();

      expect(completeMe.count()).to.equal(0);

      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('appear');
      expect(completeMe.count()).to.equal(2);

      completeMe.insert('partytime');
      expect(completeMe.count()).to.equal(3);

      completeMe.insert('toboggan');
      expect(completeMe.count()).to.equal(4);
    })

    it('should not count the same word twice', () => {
      let completeMe = new Trie();

      expect(completeMe.count()).to.equal(0);

      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);

      completeMe.insert('ape');
      expect(completeMe.count()).to.equal(1);
    })
  });

  describe('suggest', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should return all children words of suggestion', () => {
      completeMe.insert('apple');
      completeMe.insert('applesauce');
      completeMe.insert('apply');
      completeMe.insert('apt');
      completeMe.insert('cat');

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'apple', 'applesauce', 'apply' ])
    })

    it('if search string is a word, it should return that word as well as all of its children words', () => {
      completeMe.insert('ant');
      completeMe.insert('ants');
      completeMe.insert('anteater');
      completeMe.insert('anterior');

      let suggestions = completeMe.suggest('ant');

      expect(suggestions).to.deep.equal(['ant', 'ants', 'anteater', 'anterior'])
    })
  });

  describe('select', () => {
    let completeMe;

    beforeEach(function () {
      completeMe = new Trie();
    })

    it('should be able to select order of words returned by suggest', () => {
      completeMe.insert('app')
      completeMe.insert('apple')
      completeMe.insert('applesauce')
      completeMe.insert('apply')

      let suggestions = completeMe.suggest('app');

      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])

      completeMe.select('app');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'applesauce', 'apply' ])
      completeMe.sleep(3);

      completeMe.select('apply');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apply', 'app', 'apple', 'applesauce' ])
      completeMe.sleep(3);

      completeMe.select('apple');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apple', 'apply', 'app', 'applesauce' ])
      completeMe.sleep(3);

      completeMe.select('app');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'apply', 'applesauce' ])
      completeMe.sleep(3);

      completeMe.select('apply');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal(['apply', 'app', 'apple', 'applesauce']);
      completeMe.sleep(3);

      completeMe.select('app');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apply', 'apple', 'applesauce' ])
      completeMe.sleep(3);

      completeMe.select('apple');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'apply', 'applesauce' ])
      completeMe.sleep(3);

      completeMe.select('applesauce');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'app', 'apple', 'apply', 'applesauce' ])
      completeMe.sleep(3);

      completeMe.select('apple');
      suggestions = completeMe.suggest('app');
      expect(suggestions).to.deep.equal([ 'apple', 'app', 'apply', 'applesauce']);
    })

  describe('dictionary populate', () => {
   let completeMe;
   const dictionary = fs.readFileSync(text).toString().trim().split('\n');

   beforeEach(function () {
      this.timeout(10000);
      completeMe = new Trie();
      completeMe.populate(dictionary);
    });

   it('should have lots of words after dictionary is populated', () => {
     expect(completeMe.counter).to.equal(234371);
   })
  })
  })
})

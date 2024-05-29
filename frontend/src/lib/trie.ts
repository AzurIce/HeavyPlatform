class TrieNode {
  children: { [key: string]: TrieNode } = {};
  isEndOfWord: boolean = false;
  icons: string[] = [];
}

export class Trie {
  root: TrieNode = new TrieNode();

  insert(key: string, value: string) {
    // console.log(`inserting ${word}`)
    let node = this.root;
    for (const char of key) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
    node.icons.push(value);
  }

  search(prefix: string): string[] {
    // console.log(`searching ${prefix}`)
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) {
        return [];
      }
      node = node.children[char];
    }
    // console.log(`done ${prefix}, node: ${node}`)
    return this.collectIcons(node);
  }

  private collectIcons(node: TrieNode): string[] {
    let results: string[] = [];
    if (node.isEndOfWord) {
      results = results.concat(node.icons);
    }
    for (const child in node.children) {
      results = results.concat(this.collectIcons(node.children[child]));
    }
    return results;
  }
}
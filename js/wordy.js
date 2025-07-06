export default {
	loadWords,
	findWords,
};

// ****************************
var dict = {};
var isWord = Symbol("is-word");

function loadWords(wordList) {
	var nodeCount = 0;
	if (Object.keys(dict).length > 0) {
		dict = {};
	}
	for (let word of wordList) {
		let node = dict;
		for (let letter of word) {
			if (!node[letter]) {
				node[letter] = {
					[isWord]: false,
				};
				nodeCount++;
			}
			node = node[letter];
		}
		node[isWord] = true;
	}

	return nodeCount;
}

function findWords(input, prefix = "", node = dict) {
	var words = [];

	if (node[isWord]) {
		words.push(prefix);
	}
	for (let i = 0; i < input.length; i++) {
		let currentLetter = input[i];
		if (node[currentLetter]) {
			let remainingLetters = [
				...input.slice(0, i),
				...input.slice(i + 1),
			];
			words.push(
				...findWords(
					remainingLetters,
					prefix + currentLetter,
					node[currentLetter]
				)
			);
		}
	}
	// If the node is the root dictionary, remove duplicates
	if (node === dict) {
		words = [...new Set(words)]; // Remove duplicates
	}
	return words;
}

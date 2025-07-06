export default {
	loadWords,
	findWords,
};

// ****************************
var dict = [];

function loadWords(wordList) {
	dict = [...wordList];
	return dict.length;
}

function findWords(input) {
	var words = [];
	for (let word of dict) {
		if (input.length >= word.length && checkWord(word, input)) {
			words.push(word);
		}
	}
	return words;
}

function checkWord(word, input) {
	return permute("", input);

	function permute(prefix, remaining) {
		for (let i = 0; i < remaining.length; i++) {
			let current = prefix + remaining[i];
			if (current == word) {
				return true;
			} else if (remaining.length > 1 && current.length < word.length) {
				if (
					permute(
						current,
						remaining.slice(0, i) + remaining.slice(i + 1)
					)
				) {
					return true;
				}
			}
		}
		return;
	}
}

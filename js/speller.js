export default {
	check,
	lookup,
}

var elements
var symbols = {}

await loadPeriodicTable()


// ****************************

async function loadPeriodicTable() {
	elements = await (await fetch("periodic-table.json")).json()
	for (let el of elements) {
		symbols[el.symbol.toLowerCase()] = el
	}
}

function findCandidates(inputWord) {
	let oneLetterSymbols = []
	let towLetterSymbols = []

	for (let i = 0; i < inputWord.length; i++) {
		// collect one-letter candidates
		if (inputWord[i] in symbols &&
			!oneLetterSymbols.includes(inputWord[i])) {
				oneLetterSymbols.push(inputWord[i])
			}

		// collect two-letter candidates
		if (i <= (inputWord.length - 2)) {
			let two = inputWord.slice(i, i+2)
			if (two in symbols && !towLetterSymbols.includes(two)){
				towLetterSymbols.push(two)
			}
		}
	}
	return [ ...towLetterSymbols, ...oneLetterSymbols]
}

function spellWord(candidates,charsLeft) {
	if (charsLeft.length == 0) {
		return []
	}
	else {
		// check for two letter symbols first
		if (charsLeft.length >= 2) {
			let two = charsLeft.slice(0,2)
			let rest = charsLeft.slice(2)
			if (candidates.includes(two)) {
				if (rest != '') {
					let result = [ two, ...spellWord(candidates,rest) ]
					if (result.join('') == charsLeft) {
						return result
					}
				}
				else {
					return [ two ]
				}
			}
		}
		// now check for one letter symbols
		if (charsLeft.length >= 1) {
			let one = charsLeft[0]
			let rest = charsLeft.slice(1)
			if (candidates.includes(one)) {
				if (rest != '') {
					let result = [ one, ...spellWord(candidates,rest) ]
					if (result.join('') == charsLeft) {
						return result
					}
				}
				else {
					return [ one ]
				}
			}
		}
	}
	return []
}

function check(inputWord) {
	let candidates = findCandidates(inputWord)
	return spellWord(candidates, inputWord)
}

function lookup(elementSymbol) {
	// TODO: return the element entry based on specified
	// symbol (case-insensitive)
	/* for (let el of elements) {
		if(el.symbol.toLowerCase() == elementSymbol)
			return el
	} */
	return symbols[elementSymbol]
	// return {}
}

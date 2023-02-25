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

function check(inputWord) {
	// TODO: determine if `inputWord` can be spelled
	// with periodic table symbols return array with
	// them if so (empty array otherwise)
	if (inputWord.length > 0) {
		for (let el of elements) {
			let symbol = el.symbol.toLowerCase()
			if (symbol.length <= inputWord.length) {
				// did the symbol match the first 
				// one of two characters in `inputword`
				if (inputWord.slice(0, symbol.length) == symbol) {
					// still have characters left
					if (inputWord.length > symbol.length) {
						let res = check(inputWord.slice(symbol.length))

						// matched successfully?
						if (res.length > 0) {
							return [symbol, ...res]
						}
					}
					else {
						 return [symbol]
					}

				}
			}
		}
	}

	return []
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

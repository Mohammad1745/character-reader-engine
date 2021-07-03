let engine = {
    threshold: 0.25,

    readCharacter: ({inputData, trainingData}) => {
        let heightWidthRationProbabilities = heightWidthRatioStroke.probabilities({inputData, trainingData})
        console.log(heightWidthRationProbabilities, 'Height-width ratio probabilities')
        let result = heightWidthRationProbabilities[0]
        heightWidthRationProbabilities.map(probability => {
            if (probability.value > result.value) result = probability
        })
        return result.value>=engine.threshold ? result.key : 'unknown'
    },

    height: (character) => {
        let maxRow = engine.maxRow(character)
        let minRow = engine.minRow(character)
        return maxRow-minRow > 0 ? maxRow-minRow: 0.1
    },

    width: (character) => {
        let maxColumn = engine.maxColumn(character)
        let minColumn = engine.minColumn(character)
        return maxColumn-minColumn > 0 ? maxColumn-minColumn: 0.1
    },

    maxRow: (array) => {
        let maxRow = array[0][0]
        for (let element of array) {
            if (element[0] > maxRow) maxRow = element[0]
        }
        return maxRow
    },

    minRow: (array) => {
        let minRow = array[0][0]
        for (let element of array) {
            if (element[0] < minRow) minRow = element[0]
        }
        return minRow
    },

    maxColumn: (array) => {
        let maxColumn = array[0][1]
        for (let element of array) {
            if (element[0] > maxColumn) maxColumn = element[1]
        }
        return maxColumn
    },

    minColumn: (array) => {
        let minColumn = array[0][1]
        for (let element of array) {
            if (element[1] < minColumn) minColumn = element[1]
        }
        return minColumn
    }
}
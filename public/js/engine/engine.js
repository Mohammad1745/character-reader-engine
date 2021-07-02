let engine = {
    readCharacter: ({inputData, trainingData}) => {
        let heightWidthRationProbabilities = heightWidthRatioStroke.probabilities({row, column, inputData, trainingData})
        console.log(heightWidthRationProbabilities, 'Height-width ration probability')
        let result = heightWidthRationProbabilities[0]
        heightWidthRationProbabilities.map(probability => {
            if (probability.ratio > result.ratio) result = probability
        })
        return result.key
    },

    height: (array) => {
        let maxRow = engine.maxRow(array)
        let minRow = engine.minRow(array)
        return maxRow-minRow > 0 ? maxRow-minRow: 0.1
    },

    width: (array) => {
        let maxColumn = engine.maxColumn(array)
        let minColumn = engine.minColumn(array)
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
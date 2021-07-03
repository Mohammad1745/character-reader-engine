let engine = {
    threshold: 0.25,

    readCharacter: ({inputData, trainingData}) => {
        let probabilities = []
        let heightWidthRatioProbabilities = heightWidthRatioStroke.probabilities({inputData, trainingData})
        let centreOfMassRatioProbabilities = centreOfMassRationStroke.probabilities({inputData, trainingData})
        console.log(heightWidthRatioProbabilities, 'Height-width ratio probabilities')
        console.log(centreOfMassRatioProbabilities, 'Centre of mass ratio probabilities')
        heightWidthRatioProbabilities.map((element, index) => {
            let populatedValue = element.value*0.1 + centreOfMassRatioProbabilities[index].value*0.9
            probabilities.push({key: element.key, value: populatedValue})
        })
        console.log(probabilities, 'average probabilities')
        let result = probabilities[0]
        probabilities.map(probability => {
            if (probability.value > result.value) result = probability
        })
        return result.value>=engine.threshold ? result.key : 'unknown'
    },

    divideCharacter: array => {
        let minRow = engine.minRow(array)
        let maxRow = engine.maxRow(array)
        let topPortion = []
        let bottomPortion = []
        array.map(point => {
            if (point[0]<Math.round((minRow+maxRow)/2)) topPortion.unshift(point)
            else if (point[0]>Math.round((minRow+maxRow)/2)) bottomPortion.unshift(point)
            else {
                topPortion.unshift(point)
                bottomPortion.unshift(point)
            }
        })
        return [topPortion, bottomPortion]
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

    topLeft: array => [engine.minRow(array), engine.minColumn(array)],

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
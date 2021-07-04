let engine = {
    threshold: 0.01,

    readCharacter: (inputData) => {
        let probabilities = []
        let heightWidthRatioProbabilities = heightWidthRatioStroke.probabilities({inputData, trainingData})
        let centreOfMassRatioProbabilities = centreOfMassRationStroke.probabilities({inputData, trainingData})
        let pixelDensityRatioProbabilities = pixelDensityRationStroke.probabilities({inputData, trainingData})
        console.log(heightWidthRatioProbabilities, 'Height-width ratio probabilities')
        console.log(centreOfMassRatioProbabilities, 'Centre of mass ratio probabilities')
        console.log(pixelDensityRatioProbabilities, 'Pixel density ratio probabilities')
        heightWidthRatioProbabilities.map((element, index) => {
            let populatedValue = element.value*0.15 + centreOfMassRatioProbabilities[index].value*0.3 + pixelDensityRatioProbabilities[index].value*0.55
            // let populatedValue = element.value*centreOfMassRatioProbabilities[index].value*pixelDensityRatioProbabilities[index].value
            probabilities.push({key: element.key, value: populatedValue})
        })
        console.log(probabilities, 'average probabilities')
        let result = probabilities[0]
        probabilities.map(probability => {
            if (probability.value > result.value) result = probability
        })
        return result.value>=engine.threshold ? result.key : 'unknown'
    },

    divideCharacterX: array => {
        let minColumn = engine.minColumn(array)
        let maxColumn = engine.maxColumn(array)
        let topPortion = []
        let bottomPortion = []
        array.map(point => {
            if (point[0]<Math.round((minColumn+maxColumn)/2)) topPortion.unshift(point)
            else if (point[0]>Math.round((minColumn+maxColumn)/2)) bottomPortion.unshift(point)
            else {
                topPortion.unshift(point)
                bottomPortion.unshift(point)
            }
        })
        return [topPortion, bottomPortion]
    },

    divideCharacterY: array => {
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

    divideCharacter3Y: array => {
        let minRow = engine.minRow(array)
        let maxRow = engine.maxRow(array)
        let mid1Row = Math.round((minRow+maxRow)/3)
        let mid2Row = Math.round((minRow+maxRow)*2/3)
        let topPortion = []
        let middlePortion = []
        let bottomPortion = []
        array.map(point => {
            if (point[0] < mid1Row) topPortion.unshift(point)
            else if (point[0] === mid1Row) {
                topPortion.unshift(point)
                middlePortion.unshift(point)
            }
            else if (point[0] < mid2Row) middlePortion.unshift(point)
            else if (point[0] === mid2Row) {
                middlePortion.unshift(point)
                bottomPortion.unshift(point)
            }
            else bottomPortion.unshift(point)
        })
        return [topPortion, middlePortion, bottomPortion]
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
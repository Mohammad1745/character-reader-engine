let engine = {
    threshold: 0.15,

    read: (inputData, row, column) => {
        let characters = engine.extractCharacters(inputData, row, column)
        let result = characters.map( character => engine.readCharacter(character))
        let unknown = result.filter(character => character==='unknown').length
        if (unknown) return `Unknown: ${unknown}`
        else return result.join('')
    },

    readCharacter: (inputData) => {
        let probabilities = []

        let heightWidthRatioProbabilities = heightWidthRatioStroke.probabilities({inputData, trainingData})
        let centreOfMassRatioProbabilities = centreOfMassRationStroke.probabilities({inputData, trainingData})
        let pixelDensityRatioProbabilities = pixelDensityRationStroke.probabilities({inputData, trainingData})
        let centreToEdgeDistanceRatioProbabilities = centreToEdgeDistanceRatioStroke.probabilities({inputData, trainingData})

        // console.log(heightWidthRatioProbabilities, 'Height-width ratio probabilities')
        // console.log(centreOfMassRatioProbabilities, 'Centre of mass ratio probabilities')
        // console.log(pixelDensityRatioProbabilities, 'Pixel density ratio probabilities')
        // console.log(centreToEdgeDistanceRatioProbabilities, 'Centre to edge distance ratio probabilities')
        heightWidthRatioProbabilities.map((element, index) => {
            // let populatedValue = element.value*0.08 + centreOfMassRatioProbabilities[index].value*0.16 + pixelDensityRatioProbabilities[index].value*0.16 + centreToEdgeDistanceRatioProbabilities[index].value*0.6
            let populatedValue = (element.value*0.2 + centreOfMassRatioProbabilities[index].value*0.4 + pixelDensityRatioProbabilities[index].value*0.4) * centreToEdgeDistanceRatioProbabilities[index].value
            probabilities.push({key: element.key, value: populatedValue})
        })
        // console.log(probabilities, 'average probabilities')
        let result = probabilities[0]
        probabilities.map(probability => {
            if (probability.value > result.value) result = probability
        })
        return result.value>=engine.threshold ? result.key : 'unknown'
    },

    extractCharacters: (inputData, row, column) => {
        let index = -1
        let characters = []
        let gap = 0

        for (let c=0; c<column; c++) {
            let points = inputData.filter(point => point[1]===c)
            if (points.length){
                if (index===-1 || gap>=3) {
                    index++
                    characters.push([])
                }
                points.map( point => characters[index].unshift(point))
                gap = 0
            } else {
                gap++
            }
        }
        return characters
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
    topRight: array => [engine.minRow(array), engine.maxColumn(array)],
    bottomRight: array => [engine.maxRow(array), engine.maxColumn(array)],
    bottomLeft: array => [engine.maxRow(array), engine.minColumn(array)],

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
            if (element[1] > maxColumn) maxColumn = element[1]
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
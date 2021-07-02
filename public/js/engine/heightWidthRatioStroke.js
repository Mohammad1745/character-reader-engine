let heightWidthRatioStroke = {
    probabilities: ({inputData, trainingData}) => {
        let probabilities = heightWidthRatioStroke.characterProbabilities(inputData, trainingData)
        return [...probabilities]
    },

    characterProbabilities: (inputData, trainingData) => {
        let probabilities = []

        let portions = heightWidthRatioStroke.divideCharacter(inputData)
        let topPortionInputRatio = engine.height(portions[0]) / engine.width(portions[0])
        let bottomPortionInputRatio = engine.height(portions[1]) / engine.width(portions[1])

        Object.keys(trainingData).map(key => {
            let smallSizeTrainingPortions = heightWidthRatioStroke.divideCharacter(trainingData[key].smaller)
            let largeSizeTrainingPortions = heightWidthRatioStroke.divideCharacter(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = engine.height(smallSizeTrainingPortions[0]) / engine.width(smallSizeTrainingPortions[0])
            let smallSizeBottomPortionTrainingRatio = engine.height(smallSizeTrainingPortions[1]) / engine.width(smallSizeTrainingPortions[1])
            let largeSizeTopPortionTrainingRatio = engine.height(largeSizeTrainingPortions[0]) / engine.width(largeSizeTrainingPortions[0])
            let largeSizeBottomPortionTrainingRatio = engine.height(largeSizeTrainingPortions[1]) / engine.width(largeSizeTrainingPortions[1])
            let topPortionTrainingRatio = (smallSizeTopPortionTrainingRatio + largeSizeTopPortionTrainingRatio)/2
            let bottomPortionTrainingRatio = (smallSizeBottomPortionTrainingRatio + largeSizeBottomPortionTrainingRatio)/2

            let topPortionProbability = topPortionInputRatio < topPortionTrainingRatio ?
                (topPortionInputRatio / topPortionTrainingRatio)
                : (topPortionTrainingRatio / topPortionInputRatio)
            let bottomPortionProbability = bottomPortionInputRatio < bottomPortionTrainingRatio ?
                (bottomPortionInputRatio / bottomPortionTrainingRatio)
                : (bottomPortionTrainingRatio / bottomPortionInputRatio)

            probabilities.push({key, ratio: (topPortionProbability+bottomPortionProbability)/2})

        })
        return [...probabilities]
    },

    divideCharacter: array => {
        let minRow = engine.minRow(array)
        let maxRow = engine.maxRow(array)
        let topPortion = []
        let bottomPortion = []
        array.map(point => {
            if (point[0]<=Math.round((minRow+maxRow)/2)) topPortion.unshift(point)
            else bottomPortion.unshift(point)
        })
        return [topPortion, bottomPortion]
    }
}
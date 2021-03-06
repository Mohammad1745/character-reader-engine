let heightWidthRatioStroke = {
    probabilities: ({inputData, trainingData}) => {
        let probabilities = heightWidthRatioStroke.characterProbabilities(inputData, trainingData)
        return [...probabilities]
    },

    characterProbabilities: (inputData, trainingData) => {
        let probabilities = []

        let portions = engine.divideCharacterY(inputData)
        let fullInputRatio = engine.height(inputData) / engine.width(inputData)
        let topPortionInputRatio = engine.height(portions[0]) / engine.width(portions[0])
        let bottomPortionInputRatio = engine.height(portions[1]) / engine.width(portions[1])

        Object.keys(trainingData).map(key => {
            let smallSizeTrainingPortions = engine.divideCharacterY(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacterY(trainingData[key].larger)
            let smallSizeFullTrainingRatio = engine.height(trainingData[key].smaller) / engine.width(trainingData[key].smaller)
            let largeSizeFullTrainingRatio = engine.height(trainingData[key].larger) / engine.width(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = engine.height(smallSizeTrainingPortions[0]) / engine.width(smallSizeTrainingPortions[0])
            let smallSizeBottomPortionTrainingRatio = engine.height(smallSizeTrainingPortions[1]) / engine.width(smallSizeTrainingPortions[1])
            let largeSizeTopPortionTrainingRatio = engine.height(largeSizeTrainingPortions[0]) / engine.width(largeSizeTrainingPortions[0])
            let largeSizeBottomPortionTrainingRatio = engine.height(largeSizeTrainingPortions[1]) / engine.width(largeSizeTrainingPortions[1])
            let fullTrainingRatio = (smallSizeFullTrainingRatio + largeSizeFullTrainingRatio)/2
            let topPortionTrainingRatio = (smallSizeTopPortionTrainingRatio + largeSizeTopPortionTrainingRatio)/2
            let bottomPortionTrainingRatio = (smallSizeBottomPortionTrainingRatio + largeSizeBottomPortionTrainingRatio)/2

            let fullProbability = fullInputRatio < fullTrainingRatio ?
                (fullInputRatio / fullTrainingRatio)
                : (fullTrainingRatio / fullInputRatio)
            let topPortionProbability = topPortionInputRatio < topPortionTrainingRatio ?
                (topPortionInputRatio / topPortionTrainingRatio)
                : (topPortionTrainingRatio / topPortionInputRatio)
            let bottomPortionProbability = bottomPortionInputRatio < bottomPortionTrainingRatio ?
                (bottomPortionInputRatio / bottomPortionTrainingRatio)
                : (bottomPortionTrainingRatio / bottomPortionInputRatio)

            probabilities.push({key, value: (fullProbability + topPortionProbability + bottomPortionProbability)/3})

        })
        return [...probabilities]
    }
}
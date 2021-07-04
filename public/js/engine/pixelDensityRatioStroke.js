let pixelDensityRationStroke = {
    probabilities: ({inputData, trainingData}) => {
        let probabilities = []
        let probabilitiesX = pixelDensityRationStroke.probabilitiesX(inputData, trainingData)
        let probabilitiesY = pixelDensityRationStroke.probabilitiesY(inputData, trainingData)
        let probabilities3Y = pixelDensityRationStroke.probabilities3Y(inputData, trainingData)
        probabilitiesX.map((element, index) => {
            let populatedValue = element.value*0.2 + probabilitiesY[index].value*0.3 + probabilities3Y[index].value*0.5
            probabilities.push({key: element.key, value: populatedValue})
        })
        return [...probabilities]
    },

    probabilitiesX: (inputData, trainingData) =>{
        let probabilities = []

        let inputPortions = engine.divideCharacterX(inputData)
        let topPortionInputRatio = inputData.length / inputPortions[0].length
        let bottomPortionInputRatio = inputData.length / inputPortions[1].length

        Object.keys(trainingData).map(key => {
            let smallSizeTrainingPortions = engine.divideCharacterX(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacterX(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = trainingData[key].smaller.length / smallSizeTrainingPortions[0].length
            let smallSizeBottomPortionTrainingRatio = trainingData[key].smaller.length / smallSizeTrainingPortions[1].length
            let largeSizeTopPortionTrainingRatio = trainingData[key].larger.length / largeSizeTrainingPortions[0].length
            let largeSizeBottomPortionTrainingRatio = trainingData[key].larger.length / largeSizeTrainingPortions[1].length

            let topPortionTrainingRatio = smallSizeTopPortionTrainingRatio*0.5 + largeSizeTopPortionTrainingRatio*0.5
            let bottomPortionTrainingRatio = smallSizeBottomPortionTrainingRatio*0.5 + largeSizeBottomPortionTrainingRatio*0.5

            let topPortionProbability = topPortionInputRatio < topPortionTrainingRatio ?
                (topPortionInputRatio / topPortionTrainingRatio)
                : (topPortionTrainingRatio / topPortionInputRatio)
            let bottomPortionProbability = bottomPortionInputRatio < bottomPortionTrainingRatio ?
                (bottomPortionInputRatio / bottomPortionTrainingRatio)
                : (bottomPortionTrainingRatio / bottomPortionInputRatio)

            probabilities.push({key, value: topPortionProbability*0.5 + bottomPortionProbability*0.5})
        })
        return [...probabilities]
    },

    probabilitiesY: (inputData, trainingData) =>{
        let probabilities = []

        let inputPortions = engine.divideCharacterY(inputData)
        let topPortionInputRatio = inputData.length / inputPortions[0].length
        let bottomPortionInputRatio = inputData.length / inputPortions[1].length

        Object.keys(trainingData).map(key => {
            let smallSizeTrainingPortions = engine.divideCharacterY(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacterY(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = trainingData[key].smaller.length / smallSizeTrainingPortions[0].length
            let smallSizeBottomPortionTrainingRatio = trainingData[key].smaller.length / smallSizeTrainingPortions[1].length
            let largeSizeTopPortionTrainingRatio = trainingData[key].larger.length / largeSizeTrainingPortions[0].length
            let largeSizeBottomPortionTrainingRatio = trainingData[key].larger.length / largeSizeTrainingPortions[1].length

            let topPortionTrainingRatio = smallSizeTopPortionTrainingRatio*0.5 + largeSizeTopPortionTrainingRatio*0.5
            let bottomPortionTrainingRatio = smallSizeBottomPortionTrainingRatio*0.5 + largeSizeBottomPortionTrainingRatio*0.5

            let topPortionProbability = topPortionInputRatio < topPortionTrainingRatio ?
                (topPortionInputRatio / topPortionTrainingRatio)
                : (topPortionTrainingRatio / topPortionInputRatio)
            let bottomPortionProbability = bottomPortionInputRatio < bottomPortionTrainingRatio ?
                (bottomPortionInputRatio / bottomPortionTrainingRatio)
                : (bottomPortionTrainingRatio / bottomPortionInputRatio)

            probabilities.push({key, value: topPortionProbability*0.5 + bottomPortionProbability*0.5})
        })
        return [...probabilities]
    },

    probabilities3Y: (inputData, trainingData) =>{
        let probabilities = []

        let inputPortions = engine.divideCharacter3Y(inputData)
        let topPortionInputRatio = inputData.length / inputPortions[0].length
        let middlePortionInputRatio = inputData.length / inputPortions[1].length
        let bottomPortionInputRatio = inputData.length / inputPortions[2].length

        Object.keys(trainingData).map(key => {
            let smallSizeTrainingPortions = engine.divideCharacter3Y(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacter3Y(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = trainingData[key].smaller.length / smallSizeTrainingPortions[0].length
            let smallSizeMiddlePortionTrainingRatio = trainingData[key].smaller.length / smallSizeTrainingPortions[1].length
            let smallSizeBottomPortionTrainingRatio = trainingData[key].smaller.length / smallSizeTrainingPortions[2].length
            let largeSizeTopPortionTrainingRatio = trainingData[key].larger.length / largeSizeTrainingPortions[0].length
            let largeSizeMiddlePortionTrainingRatio = trainingData[key].larger.length / largeSizeTrainingPortions[1].length
            let largeSizeBottomPortionTrainingRatio = trainingData[key].larger.length / largeSizeTrainingPortions[2].length

            let topPortionTrainingRatio = smallSizeTopPortionTrainingRatio*0.5 + largeSizeTopPortionTrainingRatio*0.5
            let middlePortionTrainingRatio = smallSizeMiddlePortionTrainingRatio*0.5 + largeSizeMiddlePortionTrainingRatio*0.5
            let bottomPortionTrainingRatio = smallSizeBottomPortionTrainingRatio*0.5 + largeSizeBottomPortionTrainingRatio*0.5

            let topPortionProbability = topPortionInputRatio < topPortionTrainingRatio ?
                (topPortionInputRatio / topPortionTrainingRatio)
                : (topPortionTrainingRatio / topPortionInputRatio)
            let middlePortionProbability = middlePortionInputRatio < middlePortionTrainingRatio ?
                (middlePortionInputRatio / middlePortionTrainingRatio)
                : (middlePortionTrainingRatio / middlePortionInputRatio)
            let bottomPortionProbability = bottomPortionInputRatio < bottomPortionTrainingRatio ?
                (bottomPortionInputRatio / bottomPortionTrainingRatio)
                : (bottomPortionTrainingRatio / bottomPortionInputRatio)

            probabilities.push({key, value: topPortionProbability*0.33 + middlePortionProbability*0.34 + bottomPortionProbability*0.33})
        })
        return [...probabilities]
    }
}
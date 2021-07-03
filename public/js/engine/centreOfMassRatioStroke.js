let centreOfMassRationStroke = {
    probabilities: ({inputData, trainingData}) => {
        let probabilities = []
        let probabilitiesWithRespectToHeight = centreOfMassRationStroke.probabilitiesWithRespectToHeight(inputData, trainingData)
        let probabilitiesWithRespectToWidth = centreOfMassRationStroke.probabilitiesWithRespectToWidth(inputData, trainingData)
        probabilitiesWithRespectToHeight.map((element, index) => {
            let populatedValue = element.value*0.5 + probabilitiesWithRespectToWidth[index].value*0.5
            probabilities.push({key: element.key, value: populatedValue})
        })
        return [...probabilities]
    },

    probabilitiesWithRespectToHeight: (inputData, trainingData) => {
        let probabilities = []

        let fullInputRatio = engine.height(inputData) / distance(engine.topLeft(inputData), centreOfMassRationStroke.centreOfMass(inputData))
        let portions = engine.divideCharacter(inputData)
        let topPortionInputRatio = engine.height(portions[0]) / distance(engine.topLeft(portions[0]), centreOfMassRationStroke.centreOfMass(portions[0]))
        let bottomPortionInputRatio = engine.height(portions[1]) / distance(engine.topLeft(portions[1]), centreOfMassRationStroke.centreOfMass(portions[1]))

        Object.keys(trainingData).map(key => {
            let smallSizeFullTrainingRatio = engine.height(trainingData[key].smaller) / distance(engine.topLeft(trainingData[key].smaller), centreOfMassRationStroke.centreOfMass(trainingData[key].smaller))
            let largeSizeFullTrainingRatio = engine.height(trainingData[key].larger) / distance(engine.topLeft(trainingData[key].larger), centreOfMassRationStroke.centreOfMass(trainingData[key].larger))
            let smallSizeTrainingPortions = engine.divideCharacter(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacter(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = engine.height(smallSizeTrainingPortions[0]) / distance(engine.topLeft(smallSizeTrainingPortions[0]), centreOfMassRationStroke.centreOfMass(smallSizeTrainingPortions[0]))
            let smallSizeBottomPortionTrainingRatio = engine.height(smallSizeTrainingPortions[1]) / distance(engine.topLeft(smallSizeTrainingPortions[1]), centreOfMassRationStroke.centreOfMass(smallSizeTrainingPortions[1]))
            let largeSizeTopPortionTrainingRatio = engine.height(largeSizeTrainingPortions[0]) / distance(engine.topLeft(largeSizeTrainingPortions[0]), centreOfMassRationStroke.centreOfMass(largeSizeTrainingPortions[0]))
            let largeSizeBottomPortionTrainingRatio = engine.height(largeSizeTrainingPortions[1]) / distance(engine.topLeft(largeSizeTrainingPortions[1]), centreOfMassRationStroke.centreOfMass(largeSizeTrainingPortions[1]))
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

            probabilities.push({key, value: fullProbability*0.20 + topPortionProbability*0.40 + bottomPortionProbability*0.40})
        })
        return [...probabilities]
    },

    probabilitiesWithRespectToWidth: (inputData, trainingData) => {
        let probabilities = []

        let fullInputRatio = engine.width(inputData) / distance(engine.topLeft(inputData), centreOfMassRationStroke.centreOfMass(inputData))
        let portions = engine.divideCharacter(inputData)
        let topPortionInputRatio = engine.width(portions[0]) / distance(engine.topLeft(portions[0]), centreOfMassRationStroke.centreOfMass(portions[0]))
        let bottomPortionInputRatio = engine.width(portions[1]) / distance(engine.topLeft(portions[1]), centreOfMassRationStroke.centreOfMass(portions[1]))

        Object.keys(trainingData).map(key => {
            let smallSizeFullTrainingRatio = engine.width(trainingData[key].smaller) / distance(engine.topLeft(trainingData[key].smaller), centreOfMassRationStroke.centreOfMass(trainingData[key].smaller))
            let largeSizeFullTrainingRatio = engine.width(trainingData[key].larger) / distance(engine.topLeft(trainingData[key].larger), centreOfMassRationStroke.centreOfMass(trainingData[key].larger))
            let smallSizeTrainingPortions = engine.divideCharacter(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacter(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = engine.width(smallSizeTrainingPortions[0]) / distance(engine.topLeft(smallSizeTrainingPortions[0]), centreOfMassRationStroke.centreOfMass(smallSizeTrainingPortions[0]))
            let smallSizeBottomPortionTrainingRatio = engine.width(smallSizeTrainingPortions[1]) / distance(engine.topLeft(smallSizeTrainingPortions[1]), centreOfMassRationStroke.centreOfMass(smallSizeTrainingPortions[1]))
            let largeSizeTopPortionTrainingRatio = engine.width(largeSizeTrainingPortions[0]) / distance(engine.topLeft(largeSizeTrainingPortions[0]), centreOfMassRationStroke.centreOfMass(largeSizeTrainingPortions[0]))
            let largeSizeBottomPortionTrainingRatio = engine.width(largeSizeTrainingPortions[1]) / distance(engine.topLeft(largeSizeTrainingPortions[1]), centreOfMassRationStroke.centreOfMass(largeSizeTrainingPortions[1]))
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
    },

    centreOfMass: array => {
        let centreOfMass = [0,0]
        array.map(point => {
            centreOfMass[0] += point[0]
            centreOfMass[1] += point[1]
        })
        centreOfMass[0] /= array.length
        centreOfMass[1] /= array.length
        return centreOfMass
    }
}
let centreOfMassRationStroke = {
    probabilities: ({inputData, trainingData}) => {
        let probabilities = []
        let probabilitiesX = centreOfMassRationStroke.probabilitiesX(inputData, trainingData)
        let probabilitiesY = centreOfMassRationStroke.probabilitiesY(inputData, trainingData)
        // let probabilities3Y = centreOfMassRationStroke.probabilities3Y(inputData, trainingData)
        probabilitiesX.map((element, index) => {
            let populatedValue = element.value*0.5 + probabilitiesY[index].value*0.5 //+ probabilities3Y[index].value*0.5
            probabilities.push({key: element.key, value: populatedValue})
        })
        return [...probabilities]
    },

    probabilitiesY: (inputData, trainingData) => {
        let probabilities = []

        let fullInputRatio = engine.height(inputData) / distance(engine.topLeft(inputData), centreOfMassRationStroke.centreOfMass(inputData))
        let portions = engine.divideCharacterY(inputData)
        let topPortionInputRatio = engine.height(portions[0]) / distance(engine.topLeft(portions[0]), centreOfMassRationStroke.centreOfMass(portions[0]))
        let bottomPortionInputRatio = engine.height(portions[1]) / distance(engine.topLeft(portions[1]), centreOfMassRationStroke.centreOfMass(portions[1]))

        Object.keys(trainingData).map(key => {
            let smallSizeFullTrainingRatio = engine.height(trainingData[key].smaller) / distance(engine.topLeft(trainingData[key].smaller), centreOfMassRationStroke.centreOfMass(trainingData[key].smaller))
            let largeSizeFullTrainingRatio = engine.height(trainingData[key].larger) / distance(engine.topLeft(trainingData[key].larger), centreOfMassRationStroke.centreOfMass(trainingData[key].larger))
            let smallSizeTrainingPortions = engine.divideCharacterY(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacterY(trainingData[key].larger)
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

            probabilities.push({key, value: fullProbability*0.30 + topPortionProbability*0.35 + bottomPortionProbability*0.35})
        })
        return [...probabilities]
    },

    probabilities3Y: (inputData, trainingData) => {
        let probabilities = []

        let fullInputRatio = engine.height(inputData) / distance(engine.topLeft(inputData), centreOfMassRationStroke.centreOfMass(inputData))
        let portions = engine.divideCharacter3Y(inputData)
        let topPortionInputRatio = engine.height(portions[0]) / distance(engine.topLeft(portions[0]), centreOfMassRationStroke.centreOfMass(portions[0]))
        let middlePortionInputRatio = engine.height(portions[1]) / distance(engine.topLeft(portions[1]), centreOfMassRationStroke.centreOfMass(portions[1]))
        let bottomPortionInputRatio = engine.height(portions[1]) / distance(engine.topLeft(portions[1]), centreOfMassRationStroke.centreOfMass(portions[2]))

        Object.keys(trainingData).map(key => {
            let smallSizeFullTrainingRatio = engine.height(trainingData[key].smaller) / distance(engine.topLeft(trainingData[key].smaller), centreOfMassRationStroke.centreOfMass(trainingData[key].smaller))
            let largeSizeFullTrainingRatio = engine.height(trainingData[key].larger) / distance(engine.topLeft(trainingData[key].larger), centreOfMassRationStroke.centreOfMass(trainingData[key].larger))
            let smallSizeTrainingPortions = engine.divideCharacter3Y(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacter3Y(trainingData[key].larger)
            let smallSizeTopPortionTrainingRatio = engine.height(smallSizeTrainingPortions[0]) / distance(engine.topLeft(smallSizeTrainingPortions[0]), centreOfMassRationStroke.centreOfMass(smallSizeTrainingPortions[0]))
            let smallSizeMiddlePortionTrainingRatio = engine.height(smallSizeTrainingPortions[1]) / distance(engine.topLeft(smallSizeTrainingPortions[1]), centreOfMassRationStroke.centreOfMass(smallSizeTrainingPortions[1]))
            let smallSizeBottomPortionTrainingRatio = engine.height(smallSizeTrainingPortions[2]) / distance(engine.topLeft(smallSizeTrainingPortions[2]), centreOfMassRationStroke.centreOfMass(smallSizeTrainingPortions[2]))
            let largeSizeTopPortionTrainingRatio = engine.height(largeSizeTrainingPortions[0]) / distance(engine.topLeft(largeSizeTrainingPortions[0]), centreOfMassRationStroke.centreOfMass(largeSizeTrainingPortions[0]))
            let largeSizeMiddlePortionTrainingRatio = engine.height(largeSizeTrainingPortions[1]) / distance(engine.topLeft(largeSizeTrainingPortions[1]), centreOfMassRationStroke.centreOfMass(largeSizeTrainingPortions[1]))
            let largeSizeBottomPortionTrainingRatio = engine.height(largeSizeTrainingPortions[2]) / distance(engine.topLeft(largeSizeTrainingPortions[2]), centreOfMassRationStroke.centreOfMass(largeSizeTrainingPortions[2]))
            let fullTrainingRatio = (smallSizeFullTrainingRatio + largeSizeFullTrainingRatio)/2
            let topPortionTrainingRatio = (smallSizeTopPortionTrainingRatio + largeSizeTopPortionTrainingRatio)/2
            let middlePortionTrainingRatio = (smallSizeMiddlePortionTrainingRatio + largeSizeMiddlePortionTrainingRatio)/2
            let bottomPortionTrainingRatio = (smallSizeBottomPortionTrainingRatio + largeSizeBottomPortionTrainingRatio)/2

            let fullProbability = fullInputRatio < fullTrainingRatio ?
                (fullInputRatio / fullTrainingRatio)
                : (fullTrainingRatio / fullInputRatio)
            let topPortionProbability = topPortionInputRatio < topPortionTrainingRatio ?
                (topPortionInputRatio / topPortionTrainingRatio)
                : (topPortionTrainingRatio / topPortionInputRatio)
            let middlePortionProbability = middlePortionInputRatio < middlePortionTrainingRatio ?
                (middlePortionInputRatio / middlePortionTrainingRatio)
                : (middlePortionTrainingRatio / middlePortionInputRatio)
            let bottomPortionProbability = bottomPortionInputRatio < bottomPortionTrainingRatio ?
                (bottomPortionInputRatio / bottomPortionTrainingRatio)
                : (bottomPortionTrainingRatio / bottomPortionInputRatio)

            probabilities.push({key, value: fullProbability*0.10 + topPortionProbability*0.30 + middlePortionProbability*0.30 + bottomPortionProbability*0.30})
        })
        return [...probabilities]
    },

    probabilitiesX: (inputData, trainingData) => {
        let probabilities = []

        let fullInputRatio = engine.width(inputData) / distance(engine.topLeft(inputData), centreOfMassRationStroke.centreOfMass(inputData))
        let portions = engine.divideCharacterY(inputData)
        let topPortionInputRatio = engine.width(portions[0]) / distance(engine.topLeft(portions[0]), centreOfMassRationStroke.centreOfMass(portions[0]))
        let bottomPortionInputRatio = engine.width(portions[1]) / distance(engine.topLeft(portions[1]), centreOfMassRationStroke.centreOfMass(portions[1]))

        Object.keys(trainingData).map(key => {
            let smallSizeFullTrainingRatio = engine.width(trainingData[key].smaller) / distance(engine.topLeft(trainingData[key].smaller), centreOfMassRationStroke.centreOfMass(trainingData[key].smaller))
            let largeSizeFullTrainingRatio = engine.width(trainingData[key].larger) / distance(engine.topLeft(trainingData[key].larger), centreOfMassRationStroke.centreOfMass(trainingData[key].larger))
            let smallSizeTrainingPortions = engine.divideCharacterY(trainingData[key].smaller)
            let largeSizeTrainingPortions = engine.divideCharacterY(trainingData[key].larger)
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
let centreToEdgeDistanceRatioStroke = {
    probabilities: ({inputData, trainingData}) => {
        let probabilities = []
        let fullCharacterProbabilities = centreToEdgeDistanceRatioStroke.fullCharacterProbabilities({inputData, trainingData})
        let characterTopPortionProbabilities = centreToEdgeDistanceRatioStroke.characterTopPortionProbabilities({inputData, trainingData})
        let characterBottomPortionProbabilities = centreToEdgeDistanceRatioStroke.characterBottomPortionProbabilities({inputData, trainingData})

        fullCharacterProbabilities.map((element, index) => {
            let populatedValue = element.value*0.25 + characterTopPortionProbabilities[index].value*0.35 + characterBottomPortionProbabilities[index].value*0.4
            probabilities.push({key: element.key, value: populatedValue})
        })
        return [...probabilities]
    },

    fullCharacterProbabilities: ({inputData, trainingData}) => {
        let probabilities = []

        let inputCentrePoint = centreToEdgeDistanceRatioStroke.centrePoint(inputData)
        let inputPointLeftOfCentre = centreToEdgeDistanceRatioStroke.pointLeftOfCentre(inputData)
        let inputPointRightOfCentre = centreToEdgeDistanceRatioStroke.pointRightOfCentre(inputData)
        let inputPointTopOfCentre = centreToEdgeDistanceRatioStroke.pointTopOfCentre(inputData)
        let inputPointBottomOfCentre = centreToEdgeDistanceRatioStroke.pointBottomOfCentre(inputData)

        let inputCentrePointToLeftDistance = inputPointLeftOfCentre.length ? distance(inputCentrePoint, inputPointLeftOfCentre) : 0
        let inputCentrePointToRightDistance = inputPointRightOfCentre.length ? distance(inputCentrePoint, inputPointRightOfCentre) : 0
        let inputCentrePointToTopDistance = inputPointTopOfCentre.length ? distance(inputCentrePoint, inputPointTopOfCentre) : 0
        let inputCentrePointToBottomDistance = inputPointBottomOfCentre.length ? distance(inputCentrePoint, inputPointBottomOfCentre) : 0

        let inputMaxDistance = inputCentrePointToLeftDistance
        if (inputCentrePointToRightDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToRightDistance
        if (inputCentrePointToTopDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToTopDistance
        if (inputCentrePointToBottomDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToBottomDistance

        if (inputMaxDistance>0) {
            inputCentrePointToLeftDistance /= inputMaxDistance
            inputCentrePointToRightDistance /= inputMaxDistance
            inputCentrePointToTopDistance /= inputMaxDistance
            inputCentrePointToBottomDistance /= inputMaxDistance
        }

        // console.log(inputCentrePoint, inputCentrePointToLeftDistance, inputCentrePointToRightDistance, inputCentrePointToTopDistance, inputCentrePointToBottomDistance, 'input')

        Object.keys(trainingData).map(key => {
            let trainingCentrePoint = centreToEdgeDistanceRatioStroke.centrePoint(trainingData[key].larger)
            let trainingPointLeftOfCentre = centreToEdgeDistanceRatioStroke.pointLeftOfCentre(trainingData[key].larger)
            let trainingPointRightOfCentre = centreToEdgeDistanceRatioStroke.pointRightOfCentre(trainingData[key].larger)
            let trainingPointTopOfCentre = centreToEdgeDistanceRatioStroke.pointTopOfCentre(trainingData[key].larger)
            let trainingPointBottomOfCentre = centreToEdgeDistanceRatioStroke.pointBottomOfCentre(trainingData[key].larger)

            let trainingCentrePointToLeftDistance = trainingPointLeftOfCentre.length ? distance(trainingCentrePoint, trainingPointLeftOfCentre) : 0
            let trainingCentrePointToRightDistance = trainingPointRightOfCentre.length ? distance(trainingCentrePoint, trainingPointRightOfCentre) : 0
            let trainingCentrePointToTopDistance = trainingPointTopOfCentre.length ? distance(trainingCentrePoint, trainingPointTopOfCentre) : 0
            let trainingCentrePointToBottomDistance = trainingPointBottomOfCentre.length ? distance(trainingCentrePoint, trainingPointBottomOfCentre) : 0

            let trainingMaxDistance = trainingCentrePointToLeftDistance
            if (trainingCentrePointToRightDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToRightDistance
            if (trainingCentrePointToTopDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToTopDistance
            if (trainingCentrePointToBottomDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToBottomDistance

            if (trainingMaxDistance>0) {
                trainingCentrePointToLeftDistance /= trainingMaxDistance
                trainingCentrePointToRightDistance /= trainingMaxDistance
                trainingCentrePointToTopDistance /= trainingMaxDistance
                trainingCentrePointToBottomDistance /= trainingMaxDistance
            }

            // console.log(trainingCentrePoint,trainingCentrePointToLeftDistance, trainingCentrePointToRightDistance, trainingCentrePointToTopDistance, trainingCentrePointToBottomDistance, 'training ' + key)

            let zeroProbabilityCondition =
                xor(inputCentrePointToLeftDistance===0,trainingCentrePointToLeftDistance===0) //&& inputCentrePointToLeftDistance !== trainingCentrePointToLeftDistance
                || xor(inputCentrePointToRightDistance===0,trainingCentrePointToRightDistance===0) //&& inputCentrePointToRightDistance !== trainingCentrePointToRightDistance
                || xor(inputCentrePointToTopDistance===0,trainingCentrePointToTopDistance===0) //&& inputCentrePointToTopDistance !== trainingCentrePointToTopDistance
                || xor(inputCentrePointToBottomDistance===0,trainingCentrePointToBottomDistance===0) //&& inputCentrePointToBottomDistance !== trainingCentrePointToBottomDistance

            if (zeroProbabilityCondition) {
                probabilities.push({key, value: 0})
                // console.log(key, '0')
            } else {
                let probability = 0
                if (inputCentrePointToLeftDistance===trainingCentrePointToLeftDistance) probability += 1
                else probability += inputCentrePointToLeftDistance > trainingCentrePointToLeftDistance ? trainingCentrePointToLeftDistance / inputCentrePointToLeftDistance : inputCentrePointToLeftDistance / trainingCentrePointToLeftDistance

                if (inputCentrePointToRightDistance===trainingCentrePointToRightDistance) probability += 1
                else probability += inputCentrePointToRightDistance > trainingCentrePointToRightDistance ? trainingCentrePointToRightDistance / inputCentrePointToRightDistance : inputCentrePointToRightDistance / trainingCentrePointToRightDistance

                if (inputCentrePointToTopDistance===trainingCentrePointToTopDistance) probability += 1
                else probability += inputCentrePointToTopDistance > trainingCentrePointToTopDistance ? trainingCentrePointToTopDistance / inputCentrePointToTopDistance : inputCentrePointToTopDistance / trainingCentrePointToTopDistance

                if (inputCentrePointToBottomDistance===trainingCentrePointToBottomDistance) probability += 1
                else probability += inputCentrePointToBottomDistance > trainingCentrePointToBottomDistance ? trainingCentrePointToBottomDistance / inputCentrePointToBottomDistance : inputCentrePointToBottomDistance / trainingCentrePointToBottomDistance

                probabilities.push({key, value: probability/4})
            }
        })
        return [...probabilities]
    },

    characterTopPortionProbabilities: ({inputData, trainingData}) => {
        let probabilities = []

        let inputPortions = engine.divideCharacterY(inputData)
        let inputCentrePoint = centreToEdgeDistanceRatioStroke.centrePoint(inputPortions[0])
        let inputPointLeftOfCentre = centreToEdgeDistanceRatioStroke.pointLeftOfCentre(inputPortions[0])
        let inputPointRightOfCentre = centreToEdgeDistanceRatioStroke.pointRightOfCentre(inputPortions[0])
        let inputPointTopOfCentre = centreToEdgeDistanceRatioStroke.pointTopOfCentre(inputPortions[0])
        let inputPointBottomOfCentre = centreToEdgeDistanceRatioStroke.pointBottomOfCentre(inputPortions[0])

        let inputCentrePointToLeftDistance = inputPointLeftOfCentre.length ? distance(inputCentrePoint, inputPointLeftOfCentre) : 0
        let inputCentrePointToRightDistance = inputPointRightOfCentre.length ? distance(inputCentrePoint, inputPointRightOfCentre) : 0
        let inputCentrePointToTopDistance = inputPointTopOfCentre.length ? distance(inputCentrePoint, inputPointTopOfCentre) : 0
        let inputCentrePointToBottomDistance = inputPointBottomOfCentre.length ? distance(inputCentrePoint, inputPointBottomOfCentre) : 0

        let inputMaxDistance = inputCentrePointToLeftDistance
        if (inputCentrePointToRightDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToRightDistance
        if (inputCentrePointToTopDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToTopDistance
        if (inputCentrePointToBottomDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToBottomDistance

        if (inputMaxDistance>0) {
            inputCentrePointToLeftDistance /= inputMaxDistance
            inputCentrePointToRightDistance /= inputMaxDistance
            inputCentrePointToTopDistance /= inputMaxDistance
            inputCentrePointToBottomDistance /= inputMaxDistance
        }

        // console.log(inputCentrePoint, inputCentrePointToLeftDistance, inputCentrePointToRightDistance, inputCentrePointToTopDistance, inputCentrePointToBottomDistance, 'input')

        Object.keys(trainingData).map(key => {
            let trainingPortions = engine.divideCharacterY(trainingData[key].larger)

            let trainingCentrePoint = centreToEdgeDistanceRatioStroke.centrePoint(trainingPortions[0])
            let trainingPointLeftOfCentre = centreToEdgeDistanceRatioStroke.pointLeftOfCentre(trainingPortions[0])
            let trainingPointRightOfCentre = centreToEdgeDistanceRatioStroke.pointRightOfCentre(trainingPortions[0])
            let trainingPointTopOfCentre = centreToEdgeDistanceRatioStroke.pointTopOfCentre(trainingPortions[0])
            let trainingPointBottomOfCentre = centreToEdgeDistanceRatioStroke.pointBottomOfCentre(trainingPortions[0])

            let trainingCentrePointToLeftDistance = trainingPointLeftOfCentre.length ? distance(trainingCentrePoint, trainingPointLeftOfCentre) : 0
            let trainingCentrePointToRightDistance = trainingPointRightOfCentre.length ? distance(trainingCentrePoint, trainingPointRightOfCentre) : 0
            let trainingCentrePointToTopDistance = trainingPointTopOfCentre.length ? distance(trainingCentrePoint, trainingPointTopOfCentre) : 0
            let trainingCentrePointToBottomDistance = trainingPointBottomOfCentre.length ? distance(trainingCentrePoint, trainingPointBottomOfCentre) : 0

            let trainingMaxDistance = trainingCentrePointToLeftDistance
            if (trainingCentrePointToRightDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToRightDistance
            if (trainingCentrePointToTopDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToTopDistance
            if (trainingCentrePointToBottomDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToBottomDistance

            if (trainingMaxDistance>0) {
                trainingCentrePointToLeftDistance /= trainingMaxDistance
                trainingCentrePointToRightDistance /= trainingMaxDistance
                trainingCentrePointToTopDistance /= trainingMaxDistance
                trainingCentrePointToBottomDistance /= trainingMaxDistance
            }

            // console.log(trainingCentrePoint,trainingCentrePointToLeftDistance, trainingCentrePointToRightDistance, trainingCentrePointToTopDistance, trainingCentrePointToBottomDistance, 'training ' + key)

            let zeroProbabilityCondition =
                xor(inputCentrePointToLeftDistance===0,trainingCentrePointToLeftDistance===0) //&& inputCentrePointToLeftDistance !== trainingCentrePointToLeftDistance
                || xor(inputCentrePointToRightDistance===0,trainingCentrePointToRightDistance===0) //&& inputCentrePointToRightDistance !== trainingCentrePointToRightDistance
                || xor(inputCentrePointToTopDistance===0,trainingCentrePointToTopDistance===0) //&& inputCentrePointToTopDistance !== trainingCentrePointToTopDistance
                || xor(inputCentrePointToBottomDistance===0,trainingCentrePointToBottomDistance===0) //&& inputCentrePointToBottomDistance !== trainingCentrePointToBottomDistance

            if (zeroProbabilityCondition) {
                probabilities.push({key, value: 0})
                // console.log(key, '0')
            } else {
                let probability = 0
                if (inputCentrePointToLeftDistance===trainingCentrePointToLeftDistance) probability += 1
                else probability += inputCentrePointToLeftDistance > trainingCentrePointToLeftDistance ? trainingCentrePointToLeftDistance / inputCentrePointToLeftDistance : inputCentrePointToLeftDistance / trainingCentrePointToLeftDistance

                if (inputCentrePointToRightDistance===trainingCentrePointToRightDistance) probability += 1
                else probability += inputCentrePointToRightDistance > trainingCentrePointToRightDistance ? trainingCentrePointToRightDistance / inputCentrePointToRightDistance : inputCentrePointToRightDistance / trainingCentrePointToRightDistance

                if (inputCentrePointToTopDistance===trainingCentrePointToTopDistance) probability += 1
                else probability += inputCentrePointToTopDistance > trainingCentrePointToTopDistance ? trainingCentrePointToTopDistance / inputCentrePointToTopDistance : inputCentrePointToTopDistance / trainingCentrePointToTopDistance

                if (inputCentrePointToBottomDistance===trainingCentrePointToBottomDistance) probability += 1
                else probability += inputCentrePointToBottomDistance > trainingCentrePointToBottomDistance ? trainingCentrePointToBottomDistance / inputCentrePointToBottomDistance : inputCentrePointToBottomDistance / trainingCentrePointToBottomDistance

                probabilities.push({key, value: probability/4})
            }
        })
        return [...probabilities]
    },

    characterBottomPortionProbabilities: ({inputData, trainingData}) => {
        let probabilities = []

        let inputPortions = engine.divideCharacterY(inputData)
        let inputCentrePoint = centreToEdgeDistanceRatioStroke.centrePoint(inputPortions[1])
        let inputPointLeftOfCentre = centreToEdgeDistanceRatioStroke.pointLeftOfCentre(inputPortions[1])
        let inputPointRightOfCentre = centreToEdgeDistanceRatioStroke.pointRightOfCentre(inputPortions[1])
        let inputPointTopOfCentre = centreToEdgeDistanceRatioStroke.pointTopOfCentre(inputPortions[1])
        let inputPointBottomOfCentre = centreToEdgeDistanceRatioStroke.pointBottomOfCentre(inputPortions[1])

        let inputCentrePointToLeftDistance = inputPointLeftOfCentre.length ? distance(inputCentrePoint, inputPointLeftOfCentre) : 0
        let inputCentrePointToRightDistance = inputPointRightOfCentre.length ? distance(inputCentrePoint, inputPointRightOfCentre) : 0
        let inputCentrePointToTopDistance = inputPointTopOfCentre.length ? distance(inputCentrePoint, inputPointTopOfCentre) : 0
        let inputCentrePointToBottomDistance = inputPointBottomOfCentre.length ? distance(inputCentrePoint, inputPointBottomOfCentre) : 0

        let inputMaxDistance = inputCentrePointToLeftDistance
        if (inputCentrePointToRightDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToRightDistance
        if (inputCentrePointToTopDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToTopDistance
        if (inputCentrePointToBottomDistance > inputMaxDistance) inputMaxDistance = inputCentrePointToBottomDistance

        if (inputMaxDistance>0) {
            inputCentrePointToLeftDistance /= inputMaxDistance
            inputCentrePointToRightDistance /= inputMaxDistance
            inputCentrePointToTopDistance /= inputMaxDistance
            inputCentrePointToBottomDistance /= inputMaxDistance
        }

        // console.log(inputCentrePoint, inputCentrePointToLeftDistance, inputCentrePointToRightDistance, inputCentrePointToTopDistance, inputCentrePointToBottomDistance, 'input')

        Object.keys(trainingData).map(key => {
            let trainingPortions = engine.divideCharacterY(trainingData[key].larger)

            let trainingCentrePoint = centreToEdgeDistanceRatioStroke.centrePoint(trainingPortions[1])
            let trainingPointLeftOfCentre = centreToEdgeDistanceRatioStroke.pointLeftOfCentre(trainingPortions[1])
            let trainingPointRightOfCentre = centreToEdgeDistanceRatioStroke.pointRightOfCentre(trainingPortions[1])
            let trainingPointTopOfCentre = centreToEdgeDistanceRatioStroke.pointTopOfCentre(trainingPortions[1])
            let trainingPointBottomOfCentre = centreToEdgeDistanceRatioStroke.pointBottomOfCentre(trainingPortions[1])

            let trainingCentrePointToLeftDistance = trainingPointLeftOfCentre.length ? distance(trainingCentrePoint, trainingPointLeftOfCentre) : 0
            let trainingCentrePointToRightDistance = trainingPointRightOfCentre.length ? distance(trainingCentrePoint, trainingPointRightOfCentre) : 0
            let trainingCentrePointToTopDistance = trainingPointTopOfCentre.length ? distance(trainingCentrePoint, trainingPointTopOfCentre) : 0
            let trainingCentrePointToBottomDistance = trainingPointBottomOfCentre.length ? distance(trainingCentrePoint, trainingPointBottomOfCentre) : 0

            let trainingMaxDistance = trainingCentrePointToLeftDistance
            if (trainingCentrePointToRightDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToRightDistance
            if (trainingCentrePointToTopDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToTopDistance
            if (trainingCentrePointToBottomDistance > trainingMaxDistance) trainingMaxDistance = trainingCentrePointToBottomDistance

            if (trainingMaxDistance>0) {
                trainingCentrePointToLeftDistance /= trainingMaxDistance
                trainingCentrePointToRightDistance /= trainingMaxDistance
                trainingCentrePointToTopDistance /= trainingMaxDistance
                trainingCentrePointToBottomDistance /= trainingMaxDistance
            }

            // console.log(trainingCentrePoint,trainingCentrePointToLeftDistance, trainingCentrePointToRightDistance, trainingCentrePointToTopDistance, trainingCentrePointToBottomDistance, 'training ' + key)

            let zeroProbabilityCondition =
                xor(inputCentrePointToLeftDistance===0,trainingCentrePointToLeftDistance===0) //&& inputCentrePointToLeftDistance !== trainingCentrePointToLeftDistance
                || xor(inputCentrePointToRightDistance===0,trainingCentrePointToRightDistance===0) //&& inputCentrePointToRightDistance !== trainingCentrePointToRightDistance
                || xor(inputCentrePointToTopDistance===0,trainingCentrePointToTopDistance===0) //&& inputCentrePointToTopDistance !== trainingCentrePointToTopDistance
                || xor(inputCentrePointToBottomDistance===0,trainingCentrePointToBottomDistance===0) //&& inputCentrePointToBottomDistance !== trainingCentrePointToBottomDistance

            if (zeroProbabilityCondition) {
                probabilities.push({key, value: 0})
                // console.log(key, '0')
            } else {
                let probability = 0
                if (inputCentrePointToLeftDistance===trainingCentrePointToLeftDistance) probability += 1
                else probability += inputCentrePointToLeftDistance > trainingCentrePointToLeftDistance ? trainingCentrePointToLeftDistance / inputCentrePointToLeftDistance : inputCentrePointToLeftDistance / trainingCentrePointToLeftDistance

                if (inputCentrePointToRightDistance===trainingCentrePointToRightDistance) probability += 1
                else probability += inputCentrePointToRightDistance > trainingCentrePointToRightDistance ? trainingCentrePointToRightDistance / inputCentrePointToRightDistance : inputCentrePointToRightDistance / trainingCentrePointToRightDistance

                if (inputCentrePointToTopDistance===trainingCentrePointToTopDistance) probability += 1
                else probability += inputCentrePointToTopDistance > trainingCentrePointToTopDistance ? trainingCentrePointToTopDistance / inputCentrePointToTopDistance : inputCentrePointToTopDistance / trainingCentrePointToTopDistance

                if (inputCentrePointToBottomDistance===trainingCentrePointToBottomDistance) probability += 1
                else probability += inputCentrePointToBottomDistance > trainingCentrePointToBottomDistance ? trainingCentrePointToBottomDistance / inputCentrePointToBottomDistance : inputCentrePointToBottomDistance / trainingCentrePointToBottomDistance

                probabilities.push({key, value: probability/4})
            }
        })
        return [...probabilities]
    },

    pointLeftOfCentre: array => {
        let centrePoint = centreToEdgeDistanceRatioStroke.centrePoint(array)
        let points = array.filter(point => point[0]===centrePoint[0])
        if (!points.length) return []
        let mostLeftPoint = points[0]
        for(let point of points) {
            if (point[1] < mostLeftPoint[1]) mostLeftPoint = point
        }
        if (mostLeftPoint[1] < centrePoint[1]) return [...mostLeftPoint]
        else return []
    },

    pointRightOfCentre: array => {
        let centrePoint = centreToEdgeDistanceRatioStroke.centrePoint(array)
        let points = array.filter(point => point[0]===centrePoint[0])
        if (!points.length) return []
        let mostRightPoint = points[0]
        for(let point of points) {
            if (point[1] > mostRightPoint[1]) mostRightPoint = point
        }
        if (mostRightPoint[1] > centrePoint[1]) return [...mostRightPoint]
        else return []
    },

    pointTopOfCentre: array => {
        let centrePoint = centreToEdgeDistanceRatioStroke.centrePoint(array)
        let points = array.filter(point => point[1]===centrePoint[1])
        if (!points.length) return []
        let mostTopPoint = points[0]
        for(let point of points) {
            if (point[0] < mostTopPoint[0]) mostTopPoint = point
        }
        if (mostTopPoint[0] < centrePoint[0]) return [...mostTopPoint]
        else return []
    },

    pointBottomOfCentre: array => {
        let centrePoint = centreToEdgeDistanceRatioStroke.centrePoint(array)
        let points = array.filter(point => point[1]===centrePoint[1])
        if (!points.length) return []
        let mostBottomPoint = points[0]
        for(let point of points) {
            if (point[0] > mostBottomPoint[0]) mostBottomPoint = point
        }
        if (mostBottomPoint[0] > centrePoint[0]) return [...mostBottomPoint]
        else return []
    },

    centrePoint: array => {
        let topLeft = engine.topLeft(array)
        let topRight = engine.topRight(array)
        let bottomRight = engine.bottomRight(array)
        let bottomLeft = engine.bottomLeft(array)
        return [
            Math.round(topLeft[0] * 0.25 + topRight[0] * 0.25 + bottomLeft[0] * 0.25 + bottomRight[0] * 0.25),
            Math.round(topLeft[1] * 0.25 + topRight[1] * 0.25 + bottomLeft[1] * 0.25 + bottomRight[1] * 0.25)
        ]
    }
}
let row = 25
let column = 60
let inputData = []
let modes = {initial: 1, plotting: 2, searching: 3, done:4}
let mode = modes.initial
let mouseDown = false

const CLEAR_GRAPH_MESSAGE = "Clear Graph First"

document.addEventListener('DOMContentLoaded', async () => {
    plotGraph()
    updateApplicationInfo()
    handleUserEvent()
    await countDown()
})

function handleUserEvent () {
    readCharacterButtonHandler()
    resetButtonHandler()
    menuHandler()
    applicationInfoHandler()
}

function readCharacterButtonHandler () {
    let readCharacterButton = document.querySelector('#read_character_btn')
    let statusMessage = document.querySelector('#status_message')
    readCharacterButton.addEventListener('click', async event => {
        if (mode === modes.initial || mode === modes.done) {
            // console.log(inputData)
            mode = modes.searching
            statusMessage.innerHTML = ''
            statusMessage.insertAdjacentHTML('beforeend', `Searching <i class="fas fa-spinner"></i>`)
            let result =  await engine.read(inputData, row, column)
            statusMessage.innerHTML = "Result: " + result
            showResultPopUp(result)
            mode = modes.done
            // statusMessage.innerHTML = 'Done'
        }

    })
}

function resetButtonHandler () {
    let resetButton = document.querySelector('#reset_btn')
    resetButton.addEventListener('click', async event => {
        if (mode===modes.initial||mode===modes.done){
            let result = document.querySelector('#result')
            let statusMessage = document.querySelector('#status_message')
            statusMessage.innerHTML = ''
            result.style.display = "none"
            resetGraph()
            inputData = []
            mode = modes.initial
        }
    })
}

function menuHandler() {
    let graphBody = document.querySelector('#graph_body')
    graphBody.addEventListener('mousedown', event => {
        event.preventDefault()
        if (mode===modes.initial || mode===mode.done){
            mouseDown = true
            plotActivePoint(event)
        }
    })
    graphBody = document.querySelector('#graph_body')
    graphBody.addEventListener('mouseup', event => {
        if ((mode===modes.initial || mode===mode.done) && mouseDown){
            mouseDown = false
        }
    })
    let nodes = document.querySelector('#graph_body').querySelectorAll('.node')
    for (let node of nodes) {
        node.addEventListener('mouseenter', event => {
            if ((mode===modes.initial || mode===mode.done) && mouseDown){
                plotActivePoint(event)
            }
        })
    }
}

function showResultPopUp(number) {
    let resultHeader = document.querySelector('#result_header')
    let resultBody = document.querySelector('#result_body')

    let result = document.querySelector('#result')
    result.style.display = "flex"
    resultHeader.innerHTML = "Result"
    resultBody.innerHTML = number

    let resultCancelButton = document.querySelector('#result_cancel_btn')
    resultCancelButton.addEventListener('click', event => {
        let result = document.querySelector('#result')
        result.style.display = "none"
        resultHeader.innerHTML = ""
        resultBody.innerHTML = ""
    })
}

function applicationInfoHandler() {
    let applicationInfoButton = document.querySelector('#graph_header').querySelector('#application_info_btn')
    applicationInfoButton.addEventListener('click', event => {
        let applicationInfo = document.querySelector('#application_info')
        applicationInfo.style.display = "flex"
    })
    let applicationInfoCancelButton = document.querySelector('#application_info_cancel_btn')
    applicationInfoCancelButton.addEventListener('click', event => {
        let applicationInfo = document.querySelector('#application_info')
        applicationInfo.style.display = "none"
    })
}

function updateApplicationInfo() {
    let applicationInfoHeader = document.querySelector('#application_info_header')
    let applicationInfoBody = document.querySelector('#application_info_body')
    applicationInfoHeader.innerHTML = "How to use"
    applicationInfoBody.innerHTML = `
        1. App can read decimal digits 0-9. <br>
        2. Multiple digits are allowed. <br>
        3. Gap between each digits should be more than 3 boxes. <br>
        4. Size should be more than half of the height of the graph. <br>
    `
}

async function countDown () {
    await sleep(500)
    for (let number = 9; number>=0; number--){
        let character = trainingData[number].smaller
        character.map(point => {
            point =[ point[0]+5, point[1]+20]
            indicateActivePointsBrick(point)
        })
        await sleep(1000)
        resetGraph()
    }
    let applicationInfoButton = document.querySelector('#graph_header').querySelector('#application_info_btn')
    applicationInfoButton.click()
}

function plotGraph() {
    let graphBody = document.querySelector('#graph_body')
    let nodeSize = Math.floor(graphBody.offsetWidth/column-1)
    for (let i=0; i<row; i++) {
        graphBody.insertAdjacentHTML('beforeend', `<div class="node-row row m-0" id="node_row_${i}" data-row="${i}"></div>`)
        let nodeRow = graphBody.querySelector(`#node_row_${i}`)
        for (let j=0; j<column; j++) {
            nodeRow.insertAdjacentHTML('beforeend', `<div class="node" id="node_${i}_${j}" data-row="${i}" data-column="${j}"></div>`)
            let node = nodeRow.querySelector(`#node_${i}_${j}`)
            node.style.width = nodeSize+"px"
            node.style.height = nodeSize+"px"
            node.style.fontSize = (nodeSize*2/3)+"px"
            if (j===column-1) node.style.borderRight = "#aaa solid 1px"
        }
    }
}

function resetGraph() {
    let graphBody = document.querySelector('#graph_body')
    let nodeSize = Math.floor(graphBody.offsetWidth/column-1)
    for (let i=0; i<row; i++) {
        let nodeRow = graphBody.querySelector(`#node_row_${i}`)
        for (let j=0; j<column; j++) {
            let node = nodeRow.querySelector(`#node_${i}_${j}`)
            node.classList.remove('node-active')
            node.style.width = nodeSize+"px"
            node.style.height = nodeSize+"px"
            node.style.fontSize = (nodeSize*2/3)+"px"
        }
    }
}

function plotActivePoint (event) {
    let point = [
        Number(event.target.getAttribute('data-row')),
        Number(event.target.getAttribute('data-column'))
    ]
    let inActivePoints = resetActivePoints(point)
    // let inActivePoints = inputData.filter(activePoint => activePoint.equals(point)).length
    if (!inActivePoints) {
        inputData.unshift(point)
        indicateActivePointsBrick(point)
    }
}

function resetActivePoints (point) {
    let isBrick = false
    inputData.map((brick, index) => {
        if (point.equals(brick)){
            inputData.splice(index, 1)
            resetActivePointsBrick(point)
            isBrick = true
        }
    })
    return isBrick
}

function indicateActivePointsBrick(point) {
    let node = document
        .querySelector('#graph_body')
        .querySelector(`#node_row_${point[0]}`)
        .querySelector(`#node_${point[0]}_${point[1]}`)
    node.classList.add('node-active')
}

function resetActivePointsBrick(point) {
    let node = document
        .querySelector('#graph_body')
        .querySelector(`#node_row_${point[0]}`)
        .querySelector(`#node_${point[0]}_${point[1]}`)
    node.classList.remove('node-active')
}
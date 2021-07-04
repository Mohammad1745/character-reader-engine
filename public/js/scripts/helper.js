function distance( a, b) {
    return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2)
    // return Math.abs((a[0]-b[0])) + Math.abs((a[1]-b[1]))
}

Array.prototype.equals = function(arr2) {
    return (
        this.length === arr2.length &&
        this.every((value, index) => value === arr2[index])
    )
}

const randomNumber = (min, max, except=null) => {
    let number = Math.round(min+Math.random()*max)
    if (except) {
        while (number===except){
            number = Math.round(min+Math.random()*max)
        }
    }
    return number;
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

const xor = (a, b) => !a && b || a && !b
const xnor = (a, b) => !xor(a,b)
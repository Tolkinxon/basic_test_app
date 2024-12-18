const { v4 } = require('uuid');

let arrayNumber = Array.from({length: 50}, (_, index) => index +1 )
const handleRandomNumber = () => {
    let resultNumber = ''
    for(let i = 0; i<arrayNumber.length; i++){
        resultNumber += arrayNumber[Math.floor(Math.random() * arrayNumber[i])]
    }
    return resultNumber
}
handleRandomNumber()

const createToken = () => {
    let randomNumbers = handleRandomNumber()
    return v4() + Date.now() + randomNumbers
}

module.exports = createToken;
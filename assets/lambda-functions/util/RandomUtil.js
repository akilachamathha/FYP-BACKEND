const randomIntBetween = (minNumber, maxNumber) => {
    let randomInt = 0;
    if(maxNumber !== 0) {
        let difference = maxNumber - minNumber;
        let randomDifference = Math.floor((Math.random() * 10 * maxNumber) % difference);
        randomInt = minNumber + randomDifference
    }
    return randomInt;
}

const randomFloatBetween = (minNumber, maxNumber) => {
    let randomFloat = '0.00';
    if(maxNumber !== 0) {
        let difference = maxNumber - minNumber;
        let randomDifference = (Math.random() * 10 * maxNumber % difference);
        randomFloat = (minNumber + randomDifference).toFixed(2);
    }
    return randomFloat;
}

module.exports = {
    randomIntBetween: randomIntBetween,
    randomFloatBetween: randomFloatBetween
};
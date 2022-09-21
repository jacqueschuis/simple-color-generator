const head = document.querySelector('#title');
const rgb = document.querySelector('#rgb');
const hex = document.querySelector('#hex');
const nav = document.querySelector('nav');
const logo = document.querySelector('#logo');
const trans = document.querySelector('#translate');
const description = document.querySelector('#description');

function makeNewHex() {
    const hexRandomArray = [
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16),
        Math.floor(Math.random() * 16),
    ]

    const hexArray = hexRandomArray.map(function (num) {
        if (num === 10) {
            return 'A'
        } else if (num === 11) {
            return 'B'
        } else if (num === 12) {
            return 'C'
        } else if (num === 13) {
            return 'D'
        } else if (num === 14) {
            return 'E'
        } else if (num === 15) {
            return 'F'
        } else {
            return num
        }
    })

    const hexString = hexArray.join("");

    return `#${hexString}`
}
function makeNewRGB() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return {
        reg: `rgb(${r}, ${g}, ${b})`,
        light: `rgb(${r + 50}, ${g + 50}, ${b + 50})`,
        dark: `rgb(${r - 50}, ${g - 50}, ${b - 50})`
    }
}
function rgbToHex(str) {
    str.trim();
    let rgbVals = str.replace("rgb(", "");
    rgbVals = rgbVals.substring(0, rgbVals.length - 1);
    const valsOnly = rgbVals.split(",")

    const threeVals = valsOnly.map(function (num) {
        return parseInt(num)
    })

    const threeValsHex1 = threeVals.map(function (num) {
        return num.toString(16);
    })

    const threeValsHex = threeValsHex1.map(function (num) {
        return num.padStart(2, '0');
    })

    return (`#${threeValsHex[0]}${threeValsHex[1]}${threeValsHex[2]}`).toUpperCase();

}
function hexToRGB(str) {
    const stepOne = str.split("");
    const stepTwo = stepOne.shift();
    const stepThree = stepOne.map(function (num) {
        if (num === 'A') {
            return 10
        }
        else if (num === 'B') {
            return 11
        }
        else if (num === 'C') {
            return 12
        }
        else if (num === 'D') {
            return 13
        }
        else if (num === 'E') {
            return 14
        }
        else if (num === 'F') {
            return 15
        } else { return parseInt(num) }
    })
    const stepFour = [
        stepThree[0] * 16,
        stepThree[1],
        stepThree[2] * 16,
        stepThree[3],
        stepThree[4] * 16,
        stepThree[5]];

    const stepFive = [
        stepFour[0] + stepFour[1],
        stepFour[2] + stepFour[3],
        stepFour[4] + stepFour[5],
    ]
    return `rgb(${stepFive[0]}, ${stepFive[1]}, ${stepFive[2]})`
}
function setStyles(obj) {
    head.innerText = obj.reg;
    head.style.color = obj.dark;
    document.body.style.backgroundColor = obj.reg;
    logo.style.color = obj.dark;
    nav.style.backgroundColor = obj.light;
    hex.style.backgroundColor = obj.light;
    rgb.style.backgroundColor = obj.light;
    translate.style.backgroundColor = obj.light;
    rgb.style.borderColor = obj.dark;
    hex.style.borderColor = obj.dark;
    translate.style.borderColor = obj.dark;
    rgb.style.color = obj.dark;
    hex.style.color = obj.dark;
    translate.style.color = obj.dark;
}
function hexExpand(str) {
    const stepOne = str.split("");
    const stepTwo = stepOne.shift();
    const stepThree = stepOne.map(function (num) {
        if (num === 'A') {
            return 10
        }
        else if (num === 'B') {
            return 11
        }
        else if (num === 'C') {
            return 12
        }
        else if (num === 'D') {
            return 13
        }
        else if (num === 'E') {
            return 14
        }
        else if (num === 'F') {
            return 15
        } else { return parseInt(num) }
    })
    const stepFour = [
        stepThree[0] * 16,
        stepThree[1],
        stepThree[2] * 16,
        stepThree[3],
        stepThree[4] * 16,
        stepThree[5]];

    const stepFive = [
        stepFour[0] + stepFour[1],
        stepFour[2] + stepFour[3],
        stepFour[4] + stepFour[5],
    ]
    console.log(stepFive)

    const stepSix = stepFive.map(function (num) {
        if (num + 50 > 255) {
            return 255
        }
        return num + 50;
    })

    const stepSeven = stepFive.map(function (num) {
        if (num - 50 < 0) {
            return 0
        }
        return num - 50;
    })

    return {
        reg: str,
        light: `rgb(${stepSix[0]}, ${stepSix[1]}, ${stepSix[2]})`,
        dark: `rgb(${stepSeven[0]}, ${stepSeven[1]}, ${stepSeven[2]})`,
    }

}

rgb.addEventListener('click', function () {
    const newColor = makeNewRGB();
    setStyles(newColor);
    description.remove();
})

hex.addEventListener('click', function () {
    const newHex = makeNewHex();
    const newColor = hexExpand(newHex);
    setStyles(newColor);
    description.remove();
})

trans.addEventListener('click', function () {
    if (head.innerText[0] === '#') {
        const newColor = hexToRGB(head.innerText);
        head.innerText = newColor;
    } else if (head.innerText[0] === 'C') {
        return
    } else {
        const newColor = rgbToHex(head.innerText);
        head.innerText = newColor;
    }
})

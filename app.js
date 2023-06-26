const head = document.querySelector('#title');
const nav = document.querySelector('nav');
const logo = document.querySelector('#logo');
const translate = document.querySelector('#translate');
const header = document.querySelector('.header')
const description = document.querySelector('#description');
const btn = document.querySelector('#new-color')
const baseColor = document.querySelector('#base-color')

const dark = document.querySelector('#dark');
const reg = document.querySelector('#reg');
const light = document.querySelector('#light');
const schemeTitle = document.querySelector('#scheme-title');
const colorInfoDark = document.querySelector('#color-info-dark');
const colorInfoReg = document.querySelector('#color-info-reg');
const colorInfoLight = document.querySelector('#color-info-light');
const titleColumn = document.querySelector('#title-column');
const resultsColumn = document.querySelector('#results-column');
const footerText = document.querySelector('#footer-text');
const footer = document.querySelector('footer');
const colorResults = document.querySelectorAll('.color-result');

const clipboardButton = document.querySelector('#clipboard-button');
const clipboardIcon = document.querySelector('#clipboard-icon');
const showButton = document.querySelector('#show-button');
const showIcon = document.querySelector('#show-icon');
const colorInfos = document.querySelectorAll('.color-info');

let newColor;
let palette;
let visibleResults = 0;

let history = [];

class Color {
    constructor () {
        this.r = Math.floor(Math.random() * 255);
        this.g = Math.floor(Math.random() * 255);
        this.b = Math.floor(Math.random() * 255);
    }
    innerRGB(){
        const {r, g, b} = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb(){
        return `rgb(${this.innerRGB()})`;
    }
    hex(){
        const {r, g, b} =this;
        return (
            ('#' + ((1<<24) + (r << 16) + (g<<8) +b).toString(16).slice(1)).toUpperCase()
        )
    }
    lightObj(x) {
        const {r, g, b} = this;
        return {
            lightR: Math.min(Math.max(r+50*x,0),255),
            lightG: Math.min(Math.max(g+50*x,0),255),
            lightB: Math.min(Math.max(b+50*x,0),255),
        }
    }
    innerLight(x){
        const {lightR, lightG, lightB} = this.lightObj(x);
        return `${lightR}, ${lightG}, ${lightB}`;
    }
    light(x=1){
        return `rgb(${this.innerLight(x)})`; 
    }
    darkObj(x){
        const {r, g, b} = this;
        return {
            darkR: Math.min(Math.max(r-50*x,0),255) ,
            darkG: Math.min(Math.max(g-50*x,0),255),
            darkB: Math.min(Math.max(b-50*x,0),255),
        }
    }
    innerDark(x = 1) {  
        const {darkR, darkG, darkB} = this.darkObj(x);
        return `${darkR}, ${darkG}, ${darkB}`;
    }
    dark(x = 1){
        return `rgb(${this.innerDark(x)})`
    }
    lightHex(x =1){
        const {lightR, lightG, lightB} = this.lightObj(x);
        return (
            ('#' + ((1<<24) + (lightR << 16) + (lightG<<8) +lightB).toString(16).slice(1)).toUpperCase()
        )
    }
    darkHex(x=1){
          const {darkR, darkG, darkB} = this.darkObj(x);
        return (
            ('#' + ((1<<24) + (darkR << 16) + (darkG<<8) +darkB).toString(16).slice(1)).toUpperCase()
        )
    }
}

function setColors(color) {
    // dark
    baseColor.style.color = color.dark();
    header.style.color = color.dark();
    logo.style.color = color.dark();
    btn.style.borderColor = color.dark();
    translate.style.borderColor = color.dark();
    btn.style.color = color.dark();
    translate.style.color = color.dark();
    dark.style.backgroundColor = color.dark();
    colorInfoReg.style.color = color.dark(2);
    colorInfoLight.style.color = color.dark();
    footerText.style.color = color.dark();
    clipboardIcon.style.color = color.dark();
    showIcon.style.color = color.dark();

    // light
    colorInfoDark.style.color = color.light();
    nav.style.backgroundColor = color.light();
    footer.style.backgroundColor = color.light();
    btn.style.backgroundColor = color.light();
    translate.style.backgroundColor = color.light();
    light.style.backgroundColor = color.light();

    // reg
    document.body.style.backgroundColor = color.rgb();
    schemeTitle.style.color = color.rgb();
    reg.style.backgroundColor = color.rgb();
}

function rgbText(color) {
    baseColor.innerText = color.rgb();
    colorInfoDark.innerText = color.dark();
    colorInfoReg.innerText = color.rgb();
    colorInfoLight.innerText = color.light();
}
function hexText(color) {
    baseColor.innerText = color.hex();
    colorInfoDark.innerText = color.darkHex();
    colorInfoReg.innerText = color.hex();
    colorInfoLight.innerText = color.lightHex();
}

btn.addEventListener('click', function () {
    titleColumn.classList.remove('offset-md-3');
    titleColumn.classList.add('align-items-md-end');
    resultsColumn.style.transform = "scale(1)";
    clipboardIcon.classList.remove('bi-clipboard-check');
    clipboardIcon.classList.add('bi-clipboard');
    newColor = new Color;
    palette = `base: ${newColor.rgb()}, light: ${newColor.light()}, dark: ${newColor.dark()}`;
    history.push({
        base: newColor.rgb(),
        light: newColor.light(),
        dark: newColor.dark(),
    })
    setColors(newColor);
    rgbText(newColor);
})

translate.addEventListener('click', function () {
    if (baseColor.innerText[0] === 'r') {
        clipboardIcon.classList.remove('bi-clipboard-check');
        clipboardIcon.classList.add('bi-clipboard');
        palette = `base: ${newColor.hex()}, light: ${newColor.lightHex()}, dark: ${newColor.darkHex()}`;
        return hexText(newColor)
    }
   clipboardIcon.classList.remove('bi-clipboard-check');
   clipboardIcon.classList.add('bi-clipboard');
   palette = `base: ${newColor.rgb()}, light: ${newColor.light()}, dark: ${newColor.dark()}`;
   rgbText(newColor)
})

clipboardButton.addEventListener('click', async function () {
    await navigator.clipboard.writeText(palette);
    colorResults.forEach((result) => {
        const val = result.innerText;
        result.children[0].style.transform = "scale(1)"
        showIcon.classList.remove('bi-eye-slash');
        showIcon.classList.add('bi-eye');
        result.children[0].innerText = 'copied!'
        setTimeout(function(){
            result.children[0].innerText = val
        }, 600)
    })
    clipboardIcon.classList.remove('bi-clipboard');
    clipboardIcon.classList.add('bi-clipboard-check');
})

showButton.addEventListener('click', function () {
    if (showButton.children[0].classList.contains('bi-eye-slash')) {
        visibleResults = 3;
        showIcon.classList.remove('bi-eye-slash');
       return showIcon.classList.add('bi-eye')
    }
    colorInfos.forEach((info) => {
        info.style.transform = 'scale(0)'
    })
    visibleResults = 0;
    showIcon.classList.remove('bi-eye');
    showIcon.classList.add('bi-eye-slash');
})

colorResults.forEach((result) => {
    result.addEventListener('click', (e) => {
        const clip = e.target.innerText;
        clipboardIcon.classList.remove('bi-clipboard-check');
        clipboardIcon.classList.add('bi-clipboard');
        if (e.target.nodeName === "DIV") {
            e.target.children[0].style.transform = "scale(1)";
            if (visibleResults < 3) {
                visibleResults += 1
            }
            e.target.children[0].innerText = 'copied!'
            setTimeout(function () {
                e.target.children[0].innerText = clip
            }, 600)
        } else if (e.target.nodeName === 'H3') {
            e.target.innerText = 'copied!'
            if (visibleResults < 3) {
                visibleResults += 1
            }
            setTimeout(function () {
                e.target.innerText = clip
            }, 600)
        }
        navigator.clipboard.writeText(clip);
    })
})

document.addEventListener('click', function () {
    if (visibleResults === 3) {
        showIcon.classList.remove('bi-eye-slash');
        showIcon.classList.add('bi-eye');
        return colorInfos.forEach((info) => {
            info.style.transform = 'scale(1)';
        })
    }
})

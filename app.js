const head = document.querySelector('#title');
const rgb = document.querySelector('#rgb');
const hex = document.querySelector('#hex');
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

let newColor;

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

    // light
    colorInfoDark.style.color = color.light();
    nav.style.backgroundColor = color.light();
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
    titleColumn.classList.add('col-md-6');
    titleColumn.classList.add('align-items-md-end');
    resultsColumn.classList.remove('d-none');
    resultsColumn.classList.add('col-md-6')
    newColor = new Color;
    setColors(newColor);
    rgbText(newColor);
})

translate.addEventListener('click', function () {
    if (baseColor.innerText[0] === 'r') {
        return hexText(newColor)
    }
   rgbText(newColor)
})
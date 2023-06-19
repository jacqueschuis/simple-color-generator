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

function setRGBStyles(obj) {
    baseColor.innerText = obj.rgb();
    baseColor.style.color = obj.dark();
    header.style.color = obj.dark();
    document.body.style.backgroundColor = obj.rgb();
    logo.style.color = obj.dark();
    nav.style.backgroundColor = obj.light();
    btn.style.backgroundColor = obj.light();
    translate.style.backgroundColor = obj.light();
    btn.style.borderColor = obj.dark();
    translate.style.borderColor = obj.dark();
    btn.style.color = obj.dark();
    translate.style.color = obj.dark();
    schemeTitle.style.color = obj.rgb();
    dark.style.backgroundColor = obj.dark();
    reg.style.backgroundColor = obj.rgb();
    light.style.backgroundColor = obj.light();
    colorInfoDark.innerText = obj.dark();
    colorInfoReg.innerText = obj.rgb();
    colorInfoLight.innerText = obj.light();

}
function setHexStyles(obj) {
    baseColor.innerText = obj.hex();
    colorInfoDark.innerText = obj.darkHex();
    colorInfoReg.innerText = obj.hex();
    colorInfoLight.innerText = obj.lightHex();
}

btn.addEventListener('click', function () {
    newColor = new Color;
    setRGBStyles(newColor);
})

translate.addEventListener('click', function () {
    if (baseColor.innerText[0] === 'r') {
        return setHexStyles(newColor)
    }
   setRGBStyles(newColor)
})
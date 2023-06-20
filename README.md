# Color Generator
![](./screenshot.png)

## [live site](https://simple-color-generator.vercel.app/)

## Table of Contents

- [Overview](#overview)
- [Challenges](#challenges)
    - [UI Redesign](#redesign)
- [Things to Add](#things-to-add)
- [Author](#author)

## Overview

This color generator is the first app that I ever built. As I was following along with Colt Steele's Web Developer Bootcamp, there was a project to build a simple RGB color generator, demonstrating the basic ideas behind DOM manipulation with vanilla JS. I built this alongside him, and then I gave myself the challenge to make this work with Hex colors as well. To simplify the code, I ended up making a class constructor function to handle all things color (which goes deeper than is currently used here). Based on this Color function, I can then easily set the text of the app.

I initially built this in the fall of 2022, but I revisited in summer 2023, rehauling the design of the app to fit with my current style. All of the same functionality is there, but things are (I'd like to think) much clearer now, and the code is simpler and more efficient than it was previously.

I've added a show/hide button, as well as event handlers to show/hide individual color names. I have added integration with the Clipboard API that allows you to copy the entire palette or just individual colors, and I use set timeout functions to show temporary messages when colors are copied. Initially, this was just an exercise in DOM manipulation, but now I would say that it is a self-contained and both functional and usable app for anyone looking to generate a simple monochromatic color palette.

## Challenges

### Redesign

Because I had set the app down for quite a long time, revisiting it was a little tough. I hadn't made my functions very clear, and it took me a good bit of experimenting to find out exactly what I was doing. I changed the functions to rely on a constructor for Colors, and this clarifies things immensely. 

I also am revisiting this after building my portfolio in React and Tailwind, so going to Vanilla JS and Bootstrap again took a second. I had to reference the docs (especially for Bootstrap) very frequently, and eventually, I would like to bring this app into the Tailwind world.

## Things to Add

1. Add features

This app is very simple. You make a 3-stop monochromatic scheme with the click of a button, which definitely serves its purpose, but it is not the comprehensive tool which I would like it to be. I would like to add options for different color schemes (i.e., complementary, tertiary, triadic, etc.)

2. Download scheme

I would like to be able to export the scheme card to an image that the client can download for referencing later.

3. History

I would like there to be some sort of history functionality whereby the app remembers your 5 or so most recent colors, and there's an option to save/pin these using local memory.

4. Transfer the app to a new framework

To deal with the added complexities which I would like to add, I will likely need this to be built on a framework, like React. 

## Author

This website was created from scratch by me, [Jacques Pariseau](https://j-par.com).

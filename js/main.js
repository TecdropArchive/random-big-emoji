"use strict";

import Utils from "/js/utils.js";

(function App() {

    let emojiLoaded = false;
    let emojiData;
    let emojiSection = document.getElementById("emoji-section");
    let emojiWrapper = document.getElementById("emoji-wrapper");
 
    let emojiNameElement = document.getElementById("emoji-name");
    let emojiSizeInput = document.getElementById("emoji-size");
    const colorButtonGroup = document.getElementById("color-button-group");
    const customColorButton = document.getElementById("custom-color-button");
    
    

    function nextRandomEmoji() {
        if (!emojiLoaded) return;

        let index = Utils.getRandomInt(0, emojiData.length);
        emojiWrapper.innerHTML = twemoji.parse(emojiData[index].e, { folder: "svg", ext: ".svg" });
        emojiWrapper.dataset.shortName = emojiData[index].n;
        emojiNameElement.innerText = emojiData[index].n;
    }

    function handleEmojiSizeInput() {
        emojiWrapper.style.maxWidth = emojiWrapper.style.maxHeight = `${emojiSizeInput.value}%`;
    }

    function setNewColor(color, colorButton) {
        emojiSection.style.backgroundColor = color;
        Array.from(colorButtonGroup.children, item => item.classList.remove("apl-color-button--active"));
        colorButton.classList.add("apl-color-button--active");
    }

    function setCustomColor(color) {
        customColorButton.style.backgroundColor = color;
        setNewColor(color, customColorButton);
    }

    function onColorItemClick(event) {
        if (event.target.matches("button")) {
            setNewColor(window.getComputedStyle(event.target).getPropertyValue("background-color"), event.target);
        }
    }

    function onCustomColorInput(event) {
        setCustomColor(event.target.value);
    }

    function onRandomColorButtonClick() {
        setCustomColor(Utils.getRandomColor());
    }

    function initEvents() {
        colorButtonGroup.addEventListener("click", onColorItemClick);
        
        const customColorInput = document.getElementById("custom-color");
        customColorInput.addEventListener("change", onCustomColorInput);

        const randomColorButton = document.getElementById("random-color-button");
        randomColorButton.addEventListener("click", onRandomColorButtonClick);
    }

    fetch("/js/emoji.json")
        .then((response) => response.json())
        .then((data) => {
            emojiData = data;
            emojiLoaded = true;
            nextRandomEmoji();
        });

    emojiWrapper.addEventListener("dblclick", () => nextRandomEmoji());
    emojiSizeInput.addEventListener("input", handleEmojiSizeInput);

    initEvents();

}());

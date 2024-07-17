// ==UserScript==
// @name         Remove Youtube Shorts
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Remove Youtube Shorts
// @author       Stephen Smithwick
// @match        https://m.youtube.com/*
// ==/UserScript==

var removeTimeout;
const target_class = [
    "reel-shelf-content-wrapper",
    "reel-shelf-responsive-layout"
]

function removeShorts() {
    console.log("Removing Shorts");
    for (const clazz of target_class) {
        [...document.querySelectorAll(`.${clazz}`)].forEach(
            (elem) => {elem.remove()}
        )
    }
}
const removeAddedShorts = new MutationObserver((mutationList, observer) => {
    for (const mutation of mutationList) {
        if (
            mutation.type === "childList" 
            && mutation.addedNodes 
            && mutation.target.className.split(" ").some(clazz => target_class.includes(clazz))
        ) { removeShorts(); }
    }
});

removeAddedShorts.observe(document.getElementById("app"), { childList: true, subtree: true });

'use strict';

export default function createElement(elementProperties) {
    const {tag, cls, text} = elementProperties;

    const element = document.createElement(tag);

    if (cls) {
        element.classList.add(cls);
    }

    if (text) {
        element.textContent = text;
    }

    return element;
}
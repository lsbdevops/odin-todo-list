'use strict';

export default function createElement(elementProperties) {
    const {tag, cls, text, attributes} = elementProperties;

    const element = document.createElement(tag);

    if (cls) {
        if (Array.isArray(cls)) {
            cls.forEach((clsItem) => element.classList.add(clsItem));
        }
        else {
            element.classList.add(cls);
        };
    };

    if (text) {
        element.textContent = text;
    }

    if (attributes) {
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        };
    };

    return element;
}
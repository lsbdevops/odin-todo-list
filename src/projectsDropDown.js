'use strict';
import {default as createElement} from './createDOMElement.js';

export default function projectsDropDownMenu(projectsDataRef) {
    const menuHeader = document.querySelector('#projects');
    const menuContainer = document.querySelector('#projects-drop-down');
    const menu = document.querySelector('#project-items');


    const addMenuEvents = () => {
        menuHeader.addEventListener('click', openMenu);   
    };

    const openMenu = () => {
        toggleMenuVisibility();
        addMenuItems();
    };

    const toggleMenuVisibility = () => {
        menuContainer.classList.toggle('visible');
    };

    const addMenuItems = () => {
        // First clear the menu of any items to avoid duplication.
        menu.textContent = '';

        projectsDataRef.forEach((project) => {
            const projectListItem = createElement({'tag': 'li', 'text': `${project.getTitle()}`});

            menu.appendChild(projectListItem);
        });
    };

    return {addMenuEvents};
};





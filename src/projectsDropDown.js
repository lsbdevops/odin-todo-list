'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as ProjectInterface} from './projectInterface.js';

export default function projectsDropDownMenu(projectsData) {
    const projects = projectsData.getProjectsReference();
    const menuHeader = document.querySelector('#projects');
    const menuContainer = document.querySelector('#projects-drop-down');
    const menu = document.querySelector('#project-items');


    const addMenuEvents = () => {
        menuHeader.addEventListener('click', openMenu); 
        closeMenu();  
    };

    const openMenu = () => {
        toggleMenuVisibility();
        addMenuItems();
    };

    const closeMenu = () => {
        document.addEventListener('click', (event) => {
            if ((!menuContainer.contains(event.target)) && (!menuHeader.contains(event.target))) {
                menuContainer.classList.remove('visible');
            };
        });
    };

    const toggleMenuVisibility = () => {
        menuContainer.classList.toggle('visible');
    };

    const addMenuItems = () => {
        // First clear the menu of any items to avoid duplication.
        menu.textContent = '';

        projects.forEach((project) => {
            const projectListItem = createElement({'tag': 'li', 'text': `${project.getTitle()}`});
            addProjectSelectEvent(project, projectListItem);

            menu.appendChild(projectListItem);
        });
    };

    const addProjectSelectEvent = (project, element) => {
        element.addEventListener('click', () => {
            ProjectInterface(projectsData).switchProject(project.getId());
        });
    };

    return {addMenuEvents};
};





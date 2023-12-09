'use strict';
import {default as createProjectSection} from './createProjectSection.js';
import {default as renderSection} from './renderSection.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function sectionInterface(activeProject) {
    const validator = toDoValidator();

    const createSection = (sectionProperties) => {
        // Set the section id to the current length of the project array.
        sectionProperties.id = activeProject.getNumberOfSections();
        const section = createProjectSection(sectionProperties, validator);

        addSectionToMemory(section);

        // Add section to the DOM, and set reference to the section tasks container in the DOM.
        const sectionElementReference = addSectionToDOM(section);
        section.setSectionElement(sectionElementReference.querySelector('.section-tasks'));
    };

    const addSectionToMemory = (section) => {
        activeProject.addSectionToProject(section);
    };

    const addSectionToDOM = (section) => {
        const sectionPageElement = renderSection(section, activeProject);
        document.querySelector('.content').insertBefore(sectionPageElement, document.querySelector('.add-section'));

        return sectionPageElement;
    };

    return {createSection};
};
'use strict';
import {default as createProjectSection} from './createProjectSection.js';
import {default as renderSection} from './renderSection.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function sectionInterface(sectionProperties, project) {
    // Set the section id to the current length of the project array.
    sectionProperties.id = project.getNumberOfSections();
    
    const section = createProjectSection(sectionProperties, toDoValidator());

    // Add section to the project.
    project.addSectionToProject(section);

    // Render the section on the page.
    document.querySelector('.content').insertBefore(renderSection(section), document.querySelector('.add-section'));
}
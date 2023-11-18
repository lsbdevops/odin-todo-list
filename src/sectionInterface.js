'use strict';
import {default as createProjectSection} from './createProjectSection.js';
import {default as renderSection} from './renderSection.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function sectionInterface(sectionProperties) {
    const section = createProjectSection(sectionProperties, toDoValidator());

    // TODO: Add section to the project.

    // Render the section on the page.
    document.querySelector('.content').insertBefore(renderSection(section), document.querySelector('.add-section'));
}
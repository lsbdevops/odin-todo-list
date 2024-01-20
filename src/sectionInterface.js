'use strict';
import {default as createProjectSection} from './createProjectSection.js';
import {default as renderSection} from './renderSection.js';
import {default as toDoValidator} from './toDoValidator.js';
import {saveLocalStorage} from './localStorage.js';

export default function sectionInterface(activeProject) {
    const validator = toDoValidator();

    const projectDataReference = activeProject.getProjectDataReference();

    const createSection = (sectionProperties) => {
        // Set the section id to the current length of the project array.
        sectionProperties.id = activeProject.getNumberOfSections();
        const section = createProjectSection(sectionProperties, validator);

        addSectionToMemory(section);
        addSectionToDOM(section);
    };

    const addSectionToMemory = (section) => {
        activeProject.addSectionToProject(section);
        saveLocalStorage(projectDataReference);
    };

    const addSectionToDOM = (section) => {
        const sectionPageElement = renderSection(section, activeProject).createSectionCard();
        document.querySelector('.content').insertBefore(sectionPageElement, document.querySelector('.add-section'));

        return sectionPageElement;
    };

    const deleteSection = (section) => {
        deleteSectionFromMemory(section);
        deleteSectionFromDOM(section);
        saveLocalStorage(projectDataReference);
    };

    const deleteSectionFromMemory = (section) => {
        activeProject.deleteSectionFromProject(section);
    };

    const deleteSectionFromDOM = (section) => {
        section.getSectionElement().remove();
    };

    const editSectionTitle = (section, newTitle) => {
        editSectionInMemory(section, newTitle);
        editSectionInDOM(section);
        saveLocalStorage(projectDataReference);
    };

    const editSectionInMemory = (section, newTitle) => {
        section.setTitle(newTitle);
    };

    const editSectionInDOM = (section) => {
        const sectionElement = section.getSectionElement();
        sectionElement.querySelector('.section-title>h2').textContent = section.getTitle();
    };

    return {createSection, deleteSection, addSectionToDOM, editSectionTitle};
};
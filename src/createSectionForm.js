'use strict';
import {default as validator} from './toDoValidator.js';
import {default as SectionInterface} from './sectionInterface.js';

export default function sectionForm(activeProject) {
    // Dialog element.
    const dialog = document.querySelector('#create-section-dialog');

    // Button elements.
    const addButton = document.querySelector('#add-section-button');
    const cancelButton = document.querySelector('#cancel-section-dialog');
    const confirmButton = document.querySelector('#confirm-section-dialog');

    // Input fields.
    const titleField = document.querySelector('#section-title');

    // Section interface.
    const sectionInterface = SectionInterface(activeProject);

    // Abort controller.
    const controller = new AbortController();

    const addEvents = () => {
        openForm();
        cancelForm();
        submitForm();
    };

    const removeEvents = () => {
        controller.abort();
    };

    const openForm = () => {
        addButton.addEventListener('click', () => {
            dialog.showModal();
        }, {signal: controller.signal});
    };

    const cancelForm = () => {
        cancelButton.addEventListener('click', () => {
            dialog.close();
        }, {signal: controller.signal});
    };

    const submitForm = () => {
        confirmButton.addEventListener('click', (e) => {
            e.preventDefault();
    
            const title = titleField.value;
    
            if (validator().validateTitle(title)) {
                sectionInterface.createSection({title});
                resetForm();
                dialog.close();
            };
        }, {signal: controller.signal});
    };
    
    const resetForm = () => {
        titleField.value = '';
    };

    return {addEvents, removeEvents};
}

function editSectionForm(activeProject, section) {
    // Dialog element.
    const dialog = document.querySelector('#edit-section-title-dialog');

    // Button elements.
    const cancelButton = document.querySelector('#cancel-edit-section-dialog');
    const confirmButton = document.querySelector('#confirm-edit-section-dialog');

    // Input fields.
    const titleField = document.querySelector('#edit-section-title');

    // Section interface.
    const sectionInterface = SectionInterface(activeProject);

    // Abort controller.
    const controller = new AbortController();

    const addEvents = () => {
        cancelForm();
        submitForm();
    };

    const removeEvents = () => {
        controller.abort();
    };

    const cancelForm = () => {
        cancelButton.addEventListener('click', () => {
            dialog.close();
            removeEvents();
        }, {signal: controller.signal});
    };

    const submitForm = () => {
        confirmButton.addEventListener('click', (e) => {
            e.preventDefault();
    
            const newTitle = titleField.value;
    
            if (validator().validateTitle(newTitle)) {
                sectionInterface.editSectionTitle(section, newTitle);
                dialog.close();
                removeEvents();
            };
        }, {signal: controller.signal});
    };

    dialog.showModal();
    titleField.value = section.getTitle();
    addEvents();
};

export {editSectionForm};
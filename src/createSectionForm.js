'use strict';
import {default as validator} from './toDoValidator.js';
import {default as sectionInterface} from './sectionInterface.js';

export default function sectionForm(activeProject) {
    // Dialog element.
    const dialog = document.querySelector('#create-section-dialog');

    // Button elements.
    const addButton = document.querySelector('#add-section-button');
    const cancelButton = document.querySelector('#cancel-section-dialog');
    const confirmButton = document.querySelector('#confirm-section-dialog');

    // Input fields.
    const titleField = document.querySelector('#section-title');

    const addEvents = () => {
        openForm();
        cancelForm();
        submitForm();
    };

    const openForm = () => {
        addButton.addEventListener('click', () => {
            dialog.showModal();
        });
    };

    const cancelForm = () => {
        cancelButton.addEventListener('click', () => {
            dialog.close();
        });
    };

    const submitForm = () => {
        confirmButton.addEventListener('click', (e) => {
            e.preventDefault();
    
            const title = titleField.value;
    
            if (validator().validateTitle(title)) {
                sectionInterface({title}, activeProject);
                resetForm();
                dialog.close();
            };
        });
    };
    
    const resetForm = () => {
        titleField.value = '';
    };

    return {addEvents};
}


'use strict';
import {default as validator} from './toDoValidator.js';
import {default as sectionInterface} from './sectionInterface.js'

export default function addSectionFormEvents() {
    openAddSectionForm();
    closeAddSectionForm();
    submitAddSectionForm();
}

function openAddSectionForm() {
    // Add event listener to open add section form.
    const addSectionButton = document.querySelector('#add-section-button');
    const addSectionForm = document.querySelector('#create-section-dialog');

    addSectionButton.addEventListener('click', function(e) {
        addSectionForm.showModal();
    });
};

function closeAddSectionForm() {
    // Add event listener to close add section form via cancel button.
    const cancelSectionForm = document.querySelector('#cancel-section-dialog');
    const addSectionForm = document.querySelector('#create-section-dialog');

    cancelSectionForm.addEventListener('click', function(e) {
        addSectionForm.close();
    });
};

function submitAddSectionForm() {
    const confirmSectionForm = document.querySelector('#confirm-section-dialog');
    const addSectionForm = document.querySelector('#create-section-dialog');

    confirmSectionForm.addEventListener('click', function(e) {
        e.preventDefault();

        const title = document.querySelector('#section-title').value;

        if (validator().validateTitle(title)) {
            sectionInterface({title});
            resetAddSectionForm();
            addSectionForm.close();
        }
    })
}

function resetAddSectionForm() {
    document.querySelector('#section-title').value = '';
}



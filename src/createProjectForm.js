'use strict';
import {default as Validator} from './toDoValidator.js';
import {default as ProjectInterface} from './projectInterface.js';

export default function projectForm(projectData) {
    // Dialog element.
    const dialog = document.querySelector('#create-project-dialog');

    // Button elements.
    const createProjectButton = document.querySelector('#new-project');
    const cancelButton = document.querySelector('#cancel-project-dialog');
    const confirmButton = document.querySelector('#confirm-project-dialog');

    const validator = Validator();

    const projectInterface = ProjectInterface(projectData);

    const addEvents = () => {
        openForm();
        closeForm();
        submitForm();
    };

    const openForm = () => {
        createProjectButton.addEventListener('click', () => {
            dialog.showModal();
        });
    };

    const closeForm = () => {
        cancelButton.addEventListener('click', () => {
            dialog.close();
        });
    };

    const submitForm = () => {
        confirmButton.addEventListener('click', (e) => {
            e.preventDefault();

            const title = document.querySelector('#project-title').value;

            if (validator.validateTitle(title)); {
                projectInterface.createNewProject(title);
                dialog.close();                
            };
        });
    };

    return {addEvents};
};
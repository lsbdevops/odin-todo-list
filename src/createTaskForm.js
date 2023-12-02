'use strict';
import {default as validator} from './toDoValidator.js';
import {default as createTask} from './taskInterface.js';
import {default as createElement} from './createDOMElement.js';

export default function taskForm() {
    // Dialog element.
    const dialog = document.querySelector('#create-task-dialog');

    // Button elements.
    const confirmButton = document.querySelector('#confirm-task-dialog');
    const cancelButton = document.querySelector('#cancel-task-dialog');

    // Input field inputs.
    const titleField = document.querySelector('#task-title');
    const dueDateField = document.querySelector('#task-due-date');
    const descriptionField = document.querySelector('#task-description');
    const priorityField = document.querySelector('#task-priority');
    const fields = {titleField, dueDateField, descriptionField, priorityField};

    // Validator function.
    const fieldValidator = validator();

    const addEvents = (activeProject) => {
        closeForm();
        submitForm(activeProject);
    }

    const openForm = (addTaskButton) => {
        // Change the dialog button data to refer to the current section ID to add the task.
        addTaskButton.addEventListener('click', () => {
            confirmButton.setAttribute('data-section-id', `${addTaskButton.dataset.sectionId}`);
            dialog.showModal();
        });
    };

    const closeForm = () => {
        cancelButton.addEventListener('click', () => {
            dialog.close();
        });
    };

    const resetForm = () => {
        for (const [fieldName, fieldElement] of Object.entries(fields)) {
            if (fieldName === 'priorityField') {
                fieldElement.value = 'low';
            }
            else {
                fieldElement.value = '';
            }
        }
    }

    const submitForm = (activeProject) => {
        confirmButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the user input for task from applicable form fields.
            const taskProperties = getFieldValues();

            // If all fields are valid, create the task.
            if (fieldsValid(taskProperties, fieldValidator)) {
                // Get the current section identifier and create the task.
                const currentSectionId = this.dataset.sectionId;
                const currentSection = activeProject.getProjectSection(currentSectionId);
            
                // Use interface to create task.
                createTask(taskProperties, currentSection);
                resetForm();
                dialog.close();
            }
        })
    }

    const getFieldValues = () => {
        const fieldValues = {};

        for (const [fieldName, fieldElement] of Object.entries(fields)) {
            const propertyName = fieldName.replace('Field', '');
            const propertyValue = fieldElement.value;

            fieldValues[propertyName] = propertyValue
        }

        return fieldValues;
    }

    const fieldsValid = (fieldInputs, validatorFunction) => {
        const {title, dueDate, description, priority} = fieldInputs;

        if (!validatorFunction.validateTitle(title)) {
            return false;
        }
    
        if (!validatorFunction.validateDate(dueDate)) {
            return false;
        }
    
        if (!validatorFunction.validateDescription(description)) {
            return false;
        }
    
        if (!validatorFunction.validatePriority(priority)) {
            return false;
        }
    
        return true;
    }

    return {openForm, addEvents};
}

function closeViewTaskDialog() {
    const viewTaskDialog = document.querySelector('#task-view');
    const closeButton = document.querySelector('#close-task-view');

    closeButton.addEventListener('click', function(e) {
        resetViewTaskDialog();
        viewTaskDialog.close();
    })
} 

function resetViewTaskDialog() {
    document.querySelector('#task-view > .task-details').remove();
    const viewTaskContainer = createElement({'tag': 'div', 'cls': 'task-details'});

    document.querySelector('#task-view').insertBefore(viewTaskContainer, document.querySelector('#close-task-view'));
}

export {closeViewTaskDialog};
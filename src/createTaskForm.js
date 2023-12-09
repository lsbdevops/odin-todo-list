'use strict';
import {default as Validator} from './toDoValidator.js';
import {default as TaskInterface} from './taskInterface.js';

export default function taskForm(activeProject) {
    // Dialog element.
    const dialog = document.querySelector('#create-task-dialog');

    // Button elements.
    const confirmButton = document.querySelector('#confirm-task-dialog');
    const cancelButton = document.querySelector('#cancel-task-dialog');

    // Input fields.
    const titleField = document.querySelector('#task-title');
    const dueDateField = document.querySelector('#task-due-date');
    const descriptionField = document.querySelector('#task-description');
    const priorityField = document.querySelector('#task-priority');
    const fields = {titleField, dueDateField, descriptionField, priorityField};

    // Validator function.
    const fieldValidator = Validator();

    // Task interface.
    const taskInterface = TaskInterface(activeProject);

    const addEvents = () => {
        cancelForm();
        submitForm(activeProject);
    };

    const openForm = (addTaskButton, section) => {
        addTaskButton.addEventListener('click', () => {
            activeProject.setActiveSection(section);
            dialog.showModal();
        });
    };

    const cancelForm = () => {
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
            };
        };
    };

    const submitForm = () => {
        confirmButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Get the user input for task from applicable form fields.
            const taskProperties = getFieldValues();

            // If all fields are valid, create the task.
            if (fieldsValid(taskProperties, fieldValidator)) {
                // Use interface to create task.
                taskInterface.createTask(taskProperties, activeProject.getActiveSection());
                resetForm();
                dialog.close();
            };
        });
    };

    const getFieldValues = () => {
        const fieldValues = {};

        for (const [fieldName, fieldElement] of Object.entries(fields)) {
            const propertyName = fieldName.replace('Field', '');
            const propertyValue = fieldElement.value;

            fieldValues[propertyName] = propertyValue;
        };

        return fieldValues;
    };

    const fieldsValid = (fieldInputs, validatorFunction) => {
        const {title, dueDate, description, priority} = fieldInputs;

        if (!validatorFunction.validateTitle(title)) {
            return false;
        };
    
        if (!validatorFunction.validateDate(dueDate)) {
            return false;
        };
    
        if (!validatorFunction.validateDescription(description)) {
            return false;
        };
    
        if (!validatorFunction.validatePriority(priority)) {
            return false;
        };
    
        return true;
    };

    return {openForm, addEvents};
}
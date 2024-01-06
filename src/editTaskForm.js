'use strict';
import {default as taskInterface} from './taskInterface.js';
import {default as validator} from './toDoValidator.js';
import {default as taskViewer} from './taskViewer.js';

export default function editForm(activeProject) {
    // Dialog.
    const dialog = document.querySelector('#task-edit');

    // Edit form buttons.
    const editButton = document.querySelector('#edit-task-view');
    const confirmButton = document.querySelector('#confirm-task-edit');
    const cancelButton = document.querySelector('#cancel-task-edit');

    // Edit task form fields.
    const titleField = document.querySelector('#edit-task-title');
    const dueDateField = document.querySelector('#edit-task-due-date');
    const descriptionField = document.querySelector('#edit-task-description');
    const priorityField = document.querySelector('#edit-task-priority');
    const fields = {titleField, dueDateField, descriptionField, priorityField};

    // Abort controller.
    const controller = new AbortController();

    const addEvents = () => {
        openForm();
        closeForm();
        submitForm();
    };

    const removeEvents = () => {
        controller.abort();
    };

    const openForm = () => {
        editButton.addEventListener('click', () => {
            // Set fields for current task and display in edit form.
            setFormFields(activeProject.getActiveTask());
            dialog.showModal();
        }, {signal: controller.signal});
    };

    const closeForm = () => {
        cancelButton.addEventListener('click', () => {
            dialog.close();
        }, {signal: controller.signal});
    };

    const submitForm = () => {
        confirmButton.addEventListener('click', (e) => {
            e.preventDefault();

            // Get the user input for task from applicable form fields.
            const newTaskProperties = getFieldValues();

            // If all fields are valid, create the task.
            if (fieldsValid(newTaskProperties, validator())) { 
                // Use interface to create task.
                taskInterface(activeProject).editTask(activeProject.getActiveTask(), newTaskProperties);
                
                // Refresh the task viewer dialog.
                taskViewer(activeProject).refreshTaskView();

                dialog.close();
            };
        }, {signal: controller.signal});
    };

    const setFormFields = (task) => {
        for (const [fieldName, fieldElement] of Object.entries(fields)) {
            const getPropertyFuncName = 'get' + fieldName[0].toUpperCase() + fieldName.replace('Field', '').slice(1);
            fieldElement.value = task[getPropertyFuncName]();
        };
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

    return {addEvents, removeEvents};
};
'use strict';
import {default as validator} from './toDoValidator';
import {default as createTask} from './taskInterface';

function openAddTaskForm(sectionAddTaskButton) {
    // Add event listener to open add task form.
    const addTaskForm = document.querySelector('#create-task-dialog');

    sectionAddTaskButton.addEventListener('click', function(e) {
        addTaskForm.showModal();
    });
};

function closeAddTaskForm() {
    // Add event listener to close add task form via cancel button.
    const cancelTaskForm = document.querySelector('#cancel-task-dialog');
    const addTaskForm = document.querySelector('#create-task-dialog');

    cancelTaskForm.addEventListener('click', function(e) {
        addTaskForm.close();
    });
};

function submitAddTaskForm() {
    // Add event listener to submit task form values.
    const confirmTaskForm = document.querySelector('#confirm-task-dialog');
    const addTaskForm = document.querySelector('#create-task-dialog');

    confirmTaskForm.addEventListener('click', function(e) {
        e.preventDefault();

        // Get the user input from applicable form fields.
        const title = document.querySelector('#task-title').value;
        const dueDate = document.querySelector('#task-due-date').value;

        const taskProperties = {title, dueDate};

        // Validate the input.
        if (validateAddTaskForm(taskProperties, validator())) {
            // Use interface to create task.
            createTask(taskProperties);
            addTaskForm.close();
        }
    });
};

function validateAddTaskForm(taskProperties, validator) {
    const {title, dueDate} = taskProperties;

    if (!validator.validateTitle(title)) {
        return false;
    }

    if (!validator.validateDate(dueDate)) {
        return false;
    }

    return true;
}

export {openAddTaskForm, closeAddTaskForm, submitAddTaskForm};

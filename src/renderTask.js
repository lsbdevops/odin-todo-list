'use strict';
import {default as createElement} from './createDOMElement.js';
import deleteIcon from './assets/delete.svg';


export default function renderTask(task, eventListeners) {
    const taskContainer = createElement({'tag': 'div', 'cls': 'task', 'attributes': {'data-task-id': `${task.getId()}`}});
    const taskHeader = createElement({'tag': 'h3', 'text': `${task.getTitle()}`});
    const taskDueDate = createElement({'tag': 'p', 'text': `Due Date: ${task.getDueDate()}`});
    const deleteTaskButton = createElement({'tag': 'button', 'attributes': {'type': 'button'}});

    eventListeners.viewTask(taskContainer, task);

    const deleteTaskIcon = new Image();
    deleteTaskIcon.src = deleteIcon;
    deleteTaskIcon.alt = 'Delete Task Button';
    deleteTaskButton.appendChild(deleteTaskIcon);
    eventListeners.deleteTask(deleteTaskButton, task);

    taskContainer.appendChild(taskHeader);
    taskContainer.appendChild(taskDueDate);
    taskContainer.appendChild(deleteTaskButton);

    return taskContainer;
}

function addTaskEventListeners() {
    const deleteTask = function(button, task) {
        button.addEventListener('click', function(e) {
            // Remove task from section.
            const section = task.getSection();
            section.deleteTaskFromSection(task.getId());

            // Remove task from DOM.
            document.querySelector(`.section[data-section-id="${task.getSectionId()}"] .task[data-task-id="${task.getId()}"]`).remove();

            // Ensure the view task event listener is not triggered.
            e.stopPropagation();
        })
    }

    const viewTask = function(taskContainer, task) {
        taskContainer.addEventListener('click', function(e) {
            const viewTaskContainer = document.querySelector('#task-view > .task-details');

            const taskHeader = createElement({'tag': 'h3', 'text': `${task.getTitle()}`});
            const taskDescription = createElement({'tag': 'p', 'cls': 'description', 'text': `${task.getDescription()}`});
            const taskDueDate = createElement({'tag': 'p', 'text': `Due Date: ${task.getDueDate()}`});
            const taskPriority = createElement({'tag': 'p', 'text': `Priority: ${task.getPriority()}`});

            viewTaskContainer.append(taskHeader, taskDescription, taskDueDate, taskPriority);

            const editButton = createElement({'tag': 'button', 'text': 'Edit', 'attributes': {'type': 'button'}})
            editTask(editButton, task);
            document.querySelector('#task-view').appendChild(editButton);

            document.querySelector('#task-view').showModal();
        })
    }

    const editTask = function(button, task) {
        button.addEventListener('click', function(e) {
            // Open edit task form.
            const editTaskDialog = document.querySelector('#task-edit');
            editTaskDialog.showModal();

            document.querySelector('#edit-task-title').value = task.getTitle();
            document.querySelector('#edit-task-due-date').value = task.getDueDate();
            document.querySelector('#edit-task-description').value = task.getDescription();
            document.querySelector('#edit-task-priority').value = task.getPriority();

            // Submit form details.

            // Update task properties.
        })
    }

    const closeEditTaskDialog = function(button) {
        button.addEventListener('click', function(e) {
            document.querySelector('#task-edit').closeModal();
        })



    }
    return {deleteTask, viewTask};
}

export {addTaskEventListeners};
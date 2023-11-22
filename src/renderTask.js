'use strict';
import {default as createElement} from './createDOMElement.js';
import deleteIcon from './assets/delete.svg';


export default function renderTask(task, eventListeners) {
    const taskContainer = createElement({'tag': 'div', 'cls': 'task', 'attributes': {'data-task-id': `${task.getId()}`}});
    const taskHeader = createElement({'tag': 'h3', 'text': `${task.getTitle()}`});
    const taskDueDate = createElement({'tag': 'p', 'text': `${task.getDueDate()}`});
    const deleteTaskButton = createElement({'tag': 'button', 'attributes': {'type': 'button'}});

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
        })
    }

    return {deleteTask};
}

export {addTaskEventListeners};
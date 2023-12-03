'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as taskViewer} from './taskViewer.js';
import deleteIcon from './assets/delete.svg';

export default function taskCard(task) {
    // Task properties.
    const taskId = task.getId();
    const title = task.getTitle();
    const dueDate = task.getDueDate();

    const createTaskCard = () => {
        const taskElements = createTaskElements();
        const deleteButton = createDeleteButton();
        taskElements.appendChild(deleteButton);

        return taskElements;
    }

    const createTaskContainer = () => {
        const taskContainer = createElement({'tag': 'div', 'cls': 'task', 'attributes': {'data-task-id': `${taskId}`}});
        viewTask(taskContainer);

        return taskContainer;
    };

    const createTaskElements = () => {
        const taskContainer = createTaskContainer();
        const taskHeader = createElement({'tag': 'h3', 'text': `${title}`});
        const taskDueDate = createElement({'tag': 'p', 'text': `Due Date: ${dueDate}`});

        taskContainer.append(taskHeader, taskDueDate);

        return taskContainer;
    };

    const createDeleteButton = () => {
        const deleteButton = createElement({'tag': 'button', 'attributes': {'type': 'button'}});
        deleteButton.appendChild(createDeleteIcon());

        deleteTask(deleteButton, task);

        return deleteButton;
    };

    const createDeleteIcon = () => {
        const deleteTaskIcon = new Image();
        deleteTaskIcon.src = deleteIcon;
        deleteTaskIcon.alt = 'Delete Task Button';

        return deleteTaskIcon;
    };

    const deleteTask = (button, task) => {
        button.addEventListener('click', (e) => {
            // Remove task from section.
            const section = task.getSection();
            section.deleteTaskFromSection(taskId);

            // Remove task from DOM.
            document.querySelector(`.section[data-section-id="${task.getSectionId()}"] .task[data-task-id="${taskId}"]`).remove();

            // Ensure the view task event listener is not triggered.
            e.stopPropagation();
        });
    };

    const viewTask = (container) => {
        container.addEventListener('click', () => {
            taskViewer(task).viewTask();
        });
    };

    return {createTaskCard};
};

function renderTask(task, eventListeners) {
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
    return {deleteTask};
}
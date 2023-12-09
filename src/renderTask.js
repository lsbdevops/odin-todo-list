'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as taskViewer} from './taskViewer.js';
import {default as taskInterface} from './taskInterface.js'
import deleteIcon from './assets/delete.svg';

export default function taskCard(task, activeProject) {
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
        addViewTaskEvent(taskContainer);

        return taskContainer;
    };

    const createTaskElements = () => {
        const taskContainer = createTaskContainer();
        const taskHeader = createElement({'tag': 'h3', 'text': `${title}`, 'cls': 'task-card-title'});
        const taskDueDate = createElement({'tag': 'p', 'text': `Due Date: ${dueDate}`, 'cls': 'task-card-due-date'});

        taskContainer.append(taskHeader, taskDueDate);

        return taskContainer;
    };

    const createDeleteButton = () => {
        const deleteButton = createElement({'tag': 'button', 'attributes': {'type': 'button'}});
        deleteButton.appendChild(createDeleteIcon());

        addDeleteTaskEvent(deleteButton);

        return deleteButton;
    };

    const createDeleteIcon = () => {
        const deleteTaskIcon = new Image();
        deleteTaskIcon.src = deleteIcon;
        deleteTaskIcon.alt = 'Delete Task Button';

        return deleteTaskIcon;
    };

    const addDeleteTaskEvent = (button) => {
        button.addEventListener('click', (e) => {
            taskInterface().deleteTask(task);
            
            // Ensure the view task event listener is not triggered.
            e.stopPropagation();
        });
    };

    const addViewTaskEvent = (container) => {
        container.addEventListener('click', () => {
            taskViewer(activeProject).viewTask(task);
        });
    };

    return {createTaskCard};
};
'use strict';
import {default as createElement} from './createDOMElement.js';

export default function taskViewer(activeProject) {
    // Dialog element.
    const dialog = document.querySelector('#task-view');

    // Task details wrapper.
    const detailsWrapper = document.querySelector('#task-view > .task-details');

    // Button elements.
    const closeButton = document.querySelector('#close-task-view');

    const viewTask = (task) => {
        createTaskElements(task);
        activeProject.setActiveTask(task);

        dialog.showModal();
    };
    
    const closeTask = () => {
        closeButton.addEventListener('click', () => {
            resetDialog();
            dialog.close();
        });
    };

    const refreshTaskView = () => {
        resetDialog();
        viewTask(activeProject.getActiveTask());
    };

    const resetDialog = () => {
        detailsWrapper.replaceChildren();
    };

    const createTaskElements = (task) => {
        const taskHeader = createElement({'tag': 'h3', 'text': `${task.getTitle()}`});
        const taskDescription = createElement({'tag': 'p', 'cls': 'description', 'text': `${task.getDescription()}`});
        const taskDueDate = createElement({'tag': 'p', 'text': `Due Date: ${task.getDueDate()}`});
        const taskPriority = createElement({'tag': 'p', 'text': `Priority: ${task.getPriority()}`});

        detailsWrapper.append(taskHeader, taskDescription, taskDueDate, taskPriority);
    };

    return {viewTask, closeTask, refreshTaskView};
}
'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as taskInterface} from './taskInterface.js';
import {saveLocalStorage} from './localStorage.js';

export default function taskViewer(activeProject) {
    // Dialog element.
    const dialog = document.querySelector('#task-view');

    // Task details wrapper.
    const detailsWrapper = document.querySelector('#task-view > .task-details');

    // Button elements.
    const closeButton = document.querySelector('#close-task-view');
    const checklistButton = document.querySelector('#checklist-task-view')

    // Abort controller.
    const controller = new AbortController();

    const viewTask = (task) => {
        createTaskElements(task);
        activeProject.setActiveTask(task);

        dialog.showModal();
    };
    
    const closeTask = () => {
        closeButton.addEventListener('click', () => {
            resetDialog();
            dialog.close();
        }, {signal: controller.signal});
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
        const taskDueDate = createElement({'tag': 'p', 'text': `Due Date: ${task.getFormattedDueDate()}`});
        const taskPriority = createElement({'tag': 'p', 'text': `Priority: ${task.getPriority()}`});

        detailsWrapper.append(taskHeader, taskDescription, taskDueDate, taskPriority);
    };

    const removeEvents = () => {
        controller.abort();
    };

    const openCheckList = () => {
        checklistButton.addEventListener('click', () => {
            checklist(activeProject).init();
        }, {signal: controller.signal});
    };

    return {viewTask, closeTask, refreshTaskView, removeEvents, openCheckList};
}

function checklist(activeProject) {
    const task = activeProject.getActiveTask();

    // Dialog element.
    const dialog = document.querySelector('#task-checklist');

    // Task details wrapper.
    const detailsWrapper = document.querySelector('#task-checklist > .checklist-details');

    // Button elements.
    const closeButton = document.querySelector('#close-checklist');
    const addTaskButton = document.querySelector('#add-checklist-item');

    // Create item input field.
    const createItemField = document.querySelector('#create-checklist-item');

    // Abort controller.
    const controller = new AbortController();

    const init = () => {
        viewCheckList();
        closeDialog();
        addCheckListItem();
    }

    const viewCheckList = () => {
        createCheckList();
        dialog.showModal();
    };
    
    const closeDialog = () => {
        closeButton.addEventListener('click', () => {
            resetDialog();
            dialog.close();
            removeEvents();
        }, {signal: controller.signal});
    };

    const addCheckListItem = () => {
        addTaskButton.addEventListener('click', () => {
            const descriptionInput = createItemField.value;
            if (descriptionInput) {
                const checklistItemProperties = {'description': descriptionInput, 
                                                 'id': task.getNumberOfCheckListItems()};
                taskInterface(activeProject).createCheckListItem(checklistItemProperties, task);
                resetDialog();
                viewCheckList();
            }
        }, {signal: controller.signal});
    };

    const resetDialog = () => {
        detailsWrapper.replaceChildren();
        createItemField.value = '';
        createItemField.focus();
    };

    const createCheckList = () => {
        task.getCheckListItems().forEach((item) => {
            const checklistItemContainer = createElement({'tag': 'li', 'cls': 'checklist-item-container'});
            const checklistItem = createElement({'tag': 'span', 'text': `${item.getDescription()}`, 'cls': 'checklist-item'});
            const checkbox = createElement({'tag': 'input', 'attributes': {'type': 'checkbox'}});
            if (item.getCompletionStatus()) checkbox.checked = true;

            item.setCheckboxElement(checkbox);
            addCheckboxListener(item, checkbox);

            checklistItemContainer.append(checklistItem, checkbox);
            detailsWrapper.appendChild(checklistItemContainer);
        }, {signal: controller.signal});
    };

    const addCheckboxListener = (checklistItem, checkbox) => {
         checkbox.addEventListener('click', () => {
            checklistItem.changeCompletionStatus();
            saveLocalStorage(activeProject.getProjectDataReference());
         });
    };

    const removeEvents = () => {
        controller.abort();
    };

    return {init};
};
'use strict';
import {default as createElement} from './createDOMElement.js';

export default function renderTask(task) {
    const taskContainer = createElement({'tag': 'div', 'cls': 'task'});
    const taskHeader = createElement({'tag': 'h3', 'text': `${task.getTitle()}`});
    const taskDueDate = createElement({'tag': 'p', 'text': `${task.getDueDate()}`});

    taskContainer.appendChild(taskHeader);
    taskContainer.appendChild(taskDueDate);

    return taskContainer;
}
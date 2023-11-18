'use strict';
import {default as createToDoTask} from './createToDoTask.js';
import {default as renderTask} from './renderTask.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function taskInterface(taskProperties) {
    const task = createToDoTask(taskProperties, toDoValidator());

    // TODO: Add task to the project section.

    // Render the task on the page.
    document.querySelector('.section-tasks').appendChild(renderTask(task));
};
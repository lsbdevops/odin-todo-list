'use strict';
import {default as createToDoTask} from './createToDoTask';
import {default as renderTask} from './renderTask';
import {default as toDoValidator} from './toDoValidator';

export default function taskInterface(taskProperties) {
    const task = createToDoTask(taskProperties, toDoValidator());

    // TODO: Add task to the project section.

    // Render the task on the page.
    document.querySelector('.section-tasks').appendChild(renderTask(task));
};
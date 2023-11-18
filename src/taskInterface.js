'use strict';
import {default as createToDoTask} from './createToDoTask.js';
import {default as renderTask} from './renderTask.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function taskInterface(taskProperties, section) {
    const task = createToDoTask(taskProperties, toDoValidator());

    // Add task to the project section.
    section.addTaskToSection(task);

    // Render the task on the page.
    const sectionTasksContainer = document.querySelector(`.section[data-section-id="${section.getId()}"] > .section-tasks`);
    sectionTasksContainer.appendChild(renderTask(task));
};
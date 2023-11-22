'use strict';
import {default as createToDoTask} from './createToDoTask.js';
import {default as renderTask, addTaskEventListeners} from './renderTask.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function createTask(taskProperties, section) {
    const task = createToDoTask(Object.assign(taskProperties, getTaskIdentifiers(section)), toDoValidator());
    
    // Add task to the project section.
    section.addTaskToSection(task);

    // Render the task on the page.
    const sectionTasksContainer = document.querySelector(`.section[data-section-id="${section.getId()}"] > .section-tasks`);
    sectionTasksContainer.appendChild(renderTask(task, addTaskEventListeners()));
};

function getTaskIdentifiers(section) {
    const taskIdentifiers = {};

    taskIdentifiers.sectionId = section.getId();
    taskIdentifiers.id = section.getNumberOfTasks();
    taskIdentifiers.section = section;

    return taskIdentifiers;
}
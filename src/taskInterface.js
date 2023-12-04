'use strict';
import {default as createToDoTask} from './createToDoTask.js';
import {default as taskCard} from './renderTask.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function taskInterface() {
    // Declare validator.
    const validator = toDoValidator();

    const createTask = (taskProperties, section) => {
        // Create task in memory and add to the current section.
        const taskIdentifiers = getTaskIdentifiers(section);
        const task = createToDoTask(Object.assign(taskProperties, taskIdentifiers), validator);

        addTaskToMemory(task, section);
        addTaskToDOM(task, section);
    };

    const addTaskToMemory = (task, section) => {
        section.addTaskToSection(task);
    };

    const getTaskIdentifiers = (section) => {
        const taskIdentifiers = {};

        taskIdentifiers.sectionId = section.getId();
        taskIdentifiers.id = section.getNumberOfTasks();
        taskIdentifiers.section = section;
    
        return taskIdentifiers;
    };

    const addTaskToDOM = (task, section) => {
        // Get the section tasks container element by section ID number.
        const sectionContainer = document.querySelector(`.section[data-section-id="${section.getId()}"] > .section-tasks`);

        // Create task card and append.
        const card = taskCard(task).createTaskCard();
        sectionContainer.appendChild(card);
    };

    return {createTask};
}
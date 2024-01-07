'use strict';
import {default as createToDoTask} from './createToDoTask.js';
import {default as taskCard} from './renderTask.js';
import {default as toDoValidator} from './toDoValidator.js';
import {saveLocalStorage} from './localStorage.js';

export default function taskInterface(activeProject) {
    // Declare validator.
    const validator = toDoValidator();

    const projectsDataReference = activeProject.getProjectDataReference();

    const createTask = (taskProperties, section) => {
        // Create task in memory and add to the current section.
        const taskIdentifiers = getTaskIdentifiers(section);
        const task = createToDoTask(Object.assign(taskProperties, taskIdentifiers), validator);

        addTaskToMemory(task, section);
        task.setCardElement(addTaskToDOM(task, section));
    };

    const addTaskToMemory = (task, section) => {
        section.addTaskToSection(task);
        saveLocalStorage(projectsDataReference);
    };

    const getTaskIdentifiers = (section) => {
        const taskIdentifiers = {};

        taskIdentifiers.sectionId = section.getId();
        taskIdentifiers.id = section.getNumberOfTasks();
        taskIdentifiers.section = section;
    
        return taskIdentifiers;
    };

    const addTaskToDOM = (task, section) => {
        // Create task card and append.
        const card = taskCard(task, activeProject).createTaskCard();
        section.getSectionTasksElement().appendChild(card);

        // Return a reference to the card element.
        return card;
    };

    const deleteTask = (task) => {
        deleteTaskFromMemory(task);
        deleteTaskFromDOM(task);
    };

    const deleteTaskFromMemory = (task) => {
        const section = task.getSection();
        section.deleteTaskFromSection(task.getId());
        saveLocalStorage(projectsDataReference);
    };

    const deleteTaskFromDOM = (task) => {
        task.getCardElement().remove();
    };

    const editTask = (task, newTaskProperties) => {
        editTaskInMemory(task, newTaskProperties);
        editTaskInDOM(task);
    };

    const editTaskInMemory = (task, newTaskProperties) => {
        for (const [propertyName, propertyValue] of Object.entries(newTaskProperties)) {
            const setFunctionName = 'set' + propertyName[0].toUpperCase() + propertyName.slice(1);
            task[setFunctionName](propertyValue);
        };
        saveLocalStorage(projectsDataReference);
    };

    const editTaskInDOM = (task) => {
        const taskCardEl = task.getCardElement();

        taskCardEl.querySelector('.task-card-title').textContent = task.getTitle();
        taskCardEl.querySelector('.task-card-due-date').textContent = 'Due Date: ' + task.getFormattedDueDate();

        // Create new priority tab and replace the current tab.
        const priorityIndicator = taskCard(task).createPriorityIndicator();
        const taskToolbar = taskCardEl.querySelector('.task-toolbar');
        taskCardEl.querySelector('.priority-indicator').remove();
        taskToolbar.prepend(priorityIndicator);
    };

    const updateCompletionStatus = (task) => {
        task.changeCompletionStatus();
        saveLocalStorage(projectsDataReference);
    };

    return {createTask, deleteTask, editTask, addTaskToDOM, updateCompletionStatus};
}
'use strict';
import {default as createToDoTask} from './createToDoTask.js';
import {default as taskCard} from './renderTask.js';
import {default as toDoValidator} from './toDoValidator.js';

export default function taskInterface(activeProject) {
    // Declare validator.
    const validator = toDoValidator();

    const createTask = (taskProperties, section) => {
        // Create task in memory and add to the current section.
        const taskIdentifiers = getTaskIdentifiers(section);
        const task = createToDoTask(Object.assign(taskProperties, taskIdentifiers), validator);

        addTaskToMemory(task, section);
        task.setCardElement(addTaskToDOM(task, section));
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
        // Create task card and append.
        const card = taskCard(task, activeProject).createTaskCard();
        section.getSectionElement().appendChild(card);

        // Return a reference to the card element.
        return card;
    };

    const deleteTask = (task) => {
        deleteTaskFromMemory(task);
        deleteTaskFromDOM(task);
    }

    const deleteTaskFromMemory = (task) => {
        const section = task.getSection();
        section.deleteTaskFromSection(task.getId());
    }

    const deleteTaskFromDOM = (task) => {
        task.getCardElement().remove();
    }

    const editTask = (task, newTaskProperties) => {
        editTaskInMemory(task, newTaskProperties);
        editTaskInDOM(task, newTaskProperties);
    };

    const editTaskInMemory = (task, newTaskProperties) => {
        for (const [propertyName, propertyValue] of Object.entries(newTaskProperties)) {
            const setFunctionName = 'set' + propertyName[0].toUpperCase() + propertyName.slice(1);
            task[setFunctionName](propertyValue);
        };
    };

    const editTaskInDOM = (task, newTaskProperties) => {
        const taskCard = task.getCardElement();

        taskCard.querySelector('.task-card-title').textContent = newTaskProperties.title;
        taskCard.querySelector('.task-card-due-date').textContent = 'Due date: ' + newTaskProperties.dueDate;
    };

    const addAllSectionTasksToDOM = (section) => {
        for (let taskId = 0; taskId < section.getNumberOfTasks(); taskId++) {
            const task = section.getTask(taskId);

            if (task) {
                addTaskToDOM(section.getTask(taskId), section);
            };
            
        };
    };

    return {createTask, deleteTask, editTask};
}
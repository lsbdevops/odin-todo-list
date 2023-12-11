'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as taskForm} from './createTaskForm.js';
import addTaskIcon from './assets/plus-box.svg';

export default function sectionCard(section, activeProject) {
    const openAddTaskForm = (button) => taskForm(activeProject).openForm(button, section);
    const title = section.getTitle();

    const createSectionCard = () => {
        const sectionContainer = createElement({'tag': 'div', 'cls': 'section'});
        const tasksContainer = createElement({'tag': 'div', 'cls': 'section-tasks'});
        const titleBar = createTitleBar();

        sectionContainer.append(titleBar, tasksContainer);

        return sectionContainer
    };

    const createTitleBar = () => {
        const titleContainer = createElement({'tag': 'div', 'cls': 'section-title'});
        const titleElement = createElement({'tag': 'h2', 'text': `${title}`});
        const addTaskButton = createAddTaskButton();

        titleContainer.append(titleElement, addTaskButton);

        return titleContainer;
    };

    const createAddTaskButton = () => {
        const addTaskButton = createElement({'tag': 'button'})

        const addTask = new Image();
        addTask.src = addTaskIcon;
        addTask.alt = 'Add Task Button';

        addTaskButton.appendChild(addTask);
        openAddTaskForm(addTaskButton);

        return addTaskButton;
    };

    return {createSectionCard};
};
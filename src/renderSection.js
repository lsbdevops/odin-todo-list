'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as taskForm} from './createTaskForm.js';
import {default as sectionInterface} from './sectionInterface.js';
import addTaskIcon from './assets/plus-box.svg';
import deleteSectionIcon from './assets/delete-section.svg';

export default function sectionCard(section, activeProject) {
    const openAddTaskForm = (button) => taskForm(activeProject).openForm(button, section);
    const deleteSectionFunc = () => sectionInterface(activeProject).deleteSection(section);
    const title = section.getTitle();

    const createSectionCard = () => {
        const sectionContainer = createElement({'tag': 'div', 'cls': 'section'});
        const tasksContainer = createElement({'tag': 'div', 'cls': 'section-tasks'});
        const titleBar = createTitleBar();

        sectionContainer.append(titleBar, tasksContainer);
        section.setSectionElement(sectionContainer);

        addDeleteSectionEvent(sectionContainer);

        return sectionContainer;
    };

    const createTitleBar = () => {
        const titleContainer = createElement({'tag': 'div', 'cls': 'section-title'});
        const titleElement = createElement({'tag': 'h2', 'text': `${title}`});
        const addTaskButton = createAddTaskButton();
        const deleteSectionButton = createDeleteSectionButton();

        titleContainer.append(titleElement, addTaskButton, deleteSectionButton);

        return titleContainer;
    };

    const createAddTaskButton = () => {
        const addTaskButton = createElement({'tag': 'button'});

        const addTask = new Image();
        addTask.src = addTaskIcon;
        addTask.alt = 'Add Task Button';

        addTaskButton.appendChild(addTask);
        openAddTaskForm(addTaskButton);

        return addTaskButton;
    };

    const createDeleteSectionButton = () => {
        const deleteSectionButton = createElement({'tag': 'button', 'cls': 'delete-section-button'});

        const deleteSection = new Image();
        deleteSection.src = deleteSectionIcon;
        deleteSection.alt = 'Delete Section Button';

        deleteSectionButton.append(deleteSection);

        return deleteSectionButton;
    };

    const addDeleteSectionEvent = (container) => {
        const deleteSectionButton = container.querySelector('.delete-section-button');

        deleteSectionButton.addEventListener('click', deleteSectionFunc);
    };

    return {createSectionCard};
};
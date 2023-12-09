'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as taskForm} from './createTaskForm.js';
import addTaskIcon from './assets/plus-box.svg';

export default function renderSection(section, activeProject) {
    const sectionContainer = createElement({'tag': 'div', 'cls': 'section'});
    const sectionTitleContainer = createElement({'tag': 'div', 'cls': 'section-title'});
    const sectionTasksContainer = createElement({'tag': 'div', 'cls': 'section-tasks'});
    const sectionTitle = createElement({'tag': 'h2', 'text': `${section.getTitle()}`});
    const addTaskButton = createElement({'tag': 'button'})

    const addTask = new Image();
    addTask.src = addTaskIcon;
    addTask.alt = 'Add Task Button';

    addTaskButton.appendChild(addTask);
    taskForm(activeProject).openForm(addTaskButton, section);

    sectionTitleContainer.appendChild(sectionTitle);
    sectionTitleContainer.appendChild(addTaskButton);

    sectionContainer.appendChild(sectionTitleContainer);
    sectionContainer.appendChild(sectionTasksContainer);

    return sectionContainer;
}
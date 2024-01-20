'use strict';
import {default as createElement} from './createDOMElement.js';
import {default as taskForm} from './createTaskForm.js';
import {default as sectionInterface} from './sectionInterface.js';
import {default as dropDownMenu} from './createDropDownMenu.js';
import {editSectionForm} from './createSectionForm.js';
import addTaskIcon from './assets/plus-box.svg';
import deleteSectionIcon from './assets/delete-section.svg';
import editSectionTitleIcon from './assets/edit-title.svg'

export default function sectionCard(section, activeProject) {
    const openAddTaskForm = (button) => taskForm(activeProject).openForm(button, section);
    const deleteSectionFunc = () => sectionInterface(activeProject).deleteSection(section);
    const editTitleFunc = () => editSectionForm(activeProject, section);
    const title = section.getTitle();

    const createSectionCard = () => {
        const sectionContainer = createElement({'tag': 'div', 'cls': 'section'});
        const tasksContainer = createElement({'tag': 'div', 'cls': 'section-tasks'});
        const titleBar = createTitleBar();

        sectionContainer.append(titleBar, tasksContainer);
        section.setSectionElement(sectionContainer);

        addDeleteSectionEvent(sectionContainer);
        addEditTitleEvent(sectionContainer);

        return sectionContainer;
    };

    const createTitleBar = () => {
        const titleContainer = createElement({'tag': 'div', 'cls': 'section-title'});
        const titleElement = createElement({'tag': 'h2', 'text': `${title}`});
        const buttonContainer = createElement({'tag': 'div', 'cls': 'button-container'});
        const addTaskButton = createAddTaskButton();
        const dropDownMenu = createDropDownMenu();

        buttonContainer.append(addTaskButton, dropDownMenu);
        titleContainer.append(titleElement, buttonContainer);

        return titleContainer;
    };

    const createAddTaskButton = () => {
        const addTaskButton = createElement({'tag': 'button', 'cls': 'add-task-button'});

        const addTask = new Image();
        addTask.src = addTaskIcon;
        addTask.alt = 'Add Task Button';

        addTaskButton.appendChild(addTask);
        openAddTaskForm(addTaskButton);

        return addTaskButton;
    };

    const addDeleteSectionEvent = (container) => {
        const listNode = container.querySelector('.section-button.delete-section').parentElement;

        listNode.addEventListener('click', deleteSectionFunc);
    };

    const addEditTitleEvent = (container) => {
        const listNode = container.querySelector('.section-button.edit-title').parentElement;

        listNode.addEventListener('click', editTitleFunc);
    };

    const createButton = (type, icon) => {
        const button = createElement({'tag': 'button', 'cls': ['section-button', type]});

        const buttonIcon = new Image();
        buttonIcon.src = icon;
        buttonIcon.alt = `${type} button`;

        button.append(buttonIcon);

        return button;
    };

    const createDropDownMenu = () => {
        const dropDownItems = {'Delete Section': ['delete-section', deleteSectionIcon], 
                               'Edit Section Title': ['edit-title', editSectionTitleIcon]};

        const menuObject = dropDownMenu(Object.keys(dropDownItems));
        const menu = menuObject.createMenu();

        // Create icons.
        for (const [desc, domDetails] of Object.entries(dropDownItems)) {
            const node = menuObject.getListItemNode(desc);
            node.prepend(createButton(domDetails[0], domDetails[1]))
        };

        return menu;
    };

    return {createSectionCard};
};
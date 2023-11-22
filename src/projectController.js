'use strict';
import {default as createProject} from './createProject.js';
import {default as createSection} from './sectionInterface.js';
import {default as addSectionFormEvents} from './createSectionForm.js';
import {default as addTaskFormEvents, closeViewTaskDialog} from './createTaskForm.js';

export default function init() {
    const projectData = projects();

    projectData.addProject(createNewProject({'title': 'My First Project'}));
}

function projects() {
    const projects = [];
    let activeProject = 0;

    const addProject = (project) => {
        setActiveProject(projects.length);
        projects.push(project);
    }

    const getActiveProject = () => projects[activeProject];

    const setActiveProject = (projectId) => {
        activeProject = projectId;
    }

    return {
        addProject,
        getActiveProject,
        setActiveProject,
    }
};

function createNewProject(projectProperties) {
    const project = createProject(projectProperties);

    // Create a default section & initial event listeners for the dialog forms for adding sections & tasks.
    createSection({'title': 'To Do'}, project);
    addSectionFormEvents(project);
    addTaskFormEvents(project);
    closeViewTaskDialog();

    return project;
}
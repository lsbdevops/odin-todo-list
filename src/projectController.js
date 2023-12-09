'use strict';
import {default as createProject} from './createProject.js';
import {default as createSection} from './sectionInterface.js';
import {default as formController} from './formController.js';

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
    formController(project).addFormEvents();

    return project;
}
'use strict';
import {default as createProjectStorage} from './createProjectStorage.js';
import {default as ProjectInterface} from './projectInterface.js';
import {default as projectForm} from './createProjectForm.js';

export default function init() {
    // Check if local storage already exists.
    // TODO: Import local storage

    // If not, initialise a first project by default.
    const projectData = createProjectStorage();
    const projectInterface = ProjectInterface(projectData);

    projectForm(projectData).addEvents();

    projectInterface.createNewProject('My First Project');
    document.querySelector('#active-project-title').textContent = projectData.getActiveProject().getTitle();
};
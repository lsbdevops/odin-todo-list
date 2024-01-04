'use strict';
import {default as createProjectStorage} from './createProjectStorage.js';
import {default as ProjectInterface} from './projectInterface.js';
import {default as projectForm} from './createProjectForm.js';
import {default as projectsDropDownMenu} from './projectsDropDown.js';
import {storageAvailable, importLocalStorage} from './localStorage.js';

export default function init() {
    if (storageAvailable('localStorage')) {
        let projectData;
        // Check if local storage already exists.
        if (localStorage.getItem('projectData')) {
            projectData = importLocalStorage();
            ProjectInterface(projectData).renderProject(projectData.getActiveProject());
        }
        else {
            // If not, initialise a first project by default.
            projectData = createProjectStorage();
            const projectInterface = ProjectInterface(projectData);

            projectInterface.createNewProject('My First Project');
            document.querySelector('#active-project-title').textContent = projectData.getActiveProject().getTitle();

            localStorage.setItem('projectData', JSON.stringify(projectData.exportProjectsData()));
        };
        projectForm(projectData).addEvents();
        projectsDropDownMenu(projectData).addMenuEvents();
    };
};
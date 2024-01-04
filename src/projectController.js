'use strict';
import {default as createProjectStorage} from './createProjectStorage.js';
import {default as ProjectInterface} from './projectInterface.js';
import {default as projectForm} from './createProjectForm.js';
import {default as projectsDropDownMenu} from './projectsDropDown.js';
import {storageAvailable, importLocalStorage, saveLocalStorage} from './localStorage.js';

export default function init() {
    if (storageAvailable('localStorage')) {
        let projectsData;
        // Check if local storage already exists.
        if (localStorage.getItem('projectsData')) {
            projectsData = importLocalStorage();
            ProjectInterface(projectsData).renderProject(projectsData.getActiveProject());
        }
        else {
            // If not, initialise a first project by default.
            projectsData = createProjectStorage();
            const projectInterface = ProjectInterface(projectsData);

            projectInterface.createNewProject('My First Project');
            document.querySelector('#active-project-title').textContent = projectsData.getActiveProject().getTitle();

            saveLocalStorage(projectsData);
        };
        projectForm(projectsData).addEvents();
        projectsDropDownMenu(projectsData).addMenuEvents();
    };
};
'use strict';

import './style.css';
import {default as createProjectSection} from './createProjectSection.js';
import {default as toDoValidator} from './toDoValidator.js';
import {default as createProject} from './createProject.js';
import {default as addTaskFormEvents} from './createTaskForm.js';
import {default as addSectionFormEvents} from './createSectionForm.js';

const projects = [];
const myProject = createProject({'title': 'myProject'});
projects.push(myProject);

let activeProject = myProject;

const sectionButton = document.querySelector('.section-title > button');

addTaskFormEvents(sectionButton, activeProject);
addSectionFormEvents(activeProject);







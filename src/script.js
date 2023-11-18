'use strict';

import './style.css';
import {default as createProjectSection} from './createProjectSection.js';
import {default as createProject} from './createProject.js';
import {default as addTaskFormEvents} from './createTaskForm.js';
import {default as addSectionFormEvents} from './createSectionForm.js';

const sectionButton = document.querySelector('.section-title > button');

addTaskFormEvents(sectionButton);
addSectionFormEvents();







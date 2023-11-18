'use strict';

import './style.css';
import {default as createProjectSection} from './createProjectSection.js';
import {default as createProject} from './createProject.js';
import {openAddTaskForm, closeAddTaskForm, submitAddTaskForm} from './createTaskForm';

const sectionButton = document.querySelector('.section-title > button');

openAddTaskForm(sectionButton);
closeAddTaskForm();
submitAddTaskForm();





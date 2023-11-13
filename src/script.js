'use strict';

import './style.css';
import {default as createToDoTask} from './createToDoTask.js';
import {default as createProjectSection} from './createProjectSection.js';
import {default as createProject} from './createProject.js';
import {default as toDoValidator} from './toDoValidator.js';

const validator = toDoValidator();
const projects = [];

const project = createProject({'title': 'My First Project'});

const section = createProjectSection({'title': 'To Do'});

project.addSectionToProject(section);
project.getProjectSections();


'use strict';

import './style.css';
import {default as createToDoTask} from './createToDoTask.js';
import {default as toDoValidator} from './toDoValidator.js';


const validator = toDoValidator();
const shopping = createToDoTask({'title': 'Shopping List',}, validator);

console.log(shopping.getTitle());

shopping.setTitle('Shopping List for Today');

console.log(shopping.getTitle());

shopping.setTitle('Shopping List for Today and Tomorrow');

console.log(shopping.getTitle());;



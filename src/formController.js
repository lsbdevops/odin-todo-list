'use strict';
import {default as SectionForm} from './createSectionForm.js';
import {default as TaskForm} from './createTaskForm.js';
import {default as TaskViewer} from './taskViewer.js';
import {default as EditForm} from './editTaskForm.js';

export default function formController(activeProject) {
    const sectionForm = SectionForm(activeProject);
    const taskForm = TaskForm(activeProject);
    const taskViewer = TaskViewer(activeProject);
    const editForm = EditForm(activeProject);

    const addFormEvents = () => {
        sectionForm.addEvents();
        taskForm.addEvents();
        taskForm.resetForm();
        taskViewer.closeTask();
        editForm.addEvents();
    };

    return {addFormEvents};
}
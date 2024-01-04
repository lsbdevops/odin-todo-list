'use strict';
import {default as createProjectStorage} from './createProjectStorage.js';
import {default as createProject} from './createProject.js';
import {default as createSection} from './createProjectSection.js';
import createToDoTask, {default as createTask} from './createToDoTask.js';
import {default as validator} from './toDoValidator.js';

// Check storage is available, code from: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        // everything except Firefox
        (e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === "QuotaExceededError" ||
          // Firefox
          e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

function importLocalStorage() {
  const storedProjectsData = JSON.parse(localStorage.getItem('projectData'));

  const projectsData = createProjectStorage();

  storedProjectsData.forEach((projectData) => {
    //Create project if a title is present.
    if (projectData.title) {
      const project = createProject(projectData.title, projectsData, validator());
      if (projectData.data) {
        //Create all sections.
        projectData.data.forEach((sectionData) => {
          const section = createSection(sectionData, validator());
          //Create all tasks and append to section.
          if (sectionData.data) {
            sectionData.data.forEach((taskData) => {
            const task = createToDoTask((taskData, validator()));
            section.addTaskToSection(task);
            });
          };
          //Append section to project.
          project.addSectionToProject(section);
        });
      };
      //Append project to the projectsData array.
      projectsData.addProject(project);
    }; 
  });
  return projectsData;
};

export {storageAvailable, importLocalStorage}
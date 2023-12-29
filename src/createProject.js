'use strict';

export default function createProject(projectProperties, projectDataReference, validator) {
    const project = [];
    let {title} = projectProperties;
    const id = projectDataReference.getProjectsReference().length;
    let activeTask = null;
    let activeSection = null;

    const getTitle = () => title;
    const setTitle = (newTitle) => {
        if (validator.validateTitle(newTitle)) {
            title = newTitle;
        };
    }
    
    const addSectionToProject = (projectSection) => {
        project.push(projectSection);
    };

    const getProjectSections = () => {
        project.forEach((section) => {
            console.log(section.getTitle());
        })
    };

    const deleteSectionFromProject = (projectSection) => {
        project[projectSection.getId()] = null;
    };

    const getProjectSection = (sectionId) => project[sectionId];

    const getNumberOfSections = () => project.length;

    const getActiveTask = () => activeTask;
    const setActiveTask = (task) => activeTask = task;
    const getActiveSection = () => activeSection;
    const setActiveSection = (section) => activeSection = section;

    const getProjectDataReference = () => projectDataReference;

    const getId = () => id;

    return {getTitle,
        setTitle,
        addSectionToProject,
        deleteSectionFromProject,
        getProjectSections,
        getProjectSection,
        getNumberOfSections,
        getActiveTask,
        setActiveTask,
        getActiveSection,
        setActiveSection,
        getProjectDataReference,
        getId,
    };
};
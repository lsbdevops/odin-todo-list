'use strict';

export default function createProject(projectProperties, validator) {
    const project = [];
    let {title} = projectProperties;
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
    }

    const getProjectSection = (sectionId) => project[sectionId];

    const getNumberOfSections = () => project.length;

    const getActiveTask = () => activeTask;
    const setActiveTask = (task) => activeTask = task;
    const getActiveSection = () => activeSection;
    const setActiveSection = (section) => activeSection = section;

    return {getTitle,
        setTitle,
        addSectionToProject,
        getProjectSections,
        getProjectSection,
        getNumberOfSections,
        getActiveTask,
        setActiveTask,
        getActiveSection,
        setActiveSection,
    };
};
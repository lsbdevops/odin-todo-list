'use strict';

export default function createProject(title, projectDataReference, validator) {
    const project = [];
    const id = projectDataReference.getNumberOfProjects();
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

    const getAllSections = () => {
        const sections = [];
        project.forEach((section) => {
            if (section) {
                sections.push(section);
            };
        });

        return sections;
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

    const exportData = () => {
        const projectData = [];
        project.forEach((section) => {
            if (section) {
                projectData.push(section.exportData());
            };
        });

        return {title, 'data': projectData};
    };

    return {getTitle,
        setTitle,
        addSectionToProject,
        deleteSectionFromProject,
        getAllSections,
        getProjectSection,
        getNumberOfSections,
        getActiveTask,
        setActiveTask,
        getActiveSection,
        setActiveSection,
        getProjectDataReference,
        getId,
        exportData,
    };
};
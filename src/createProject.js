'use strict';

export default function createProject(projectProperties, validator) {
    const project = [];
    let {title} = projectProperties;

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

    return {getTitle,
        setTitle,
        addSectionToProject,
        getProjectSections,
    };
};
'use strict';

export default function createProjectStorage() {
    const projects = [];
    let activeProject = 0;

    const addProject = (project) => {
        projects.push(project);
    }

    const getActiveProject = () => projects[activeProject];

    const setActiveProject = (projectId) => {
        activeProject = projectId;
    };

    const getProjectsReference = () => projects;

    const getNumberOfProjects = () => projects.length;

    return {
        addProject,
        getActiveProject,
        setActiveProject,
        getProjectsReference,
        getNumberOfProjects,
    };
};
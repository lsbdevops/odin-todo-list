'use strict';

export default function createProjectStorage() {
    const projects = [];
    let activeProject = 0;

    const addProject = (project) => {
        projects.push(project);
    };

    const getActiveProject = () => projects[activeProject];

    const setActiveProject = (projectId) => {
        activeProject = projectId;
    };

    const getProjectsReference = () => projects;

    const getNumberOfProjects = () => projects.length;

    const exportProjectsData = () => {
        const projectsData = {'activeProjectId': activeProject, 'data': []};
        
        projects.forEach((project) => {
            if (project) {
                projectsData.data.push(project.exportData());
            }
            else {
                projectsData.data.push(null);
            }
        });

        return projectsData;
    };


    return {
        addProject,
        getActiveProject,
        setActiveProject,
        getProjectsReference,
        getNumberOfProjects,
        exportProjectsData,
    };
};
'use strict';

export default function createProjectSection(sectionProperties, validator) {
    let section = [];
    let {title, id} = sectionProperties;
    let sectionElement = null;

    const getTitle = () => title;
    const setTitle = (newTitle) => {
        if (validator.validateTitle(newTitle)) {
            title = newTitle;
        };
    }

    const getId = () => id;
    const setId = (newId) => {
        id = newId;
    }

    const getSectionElement = () => sectionElement;
    const setSectionElement = (sectionReference) => sectionElement = sectionReference; 

    const getSectionTasksElement = () => sectionElement.querySelector('.section-tasks');
    
    const addTaskToSection = (task) => {
        section.push(task);
    };

    const deleteTaskFromSection = (taskId) => {
        section[taskId] = null;
    };

    const getNumberOfTasks = () => section.length;

    const getAllTasks = () => {
        const tasks = []
        section.forEach((task) => {
            if (task) {
                task.setId(tasks.length);
                tasks.push(task);
            };
        });

        return tasks;
    };

    const getTask = (taskId) => section[taskId];

    const exportData = () => {
        const sectionData = [];

        section.forEach((task) => {
            if (task) {
                sectionData.push(task.exportData());
            }
            else {
                sectionData.push(null);
            };
        });

        return {title, id, 'data': sectionData};
    };

    const cleanSectionData = () => {
        section = getAllTasks();
    };

    const sortTasksBy = (sortBy) => {
        cleanSectionData();

        switch(sortBy) {
            case 'title':
                section.sort((a, b) => {
                    return a.getTitle().localeCompare(b.getTitle());
                });
                break;
        };
    };

    return {getTitle, 
        setTitle,   
        getId,
        setId,
        getSectionElement,
        setSectionElement,
        getSectionTasksElement,
        addTaskToSection, 
        deleteTaskFromSection,
        getNumberOfTasks,
        getAllTasks,
        getTask,
        exportData,
        sortTasksBy,
    };
};
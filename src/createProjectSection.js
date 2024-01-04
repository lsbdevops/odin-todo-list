'use strict';

export default function createProjectSection(sectionProperties, validator) {
    const section = [];
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
    }

    const getNumberOfTasks = () => section.length;

    const getAllTasks = () => {
        const tasks = []
        section.forEach((task) => {
            if (task) {
                tasks.push(task);
            };
        });

        return tasks;
    };

    const getTask = (taskId) => section[taskId];

    const exportData = () => {
        const sectionData = [];

        section.forEach((task) => {
            sectionData.push(task.exportData());
        });

        return {title, id, 'data': sectionData};
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
    };
};
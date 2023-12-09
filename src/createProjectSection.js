'use strict';

export default function createProjectSection(sectionProperties, validator) {
    const section = [];
    let {title, id} = sectionProperties;

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
    
    const addTaskToSection = (task) => {
        section.push(task);
    };

    const deleteTaskFromSection = (taskId) => {
        section[taskId] = null;
    }

    const getNumberOfTasks = () => section.length;

    const getAllTasks = () => {
        section.forEach((task) => {
            if (task) {
                console.log(task.getTitle())
            }
        });
    };

    const getTask = (taskId) => section[taskId];

    return {getTitle, 
        setTitle,   
        getId,
        setId,
        addTaskToSection, 
        deleteTaskFromSection,
        getNumberOfTasks,
        getAllTasks,
        getTask,
    };
};
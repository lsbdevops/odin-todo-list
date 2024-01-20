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
        let sortFunction;

        switch(sortBy) {
            case 'title':
                sortFunction = (a, b) => a.getTitle().localeCompare(b.getTitle());
                break;
            case 'priority':
                sortFunction = (a, b) => {
                    const aPriority = a.getPriority();
                    const bPriority = b.getPriority();

                    if (aPriority == bPriority) return 0;
                    if (aPriority === 'high') return -1;
                    if ((aPriority === 'medium') && (bPriority !== 'high')) return -1;
                    return 1;
                };
                break;
            case 'dueDate':
                sortFunction = (a, b) => {
                    const aDate = a.getDueDate();
                    const bDate = b.getDueDate();

                    if (aDate > bDate) return 1;
                    if (aDate < bDate) return -1;
                    return 0;
                }
                break;
            case 'completionStatus':

                break;
        };

        section.sort(sortFunction);
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
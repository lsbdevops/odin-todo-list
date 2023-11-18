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

    return {getTitle, 
        setTitle,   
        getId,
        setId,
        addTaskToSection, 
    };
};
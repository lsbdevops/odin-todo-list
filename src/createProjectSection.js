'use strict';

export default function createProjectSection(sectionProperties, validator) {
    const section = [];
    let {title} = sectionProperties;

    const getTitle = () => title;
    const setTitle = (newTitle) => {
        if (validator.validateTitle(newTitle)) {
            title = newTitle;
        };
    }
    
    const addTaskToSection = (task) => {
        section.push(task);
    };

    return {getTitle, 
        setTitle,   
        addTaskToSection, 
    };
};
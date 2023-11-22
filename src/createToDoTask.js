'use strict';

export default function createToDoTask(toDoProperties, validator) {
    // Deconstruct parameters.
    let {title, description, dueDate, priority, id, sectionId, section} = toDoProperties;

    // Getter methods.
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;
    const getId = () => id;
    const getSectionId = () => sectionId;
    const getSection = () => section;

    // Setter methods.
    const setDescription = (newDescription) => {
        if (validator.validateDescription(newDescription)) {
            description = newDescription;
        };
    };
    const setTitle = (newTitle) => {
        if (validator.validateTitle(newTitle)) {
            title = newTitle;
        };
    };
    const setDueDate = (newDueDate) => {
        if (validator.validateDate(newDueDate)) {
            dueDate = newDueDate;
        }; 
    };
    const setPriority = (newPriority) => {
        if (validator.validatePriority(newPriority)) {
            priority = newPriority;
        };
    };
    const setId = (newId) => {
        id = newId;
    };
    const setSectionId = (newSectionId) => {
        sectionId = newSectionId;
    };
    
    return {getTitle, 
        getDescription, 
        getDueDate, 
        getPriority, 
        getId,
        getSectionId,
        getSection,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setId,
        setSectionId,
    };
};



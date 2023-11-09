'use strict';

export default function createToDoTask(toDoProperties, validator) {
    // Deconstruct parameters.
    let {title, description, dueDate, priority} = toDoProperties;

    // Getter methods.
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;

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
    
    return {getTitle, 
        getDescription, 
        getDueDate, 
        getPriority, 
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
    };
};



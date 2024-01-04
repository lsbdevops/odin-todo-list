import {format} from 'date-fns';
'use strict';

export default function createToDoTask(toDoProperties, validator) {
    // Deconstruct parameters.
    let {title, description, dueDate, priority, id, sectionId, section} = toDoProperties;
    let cardElement = null;
    let taskCompleted = false;

    // Getter methods.
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getFormattedDueDate = () => {
        // Return 'dd/MM/yy' formatted date.
        const dateArray = dueDate.split('-');
        // Zero index the month element.
        dateArray[1] -= 1;
        const formattedDate = format(new Date(...dateArray), 'dd/MM/yy');

        return formattedDate;
    };
    const getPriority = () => priority;
    const getId = () => id;
    const getSectionId = () => sectionId;
    const getSection = () => section;
    const getCardElement = () => cardElement;
    const getCompletionStatus = () => taskCompleted;

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
    const setCardElement = (cardReference) => {
        cardElement = cardReference;
    }
    const changeCompletionStatus = () => {
        taskCompleted = (taskCompleted) ? false : true;
    };
    const exportData = () => {
        return {title, description, dueDate, priority, id, sectionId};
    };
    
    return {getTitle, 
        getDescription, 
        getDueDate,
        getFormattedDueDate, 
        getPriority, 
        getId,
        getSectionId,
        getSection,
        getCardElement,
        setTitle,
        setDescription,
        setDueDate,
        setPriority,
        setId,
        setSectionId,
        setCardElement,
        changeCompletionStatus, 
        getCompletionStatus,
        exportData,
    };
};



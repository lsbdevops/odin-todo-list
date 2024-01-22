'use strict';

export default function checklistItem(itemProperties) {
    let {description, id} = itemProperties;
    let completionStatus = itemProperties.completionStatus || false; 
    let checkboxElement = null;

    const getDescription = () => description;
    const getCompletionStatus = () => completionStatus;
    const getId = () => id;
    const getCheckboxElement = () => checkboxElement;

    const setDescription = (newDescription) => description = newDescription;
    const changeCompletionStatus = () => completionStatus = !completionStatus;
    const setId = (newId) => id = newId;
    const setCheckboxElement = (newcheckboxElement) => checkboxElement = newcheckboxElement;

    return {
        getDescription,
        getCompletionStatus,
        getId,
        getCheckboxElement,
        setDescription,
        changeCompletionStatus,
        setId,
        setCheckboxElement,
    };
};
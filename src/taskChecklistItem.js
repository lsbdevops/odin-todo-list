'use strict';

export default function checkListItem(itemProperties) {
    let {description, id} = itemProperties;
    let completionStatus = itemProperties.completionStatus || false; 

    const getDescription = () => description;
    const getCompletionStatus = () => completionStatus;
    const getId = () => id;

    const setDescription = (newDescription) => description = newDescription;
    const changeCompletionStatus = () => completionStatus = !completionStatus;
    const setId = (newId) => id;

    return {
        getDescription,
        getCompletionStatus,
        getId,
        setDescription,
        changeCompletionStatus,
        setId,
    }
}
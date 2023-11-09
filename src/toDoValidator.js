'use strict';

export default function toDoValidator() {
    const MAX_TITLE_LENGTH = 25;

    const validateTitle = (title) => {
        if (title.length > MAX_TITLE_LENGTH) {
            return false;
        }

        return true;
    }

    const validateDescription = (description) => {
        return true;
    }

    const validateDate = (date) => {
        return true;
    }

    const validatePriority = (priority) => {
        return true;
    }
    
    return {validateTitle, validateDescription, validateDate, validatePriority};
}
export default function createToDoTask(toDoProperties) {
    // Deconstruct parameters.
    let {title, description, dueDate, priority} = toDoProperties;

    // Getter methods.
    const getTitle = () => title;
    const getDescription = () => description;
    const getDueDate = () => dueDate;
    const getPriority = () => priority;

    // Setter methods.
    const setDescription = (newDescription) => {
        description = newDescription;
    };
    const setTitle = (newTitle) => {
        title = newTitle;
    };
    const setDueDate = (newDueDate) => {
        dueDate = newDueDate;
    };
    const setPriority = (newPriority) => {
        priority = newPriority;
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



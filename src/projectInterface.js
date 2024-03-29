'use strict';
import {default as createProject} from './createProject.js';
import {default as sectionInterface} from './sectionInterface.js';
import {default as taskInterface} from './taskInterface.js';
import {default as formController} from './formController.js';
import {default as createElement} from './createDOMElement.js';
import {saveLocalStorage} from './localStorage.js';
import addSectionIcon from './assets/card-plus.svg';

export default function projectInterface(projectDataReference) {

    const createNewProject = (projectProperties) => {
        const project = createProject(projectProperties, projectDataReference);
        projectDataReference.addProject(project);

        // If the created project is not the first project created, switch to the new project.
        if (projectDataReference.getNumberOfProjects() > 1) {
            switchProject(project.getId());
        }
        else { 
            // Create a default section & initial event listeners for the dialog forms for adding sections & tasks. 
            sectionInterface(project).createSection({'title': 'To Do'});

            project.formController = formController(project);
            project.formController.addFormEvents();
        };

        saveLocalStorage(projectDataReference);
    };

    const switchProject = (projectId) => {
        // If there is already a project in the DOM, remove the current project from DOM.
        projectDataReference.getActiveProject().formController.removeFormEvents();
        document.querySelector('.content').remove();

        // Set new active project.
        projectDataReference.setActiveProject(projectId);
        const newActiveProject = projectDataReference.getActiveProject();
        saveLocalStorage(projectDataReference);

        // Re-insert default DOM content container and elements.
        const contentContainer = createElement({'tag': 'div', 'cls': 'content'});
        document.body.insertBefore(contentContainer, document.querySelector('footer'));
        contentContainer.appendChild(createAddSection());

        // Render project sections and tasks to the DOM.
        renderProject(newActiveProject);
    };

    const renderProject = (project) => {
        // Set title on page.
        document.querySelector('#active-project-title').textContent = project.getTitle();

        // Create eventlisteners.
        project.formController = formController(project);
        project.formController.addFormEvents();

        // Render the new project in the DOM.
        project.getAllSections().forEach((section) => {
            sectionInterface(project).addSectionToDOM(section);

            section.getAllTasks().forEach((task) => {
                const newTaskCard = taskInterface(project).addTaskToDOM(task, section);
                task.setCardElement(newTaskCard); 
            });
        });
    };

    const createAddSection = () => {
        const container = createElement({'tag': 'div', 'cls': 'add-section'});
        const text = createElement({'tag': 'h2', 'text': 'Add New Section'});
        const button = createElement({'tag': 'button', 'attr': {'type': 'button'}});
        const image = new Image();
        image.src = addSectionIcon;
        image.id = 'add-section-button';
        image.alt = 'Add Section Button';

        button.appendChild(image);
        container.append(text, button);

        return container;
    }

    return {createNewProject, switchProject, renderProject};
};
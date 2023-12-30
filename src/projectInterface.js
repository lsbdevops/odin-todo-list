'use strict';
import {default as createProject} from './createProject.js';
import {default as sectionInterface} from './sectionInterface.js';
import {default as formController} from './formController.js';
import {default as createElement} from './createDOMElement.js';
import addSectionIcon from './assets/card-plus.svg';

export default function projectInterface(projectDataReference) {

    const createNewProject = (projectProperties) => {
        const project = createProject(projectProperties, projectDataReference);
        projectDataReference.addProject(project);

        // If the created project is not the first project created, switch to the new project.
        if (projectDataReference.getNumberOfProjects() > 1) {
            switchProject(project.getId());
        };
    
        // Create a default section & initial event listeners for the dialog forms for adding sections & tasks. 
        sectionInterface(project).createSection({'title': 'To Do'});

        project.formController = formController(project);
        project.formController.addFormEvents();
    };

    const switchProject = (projectId) => {
        projectDataReference.getActiveProject().formController.removeFormEvents();
        projectDataReference.setActiveProject(projectId);

        // Render the new project in the DOM.
        document.querySelector('.content').remove();
        const contentContainer = createElement({'tag': 'div', 'cls': 'content'});
        document.body.insertBefore(contentContainer, document.querySelector('footer'));
        contentContainer.appendChild(createAddSection());
        document.querySelector('#active-project-title').textContent = projectDataReference.getActiveProject().getTitle();
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

    return {createNewProject};
};
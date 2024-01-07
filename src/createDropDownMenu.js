'use strict';
import {default as createElement} from './createDOMElement';
import MenuIcon from './assets/menu.svg';

export default function dropDownMenu(menuItems) {
    if (!menuItems) {
        throw new Error('No menu item/s passed as argument');
    };

    const menuItemNodes = {};
    let menuListNodeReference = null;

    const createMenu = () => {
        const container = createElement({'tag': 'div', 'cls': 'relative-position-container'});
        const button = createMenuButton();
        const menu = createDropDownElements();

        addEvents(button, menu);
    
        container.append(button, menu);

        return container;
    };

    const createMenuButton = () => {
        const menuButton = createElement({'tag': 'button', 
        'cls': 'menu-button', 
        'attributes': {'type': 'button'}});

        const menuIcon = new Image();
        menuIcon.src = MenuIcon;
        menuIcon.alt = 'Hamburger-style Menu Icon';

        menuButton.appendChild(menuIcon);

        return menuButton;
    };

    const createDropDownElements = () => {
        const menuContainer = createElement({'tag': 'div', 'cls': 'menu-container'});

        const list = createList();
        menuListNodeReference = list;
        menuContainer.appendChild(list);

        return menuContainer;
    };

    const createList = () => {
        const listContainer = createElement({'tag': 'ul', 'cls': 'menu-items'});

        // For multiple list items (provided as an array).
        if (Array.isArray(menuItems)) {
            menuItems.forEach((itemTitle) => {
                const menuItem = createListItem(itemTitle);
                listContainer.appendChild(menuItem);
                menuItemNodes[itemTitle] = menuItem;
            });
        }
        // For a single list item (provided as a single string).
        else {
            const menuItem = createListItem(menuItems);
            listContainer.appendChild(menuItem);
        };
        return listContainer;
    };
    
    const createListItem = (listItemTitle) => {
        if (typeof listItemTitle === 'string') {
            const listItemContainer =  createElement({'tag': 'li', 'cls': 'menu-item'});
            const listItemText = createElement({'tag': 'span', 'text': listItemTitle});
            listItemContainer.appendChild(listItemText);

            return listItemContainer;
        }
        else {
            throw new Error('List item is not a string!');
        };
    };

    const getListItemNode = (itemTitle) => menuItemNodes[itemTitle];

    const getListNode = () => menuListNodeReference;

    const addEvents = (menuButton, menu) => {
        toggleMenu(menuButton, menu);
        closeMenu(menuButton, menu);
    };

    const toggleMenu = (menuButton, menu) => {
        menuButton.addEventListener('click', () => {
            menu.classList.toggle('visible');
        });
    };

    const closeMenu = (menuButton, menu) => {
        document.addEventListener('click', (event) => {
            if ((!menuButton.contains(event.target)) && (!menu.contains(event.target))) {
                menu.classList.remove('visible');
            };
        });
    };

    return {createMenu, getListItemNode, getListNode};
};
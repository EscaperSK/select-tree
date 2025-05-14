/**
 * @param {Element[]} elements
 * @param {Item[]} items
 */
function createElements(elements, items) {
    elements.length = 0;

    /**
     * @param {Item} item
     */
    function onItemClick(item) {
        if (item.selected !== true) {
            selectOption(items, item.id);
        } else {
            deselectOption(items, item.id);
        }
        updateElements(elements, items);
    };

    for (const item of items) {
        elements.push(createElement(item, onItemClick));
    }

    const body = document.querySelector('body');
    if (body === null) return;

    body.replaceChildren(...elements);
}

/**
 * @param {Element[]} elements
 * @param {Item[]} items
 */
function updateElements(elements, items) {
    /**
     * @param {Element} element
     * @param {Item} item
     */
    function updateCheckbox(element, item) {
        const checkbox = element.querySelector('input');
        if (checkbox === null) return;

        if (item.selected === 0.5) {
            checkbox.checked = true;
            checkbox.indeterminate = true;
        } else {
            checkbox.checked = item.selected;
            checkbox.indeterminate = false;
        }
    }

    for (const element of elements) {
        const id = element.getAttribute('data-item');
        if (id === null) continue;

        const item = findById(items, +id);
        if (item) {
            updateCheckbox(element, item);
        }

        updateElements([...element.children], items);
    }
}

/**
 * @param {Item} item
 * @param {(item: Item) => void} onItemClick
 */
function createElement(item, onItemClick) {
    const element = document.createElement('div');
    element.setAttribute('data-item', `${item.id}`);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    if (item.selected === 0.5) {
        checkbox.checked = true;
        checkbox.indeterminate = true;
    } else {
        checkbox.checked = item.selected;
        checkbox.indeterminate = false;
    }

    checkbox.addEventListener('click', function () {
        onItemClick(item);
    });

    const label = document.createElement('label');
    label.replaceChildren(checkbox, `${item.id}`);

    const children = [];

    for (const child of item.children) {
        const childElement = createElement(child, onItemClick);
        childElement.style.marginLeft = '10px';

        children.push(childElement);
    }

    element.replaceChildren(label, ...children);

    return element;
}

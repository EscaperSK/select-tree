class Item {
    /** @type {number} */
    id;
    /** @type {string} */
    option;
    /** @type {boolean|0.5} */
    selected;
    /** @type {Item[]} */
    children;

    /**
     * @param {number} id
     * @param {string} option
     * @param {boolean} selected defaults to `false`
     * @param {Item[]} children defaults to `[]`
     */
    constructor(id, option, selected = false, children = []) {
        this.id = id;
        this.option = option;
        this.selected = selected;
        this.children = children;
    }

    /**
     * @param {Item[]} items
     */
    addChildren(...items) {
        this.children.push(...items);
    }

    log() {
        console.log([this.id, this.selected]);
    }
}

/**
 * @param {Item[]} items
 * @param {number} id
 * 
 * @returns {?Item}
 */
function findById(items, id) {
    for (const item of items) {
        if (item.id === id) return item;

        const result = findById(item.children, id);
        if (result) return result;
    }

    return null;
}

/**
 * @template T
 * 
 * @param {Item[]} items
 * @param {(item: Item) => T} action
 */
function walkTree(items, action) {
    for (const item of items) {
        action(item);
        walkTree(item.children, action);
    }
}

/**
 * @param {Item[]} items
 * @param {number} id
 */
function selectOption(items, id) {
    /**
     * @param {Item[]} items
     * @param {(item: Item) => boolean} check
     */
    function walk(items, check) {
        for (const item of items) {
            if (check(item)) {
                item.selected = true;
                walkTree(item.children, (item) => item.selected = true);
                return true;
            }

            if (walk(item.children, check)) {
                item.selected = item.children.every(child => child.selected === true) ? true : 0.5;
                return true;
            }
        }

        return false;
    }

    walk(items, (item) => item.id === id);
}

/**
 * @param {Item[]} items
 * @param {number} id
 */
function deselectOption(items, id) {
    /**
     * @param {Item[]} items
     * @param {(item: Item) => boolean} check
     */
    function walk(items, check) {
        for (const item of items) {
            if (check(item)) {
                item.selected = false;
                walkTree(item.children, (item) => item.selected = false);
                return true;
            }

            if (walk(item.children, check)) {
                item.selected = item.children.every(child => child.selected === false) ? false : 0.5;
                return true;
            }
        }

        return false;
    }

    walk(items, (item) => item.id === id);
}

/**
 * @param {Item[]} items
 */
function logItems(items) {
    walkTree(items, (item) => item.log());
}

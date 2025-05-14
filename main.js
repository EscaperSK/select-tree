const items = [new Item(1, 'first'), new Item(2, 'second'), new Item(3, 'third')];

items[0].addChildren(new Item(11, 'first-first'), new Item(12, 'first-second'), new Item(13, 'first-third'));
items[1].addChildren(new Item(21, 'second-first'), new Item(22, 'second-second'), new Item(23, 'second-third'));
items[2].addChildren(new Item(31, 'third-first'), new Item(32, 'third-second'), new Item(33, 'third-third'));

items[1].children[0].addChildren(new Item(211, 'second-first-first'), new Item(212, 'second-first-second'), new Item(213, 'second-first-third'));

selectOption(items, 211);
selectOption(items, 3);

/**
 * @type {HTMLDivElement[]}
 */
const elements = [];

createElements(elements, items);

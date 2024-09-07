export function createElement(type, classNames, attributes = {}) {
    const element = document.createElement(type);
    if (classNames) {
        element.classList.add(...classNames.split(' '));
    }
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}

export function createTextElement(tag, classList, text) {
    const element = createElement(tag, classList);
    element.innerHTML = text;
    return element;
}

export function addTextContent(element, text) {
    element.textContent = text;
    return element;
}

export function createList(technologies) {
    const list = document.createElement("ul");
    list.classList.add("list-group", "list-group-flush", "p-0");
    technologies.forEach(technology => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        list.appendChild(addTextContent(createElement("li", "list-group-item"), technology));
    });
    return list;
}

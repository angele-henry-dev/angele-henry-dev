import skills from '/model/skills.json' with { type: 'json' };
import projects from '/model/projects.json' with { type: 'json' };
import experience from '/model/experience.json' with { type: 'json' };

generateSkills(skills);
generateExperience(experience);
generateProjects(projects);

function createElement(type, classNames, attributes = {}) {
    const element = document.createElement(type);
    if (classNames) {
        element.classList.add(...classNames.split(' '));
    }
    Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
    return element;
}

function createTextElement(tag, classList, text) {
    const element = createElement(tag, classList);
    element.innerHTML = text;
    return element;
}

function addTextContent(element, text) {
    element.textContent = text;
    return element;
}

function createList(technologies) {
    const list = document.createElement("ul");
    list.classList.add("list-group", "list-group-flush", "p-0");
    technologies.forEach(technology => {
        const item = document.createElement("li");
        item.classList.add("list-group-item");
        list.appendChild(addTextContent(createElement("li", "list-group-item"), technology));
    });
    return list;
}

function generateSkills(skills) {
    const skillsElement = document.querySelector("#skills");
    skills.forEach(skill => {
        const cardItem = createElement("div", "card-custom rounded mb-3 mx-1");
        
        const cardEntete = createElement("div", "card-entete");
        cardEntete.appendChild(createElement("div", "black-cover"));
        cardEntete.appendChild(createElement("img", null, {"src": skill.imagePath, "alt": skill.title}));

        const titleDiv = createElement("div", "p-3");
        titleDiv.appendChild(createTextElement("h2", "h5", skill.title));
        titleDiv.appendChild(createTextElement("span", "small", skill.subtitle));
        cardEntete.appendChild(titleDiv);

        const cardContent = createElement("div", "card-content p-3");
        cardContent.appendChild(createTextElement("h6", null, skill.technologiesTitle));
        cardContent.appendChild(createList(skill.technologies));

        cardItem.appendChild(cardEntete);
        cardItem.appendChild(cardContent);
        skillsElement.appendChild(cardItem);
    });
}

function generateExperience(experience) {
    const experienceElement = document.querySelector("#experience");
    experience.forEach(exp => {
        const flipCard = createElement("div", "flip-card mb-3");
        const flipCardInner = createElement("div", "flip-card-inner");
        const flipCardFront = createCardSide(exp, true);
        const hoverMe = createElement("div", "hover-me fixed-bottom");
        flipCardFront.appendChild(hoverMe);
        const flipCardBack = createCardSide(exp, false);

        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        experienceElement.appendChild(flipCard);
    });

    function createCardSide(exp, isFront) {
        const side = createElement("div", `flip-card-${isFront ? 'front' : 'back'} card-custom rounded`);
        const cardHeader = createElement("div", "card-entete");
        cardHeader.appendChild(createElement("div", "black-cover"));
        cardHeader.appendChild(createElement("img", null, {src: exp.imagePath, alt: exp.what}));
        const textContainer = createElement("div", "p-3");
        textContainer.appendChild(addTextContent(createElement("h2", "h5"), exp.what));
        if (isFront) {
            textContainer.appendChild(createTextElement("span", "small", `<i class="fa fa-clock-o me-2"></i>${exp.when}`));
        } else {
            textContainer.appendChild(createTextElement("span", "small", `<i class="fa fa-regular fa-floppy-disk me-2"></i>${exp.technologiesTitle}`));
        }
        cardHeader.appendChild(textContainer);
        side.appendChild(cardHeader);
        if (isFront) {
            const cardContent = createElement("div", "card-content p-3");
            exp.descriptions.forEach(description => {
                cardContent.appendChild(addTextContent(createElement("p", "mt-2"), description));
            });
            side.appendChild(cardContent);
        } else {
            const technologiesContainer = createElement("div", "card-content p-4 row text-center");
            technologiesContainer.appendChild(createList(exp.technologies));
            side.appendChild(technologiesContainer);
        }
        return side;
    }
}

function generateProjects(projects) {
    const projectsElement = document.querySelector("#projects");
    const carouselContainer = createElement("div", "carousel-custom-container");
    const carouselItems = createElement("div", "carousel-custom-items");
    const carouselSummary = createElement("div", "carousel-custom-summary card-custom rounded p-4");
    const carouselSummaryArea = createElement("div", "summary-area");
    const carouselSummaryUpperPart = createElement("div", "upper-part");
    carouselSummaryUpperPart.appendChild(carouselSummaryArea);
    carouselSummary.appendChild(carouselSummaryUpperPart);

    for (let i=0; i<projects.length; i++) {
        const input = createElement("input", null, {"type": "radio", "name": "slider", "id": `item-${i}`, "checked": i === 10 ? 'true' : 'false'});
        carouselContainer.appendChild(input);

        const cardItem = createElement("label", "carousel-custom-item", {"for": `item-${i}`, "id": `project-${i}`});
        cardItem.appendChild(createElement("img", null, {"src": projects[i].imagePath, "alt": projects[i].title, "height": "400px"}));
        carouselItems.appendChild(cardItem);

        const summaryItem = createElement("div", "project-info", {"id": `project-info-${i}`});
        summaryItem.appendChild(createTextElement("h2", "h5", `<i class="fa-solid ${projects[i].icon}"></i> ${projects[i].title}`));
        summaryItem.appendChild(createTextElement("span", "subtitle", projects[i].subtitle));
        projects[i].descriptions.forEach(description => {
            summaryItem.appendChild(addTextContent(createElement("p", null), description));
        });
        summaryItem.appendChild(createTextElement("p", "small", `<span>${projects[i].technologies.join(' &#8226; ')}</span>`));
        carouselSummaryArea.appendChild(summaryItem);
    }
    carouselContainer.appendChild(carouselItems);
    carouselContainer.appendChild(carouselSummary);
    projectsElement.appendChild(carouselContainer);
}

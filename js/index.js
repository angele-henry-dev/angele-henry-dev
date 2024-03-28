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
    list.classList.add("list-group", "list-group-flush");
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
        titleDiv.appendChild(createTextElement("span", "small text-gray", skill.subtitle));
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
            textContainer.appendChild(createTextElement("span", "small text-gray", `<i class="fa fa-clock-o me-2"></i>${exp.when}`));
        } else {
            textContainer.appendChild(createTextElement("span", "small text-gray", `<i class="fa fa-regular fa-floppy-disk me-2"></i>${exp.technologiesTitle}`));
        }
        cardHeader.appendChild(textContainer);
        side.appendChild(cardHeader);
        if (isFront) {
            const cardContent = createElement("div", "card-content p-3");
            exp.descriptions.forEach(description => {
                cardContent.appendChild(addTextContent(createElement("p", "text-small mt-2 font-weight-light"), description));
            });
            side.appendChild(cardContent);
        } else {
            const technologiesContainer = createElement("div", "p-3 row text-center");
            exp.technologies.forEach(technology => {
                const col = createElement("div", "col mb-3");
                const techImg = createElement("img", null, {src: technology.technologyImage, alt: technology.technologyTitle, style: "height: 50px;"});
                col.appendChild(techImg);
                technologiesContainer.appendChild(col);
            });
            side.appendChild(technologiesContainer);
        }
        return side;
    }
}

function generateProjects(projects) {
    const projectsElement = document.querySelector("#projects");
    projects.forEach(project => {
        const cardItem = createElement("div", "carousel-custom d-flex flex-column align-items-center");
        
        const cardImage = createElement("div", "card-image mb-3");
        cardImage.appendChild(createElement("img", null, {"src": project.imagePath, "alt": project.title, "height": "400px"}));

        const cardContent = createElement("div", "card-custom card-content p-3 rounded");
        const titleDiv = createElement("div", null);
        titleDiv.appendChild(createTextElement("h2", "h5", project.title));
        titleDiv.appendChild(createTextElement("span", "small text-gray", project.subtitle));
        cardContent.appendChild(titleDiv);
        project.descriptions.forEach(description => {
            cardContent.appendChild(addTextContent(createElement("p", "text-small font-weight-light"), description));
        });
        /*cardContent.appendChild(createTextElement("h6", null, project.technologiesTitle));
        cardContent.appendChild(createList(project.technologies));*/

        cardItem.appendChild(cardImage);
        cardItem.appendChild(cardContent);
        projectsElement.appendChild(cardItem);
    });
}

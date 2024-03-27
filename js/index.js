import skills from '/model/skills.json' with { type: 'json' };
import experience from '/model/experience.json' with { type: 'json' };
generateSkills(skills);
generateExperience(experience);

function generateSkills(skills) {
    const skillsElement = document.querySelector("#skills");

    function createCardElementWithClasses(classList) {
        const element = document.createElement("div");
        element.classList.add(...classList);
        return element;
    }

    function createImageElement(skill) {
        const image = document.createElement("img");
        image.src = skill.imagePath;
        image.alt = skill.title;
        return image;
    }

    function createTextElement(tag, classList, text) {
        const element = document.createElement(tag);
        element.classList.add(...classList);
        element.innerHTML = text;
        return element;
    }

    function createList(technologies) {
        const list = document.createElement("ul");
        list.classList.add("list-group", "list-group-flush");
        technologies.forEach(technology => {
            const item = document.createElement("li");
            item.classList.add("list-group-item");
            item.textContent = technology;
            list.appendChild(item);
        });
        return list;
    }

    for (const skill of skills) {
        const cardItem = createCardElementWithClasses(["card-angele", "rounded", "mb-3", "mx-1"]);
        
        const cardEntete = createCardElementWithClasses(["card-entete"]);
        cardEntete.appendChild(createCardElementWithClasses(["black-cover"]));
        cardEntete.appendChild(createImageElement(skill));

        const titleDiv = createCardElementWithClasses(["p-3"]);
        titleDiv.appendChild(createTextElement("h2", ["h5"], skill.title));
        titleDiv.appendChild(createTextElement("span", ["small", "text-gray"], skill.subtitle));
        cardEntete.appendChild(titleDiv);

        const cardContent = createCardElementWithClasses(["card-content", "p-3"]);
        cardContent.appendChild(createTextElement("h6", [], skill.technologiesTitle));
        cardContent.appendChild(createList(skill.technologies));

        cardItem.appendChild(cardEntete);
        cardItem.appendChild(cardContent);
        skillsElement.appendChild(cardItem);
    }
}

function generateExperience(experience) {
    function createElement(type, classNames, attributes = {}) {
        const element = document.createElement(type);
        if (classNames) {
            element.classList.add(...classNames.split(' ')); // Split by space and apply all
        }
        Object.keys(attributes).forEach(attr => element.setAttribute(attr, attributes[attr]));
        return element;
    }
    
    function addTextContent(element, text) {
        element.textContent = text;
        return element;
    }
    
    function addInnerHTML(element, html) {
        element.innerHTML = html;
        return element;
    }

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
        const side = createElement("div", `flip-card-${isFront ? 'front' : 'back'} card-angele rounded`);
        const cardHeader = createElement("div", "card-entete");
        cardHeader.appendChild(createElement("div", "black-cover"));
        cardHeader.appendChild(createElement("img", null, {src: exp.imagePath, alt: exp.what}));
        const textContainer = createElement("div", "p-3");
        textContainer.appendChild(addTextContent(createElement("h2", "h5"), exp.what));
        if (isFront) {
            textContainer.appendChild(addInnerHTML(createElement("span", "small text-gray"), `<i class="fa fa-clock-o me-2"></i>${exp.when}`));
        } else {
            textContainer.appendChild(addInnerHTML(createElement("span", "small text-gray"), `<i class="fa fa-regular fa-floppy-disk me-2"></i>${exp.technologiesTitle}`));
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

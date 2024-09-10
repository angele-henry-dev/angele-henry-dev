import * as utils from '/js/utils.js';
import skills from '/model/skills.json' with { type: 'json' };
import projects from '/model/projects.json' with { type: 'json' };
import experience from '/model/experience.json' with { type: 'json' };

generateSkills(skills);
generateExperience(experience);
generateProjects(projects);

function generateSkills(skills) {
    const skillsElement = document.querySelector("#skills");
    skills.forEach(skill => {
        const cardItem = utils.createElement("div", "card-custom rounded mb-3 mx-1");
        
        const cardEntete = utils.createElement("div", "card-entete");
        cardEntete.appendChild(utils.createElement("div", "black-cover"));
        cardEntete.appendChild(utils.createElement("img", null, {"src": skill.imagePath, "title": skill.title, "alt": skill.title, "width": "100%", "height": "100%"}));

        const titleDiv = utils.createElement("div", "p-3");
        titleDiv.appendChild(utils.createTextElement("h2", "h5", skill.title));
        titleDiv.appendChild(utils.createTextElement("span", "small", skill.subtitle));
        cardEntete.appendChild(titleDiv);

        const cardContent = utils.createElement("div", "card-content p-3");
        cardContent.appendChild(utils.createList(skill.technologies));

        cardItem.appendChild(cardEntete);
        cardItem.appendChild(cardContent);
        skillsElement.appendChild(cardItem);
    });
}

function generateExperience(experience) {
    const experienceElement = document.querySelector("#experience");
    experience.forEach(exp => {
        const flipCard = utils.createElement("div", "flip-card mb-3");
        const flipCardInner = utils.createElement("div", "flip-card-inner");
        const flipCardFront = createCardSide(exp, true);
        const flipCardBack = createCardSide(exp, false);

        flipCardInner.appendChild(flipCardFront);
        flipCardInner.appendChild(flipCardBack);
        flipCard.appendChild(flipCardInner);
        experienceElement.appendChild(flipCard);
    });

    function createCardSide(exp, isFront) {
        const hoverMe = utils.createElement("div", "hover-me fixed-bottom");
        const side = utils.createElement("div", `flip-card-${isFront ? 'front' : 'back'} card-custom rounded`);
        const cardHeader = utils.createElement("div", "card-entete");
        cardHeader.appendChild(utils.createElement("div", "black-cover"));
        cardHeader.appendChild(utils.createElement("img", null, {"src": exp.imagePath, "title": exp.what, "alt": exp.what, "width": "100%", "height": "100%"}));
        const textContainer = utils.createElement("div", "p-3");
        textContainer.appendChild(utils.addTextContent(utils.createElement("h2", "h5"), exp.what));
        if (isFront) {
            textContainer.appendChild(utils.createTextElement("span", "small", `<i class="fa fa-clock-o me-2"></i>${exp.when}`));
        } else {
            textContainer.appendChild(utils.createTextElement("span", "small", `<i class="fa fa-regular fa-floppy-disk me-2"></i>${exp.technologiesTitle}`));
        }
        cardHeader.appendChild(textContainer);
        side.appendChild(cardHeader);
        if (isFront) {
            const cardContent = utils.createElement("div", "card-content p-3");
            exp.descriptions.forEach(description => {
                cardContent.appendChild(utils.addTextContent(utils.createElement("p", "mt-2"), description));
            });
            cardContent.appendChild(hoverMe);
            side.appendChild(cardContent);
        } else {
            const technologiesContainer = utils.createElement("div", "card-content p-4 row text-center");
            technologiesContainer.appendChild(utils.createList(exp.technologies));
            side.appendChild(technologiesContainer);
        }
        return side;
    }
}

function generateProjects(projects) {
    const projectsElement = document.querySelector("#projects");
    const carouselContainer = utils.createElement("div", "carousel-custom-container");
    const carouselItems = utils.createElement("div", "carousel-custom-items");

    for (let i=0; i<projects.length; i++) {
        const input = utils.createElement("input", null, {"type": "radio", "name": "slider", "id": `item-${i}`, "checked": i === 10 ? 'true' : 'false'});
        carouselContainer.appendChild(input);

        const cardItem = utils.createElement("label", "carousel-custom-item", {"for": `item-${i}`, "id": `project-${i}`});
        cardItem.appendChild(utils.createElement("img", null, {"src": projects[i].imagePath, "title": projects[i].title, "alt": projects[i].title, "width": "100%", "height": "auto"}));

        const summaryItem = utils.createElement("div", "project-info", {"id": `project-info-${i}`});
        summaryItem.appendChild(utils.createTextElement("h2", null, `<i class="fa-solid ${projects[i].icon}"></i> ${projects[i].title}`));
        summaryItem.appendChild(utils.createTextElement("p", "subtitle", projects[i].subtitle));
        projects[i].descriptions.forEach(description => {
            summaryItem.appendChild(utils.addTextContent(utils.createElement("p", null), description));
        });
        summaryItem.appendChild(utils.createTextElement("p", "subtitle", `<span>${projects[i].technologies.join(' &#8226; ')}</span>`));
        cardItem.appendChild(summaryItem);

        carouselItems.appendChild(cardItem);
    }
    carouselContainer.appendChild(carouselItems);
    projectsElement.appendChild(carouselContainer);
}

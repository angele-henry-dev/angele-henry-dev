import skills from '/model/skills.json' with { type: 'json' };
import experience from '/model/experience.json' with { type: 'json' };
generateSkills(skills);
//generateExperience(experience);

function generateSkills(skills) {
    const skillsElement = document.querySelector("#skills");
    for (const skill of skills) {
        const cardItem = document.createElement("div");
        cardItem.classList.add("card-angele");
        cardItem.classList.add("rounded");
        cardItem.classList.add("mb-3");
        cardItem.classList.add("mx-1");

        // Create entete of the card
        const cardEntete = document.createElement("div");
        cardEntete.classList.add("card-entete");

        const blackCover = document.createElement("div");
        blackCover.classList.add("black-cover");
        cardEntete.appendChild(blackCover);

        const image = document.createElement("img");
        image.setAttribute("src", skill.imagePath);
        image.setAttribute("alt", skill.title);
        cardEntete.appendChild(image);

        const titleDiv = document.createElement("div");
        titleDiv.classList.add("p-3");
        const title = document.createElement("h2");
        title.classList.add("h5");
        title.innerHTML = skill.title;
        titleDiv.appendChild(title);
        const subtitle = document.createElement("span");
        subtitle.classList.add("small");
        subtitle.classList.add("text-gray");
        subtitle.innerHTML = skill.subtitle;
        titleDiv.appendChild(subtitle);
        cardEntete.appendChild(titleDiv);

        // Create content of the card
        const cardContent = document.createElement("div");
        cardContent.classList.add("card-content");
        cardContent.classList.add("p-3");
        const technoTitle = document.createElement("h6");
        technoTitle.innerHTML = skill.technologiesTitle;
        cardContent.appendChild(technoTitle);

        const technoList = document.createElement("ul");
        technoList.classList.add("list-group");
        technoList.classList.add("list-group-flush");
        for (const techno of skill.technologies) {
            const technoItem = document.createElement("li");
            technoItem.classList.add("list-group-item");
            technoItem.innerHTML = techno;
            technoList.appendChild(technoItem);
        }
        cardContent.appendChild(technoList);

        cardItem.appendChild(cardEntete);
        cardItem.appendChild(cardContent);
        skillsElement.appendChild(cardItem);
    }
}

function generateExperience(experience) {
    for (const exp of experience) {
        console.log(exp.what);
    }
}

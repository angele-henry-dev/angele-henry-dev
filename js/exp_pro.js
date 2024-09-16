import * as utils from '/js/utils.js';
import experience from '/model/experience.json' with { type: 'json' };

generateExp();

function generateExp() {
    const experienceElement = document.querySelector("#iso-description-container");
    const listAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const inputList = [];
    const liList = [];
    const labelList = [];
    const controlList = [];

    experience.forEach((arrayItem, index, fullArray) => {
        const letter = listAlpha[index];
        inputList.push(generateInput(letter, index));
        controlList.push(generateControl(index, listAlpha));
        liList.push(generateLi(arrayItem));
        labelList.push(generateLabel(letter));
    });

    inputList.forEach((element) => experienceElement.appendChild(element));
    
    controlList.forEach((element) => experienceElement.appendChild(element));

    liList.forEach((element) => experienceElement.appendChild(element));

    const indicators = utils.createElement("div", "carousel__indicators");
    labelList.forEach((element) => indicators.appendChild(element));
    experienceElement.appendChild(indicators);
}

function generateInput(letter, index) {
    const parameters = {
        "type": "radio",
        "id": letter,
        "name": "activator",
        "onchange": `selectExp('${letter}')`
    };
    if (index === 0) {
        parameters["checked"] = "checked";
    }
    return utils.createElement(
        "input",
        "carousel__activator",
        parameters
    );
}

function generateControl(index, listAlpha) {
    const div = utils.createElement("div", "carousel__controls");
    const beforeLetter = index === 0 ? listAlpha[listAlpha.length - 1] : listAlpha[index - 1];
    const afterLetter = index === listAlpha.length - 1 ? listAlpha[0] : listAlpha[index + 1];
    
    const before = utils.createElement("label", "carousel__control carousel__control--backward", { "for": beforeLetter })
    const after = utils.createElement("label", "carousel__control carousel__control--forward", { "for": afterLetter })
    div.appendChild(before);
    div.appendChild(after);
    return div;
}

function generateLi(arrayItem) {
    const liEl = utils.createElement("li");
    const div = utils.createElement("div", "px-5 py-3");
    div.appendChild(utils.createTextElement("h2", null, arrayItem.what));
    div.appendChild(utils.createTextElement("p", null, arrayItem.when));

    const technologies = utils.createElement("div", "pins mb-3");
    arrayItem.technologies.forEach(element => {
        technologies.appendChild(utils.createTextElement("span", null, element));
    });
    div.appendChild(technologies);

    const description = utils.createElement("div", "job-description");
    arrayItem.descriptions.forEach(element => {
        description.appendChild(utils.createTextElement("p", null, element));
    });
    div.appendChild(description);

    liEl.appendChild(div);
    return liEl;
}

function generateLabel(letter) {
    return utils.createElement("label", "carousel__indicator", { "for": letter });
}

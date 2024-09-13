import * as utils from '/js/utils.js';
import experience from '/model/experience.json' with { type: 'json' };

generateExp();

function generateExp() {
    const experienceElement = document.querySelector("#iso-description-container");
    const listAlpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const inputList = [];
    const liList = [];
    const labelList = [];

    experience.forEach((arrayItem, index, fullArray) => {
        const letter = listAlpha[index];
        const parameters = {
            "type": "radio",
            "id": letter,
            "name": "activator",
            "onchange": `selectExp('${letter}')`
        };
        if (index === 0) {
            parameters["checked"] = "checked";
        }
        inputList.push(utils.createElement(
            "input",
            "carousel__activator",
            parameters
        ));
        const liEl = utils.createElement("li");
        liEl.appendChild(utils.createTextElement("h2", null, arrayItem.what))
        liList.push(liEl);
        labelList.push("label", "carousel__indicator", { "for": letter });
    });

    inputList.forEach((element) => experienceElement.appendChild(element));
    liList.forEach((element) => experienceElement.appendChild(element));

    const indicators = utils.createElement("div", "carousel__indicators");
    labelList.forEach((element) => indicators.appendChild(element));
    experienceElement.appendChild(indicators);
}

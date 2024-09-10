import * as utils from "/js/utils.js";

fetch("./sitemap.xml")
    .then(response => response.text())
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        generateSitemap(xmlDoc);
    })
    .catch(error => console.error("Error fetching XML:", error));

function generateSitemap(sitemap) {
    const urls = convertSitemapToJSON(sitemap);
    const sitemapContainer = document.getElementById("sitemap-container");
    sitemapContainer.appendChild(generateElement(urls));
}
function generateElement(urls) {
    const urlElement = utils.createElement("ul", null);
    for (let i = 0; i < urls.length; i++) {
        const liElement = utils.createTextElement("li", null, null);
        liElement.appendChild(utils.createTextElement("a", null, urls[i].title, {"href": urls[i].url, "target": "_self"}));
        if (urls[i].children.length > 0) {
            liElement.appendChild(generateElement(urls[i].children));
        }

        urlElement.appendChild(liElement);
    }
    return urlElement;
}

function convertSitemapToJSON(xmlDoc) {
    const urls = Array.from(xmlDoc.getElementsByTagName('loc')).map(node => node.textContent);
    
    const baseUrl = urls[0]; // Assuming the first URL is the root (home page)
    const rootObject = {
        title: "Home",
        url: baseUrl,
        children: []
    };

    // Populate children based on whether they are direct descendants of the base URL
    urls.slice(1).forEach(url => {
        const title = generateTitleFromUrl(url);
        rootObject.children.push({
            title: title,
            url: url,
            children: []  // Assuming no deeper nesting for now
        });
    });

    return [rootObject];
}

function generateTitleFromUrl(url) {
    const pathSegments = url.split('/').filter(segment => segment);
    let title = pathSegments[pathSegments.length - 1]
        .replace(/-/g, ' ')  // Replace hyphens with spaces
        .replace(/\b\w/g, char => char.toUpperCase());  // Capitalize each word

    // Check if title ends with '.' followed by any extension and remove it
    const dotIndex = title.lastIndexOf('.');
    if (dotIndex !== -1) {
        title = title.slice(0, dotIndex);  // Remove the extension (everything after the last dot)
    }

    return title;
}

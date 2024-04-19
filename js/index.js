function getYear() {
    const element = document.querySelector("#currentYear");
    element.innerHTML = new Date().getFullYear();
}

function scrollSpy() {
    const sections = document.querySelectorAll(".section");
    const menuLinks = document.querySelectorAll("nav a");

    const makeActive = (link) => menuLinks[link].classList.add("active");
    const removeActive = (link) => menuLinks[link].classList.remove("active");
    const removeAllActive = () => menuLinks.forEach(link => link.classList.remove("active"));
    const sectionMargin = 200;
    let currentActive = -1; // Initialize to -1 to ensure the initial setup works correctly

    // Function to update active section
    const updateActiveLink = () => {
        let found = false;
        for (let i = sections.length - 1; i >= 0; i--) {
            if (window.scrollY >= sections[i].offsetTop - sectionMargin) {
                if (currentActive !== i) {
                    removeAllActive();
                    makeActive(i);
                    currentActive = i;
                }
                found = true;
                break;
            }
        }
        if (!found && currentActive !== -1) {
            removeAllActive();
            currentActive = -1;
        }
    };

    // Debounce function to limit the rate at which updateActiveLink is called
    const debounce = (func, delay) => {
        let timer;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func();
            }, delay);
        };
    };

    // Attach the debounced scroll event listener
    window.addEventListener("scroll", debounce(updateActiveLink, 10));
}

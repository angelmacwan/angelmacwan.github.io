function onload() {
    //   get display div
    let displayDiv = document.querySelector("#display");

    // get landing page
    let landingPage = document.querySelector("#landing");

    // display landing page
    displayDiv.innerHTML = landingPage.innerHTML;
    displayDiv.style.display = "block";

    // Load projects
    fetch("./projects.json")
        .then((data) => data.json())
        .then((data) => {
            loadProjects(data);
        });

    // Load achievements
    fetch("./achive.json")
        .then((data) => data.json())
        .then((data) => {
            loadAchievements(data);
        });

    typedAnimation();
}

function typedAnimation() {
    new Typed("#hello-world", {
        strings: ["&lt; Hello World / &gt;"],
        typeSpeed: 30,
        showCursor: false,
    });

    new Typed("#abtMe", {
        strings: [
            "",
            'I am <b style="color: #762cde">Angel Macwan</b> <br /> Data Scientist',
        ],
        typeSpeed: 50,
        showCursor: false,
    });

    new Typed("#how-can", {
        strings: ["", "How can i help you!"],
        typeSpeed: 40,
        startDelay: 2800,
        showCursor: false,
    });
}

function loadAchievements(data) {
    // get Achievements div
    let targetDiv = document.querySelector("#achievements-content>div");
    targetDiv.innerHTML = "";

    data.forEach((d) => {
        let node = `
        <div>
            <h1>${d.name}</h1>
            <p>${d.clg} // <b>${d.pos} place</b></p>
        </div>
        `;
        targetDiv.innerHTML += node;
    });
}

function loadProjects(data) {
    // get projects div
    let targetDiv = document.querySelector("#work-content>div");
    targetDiv.innerHTML = "";

    data.forEach((d) => {
        let node = `
            <div class="work-card">
            <h2>${d.name}</h2>
            <p>${d.desc}</p>
            <p>&lt${d.tech}/&gt</p>`;

        if (d.live != "#")
            node += `<a target="_blank" class='btn nav-btn' href="${d.live}">Live</a>`;

        node += `<a target="_blank" class='btn nav-btn' href="${d.git}">Code</a> </div>`;

        targetDiv.innerHTML += node;
        // <img src="./images/${d.img}" alt="Image" />
    });
}

function changePage(target) {
    let timeFrame = 800;

    let displayDiv = document.querySelector("#display");
    let animationDiv = document.querySelector("#animationDiv");

    let toDiv = document.querySelector(`#${target}`);

    animationDiv.style.transition = `${timeFrame}ms`;
    animationDiv.style.transform = "scaleX(1)";

    setTimeout(() => {
        animationDiv.style.transform = "scaleX(0)";
    }, timeFrame + 250);

    setTimeout(() => {
        displayDiv.innerHTML = toDiv.innerHTML;
        toDiv.style.display = "none";
        displayDiv.style.display = "block";
        if (target == "landing") typedAnimation();
    }, timeFrame);
}

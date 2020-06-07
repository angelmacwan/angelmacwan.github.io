let dist = 2;
window.addEventListener("scroll", () => {
  let screenPos = window.innerHeight; //current screen height;

  let home = document.querySelector("#home");
  let homepos = home.getBoundingClientRect().top;

  let work = document.querySelector("#portfolio");
  let workpos = work.getBoundingClientRect().top;

  let skills = document.querySelector("#skills");
  let skillspos = skills.getBoundingClientRect().top;

  let achieve = document.querySelector("#achieve");
  let achievepos = achieve.getBoundingClientRect().top;

  let contact = document.querySelector("#contact");
  let contactpos = contact.getBoundingClientRect().top;

  if (homepos + 300 >= 0) {
    hideSection(work);
    hideSection(skills);
    hideSection(achieve);
    hideSection(contact);
  }

  if (workpos < screenPos / dist) {
    showSection(work);
    hideSection(skills);
    hideSection(achieve);
    hideSection(contact);
  }
  if (skillspos < screenPos / dist) {
    showSection(skills);
    hideSection(work);
    hideSection(achieve);
    hideSection(contact);
  }
  if (achievepos < screenPos / dist) {
    showSection(achieve);
    hideSection(work);
    hideSection(skills);
    hideSection(contact);
  }
  if (contactpos < screenPos / dist) {
    showSection(contact);
    hideSection(work);
    hideSection(skills);
    hideSection(achieve);
  }
  //
  //

  var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  var height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  var scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
  //
  //
});
//
//
function showSection(sec) {
  sec.style.opacity = "1";
  sec.className = "animate__animated animate__fadeInLeft";
}
function hideSection(sec) {
  sec.className = "animate__animated animate__fadeOutLeft";
}
//
//
async function getAchieve() {
  let response = await fetch("./JSON/achievements.json");
  return await response.json();
}
//
getAchieve().then(data => {
  let achieve = document.querySelector("#achieve>.gridView-2");
  for (let d in data) {
    let node = `<div>
                <p class='achieveName'>${data[d].name}</p>
                <p class='achieveClg'>${data[d].clg}</p>
                <p class='achievePos'>${data[d].pos}</p>
                </div>`;
    achieve.innerHTML += node;
  }
});
//
//
function navToggle(show) {
  let navBar = document.querySelector(".navBar");
  if (show) {
    navBar.style.left = "0";
  }
  if (!show) {
    navBar.style.left = "-100vw";
  }
}
//
//
async function getProjects() {
  let response = await fetch("./JSON/projects.json");
  return await response.json();
}
//
getProjects().then(data => {
  let projects = document.querySelector("#allProjects");
  for (let d of data) {
    let node = `<div>
    <h2>${d.name}</h2>
    <p id=" pTech">${d.tech}</p>
    <p id="pDesc">${d.desc}</p>
    <br>
    <a href="${d.live}" target="_blank">LIVE</a>
    <a href="${d.git}" target="_blank">CODE</a>
    </div>`;
    projects.innerHTML += node;
  }
});
//
function showAllProjects() {
  let projects = document.querySelector("#allProjects");
  let projectDiv = document.querySelectorAll("#allProjects>div");

  if (projects.classList.value == "animate__animated animate__bounceInDown") {
    //TRUE IN VISIBLE
    // HIDE ALL
    document.querySelector("#btnShowAll").innerText = "Show All Projects";
    projects.className = "animate__animated animate__bounceOutUp";
    setTimeout(() => {
      for (let i of projectDiv) {
        i.style.display = "none";
      }
    }, 800);
  } else if (
    projects.classList.value == "animate__animated animate__bounceOutUp"
  ) {
    //TRUE IF HIDDEN
    // SHOW ALL

    document.querySelector("#btnShowAll").innerText = "Hide All Projects";
    projects.className = "animate__animated animate__bounceInDown";
    for (let i of projectDiv) {
      i.style.display = "block";
    }
  }
}

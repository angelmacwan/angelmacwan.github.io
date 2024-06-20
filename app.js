function load_projects() {
	fetch('./projects.json')
		.then((data) => data.json())
		.then((data) => {
			let output_container = document.querySelector(
				'#projects_container'
			);
			output_container.innerHTML = '';

			data.forEach((project) => {
				console.log(project);
				let node = `<div class="project">
                <h3><a href="${project.git}" target="_blank">${project.name}</a></h3>
                <p>${project.desc}</p>
                </div>`;
				output_container.innerHTML += node;
			});
		});
}

function onload() {
	load_projects();
}

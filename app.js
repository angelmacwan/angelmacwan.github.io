function load_projects() {
	fetch('./projects.json')
		.then((data) => data.json())
		.then((data) => {
			let output_container = document.querySelector(
				'#projects_container'
			);
			output_container.innerHTML = '';

			data.forEach((project) => {
				let node = `<div class="project">
                <h3>${project.name}</h3>
                <p>${project.desc}</p>
                </div>`;
				output_container.innerHTML += node;
			});
		});
}

function onload() {
	load_projects();
}

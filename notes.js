let converter = new showdown.Converter();
let output_container = document.querySelector('#notes_display_container');

function load_notes(notes_name) {
	fetch(`./notes/${notes_name}.md`)
		.then((data) => data.text())
		.then((data) => {
			let notes = '';
			notes += `<div class = 'animate__animated animate__fadeIn'><h1 class='notes_title'>${notes_name}</h1>`;
			notes += converter.makeHtml(data);
			notes += '</div>';

			output_container.innerHTML = notes;
			Prism.highlightAll();
		});
}

function load_notes_list() {
	fetch('./notes.json')
		.then((data) => data.json())
		.then((data) => {
			data = data.data;

			let output_container = document.querySelector(
				'#notes_list_container'
			);

			data.forEach((note) => {
				let node = `<button class="list_btns_notes" onclick="load_notes('${note}')">${note}</button>`;
				output_container.innerHTML += node;
			});
		});
}

let converter = new showdown.Converter();
let output_container = document.querySelector('#notes_display_container');

function load_notes(notes_name) {
	fetch(`./notes/${notes_name}.md`)
		.then((data) => data.text())
		.then((data) => {
			output_container.innerHTML = `<h1 class='notes_title'>${notes_name}</h1>`;
			output_container.innerHTML += converter.makeHtml(data);
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

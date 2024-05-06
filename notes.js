let converter = new showdown.Converter();
let output_container = document.querySelector('#notes_display_container');

function get_tags() {
	fetch('https://raw.githubusercontent.com/angelmacwan/Notes/main/tags.json')
		.then((data) => data.json())
		.then((data) => {
			load_notes_list(data);
		})
		.catch((err) => {
			console.log(err);
			alert('Oops, Looks like search box is not working 😅...');
		});
}

function load_notes(url, notes_name) {
	fetch(url)
		.then((data) => data.text())
		.then((data) => {
			let notes = '';
			notes += `<div class = 'animate__animated animate__fadeIn'><h1 class='notes_title'>${notes_name}</h1>`;
			notes += converter.makeHtml(data);
			notes += '</div>';
			output_container.innerHTML = notes;
			Prism.highlightAll();
		})
		.catch((err) => {
			console.log(err);
			alert('Oops, Looks like something is wrong with our server. We will get back soon 😅...');
		});
}

function load_notes_list(tags) {
	fetch('https://api.github.com/repos/angelmacwan/Notes/contents')
		.then((data) => data.json())
		.then((data) => {
			let output_container = document.querySelector('#notes_list_container');
			data.forEach((i) => {
				if (i.name !== 'tags.json') {
					i.name = i.name.replace('.md', '');
					let node = `<button data-tags="${tags[i.name]}" class="list_btns_notes" id = "btn_${
						i.sha
					}" onclick="load_notes('${i.download_url}', '${i.name}')">${i.name}</button>`;
					output_container.innerHTML += node;
				}
			});
		})
		.catch((err) => {
			console.log(err);
			alert('Oops, Cant find notes here... We are working on it 😅...');
		});
}

document.querySelector('#notes_search').addEventListener('input', () => {
	let search = document.querySelector('#notes_search').value;
	let btns = document.querySelectorAll('.list_btns_notes');
	btns.forEach((btn) => {
		if (btn.dataset.tags.toLowerCase().includes(search.toLowerCase())) {
			btn.style.display = 'block';
		} else {
			btn.style.display = 'none';
		}
	});
});

get_tags();

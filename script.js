window.onload = function() {
	const ul = document.createElement('ul');
	const select = document.getElementsByClassName('select-list-size');
	var defaultValue = select[0].value;

	var listItems = '';
	var listWidth = '480px';

	// var listString = ''

	select[0].addEventListener('change', function(e) {
		console.log(e.target.value);
		defaultValue = e.target.value;
		listItems = '';
		buildList(defaultValue);
	});

	function buildList(val) {
		//build cards-list

		console.log(val);
		for (let i = 0; i < val; i++) {
			listItems +=
				'<li class="card-list-item"><div class="card"><div class="card-front">111</div><div className="card-back"><img src="http://via.placeholder.com/100x100" alt=""/></div></div></li>';
		}

		switch (val) {
			case '16':
				listWidth = '480px';
				break;

			case '36':
				listWidth = '720px';
				break;

			case '64':
				listWidth = '1000px';
				break;

			default:
				listWidth = '480px';
				break;
		}

		console.log(val);

		ul.innerHTML = listItems;
		ul.setAttribute('class', 'card-list');

		ul.style.width = listWidth;

		document.body.appendChild(ul);
	}

	buildList(defaultValue);

	// list.appendChild(listItems);

	// let selectIndex = 0;

	// let listCount = select[0].children[selectIndex].value;

	console.log(defaultValue);
};

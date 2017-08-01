window.onload = function() {
	const ul = document.querySelector('.card-list');
	const select = document.querySelector('.list-size');
	const score = document.querySelector('.score');

	let optionValue = select.value;

	select.addEventListener('change', changeSelectValue);

	function changeSelectValue(e) {
		optionValue = e.target.value;
		console.log('selectedIndex', optionValue);

		buildList(optionValue);
	}

	function setContainerWidth(val) {
		switch (val) {
			case '16':
				ul.style.width = '480px';
				break;

			case '36':
				ul.style.width = '720px';
				break;

			case '64':
				ul.style.width = '960px';
				break;
		}
	}

	function createIndForImg(val, arrImg) {
		//push index for each image
		console.log('createIndex');
		for (let i = 0; i < val; i++) {
			arrImg.push(i % (val / 2));
		}
	}

	//shuffle image indexes
	function shuffle(arrImg) {
		var j, x, i;
		for (i = arrImg.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = arrImg[i - 1];
			arrImg[i - 1] = arrImg[j];
			arrImg[j] = x;
		}
	}

	function buildList(val) {
		let liItems = '';
		let arrImg = [];

		setContainerWidth(val);

		createIndForImg(val, arrImg);

		shuffle(arrImg);

		for (let i = 0; i < arrImg.length; i++) {
			//   i % (arrImg.length / 2));
			liItems += `
			<li class="card-list-container">
				<div class="card-list-item">
					<div class="card-list-front">Click me ${i}</div>
					<div class="rotate-backside-back" data-value=${arrImg[i]}>
					<img src="images/${arrImg[i]}.png"></div>
				</div>
			</li>`;
		}

		ul.innerHTML = liItems;
	}

	buildList(optionValue);

	ul.addEventListener('click', onClickItem);

	var counter = 0;
	var arrTurnBack = [];
	var arrScores = [];
	var arrTemp = [];
	var scoresCounter = '';

	function onClickItem(e) {
		var target = e.target;
		console.log('target', target);

		if (counter > 2) {
			counter = 0;
			return;
		} else {
			counter++;
		}

		if (
			target.tagName !== 'DIV' ||
			!target.classList.contains('card-list-front') ||
			counter > 2
		) {
			counter--;
			return;
		}

		//Image Flips backwards
		target.classList.remove('rotateBack');
		target.classList.add('rotate');
		target.nextElementSibling.classList.remove('rotate-backside-back');
		target.nextElementSibling.classList.add('rotate-backside');

		var turnBack = function() {
			setTimeout(() => {
				target.nextElementSibling.classList.remove('rotate-backside');
				target.nextElementSibling.classList.add('rotate-backside-back');
				target.classList.remove('rotate');
				target.classList.add('rotateBack');

				if (counter === 2) clear();
			}, 1000);
		};

		arrTurnBack.push(turnBack);
		arrTemp.push(target.nextElementSibling.dataset.value);

		function clear() {
			counter = 0;
			arrTurnBack = [];
		}

		if (counter === 2) {
			if (arrTemp[arrTemp.length - 2] === arrTemp[arrTemp.length - 1]) {
				arrScores.push(
					arrTemp[arrTemp.length - 2],
					arrTemp[arrTemp.length - 1]
				);
				score.innerHTML = ++scoresCounter;
				console.error('arrScores', arrScores);
				arrScores.length === 16
					? (alert('you win!'), location.reload(), (scoresCounter = 0))
					: '';
				clear();
				return;
			}

			arrTurnBack[0]();
			arrTurnBack[1]();
		}
	}
};

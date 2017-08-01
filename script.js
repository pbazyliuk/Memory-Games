window.onload = function() {
  const ul = document.querySelector(".card-list");
  const select = document.querySelector(".list-size");
  const score = document.querySelector(".score");

  let optionValue = select.value;

  select.addEventListener("change", changeSelectValue);

  function changeSelectValue(e) {
    optionValue = e.target.value;

    buildList(optionValue);
  }

  //set container width
  function setContainerWidth(val) {
    switch (val) {
      case "16":
        ul.style.width = "480px";
        break;

      case "36":
        ul.style.width = "720px";
        break;

      case "64":
        ul.style.width = "960px";
        break;
    }
  }

  //create array of indexes for images identification
  function createIndForImg(val, arrImg) {
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
    let liItems = "";
    let arrImg = [];

    setContainerWidth(val);

    createIndForImg(val, arrImg);

    shuffle(arrImg);

    for (let i = 0; i < arrImg.length; i++) {
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

  //Add listener for click
  ul.addEventListener("click", onClickItem);

  //rotate card
  function rotateFrontCard(target) {
    //Image Flips backwards
    target.classList.remove("rotateBack");
    target.classList.add("rotate");
    target.nextElementSibling.classList.remove("rotate-backside-back");
    target.nextElementSibling.classList.add("rotate-backside");
  }

  //rotate back card
  function rotateBackCard(target) {
    //Image Flips backwards
    return function() {
      setTimeout(() => {
        target.nextElementSibling.classList.remove("rotate-backside");
        target.nextElementSibling.classList.add("rotate-backside-back");
        target.classList.remove("rotate");
        target.classList.add("rotateBack");
      }, 1000);
    };
  }

  //clear values for two open cards
  function clearValues() {
    counter = 0;
    arrTurnBack = [];
    arrValues = [];
  }

  var counter = 0;
  var arrTurnBack = [];
  var scores = 0;
  var arrValues = [];

  //click handler
  function onClickItem(e) {
    var target = e.target;

    counter++;
    if (
      target.tagName !== "DIV" ||
      !target.classList.contains("card-list-front") ||
      counter > 2
    ) {
      counter--;
      return;
    }

    rotateFrontCard(target);

    arrTurnBack.push(rotateBackCard(target));

    arrValues.push(target.nextElementSibling.dataset.value);

    if (counter === 2 && arrValues[0] !== arrValues[1]) {
      arrTurnBack.forEach(item => {
        item();
      });
      setTimeout(() => {
        clearValues(counter, arrTurnBack);
      }, 1000);
    } else if (arrValues[0] === arrValues[1]) {
      score.innerHTML = ++scores;
      clearValues(counter, arrTurnBack);
    }

    if (scores === 8) {
      setTimeout(() => {
        alert("you win!");
        location.reload();
      }, 2000);
    }
  }
};

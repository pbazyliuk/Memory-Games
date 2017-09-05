window.onload = function () {
  //define variables
  const ul = document.querySelector(".card-list");
  const select = document.querySelector(".list-size");
  const score = document.querySelector(".score");

  let counter = 0;
  let arrTurnBack = [];
  let scores = 0;
  let arrValues = [];

  let optionValue = select.value;

  //Add listener for selecting images list size
  select.addEventListener("change", changeSelectValue);

  //Add listener for click on card
  ul.addEventListener("click", onClickItem);

  //rebuild img list on select option change
  function changeSelectValue(e) {
    optionValue = e.target.value;
    buildList(optionValue);
  }

  //build list of images
  function buildList(val) {
    let liItems = "";
    let arrImgInd = [];

    //set container style width
    setContainerWidth(val);

    //create array with same pair indexes
    createIndForImg(val, arrImgInd);

    //shuffle indexes in array
    shuffle(arrImgInd);

    for (let i = 0; i < arrImgInd.length; i++) {
      liItems += `
			<li class="card-list-container rotateBack">
				<div class="card-list-item">
					<div class="card-list-front rotate-back">Click me ${i}</div>
          <div class="rotate-backside-back" data-value=${arrImgInd[i]}>
            <img src="images/${arrImgInd[i]}.png">
          </div>
				</div>
			</li>`;
    }

    ul.innerHTML = liItems;
  }

  //Call func for initial img list build
  buildList(optionValue);

  //set container style width
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
  function createIndForImg(val, arrImgInd) {
    for (let i = 0; i < val; i++) {
      arrImgInd.push(i % (val / 2));
    }
  }

  //shuffle image indexes
  function shuffle(arrImgInd) {
    var randomIndFromRange, imgInd, i;
    for (i = arrImgInd.length; i; i--) {
      randomIndFromRange = Math.floor(Math.random() * i);
      imgInd = arrImgInd[i - 1];
      arrImgInd[i - 1] = arrImgInd[randomIndFromRange];
      arrImgInd[randomIndFromRange] = imgInd;
    }
  }

  //rotate card
  function rotateFrontCard(target, bool) {
    let latency = 0;
    if (bool) {
      latency = 1000;
    }
    //Image Flips backwards with latency
    setTimeout(() => {
      target.classList.toggle("rotate-back");
      target.nextElementSibling.classList.toggle("rotate-backside");
      target.nextElementSibling.classList.toggle("rotate-backside-back");
      target.classList.toggle("rotate");
    }, latency);
  }

  //clear values for two open cards
  function clearValues() {
    arrTurnBack = [];
    arrValues = [];
  }

  //click handler
  function onClickItem(e) {
    var target = e.target;
    console.log(arrTurnBack.length)
    //check onclick event on some statements
    if (
      arrTurnBack.length === 2 ||
      target.tagName !== "DIV" ||
      (!target.nextElementSibling ||
        target.nextElementSibling.classList.contains("rotate-backside"))
    ) {
      return;
    }

    //rotate card
    rotateFrontCard(target);

    //func for back card rotate
    let turnBackFunc = function () {
      return rotateFrontCard(target, true);
    };

    //save func for probably card rotate back and card index values
    arrTurnBack.push(turnBackFunc);
    arrValues.push(target.nextElementSibling.dataset.value);

    //check for cards indentity
    if (arrTurnBack.length === 2 && arrValues[0] === arrValues[1]) {
      score.innerHTML = ++scores;
      setTimeout(clearValues, 1500)
      // clearValues();
    } else if (arrTurnBack.length === 2 && arrValues[0] !== arrValues[1]) {
      arrTurnBack.forEach(item => item());
      setTimeout(clearValues, 1500)
    }

    //end game when score reach 8
    if (scores === 8) {
      setTimeout(() => {
        alert("you win!");
        location.reload();
      }, 1000);
    }
  }
};

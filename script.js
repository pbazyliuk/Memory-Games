window.onload = function() {
  const ul = document.querySelector(".card-list");
  const select = document.querySelector(".list-size");
  // let selectedIndex = 0;
  let optionValue = select.value;

  select.addEventListener("change", changeSelectValue);

  function changeSelectValue(e) {
    optionValue = e.target.value;
    console.log("selectedIndex", optionValue);
    buildList(optionValue);
  }

  function buildList(val) {
    console.log(typeof val);
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

    let liItems = "";

    for (let i = 0; i < val; i++) {
      liItems += `
			<li class="card-list-container">
				<div class="card-list-item">
					<div class="card-list-front">Click me ${i}</div>
					<div class="rotate-backside-back" data-value=${i %
            8}><img src="http://via.placeholder.com/100x100"></div>
				</div>
			</li>`;
    }

    ul.innerHTML = liItems;
  }

  buildList(optionValue);

  console.log(ul);

  ul.addEventListener("click", foo);

  var counter = 0;
  var arrTurnBack = [];

  function foo(e) {
    var target = e.target;
    console.log("target", target);

    if (counter > 2) {
      counter = 0;
      return;
    } else {
      counter++;
    }

    console.log(counter);
    if (
      target.tagName !== "DIV" ||
      !target.classList.contains("card-list-front") ||
      counter > 2
    ) {
      counter--;
      return;
    }

    //Image Flips backwards
    target.classList.remove("rotateBack");
    target.classList.add("rotate");
    target.nextElementSibling.classList.remove("rotate-backside-back");
    target.nextElementSibling.classList.add("rotate-backside");

    var turnBack = function() {
      setTimeout(() => {
        target.nextElementSibling.classList.remove("rotate-backside");
        target.nextElementSibling.classList.add("rotate-backside-back");
        target.classList.remove("rotate");
        target.classList.add("rotateBack");

        if (counter === 2) clear();
      }, 1000);
    };

    arrTurnBack.push(turnBack);

    function clear() {
      counter = 0;
      arrTurnBack = [];
    }

    if (counter === 2) {
      arrTurnBack[0]();
      arrTurnBack[1]();
    }
  }
};

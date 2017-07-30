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
  var counter = 0;
  var bool = false;
  var arr = [];
  var arrV = [];
  var arrR = [];
  var scores = 0;

  ul.addEventListener("click", foo);

  var counter = 0;
  var arr = [];

  function foo(e) {
    var target = e.target;

    console.log();
    if (
      target.tagName != "DIV" &&
      !target.classList.contains("card-list-front")
    ) {
      return;
    } else if (target.classList.contains("card-list-front")) {
      counter++;
      if (counter > 2) return;
    }
    console.log(counter);

    target.classList.remove("rotateBack");
    target.classList.add("rotate");

    if (e.target.nextElementSibling) {
      e.target.nextElementSibling.classList.remove("rotate-backside-back");
      e.target.nextElementSibling.classList.add("rotate-backside");

      arrV.push(e.target.nextElementSibling.dataset.value);
      console.log(arrV);

      var func = function(target, func1) {
        return function() {
          setTimeout(() => {
            console.log(target);
            target.nextElementSibling.classList.remove("rotate-backside");
            target.classList.remove("rotate");
            target.nextElementSibling.classList.add("rotate-backside-back");
            target.classList.add("rotateBack");
            if (func1) func1();
          }, 1000);
        };
      };

      function func1() {
        setTimeout(() => {
          counter = 0;
          arr = [];
        }, 1000);
      }

      arr.push(func(target, func1));

      if (counter === 2) {
        // if (arrV[arrV.lenght - 2] !== arrV[arrV.lenght - 1]) {
        //   console.errro(arrV[arrV.lenght - 2] !== arrV[arrV.lenght - 1]);
        //   arrV = [];
        // } else {
        //   counter = 0;
        //   arr = [];

        //   arrR = [].concat(arrV);
        //   console.log(arrR);
        //   var score = document.querySelector(".score");
        //   console.error(score);
        //   console.error(scores++);
        //   score.innerHTML = scores;
        //   if (scores === 8) {
        //     alert("You win!!!");
        //     scores = 0;
        //     arrR = [];
        //     location.reload();
        //   }
        //   return;
        // }
        // arr.push(func1);
        arr[0]();
        arr[1]();
        // arr[2]();
        console.log(arr);

        // arr.forEach(item => {
        //   item();
        // });
      }
      // if (bool) {
      //   setTimeout(() => {
      //     counter = 0;
      //   }, 1000);
      // }
      // bool = true;
    }
  }
};

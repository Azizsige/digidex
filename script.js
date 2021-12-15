const btnSearch = document.querySelector("#btn-search");
const input = document.querySelector("#input");
const listDigimonEl = document.querySelector("#digimon-card__cont");
const containerDigimonEl = document.querySelector("#content-digimon__card");
const resultLevel = document.querySelector("#result");
const level = document.querySelector("#level");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const loader = document.querySelector("#loading");

// Fetch All Digimon and Render It
function getAll() {
  return fetch("https://digimon-api.vercel.app/api/digimon")
    .then((response) => response.json())
    .then((data) => data);
}

function renderAll() {
  const get = getAll();
  get.then(function (datas) {
    let num = 0;
    listDigimonEl.innerHTML = "";
    datas.slice(num, num + 6).forEach(function (digimon) {
      listDigimonEl.innerHTML += `
      <div id="content-digimon__card" data-index="${findIndex(
        datas,
        digimon.name
      )}">
      <img loading="lazy" src="${digimon.img}" alt="" />
      <div id="content-digimon__card--desc">
      <h5 id="digimon-name">Name : ${digimon.name}</h5>
      <h5>Level : ${digimon.level}</h5>
      </div>
      </div>
      `;
    });
    nextBtn.style.display = "block";
  });
}

function findIndex(el, Elname) {
  var index = el.findIndex((obj) => obj.name == Elname);

  return index;
}

function nextPage(lastNum) {
  const parentLastChild = lastNum;
  let lastIndex = parentLastChild.getAttribute("data-index");
  //console.log(Firstindex)
  let numFirst = parseInt(lastIndex) + 2;
  //console.log(numFirst)
  let numLast = numFirst + 6;
  console.log(`Next Page All : ${(numFirst, numLast)}`);
  const getData = getAll();
  getData.then(function (datas) {
    console.log(datas);
    if (numFirst > 209) {
      nextBtn.style.display = "none";
      listDigimonEl.innerHTML = " ";
      datas.slice(numFirst, numLast).forEach(function (digimon) {
        listDigimonEl.innerHTML += `
        <div id="content-digimon__card" data-index="${findIndex(
          datas,
          digimon.name
        )}">
        <img loading="lazy" src="${digimon.img}" alt="" />
        <div id="content-digimon__card--desc">
        <h5 id="digimon-name">Name : ${digimon.name}</h5>
        <h5>Level : ${digimon.level}</h5>
        </div>
        </div>
        `;
      });
    } else {
      listDigimonEl.innerHTML = " ";
      datas.slice(numFirst, numLast).forEach(function (digimon) {
        listDigimonEl.innerHTML += `
        <div id="content-digimon__card" data-index="${findIndex(
          datas,
          digimon.name
        )}">
        <img loading="lazy" src="${digimon.img}" alt="" />
        <div id="content-digimon__card--desc">
        <h5 id="digimon-name">Name : ${digimon.name}</h5>
        <h5>Level : ${digimon.level}</h5>
        </div>
        </div>
        `;
      });
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  });
}

function prevPage(firstNum) {
  const firstParent = firstNum;
  let Firstindex = firstParent.getAttribute("data-index");
  console.log(Firstindex);
  let numFirst = parseInt(Firstindex) - 6;
  let numLast = numFirst + 6;
  console.log(numFirst, numLast);
  const getData = getAll();
  getData.then(function (datas) {
    console.log(datas);
    if (numFirst == 0) {
      prevBtn.style.display = "none";
      listDigimonEl.innerHTML = " ";
      datas.slice(numFirst, numLast).forEach(function (digimon) {
        listDigimonEl.innerHTML += `
        <div id="content-digimon__card" data-index="${findIndex(
          datas,
          digimon.name
        )}">
        <img loading="lazy" src="${digimon.img}" alt="" />
        <div id="content-digimon__card--desc">
        <h5 id="digimon-name">Name : ${digimon.name}</h5>
        <h5>Level : ${digimon.level}</h5>
        </div>
        </div>
        `;
      });
    } else {
      listDigimonEl.innerHTML = " ";
      datas.slice(numFirst, numLast).forEach(function (digimon) {
        listDigimonEl.innerHTML += `
        <div id="content-digimon__card" data-index="${findIndex(
          datas,
          digimon.name
        )}">
        <img loading="lazy" src="${digimon.img}" alt="" />
        <div id="content-digimon__card--desc">
        <h5 id="digimon-name">Name : ${digimon.name}</h5>
        <h5>Level : ${digimon.level}</h5>
        </div>
        </div>
        `;
      });
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  });
}

// End of Fetch All Digimon and Render

// Fetch Digimon By Level and Render it
function getLevels(option) {
  return fetch(`https://digimon-api.vercel.app/api/digimon/level/${option}`)
    .then((response) => response.json())
    .then((data) => data);
}

function renderLevels() {
  resultLevel.innerHTML = "";
  resultLevel.innerHTML = `
  <h4>Result for "${level.value}"</h4>
  `;
  const getLev = getLevels(level.value);
  getLev.then(function (datas) {
    listDigimonEl.innerHTML = "";
    console.log(datas);
    datas.slice(0, 0 + 5).forEach((digimon) => {
      listDigimonEl.innerHTML += `
   <div id="content-digimon__card" data-index="${findIndex(
     datas,
     digimon.name
   )}">
      <img loading="lazy" src="${digimon.img}" alt="" />
      <div id="content-digimon__card--desc">
      <h5>Name : ${digimon.name}</h5>
      <h5>Level : ${digimon.level}</h5>
      </div>
      </div>
      `;
    });
  });
}

level.addEventListener("change", function () {
  resultLevel.innerHTML = "";
  listDigimonEl.innerHTML = "";
  listDigimonEl.innerHTML += `
  <div id="loading" class="hide">
  <h2>Searching All "${level.value}" Digimon</h2>
  </div>
  `;
  console.log(level.value);
  nextBtn.classList.add("levels");
  prevBtn.classList.add("levels");
  prevBtn.style.display = "none";
  nextBtn.style.display = "block";
  nextBtn.classList.remove("all");
  prevBtn.classList.remove("all");
  renderLevels(level.value);
});

function nextPageLev(lastNum) {
  const parentLastChild = lastNum;
  let lastIndex = parentLastChild.getAttribute("data-index");
  console.log(lastIndex);

  let numFirst = parseInt(lastIndex) + 1;
  let numLast = numFirst + 5;
  const getData = getLevels(level.value);
  getData.then(function (datas) {
    listDigimonEl.innerHTML = "";
    datas.slice(numFirst, numLast).forEach(function (digimon) {
      console.log(numFirst, numLast);
      console.log(datas);
      if (
        numFirst >= 208 ||
        numLast == datas.length + 1 ||
        numFirst == datas.length - 1 ||
        numFirst <= datas.length
      ) {
        nextBtn.style.display = "none";
        prevBtn.style.display = "block";
        listDigimonEl.innerHTML = " ";
        datas.slice(numFirst, numLast).forEach(function (digimon) {
          listDigimonEl.innerHTML += `
          <div id="content-digimon__card" data-index="${findIndex(
            datas,
            digimon.name
          )}">
          <img loading="lazy" src="${digimon.img}" alt="" />
          <div id="content-digimon__card--desc">
          <h5 id="digimon-name">Name : ${digimon.name}</h5>
          <h5>Level : ${digimon.level}</h5>
          </div>
          </div>
          `;
        });
      } else {
        listDigimonEl.innerHTML = " ";
        datas.slice(numFirst, numLast).forEach(function (digimon) {
          listDigimonEl.innerHTML += `
          <div id="content-digimon__card" data-index="${findIndex(
            datas,
            digimon.name
          )}">
          <img loading="lazy" src="${digimon.img}" alt="" />
          <div id="content-digimon__card--desc">
          <h5 id="digimon-name">Name : ${digimon.name}</h5>
          <h5>Level : ${digimon.level}</h5>
          </div>
          </div>
          `;
        });
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }
    });
  });
}

function prevPageLev(firstNum) {
  const firstParent = firstNum;
  let Firstindex = firstParent.getAttribute("data-index");
  console.log(Firstindex);
  let numFirst = parseInt(Firstindex) - 5;
  let numLast = numFirst + 5;
  console.log(numFirst, numLast);
  const getData = getLevels(level.value);
  getData.then(function (datas) {
    console.log(datas);
    if (numFirst == 0) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "block";
      listDigimonEl.innerHTML = " ";
      datas.slice(numFirst, numLast).forEach(function (digimon) {
        listDigimonEl.innerHTML += `
        <div id="content-digimon__card" data-index="${findIndex(
          datas,
          digimon.name
        )}">
        <img loading="lazy" src="${digimon.img}" alt="" />
        <div id="content-digimon__card--desc">
        <h5 id="digimon-name">Name : ${digimon.name}</h5>
        <h5>Level : ${digimon.level}</h5>
        </div>
        </div>
        `;
      });
    } else {
      listDigimonEl.innerHTML = " ";
      datas.slice(numFirst, numLast).forEach(function (digimon) {
        listDigimonEl.innerHTML += `
        <div id="content-digimon__card" data-index="${findIndex(
          datas,
          digimon.name
        )}">
        <img loading="lazy" src="${digimon.img}" alt="" />
        <div id="content-digimon__card--desc">
        <h5 id="digimon-name">Name : ${digimon.name}</h5>
        <h5>Level : ${digimon.level}</h5>
        </div>
        </div>
        `;
      });
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  });
}
// Fetch Digimon By Level and Render it

// Fetch Digimon By Name and Render it
function getInput() {
  return fetch(`https://digimon-api.vercel.app/api/digimon/name/${input.value}`)
    .then((response) => response.json())
    .then(function (data) {
      if (data.ErrorMsg) {
        resultLevel.innerHTML = ``;
        resultLevel.innerHTML = `
      <h4>Result for "${input.value}"</h4>
      `;
        listDigimonEl.innerHTML = "";
        listDigimonEl.innerHTML += `
      <div id="not-found">
      <h2>"${input.value}" is not found! </h2>
      </div>
      `;
        input.value = "";
        return;
      } else {
        if (input.value == "") {
          listDigimonEl.innerHTML = "";
          listDigimonEl.innerHTML += `
        <div id="not-found">
        <h2>"${input.value}" is not found! </h2>
        </div>
        `;
          return;
        } else {
          return data;
        }
      }
    });
}

function renderInput() {
  resultLevel.innerHTML = "";
  resultLevel.innerHTML = `
  <h4>Result for "${input.value}"</h4>
  `;
  const inputVal = getInput();
  inputVal.then(function (data) {
    data.forEach((digimon) => {
      listDigimonEl.innerHTML = "";
      listDigimonEl.innerHTML += `
      <div id="content-digimon__card">
      <img loading="lazy" src="${digimon.img}" alt="" />
      <div id="content-digimon__card--desc">
      <h5>Name : ${digimon.name}</h5>
      <h5>Level : ${digimon.level}</h5>
      </div>
      </div>
      `;
      input.value = "";
    });
  });

  nextBtn.style.display = "none";
  prevBtn.style.display = "none";
}

btnSearch.addEventListener("click", function () {
  if (input.value == "") {
    alert("Input tidak boleh kosong!");
  } else {
    resultLevel.innerHTML = "";
    listDigimonEl.innerHTML = "";
    listDigimonEl.innerHTML += `
    <div id="loading" class="hide">
    <h2>Searching "${input.value}"</h2>
    </div>
    `;
    renderInput();
    // input.value = '';
  }
});
// End of Fetch Digimon By Name and Render it

//console.log(containerDigimonEl)
window.addEventListener("DOMContentLoaded", function () {
  renderAll();
  nextBtn.classList.add("all");
  prevBtn.classList.add("all");
});

nextBtn.addEventListener("click", function (e) {
  window.scrollTo({
    top: 0,
  });
  let lastChild = listDigimonEl.children[4];
  let target = e.target.className;
  if (target.includes("levels")) {
    console.log("Yeyyy");
    console.log(lastChild);
    nextPageLev(lastChild);
  } else if (target.includes("all")) {
    nextPage(lastChild);
  }
  console.log(target);
});

prevBtn.addEventListener("click", function (e) {
  window.scrollTo({
    top: 0,
  });
  let firstChild = listDigimonEl.children[0];
  // prevPage(firstChild);
  let target = e.target.className;
  if (target.includes("levels")) {
    console.log("Yeyyy");
    // console.log(lastChild);
    prevPageLev(firstChild);
    return;
  } else if (target.includes("all")) {
    prevPage(firstChild);
    return;
  }
  console.log(target);
});

const btnSearch = document.querySelector("#btn-search");
const input = document.querySelector("#input");
const listDigimonEl = document.querySelector("#digimon-card__cont");
const containerDigimonEl = document.querySelector("#content-digimon");
const resultLevel = document.querySelector("#result");
const loader = document.querySelector("#loading");
const level = document.querySelector("#level");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");


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
    <div id="content-digimon__card" class="item" data-index="${num++}">
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
// End of Fetch All Digimon and Render

// Fetch Digimon By Level and Render it
function getLevels(option) {
  return fetch(`https://digimon-api.vercel.app/api/digimon/level/${option}`)
    .then((response) => response.json())
    .then((data) => data);
}

function renderLevels(option) {
  resultLevel.innerHTML = "";
  resultLevel.innerHTML = `
  <h4>Result for "${level.value}"</h4>
  `;
  const getLev = getLevels(option);
  getLev.then(function (datas) {
    listDigimonEl.innerHTML = "";
    datas.forEach((digimon) => {
      listDigimonEl.innerHTML += `
        <div id="content-digimon__card">
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
  renderLevels(level.value);
  // getLevels(level.value);
});
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

renderAll();

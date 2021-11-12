const btnSearch = document.querySelector("#btn-search");
const input = document.querySelector("#input");
const listDigimonEl = document.querySelector("#digimon-card__cont");
const containerDigimonEl = document.querySelector("#content-digimon");
const resultLevel = document.querySelector("#result");
const loader = document.querySelector("#loading")

const level = document.querySelector("#level");



level.addEventListener("change", function(){
listDigimonEl.innerHTML = ""
listDigimonEl.innerHTML += `
 <div id="loading" class="hide">
        <h2>Searching All "${level.value}" Digimon</h2>
      </div>
          `
  console.log(level.text)
  getDigimonLevel(level.value)
})


function getDigimon() {
    const xhr = new XMLHttpRequest();
    
xhr.onload = function() {
        const responseJson = JSON.parse(this.responseText);
        let random = Math.floor(Math.random() * 40)
        console.log(random)
responseJson.length = random;
 // for(random; random<=responseJson.length; random++) {
         //console.log(responseJson[random])
      // }
       
        if(responseJson.error) {
           showResponseMessage(responseJson.message);
        } else {
          
renderAllDigimons(responseJson);
           console.log(responseJson)
        }
    }
    
xhr.onerror = function() {
        showResponseMessage();
    }
    
xhr.open("GET", "https://digimon-api.vercel.app/api/digimon");
     // Mengirimkan request
     xhr.send();
}

function getDigimonInput(){
  const xhr = new XMLHttpRequest();
  
  xhr.onload = function(){
    const responseJson = JSON.parse(this.responseText)
    if(responseJson.error){
      console.log(responseJson.ErrorMsg)
    } else {
      if(responseJson.ErrorMsg){
resultLevel.innerHTML = `
      <h4>Result for "${input.value}"</h4>
     `;
        listDigimonEl.innerHTML = "";
        listDigimonEl.innerHTML += `
        <div id="not-found">
        <h2>"${input.value}" is not found! </h2>
        </div>
        `;
        input.value = ""
      }else {
        if( input.value == ""){
listDigimonEl.innerHTML = "";
        listDigimonEl.innerHTML += `
        <div id="not-found">
        <h2>"${input.value}" is not found! </h2>
        </div>
        `;
        console.log("kosong")
        } else {
         renderDigimonInput(responseJson)
        input.value = ""
        }
      }
     //renderDigimonInput(responseJson)
      //console.log(responseJson.name)
     // console.log(digimonOut)
      //toggleLoading(true)
    }
  }
  
  xhr.onerror = function(){
    console.log("coba lagi")
  }
  
  xhr.open("GET", `https://digimon-api.vercel.app/api/digimon/name/${input.value}`);
  xhr.send();
}

function getDigimonLevel(option) {
  const xhr = new XMLHttpRequest();
  
  xhr.onload = function(){
    const responseJson = JSON.parse(this.responseText);
    renderDigimonLevel(responseJson);
    console.log(responseJson)
  }
    
  xhr.onerror = function() {
        showResponseMessage();
  }
    
xhr.open("GET", `https://digimon-api.vercel.app/api/digimon/level/${option}`);
     // Mengirimkan request
     xhr.send();
}

const renderAllDigimons= (digimons) => {
listDigimonEl.innerHTML = ""
      digimons.forEach(digimon => {
            listDigimonEl.innerHTML += `
    <div id="content-digimon__card" class="content-digimon__card">
       <img src="${digimon.img}" alt="" />
    <div id="content-digimon__card--desc">
  <h5>Name : ${digimon.name}</h5>
       <h5>Level : ${digimon.level}</h5>
     </div>
   </div>
           `;
       });
       
      // loadingScroll.classList.remove("")
    };
    
    
const renderDigimonInput= (digimons) => {
resultLevel.innerHTML = `
      <h4>Result for "${input.value}"</h4>
     `;
     
listDigimonEl.innerHTML = ""
      digimons.forEach(digimon => {
            listDigimonEl.innerHTML += `
            <div id="digimon-user">
    <div id="content-digimon__card">
       <img src="${digimon.img}" alt="" />
    <div id="content-digimon__card--desc">
  <h5>Name : ${digimon.name}</h5>
       <h5>Level : ${digimon.level}</h5>
     </div>
   </div>
   </div>
           `;
       });

    };
    
const renderDigimonLevel= (digimons) => {
  listDigimonEl.innerHTML = ""
 resultLevel.innerHTML = `
      <h4>Result for "${level.value}"</h4>
     `
 digimons.forEach(digimon => {
    listDigimonEl.innerHTML += `
       <div id="content-digimon__card">
         <img src="${digimon.img}" alt="" />
         <div id="content-digimon__card--desc">
         <h5>Name : ${digimon.name}</h5>
         <h5>Level : ${digimon.level}</h5>
         </div>
        </div>
           `;
       });

    };
    

btnSearch.addEventListener('click', function(){
  listDigimonEl.innerHTML = ""
listDigimonEl.innerHTML += `
 <div id="loading" class="hide">
        <h2>Searching "${input.value}"</h2>
      </div>
          `
  getDigimonInput();
})

getDigimon()
 

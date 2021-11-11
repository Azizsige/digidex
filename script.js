const btnSearch = document.querySelector("#btn-search");
const input = document.querySelector("#input");
const listDigimonEl = document.querySelector("#digimon-card__cont");
const containerDigimonEl = document.querySelector("#content-digimon");
const resultLevel = document.querySelector("#result");

const level = document.querySelector("#level");

level.addEventListener("change", function(){
  console.log(level.value)
  getDigimonLevel(level.value)
})


function getDigimon() {
    const xhr = new XMLHttpRequest();
    
xhr.onload = function() {
        const responseJson = JSON.parse(this.responseText);
        let random = Math.floor(Math.random() * 40)
        console.log(random)
        responseJson.length = random + 5
 // for(random; random<=responseJson.length; random++) {
         //console.log(responseJson[random])
      // }
       
        if(responseJson.error) {
           showResponseMessage(responseJson.message);
           toggleLoading(false)
        } else {
renderAllDigimons(responseJson);
           console.log(responseJson)
           toggleLoading(true)
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
        listDigimonEl.innerHTML = "";
        listDigimonEl.innerHTML += `
        <div id="not-found">
        <h2>"${input.value}" is not found! </h2>
        </div>
        `;
        toggleLoading(true)
      }else {
        renderDigimonInput(responseJson)
        toggleLoading(false)
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
    toggleLoading(true)
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



function toggleLoading(show){
      if(show){
        return document.querySelector("#loading").classList.add("hide")
      } else {
        return document.querySelector("#loading").classList.remove("hide")
      }
    }
    
btnSearch.addEventListener('click', function(){
  getDigimonInput()
})

getDigimon()
 

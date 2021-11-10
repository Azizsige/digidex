
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

const renderAllDigimons= (digimons) => {
        const listDigimonEl = document.querySelector("#content-digimon");
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
    
    function toggleLoading(show){
      if(show){
        return document.querySelector("#loading").classList.add("hide")
      } else {
        return document.querySelector("#loading").classList.remove("hide")
      }
    }

getDigimon()
 
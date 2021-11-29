

// function getNextDigimon() {
//   const xhr = new XMLHttpRequest();

//   xhr.onload = function() {
//     const responseJson = JSON.parse(this.responseText)
//     if (responseJson.error) {
//       showResponseMessage(responseJson.message);
//     } else { 
//       nextPage(responseJson)
//     }
//   }

//   xhr.onerror = function() {
//     showResponseMessage();
//   }

//   xhr.open("GET", "https://digimon-api.vercel.app/api/digimon");
//   // Mengirimkan request
//   xhr.send();
// }

// function nextPage(digimons){
//   alert('Hello from pagination')
// }

// nextBtn.addEventListener('click', getNextDigimon())
// console.log('Hallo dari pagination');
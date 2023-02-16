import config from "../conf/index.js";
console.log(`${config.backendEndpoint}:8082/cities`);

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  console.log("working");

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let res= await fetch(`${config.backendEndpoint}/cities`);
  let data=await res.json();
  return data;}
  catch(e){
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let data=document.getElementById("data");
  let div=document.createElement("div");
  div.className="col-6 col-lg-3 p-4"
  div.innerHTML=`<a href="pages/adventures/?city=${id}" id="${id}">
                  <div class="tile">
                  
                    <img src=${image} >
                    <div class="tile-text text-center">
                    
                      <p>${city}</p>
                      <p>${description}</p>
            
                    </div>
                    </div>
                  </a>

                 `;
   data.append(div);              

}

export { init, fetchCities, addCityToDOM };


import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let search2=search.split("=");
  return search2[1];

}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
  let res= await fetch(`${config.backendEndpoint}/adventures/?city=${city}`);
  let data= await res.json();
  console.log(data);
  return data;
  }catch(e){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let data=document.getElementById("data");
  for(let i=0;i<adventures.length;i++){
    let div= document.createElement("div");
    div.className="col-6 col-lg-3 p-3";
    div.innerHTML=`<a id=${adventures[i].id} href="detail/?adventure=${adventures[i].id}" >
                    <div class="activity-card">
                    <div class="category-banner">${adventures[i].category}</div>
                    <img src=${adventures[i].image} >
                    <div class="d-flex flex-column p-2" style="width:100%">
                    <div class="d-flex justify-content-between ">
                    <p>${adventures[i].name}</p>
                    <p>₹${adventures[i].costPerHead}</p>
                    </div>
                    <div class="d-flex justify-content-between ">
                    <p class="mb-0">Duration</p>
                    <p class="mb-0">${adventures[i].duration}</p>
                    </div>
                    </div>

                   </div>
                   <a>`;
    data.append(div);               

  }

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let list2=[];
  list.forEach(e => {
    if(e.duration>=low && e.duration<=high){
    list2.push(e);
    }
    

    
  });
  return list2;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let list1=[];
  for(let i=0;i<list.length;i++){
    for(let j=0;j<categoryList.length;j++)
    {
      if(list[i].category===categoryList[j])
      list1.push(list[i]);

    }
  }
  return list1;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  // console.log(filters);
  // let list1=filterByCategory(list,filters.category);
  // if(list1.length==0)
  // return list;
  // else
  // return list1;
  // let list1=filterByCategory(list,filters.category);
  // let list2;
  // let list3=[];
  // if(list1.length==0&& list2.length==0)
  // return list;
  // else if(list1.length!=0&&list2.length==0)
  // return list1;
  // else if(list1.length==0&&list2.length!=0)
  // return list2;
  // else{
  //   for(let i=0;i<Math.min(list1.length,list2.length);i++){
  //     if(JSON.stringify(list1[i])==JSON.stringify(list2[i]))
  //     list3.push(list1[i]);
  //   }

    
  // }
  
  let catlist;
  let durlist;
  let newlist=[];
  let dsplit=filters.duration.split("-");
  let low=parseInt(dsplit[0],10);
  let high=parseInt(dsplit[1],10);
  if(filters.duration==""&&filters.category.length==0){
  return list;
  }
  else if(filters.duration!=""&&filters.category.length==0)
  {
   
    return filterByDuration(list,low,high);
    

  }
  else if(filters.duration==""&&filters.category.length!=0)
  {
    catlist=filterByCategory(list,filters.category);
    return catlist;


  }
  else{
    catlist=filterByCategory(list,filters.category);
    durlist=filterByDuration(list,low,high);
    catlist.forEach((e)=>{
      durlist.forEach(e1=>{
        if(e1.id==e.id)
        newlist.push(e);

      })
    })
    return newlist;

  }
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  console.log(filters);
  localStorage.setItem("filters",JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let json=JSON.parse(localStorage.getItem("filters"));
  console.log(json);
  
  


  // Place holder for functionality to work in the Stubs
  return json;
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log(filters,"pills");
  let list=document.getElementById("category-list");
  for(let i=0;i<filters.category.length;i++){
    let div=document.createElement("div");
    div.className="category-filter";
    div.textContent=filters.category[i];
    list.append(div);
  }
  let dur=document.getElementById("duration-select");
  dur.value=filters.duration;
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};

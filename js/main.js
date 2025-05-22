let elCountrySelect = document.querySelector(".choose-select")
let elCountryList = document.querySelector(".country-list")
let elSearchInput = document.querySelector(".search-input")
let elDarkMode = document.querySelector('#darkMBtn');
let elLikeCount = document.querySelector(".like-count")
let elSaveCount = document.querySelector(".save-count")


let likeList = []
let saveList = []
//Create Option
function createOptionFn (){
    countries.forEach(item => {
        let elOption = document.createElement("option")
        elOption.className ="bg-[var(--text-bg)]"
        elOption.textContent = item.capital
        elOption.value = item.capital.toLowerCase()
        elCountrySelect.appendChild(elOption)
         
    })
}
createOptionFn ()

//Render Product
function renderProduct (arr, list){
    list.innerHTML = null
    arr.forEach(item => {
        let elItem = document.createElement ("li")
       elItem.className = "relative w-[264px] rounded-[5px] shadow-md shadow-blue-300 mx-auto sm:mx-0"

        elItem.innerHTML =`
        <img class="!h-[160px] !w-[260px] object-cover" src="${item.flag}" alt="photo" width="267"  height="160"/>
       <div class=" p-[24px] ">
       <strong class="font-extrabold inline-block text-[18px] text-[var(--color-text)] mb-[16px]">${item.name}</strong>
       <p class="text-[var(--color-text)]"> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Population: </span> ${item.population.toLocaleString("ru-RU")}</p>
     <p class="text-[var(--color-text)]"> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Region: </span> ${item.name}</p>
    <p class="text-[var(--color-text)]"> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Capital: </span> ${item.capital}</p>
       </div>
       <div class="flex justify-between px-[24px] pb-[20px]">
       <button onclick="handleLikeClick(${item.id})" class=" ${item.isLiked ? "bg-red-500 text-white border-red-500" : "border-slate-500"} text-[var(--color-text)] border-[1.5px]  rounded-md w-[30%] cursor-pointer hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">Like</button>
       <button onclick="handleSaveClick(${item.id})" class=" ${item.isSaved ? "bg-purple-500 text-white border-purple-500" : "border-slate-500"} text-[var(--color-text)] border-[1.5px]  rounded-md w-[30%] cursor-pointer hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">Save</button>
       

       <button class="more-btn text-[var(--color-text)] border-[1.5px] border-slate-500 rounded-md w-[30%] cursor-pointer hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">More</button>
<div class="modal-container hidden">
  <div class="modal ">
    <p class="text-[16px] text-[var(--color-text)]"><strong>Name:</strong> <span class="text-[14px] text-[var(--color-text)]">${item.name}</span></p>
    <p class="text-[16px] text-[var(--color-text)]"><strong>Population:</strong> <span class="text-[14px] text-[var(--color-text)]">${item.population.toLocaleString("ru-RU")}</span></p>
    <p class="text-[16px] text-[var(--color-text)]"><strong>Capital:</strong> <span class="text-[14px] text-[var(--color-text)]">${item.capital}</span></p>
    <p class="text-[16px] text-[var(--color-text)]"><strong>Region:</strong> <span class="text-[14px] text-[var(--color-text)]">${item.name}</span></p>
    <button class="close-btn hidden mt-4 text-sm bg-red-500 border border-transparent text-white px-3 py-1 rounded-[5px] hover:bg-transparent hover:border-red-500 hover:text-red-500 duration-300">Close</button>
  </div>
</div>
        `
        list.appendChild(elItem)
    })
}
renderProduct(countries, elCountryList)

//Search, select function
function SearchAndSelect (value, currentValue){
 if(value == "name"){
   let filteredArr = countries.filter(item => item[`${value}`].toLowerCase().includes(currentValue.toLowerCase()))
 renderProduct(filteredArr, elCountryList)
 }
 else{
    if(currentValue == "all"){
        renderProduct(countries, elCountryList)
    }
    else{
        let filteredArr = countries.filter(item => item[`${value}`].toLowerCase() == (currentValue.toLowerCase()))
       renderProduct(filteredArr, elCountryList)
    }
 }
}

//Search
elSearchInput.addEventListener("input", (evt) => SearchAndSelect("name", evt.target.value))
//Select
elCountrySelect.addEventListener("change", (evt) => SearchAndSelect("capital", evt.target.value))


//Like btn 
function handleLikeClick(id){
    let findObj = countries.find(item => item.id == id)
    findObj.isLiked = !findObj.isLiked
    renderProduct(countries, elCountryList)
    elLikeCount.textContent = countries.filter(item => item.isLiked).length
}

function handleLikeBtnClick() {
    let likeList = countries.filter(item => item.isLiked)
    renderProduct(likeList, elCountryList)
}

//Save btn
function handleSaveClick(id){
    let findObj = countries.find(item => item.id == id)
    findObj.isSaved = !findObj.isSaved
    renderProduct(countries, elCountryList)
    elSaveCount.textContent = countries.filter(item => item.isSaved).length
}
function handleSaveBtnClick() {
    let saveList = countries.filter(item => item.isSaved)
    renderProduct(saveList, elCountryList)
}

//dark mode
  elDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });


//More btn 
let moreButtons = document.querySelectorAll(".more-btn");
let closeButtons = document.querySelectorAll(".close-btn");
let modals = document.querySelectorAll(".modal-container");

moreButtons.forEach((btn, item) => {
  btn.addEventListener("click", () => {
    modals[item].classList.remove("hidden");
    closeButtons[item].classList.remove("hidden");
  });
});

closeButtons.forEach((btn, item) => {
  btn.addEventListener("click", () => {
    modals[item].classList.add("hidden");
    btn.classList.add("hidden");
  });
});

let elCountrySelect = document.querySelector(".choose-select")
let elCountryList = document.querySelector(".country-list")
let elSearchInput = document.querySelector(".search-input")
let elDarkMode = document.querySelector('#darkMBtn');
let elLikeCount = document.querySelector(".like-count")
let elSaveCount = document.querySelector(".save-count")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")


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
       <button onclick="handleMoreBtnClick(${item.id})" class="more-btn text-[var(--color-text)] border-[1.5px] border-slate-500 rounded-md w-[30%] cursor-pointer hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">More</button>
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
function handleMoreBtnClick (id){
  elModalWrapper.classList.remove("scale-0")
  let findObj = countries.find(item => item.id == id)
  console.log(findObj)
  elModalInner.innerHTML = `
  <div class="flex justify-between items-center">
  <img class="sm:w-[60%] w-[50%]" src="${findObj.flag}" alt="Single flag" width="400" height="300" />
  <div class="w-[40%] text-end">
      <strong class="sm:font-extrabold font-medium inline-block text-[15px] sm:text-[16px] text-[var(--color-text)] mb-[16px]">${findObj.name}</strong>
       <p class="text-[var(--color-text)] leading-[16px]  text-[14px]"> <span class="sm:font-semibold font-normal   text-[14px] leading-[16px] text-[var(--color-text)]">Population: </span> ${findObj.population.toLocaleString("ru-RU")}</p>
      <p class="text-[var(--color-text)] leading-[16px]  text-[14px]"> <span class="sm:font-semibold  font-normal text-[14px] leading-[16px] text-[var(--color-text)]">Region: </span> ${findObj.name}</p>
      <p class="text-[var(--color-text)] leading-[16px]  text-[14px]"> <span class="sm:font-semibold font-normal  text-[14px] leading-[16px] text-[var(--color-text)]">Capital: </span> ${findObj.capital}</p>
  </div>
  </div>
  `
}
elModalWrapper.addEventListener("click", function(e){
  if(e.target.id){
    elModalWrapper.classList.add("scale-0")
  }
})

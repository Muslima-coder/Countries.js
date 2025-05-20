let elCountrySelect = document.querySelector(".choose-select")
let elCountryList = document.querySelector(".country-list")
let elSearchInput = document.querySelector(".search-input")

//Create Option
function createOptionFn (){
    countries.forEach(item => {
        let elOption = document.createElement("option")
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
        elItem.className = "w-[264px] rounded-[5px] shadow-md shadow-blue-300 mx-auto sm:mx-0"

        elItem.innerHTML =`
        <img class="!h-[160px] !w-[260px] object-cover" src="${item.flag}" alt="photo" width="267"  height="160"/>
       <div class=" p-[24px] ">
       <strong class="font-extrabold inline-block text-[18px] text-[var(--color-text)] mb-[16px]">${item.name}</strong>
       <p> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Population: </span> ${item.population.toLocaleString("ru-RU")}</p>
     <p> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Region: </span> ${item.name}</p>
    <p> <span class="font-semibold text-[14px] leading-[16px] text-[var(--color-text)]">Capital: </span> ${item.capital}</p>
       </div>
       <div class="flex justify-between px-[24px] pb-[20px]">
       <button class="border-[1.5px] border-slate-500 rounded-md w-[30%]  hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">Like</button>
       <button class="border-[1.5px] border-slate-500 rounded-md w-[30%]  hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">Save</button>
       <button class="border-[1.5px] border-slate-500 rounded-md w-[30%]  hover:w-[31%]  hover:border-blue-500 hover:text-blue-500 duration-300">More</button>
       </div>
       
        `

        list.appendChild(elItem)
    })
}
renderProduct(countries, elCountryList)

//Search
elSearchInput.addEventListener("input", function (){
    let searchValue = elSearchInput.value.toLowerCase()
    let filteredSearchValue = countries.filter(item => item.name.toLowerCase().includes(searchValue) ||
    item.population.toString().includes(searchValue))
    renderProduct(filteredSearchValue, elCountryList)

})

//Select

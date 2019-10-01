//const apiurl=`https://api.edamam.com/search?q=chicken,tomato,mozzarella&app_id=99c40f2e&app_key=a3d4da4b17ae857fc24756ac89d98778&excluded=garlic`;
const APIURL = `https://api.edamam.com/search?app_id=99c40f2e&app_key=a3d4da4b17ae857fc24756ac89d98778&q=`;
const button = document.querySelector("#search-button");

document.querySelector("#searchForm").style.visibility = "hidden";

function showSearch() {
  document.querySelector("#searchForm").style.visibility = "visible";
  document.querySelector("#search-form-top").style.visibility = "hidden";
}
button.addEventListener("click", async function () {

  let query = validateInput();
  if (query.length === 0) return;
  const response = await axios.get(APIURL + query);
  console.log(response);
  let dinnerItems = response.data.hits;
  const masonry = document.querySelector(".masonry");
  masonry.innerHTML = "";
  for (let i = 0; i < dinnerItems.length; i++) {

    masonry.innerHTML += `<div class="recipe-item">
    <img src="${dinnerItems[i].recipe.image}">
    <div class="recipe-item-sub">
    <h1>${dinnerItems[i].recipe.label}</h1>
            <h2>Calories: ${dinnerItems[i].recipe.calories}</h2>
            <h2>Label: ${dinnerItems[i].recipe.dietLabels}</h2>
            <h2>Source: ${dinnerItems[i].recipe.source}</h2>
            <a href="${dinnerItems[i].recipe.url}">Goto Recipe</a>
            <label class="collapsible">
            <input type="checkbox" />
            <span class="collapser">Ingredients:</span>
            <span class="arrow">&gt;</span>
            <div class="collapsed">${dinnerItems[i].recipe.ingredientLines}</div>
            </label>
            <h2>Prep Time: ${dinnerItems[i].recipe.totalTime}</h2>  
            </div>  
    </div>`;
    document.querySelector('.masonry').scrollIntoView({
      behavior: 'smooth'
    })
  }


})
/* <h2>${data.hits[i].recipe.ingredientLines}</h2>
<h2>HealthLabel: ${data.hits[i].recipe.healthLabels}</h2>
<h2>Nutrients: ${data.hits[i].recipe.totalNutrients}</h2>  */
function validateInput() {
  let includedFood = document.getElementById("included-food").value;
  let excludedFood = document.getElementById("excluded-food").value;
  if (includedFood.length < 1) {
    alert("You need to enter at least one food item.", "FOOD for THOUGHT");
    return '';
  }
  let inc = includedFood.split('\n');

  let retVal = "";
  for (var i = 0; i < inc.length; i++) {
    retVal += inc[i].replace(" ", "+") + ","
  }
  retVal = retVal.substring(0, retVal.length - 1);

  if (excludedFood.length > 0) {
    retVal += "&excluded=";
    let exc = excludedFood.split('\n');
    for (var i = 0; i < exc.length; i++) {
      retVal += exc[i].replace(" ", "+") + ","
    }
    retVal = retVal.substring(0, retVal.length - 1);
  }
  return retVal;

}

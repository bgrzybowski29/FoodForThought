//const apiurl=`https://api.edamam.com/search?q=chicken,tomato,mozzarella&app_id=99c40f2e&app_key=a3d4da4b17ae857fc24756ac89d98778&excluded=garlic`;
const APIURL = `https://api.edamam.com/search?app_id=99c40f2e&app_key=a3d4da4b17ae857fc24756ac89d98778&q=`;
const button = document.querySelector("#search-button");

document.querySelector("#searchForm").style.visibility = "hidden";
buildRecipes("Recommendations", getRandomIngredients(3), 5);
function showSearch() {
  document.querySelector("#searchForm").style.visibility = "visible";
  document.querySelector("#search-form-top").style.visibility = "hidden";
}
button.addEventListener("click", async function () {
  let query = validateInput();
  if (query.length === 0) return;
  buildRecipes("Search Results", query, 10);
  document.querySelector('#data-section').scrollIntoView({ behavior: 'smooth' });
})

async function buildRecipes(lblResults, queryString, numOfResults) {
  const response = await axios.get(APIURL + queryString + `&to=${numOfResults}`);
  console.log(response);
  let dinnerItems = response.data.hits;
  const masonry = document.querySelector(".masonry");
  masonry.innerHTML = "";
  for (let i = 0; i < dinnerItems.length; i++) {
    masonry.innerHTML += `<div class="recipe-item">
    <img src="${dinnerItems[i].recipe.image}">
    <div class="recipe-item-sub">
    <h1>${dinnerItems[i].recipe.label}</h1>
            <h2>Calories: ${Math.round(dinnerItems[i].recipe.calories)}</h2>
            <h2>Label: ${dinnerItems[i].recipe.dietLabels}</h2>
            <h2>Source: ${dinnerItems[i].recipe.source}</h2>
            <a href="${dinnerItems[i].recipe.url}">Goto Recipe</a>
            <label class="collapsible">
            <input type="checkbox" />
            <span class="collapser">Ingredients:</span>
            <span class="arrow">&gt;</span>
            <div class="collapsed">${dinnerItems[i].recipe.ingredientLines}</div>
            </label>
            <label class="collapsible">
            <input type="checkbox" />
            <span class="collapser">Health Labels:</span>
            <span class="arrow">&gt;</span>
            <div class="collapsed">${dinnerItems[i].recipe.healthLabels}</div>
            <h2>Prep Time: ${dinnerItems[i].recipe.totalTime}</h2>  
            </div>  
    </div>`;
  }
  document.querySelector("#data-section").innerHTML = `${lblResults}: ${queryString}`;
}

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
function getRandomIngredients(num) {
  const arrIngredients = [
    'Beef', 'Beans', 'Chicken', 'Chocolate', 'Apple', 'orange', 'venison', 'Mushrooms',
    'Pasta', 'Pork', 'Potatoes', 'Poultry', 'Rice', 'Salmon', 'Seafood', 'Shrimp',
    'Tofu', 'Tempeh', 'Turkey'];
  let ingredientsList = "";
  let selectedIngredients = [];
  for (let i = 0; i < num; i++) {
    let selectedIngredient = arrIngredients[Math.floor(Math.random() * arrIngredients.length)];
    while (selectedIngredients.includes(selectedIngredient)) {
      selectedIngredient = arrIngredients[Math.floor(Math.random() * arrIngredients.length)];
    }
    ingredientsList += selectedIngredient;
    selectedIngredients.push(selectedIngredient);
    if ((num - 1) !== i) ingredientsList += ',';
  }
  return ingredientsList;
}
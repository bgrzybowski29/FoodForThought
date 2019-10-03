const APIURL = `https://api.edamam.com/search?app_id=99c40f2e&app_key=a3d4da4b17ae857fc24756ac89d98778&q=`;

//get both buttons
const button = document.querySelector("#search-button");
const contactButton = document.querySelector("#contact-submit");
//set the search and contact elements hidden
document.querySelector("#searchForm").style.visibility = "hidden";
document.querySelector(".contact-container").style.visibility = "hidden";

//create recommendations
buildRecipes("Recommendations", getRandomIngredients(2), 5);

//shows search and hides top element
function showSearch() {
  document.querySelector("#searchForm").style.visibility = "visible";
  document.querySelector("#search-form-top").style.visibility = "hidden";
}

//event listener for search
button.addEventListener("click", async function () {
  //validate user input
  let query = validateInput();
  if (query.length === 0) return;
  //create the results based on the inputs
  buildRecipes("Search Results", query, 10);
  //scroll to the results
  document.querySelector('#data-section').scrollIntoView({ behavior: 'smooth' });
})

//show the contact form
function showContact() {
  document.querySelector(".contact-container").style.visibility = "visible";
}
//show about
function showAbout() {
  alert("FoodForThought by Ben Grzybowski 2019.");
}

//event listener for contact click
contactButton.addEventListener("click", async function () {
  document.querySelector(".contact-container").style.visibility = "hidden";
})

//build the recipes element
async function buildRecipes(lblResults, queryString, numOfResults) {
  //API call
  const response = await axios.get(APIURL + queryString + `&to=${numOfResults}`);
  let dinnerItems = response.data.hits;
  //get the element that will hold the results
  const masonry = document.querySelector(".masonry");
  masonry.innerHTML = "";
  //loop to build results
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
  //get included and excluded lists from user input
  let includedFood = document.getElementById("included-food").value;
  let excludedFood = document.getElementById("excluded-food").value;
  //alert the user that they must add one item
  if (includedFood.length < 1) {
    alert("You need to enter at least one food item.", "FOOD for THOUGHT");
    return '';
  }
  //split the included list to and array
  let inc = includedFood.split('\n');
  //variable for return value
  let retVal = "";
  //loop through the included list, replacing an empty string with a '+'
  for (var i = 0; i < inc.length; i++) {
    retVal += inc[i].replace(" ", "+") + ","
  }
  //strip the trailing comma
  retVal = retVal.substring(0, retVal.length - 1);

  //loop through the included list, replacing an empty string with a '+'
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
  //Array of ingredients
  const arrIngredients = [
    'Beef', 'Beans', 'Chicken', 'Chocolate', 'Apple', 'orange', 'venison', 'Mushrooms',
    'Pasta', 'Pork', 'Potatoes', 'Poultry', 'Rice', 'Salmon', 'Seafood', 'Shrimp',
    'Tofu', 'Tempeh', 'Turkey'];
  //variable for return value
  let ingredientsList = "";
  //selected ingredients array. this is to get distinct items in return
  let selectedIngredients = [];
  //loop on the number supplied in the input
  for (let i = 0; i < num; i++) {
    //get a random ingredient from ingredients array
    let selectedIngredient = arrIngredients[Math.floor(Math.random() * arrIngredients.length)];
    //logic to ensure I get a distinct ingredient
    while (selectedIngredients.includes(selectedIngredient)) {
      selectedIngredient = arrIngredients[Math.floor(Math.random() * arrIngredients.length)];
    }
    //add new ingredient to return list
    ingredientsList += selectedIngredient;
    //add new ingredient to selected array
    selectedIngredients.push(selectedIngredient);
    //add a comma if it is not the last item
    if ((num - 1) !== i) ingredientsList += ',';
  }
  return ingredientsList;
}
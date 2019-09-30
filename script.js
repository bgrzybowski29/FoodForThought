//const apiurl=`https://api.edamam.com/search?q=chicken,tomato,mozzarella&app_id=99c40f2e&app_key=a3d4da4b17ae857fc24756ac89d98778&excluded=garlic`;
const apiurl=`https://api.edamam.com/search?q=egg,ham,peppers&app_id=99c40f2e&app_key=a3d4da4b17ae857fc24756ac89d98778`;
const button = document.querySelector("button");


button.addEventListener("click", async function () {
  const response =  await axios.get(apiurl);
  console.log(response);
  let dinnerItems=response.data.hits;
  const masonry = document.querySelector(".masonry");
for(let i=0;i<dinnerItems.length;i++)
{

    masonry.innerHTML+=`<div class="item">
    <img src="${dinnerItems[i].recipe.image}">
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
    </div>`;
}
   

})
/* <h2>${data.hits[i].recipe.ingredientLines}</h2>
<h2>HealthLabel: ${data.hits[i].recipe.healthLabels}</h2>
<h2>Nutrients: ${data.hits[i].recipe.totalNutrients}</h2>  */
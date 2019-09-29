##Title
###Description
Food For Thought is a dinner helper application built on html, css and javascript.It solves the problem ofnot knowing what to make for dinner. It will provide some recommendations and also allow the users to search by food items they already have and exclude ones the don't want.

###Wireframes
#####Main
![](/Users/bengrzybowski/Documents/pagetop.png)
#####Bottom
![](/Users/bengrzybowski/Documents/pagebottom.png)
#####Get Started\Search
![](/Users/bengrzybowski/Documents/search.png)
#####Search Results(replaces recommendations)
![](/Users/bengrzybowski/Documents/results.png)
#####Mobile
![](/Users/bengrzybowski/Documents/mobile.png)

###API
This app will call the recipes API from https://www.edamam.com/. The app will be calling the search API.
###Features
* Provide 3 recommendations - the app will contain multiple arrays containing a protein and veg. On load of page a random protein and veg combo will be selected and call the api so that unique recommendations will return each visit. 
* User can search on 1 or more items they desire or already have.
* User can exclude items they don't like or cannot have.
* 10 search results will be displayed on page and will be responsive to resizing.
* Recommended and searched recipes will display Title, Ingredients, Recipe link, Picture, Servings, Calories, Nutrients, and Diet label(s).
* Ingredients an Nutrients are lists. They will be collapsible.

###Stretch goals
* Add scrolling picture on main page background.
* Add style transition when search is clicked
* Allow user to search by other paramters.
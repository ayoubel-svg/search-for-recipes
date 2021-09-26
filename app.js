const myRecipes = document.querySelector(".myRecipes");
const searchBar = document.querySelector(".input");
const searchBtn = document.querySelector(".fa-search");

let foodRecipe = {
  apiKey: "8c9207ef80f7063356140af302be5aab",
  appId: "39377567",
  fetchRecieps: function (recipe) {
    fetch(
      "https://api.edamam.com/search?q=" +
        recipe +
        "&to=100&app_id=" +
        this.appId +
        "&app_key=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayData(data));
  },
  displayData: function (data) {
    this.generetHtml(data.hits);
  },
  generetHtml: function (results) {
    results.map((result) => {
      let myCalories = Math.floor();
      // creat Div
      let newDiv = document.createElement("newDiv");
      newDiv.classList.add("newDiv");
      myRecipes.appendChild(newDiv);
      //creat img
      let myImg = document.createElement("img");
      myImg.classList.add("myImg");
      myImg.src = result.recipe.image;
      newDiv.appendChild(myImg);
      //creat title
      let myTitle = document.createElement("h2");
      myTitle.classList.add("myTitle");
      myTitle.innerHTML = result.recipe.label;
      newDiv.appendChild(myTitle);
      //creat Div for cal & ingre
      let myDiv = document.createElement("div");
      myDiv.classList.add("myDiv");
      newDiv.appendChild(myDiv);
      //creat the divider
      let divider = document.createElement("span");
      divider.classList.add("divider");
      myDiv.appendChild(divider);
      //creat cal
      let calories = document.createElement("span");
      calories.classList.add("calories");
      calories.innerHTML =
        "Calories" + " " + Math.floor(result.recipe.calories * 0.24);
      myDiv.appendChild(calories);
      //creat ingredient
      let ingredient = document.createElement("span");
      ingredient.classList.add("ingredient");
      ingredient.innerHTML =
        "Ingredient" + " " + result.recipe.ingredientLines.length;
      myDiv.appendChild(ingredient);
      //creat a
      let myA = document.createElement("a");
      myA.classList.add("myA");
      myA.setAttribute("href", result.recipe.url);
      myA.innerHTML = "View Recipe";
      newDiv.appendChild(myA);
    });
  },
  search: function () {
    foodRecipe.fetchRecieps(searchBar.value);
  },
};

searchBar.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    foodRecipe.search();
  }
  if (searchBar.value == "") {
    location.reload();
  }
});

searchBtn.addEventListener("click", () => {
  foodRecipe.search();
});

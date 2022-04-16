//fetch recipe on click
$("#foodBtn").click(function (e) {
  // food API variable and fetch request
  const foodAPI = "https://www.themealdb.com/api/json/v1/1/random.php?&=1";
  fetch(foodAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        
        //assign api fields to a data object
        const foodData = data.meals[0];
        const foodDataObj = {
          recipeName: foodData.strMeal,
          recipeCategory: foodData.strCategory,
          recipeImg: foodData.strMealThumb,
          recipeVideo: foodData.strYoutube,
          recipeDirections: foodData.strInstructions
          };
          foodHtml(foodDataObj)
        makeMeal(data.meals[0]);
      });
    }
  });
});

//function to get a list of all ingredients and their measurements
const makeMeal = (meal) => {
  const ingredients = [];

    const ingredUl = $(`<ul></ul>`)
    $('#ingredients-food').append(ingredUl)
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
          $("#ingredients-food").append($(`<li>${meal[`strMeasure${i}`]} | ${meal[`strIngredient${i}`]}</li>`))
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  console.log(ingredients);
};

//fetch drink recipe on click
$("#drinkBtn").click(function (e) {
  // food API variable and fetch request
  const drinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php?=1";
  fetch(drinkAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
        drinkData = data.drinks[0]
        //assign api fields to a data object
        const drinkDataObj = {
            drinkName: drinkData.strDrink,
            drinkCategory: drinkData.strCategory,
            drinkAlcoholic: drinkData.drinkAlcoholic, 
            drinkGlass: drinkData.drinkGlass,
            drinkImg: drinkData.strDrinkThumb,
            drinkDirections: drinkData.strInstructions
        }
        drinkHtml(drinkDataObj)
        makeDrink(data.drinks[0]);
      });
    }
  });
});

const makeDrink = (drink) => {
  const drinkIngredients = [];
    const ingredUl = $(`<ul></ul>`)
  for (let i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      drinkIngredients.push(
        $("#ingredients-drink").append($(`<li>${drink[`strMeasure${i}`]} | ${drink[`strIngredient${i}`]}</li>`))
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  console.log(drinkIngredients);
};

const foodHtml = (foodDataObj) =>
{
    const foodImg = $(`<div id="food-div"></div>`)
    console.log(foodDataObj.recipeDirections)
    const foodDir = $(`<p>${foodDataObj.recipeDirections}</p>`)
    $("#directions-food").append(foodDir)
    foodImg.append($(`<img src="${foodDataObj.recipeImg}">`))
    const foodLink = $(`<a href="${foodDataObj.recipeVideo}" target="_blank">Link</a>`)
    console.log(foodDataObj.recipeVideo)
    $("#links").append(foodLink)
    $("#foodImg").append(foodImg)
}
const drinkHtml = (drinkDataObj) =>
{
    const drinkImg = $(`<div id="drink-div"></div>`)
    console.log(drinkDataObj.drinkDirections)
    const drinkDir = $(`<p>${drinkDataObj.drinkDirections}</p>`)
    $("#directions-drink").append(drinkDir)
    drinkImg.append($(`<img src="${drinkDataObj.drinkImg}">`))
    const drinkLink = $(`<a href="${drinkDataObj.drinkVideo}" target="_blank">Link</a>`)
    console.log(drinkDataObj.drinkVideo)
    $("#links").append(drinkLink)
    $("#drinkImg").append(drinkImg)
}

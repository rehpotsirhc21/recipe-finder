var preFoodDrink = []
var favFoods = []
var favDrinks = []
//fetch recipe on click
$("#foodBtn").click(function (e) {
  // food API variable and fetch request
  const foodAPI = "https://www.themealdb.com/api/json/v1/1/random.php?&=1";
  fetch(foodAPI).then(function (response) {
    if (response.ok) { 
        // clears all divs from food-details children
        $('#food-details').children('div').empty()
        // console.log(response);
      response.json().then(function (data) {
       

        // console.log(data)

        //assign api fields to a data object
        const foodData = data.meals[0];
        const foodDataObj = {
          recipeId: foodData.idMeal,
          recipeName: foodData.strMeal,
          recipeCategory: foodData.strCategory,
          recipeImg: foodData.strMealThumb,
          recipeVideo: foodData.strYoutube,
          recipeDirections: foodData.strInstructions
          };
          htmlInsert(foodDataObj)

          // auto opens detail drop down tab
          $("#food-details").attr('open', 'open')
        makeMeal(data.meals[0]);
      });
    }
  });
});

//function to get a list of all ingredients and their measurements
const makeMeal = (meal) => {
  const ingredients = [];


    const ingredUl = $(`<ul class="justify-center"></ul>`)

    $('#ingredients-recipe').append(ingredUl)
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(

          ingredUl.append($(`<li>${meal[`strMeasure${i}`]} | ${meal[`strIngredient${i}`]}</li>`))

      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
//   console.log(ingredients);
};

//fetch drink recipe on click
$("#drinkBtn").click(function (e) {
  // food API variable and fetch request
  const drinkAPI = "https://www.thecocktaildb.com/api/json/v1/1/random.php?=1";
  fetch(drinkAPI).then(function (response) {
      // clears all divs from drink-details children
      $('#drink-details').children('div').empty()
    if (response.ok) {
      response.json().then(function (data) {

        console.log(data);

        drinkData = data.drinks[0];
        //assign api fields to a data object
        const drinkDataObj = {
            drinkId: drinkData.idDrink,
            drinkName: drinkData.strDrink,
            drinkCategory: drinkData.strCategory,
            drinkAlcoholic: drinkData.drinkAlcoholic, 
            drinkGlass: drinkData.drinkGlass,
            drinkImg: drinkData.strDrinkThumb,
            drinkDirections: drinkData.strInstructions
        }
          htmlInsert(drinkDataObj)

          console.log(drinkDataObj)
          $("#drink-details").attr('open', 'open')
        makeDrink(data.drinks[0]);
      });

    }
  });
});

const makeDrink = (drink) => {
  const drinkIngredients = [];

  const ingredUl = $(`<ul class="justify-center"></ul>`)
  $('#ingredients-drink').append(ingredUl)
  for (let i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      drinkIngredients.push(
        $(ingredUl).append($(`<li>${drink[`strMeasure${i}`]} | ${drink[`strIngredient${i}`]}</li>`))

      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  //console.log(drinkIngredients);
};
// grabs the object from what button you pressed
const htmlInsert = (item) =>
{

    console.log(item.recipeName)
    var type = []
    var itemLink
    // check what button was pressedgit

    if (item.recipeName)
    {
        // if food button pressed
        type = [ "recipe", item.recipeDirections, item.recipeImg, item.recipeVideo]
        console.log(type[1])
        const itemLink = $(`<a href="${type[3]}" target="_blank">Link</a>`)
        $("#links").append(itemLink)

      $("#food").text(item.recipeName)
      $("#food-summary").text(item.recipeName)
      const foodFav = $(`<div id="food-heart">Heart</div>`)
      $("#food-fav").append(foodFav)
      $("#food-heart").click(function ()
      {
        console.log("food fav " + item.recipeName)
      })
    }
    if (item.drinkName)
    {
        // if drink button was pressed
        type = ["drink", item.drinkDirections, item.drinkImg]
      $('#drink').text(item.drinkName)
      $("#drink-summary").text(item.drinkName)
      const drinkFav = $(`<div id="drink-heart">heart</div>`)
      $("#drink-fav").append(drinkFav)
      $("#drink-heart").click(function ()
      {
        console.log("drink fav " + item.drinkName)
      })
    }
    const itemImg = $(`<div id="${type[0]}-div"></div>`)
    console.log(item)
    const itemDir = $(`<p>${type[1]}</p>`)
    $(`#directions-${type[0]}`).append(itemDir)
    itemImg.append($(`<img src="${type[2]}" width="200">`))
    $(`#${type[0]}Img`).append(itemImg)
}

function renderPreviousSearch(item){
  var name
  if (item.drinkName){
    var name = item.drinkName
    preFoodDrink.push(item.drinkId)
  }
  if (item.recipeName){
    var name = item.recipeName
    preFoodDrink.push(item.recipeId)
    localStorage.setItem("Food Id's ", JSON.stringify(preFoodDrink))
  }
  const preLiItem = $(`<li>${name}</li>`)
  $("#pre").prepend(preLiItem)
  console.log($("#pre").children("li").length)
  if ($("#pre").children("li").length >= 9){
      console.log("working")
    $("#pre").find("li:last").remove()
    }
  }
function renderFavorite(item){
  var name
  var list
  if (item.drinkName){
    var name = item.drinkName
    var list = $("#favDrink")
    favDrinks.push(item.drinkId)
    localStorage.setItem("Favorite Drink's", JSON.stringify(favDrinks))
  }
  if (item.recipeName){
    var name = item.recipeName
    var list = $("#favFood")
    favFoods.push(item.recipeId)
    localStorage.setItem("Favorite Foods", JSON.stringify(favFoods))
  }
  const preLiItem = $(`<li>${name}</li>`)
  list.append(preLiItem)
}
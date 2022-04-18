// var preFoodDrink = []
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

        //console.log(data);

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

          //console.log(drinkDataObj)
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
        renderFavorite(item)
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
        renderFavorite(item)
      })
    }
    const itemImg = $(`<div id="${type[0]}-div"></div>`)
    console.log(item)
    const itemDir = $(`<p>${type[1]}</p>`)
    $(`#directions-${type[0]}`).append(itemDir)
    itemImg.append($(`<img src="${type[2]}" width="200">`))
  $(`#${type[0]}Img`).append(itemImg)
  renderPreviousSearch(item)
}

function renderPreviousSearch(item){
  var idClass
  var preFoodDrink = JSON.parse(localStorage.getItem("PreviousId"))
  if (!preFoodDrink)
  {
    preFoodDrink = []
  }
  loadPre(preFoodDrink);
  if (item.drinkName){
    // var name = item.drinkName
    var idClass = 'drink'
    
    preFoodDrink.push(item.drinkName)
    console.log(preFoodDrink)
    removeStorage(preFoodDrink)
    localStorage.setItem("PreviousId", JSON.stringify(preFoodDrink))
    const preLiItem = $(`<li class="${idClass}">${item.drinkName}</li>`)
    $("#pre").prepend(preLiItem)
    console.log(preLiItem)
  }
  if (item.recipeName)
  {
    var idClass = "food"
    loadPre(preFoodDrink);
    const preLiItem = $(`<li class="${idClass}">${item.recipeName}</li>`)
    $("#pre").prepend(preLiItem)

    // var name = item.recipeName
    // loadPre(preFoodDrink);
    preFoodDrink.push(item.recipeName)
    removeStorage(preFoodDrink)
    localStorage.setItem("PreviousId", JSON.stringify(preFoodDrink))
    
  }
  if ($("#pre").children('li').length >= 9)
    {
      $("#pre").find("li:last").remove()
      
    }
  // const preLiItem = $(`<li class="${idClass}">${name}</li>`)
  // $("#pre").prepend(preLiItem)
  // console.log($("#pre").children("li").length)
  // $("#pre").empty()
  // for (let i = 0; i < preFoodDrink.length; i++)
  // {
  //   // var name = preFoodDrink.textContent
  //   console.log(preFoodDrink[i])
  //   const favLi = $(`<li class="${idClass}">${preFoodDrink}</li>`)
  //   $("#pre").prepend(favLi)
    
  // }
  // if ($("#pre").children("li").length >= 9)
  // {
    
  //     console.log("working")
  //   $("#pre").find("li:last").remove()
  // }
  
  }
function renderFavorite(item){
  var name
  var list
  var id
  if (item.drinkName)
  {
    var idClass = "drink"
    var name = item.drinkName
    var list = $("#favDrink")
    favDrinks.push(item.drinkId)
    localStorage.setItem("Favorite Drink's", JSON.stringify(favDrinks))
  }
  if (item.recipeName)
  {
    var idClass = 'food'
    var name = item.recipeName
    var list = $("#favFood")
    favFoods.push(item.recipeId)
    localStorage.setItem("Favorite Foods", JSON.stringify(favFoods))
  }
  const preLiItem = $(`<li class="${idClass}">${name}</li>`)
  list.append(preLiItem)
}

// gets li clicked on
$("#nav").on("click", 'li', function (e)
{
  // checks if it is a food item
  console.log($(this).attr('class'))
  if ($(this).attr('class') === "food")
  {
    console.log($(this).text())
    var foodItem = $(this).text()
    console.log("yep")
    const foodClickAPI = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodItem}`
    // uses item name to call an api fetch for that item
    fetch(foodClickAPI)
      .then((response) => response.json())
      .then((data) =>
      {
        $('#food-details').children('div').empty()
        const foodData = data.meals[0];
        const foodDataObj = {
          recipeId: foodData.idMeal,
          recipeName: foodData.strMeal,
          recipeCategory: foodData.strCategory,
          recipeImg: foodData.strMealThumb,
          recipeVideo: foodData.strYoutube,
          recipeDirections: foodData.strInstructions
        };
      // inserts objects item on dom
        htmlInsert(foodDataObj)
      })

  }
    // checks if it is a drink item
  if ($(this).attr('class') === "drink")
  {
    var drinkItem = $(this).text()
    console.log("nope")
    const drinkClickAPI = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkItem}`
        // uses item name to call an api fetch for that item
    fetch(drinkClickAPI)
      .then((response) => response.json())
      .then((data) =>
      {
        console.log(data)
        $('#drink-details').children('div').empty()
        const drinkData = data.drinks[0];
        const drinkDataObj = {
          drinkId: drinkData.idDrink,
            drinkName: drinkData.strDrink,
            drinkCategory: drinkData.strCategory,
            drinkAlcoholic: drinkData.drinkAlcoholic, 
            drinkGlass: drinkData.drinkGlass,
            drinkImg: drinkData.strDrinkThumb,
            drinkDirections: drinkData.strInstructions
        };
        console.log(drinkDataObj)
            // inserts objects item on dom
        htmlInsert(drinkDataObj)
      })
  }
})
var removeStorage = function (arry)
{
  // console.log(arry)
  if (arry.length >= 9)
  {
    arry.splice(0, 1)
    }
}
var loadPre = function (preFoodDrink)
{
  if (preFoodDrink)
  {
    var preKey = JSON.parse(localStorage.getItem("PreviousId"))

  preFoodDrink = preKey
  console.log(preKey)

  }
  else
  {
      var preFoodDrink = []
  }
  return preFoodDrink
  
  
  
  
  
  
}
var preFoodDrink = JSON.parse(localStorage.getItem("PreviousId"))
console.log(preFoodDrink)
var setLoaded = function ()
{
  for (let i = 0; i < preFoodDrink.length; i++) {
    const element = $(`<li>${preFoodDrink[i]}</li>`);
    $("#pre").prepend(element)
    console.log(preFoodDrink[i])
    
  }
}
setLoaded()

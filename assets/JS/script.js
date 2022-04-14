
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
        };
        makeMeal(data.meals[0]);
      });
    }
  });
});

//function to get a list of all ingredients and their measurements
const makeMeal = (meal) => {
  const ingredients = [];
  
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strMeasure${i}`]} | ${meal[`strIngredient${i}`]}`
      );
    } else {
      // Stop if no more ingredients
      break;
    }
  }
  console.log(ingredients)
};

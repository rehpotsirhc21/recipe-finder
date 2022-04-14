
// food API variable and fetch request
const foodAPI = 'https://www.themealdb.com/api/json/v1/1/random.php?&=1';

fetch(foodAPI).then(function(response){
    if(response.ok) {
        response.json().then(function(data){
            console.log(data)
        })
    }
})
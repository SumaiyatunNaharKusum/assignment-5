const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
  //Clear previous result
  document.getElementById("mealsContainer").innerHTML = "";
  //get user input
  const userInput = document.getElementById("userInput").value;
  const url =
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + userInput;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.meals.forEach((meal) => {
        displayMeals(meal);
      });
    })
    .catch((error) => {
      document.getElementById(
        "mealsContainer"
      ).innerHTML = `<h2 style='color: white;'>Sorry! Your search Item is not found!</h2>`;
      document.getElementById("mealDetails").innerHTML = "";
    });
});

const displayMeals = (meal) => {
  const mealItem = document.createElement("div");
  mealItem.setAttribute("class", "mealItem");
  mealItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    `;
  document.getElementById("mealsContainer").appendChild(mealItem);
  displayMealDetail(meal, mealItem);
};

const displayMealDetail = (meal, mealItem) => {
  mealItem.addEventListener("click", () => {
    const mealDetail = document.getElementById("mealDetails");
    //clear previous result
    mealDetail.innerHTML = "";
    //display detail
    mealDetail.innerHTML = `
            <img src="${meal.strMealThumb}" alt="">
            <h1>${meal.strMeal}</h1>
            <h3>Ingredients</h3>
        `;

    //get ingredients
    const mealProperties = Object.keys(meal);
    mealProperties
      .filter((property) => {
        return (
          /strIngredient/.test(property) &&
          meal[property] != null &&
          meal[property] != ""
        );
      })
      .map((ingredient) => {
        const measure = "strMeasure" + ingredient.slice(13);
        const p = document.createElement("p");
        p.innerHTML = `<span style='color: tomato;'>☑</span> ${meal[measure]} ${meal[ingredient]}`;
        mealDetail.appendChild(p);
      });
    //document.getElementById('mealsContainer').prepend(mealDetail);
    document.getElementsByTagName("body")[0].prepend(mealDetail);
  });
};

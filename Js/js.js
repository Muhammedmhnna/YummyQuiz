
function openSideNav() {
    $(".nav-menu").animate({
        left: 0
    }, 500)
    $(".nav-icon").removeClass("fa-align-justify");
    $(".nav-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    const width = $(".nav-menu .nav-tab").outerWidth()
    $(".nav-menu").animate({
        left: -width
    }, 600)
    $(".nav-icon").addClass("fa-align-justify");
    $(".nav-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 100
    }, 500)
}
$(".nav-menu i.nav-icon").click(() => {
    if ($(".nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

closeSideNav();


let allData = $("#dataHere")
let searchContainer = document.getElementById("searchContainer");

$(document).ready(() => {
    searchByName("").then(() => {
        $("body").css("overflow", "visible")
    })
})

function displayMeals(arr) {
    let allMeals = "";

    $.each(arr, function (index, meal) {
        allMeals += `
        <div class="col-md-3">
            <div onclick="getMealDetails('${meal.idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${meal.strMealThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-white p-2">
                    <h4>${meal.strMeal}</h4>
                </div>
            </div>
        </div>
        `;
    });

    $(allData[0]).html(allMeals);
}



$("#categoryHere").on("click", function () {
    closeSideNav();
    $(allData[0]).empty();
    $(searchContainer).empty();

    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/categories.php',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            displayCategories(response.categories); 
        },
        error: function (error) {
            console.error('Error fetching categories:', error);
        }
    });
})

function displayCategories(arr) {
    let allMeals = "";
    $.each(arr, function (index, category) {
        allMeals += `
        <div class="col-md-3">
            <div onclick="getCategoryMeals('${category.strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                <img class="w-100" src="${category.strCategoryThumb}" alt="" srcset="">
                <div class="meal-layer position-absolute text-center text-white p-2">
                    <h3>${category.strCategory}</h3>
                    <p>${category.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
            </div>
        </div>
        `;
    });

    $(allData[0]).html(allMeals);
}

function getCategoryMeals(category) {
    $(allData[0]).empty();
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            displayMeals(response.meals.slice(0, 20)); 
        },
        error: function (error) {
            console.error('Error fetching category meals:', error);
        }
    });
}


$("#areaHere").on("click", function () {
    closeSideNav();
    $(allData[0]).empty();
    $(searchContainer).empty();

    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response.meals);
            displayArea(response.meals);
        },
        error: function (error) {
            console.error('Error fetching areas:', error);
        }
    });
})

function displayArea(arr) {
    let allMeals = "";
    $.each(arr, function (index, area) {
        allMeals += `
        <div class="col-md-3">
            <div onclick="getAreaMeals('${area.strArea}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-house-laptop fa-4x"></i>
                <h3>${area.strArea}</h3>
            </div>
        </div>
        `;
    });

    $(allData[0]).html(allMeals);
}

function getAreaMeals(area) {
    $(allData[0]).empty();
    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            displayMeals(response.meals.slice(0, 20));
        },
        error: function (error) {
            console.error('Error fetching area meals:', error);
        }
    });
}

$("#ingredientsHere").on("click", function () {
    closeSideNav();
    $(allData[0]).empty();
    $(searchContainer).empty();

    $.ajax({
        url: 'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            console.log(response.meals);
            displayIngredients(response.meals.slice(0, 20));
        },
        error: function (error) {
            console.error('Error fetching ingredients:', error);
        }
    });
})



function displayIngredients(arr) {
    let allMeals = "";

    $.each(arr, function (index, ingredient) {
        allMeals += `
        <div class="col-md-3">
            <div onclick="getIngredientsMeals('${ingredient.strIngredient}')" class="rounded-2 text-center cursor-pointer">
                <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                <h3>${ingredient.strIngredient}</h3>
                <p>${ingredient.strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
        `;
    });

    $(allData[0]).html(allMeals);
}

function getIngredientsMeals(ingredients) {
    $(allData[0]).empty();

    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            displayMeals(response.meals.slice(0, 20));
        },
        error: function (error) {
            console.error('Error fetching ingredient meals:', error);
        }
    });
}


function getMealDetails(mealID) {
    closeSideNav();
    $(allData[0]).empty();
    $(searchContainer).empty();

    $.ajax({
        url: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`,
        method: 'GET',
        dataType: 'json',
        success: function (response) {
            displayMealDetails(response.meals[0]);
        },
        error: function (error) {
            console.error('Error fetching meal details:', error);
        }
    });
}

function displayMealDetails(meal) {
    $('#searchContainer').html("");

    let ingredients = "";

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`;
        }
    }

    let tags = meal.strTags ? meal.strTags.split(",") : [];
    let tagsStr = '';
    
    tags.forEach(tag => {
        tagsStr += `<li class="alert alert-danger m-2 p-1">${tag}</li>`;
    });

    let allData = `
    <div class="col-md-4">
        <img class="w-100 rounded-3" src="${meal.strMealThumb}" alt="">
        <h2>${meal.strMeal}</h2>
    </div>
    <div class="col-md-8">
        <h2>Instructions</h2>
        <p>${meal.strInstructions}</p>
        <h3><span class="fw-bolder">Area: </span>${meal.strArea}</h3>
        <h3><span class="fw-bolder">Category: </span>${meal.strCategory}</h3>
        <h3>Recipes:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${ingredients}
        </ul>

        <h3>Tags:</h3>
        <ul class="list-unstyled d-flex g-3 flex-wrap">
            ${tagsStr}
        </ul>

        <a href="${meal.strSource}" target="_blank" class="btn btn-success">Source</a>
        <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger">YouTube</a>
    </div>`;

    $('#dataHere').html(allData);

    
    $('a.btn').off('click').on('click', function(event) {
        event.preventDefault();
        let url = $(this).attr('href');

        window.open(url, '_blank');
        

    });
}




$("#searchHere").on("click", function () {
    closeSideNav();
    $(allData[0]).empty();

    let searchInputs = `
    <div class="row py-5">
        <div class="col-md-6">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFLetter(this.value)" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>`;

    $(searchContainer).html(searchInputs);
});




async function searchByName(term) {
    closeSideNav();
    $(allData[0]).empty();

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const meals = (await response.json()).meals || [];

    displayMeals(meals);
}


async function searchByFLetter(term) {
    closeSideNav();
    $(allData[0]).empty();

    const fetchTerm = term || "a";
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${fetchTerm}`);
    const meals = (await response.json()).meals || [];

    displayMeals(meals);
}


$("#contactHere").on("click", function () {
    closeSideNav();
    $(allData[0]).empty();
    $(allData[0]).html(`<div class="contact d-flex justify-content-center align-items-center flex-column w-100">
        <h2 class="p-2 text-center display-4">Join Us Now</h2>
        <p class="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente, magni!</p>

        <div class="row g-3 d-flex">
            <div class="col-md-6">
                <div>
                    <input type="text" class="form-control p-2" placeholder="Enter Your Name" id="name">
                </div>
                <div class="nameError p-3 my-2 rounded-3 d-none">
                    <p class="m-0 text-center">Special characters and numbers not allowed</p>
                </div>
            </div>

            <div class="col-md-6">
                <div>
                    <input type="text" class="form-control p-2" placeholder="Enter Your Email" id="email">
                </div>
                <div class="emailError p-3 my-2 rounded-3 d-none">
                    <p class="m-0 text-center">Email not valid *exemple@yyy.zzz</p>
                </div>
            </div>

            <div class="col-md-6">
                <div>
                    <input type="text" class="form-control p-2" placeholder="Enter Your Phone" id="phone">
                </div>
                <div class="phoneError p-3 my-2 rounded-3 d-none">
                    <p class="m-0 text-center">Enter valid Phone Number</p>
                </div>
            </div>

            <div class="col-md-6">
                <div>
                    <input type="number" class="form-control p-2" placeholder="Enter Your Age" id="age">
                </div>
                <div class="ageError p-3 my-2 rounded-3 d-none">
                    <p class="m-0 text-center">Enter valid Age</p>
                </div>
            </div>

            <div class="col-md-6">
                <div>
                    <input type="password" class="form-control p-2" placeholder="Enter Your Password" id="password">
                </div>
                <div class="passError p-3 my-2 rounded-3 d-none">
                    <p class="m-0 text-center">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
                </div>
            </div>

            <div class="col-md-6">
                <div>
                    <input type="password" class="form-control p-2" placeholder="Re-password" id="repassword">
                </div>
                <div class="repassError p-3 my-2 rounded-3 d-none">
                    <p class="m-0 text-center">Passwords do not match. Please try again.</p>
                </div>
            </div>
        </div>
        <button class="btn formBtn btn-outline-danger w-25 mx-auto my-4 disabled">
            Join Now
        </button>
    </div>`)
    
    $("#name").on("input", function () {
        if (nameValidation()) {
            $(".nameError").removeClass("d-block").addClass("d-none");
        } else {
            $(".nameError").removeClass("d-none").addClass("d-block");
        }
        updateSubmitButtonState();
    });

    $("#email").on("input", function () {
        if (emailValidation()) {
            $(".emailError").removeClass("d-block").addClass("d-none");
        } else {
            $(".emailError").removeClass("d-none").addClass("d-block");
        }
        updateSubmitButtonState();
    });

    $("#phone").on("input", function () {
        if (phoneValidation()) {
            $(".phoneError").removeClass("d-block").addClass("d-none");
        } else {
            $(".phoneError").removeClass("d-none").addClass("d-block");
        }
        updateSubmitButtonState();
    });

    $("#age").on("input", function () {
        if (ageValidation()) {
            $(".ageError").removeClass("d-block").addClass("d-none");
        } else {
            $(".ageError").removeClass("d-none").addClass("d-block");
        }
        updateSubmitButtonState();
    });

    $("#password").on("input", function () {
        if (passwordValidation()) {
            $(".passError").removeClass("d-block").addClass("d-none");
        } else {
            $(".passError").removeClass("d-none").addClass("d-block");
        }
        updateSubmitButtonState();
    });

    $("#repassword").on("input", function () {
        if (repasswordValidation()) {
            $(".repassError").removeClass("d-block").addClass("d-none");
        } else {
            $(".repassError").removeClass("d-none").addClass("d-block");
        }
        updateSubmitButtonState();
    });
});


function nameValidation() {
    return /^[A-Za-z]+$/.test($("#name").val());
}

function emailValidation() {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test($("#email").val());
}

function phoneValidation() {
    return /^\+?\d{1,4}[-.\s]?(\d{3}[-.\s]?\d{3,4})$/.test($("#phone").val());
}

function ageValidation() {
    return /^(1[01][0]|[1-9]?[0-9])$/.test($("#age").val());
}

function passwordValidation() {
    return /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test($("#password").val());
}

function repasswordValidation() {
    return $("#repassword").val() == $("#password").val();
}


function updateSubmitButtonState() {
    const isFormValid = nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation();
    
    const submitBtn = $(".btn");
    if (isFormValid) {
        submitBtn.removeClass("disabled").removeClass("btn-outline-danger").addClass("btn-primary");
    } else {
        submitBtn.addClass("disabled").removeClass("btn-primary").addClass("btn-outline-danger");
    }
}


$(document).on("click", ".btn", function () {
    if (!$(this).hasClass("disabled")) {
        const formData = {
            name: $("#name").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            age: $("#age").val(),
            password: $("#password").val()
        };
        localStorage.setItem("formData", JSON.stringify(formData));
        clearInputs();
    }
});

function clearInputs() {
    $("#name").val("");
    $("#email").val("");
    $("#phone").val("");
    $("#age").val("");
    $("#password").val("");
    $("#repassword").val("");

    const submitBtn = $(".formBtn");
    submitBtn.addClass("disabled").removeClass("btn-primary").addClass("btn-outline-danger");
}

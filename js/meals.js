
let meals = {
    'Cereal':{'type':'breakfast_alex', 'number':7, 'ingredients':['cereal', 'almond milk']},
    'Oatmeal':{'type':'breakfast_michelle', 'number':7, 'ingredients':['oatmeal','honey','banana','blueberries']},
    'Smoothie':{'type':'breakfast_michelle', 'number':7, 'ingredients':['greek yogurt','frozen berries','banana']},
    'Banana Pancakes':{'type':'breakfast_michelle', 'number':7, 'ingredients':['2 eggs','banana']},
    'Mug omelette':{'type':'breakfast_michelle', 'number':7, 'ingredients':['10 eggs','2 tomatoes','1 red onion','1 bag of spinach']},
    'Omelettes':{'type':'weekend_breakfast', 'number':7, 'ingredients':['12 eggs','shredded cheese','omelette ingredients']},

    'Sandwich':{'type':'lunch_alex', 'number':7, 'ingredients':['bread', 'deli meat', 'sliced cheese', 'lettuce', 'mustard', 'mayonnaise']},
    'Kale and chickpea salad':{'type':'lunch_michelle', 'number':7, 'ingredients':['1 bag kale','3 cans chickpeas','tahini','3 lemons']},
    'Kale mediterranean salad':{'type':'lunch_michelle', 'number':7, 'ingredients':['1 bag kale','tomato','cucumber','red onion','1 bag carrots']},
    'Spring rolls':{'type':'lunch_michelle', 'number':7, 'ingredients':[]},
    'Veggie sandwich':{'type':'lunch_michelle', 'number':7, 'ingredients':['bread', 'greens', '3 tomatoes', 'cucumber', 'avocado', 'sliced provolone', 'tofu', 'mayonaise', 'mustard']},

    'Stuffed peppers':{'type':'dinner', 'number':2, 'ingredients':['4 bell peppers','1 can black beans','1 can kidney beans','4 yellow onions','6 cloves garlic','28 oz can of whole tomatoes','shredded cheese']},
    'Jambalaya':{'type':'dinner', 'number':3, 'ingredients':["celery","1 yellow onion","1 green bell pepper","2 cloves garlic","sausage","dried oregano","dried thyme","smoked paprika","cayenne pepper","28 oz diced tomatoes","parsley","2 cups chicken broth","2 cups rice","3 green onions"]},
    'Lentil soup':{'type':'dinner', 'number':2, 'ingredients':['1 yellow onion','4 carrots','celery','4 cloves garlic','1 bag green lentils','15 oz can diced tomatoes','15 oz can crushed tomatoes','4 cups vegetable broth']},
    'Chili':{'type':'dinner', 'number':2, 'ingredients':['1 red onion','1 red bell pepper','2 carrots','celery','6 cloves garlic','28 oz diced tomatoes','28 oz black beans','15 oz kidney beans','2 cups vegetable broth','1 bay leaf','cilantro'], 'link':'https://cookieandkate.com/vegetarian-chili-recipe/'},
    'Enchiladas':{'type':'dinner', 'number':2, 'ingredients':['dried chilis','2 cups vegetable broth','shredded cheese','tortillas','1 can black beans','1 bell pepper','1 yellow onion']},
    'Fajitas':{'type':'dinner', 'number':3, 'ingredients':['tortillas','chicken','shredded cheese','2 bell peppers','2 yellow onions','3 tomatoes','cilantro','salsa','sour cream']},
    'Zucchini lasagna':{'type':'dinner', 'number':2, 'ingredients':['white onion', 'garlic', '28oz can crushed tomato', 'tomato paste', '16oz ricotta cheese', '1 egg', 'fresh parsley', 'parmesan cheese', 'basil', 'zucchini', 'yellow squash', 'mozzarella cheese']},

    'Seltzer':{'type':'miscellaneous', 'number':0, 'ingredients':['seltzer']},
};

let meal_types = {
    "breakfast_michelle": "Breakfast (Michelle)",
    "breakfast_alex": "Breakfast (Alex)",
    "lunch_michelle": "Lunch (Michelle)",
    "lunch_alex": "Lunch (Alex)",
    "weekend_breakfast": "Weekend breakfast",
    "dinner": "Dinner",
    "miscellaneous": "Miscellaneous",
}

// console.log(meals);

function add_checks(meal_type_id, meals) {
    let meal_type_node = document.getElementById(meal_type_id);

    Object.keys(meals).forEach(function(meal) {
        // console.log(meal);

        // create checkbox with label
        let option = document.createElement("input");
        option.setAttribute("type", "checkbox");
        option.setAttribute("id", meal_type_id+"|"+meal);
        option.setAttribute("onchange", "updateTotals();groceryList();");
        let label = document.createElement("label");
        label.setAttribute("for", meal_type_id+"|"+meal);
        label.innerHTML = meal + " ("+meals[meal]['number']+")";

        let checkbox_div = document.createElement("div");
        checkbox_div.appendChild(option);
        checkbox_div.appendChild(label);

        // add checkbox to meal node
        meal_type_node.appendChild(checkbox_div);
    });

}
// console.log(breakfasts);
// console.log(Object.keys(breakfasts));

// let breakfasts = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'breakfast' ));
// let lunches = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'lunch' ));

let breakfast_michelle = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'breakfast_michelle' ));
let breakfast_alex = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'breakfast_alex' ));
let lunch_michelle = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'lunch_michelle' ));
let lunch_alex = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'lunch_alex' ));

let dinners = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'dinner' ));
let weekend_breakfast = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'weekend_breakfast' ));
let miscellaneous = Object.fromEntries(Object.entries(meals).filter(([k,v]) => v['type'] == 'miscellaneous' ));

add_checks("breakfast_michelle", breakfast_michelle);
add_checks("breakfast_alex", breakfast_alex);
add_checks("lunch_michelle", lunch_michelle);
add_checks("lunch_alex", lunch_alex);
add_checks("dinner", dinners);
add_checks("weekend_breakfast", weekend_breakfast);
add_checks("miscellaneous", miscellaneous);


function updateTotals() {
    for (const meal_type in meal_types) {
        var this_meal_checked = document.querySelectorAll("#"+meal_type+" :checked");
        // console.log(meal_type, x);
        let total = 0;
        for (let node of this_meal_checked) {
            let meal_id = node.id.split("|")[1];
            total += meals[meal_id]['number'];
        }

        let progress_bar = document.querySelector("#"+meal_type+" .progress-bar");
        progress_bar.style.width = (total/7*100)+"%";
        if(meal_type == "miscellaneous") {
            progress_bar.style.width = "100%";
        }
        progress_bar.innerHTML = total+" / 7";
    }
}

function groceryList() {
    var selected_meals = document.querySelectorAll(":checked");
    let all_foods = [];
    for (let node of selected_meals) {
        let meal_id = node.id.split("|")[1];
        let meal = meals[meal_id];

        // console.log(meal_id);
        all_foods = all_foods.concat(meal['ingredients']);
    }
    let grocery_list = document.getElementById("grocery_list");
    grocery_list.innerHTML = all_foods.join("<br/>");
}

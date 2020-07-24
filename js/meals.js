let aisles = ['Produce','Meat','Seafood','Meal Kits','Deli','Dairy','Beverages','Bread & Bakery','Frozen','Rice, Grains, Pasta & Beans','Baking & Cooking Needs','Condiments & Sauces','Soups & Canned Goods','Snacks & Candy','Breakfast & Cereal','Alcoholic Beverages','Laundry, Paper & Cleaning','Office, Home & Garden','Health & Beauty','Baby & Childcare','Pet Store']

let meals = {
    'Cereal':{'type':'breakfast_alex', 'servings':7, 'ingredients':[[1,'','cereal'],[1,'','almond milk']]},
    'Oatmeal':{'type':'breakfast_michelle', 'servings':7, 'ingredients':[[1,'','oatmeal'],[1,'','honey'],[1,'','banana'],[1,'','blueberries']]},
    'Smoothie':{'type':'breakfast_michelle', 'servings':7, 'ingredients':[[1,'','greek yogurt'],[1,'','frozen berries'],[1,'','banana']]},
    'Banana Pancakes':{'type':'breakfast_michelle', 'servings':7, 'ingredients':[[2,'','eggs'],[1,'','banana']]},
    'Mug omelette':{'type':'breakfast_michelle', 'servings':7, 'ingredients':[[10,'','eggs'],[2,'','tomato'],[1,'','red onion'],[1,'bag','spinach']]},
    'Omelettes':{'type':'weekend_breakfast', 'servings':7, 'ingredients':[[12,'','eggs'],[1,'','shredded cheese'],[1,'','omelette ingredients']]},
    'Frittata':{'type':'weekend_breakfast', 'servings':7, 'ingredients':[[3,'','red potato'],[6,'','eggs'],[1,'','yellow onion'],[3,'clove','garlic'],[1,'','tomato'],[0.5,'','bell pepper'],[1,'','shredded cheese'],[1,'','mixed greens']]},
    'Granola bars':{'type':'breakfast_michelle', 'servings':7, 'ingredients':[[1,'','peanut butter'], [1,'','maple syrup'], [1,'','puffed brown rice'], [1,'','oats'], [1,'','chia seeds'], [1,'','hemp seeds'], [1,'','pumpkin seeds'], [1,'','fruit']]},
    'Vegan pancakes':{'type':'weekend_breakfast', 'servings':7, 'ingredients':[[1,'cup','flour'], [2,'tablespoons','sugar'],[1,'tbsp','baking powder'], [1,'cup','non dairy milk'],[1,'tbsp','apple cider vinegar'], [1,'tsp','vanilla'], [1,'','maple syrup'], [1, '','blueberries']]},

    'Sandwich':{'type':'lunch_alex', 'servings':7, 'ingredients':[[1,'','bread'],[1,'','deli meat'],[1,'','sliced cheese'],[1,'','lettuce'],[1,'','mustard'],[1,'','mayonnaise']]},
    'Kale and chickpea salad':{'type':'lunch_michelle', 'servings':7, 'ingredients':[[1,'bag','kale'],[3,'can','chickpeas'],[1,'','tahini'],[3,'','lemon']]},
    'Kale mediterranean salad':{'type':'lunch_michelle', 'servings':7, 'ingredients':[[1,'bag','kale'],[1,'','tomato'],[1,'','cucumber'],[1,'','red onion'],[1,'bag','carrots']]},
    'Spring rolls':{'type':'lunch_michelle', 'servings':7, 'ingredients':[[1,'','mixed greens'],[1,'','cucumber'],[1,'','bean sprouts'],[1,'','chicken']]},
    'Veggie sandwich':{'type':'lunch_michelle', 'servings':7, 'ingredients':[[1,'','bread'],[1,'','mixed greens'],[3,'','tomato'],[1,'','cucumber'],[1,'','avocado'],[1,'','sliced provolone'],[1,'','tofu'],[1,'','mayonnaise'],[1,'','mustard']]},

    'Stuffed peppers':{'type':'dinner', 'servings':2, 'ingredients':[[4,'','bell pepper'],[1,'can','black beans'],[1,'can','kidney beans'],[4,'','yellow onion'],[6,'clove','garlic'],[28,'oz','canned whole tomatoes'],[1,'','shredded cheese']]},
    'Jambalaya':{'type':'dinner', 'servings':3, 'ingredients':[[1,'','celery'],[1,'','yellow onion'],[1,'','green bell pepper'],[2,'clove','garlic'],[1,'','sausage'],[28,'oz','canned diced tomatoes'],[1,'','parsley'],[2,'cup','chicken broth'],[2,'cup','rice'],[3,'','green onion']]},
    'Lentil soup':{'type':'dinner', 'servings':2, 'ingredients':[[1,'','yellow onion'],[4,'','carrot'],[1,'','celery'],[4,'clove','garlic'],[1,'bag','green lentils'],[15,'oz','canned diced tomatoes'],[15,'oz','canned crushed tomatoes'],[4,'cup','vegetable broth']]},
    // https://cookieandkate.com/vegetarian-chili-recipe/
    'Chili':{'type':'dinner', 'servings':2, 'ingredients':[[1,'','red onion'],[1,'','red bell pepper'],[2,'','carrots'],[1,'','celery'],[6,'clove','garlic'],[28,'oz','canned diced tomatoes'],[28,'oz','canned black beans'],[15,'oz','canned kidney beans'],[2,'cup','vegetable broth'],[1,'','bay leaf'],[1,'','cilantro']]},
    'Enchiladas':{'type':'dinner', 'servings':2, 'ingredients':[[1,'','dried chilis'],[2,'cup','vegetable broth'],[1,'','shredded cheese'],[1,'','tortillas'],[15,'oz','canned black beans'],[1,'','bell pepper'],[1,'','yellow onion']]},
    'Fajitas':{'type':'dinner', 'servings':3, 'ingredients':[[1,'','tortillas'],[1,'','chicken'],[1,'','shredded cheese'],[2,'','bell pepper'],[2,'','yellow onion'],[3,'','tomato'],[1,'','cilantro'],[1,'','salsa'],[1,'','sour cream'],[2,'','lime']]},
    'Zucchini lasagna':{'type':'dinner', 'servings':2, 'ingredients':[[1,'','white onion'],[1,'','garlic'],[28,'oz','canned crushed tomato'],[1,'','tomato paste'],[16,'oz','ricotta cheese'],[1,'','eggs'],[1,'','parsley'],[1,'','parmesan cheese'],[1,'','basil'],[1,'','zucchini'],[1,'','yellow squash'],[1,'','mozzarella cheese']]},
    'Vegan ramen':{'type': 'dinner', 'servings':2, 'ingredients':[[1,'','ramen noodles'], [1,'','zucchini'], [1,'','sesame oil'], [2, 'tbsp','ginger'], [6,'cloves','garlic'], [2,'','shallots'], [6,'cups','vegetable stock'], [1,'','shitake mushrooms'], [1,'','miso paste'], [1,'','bok choy'], [1,'','bean sprouts'], [1,'','green onion'], [1,'','chili oil'], [1,'','black garlic oil']]},

    'Seltzer':{'type':'miscellaneous', 'servings':7, 'ingredients':[[1,'','seltzer']]},
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
        label.innerHTML = meal + " ("+meals[meal]['servings']+")";

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
            total += meals[meal_id]['servings'];
        }

        let progress_bar = document.querySelector("#"+meal_type+" .progress-bar");
        progress_bar.style.width = (total/7*100)+"%";
        // if(meal_type == "miscellaneous") {
        //     progress_bar.style.width = "100%";
        // }
        progress_bar.innerHTML = total+" / 7";
    }
}

function groceryList() {
    var selected_meals = document.querySelectorAll(":checked");
    // let food_dict = [];
    // for (let node of selected_meals) {
    //     let meal_id = node.id.split("|")[1];
    //     let meal = meals[meal_id];

    //     // console.log(meal_id);
    //     food_dict = food_dict.concat(meal['ingredients']);
    // }
    // let grocery_list = document.getElementById("grocery_list");
    // grocery_list.innerHTML = food_dict.join("<br/>");
    let food_dict = {};
    for (let node of selected_meals) {
        let meal_id = node.id.split("|")[1];
        let meal = meals[meal_id];

        meal['ingredients'].forEach(function(ingredient) {
            let count = ingredient[0];
            let units = ingredient[1];
            let ingredient_name = ingredient[2];
            let name = units+" "+ingredient_name;

            if(name in food_dict) {
                food_dict[name] += count;
            }
            else {
                food_dict[name] = count;
            }
            // console.log(ingredient);
        });

        // console.log(meal_id);
        // food_dict = food_dict.concat(meal['ingredients']);
    }
    let food_list = [];
    Object.keys(food_dict).map(function(name, index) {
        food_list.push(food_dict[name]+" "+name);
    });
    let grocery_list_element = document.getElementById("grocery_list");
    grocery_list_element.innerHTML = food_list.join("<br/>");
}

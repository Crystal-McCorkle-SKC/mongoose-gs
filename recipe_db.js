//const is just another let 
//we declare a constant variable called mongoose
//we set it equal to the return value of require('mongoose'); 
const mongoose = require('mongoose'); 

//access the connect method of the mongoose object
//pass in the localhost test database
//and some options inside of another object
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

//make another constant variable called db
//and we set it equal to the connection property of our mongoose object 
const db = mongoose.connection;

//but then we access the on and once methods of our connection property from our mongoose object
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    //your tutorial and new code go here. 
    console.log("We're connected");

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false, otherwise get a deprecation warning
//at top of terminal code 
mongoose.set('useFindAndModify', false);

    /* schema  */
    //this creates the ingredient Schema (which is an object used inside of the recipe--ingredients schema)
    const ingredientSchema = new mongoose.Schema({
        name: String,
        measurement: String,
        amount: Number
    });
    //this creates a new schema called recipeSchema
    const recipeSchema = new mongoose.Schema({
        name: String,
        description: String,
        ingredients: [ingredientSchema],
        instructions: String,
    }); 

   

    /* model */ 
    //this sets the const variable to Recipe for the model
    //the first argument is the name of the collection that will be created for the model
    //the second arguement, recipeSchema is the schema that will be used in creating
    //the model 
     const Recipe = mongoose.model("Recipe", recipeSchema); 

     //recipe instance of the Recipe model 
     let recipe = new Recipe; 

    /* documents */ 
    //documents in mongodb are the same as rows/tables, they are the instances of the models
    //this is setting a variable (stoneSoupObj) to an object with different properties i.e. name, description, etc (this is actually creating our data)
    let stoneSoupObj =  {
        name: "Stone Soup",
        description: "A soup made by tricked villagers",
        ingredients: [
            { name: "Carrots", 
            measurement: "Cups",
            amount: 5 
            },

            {name: "Onions",
            measurement: "Cups",
            amount: 5
            },

            {name: "Whatever you want",
            measurement: "Cups",
            amount: 5 
            }
        ]
    }; 

    //creating a variable, stoneSoup and setting it equal to the stoneSoupObj Recipe 
    //object
    let stoneSoup = new Recipe(stoneSoupObj);

    //this is setting a variable (popcornObj) to an object with different properties i.e. name, description, etc (this is actually creating our data)
    let popcornObj =  {
        name: "Popcorn",
        description: "Microwave Popcorn",
        //creates an array with an object inside 
        ingredients: [
            { name: "Bag of popcorn", 
            measurement: "Whole bag",
            amount: 1 
            },
        ]
    }; 

    //creating a variable, popcorn and setting it equal to the popcornObj Recipe  
    //object
    let popcorn = new Recipe(popcornObj);

    //this is setting a variable (pbjSandwichpObj) to an object with different properties i.e. name, description, etc (this is actually creating our data)
    let pbjSandwichObj =  {
        name: "PB&J Sandwich",
        description: "Classic PB&J Sandwich",
        ingredients: [
            { name: "Bread", 
            amount: 2 
            },

            {name: "Peanut Butter",
            measurement: "Tablespoon",
            amount: 3
            },

            {name: "Grape Jelly",
            measurement: "Tablespoon",
            amount: 2
            }
        ]
    }; 

    //creates the pbjSandwich instance, creating a variable, pbjSandwich and setting it equal to the pbjSandwichObj 
    //Recipe object
    let pbjSandwich = new Recipe(pbjSandwichObj);

    //this saves the pbj recipe to the database and prints it
    //if there is an error, prints the error 
    pbjSandwich.save()
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error(err)
        })

    //fetch a record that was just created (READ)
    //uses the search term PB&J Sandwich--then prints to the terminal (using promise) or gives 
    //an error message if there is an error 
    Recipe
        .find ({
            name: "PB&J Sandwich"
        })
        .then(doc => {
            console.log(doc)
        })
        .catch(err => {
            console.error.error(err)
        })

    //this finds the given item and then UPDATEs it    
    Recipe
        .findOneAndUpdate (
            //search query
            {name: "PB&J Sandwich"
            },
            //this is the field (name) and the value to update to: Peanut Butter & Jelly 
            {name: "Peanut Butter & Jelly!"
            },
            //returns updated doc
            { new : true,
                //validates before update
              runValidators: true
            })
            //updates the record and prints 
            .then(doc => {
                console.log(doc)
            })
            //if there is an error, returns this 
            .catch(err => {
                console.error(err)
            })
        
            //use the findOneAndRemove call to delete the record above and return
            //the original document that was removed 


        //DELETE
        Recipe 
            //.findOneAndRemove removes the record name: "Peanut Butter & Jelly!"
            //and returns the original document that was removed--name goes back to "PB&J Sandwich"
            .findOneAndRemove ({
                name: "Peanut Butter & Jelly!"
            })
            //prints the response 
            .then(response => {
                console.log(response)
            })
            //if an error, print the error message
            .catch(err => {
                console.error(err)
            })


   //CREATEs a new recipe name called Ants on a log, if there is an error, do the 
   //callback function instead
   Recipe.create({ name: "Ants on a Log" }, function (err, new_name) {
       if (err) return handleError(err);
   });

   //creates a new recipe name called Chicken Noodle Soup, if there is an error, do 
   //the callback function instead
   Recipe.create({ name: "Chicken Noodle Soup" }, function (err, new_name) {
    if (err) return handleError(err);
   });



    //this is using the find method to look at the Recipe model 
    //if there is an error, return the error callback function
    Recipe.find(function(err, recipes){
        if(err) return console.error(err);
        //print the recipes 
        console.log(recipes);
        //prints recipes at index 0 of the ingredients property 
        recipes[0].ingredients;
    });


});



//node recipe_db.js ------this is the command to run in terminal 
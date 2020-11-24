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

    /* schema  */
    const recipeSchema = new mongoose.Schema({
        name: String,
        description: String,
        ingredients: [String],
        measure: [String],
        instructions: String,
    }); 

    const ingredient = new mongoose.Schema({
        name: String
    });

    const measure = new mongoose.Schema({
        name: String
    });

    const RecipeIngredient = new mongoose.Schema({
        ingredients : [
            {type: mongoose.Schema.Types.ObjectId, ref: "Ingredient"}],
        recipe : 
    });

    recipeSchema.methods.make = function(){
        let cooking; 
        if(this.name){
            cooking = this.name; 
        }
        else {
            cooking = "I don't see that recipe!"; 
        }
        console.log(cooking); 
    }

    /* model */ 
     const Recipe = mongoose.model("Recipe", recipeSchema); 

    /* documents */ 
    let recipe1 = new Recipe({ name : "Grilled Cheese" }); 
    recipe1.make(); 
    recipe1.name = "Grilled Cheese";
    //????? recipe1.description = "Cheesy Grilled Cheese";

    let recipe2 = new Recipe({ name : "Scrambled Eggs" }); 
    recipe2.make(); 
    recipe2.name = "Scrambled Eggs";

    let recipe3 = new Recipe({ name : "Popcorn" }); 
    recipe3.make(); 
    recipe3.name = "Popcorn";

    //const fluffy = new Kitten({name : "fluffy"}); 
    //fluffy.speak(); 

    /* how to save a document after it's been created/updated */ 
    recipe1.save(function(err, grilled){
        if(err) return console.error(err); 
        recipe1.make(); 
    });

    recipe2.save(function(err, eggs){
        if(err) return console.error(err); 
        recipe2.make(); 
    });

    recipe3.save(function(err, popcorn){
        if(err) return console.error(err); 
        recipe3.make(); 
    });
    //silence.save(function(err,cat){
      //  if(err) return console.error(err);
        //cat.speak(); 
    //})
    
    /*find is a method attached directly to our Kitten model/class */ 
    //Kitten.find(function(err, kittens){
      //  if(err) return console.error(err);
        //console.log(kittens); 
    //})

    /* mongoose supports mongodb's rich query language */ 
    //Kitten.find({ name: /^fluff/ }, function(err,cat){
        //check for errors
        //print to console. 
    //})

});



//node getting-started.js ------this is the command to run
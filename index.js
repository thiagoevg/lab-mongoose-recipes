const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

async function init() {
  try {
    // Create the new db "recipe-app" and establishes the connection with it
    const connection = await mongoose.connect(MONGODB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Connected to the database: "${connection.connection.name}"`);

    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    // Create and insert a new recipe to the recipes collection
    const newRecipe = await Recipe.create({
      title: "Scrambled Eggs",
      level: "Easy Peasy",
      ingredients: ["Eggs", "Butter"],
      cuisine: "Daily life",
      dishType: "breakfast",
      duration: 5,
      creator: "God",
    });

    // Show in the console the title of the recently created recipe
    console.log(newRecipe.title);

    // Insert all the data from the data.json in the recipes collection
    await Recipe.insertMany(data);

    // Show in the console all the recipe's names avaiables in the collection
    (await Recipe.find()).forEach((recipe) => console.log(recipe.title));

    // Update the duration of a the "Rigatoni alla Genovese" recipe
    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { $set: { duration: 100 } },
      { new: true }
    );

    // Show in the console that the recipe was successfully updated
    console.log("Successfully updated => ", updatedRecipe.title);

    const removedRecipe = await Recipe.deleteOne({ title: "Carrot Cake" });

    console.log("Successfully deleted => ", removedRecipe);
  } catch (err) {
    console.error(err);
  }
}
init();

// mongoose
//   .connect(MONGODB_URI, {
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then((self) => {
//     console.log(`Connected to the database: "${self.connection.name}"`);
//     // Before adding any recipes to the database, let's remove all existing ones
//     return Recipe.deleteMany();
//   })
//   .then(() => {
//     // Run your code here, after you have insured that the connection was made
//     Recipe.create({
//       title: "Scrambled Eggs",
//       level: "Easy Peasy",
//       ingredients: ["Eggs", "Butter"],
//       cuisine: "Daily life",
//       dishType: "breakfast",
//       duration: 5,
//       creator: "God",
//     }).then((response) => {
//       console.log(response.title);
//     });
//   })
//   .then(() => {
//     Recipe.insertMany(data).then((response) => {
//       response.forEach((recipe) => console.log(recipe.title));
//     });
//   })
//   .then(() => {
//     Recipe.deleteOne({ title: "Carrot Cake" }).then((response) => {
//       console.log(response);
//     });
//   })
//   .catch((error) => {
//     console.error("Error connecting to the database", error);
//   });


import React, {useEffect, useState} from 'react';
import "./App.css";
import Recipe from './Recipe';

const App = () => {

  const APP_ID = '472974c6';
  const APP_KEY = '2726614bba479a77a0deb00ecd7abf0d';


  // const [counter, setCounter] = useState(0);
  const [recipes, setRecipes] =useState([]);
  const [search, setResearch] = useState("");
  const [query, setQuery] = useState('chiken');

  useEffect(() => {
    getRecipies();
  } ,[query]);

  const getRecipies = async () => {
    const reponse = await fetch( `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data =  await reponse.json();
    setRecipes(data.hits);

  }

  const updateSearch = e => {
    setResearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setResearch('');
  }

  return (
    <div className="App">
      <form  onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} 
        onChange={updateSearch}
        />
        <button 
        className="search-button" type="submit">
         Search
        </button>
        
        {/* <h1 onClick={() => setCounter(counter + 1)}> {counter}</h1> */}
        
      </form>
      <div className="recipes">

        {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      
      </div>
      
    </div>
  );
};

export default App;
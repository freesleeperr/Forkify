import * as model from './model.js';
import { async } from 'regenerator-runtime';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { __esModule } from 'start';
import { MODAL_CLOSE_SEC } from './config.js';
// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    //console.log(id);
    if (!id) return;
    //loding recepie
    recipeView.renderSpinner();

    resultView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    //test controlservings
  } catch (err) {
    recipeView.renderError(`${err} !!!!`);
  }
};
const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    console.log(query);
    if (!query) return;
    console.log(query);
    resultView.renderSpinner();
    //load search

    await model.loadSearchResult(query);

    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultsPage());
    // console.log(model.getSearchResultsPage(2));
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPangination = function (goToPage) {
  console.log(goToPage);

  resultView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //更新提供的分量 在state中

  model.updateServings(newServings);

  //更新view
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  console.log(model.state.recipe);
  //recipeView.update()
  recipeView.update(model.state.recipe);

  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    //addRecipeView.renderSpinner();
    addRecipeView.renderSpinner();

    // Upload the new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    window.history.pushState(null , '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHanderUpdateServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPangination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();

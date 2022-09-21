import icons from 'url:../../img/icons.svg';
export default class View {
  _data;

  /**\
   * 渲染从DOM中得到的数据
   * @param {object|object[]}data 要渲染的数据
   * @param {boolean}[render=true] 如果为false，则不会渲染而是生成HTML组件
   * @returns {undefined|string} 返回的的组件
   * @this {object}View 的实例
   * @todo 渲染的工具
   * 
   */
  render(data, render = true) {
    //console.log(data);

    this._data = data;
    const markup = this._generateMarkup();
    if (!render) return markup;
    this._clear();
    //console.log(markup);
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    console.log(data);

    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    // console.log(newElements);
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      //console.log(curEl, newEl.isEqualNode(curEl));

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log('!!', newEl.firstChild.nodeValue.trim());
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `<div class="spinner">
  <svg>
    <use href="${icons}#icon-loader"></use>
  </svg>
  </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  //   _generateMarkup() {
  //     return `<figure class="recipe__fig">
  //     <img src="${this._data.image}" alt="${
  //       this._data.title
  //     }" class="recipe__img" />
  //     <h1 class="recipe__title">
  //       <span>${this._data.title}</span>
  //     </h1>
  //   </figure>

  //   <div class="recipe__details">
  //     <div class="recipe__info">
  //       <svg class="recipe__info-icon">
  //         <use href="${icons}"></use>
  //       </svg>
  //       <span class="recipe__info-data recipe__info-data--minutes">${
  //         this._data.cookingTime
  //       }</span>
  //       <span class="recipe__info-text">minutes</span>
  //     </div>
  //     <div class="recipe__info">
  //       <svg class="recipe__info-icon">
  //         <use href="${icons}#icon-users"></use>
  //       </svg>
  //       <span class="recipe__info-data recipe__info-data--people">${
  //         this._data.servings
  //       }</span>
  //       <span class="recipe__info-text">servings</span>

  //       <div class="recipe__info-buttons">
  //         <button class="btn--tiny btn--increase-servings">
  //           <svg>
  //             <use href="${icons}#icon-minus-circle"></use>
  //           </svg>
  //         </button>
  //         <button class="btn--tiny btn--increase-servings">
  //           <svg>
  //             <use href="${icons}#icon-plus-circle"></use>
  //           </svg>
  //         </button>
  //       </div>
  //     </div>

  //     <div class="recipe__user-generated">
  //       <svg>
  //         <use href="${icons}#icon-user"></use>
  //       </svg>
  //     </div>
  //     <button class="btn--round btn--bookmark">
  //           <svg class="">
  //             <use href="${icons}#icon-bookmark${
  //       this._data.bookmarked ? '-fill' : ''
  //     }"></use>
  //           </svg>
  //         </button>
  //       </div>

  //   <div class="recipe__ingredients">
  //     <h2 class="heading--2">Recipe ingredients</h2>
  //     <ul class="recipe__ingredient-list">
  //     ${this._data.ingredients.map(this._generaMarkupIngredient).join('')}

  //   <div class="recipe__directions">
  //     <h2 class="heading--2">How to cook it</h2>
  //     <p class="recipe__directions-text">
  //       This recipe was carefully designed and tested by
  //       <span class="recipe__publisher">${
  //         this._data.publisher
  //       }</span>. Please check out
  //       directions at their website.
  //     </p>
  //     <a
  //       class="btn--small recipe__btn"
  //       href="${this._data.sourceUrl}"
  //       target="_blank"
  //     >
  //       <span>Directions</span>
  //       <svg class="search__icon">
  //         <use href="${icons}#icon-arrow-right"></use>
  //       </svg>
  //     </a>
  //   </div>`;
  //   }
  //   _generaMarkupIngredient(ing) {
  //     return `<li class="recipe__ingredient">
  //     <svg class="recipe__icon">
  //       <use href="${icons}#icon-check"></use>
  //     </svg>
  //     <div class="recipe__quantity">${
  //       ing.quantity ? new Fraction(ing.quantity).toString() : ''
  //     }</div>
  //     <div class="recipe__description">
  //       <span class="recipe__unit">${ing.unit}</span>
  //       ${ing.description}
  //     </div>
  //   </li><li class="recipe__ingredient">
  //   <svg class="recipe__icon">
  //     <use href="${icons}#icon-check"></use>
  //   </svg>
  //   <div class="recipe__quantity">${
  //     ing.quantity ? new Fraction(ing.quantity).toString() : ''
  //   }</div>
  //   <div class="recipe__description">
  //     <span class="recipe__unit">${ing.unit}</span>
  //     ${ing.description}
  //   </div>
  // </li>

  // `;
  //   }
  renderError(message = this._error) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
    console.log(message);
  }
}

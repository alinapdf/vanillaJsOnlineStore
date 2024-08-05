const products = fetch("https://dummyjson.com/products");
const loader = document.querySelector(".loader-wrapper");
const ulProducts = document.querySelector(".goods-list");
const ulFilterList = document.querySelector(".filter-list");
const productCategories = fetch("https://dummyjson.com/products/categories");
const ulProductsInBasket = document.querySelector(".basket-goods");

const inputSearch = document.querySelector(".search");

const numberOfGoods = document.querySelector(
  ".naw-section-wrapper-basket-number-of-goods"
);
const totalPrice = document.querySelector(
  ".nav-section-wrapper-basket-total-price"
);
const totalPriceInBasketValue = document.querySelector(
  ".total-price-in-basket-value"
);

let words = "";

const translateWords = [];

const basketContain = [];

loader.classList.remove("hidden");

//получение продуктов
products
  .then((data) => {
    loader.classList.add("hidden");
    return data.json();
  })
  .then((data) => {
    renderProducts(data);
  });
//получение категорий
productCategories
  .then((data) => {
    return data.json();
  })
  .then((data) => {
    renderCategories(data);
  });

function renderProducts(data) {
  console.log(data);
  addProductsIntoDOM(data);
}

function renderCategories(data) {
  console.log(data);
  addCategoriesIntoDOM(data);
  words = ulFilterList.querySelectorAll("[data-lang]");

  console.log(words);
}

function addProductsIntoDOM(data) {
  ulProducts.innerHTML = "";
  data.products.forEach((product) => {
    const liGoodsListItem = document.createElement("li");
    liGoodsListItem.className = "goods-list-item";
    liGoodsListItem.id = `${product.id}`;
    liGoodsListItem.setAttribute("data-tags", product.tags.join(","));

    const goodsCard = document.createElement("div");
    goodsCard.className = "goods-card";

    const goodsCardImgWrapper = document.createElement("div");
    goodsCardImgWrapper.className = "goods-card-img";

    const goodsCardImg = document.createElement("img");
    goodsCardImg.src = `${product.images[0]}`;
    goodsCard.alt = `${product.title}`;

    const goodsCardName = document.createElement("div");
    goodsCardName.className = "goods-card-name";
    goodsCardName.textContent = `${product.title}`;

    const goodsCardDesc = document.createElement("div");
    goodsCardDesc.className = "goods-card-desc";
    goodsCardDesc.textContent = `${product.description}`;

    const goodsCardLowerInfo = document.createElement("div");
    goodsCardLowerInfo.className = "goods-card-lower-info";

    const goodsCardPrice = document.createElement("div");
    goodsCardPrice.className = "goods-card-price";
    goodsCardPrice.textContent = `${product.price}`;

    const goodsCardBasketInfo = document.createElement("div");
    goodsCardBasketInfo.className = "goods-card-basket-info";

    const counterWrapper = document.createElement("div");
    counterWrapper.className = "counter-wrapper";

    const btnPlus = document.createElement("button");
    btnPlus.className = "plus";
    btnPlus.textContent = "+";

    const goodsCounter = document.createElement("div");
    goodsCounter.className = "goods-counter";
    goodsCounter.textContent = "1";

    const btnMinus = document.createElement("button");
    btnMinus.className = "minus";
    btnMinus.textContent = "-";

    const btnAddToBasketImgWrapper = document.createElement("button");
    btnAddToBasketImgWrapper.className = "add-to-basket";

    const btnAddToBasketImg = document.createElement("img");
    btnAddToBasketImg.src = "img/shopping-cart-3041.svg";
    btnAddToBasketImg.className = "add-to-busket-img";
    btnAddToBasketImg.alt = "add-to-basket";

    btnAddToBasketImgWrapper.append(btnAddToBasketImg);
    counterWrapper.append(btnPlus, goodsCounter, btnMinus);
    goodsCardBasketInfo.append(counterWrapper, btnAddToBasketImgWrapper);
    goodsCardLowerInfo.append(goodsCardPrice, goodsCardBasketInfo);
    goodsCardImgWrapper.append(goodsCardImg);
    goodsCard.append(
      goodsCardImgWrapper,
      goodsCardName,
      goodsCardDesc,
      goodsCardLowerInfo
    );
    liGoodsListItem.append(goodsCard);
    ulProducts.append(liGoodsListItem);
    //кнопки +-
    btnPlus.addEventListener("click", () => {
      let counter = parseInt(goodsCounter.textContent);
      if (counter >= 1) {
        console.log("+");
        goodsCounter.textContent = counter + 1;
        // conter++
      }
    });
    btnMinus.addEventListener("click", () => {
      let counter = parseInt(goodsCounter.textContent);
      if (counter >= 1) {
        console.log("-");
        goodsCounter.textContent = counter - 1;
        // conter--
      }
      if (counter === 1) {
        goodsCounter.textContent = 1;
      }
    });
  });
}

function addCategoriesIntoDOM(data) {
  data.forEach((category) => {
    const liFilterListItem = document.createElement("li");
    liFilterListItem.className = "filter-list-item";
    liFilterListItem.setAttribute("data-category-name", `${category.slug}`);

    const filterListItemCategory = document.createElement("div");
    filterListItemCategory.className = "filter-list-item-category";
    filterListItemCategory.textContent = `${category.name}`;
    filterListItemCategory.setAttribute("data-lang", `${category.slug}`);

    translateWords.push(filterListItemCategory.textContent);

    liFilterListItem.append(filterListItemCategory);
    ulFilterList.append(liFilterListItem);
  });
}

//языки

const language = {
  az: {
    beauty: "güzellik",
    frangrances: "parfumlar",
    groceries: "gıda",
    ["home-decoration"]: "ev dekoru",
    ["kitchen-accessories"]: "mətbəx aksesuarları",
    laptops: "noutbuklar",
    ["mens-shirts"]: "kişi paltarlari",
    ["mens-shoes"]: "kişi ayaqqabıları",
    ["mens-watches"]: "kişi saatları",
    ["mobile-accessories"]: "mobil aksesuarlar",
    sunglasses: "gözlər",
    tablets: "plansetlər",
    tops: "üst geyimlər",
    vehicle: "nəqliyyat vasitələri",
    ["womens-bags"]: "qadın çantaları",
    ["womens-dresses"]: "qadın paltarları",
    ["womens-jewellry"]: "qadın mücevherləri",
    ["womens-shoes"]: "qadın ayaqqabıları",
    ["womens-watches"]: "qadın saatları",
  },
  eng: {
    beauty: "beauty",
    frangrances: "frangrances",
    groceries: "groceries",
    ["home-decoration"]: "home decoration",
    ["kitchen-accessories"]: "kitchen accessories",
    laptops: "laptops",
    ["mens-shirts"]: "mens shirts",
    ["mens-shoes"]: "mens shoes",
    ["mens-watches"]: "mens watches",
    ["mobile-accessories"]: "mobile accessories",
    sunglasses: "sunglasses",
    tablets: "tablets",
    tops: "tops",
    vehicle: "vehicle",
    ["womens-bags"]: "womens bags",
    ["womens-dresses"]: "womens dresses",
    ["womens-jewellry"]: "womens jewellry",
    ["womens-shoes"]: "womens shoes",
    ["womens-watches"]: "womens watches",
  },
  ru: {
    beauty: "красота",
    frangrances: "духи",
    groceries: "продукты",
    ["home-decoration"]: "декор для дома",
    ["kitchen-accessories"]: "аксессуары для кухни",
    laptops: "ноутбуки",
    ["mens-shirts"]: "мужские рубашки",
    ["mens-shoes"]: "мужская обувь",
    ["mens-watches"]: "мужские часы",
    ["mobile-accessories"]: "аксессуары для мобильных",
    sunglasses: "очки",
    tablets: "планшеты",
    tops: "верхняя одежда",
    vehicle: "транспортные средства",
    ["womens-bags"]: "женские сумки",
    ["womens-dresses"]: "женские платья",
    ["womens-jewellry"]: "женские украшения",
    ["womens-shoes"]: "женская обувь",
    ["womens-watches"]: "женские часы",
  },
};

const languageSelect = document.querySelector("#language-selection");

languageSelect.addEventListener("change", () => {
  // console.log(languageSelect.value);
  const selectedLanguage = languageSelect.value;
  // console.log(words);
  words.forEach((word) => {
    const dataLangValue = word.getAttribute("data-lang");
    word.textContent = language[selectedLanguage][dataLangValue];
  });
});

//появление категорий подкатегорий

ulFilterList.addEventListener("click", (e) => {
  const filterListItem = e.target.closest(".filter-list-item");
  if (filterListItem) {
    const categoryName = filterListItem.getAttribute("data-category-name");
    const existingTagsContainer =
      filterListItem.querySelector(".tags-container");

    if (existingTagsContainer) {
      filterListItem.removeChild(existingTagsContainer);
    } else {
      console.log(categoryName);

      const categorizedGoods = fetch(
        `https://dummyjson.com/products/category/${categoryName}`
      );
      categorizedGoods
        .then((data) => {
          loader.classList.add("hidden");
          return data.json();
        })
        .then((data) => {
          console.log(data);
          addProductsIntoDOM(data);
          displayTags(data.products, filterListItem);
        });
    }
  }
});

let selectedTags = []; //для маассива выбранных тегов

function displayTags(products, filterListItem) {
  const tagsContainer = document.createElement("div");
  tagsContainer.className = "tags-container";

  const tagsWrapper = document.createElement("div");
  tagsWrapper.className = "tags-wrapper";

  const tagsArray = [];

  products.forEach((product) => {
    product.tags.forEach((tag) => {
      tagsArray.push(tag);
    });
  });

  const uniqueTags = tagsArray.filter((tag, index, arr) => {
    return arr.indexOf(tag) === index;
  });

  uniqueTags.forEach((tag) => {
    const tagElement = document.createElement("div");
    tagElement.className = "tag";
    tagElement.textContent = tag;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "tag-checkbox";
    checkbox.id = tag;

    const label = document.createElement("label");
    label.htmlFor = tag;
    label.append(checkbox, tagElement);

    tagsWrapper.append(label);
  });

  tagsContainer.append(tagsWrapper);
  filterListItem.append(tagsContainer);

  tagsContainer.addEventListener("click", (e) => {
    if (e.target.matches(".tag-checkbox")) {
      e.stopPropagation();
      handleTagSelection(e);
    }
  });
}

function handleTagSelection(e) {
  const tagChechbox = e.target.closest(".tag-checkbox");
  console.log(tagChechbox);
  const tag = tagChechbox.id;
  if (tagChechbox.checked) {
    selectedTags.push(tag);
  } else {
    selectedTags = selectedTags.filter((selectedTag) => selectedTag !== tag);
  }
  filterProductsByTags();
}

function filterProductsByTags() {
  const products = document.querySelectorAll(".goods-list-item");
  products.forEach((product) => {
    console.log(selectedTags);
    const productTags = product.getAttribute("data-tags").split(",");
    const isHasTag = selectedTags.some((tag) => productTags.includes(tag));
    if (selectedTags.length === 0 || isHasTag) {
      product.classList.remove("hidden");
    } else {
      product.classList.add("hidden");
    }
  });
}

//поиск товаров

inputSearch.addEventListener("input", (e) => {
  let value = e.target.value.trim().toLowerCase();
  const goodsList = document.querySelectorAll(".goods-list-item");
  goodsList.forEach((goodsItem) => {
    const itemName = goodsItem
      .querySelector(".goods-card-name")
      .textContent.toLowerCase();
    if (itemName.includes(value)) {
      goodsItem.classList.remove("hidden");
    } else {
      goodsItem.classList.add("hidden");
    }
  });
});

//модальное окно
const basketIcon = document.querySelector(".nav-basket-icon");
const popUp = document.querySelector(".pop-up");

basketIcon.addEventListener("click", (e) => {
  e.stopPropagation(); //чтобы остановить вплытие
  popUp.classList.remove("hidden");
  // console.log("click");
});

document.addEventListener("click", (e) => {
  // console.log(e.target);
  if (e.target.closest(".pop-up") && !e.target.closest(".pop-up-content")) {
    popUp.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 27) {
    popUp.classList.add("hidden");
  }
});

//добавление товара в корзину

document.addEventListener("click", (e) => {
  console.log(totalPrice.textContent);
  console.log(totalPriceInBasketValue.textContent);
  const addToBasket = e.target.closest(".add-to-basket");
  if (addToBasket) {
    const productCard = addToBasket.closest(".goods-card");
    const productImg = productCard.querySelector(".goods-card-img img").src;
    const productName =
      productCard.querySelector(".goods-card-name").textContent;
    const productPrice = parseFloat(
      productCard.querySelector(".goods-card-price").textContent
    ); // преобразование в число
    const productId = productCard.closest(".goods-list-item").id;

    let existingProduct = basketContain.find((product) => {
      return product.id === productId;
    });

    const productCounter = parseFloat(
      productCard.querySelector(".goods-counter").textContent
    );

    // let alreadyInBasket = false;
    // basketContain.forEach((product) => {
    //   if (product.id === productId) {
    //     alreadyInBasket = true;
    //     return;
    //   }
    // });

    if (existingProduct) {
      existingProduct.counter += productCounter;
    } else {
      const productObjData = {
        img: productImg,
        name: productName,
        price: productPrice,
        counter: productCounter,
        id: productId,
      };
      basketContain.push(productObjData);
    }

    addGoodsIntoBusket(basketContain);
    //  else {
    //   console.log("tovar uje dobavlen");
    // }
    console.log(basketContain);
  }
});

function updateTotalItems() {
  //СУММА ТОВАРОВ В КОРЗИНЕ
  const totalItems = basketContain.reduce((sum, product) => {
    return sum + product.counter;
  }, 0);
  //СУММА СТОИМОСТИИИ
  const totalPriceValue = +basketContain.reduce((sum, product) => {
    const price = parseFloat(product.price);
    const counter = parseFloat(product.counter);
    console.log(`price: ${price}, counter: ${counter}`);

    return sum + price * counter;
  }, 0);

  console.log("totalPriceValue", totalPriceValue);
  const totalPriceNumber = parseFloat(totalPriceValue.textContent);

  // if (isNaN(totalPriceNumber)) {
  //   console.error("Total price value is not a number:", +totalPriceValue);
  //   return;
  // }
  //ОБНОВЛЯЕМ СОДЕРЖАНИЕ
  numberOfGoods.textContent = totalItems;
  totalPrice.textContent = +totalPriceValue.toFixed(2);
  totalPriceInBasketValue.textContent = totalPriceValue.toFixed(2);
}

function addGoodsIntoBusket(basketContain) {
  ulProductsInBasket.innerHTML = "";
  basketContain.forEach((product) => {
    const liBasketGoodsItem = document.createElement("li");
    liBasketGoodsItem.className = "basket-goods-item";
    liBasketGoodsItem.id = `${product.id}`;

    const basketGoodsWrapper = document.createElement("div");
    basketGoodsWrapper.className = "goods-wrapper";

    const basketGoodsImgWrapper = document.createElement("div");
    basketGoodsImgWrapper.className = "goods-wrapper-img";

    const basketGoodsImg = document.createElement("img");
    basketGoodsImg.src = `${product.img}`;

    const basketGoodsName = document.createElement("div");
    basketGoodsName.className = "goods-wrapper-name";
    basketGoodsName.textContent = `${product.name}`;

    const basketGoodsPrice = document.createElement("div");
    basketGoodsPrice.className = "goods-wrapper-price";
    basketGoodsPrice.textContent = `${product.price}`;

    const goodsCounterWrapper = document.createElement("div");
    goodsCounterWrapper.className = "goods-wrapper-counter-wrapper";

    const goodsCounterPlus = document.createElement("button");
    goodsCounterPlus.className = "plus";
    goodsCounterPlus.textContent = "+";

    const goodsCounter = document.createElement("div");
    goodsCounter.className = "goods-counter";
    goodsCounter.textContent = `${product.counter}`;

    const goodsCounterMinus = document.createElement("button");
    goodsCounterMinus.className = "minus";
    goodsCounterMinus.textContent = "-";

    const goodsTotalPriceName = document.createElement("div");
    goodsTotalPriceName.className = "goods-wrapper-total-price-name";
    goodsTotalPriceName.textContent = "Total price";

    const goodsWrapperLowPart = document.createElement("div");
    goodsWrapperLowPart.className = "goods-wrapper-low-part";

    const goodsTotalPrice = document.createElement("div");
    goodsTotalPrice.className = "goods-wrapper-low-part-total-price";
    goodsTotalPrice.textContent = `${(product.counter * product.price).toFixed(
      2
    )}`;

    const goodsBasketBtnDeleteWrapper = document.createElement("button");
    goodsBasketBtnDeleteWrapper.className = "goods-wrapper-low-part-delete-img";

    const goodsBasketBtnDeleteImg = document.createElement("img");
    goodsBasketBtnDeleteImg.src = "img/trash-can-10416.svg";
    goodsBasketBtnDeleteImg.alt = "delete";

    goodsBasketBtnDeleteWrapper.append(goodsBasketBtnDeleteImg);
    goodsWrapperLowPart.append(goodsTotalPrice, goodsBasketBtnDeleteWrapper);
    goodsCounterWrapper.append(
      goodsCounterPlus,
      goodsCounter,
      goodsCounterMinus
    );
    basketGoodsImgWrapper.append(basketGoodsImg);
    basketGoodsWrapper.append(
      basketGoodsImgWrapper,
      basketGoodsName,
      basketGoodsPrice,
      goodsCounterWrapper,
      goodsTotalPriceName,
      goodsWrapperLowPart
    );
    liBasketGoodsItem.append(basketGoodsWrapper);
    ulProductsInBasket.append(liBasketGoodsItem);
    //увеличение
    goodsCounterPlus.addEventListener("click", () => {
      product.counter++;
      goodsCounter.textContent = `${product.counter}`;
      goodsTotalPrice.textContent = `${(
        product.counter * product.price
      ).toFixed(2)}`;
      updateTotalItems();
    });
    //уменьшение
    goodsCounterMinus.addEventListener("click", () => {
      if (product.counter > 1) {
        product.counter--;
        goodsCounter.textContent = `${product.counter}`;
        goodsTotalPrice.textContent = `${(
          product.counter * product.price
        ).toFixed(2)}`;
        updateTotalItems();
      } else {
        deleteGoodFromBasket(basketContain, product);
      }
    });
  });
  updateTotalItems();
}

//удаление товара из корзины

ulProductsInBasket.addEventListener("click", (e) => {
  if (e.target.closest(".goods-wrapper-low-part-delete-img")) {
    const goodsItemParent = e.target.closest(".basket-goods-item");
    const goodsItemId = goodsItemParent.getAttribute("id");
    const goodsItemIndex = basketContain.findIndex(
      (product) => product.id === goodsItemId
    );
    basketContain.splice(goodsItemIndex, 1);
    goodsItemParent.remove();
    console.log(basketContain);
    updateTotalItems();
  }
});

function deleteGoodFromBasket(basketContain, product) {
  const goodsItemIndex = basketContain.findIndex(
    (item) => item.id === product.id
  );
  if (goodsItemIndex !== -1) {
    basketContain.splice(goodsItemIndex, 1);
    addGoodsIntoBusket(basketContain);
    updateTotalItems();
  }
}

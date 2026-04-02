import React, { useState } from "react";
import "./App.css";

const shopList = new Map();

shopList.set("Apple MacBook Air", 999);
shopList.set("Sony PlayStation 5", 499);
shopList.set("Умная колонка", 99);

const arrShopList = Array.from(shopList.entries());

function MainText() {
  return (
    <div>
      <h1>Мой Магазин</h1>
    </div>
  );
}

function ShopWindowText() {
  return (
    <div>
      <h3>Витрина</h3>
    </div>
  );
}

function BasketText({ list }) {
  let itemsAmount = list.length;

  return (
    <div>
      <h3>Корзина ({itemsAmount})</h3>
    </div>
  );
}

function TotalCost({ list }) {
  let totalCost = 0

  for (let i of list) {
    totalCost += i[1]
  }

  return <h4>Итого: ${totalCost}</h4>
}

function OnlineShopItem({ item, cost }) {
  return (
    <p>
      {item} - {cost}
    </p>
  );
}

function ShopWindow({ list, id, basketList, setBasket }) {
  let [item, cost] = list[id];

  function addToBasket() {
    const newBasketList = [...basketList, [item, cost]];

    setBasket(newBasketList);
    console.log("В корзине сейчас:", newBasketList);
  }

  return (
    <div className="window__item">
      <OnlineShopItem item={item} cost={cost} />
      <button onClick={addToBasket} className="window__addBtn">В корзину</button>
    </div>
  );
}

function ShopBasket({ list, setBasket }) {
  function remover(i) {
    const newList = [...list];

    newList.splice(i, 1);

    setBasket(newList);
  }

  return (
    <ul className="basket">
      {list.map(([item, cost], i) => (
        <li key={i} className="basket__item">
          <OnlineShopItem item={item} cost={cost} />
          <button onClick={() => remover(i)} className="basket__removeBtn">X</button>
        </li>
      ))}
    </ul>
  );
}

function OnlineShop({ list }) {
  const [basket, setBasket] = useState([]);

  return (
    <div className="container">
      <MainText />
      <div className="shop__main">
        <div className="shop__window">
          <ShopWindowText />
          {list.map((item, i) => (
            <ShopWindow
              list={list}
              id={i}
              basketList={basket}
              setBasket={setBasket}
            />
          ))}
        </div>

        <div className="shop__basket">
          <BasketText list={basket} />
          <ShopBasket list={basket} setBasket={setBasket} />
          <TotalCost list={basket} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <OnlineShop list={arrShopList} />;
}

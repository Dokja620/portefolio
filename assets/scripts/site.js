const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    }
  });

const change = document.getElementById("change");

Array.from(document.getElementsByClassName("option"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      change.dataset.activeIndex = index;
    }
  });
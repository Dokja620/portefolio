const menu = document.getElementById("menu");

Array.from(document.getElementsByClassName("menu-item"))
  .forEach((item, index) => {
    item.onmouseover = () => {
      menu.dataset.activeIndex = index;
    }
});

function changeBackground(index) {
  // Set the background index attribute of the body element
  document.body.setAttribute('bg-index', index);
}
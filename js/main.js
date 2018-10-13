'use strict';

document.addEventListener("DOMContentLoaded", function(event) {
  menuOpen();
});

function menuOpen() {
  var menu = document.querySelectorAll('.menu');
  var menuButton = document.querySelectorAll('.menu__button_burger');

  if (menuButton.length > 0) {
    menuButton.forEach(function (mainButton) {

      mainButton.addEventListener("click", function (event) {
        menu.forEach(function(menuItem) {          
          menuItem.classList.toggle('menu_active');
        });
      });
    });
  }
};
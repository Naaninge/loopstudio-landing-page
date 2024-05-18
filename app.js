import imagesData from "./data.js"; 


const date = new Date().getFullYear();

const images = document.querySelector(".gallery-images");
const year = document.querySelector(".year");
const menu = document.querySelector('.hamburger-icon')
const close = document.querySelector(".close-btn")
const sideMenu = document.querySelector("aside")

const displayImages = () => {
  const imageHTML = imagesData
    .map((img) => {
     
      return `<div class="gallery-image">
        <a href="#">
          <img src=${img.img} alt=${img.title} class="gallery-img" />
          <span>${img.title}</span>
        </a>
        <div class="img-overlay"></div>
      </div>`;
    })
    .join("");

  images.innerHTML = imageHTML;
  year.textContent = `${date}`;
};

displayImages();

 menu.addEventListener("click", () => {
   sideMenu.classList.remove("hide");
 });

 close.addEventListener("click", () => {
   sideMenu.classList.add("hide");
 });



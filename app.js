import imagesData from "./data.js";

const images = document.querySelector(".gallery-images");
const year = document.querySelector(".year");
const menu = document.querySelector(".hamburger-icon");
const close = document.querySelector(".close-btn");
const sideMenu = document.querySelector("aside");

const date = new Date().getFullYear();

// Function to dynamically add images into gallery container
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

// Event listeners that  toggle the hamburger icon and close icon
menu.addEventListener("click", () => {
  sideMenu.classList.remove("hide");
});

close.addEventListener("click", () => {
  sideMenu.classList.add("hide");
});

// Function to get a single ad and apply it to a specific container
const getAd = (container, type, tags) => {
  const formdata = new FormData();
  formdata.append("type", type);
  formdata.append("tags", tags);

  const ajax = new XMLHttpRequest();

  console.log(ajax);
  ajax.addEventListener("load", (event) => {
    const response = JSON.parse(event.target.responseText);

    console.log(response);

    container.querySelector(".advertIMG").src = response.link;
    container.querySelector(".advertIMG").alt = response.alt;
    container.querySelector(".anchorElement").href = response.href;
    container.querySelector(".headerText").innerHTML = response.message;
  });

  ajax.open("POST", "https://ad.simaneka.com/api/get");
  ajax.setRequestHeader("authorisation", "7XZSmVp5Deu56W781iwl58BXqUkIXR8A");

  ajax.send(formdata);
};

// Get all ad-container elements
const adContainers = document.querySelectorAll(".ad-container");

// Request and apply ads for each ad container
adContainers.forEach((container) => {
  getAd(container, "Dark Square", "music,party,food,shop");
});

// Array of type-tag pairs for each ad container

const adConfigs = [
  {
    type: "Thick Horizontal",
    tags: "music,party,food",
  },
  {
    type: "Dark Square",
    tags: "tech,shop,party",
  },
  {
    type: "Thick Vertical ",
    tags: "nature,travel,music",
  },
  {
    type: "Light Square ",
    tags: "fashion,beauty,food",
  },
  {
    type: "Dark Square",
    tags: "games,sports,music",
  },
];

// get and apply ads for each ad container
adContainers.forEach((container, index) => {
  const { type, tags } = adConfigs[index % adConfigs.length];
  getAd(container, type, tags);
});

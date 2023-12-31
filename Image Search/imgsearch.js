const accesskey = "2OrnTousx-MkQiybvnyqNTBoLgSZLYTqf1y4AJRV0sY";

const formele = document.querySelector("form");
const inputele = document.getElementById("search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");

let inputdata = "";
let page = 1;

async function searchImages() {
  inputdata = inputele.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputdata}&client_id=${accesskey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchresults.innerHTML = "";
  }

  results.map((result) => {
    const imagewrapper = document.createElement("div");
    imagewrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imagelink = document.createElement("a");
    imagelink.href = result.links.html;
    imagelink.target = "_blank";
    imagelink.textContent = result.alt_description;

    imagewrapper.appendChild(image);
    imagewrapper.appendChild(imagelink);
    searchresults.appendChild(imagewrapper); 
  });
  page++;
  if (page > 1) {
    showmore.style.display = "block";
  }
}

formele.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showmore.addEventListener("click", (event) => { 
  searchImages();
});

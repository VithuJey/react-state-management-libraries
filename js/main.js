// list of libraries
let libraries = [];
// processed libraries - searched/reversed
let proLibs = [];

// create library card
function createCard(library) {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `<img
    class="card-logo"
    src=${library.img}
    alt="library-logo"
    />
    <div class="col">
    <div class="row">
        <p class="card-title">${library.title}</p>
    </div>
    <div class="row">
        <div class="link-wrap">
        <a class="link" target="_blank" rel="noopener" href="${library.doc}">Doc</a>
        <a class="link" target="_blank" rel="noopener" href="${library.git}">Git</a>
        <a class="link" target="_blank" rel="noopener" href="${library.npm}">npm</a>
        </div>
    </div>
    </div>`;
  return card;
}

// append library list
function appendList(libraryList) {
  const libNode = document.getElementById("libCtn");
  libNode.innerHTML = "";
  libraryList.map((library) => {
    libNode.appendChild(createCard(library));
  });
}

// populate card with data
async function populateCard() {
  try {
    const data = await fetch("../data/library.json");
    libraries = await data.json();
    proLibs = libraries;
    appendList(libraries);
  } catch (error) {
    console.log("error ", error);
  }
}

populateCard();

// handles search field
function handleSearch(ev) {
  let searchWord = ev.target.value;
  if (searchWord === "") proLibs = libraries;

  let searchRes = proLibs.filter((value) =>
    value.title.toLowerCase().includes(searchWord.toLowerCase().trim())
  );
  proLibs = searchRes;
  appendList(searchRes);
}

// liten on events of input field
const searchWord = document.getElementById("searchField");
searchWord.addEventListener("input", handleSearch);

// reverse the list
function reverseList() {
  revLibraries = proLibs.reverse();
  appendList(revLibraries);
}

// add reverse function to revButton onclick
const reverseButton = document.getElementById("revBtn");
reverseButton.onclick = reverseList;

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

// show/hide the scroll to top button
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("topBtn").style.display = "block";
  } else {
    document.getElementById("topBtn").style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function toTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

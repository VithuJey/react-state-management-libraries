// create library card
function createCard(library) {
  var card = document.createElement("div");
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
        <a class="link" target="_blank" rel="noopener" href="${library.npm}">NPM</a>
        </div>
    </div>
    </div>`;
  return card;
}

// populate card with data
async function populateCard() {
  try {
    var data = await fetch("../data/library.json");
    var libraries = await data.json();

    libraries.map((library) => {
      document.getElementById("libContain").appendChild(createCard(library));
    });
  } catch (error) {
    console.log("error ", error);
  }
}

populateCard();

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
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

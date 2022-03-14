async function getData() {
  let movieName = document.querySelector("#movie").value;
  try {
    let res = await fetch(
      `https://www.omdbapi.com/?apikey=ba64c43c&s=${movieName}`
    );
    let data = await res.json();
      displayData(data.Search);
  } catch (error) {
    console.log("error:", error);
  }
}

function displayData(data) {
    if (data !== undefined) {
        document.querySelector("#searchedMovies").innerHTML = null;
      document.querySelector("#searchedMovies").style.display = "block";
      document.querySelector("#movies-container").style.display = "none";
    data.map(function (elem, ind, arr) {
      let div = createTag("div");
      let div1 = createTag("div");
      let image = createTag("img");
      image.src = elem.Poster;
      let title = createTag("h4");
      title.innerText = elem.Title;
      let type = createTag("p");
      type.innerText = elem.Type;
      let year = createTag("p");
      year.innerText = elem.Year;
      div1.append(title, type, year);
      div.append(image, div1);
      div.addEventListener("click", function () {
          localStorage.setItem("moviesObj", JSON.stringify(elem));
          checkData();
          document.querySelector("#container>div").style.display = "none";
          document.querySelector("#movie").value = null;
          document.querySelector("#movies-container").style.display = "block";
      });
      document.querySelector("#searchedMovies").append(div);
    });
  }
}

checkData();

function checkData() {
    let obj = JSON.parse(localStorage.getItem("moviesObj"));
    if(obj !== null) {
        displayMovie(obj);
    }
    
}


function displayMovie(data) {
    let search = document.querySelector("#container>div");

    document.querySelector("#movies-container").innerHTML = null;
  let div = createTag("div");
  let div1 = createTag("div");
  let image = createTag("img");
  image.src = data.Poster;
  let title = createTag("h3");
  title.innerText = data.Title;
  let type = createTag("p");
  type.innerText = data.Type;
  let year = createTag("p");
    year.innerText = data.Year;
    let btn = createTag("button")
    btn.innerText = "Watch Now"
  div1.append(title, type, year,btn);
  div.append(image, div1);
  document.querySelector("#movies-container").append(div);
}




function debouncingFun(fun, delay) {
  let timmer;
  return function () {
    clearTimeout(timmer);
    timmer = setTimeout(function () {
      fun();
    }, delay);
  };
}

let fetchData = debouncingFun(getData, 500);
// apply fetchData function on eventLisenters to work

function createTag(tag) {
  return document.createElement(tag);
}

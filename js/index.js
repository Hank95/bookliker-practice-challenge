document.addEventListener("DOMContentLoaded", function () {
  fetchBooks();
});

function fetchBooks() {
  fetch("http://localhost:3000/books")
    .then((res) => res.json())
    .then((json) => json.forEach((book) => listBook(book)));
}

function listBook(book) {
  const li = document.createElement("li");
  const list = document.querySelector("#list");

  li.innerText = book.title;
  list.append(li);

  li.addEventListener("click", (e) => {
    panel.innerHTML = "";
    renderBook(book, e);
  });
}
const panel = document.querySelector("#show-panel");

function renderBook(book, e) {
  const image = document.createElement("img");
  const title = document.createElement("h1");
  const subTitle = document.createElement("h3");
  const author = document.createElement("h3");
  const description = document.createElement("p");
  const likeList = document.createElement("ul");
  //   const like = document.createElement("li");
  const likeButton = document.createElement("button");

  image.src = book.img_url;
  title.innerText = book.title;
  subTitle.innerText = book.subtitle;
  description.innerText = book.description;
  author.innerText = book.author;
  book.users.forEach((user) => {
    const like = document.createElement("li");
    like.innerText = user.username;
    likeList.append(like);
  });
  likeButton.innerText = "Like";
  panel.append(
    image,
    title,
    subTitle,
    author,
    description,
    likeList,
    likeButton
  );

  likeButton.addEventListener("click", (e) => {
    pageLiker(book, e, likeList);
  });
}

function pageLiker(book, e, likeList) {
  console.log(e.target);
  newUsers = book.users;

  fetch(`http://localhost:3000/users/1`)
    .then((res) => res.json())
    .then((json) => {
      const like = document.createElement("li");
      like.innerText = json.username;
      likeList.append(like);
      addUser(json, book);
    });

  function addUser(json, book) {
    newUsers.push(json);
    console.log(newUsers);
    fetch(`http://localhost:3000/books/${book.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ users: newUsers }),
    });
  }
}

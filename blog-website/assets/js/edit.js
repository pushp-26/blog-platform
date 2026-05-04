if(sessionStorage.getItem("admin") === "false") {
    window.location.href("login.html");
}

function editBlog(event) {
    event.preventDefault();

    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const image = document.getElementById("image");


    let list = JSON.parse(localStorage.getItem("blogs"));
    let index = Number(localStorage.getItem("itemindex"));

    list[index].title = title.value;
    list[index].content = content.value;
    list[index].image = image.value;

    localStorage.setItem("blogs", JSON.stringify(list));
    alert("Updated");
    window.location.href = "admin.html";
}

const update = document.getElementById("update");
update.addEventListener("click", editBlog);

const title = document.getElementById("title");
const content = document.getElementById("content");
const image = document.getElementById("image");

let list = JSON.parse(localStorage.getItem("blogs"));
let index = Number(localStorage.getItem("itemindex"));

// console.log(list[index].title);
// console.log(list[index].content);
// console.log(list[index].image);

title.value = list[index].title;
content.value = list[index].content;
image.value = list[index].image;




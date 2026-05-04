if(sessionStorage.getItem("admin") === "false") {
    window.location.href("login.html");
}

function createBlog(event) {
    event.preventDefault();

    const title = document.getElementById("title");
    const content = document.getElementById("content");
    const image = document.getElementById("image");

    const blog = {
        "title" : title.value,
        "content": content.value,
        "image": image.value
    };
  
    let list = JSON.parse(localStorage.getItem("blogs"));
    list = list ?? [];
    list.push(blog);

    localStorage.setItem("blogs", JSON.stringify(list));
    console.log(localStorage.getItem("blogs"));

    alert("Created successfully");
    window.location.href = "admin.html";
}



const create = document.getElementById("create");
create.addEventListener("click", createBlog);


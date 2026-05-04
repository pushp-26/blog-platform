if(sessionStorage.getItem("admin") !== "true") {
    window.location.href = "index.html";
}

function doLogOut(event) {
    event.preventDefault();

    sessionStorage.setItem("admin", "false");
    alert("Logout successful");
    window.location.href = "login.html";
}

function createPage() {
    window.location.href = "create.html";
}

function viewBlogs(event) {
    // event.preventDefault();

    const blogs = document.getElementById("blogs");

    blogs.innerHTML = "";

    let data = JSON.parse(localStorage.getItem("blogs"));
    console.log(data);
    if(!data) {
        blogs.innerHTML = "<h2>No Blogs Posted yet.</h2>";
        return;
    }

    else if(data.length === 0) {
        blogs.innerHTML = "<h2>No Blogs posted yet.</h2>";
        return;
    }

    else {
        let cards = data.map((item, index) => {
        return `<div class="item">
                    <h2>${item.title}</h2>
                    <div class="itemcontent">${item.content}</div>
                    <img src="${item.image}" alt="image">
                    <div>
                        <button class="delete btn" data-id="${index}">Delete</button>
                        <button class="edit btn" data-id="${index}">Edit</button>
                    </div>
                </div>`
        }).join("");

        blogs.innerHTML = cards;
    }
    
}

const logout = document.getElementById("logout");
logout.addEventListener("click", doLogOut);

const create = document.getElementById("create");
create.addEventListener("click", createPage);

const view = document.getElementById("view");
view.addEventListener("click", viewBlogs);

const blogs = document.getElementById("blogs");
blogs.addEventListener("click", function(event) {
    event.preventDefault();
    if(event.target.classList.contains('delete')) {
        let id = event.target.dataset.id;
        let list = JSON.parse(localStorage.getItem("blogs"));
        list.splice(id, 1);
        localStorage.setItem("blogs", JSON.stringify(list));
        viewBlogs();
    }

    else if(event.target.classList.contains('edit')) {
        event.preventDefault();
        let id = event.target.dataset.id;
        localStorage.setItem("itemindex", id);
        window.location.href = "edit.html";
    }
})
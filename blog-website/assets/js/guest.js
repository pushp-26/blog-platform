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
        blogs.innerHTML = "<h2>No Blogs Posted yet.</h2>";
        return;
    }

    else {
        let cards = data.map((item, index) => {
        return `<div class="item">
                    <h2>${item.title}</h2>
                    <img src="${item.image}" alt="image">
                    <div><button class="read btn" data-id="${index}">Read More</button></div>
                </div>`
        }).join("");

        blogs.innerHTML = cards;
    } 
}

viewBlogs();

const blogs = document.getElementById("blogs");
blogs.addEventListener("click", function(event) {
    event.preventDefault();

    if(event.target.classList.contains('read')) {
        let id = event.target.dataset.id;
        localStorage.setItem("readid", id);
        window.location.href = "read.html";
    }
})
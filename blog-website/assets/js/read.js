function addComment(event) {
    event.preventDefault();

    if(sessionStorage.getItem("login") === "false") {
        alert("Please Login First.");
        window.location.href = "index.html";
        return;
    }

    let list = JSON.parse(localStorage.getItem("blogs"));
    const id = Number(localStorage.getItem("readid"));

    let arr = list[id].comment ?? [];
    const commentinput = document.getElementById("commentinput");
    if(commentinput.value === "") {
        alert("please write comment");
    }
    else {
        let name = sessionStorage.getItem("name");
        arr.push({
            "name": name,
            "text": commentinput.value,
            "replies": []
        });


        list[id]["comment"] = arr;

        localStorage.setItem("blogs", JSON.stringify(list));
        alert("comment added");
        commentinput.value = "";
        printComment();  
    }
    
}

function printComment() {
    let list = JSON.parse(localStorage.getItem("blogs"));
    const id = Number(localStorage.getItem("readid"));

    const comments = document.getElementById("comments");
    comments.innerHTML = "No Comments";

    let content = list[id].comment;
    if(!content || content.length === 0) {
        comments.textContent = "No Comments";
        return;
    } 

    let cards = content.map((item, index) => {
        let repliescontent = "";

        if(item.replies && item.replies.length > 0) {
            repliescontent = item.replies.map((item) => {
                return `<div class="reply-box">
                            <p>${item.name} : ${item.text}</p>
                        </div>`
            }).join("");
        }

        else {
            repliescontent = "No Replies";
        }

        return `<div class="item">
                    <p>${item.name} : ${item.text}</p>
                    <button class="btn reply" data-id=${index}>Reply</button>
                    <form class="form" id="form-${index}" style="display:none;">
                        <textarea rows="3" id="reply-${index}"></textarea>
                        <button class="submit-reply" data-id="${index}">Submit</button>
                    </form>
    
                    <div class="replies">
                        <h3>Replies</h3>
                        ${repliescontent}
                    </div>
                </div>
                `;
    }).join("");

    comments.innerHTML = cards;
    
}


let list = JSON.parse(localStorage.getItem("blogs"));
const id = Number(localStorage.getItem("readid"));


const title = document.getElementById("title");
title.textContent = list[id].title;

const maincontent = document.getElementById("maincontent");
maincontent.textContent = list[id].content;

const image = document.getElementById("image");
image.src = list[id].image;

const submit = document.getElementById("submit");
submit.addEventListener("click", addComment);

printComment();

const comments = document.getElementById("comments");
comments.addEventListener("click", function(event) {
    // show reply box
    if(event.target.classList.contains('reply')) {
        if(sessionStorage.getItem("login") === "false") {
            alert("Please Login First.");
            window.location.href = "index.html";
            return;
        }
        
        const index = event.target.dataset.id;  
        document.getElementById(`form-${index}`).style.display = "block";
    }

    // submit reply
    if(event.target.classList.contains("submit-reply")) {
        event.preventDefault();
        
        let id = event.target.dataset.id;

        let replyinput = document.getElementById(`reply-${id}`);

        if(replyinput.value === "") {
            alert("please write reply");
            return;
        }

        let name = sessionStorage.getItem("name");

        let list = JSON.parse(localStorage.getItem("blogs"));
        const blogid = Number(localStorage.getItem("readid"));

        let commentsarr = list[blogid].comment;

        commentsarr[id].replies.push({
            "name": name,
            "text": replyinput.value
        });

        localStorage.setItem("blogs", JSON.stringify(list));

        printComment();
    }
});

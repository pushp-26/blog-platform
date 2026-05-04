function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const emailerror = document.getElementById("emailerror");
    const passworderror = document.getElementById("passworderror");
    

    emailerror.textContent = "";
    passworderror.textContent = "";

    let isvalid = true;

    if(email.value === "") {
        emailerror.textContent = "*email is required";
        isvalid = false;
    }

    if(password.value === "") {
        passworderror.textContent = "*password is required";
        isvalid = false;
    }

    if(isvalid) {
        if(email.value === "admin@gmail.com" && password.value === "admin@1234") {
            sessionStorage.setItem("admin", "true");
            alert("Admin login successful");
            window.location.href = "admin.html";
            return;
        }

        else {
            let isverified = false;

            let list = JSON.parse(localStorage.getItem("users"));
            let userid = 0;
            for(let i=0; i<list.length; i++) {
                if(list[i].email === email.value && list[i].password === password.value) {
                    isverified = true;
                    userid = i;
                    break;
                } 
            }

            if(isverified) {
                sessionStorage.setItem("login", "true");
                sessionStorage.setItem("name", list[userid].name);
                alert("Login successfull");
                window.location.href = "blog.html";
            } else {
                alert("Invalid Credentials");
            }
        }
    }
}

const submit = document.getElementById("submit");

submit.addEventListener("click", loginUser);
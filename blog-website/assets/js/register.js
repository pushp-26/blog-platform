function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    const nameerror = document.getElementById("nameerror");
    const emailerror = document.getElementById("emailerror");
    const passworderror = document.getElementById("passworderror");

    nameerror.textContent = "";
    emailerror.textContent = "";
    passworderror.textContent = "";

    let isvalid = true;

    if(name.value === "") {
        nameerror.textContent = "*name is required";
        isvalid = false;
    }

    if(email.value === "") {
        emailerror.textContent = "*email is required";
        isvalid = false;
    }

    if(password.value === "") {
        passworderror.textContent = "*password is required";
        isvalid = false;
    }

    if(isvalid) {
        const user = {
            "name": name.value,
            "email": email.value,
            "password": password.value
        };

        let list = JSON.parse(localStorage.getItem("users"));

        list = list ?? [];

        for(let i=0; i<list.length; i++) {
            if(list[i].email === user.email && list[i].password === user.password) {
                alert("user already there");
                return;
            }
        }

        list.push(user);
        localStorage.setItem("users", JSON.stringify(list));

        alert("Registered successfully")
        window.location.href = "login.html";
    }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", registerUser);
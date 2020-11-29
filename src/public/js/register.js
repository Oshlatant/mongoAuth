const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const { username, email, password, password_check } = ev.target.elements;

    fetch("http://localhost:8080/users/register", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            email: email.value,
            password: password.value,
            password_check: password_check.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);
});


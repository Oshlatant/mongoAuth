const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target.elements;

    fetch("http://localhost:8080/users/login", {
        method: "POST",
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then(res => res.json())
    .then(console.log)
    .catch(console.error);
});
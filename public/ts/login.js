let accessToken = null;
const loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", async () => {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const res = await fetch("/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (res.ok)
        accessToken = data.accessToken;
    document.getElementById("loginResult").textContent =
        JSON.stringify(data, null, 2);
});
export function getAccessToken() {
    return accessToken;
}

import { getAccessToken } from "./login.js";
const createBtn = document.getElementById("createBtn");
const fetchBtn = document.getElementById("fetchBtn");
createBtn.addEventListener("click", async () => {
    const token = getAccessToken();
    if (!token)
        return alert("Login first");
    const title = document.getElementById("noteTitle").value;
    const content = document.getElementById("noteContent").value;
    const category = document.getElementById("noteCategory").value;
    const res = await fetch("/v1/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ title, content, category })
    });
    const data = await res.json();
    document.getElementById("createResult").textContent =
        JSON.stringify(data, null, 2);
});
fetchBtn.addEventListener("click", async () => {
    const token = getAccessToken();
    if (!token)
        return alert("Login first");
    const res = await fetch("/v1/notes", {
        headers: { "Authorization": "Bearer " + token }
    });
    const data = await res.json();
    document.getElementById("notesResult").textContent =
        JSON.stringify(data, null, 2);
});

import { getAccessToken } from "./login.js";

const createBtn = document.getElementById("createBtn")!;
const fetchBtn = document.getElementById("fetchBtn")!;

createBtn.addEventListener("click", async () => {
    const token = getAccessToken();
    if (!token) return alert("Login first");

    const title = (document.getElementById("noteTitle") as HTMLInputElement).value;
    const content = (document.getElementById("noteContent") as HTMLTextAreaElement).value;
    const category = (document.getElementById("noteCategory") as HTMLInputElement).value;

    const res = await fetch("/v1/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token },
        body: JSON.stringify({ title, content, category })
    });

    const data = await res.json();
    (document.getElementById("createResult") as HTMLPreElement).textContent =
        JSON.stringify(data, null, 2);
});

fetchBtn.addEventListener("click", async () => {
    const token = getAccessToken();
    if (!token) return alert("Login first");

    const res = await fetch("/v1/notes", {
        headers: { "Authorization": "Bearer " + token }
    });

    const data = await res.json();
    (document.getElementById("notesResult") as HTMLPreElement).textContent =
        JSON.stringify(data, null, 2);
});

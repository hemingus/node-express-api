let accessToken: string | null = null;

const loginBtn = document.getElementById("loginBtn")!;
loginBtn.addEventListener("click", async () => {
    const username = (document.getElementById("username") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const res = await fetch("/v1/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) accessToken = data.accessToken;

    (document.getElementById("loginResult") as HTMLPreElement).textContent =
        JSON.stringify(data, null, 2);
});

export function getAccessToken(): string | null {
    return accessToken;
}

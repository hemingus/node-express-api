export interface User {
    id: string;
    username: string;
    password: string; // plain text for testing only!
}

// Users contains a hard coded user for testing
export const users: User[] = [
    {
        id: "1",
        username: "testuser",
        password: "password123",
    },
];
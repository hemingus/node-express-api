export interface User {
    id: string;
    username: string;
    password: string; // plain text for testing only!
}

// Users contains a hard coded user for testing
export const users: User[] = [
    {
        id: "1",
        username: "alfa",
        password: "alfa123",
    },
        {
        id: "2",
        username: "beta",
        password: "beta123",
    },
        {
        id: "3",
        username: "gamma",
        password: "gamma123",
    },
        {
        id: "4",
        username: "delta",
        password: "delta123",
    },
];
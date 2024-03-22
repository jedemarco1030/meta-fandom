export interface User {
    id: string; // Ensuring this is a string to align with NextAuth requirements
    name?: string;
    email: string;
    // You can add other fields here as needed
}

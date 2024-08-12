'use server'

export async function getUser() {
    try {
        // Simulate an API call with a promise
        const user = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: 1,
                    name: "John Doe",
                    email: "johndoe@example.com",
                });
            }, 2000); // Simulate a 2-second delay
        });

        return user; // Return the user object
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}
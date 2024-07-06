export default async function registerUser(userDetails) {
    const { firstName, lastName, email, password } = userDetails;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }
}
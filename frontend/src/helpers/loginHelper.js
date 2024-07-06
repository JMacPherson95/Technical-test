import { BASE_URL } from "../../config";

export default async function loginUser(userDetails) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        body: JSON.stringify(userDetails),
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Error(resData.message);
    }


}
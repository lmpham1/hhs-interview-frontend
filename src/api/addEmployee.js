const API_URL = "http://localhost:8080";

export default async function addEmployee(newData) {
  try {
    const response = await fetch(`${API_URL}/v1/nurse`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.id;
  } catch (err) {
    throw err;
  }
}

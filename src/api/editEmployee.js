const API_URL = "http://localhost:8080";

export default async function editEmployee(updatedData) {
  try {
    const response = await fetch(`${API_URL}/v1/nurse/${updatedData.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.updatedData;
  } catch (err) {
    throw err;
  }
}

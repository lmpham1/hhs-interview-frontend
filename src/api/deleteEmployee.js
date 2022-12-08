const API_URL = "http://localhost:8080";

export default async function deleteEmployee(id) {
  try {
    const response = await fetch(`${API_URL}/v1/nurse/${id}`, {
      method: "DELETE",
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

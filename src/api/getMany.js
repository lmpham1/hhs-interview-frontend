const API_URL = "http://localhost:8080";

export default async function getMany(options, pageNumber = 0) {
  try {
    let params = Object.entries(options)
      .filter(([_, value]) => value)
      .map(([key, value]) => {
        return `${key}=${value}`;
      })
      .join("&");
    const response = await fetch(
      `${API_URL}/v1/nurses?page=${pageNumber}&${params}`
    );
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export const restApiFetch = async (
  url: string,
  method: string,
  header: any,
  body: any
) => {
  try {
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...header,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

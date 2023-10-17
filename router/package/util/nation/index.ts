const endPoint = "http://localhost:3000/nations";
export const getNation = async (id?: string) => {
  try {
    const res = await fetch(id ? `${endPoint}/${id}` : `${endPoint}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

export const deleteNation = async (id?: string) => {
  try {
    const res = await fetch(id ? `${endPoint}/${id}` : `${endPoint}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

export const createNation = async (name: string, description: string) => {
  const res = await fetch(`${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
    }),
  });
  const data = await res.json();
  if (data.status === "error") {
    throw new Error("Nation name exists");
  }
  return data;
};

export const updateNation = async (
  id: string,
  name: string,
  description: string
) => {
  try {
    const res = await fetch(`${endPoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await res.json();
    if (data.status === "error") {
      throw new Error("Nation name exists");
    }
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: [] };
  }
};

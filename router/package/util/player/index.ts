const endPoint = "http://localhost:3000/players";
export const getPlayer = async (id?: string) => {
  try {
    const res = await fetch(id ? `${endPoint}/${id}` : `${endPoint}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const deletePlayer = async (id?: string) => {
  try {
    const res = await fetch(id ? `${endPoint}/${id}` : `${endPoint}`, {
      method: "DELETE",
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const createPlayer = async ({
  name,
  image,
  club,
  position,
  goals,
  isCaptain,
}: any) => {
  try {
    const res = await fetch(`${endPoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        club,
        position,
        goals,
        isCaptain,
      }),
    });
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const updatePlayer = async ({
  id,
  name,
  image,
  club,
  position,
  goals,
  isCaptain,
}: any) => {
  try {
    const res = await fetch(`${endPoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        club,
        position,
        goals,
        isCaptain,
      }),
    });

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

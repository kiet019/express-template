const endPlayerPoint = "http://localhost:3000/players";

const openCreatePlayerButton = document.getElementById(
  "open-create-player-button"
);
const closeCreatePlayerButton = document.getElementById(
  "close-create-player-button"
);
const createPlayerForm = document.getElementById("create-player-form");

const closeUpdatePlayerButton = document.getElementById(
  "close-update-player-button"
);
const updatePlayerForm = document.getElementById("update-player-form");

const deletePlayerButton = document.getElementById("delete-all-player-button");
const searchPlayerButton = document.getElementById("search-player-button");

const getPlayer = async (id) => {
  try {
    const res = await fetch(
      id ? `${endPlayerPoint}/${id}` : `${endPlayerPoint}`
    );
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

const deletePlayer = async (id) => {
  try {
    const res = await fetch(
      id ? `${endPlayerPoint}/${id}` : `${endPlayerPoint}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  } finally {
    playerTable();
  }
};

const createPlayer = async (name, image, club, position, goals, isCaptain) => {
  try {
    const res = await fetch(`${endPlayerPoint}`, {
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
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  } finally {
    playerTable();
  }
};

const updatePlayer = async (
  id,
  name,
  image,
  club,
  position,
  goals,
  isCaptain
) => {
  try {
    const res = await fetch(`${endPlayerPoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        name,
        image,
        club,
        position,
        goals,
        isCaptain,
      }),
    });
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  } finally {
    playerTable();
  }
};

const playerTable = async (id) => {
  const data = await getPlayer(id);
  const tableBody = document.getElementById("table-player-body");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item._id}</td>
          <td>${item.name}</td>
          <td>${item.image}</td>
          <td>${item.club}</td>
          <td>${item.position}</td>
          <td>${item.goals}</td>
          <td>${item.isCaptain ? "yes" : "no"}</td>
          <td>
            <button class="delete-button" data-id="${item._id}">Delete</button>
            <button class="update-button" data-id="${item._id}-${item.name}-${
              item.image
            }-${item.club}-${item.position}-${item.goals}-${
              item.isCaptain
            }">Update</button>
            </td>
            `;
    tableBody.appendChild(row);
    const deleteButton = row.querySelector(".delete-button");
    const updateButton = row.querySelector(".update-button");

    deleteButton.addEventListener("click", () => {
      const itemId = deleteButton.getAttribute("data-id");
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmDelete) {
        deletePlayer(item._id);
      }
    });

    updateButton.addEventListener("click", () => {
      const item = updateButton.getAttribute("data-id").split("-");

      console.log(item);
      const idInput = updatePlayerForm.querySelector("#id");
      const nameInput = updatePlayerForm.querySelector("#name");
      const imageInput = updatePlayerForm.querySelector("#image");
      const clubInput = updatePlayerForm.querySelector("#club");
      const positionInput = updatePlayerForm.querySelector("#position");
      const goalsInput = updatePlayerForm.querySelector("#goals");
      const isCaptainInput = updatePlayerForm.querySelector("#isCaptain");

      idInput.value = item[0];
      nameInput.value = item[1];
      imageInput.value = item[2];
      clubInput.value = item[3];
      positionInput.value = item[4];
      goalsInput.value = item[5];
      isCaptainInput.checked = item[6] === "true";

      console.log(isCaptainInput);
      updatePlayerForm.style.visibility = "visible";
    });
  });
};
closeUpdatePlayerButton.addEventListener("click", () => {
  updatePlayerForm.style.visibility = "hidden";
});

openCreatePlayerButton.addEventListener("click", () => {
  createPlayerForm.style.visibility = "visible";
});

closeCreatePlayerButton.addEventListener("click", () => {
  createPlayerForm.style.visibility = "hidden";
});

deletePlayerButton.addEventListener("click", () => {
  const confirmDelete = window.confirm("Are you sure you want to delete all?");
  if (confirmDelete) {
    deletePlayer();
  }
});

searchPlayerButton.addEventListener("click", () => {
  const id = document.getElementById("search-player").value;
  playerTable(id);
});

createPlayerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(createPlayerForm);
  const name = formData.get("name");
  const image = formData.get("image");
  const club = formData.get("club");
  const position = formData.get("position");
  const goals = formData.get("goals");
  const isCaptain = formData.get("isCaptain") === "on" ? true : false;
  const check = formData.get("isCaptain");
  createPlayer(name, image, club, position, goals, isCaptain);
  createPlayerForm.style.visibility = "hidden";
});

updatePlayerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(updatePlayerForm);
  const name = formData.get("name");
  const image = formData.get("image");
  const club = formData.get("club");
  const position = formData.get("position");
  const goals = formData.get("goals");
  const isCaptain = formData.get("isCaptain") === "on" ? true : false;
  const id = formData.get("id");

  updatePlayer(id, name, image, club, position, goals, isCaptain);

  updatePlayerForm.style.visibility = "hidden";
});

playerTable();

const baseURL = "http://localhost:5000";

const openCreateNationButton = document.getElementById(
  "open-create-nation-button"
);
const closeCreateNationButton = document.getElementById(
  "close-create-nation-button"
);
const createNationForm = document.getElementById("create-nation-form");

const closeUpdateNationButton = document.getElementById(
  "close-update-nation-button"
);
const updateNationForm = document.getElementById("update-nation-form");

const deleteNationButton = document.getElementById("delete-all-nation-button");
const searchNationButton = document.getElementById("search-nation-button");

const getNation = async (id) => {
  try {
    const res = await fetch(
      id ? `${baseURL}/nations/${id}` : `${baseURL}/nations`
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

const deleteNation = async (id) => {
  try {
    const res = await fetch(
      id ? `${baseURL}/nations/${id}` : `${baseURL}/nations`,
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
    nationTable();
  }
};

const createNation = async (name, description) => {
  try {
    const res = await fetch(`${baseURL}/nations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
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
    nationTable();
  }
};

const updateNation = async (id, name, description) => {
  try {
    const res = await fetch(`${baseURL}/nations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
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
    nationTable();
  }
};

const nationTable = async (id) => {
  const data = await getNation(id);

  const tableBody = document.getElementById("table-nation-body");
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${item._id}</td>
          <td>${item.name}</td>
          <td>${item.description}</td>
          <td>
            <button class="delete-button" data-id="${item._id}">Delete</button>
            <button class="update-button" data-id="${item._id}-${item.name}-${item.description}">Update</button>
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
        deleteNation(item._id);
      }
    });

    updateButton.addEventListener("click", () => {
      const item = updateButton.getAttribute("data-id").split("-");

      const nameInput = updateNationForm.querySelector("#name");
      const descriptionInput = updateNationForm.querySelector("#description");
      const idInput = updateNationForm.querySelector("#id");

      idInput.value = item[0];
      nameInput.value = item[1];
      descriptionInput.value = item[2];

      updateNationForm.style.visibility = "visible";
    });
  });
};
closeUpdateNationButton.addEventListener("click", () => {
  updateNationForm.style.visibility = "hidden";
});

openCreateNationButton.addEventListener("click", () => {
  createNationForm.style.visibility = "visible";
});

closeCreateNationButton.addEventListener("click", () => {
  createNationForm.style.visibility = "hidden";
});

deleteNationButton.addEventListener("click", () => {
  const confirmDelete = window.confirm("Are you sure you want to delete all?");
  if (confirmDelete) {
    deleteNation();
  }
});

searchNationButton.addEventListener("click", () => {
  const id = document.getElementById("search-nation").value;
  nationTable(id);
});

createNationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(createNationForm);
  const name = formData.get("name");
  const description = formData.get("description");
  createNation(name, description);
  createNationForm.style.visibility = "hidden";
});

updateNationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(updateNationForm);

  const id = formData.get("id");
  const name = formData.get("name");
  const description = formData.get("description");

  updateNation(id, name, description);

  updateNationForm.style.visibility = "hidden";
});

nationTable();

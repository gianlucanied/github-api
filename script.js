function search() {
  const searchInputValue = document.getElementById("searchInput").value;

  const data = {
    params: {
      q: searchInputValue,
    },
    headers: {
      Authorization: `Bearer ${config.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  };

  axios
    .get("https://api.github.com/search/repositories", data)
    .then((response) => {
      displayResults(response.data.items);
      console.log(response.data.items);
    })
    .catch((error) => {
      console.error("Errore durante la richiesta API:", error);
    });
}

function displayResults(items) {
  const resultsList = document.getElementById("results");
  resultsList.innerHTML = "";

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const imgUser = document.createElement("img");
    imgUser.src = item.owner.avatar_url;

    const titleItem = document.createElement("h2");
    titleItem.textContent = item.full_name;

    const descriptionItem = document.createElement("p");
    descriptionItem.textContent = item.description;

    const linkButton = document.createElement("button");
    linkButton.textContent = "Vai alla repo";
    linkButton.addEventListener("click", function () {
      window.location.href = item.html_url;
    });

    card.appendChild(imgUser);
    card.appendChild(titleItem);
    card.appendChild(descriptionItem);
    card.appendChild(linkButton);

    resultsList.appendChild(card);
  });
}

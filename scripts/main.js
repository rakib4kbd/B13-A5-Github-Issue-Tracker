const allIssues = [];

const fetchAllIssues = () => {
  document.getElementById("issue_count").innerHTML =
    `<span class="loading loading-spinner loading-sm"></span>
`;
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
      const arr = data.data;
      allIssues.push(...arr);

      document.getElementById("issue_count").innerText =
        `${allIssues.length} Issues`;
      renderIssueCard(allIssues);
      return allIssues;
    });
};

fetchAllIssues();

const renderIssueCard = (issues) => {
  const issuesContainer = document.getElementById("issue_container");
  issuesContainer.innerHTML = "";
  issues.forEach((element) => {
    const issueCard = document.createElement("div");
    issueCard.classList.add(
      "flex",
      "flex-col",
      "justify-center",
      "bg-base-100",
      "w-full",
      "h-full",
      "drop-shadow-sm",
      "rounded-lg",
      "border-t-4",
      `${element.status === "open" ? "border-t-green-500" : "border-t-purple-500"}`,
    );

    const labelsList = {
      bug: { color: "red", icon: "fa-bug" },
      enhancement: { color: "green", icon: "fa-paint-roller" },
      helpwanted: { color: "yellow", icon: "fa-circle-info" },
      goodfirstissue: { color: "gray", icon: "fa-eye" },
      documentation: { color: "blue", icon: "fa-book" },
    };

    issueCard.addEventListener("click", () => {
      const modalContainer = document.getElementById("modal_div");
      modalContainer.showModal();
      modalContainer.innerHTML = `<span class="loading loading-spinner loading-sm"></span>`;

      fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${element.id}`)
        .then((res) => res.json())
        .then((data) => {
          const modalDetails = data.data;
          const modal = document.createElement("div");
          modal.classList.add(
            "modal-box",
            "flex",
            "flex-col",
            "justify-center",
            "gap-4",
          );
          modal.innerHTML = `
          <div class="flex flex-col justify-center gap-2">
            <h3 class="font-bold text-lg">${modalDetails.title}</h3>
            <div class="flex items-center gap-2 text-sm text-gray-500">
              
              ${modalDetails.status.toLowerCase() == "open" ? `<p class="bg-green-600 text-white rounded-full px-2">Open</p>` : `<p class="bg-red-600 text-white rounded-full px-2">Closed</p>`}
              <div class="border-2 border-gray-500 rounded-full"></div>
              <p>Opened by ${modalDetails.author}</p>
              <div class="border-2 border-gray-500 rounded-full"></div>
              <p>${new Date(modalDetails.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div class="flex gap-2">
               ${modalDetails.labels
                 .map((label) => {
                   const fLabel = label.split(" ").join("");
                   const labelDetails = labelsList[fLabel];
                   return `<p class="text-sm bg-${labelDetails.color}-100 rounded-full px-3 py-0.5 text-${labelDetails.color}-500 flex items-center justify-center gap-1"><span><i class="text-sm fa-solid ${labelDetails.icon}"></i></span>${label.toUpperCase()}</p>`;
                 })
                 .join("")}
          </div>

          <p class="text-gray-500">
          ${modalDetails.description}
          </p>

          <div
            class="grid grid-cols-2 items-center bg-[#F8FAFC] p-4 rounded-lg"
          >
            <div class="flex flex-col justify-center gap-1">
              <p>Assignee:</p>
              <strong>${modalDetails.assignee ? `${modalDetails.assignee}` : "fahim_ahmed"}</strong>
            </div>
            <div class="flex flex-col justify-center gap-1">
              <p>Priority:</p>
              <div class="flex">
                ${
                  modalDetails.priority.toLowerCase() === "high"
                    ? `<p class="px-3 py-1 bg-red-600 text-white text-xs rounded-full">
                  HIGH
                </p>`
                    : ""
                }
                ${
                  modalDetails.priority.toLowerCase() === "medium"
                    ? `<p class="px-3 py-1 bg-yellow-600 text-white text-xs rounded-full">
                  MEDIUM
                </p>`
                    : ""
                }${
                  modalDetails.priority.toLowerCase() === "low"
                    ? `<p class="px-3 py-1 bg-gray-600 text-white text-xs rounded-full">
                  LOW
                </p>`
                    : ""
                }
              </div>
            </div>
          </div>

          <div class="modal-action m-0">
            <form method="dialog">
              <button class="btn btn-primary">Close</button>
            </form>
          </div>
    `;
          modalContainer.innerHTML = "";
          modalContainer.appendChild(modal);
        });
    });

    issueCard.innerHTML = `
  <div class="flex-1 flex flex-col gap-3 p-4 me-auto w-full">
    <div class="flex items-center justify-between">
      <img src="${element.status === "closed" ? "./assets/status_closed.png" : "./assets/status_open.png"}" alt="" width="24px" height="24px" />
      ${element.priority.toLowerCase() === "low" ? `<p class="bg-gray-100 rounded-full px-6 py-1 text-gray-500 text-sm">${element.priority.toUpperCase()}</p>` : ""}
      ${element.priority.toLowerCase() === "medium" ? `<p class="bg-yellow-100 rounded-full px-6 py-1 text-yellow-600 text-sm">${element.priority.toUpperCase()}</p>` : ""}
      ${element.priority.toLowerCase() === "high" ? `<p class="bg-red-100 rounded-full px-6 py-1 text-red-600 text-sm">${element.priority.toUpperCase()}</p>` : ""}
    </div>
    <div class="flex flex-col justify-center gap-2">
      <h2 class="font-semibold text-lg text-[#1F2937]">
        ${element.title}
      </h2>
      <p class="text-gray-500 text-sm line-clamp-2">
        ${element.description}
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-2">

      ${element.labels
        .map((label) => {
          const fLabel = label.split(" ").join("");
          const labelDetails = labelsList[fLabel];
          return `<p class="text-sm bg-${labelDetails.color}-100 rounded-full px-3 py-1 text-${labelDetails.color}-500 flex items-center gap-1"><span><i class="fa-solid ${labelDetails.icon}"></i></span>${label.toUpperCase()}</p>`;
        })
        .join("")}

    </div>
  </div>
  <div class="border border-gray-100"></div>
  <div class="p-4 flex flex-col gap-2">
    <p class="text-gray-500">by ${element.author}</p>
    <p class="text-gray-500">${new Date(element.createdAt).toLocaleDateString()}</p>
  </div>

`;

    issuesContainer.appendChild(issueCard);
  });
};

const searchIssue = () => {
  const query = document.getElementById("search_input").value;
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`)
    .then((res) => res.json())
    .then((data) => {
      const searchedIssues = data.data;

      const selectedBtn = document
        .getElementById("category")
        .querySelector("button.bg-primary")
        .innerText.toLowerCase();

      if (selectedBtn === "all") {
        renderIssueCard(searchedIssues);
        document.getElementById("issue_count").innerText =
          `${searchedIssues.length} Issues`;
      } else {
        const issues = searchedIssues.filter(
          (issue) => issue.status === selectedBtn,
        );
        renderIssueCard(issues);
        document.getElementById("issue_count").innerText =
          `${issues.length} Issues`;
      }
    });
};

const categoryBtn = document.getElementById("category").children;
for (btn of categoryBtn) {
  btn.addEventListener("click", (event) => {
    const key = event.target.innerText.toLowerCase();
    categoryBtnHandler(key);
    categorizedRender(key);
  });
}

const categoryBtnHandler = (key) => {
  const categoryContainer = document.getElementById("category");
  for (category of categoryContainer.children) {
    if (category.innerText.toLowerCase() === key) {
      category.classList.add("bg-primary", "text-white");
      category.classList.remove("text-gray-500");
    } else {
      category.classList.remove("bg-primary", "text-white");
      category.classList.add("text-gray-500");
    }
  }
};

const categorizedRender = (category) => {
  if (category != "all" || category === "") {
    const categorizedIssues = allIssues.filter(
      (element) => element.status.toLowerCase() === category,
    );
    document.getElementById("issue_count").innerText =
      `${categorizedIssues.length} Issues`;

    renderIssueCard(categorizedIssues);
  } else {
    document.getElementById("issue_count").innerText =
      `${allIssues.length} Issues`;
    renderIssueCard(allIssues);
  }
};

const usersTable = document.getElementById("users-table");
const filterDropdown = document.getElementById("filter-dropdown");

async function getUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function renderUsersTable(users) {
  let tableHtml = `
    <thead>
      <tr>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
  `;
  users.forEach((user) => {
    tableHtml += `
      <tr>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
      </tr>
    `;
  });
  tableHtml += '</tbody>';
  usersTable.innerHTML = tableHtml;
}

async function init() {
  const users = await getUsers();
  renderUsersTable(users);
}

filterDropdown.addEventListener("change", async (event) => {
  const filterBy = event.target.value;
  const users = await getUsers();
  const filteredUsers = users.sort((a, b) => {
    if (a[filterBy] < b[filterBy]) {
      return -1;
    } else if (a[filterBy] > b[filterBy]) {
      return 1;
    } else {
      return 0;
    }
  });
  renderUsersTable(filteredUsers);
});

init();


const filterInput = document.getElementById("filter-input");
filterInput.addEventListener("input", async () => {
  const filterValue = filterInput.value.toLowerCase();
  const filterOption = filterDropdown.value;
  const filteredUsers = await fetchFilteredUsers(filterOption, filterValue);
  renderUsers(filteredUsers);
});

const namesButton = document.getElementById("names-button");
namesButton.addEventListener("click", () => {
  const userNames = getUsersNames(users);
  console.log(userNames);
});

function getUsersNames(users) {
  return users.map(user => user.name);
}


function getUsersAddresses(users) {
    return users.map(user => {
      const { street, suite, city, zipcode } = user.address;
      return `${street}, ${suite}, ${city} (${zipcode})`;
    });
  }
  
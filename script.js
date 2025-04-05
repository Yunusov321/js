let contacts = [];

    window.onload = function () {
      const savedContacts = localStorage.getItem("contacts");
      if (savedContacts) {
        contacts = JSON.parse(savedContacts);
        renderContacts();
      }
    };

    function saveToLocalStorage() {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    }

    function renderContacts(filtered = contacts) {
      const list = document.getElementById("contactList");
      list.innerHTML = "";

      filtered.forEach((contact, index) => {
        const contactDiv = document.createElement("div");
        contactDiv.className = "contact";
        contactDiv.innerHTML = `
          <div>
            <strong>${contact.name}</strong><br>
            <small>${contact.number}</small>
          </div>
          <div class="icons">
            <span onclick="editContact(${index})">✏️</span>
            <span onclick="deleteContact(${index})">🗑️</span>
          </div>
        `;
        list.appendChild(contactDiv);
      });
    }

    function addContact() {
      const name = document.getElementById("nameInput").value.trim();
      const number = document.getElementById("numberInput").value.trim();

      if (name && number) {
        contacts.push({ name, number });
        saveToLocalStorage();
        renderContacts();
        document.getElementById("nameInput").value = "";
        document.getElementById("numberInput").value = "";
      } else {
        alert("Ism va familiya kiriting!");
      }
    }

    function deleteContact(index) {
      contacts.splice(index, 1);
      saveToLocalStorage();
      renderContacts();
    }

    function editContact(index) {
      const newName = prompt("Yangi ism:", contacts[index].name);
      const newNumber = prompt("Yangi raqam:", contacts[index].number);

      if (newName && newNumber) {
        contacts[index] = { name: newName, number: newNumber };
        saveToLocalStorage();
        renderContacts();
      }
    }

    function sortContacts() {
      contacts.sort((a, b) => a.name.localeCompare(b.name));
      saveToLocalStorage();
      renderContacts();
    }

    function searchContacts() {
      const searchValue = document.getElementById("searchInput").value.toLowerCase();
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchValue) ||
        contact.number.includes(searchValue)
      );
      renderContacts(filtered);
    }
(() => {
  // ---operation of modal windows---

  window.location.hash = "";

  const deleteContact = () => {
    document.querySelectorAll(".modal-form").forEach((e) => {
      e.addEventListener("click", (ev) => {
        let targetItem = ev.target;
        if (targetItem.closest(".btn-deleteContact")) {
          targetItem.closest(".select-contacts").remove();
          e.querySelector(".plus-contact").style.display = "block";
          if (!e.querySelector(".select-contacts")) {
            document.querySelectorAll(".plus-contact").forEach((event) => {
              event.classList.remove("block-addingContact__margin");
            });
          }
        }
      });
    });
  };

  document.querySelector(".tbody").addEventListener("click", (e) => {
    let targrtItem = e.target;
    if (targrtItem.closest(".change-client")) {
      document.querySelector(".overlay_1").classList.add("overlay-fixed");
      deleteContact();
    }
    if (targrtItem.closest(".delete-client")) {
      document.querySelector(".overlay_3").classList.add("overlay-fixed");
    }
  });

  document.querySelector(".btn-table").addEventListener("click", () => {
    document.querySelector(".overlay_2").classList.add("overlay-fixed");
    deleteContact();
  });

  const modalClose = (e) => {
    e.addEventListener("click", () => {
      document.querySelector(".overlay_1").classList.remove("overlay-fixed");
      document.querySelector(".overlay_2").classList.remove("overlay-fixed");
      document.querySelector(".overlay_3").classList.remove("overlay-fixed");
      document.querySelectorAll(".select-contacts_wrapper").forEach((ev) => {
        ev.innerHTML = "";
      });
      document.querySelectorAll(".plus-contact").forEach((event) => {
        event.style.display = "block";
        event.classList.remove("block-addingContact__margin");
      });
      window.location.hash = "";
    });
  };

  document.querySelectorAll(".modal-close").forEach((e) => {
    modalClose(e);
  });

  document.querySelectorAll(".modal-cancel").forEach((e) => {
    modalClose(e);
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".modal__new-data") &&
      e.target.classList.contains("overlay_2")
    ) {
      document.querySelector(".overlay_2").classList.remove("overlay-fixed");
      document.querySelectorAll(".select-contacts_wrapper").forEach((e) => {
        e.innerHTML = "";
      });
      document.querySelectorAll(".plus-contact").forEach((e) => {
        e.style.display = "block";
        e.classList.remove("block-addingContact__margin");
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".modal__data-change") &&
      e.target.classList.contains("overlay_1")
    ) {
      document.querySelector(".overlay_1").classList.remove("overlay-fixed");
      document.querySelectorAll(".select-contacts_wrapper").forEach((e) => {
        e.innerHTML = "";
      });
      document.querySelectorAll(".plus-contact").forEach((e) => {
        e.style.display = "block";
        e.classList.remove("block-addingContact__margin");
      });
    }
  });

  document.addEventListener("click", (e) => {
    if (
      !e.target.closest(".modal__delete-data") &&
      e.target.classList.contains("overlay_3")
    ) {
      document.querySelector(".overlay_3").classList.remove("overlay-fixed");
    }
  });

  document.querySelector(".modal-form_2").addEventListener(
    "focus",
    (e) => {
      let targetItem = e.target;
      if (
        targetItem.closest(".modal2-form__input") &&
        targetItem.value.trim() === ""
      ) {
        targetItem.previousElementSibling.style.opacity = "0";
      }
    },
    true
  );

  document.querySelector(".modal-form_2").addEventListener(
    "blur",
    (e) => {
      let targetItem = e.target;
      if (
        targetItem.closest(".modal2-form__input") &&
        targetItem.value.trim() === ""
      ) {
        targetItem.previousElementSibling.style.opacity = "1";
      }
    },
    true
  );

  // ---creating a customer contact---

  const settingtDate = (date) => {
    let dateCreate = new Date(date);
    let dd = dateCreate.getDate();
    let mm = dateCreate.getMonth() + 1;
    let yyyy = dateCreate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    return dd + "." + mm + "." + yyyy;
  };

  const settingTime = (data) => {
    let timeCreate = new Date(data);
    let hh = timeCreate.getHours();
    let mm = timeCreate.getMinutes();
    if (hh < 10) {
      hh = "0" + hh;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return hh + ":" + mm;
  };

  const createContactClient = (type, value, i) => {
    const contactsClient = document.querySelector(i);

    const contactClient = document.createElement("div");
    contactClient.classList.add("tooltip-contact");
    contactClient.innerHTML = `<img src="img/${type}.svg" alt="В контакте" class="marker" tabindex="1">
      <div class="popup">${type}:
        <span class="popup__margin">${value}</span>
        <div class="rectangle-wrapper">
          <div class="rectangle"></div>
        </div>
      </div>`;

    contactsClient.append(contactClient);

    contactsClient.addEventListener("mouseover", function (event) {
      let target = event.target;
      if (target.closest(".marker")) {
        target.nextElementSibling.classList.add("opacityPopup");
        const widthPopup = target.nextElementSibling.clientWidth;
        target.nextElementSibling.style.left = `${-widthPopup / 2 + 8}px`;
      }
    });
    contactsClient.addEventListener("mouseout", function (event) {
      let target = event.target;
      if (target.closest(".marker")) {
        target.nextElementSibling.classList.remove("opacityPopup");
      }
    });
  };

  const createClient = () => {
    const objClient = {};
    const form = document.querySelector(".modal-form_2");
    const surname = document.getElementById("surname_2");
    const name = document.getElementById("name_2");
    const lastname = document.getElementById("lastname_2");
    const selects = form.querySelectorAll(".select-addingContact");

    objClient.name = (
      name.value[0].toUpperCase() + name.value.substr(1)
    ).trim();

    objClient.surname = (
      surname.value[0].toUpperCase() + surname.value.substr(1)
    ).trim();

    if (lastname.value) {
      objClient.lastName = (
        lastname.value[0].toUpperCase() + lastname.value.substr(1)
      ).trim();
    }

    objClient.contacts = [];

    selects.forEach((select) => {
      const input = select.nextElementSibling;
      const type = select.value;
      const value = input.value;
      const contact = {};
      contact.type = type;
      contact.value = value;
      objClient.contacts.push(contact);
    });

    return objClient;
  };

  const createClientChange = () => {
    const objClient = {};
    const form = document.querySelector(".modal-form_1");
    const surname = document.getElementById("surname_1");
    const name = document.getElementById("name_1");
    const lastname = document.getElementById("lastname_1");
    const selects = form.querySelectorAll(".select-addingContact");

    objClient.name = (
      name.value[0].toUpperCase() + name.value.substr(1)
    ).trim();

    objClient.surname = (
      surname.value[0].toUpperCase() + surname.value.substr(1)
    ).trim();

    if (lastname.value) {
      objClient.lastName = (
        lastname.value[0].toUpperCase() + lastname.value.substr(1)
      ).trim();
    }

    objClient.contacts = [];

    selects.forEach((select) => {
      const input = select.nextElementSibling;
      const type = select.value;
      const value = input.value;
      const contact = {};
      contact.type = type;
      contact.value = value;
      objClient.contacts.push(contact);
    });

    return objClient;
  };

  async function renderItems(data) {
    let i = 1;
    data.forEach((item) => {
      let tbody = document.querySelector(".tbody");
      const { id, name, surname, lastName, contacts, createdAt, updatedAt } =
        item;
      const client = document.createElement("tr");
      client.classList.add("tr-tbody");

      client.innerHTML = `<tr class="tr-tbody">
        <td scope="row" class="td-tbody text-grey td-tbody__id">${id}</td>
        <td class="td-tbody td-tbody__name">${surname} ${name} ${lastName}</td>
        <td class="td-tbody td-tbody__date-create">${settingtDate(
          createdAt
        )}<span class="text-grey td-tbody__time-create">${settingTime(
        createdAt
      )}</span></td>
        <td class="td-tbody td-tbody__date-change">${settingtDate(
          updatedAt
        )}<span class="text-grey td-tbody__time-change">${settingTime(
        updatedAt
      )}</span></td>
        <td class="td-tbody td-tbody-contacts td-tbody-contacts_${i}"></td>
        <td class="td-tbody change-client"><span class="td-tbody__pencil"><img class="pencil" src="img/pencil.svg" alt=""></span>Изменить</td>
        <td class="td-tbody delete-client"><span class="td-tbody__cross"><img class="cross" src="img/cross.svg" alt=""></span>Удалить</td>
      </tr>`;

      tbody.append(client);

      contacts.forEach((contact) => {
        createContactClient(
          contact.type,
          contact.value,
          `.td-tbody-contacts_${i}`
        );
      });

      i++;
    });
  }

  async function loadClients() {
    const response = await fetch(`http://localhost:3000/api/clients`);
    const data = await response.json();
    renderItems(data);
  }

  loadClients();

  // ---adding a client---

  async function onSave() {
    const objClient = createClient();

    const response = await fetch("http://localhost:3000/api/clients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objClient),
    });
    // const data = await response.json();
    // console.log(data);
  }

  document.getElementById("form_2").addEventListener("submit", (event) => {
    event.preventDefault();
    onSave();
  });

  document.getElementById("form_1").addEventListener("submit", (event) => {
    event.preventDefault();
  });

  const newContact = () => {
    document.querySelectorAll(".select-contacts_wrapper").forEach((e) => {
      const selectContacts = document.createElement("div");
      selectContacts.classList.add("select-contacts");
      selectContacts.innerHTML = `<div class="input-group block-addingContact">
        <select class="form-select select-addingContact">
          <option class="option" value="телефон" selected>Телефон</option>
          <option class="option" value="доп.телефон">Доп. телефон</option>
          <option class="option" value="mail">Email</option>
          <option class="option" value="vk">Vk</option>
          <option class="option" value="facebook">Facebook</option>
          <option class="option" value="другое">Другое</option>
        </select>
        <input type="text" class="form-control input-addingContact" placeholder="Введите данные контакта" required>
        <div class="btn btn-outline-secondary btn-deleteContact"></div>
      </div>`;

      e.append(selectContacts);
    });
  };

  const addMargin = () => {
    document.querySelectorAll(".select-contacts").forEach((e) => {
      if (e) {
        document.querySelectorAll(".plus-contact").forEach((event) => {
          event.classList.add("block-addingContact__margin");
        });
      }
    });
  };

  document.querySelectorAll(".plus-contact").forEach((e) => {
    e.addEventListener("click", () => {
      newContact();
      addMargin();
      if (
        e.closest(".modal-addingContact").querySelectorAll(".select-contacts")
          .length >= 10
      ) {
        e.style.display = "none";
      }
    });
  });

  // sorting by name

  const sortUp = (surname, name, lastname) => {
    return (a, b) =>
      a[surname] + a[name] + a[lastname] > b[surname] + b[name] + b[lastname]
        ? 1
        : -1;
  };

  const sortDown = (surname, name, lastname) => {
    return (a, b) =>
      a[surname] + a[name] + a[lastname] > b[surname] + b[name] + b[lastname]
        ? -1
        : 1;
  };

  const sortDateUp = () => {
    return (a, b) => new Date(a.createdAt) - new Date(b.createdAt);
  };

  const sortDateDown = () => {
    return (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
  };

  let sort1 = true;
  let sort2 = false;
  let sort3 = false;
  let sort4 = false;

  const sortToggle = (sort, elem, data, sort_1, sort_2) => {
    if (sort) {
      data.sort(sort_1);
      elem.querySelector(".img-vector").classList.remove("rotate");
      // console.log(elem);
      // if (elem.contains(document.querySelector(".tr-head__A-YA"))) {
      //   document.querySelector(".tr-head__A-YA").innerHTML = "А-Я";
      // }
    } else {
      data.sort(sort_2);
      elem.querySelector(".img-vector").classList.add("rotate");
      // if (elem.contains(document.querySelector(".tr-head__A-YA"))) {
      //   document.querySelector(".tr-head__A-YA").innerHTML = "Я-А";
      // }
    }
  };

  document.querySelectorAll(".th").forEach((e) => {
    e.addEventListener("click", async (ev) => {
      let targetItem = ev.currentTarget;
      const response = await fetch(`http://localhost:3000/api/clients`);
      const data = await response.json();
      if (targetItem.classList.contains("th-1")) {
        sort1 = !sort1;
        sortToggle(sort1, targetItem, data, sortUp("id"), sortDown("id"));
      } else if (targetItem.classList.contains("th-2")) {
        sort2 = !sort2;
        sortToggle(
          sort2,
          targetItem,
          data,
          sortUp("surname", "name", "lastName"),
          sortDown("surname", "name", "lastName")
        );
        if (targetItem.classList.contains("th-mame")) {
        }
      } else if (targetItem.classList.contains("th-3")) {
        sort3 = !sort3;
        sortToggle(sort3, targetItem, data, sortDateUp(), sortDateDown());
      } else if (targetItem.classList.contains("th-4")) {
        sort4 = !sort4;
        sortToggle(sort4, targetItem, data, sortDateUp(), sortDateDown());
      }

      document.getElementById("tbody").innerHTML = "";
      renderItems(data);
    });
  });

  // search

  const searchFilter = (client, value) => {
    return client.filter((item) => {
      return (
        item.surname.toLowerCase().includes(value.toLowerCase()) ||
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.lastName.toLowerCase().includes(value.toLowerCase()) ||
        item.id.includes(value)
      );
    });
  };

  const search = () => {
    const searchInput = document.querySelector(".search");
    let timeoutID;

    searchInput.addEventListener("input", () => {
      clearTimeout(timeoutID);
      timeoutID = null;
    });

    searchInput.addEventListener("input", (e) => {
      if (!timeoutID) {
        timeoutID = setTimeout(async () => {
          const response = await fetch(`http://localhost:3000/api/clients`);
          const data = await response.json();
          const value = e.target.value;
          document.getElementById("tbody").innerHTML = "";
          renderItems(searchFilter(data, value));
        }, 300);
      }
    });
  };

  search();

  // changing the client

  let id;

  document.querySelector(".tbody").addEventListener("click", async (e) => {
    let targrtItem = e.target;

    if (targrtItem.closest(".change-client")) {
      id = targrtItem
        .closest(".tr-tbody")
        .querySelector(".td-tbody__id").textContent;
      const response = await fetch(`http://localhost:3000/api/clients/${id}`);
      const data = await response.json();
      document.querySelector(".modal-heading__id").textContent = `ID: ${id}`;
      const { name, surname, lastName, contacts } = data;
      document.getElementById("surname_1").value = surname;
      document.getElementById("name_1").value = name;
      document.getElementById("lastname_1").value = lastName;

      document.querySelector(".overlay_1").setAttribute("id", id);
      window.location.hash = `${id}`;

      let i = 0;
      while (i < contacts.length) {
        newContact();
        const select = document.querySelectorAll(".select-addingContact")[i];

        select.querySelectorAll(".option").forEach((e) => {
          if (e.value == contacts[i].type) {
            e.setAttribute("selected", true);
          }
        });

        select.nextElementSibling.value = contacts[i].value;

        addMargin();

        i++;
      }

      if (document.querySelectorAll(".select-addingContact").length >= 20) {
        document.querySelector(".plus-contact").style.display = "none";
      }
    }
  });

  async function changeClient() {
    const objClient = createClientChange();

    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(objClient),
    });
    // const data = await response.json();
    // console.log(data);
  }

  document.getElementById("form_1").addEventListener("submit", (event) => {
    event.preventDefault();
    changeClient();
  });

  // deleting a client

  async function deleteClient() {
    const response = await fetch(`http://localhost:3000/api/clients/${id}`, {
      method: "DELETE",
    });
    if (response.status === 404)
      console.log("Не удалось удалить клиента, так как его не существует");
    // const data = await response.json();
    // console.log(data);
  }

  document.querySelector(".tbody").addEventListener("click", (e) => {
    let targrtItem = e.target;

    if (targrtItem.closest(".delete-client")) {
      id = targrtItem
        .closest(".tr-tbody")
        .querySelector(".td-tbody__id").textContent;
    }
  });

  document
    .querySelector(".btn-deleteClient")
    .addEventListener("click", async () => {
      deleteClient();
      document.querySelector(".overlay_3").classList.remove("overlay-fixed");
    });

  document
    .querySelector(".modal-deleteContact")
    .addEventListener("click", deleteClient);

  // preloader

  window.onload = function () {
    setTimeout(function () {
      document.querySelector(".preloader").style.display = "none";
    }, 400);
  };
})();

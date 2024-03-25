const modal = document.querySelector('.modal-container');
const tbody = document.querySelector('tbody');
const sEmail = document.querySelector('#m-email'); // Updated to email
const sPaidOn = document.querySelector('#m-funcao'); // Now represents "Paid On" as a date
const sAmount = document.querySelector('#m-salario'); // Now represents the amount
const btnSalvar = document.querySelector('#btnSalvar');

let itens;
let id;

function openModal(edit = false, index = 0) {
  modal.classList.add('active');

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active');
    }
  };

  if (edit) {
    sEmail.value = itens[index].email;
    sPaidOn.value = itens[index].paidOn;
    sAmount.value = itens[index].amount;
    id = index;
  } else {
    sEmail.value = '';
    sPaidOn.value = '';
    sAmount.value = '';
  }
}

function editItem(index) {
  openModal(true, index);
}

function deleteItem(index) {
  itens.splice(index, 1);
  setItensBD();
  loadItens();
}

function insertItem(item, index) {
  let tr = document.createElement('tr');
  tr.classList.add('new-row'); // Add the new-row class to the newly created row

  tr.innerHTML = `
    <td>${item.email}</td>
    <td>${item.paidOn}</td>
    <td>R$ ${item.amount}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit'></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `;

  // Add click event listener to the row
  tr.addEventListener('click', () => {
    viewDetails(index);
  });

  tbody.appendChild(tr);
}


btnSalvar.onclick = e => {
  e.preventDefault();

  if (sEmail.value == '' || sPaidOn.value == '' || sAmount.value == '') {
    return;
  }

  const newItem = {
    email: sEmail.value,
    paidOn: sPaidOn.value,
    amount: sAmount.value
  };

  if (id !== undefined) {
    itens[id] = newItem;
  } else {
    itens.push(newItem);
  }

  setItensBD();
  modal.classList.remove('active');
  loadItens();
  id = undefined;
}

function loadItens() {
  itens = getItensBD();
  tbody.innerHTML = '';
  itens.forEach((item, index) => {
    insertItem(item, index);
  });
}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? [];
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens));

loadItens();
function viewDetails(index) {
  const item = itens[index];
  localStorage.setItem('currentItem', JSON.stringify(item));
  window.location.href = 'details.html';
}

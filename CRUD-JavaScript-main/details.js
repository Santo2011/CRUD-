document.addEventListener('DOMContentLoaded', function () {
  const detailsContainer = document.getElementById('details');
  const currentItem = JSON.parse(localStorage.getItem('currentItem'));

  if (currentItem) {
    detailsContainer.innerHTML = `
      <p><strong>Email:</strong> ${currentItem.email}</p>
      <p><strong>Paid On:</strong> ${currentItem.paidOn}</p>
      <p><strong>Amount:</strong> ${currentItem.amount}</p>
    `;
  } else {
    detailsContainer.innerHTML = '<p>No details found.</p>';
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");
  const orderSummary = document.getElementById("order-summary");
  const confirmOrderBtn = document.getElementById("confirm-order");
  const confirmation = document.getElementById("confirmation");
  let count = 1;

  // Function to display order details in the summary section
  function displayOrderDetails(name, address, item, addons, quantity) {
    const orderDetail = document.createElement("div");
    orderDetail.innerHTML = `
        <p>Order: ${count}</p>
        <p>Name: ${name}</p>
        <p>Address: ${address}</p>
        <p>Item: ${item}</p>
        <p>Add-Ons: ${addons.join(", ")}</p>
        <p>Quantity: ${quantity}</p>
        <button class="delete">X</button>
      `;
    orderSummary.appendChild(orderDetail);
    count++;
  }

  // Function to handle order form submission
  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const item = document.getElementById("item").value;
    const quantity = document.getElementById("quantity").value;

    // Validation for empty fields
    if (name === "" || address === "" || item === "" || quantity === "") {
      showAlert("There should not be empty field", "error");
      return;
    }

    const addons = [];
    if (document.getElementById("extraCheese").checked)
      addons.push("Extra Cheese");
    if (document.getElementById("bacon").checked) addons.push("Bacon");
    if (document.getElementById("avocado").checked) addons.push("Avocado");
    if (document.getElementById("fries").checked) addons.push("Fries");

    displayOrderDetails(name, address, item, addons, quantity);

    // Clear form fields after adding order
    clearFields();
  });

  // Function to clear form fields
  function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("item").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("extraCheese").checked = false;
    document.getElementById("bacon").checked = false;
    document.getElementById("avocado").checked = false;
    document.getElementById("fries").checked = false;
  }

  // Function to display alert messages
  function showAlert(message, className) {
    let div = document.createElement("div");
    div.innerText = message;
    div.className = className;
    div.id = "box";
    document.querySelector("#notification").appendChild(div);
    setTimeout(function () {
      document.querySelector("#box").remove();
    }, 3000);
  }

  // Function to handle order deletion
  orderSummary.addEventListener("click", function (e) {
    deleteOrder(e.target);
  });

  function deleteOrder(elemToDelete) {
    if (elemToDelete.className === "delete") {
      elemToDelete.parentElement.remove();
      showAlert("Order successfully removed", "success");
    }
  }

  // Function to handle confirm order button
  confirmOrderBtn.addEventListener("click", function () {
    if (orderSummary.innerHTML === "") {
      showAlert("There are no orders to confirm", "warning");
      return;
    }

    orderSummary.style.display = "none";
    confirmation.style.display = "block";

    // Logic for saving order details (implementation depends on your preference)
    // You can save to local storage, send to server, etc.
    console.log("Order details to be saved or processed:");
    console.log(orderSummary.textContent); // Access order details from the summary section

    // Reset order summary and count for future orders
    orderSummary.innerHTML = "";
    count = 1;
  });
});

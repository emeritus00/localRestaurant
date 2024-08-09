window.addEventListener("DOMContentLoaded", () => {
  const orderForm = document.getElementById("orderForm");
  const orderSummary = document.getElementById("order-summary");
  const confirmation = document.getElementById("confirmation");
  const confirmOrderBtn = document.getElementById("confirm-order");

  orderForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const item = document.getElementById("item").value;
    const quantity = document.getElementById("quantity").value;
    const cardName = document.getElementById("card-name").value;
    const creditCard = document.getElementById("credit-card").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;
    const billingAddress = document.getElementById("billing-address").value;

    // Validation
    const creditCardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3}$/;
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;

    let valid = true;
    let errorMessage = "";

    if (!creditCardRegex.test(creditCard)) {
      valid = false;
      errorMessage += "Credit Card number must be sixteen digits.\n";
    }

    if (!expiryDateRegex.test(expiryDate)) {
      valid = false;
      errorMessage += "Expiry Date must be in MM/YY format.\n";
    }

    if (!cvvRegex.test(cvv)) {
      valid = false;
      errorMessage += "CVV must be three digits.\n";
    }

    if (!valid) {
      alert(errorMessage);
      return;
    }

    const addons = [];
    if (document.getElementById("extraCheese").checked)
      addons.push("Extra Cheese");
    if (document.getElementById("bacon").checked) addons.push("Bacon");
    if (document.getElementById("avocado").checked) addons.push("Avocado");
    if (document.getElementById("fries").checked) addons.push("Fries");

    if (
      name === "" ||
      address === "" ||
      item === "" ||
      quantity === "" ||
      cardName === "" ||
      //   creditCard === "" ||
      //   expiryDate === "" ||
      //   cvv === "" ||
      billingAddress === ""
    ) {
      showAlert("There should not be empty field", "error");
    } else {
      const orderDetails = {
        name: name,
        address: address,
        item: item,
        quantity: quantity,
        cardName: cardName,
        creditCard: creditCard,
        expiryDate: expiryDate,
        cvv: cvv,
        billingAddress: billingAddress,
        addons: addons,
      };

      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));

      document.getElementById("summary-name").innerText = `Name: ${name}`;
      document.getElementById(
        "summary-address"
      ).textContent = `Address: ${address}`;
      document.getElementById("summary-item").innerText = `Item: ${item}`;
      document.getElementById(
        "summary-addons"
      ).innerText = `Add-Ons: ${addons.join(", ")}`;
      document.getElementById(
        "summary-quantity"
      ).innerText = `Quantity: ${quantity}`;
      document.getElementById(
        "summary-card-name"
      ).innerText = `Name on Card: ${cardName}`;
      document.getElementById(
        "summary-credit-card"
      ).innerText = `Credit Card Number: ${creditCard}`;
      document.getElementById(
        "summary-expiry-date"
      ).innerText = `Expiry Date: ${expiryDate}`;
      document.getElementById(
        "summary-billing-address"
      ).innerText = `Billing Address: ${billingAddress}`;
      showAlert("Successfully added to order", "success");
      clearFields();

      orderSummary.style.display = "block";
    }
  });

  function clearFields() {
    document.getElementById("name").value = "";
    document.getElementById("address").value = "";
    document.getElementById("item").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("card-name").value = "";
    document.getElementById("credit-card").value = "";
    document.getElementById("expiry-date").value = "";
    document.getElementById("cvv").value = "";
    document.getElementById("billing-address").value = "";
    document.getElementById("extraCheese").checked = false;
    document.getElementById("bacon").checked = false;
    document.getElementById("avocado").checked = false;
    document.getElementById("fries").checked = false;
  }

  function showAlert(m, c) {
    let div = document.createElement("div");
    div.innerText = m;
    div.className = c;
    div.id = "box";
    document.querySelector("#notification").appendChild(div);
    this.setTimeout(function () {
      document.querySelector("#box").remove();
    }, 3000);
  }

  confirmOrderBtn.addEventListener("click", function () {
    orderSummary.style.display = "none";
    confirmation.style.display = "block";

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

    const orderJSON = JSON.stringify(orderDetails);
    saveOrderToFile(orderJSON);
  });

  function saveOrderToFile(orderJSON) {
    const blob = new Blob([orderJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "order.json";
    a.click();
    URL.revokeObjectURL(url);
  }
});

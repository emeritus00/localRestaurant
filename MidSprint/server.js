const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public")); // Ensure your HTML and script files are in a folder named 'public'

app.post("/submit-order", (req, res) => {
  const order = req.body;

  fs.readFile("orders.json", (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).json({ message: "Error reading order file" });
    }

    const orders = data ? JSON.parse(data) : [];
    orders.push(order);

    fs.writeFile("orders.json", JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: "Error saving order" });
      }

      res.status(200).json({ message: "Order saved successfully" });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

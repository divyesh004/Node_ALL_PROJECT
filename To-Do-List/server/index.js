const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
app.use(cors());
app.use(express.json());

// Get section
app.get("/product", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.error(err);
      res.send("Internal Server Error");
    } else {
      const newdata = JSON.parse(data);
      res.json(newdata);
    }
  });
});

// Post section

app.post("/product", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send("Internal Server Error");
    } else {
      const newdata = JSON.parse(data);
      newdata.push(req.body);
      fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
        if (err) {
          res.send("Internal Server Error");
        } else {
          res.send("Product added successfully");
        }
      });
    }
  });
});

// Delete Section
app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send("Internal Server Error");
    } else {
      let newdata = JSON.parse(data);
      newdata = newdata.filter((el) => el.id != id);
      fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
        if (err) {
          res.send("Internal Server Error");
        } else {
          res.send("Product deleted successfully");
        }
      });
    }
  });
});

// Edit Section
app.put("/product/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.send("Internal Server Error");
    } else {
      let products = JSON.parse(data);
      const productIndex = products.findIndex((el) => el.id == id);

      if (productIndex !== -1) {
        products[productIndex] = {
          ...products[productIndex],
          ...updatedProduct,
        };
        fs.writeFile("./db.json", JSON.stringify(products), (err) => {
          if (err) {
            res.send("Internal Server Error");
          } else {
            res.send("Product updated successfully");
          }
        });
      } else {
        res.send("Product not found");
      }
    }
  });
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

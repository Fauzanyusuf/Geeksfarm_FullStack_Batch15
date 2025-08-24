const express = require("express");
const cors = require("cors");
const contactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/contacts", contactRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});

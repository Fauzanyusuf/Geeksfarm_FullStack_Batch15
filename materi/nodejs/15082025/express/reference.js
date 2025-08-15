app.get("/product/:id", (req, res) => {
  const { id } = req.params;
  const { category } = req.query;
  let message = `Product ID: ${id}`;
  if (category) message += `, Category: ${category}`;
  res.send(message);
});

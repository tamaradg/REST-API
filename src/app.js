const express = require("express");
// Catégories :  /api/categories
// Produits : /api/products
const categories = [
  { id: 1, nom: "Jeux vidéos" },
  { id: 2, nom: "Ordinateurs" },
];
const app = express();
//on ajoute le middleware pour post ici
app.use(express.json());
app.get("/api/categories", (request, response) => {
  response.send(categories);
});

app.get("/api/categories/:id", (request, response) => {
  const id = parseInt(request.params.id);
  //   const category = categories.find(function (category) {
  //     return category.id === parseInt(id);
  //   });
  const category = categories.find((category) => category.id === parseInt(id));
  response.send(category);
});

app.post("/api/categories", (request, response) => {
  categories.push(request.body);
  response.send("Catégorie créée avec succès");
});

app.put('/api/categories/:id', (req, res) => {
    const id = ParseInt(req.params.id);
    const index = products.findIndex(category => category.id === id)
    // if (index === -1) {
    //     return res.status(404).send('Product not found')
    // }
    const updatedCat = {
        id: categories[index].id,
        name: req.body.nom
    }
    categories[index] = updatedCat
    res.status(200).json('Category updated')
});

app.delete('/api/categories/:id', (req, res) => {
    const id = ParseInt(req.params.id);
    const index = products.findIndex(category => category.id === id)
    //     if (index === -1) {
    //     return res.status(404).send('Product not found')
    // }
    categories.splice(index,1)
    res.status(200).json('Category deleted')
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});
//CRUD (Create Read Update Delete)

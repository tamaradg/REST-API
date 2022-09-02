const { response } = require("express");
const express = require("express");

// Catégories :  /api/categories
// Produits : /api/products

const categories = [
  { id: 1, nom: "Jeux vidéos", description:"Super" },
  { id: 2, nom: "Ordinateurs", description:"Génial" },
];

const app = express();
// le middleware
app.use(express.json());

function validateCategory(request, response, next) {
  console.log("Je suis le middleware");
  const id = parseInt(request.params.id);
  const category = categories.find((category) => category.id === parseInt(id));
  if (!category) {
    return response.sendStatus(404);
  }
  request.category = category;
  next();
}

function validateUpdate(req, res, next) {
  if (!req.body.nom && !req.body.description) {
    return res.status(400).send('Le nom et la description doivent être renseignés');
  } else if (!req.body.description) {
    return res.status(400).send('La decription ne peut pas être vide');
  } else if (!req.body.nom) {
    return res.status(400).send("Le nom ne peut pas être vide");
  }
  next();
};

function log(request,response, next) {
  let method = request.method;
  let url = request.url;
  let bodies = JSON.stringify(request.body);
  console.log(`${method} ${url} , BODY ${bodies}`);
  next();
}

app.get("/api/categories", (request, response) => {
  response.send(categories);
});

app.get("/api/categories/:id", validateCategory, (request, response) => {
  response.send(request.category);
});

app.post("/api/categories", log, (request, response) => {
  categories.push(request.body);
  response.send("Catégorie créée avec succès");
});

app.delete("/api/categories/:id", validateCategory, (request, response) => {
  const categoryIndex = categories.indexOf(request.category);
  categories.splice(categoryIndex, 1);
  response.send("Supprimé avec succès");
});

app.put("/api/categories/:id", validateCategory, validateUpdate, (request, response) => {
  Object.assign(request.category, request.body);
  response.send("Catégorie mis à jour ave c succès");
});

// #1. Ajouter un champs description dans les catégories
app.patch("/api/categories/:id", validateCategory, (request, response) => {
  Object.assign(request.category, request.body);
  response.send("Catégorie mis à jour avec succès");
});

// #2. Ajouter une logique de validation pour la création et mis à jour des categories
// #3. Si le nom est vide, écrire : "Le nom ne peut pas être vide"
// #4. Si la description est vide, écrire : "La description ne peut pas être vide"
// #5. En cas d'erreur, renvoyer un objet d'erreur
//    exemple :
// Si seul le nom est vide, renvoyer : body :{description:"effwfewf"}
// {
  //   errors: {
  //     nom: "Le nom ne peut pas être vide",
  //   }
  // }
  // Si seul la description est vide, renvoyer  : body {nom:"sdffdsf"}
  // {
    //   errors: {
      //     description: "La description ne peut pas être vide",
      //   }
      // }
      // Si les 2 sont vides:
  // {
    //   errors: {
      //     nom: "Le nom ne peut pas être vide",
      //     description: "La description ne peut pas être vide",
      //   }
      // }
// Ne pas envoyer un id.
// L'id est généré à partir d'un nombre aléatoire entre 1 et 999(Math.random)



const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server run on port ${PORT}`);
});

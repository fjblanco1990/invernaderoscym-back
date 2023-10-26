module.exports = app => {
    const casos = require("../controllers/casos_exitoso.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", casos.create);
  
    // Retrieve all Tutorials
    router.get("/getAll", casos.findAll);
  
    // Retrieve all published Tutorials
    router.get("/published", casos.findAllPublished);
  
    // Retrieve a single Tutorial with id
    router.get("/getAll/:id", casos.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", casos.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", casos.delete);
  
    // Delete all Tutorials
    router.delete("/", casos.deleteAll);
  
    app.use('/api/casos', router);//aqui se define la url del api
  };
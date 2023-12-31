const { Query } = require("mongoose");
const db = require("../models/usuarios.model");
const Users = db.User;

// Create and Save a new Tutorial
exports.create = (req, res) => {
   // Validate request
   if (!req.body.user_name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Tutorial
  const usuarios = new Users({
    user_name: req.body.user_name,
    name_complete: req.body.name_complete,
    identification: req.body.identification,
    email: req.body.email,
    edad: req.body.edad,
    direccion: req.body.direccion,
    hijos:  req.body.hijos,
    published: req.body.published,
    idCaso: req.body.idCaso
  });

  // Save Tutorial in the database
  usuarios.save(usuarios)
    .then(data => {
      res.status(200).send({
        message: "El registro se guardo exitosamente",
        data: data
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.user_name;
    var condition = name ? { user_name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    Users.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    console.log('params', req.params.id);
    Users.findById(id,)
      .then(data => {
        if (!data){

          res.status(404).send({ message: "Not found Tutorial with id " + id });
        }
        else {res.send(data);}
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });
};

exports.findUserByIdCase = (req, res) => {
  const id = req.params.idCaso;

  const userModel = Users.find().then(data => console.log('user data',data.find(c => c.hijos.id == '')));
  console.log('usermodel',userModel);
  Users.find({ hijos: { id: id } })
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found user with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};


// Find a single user by id case
// exports.findOne = (req, res) => {
//   const id = req.params.idCaso;

//   Users.findById(id)
//     .then(data => {
//       if (!data)
//         res.status(404).send({ message: "Not found Tutorial with id " + id });
//       else res.send(data);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .send({ message: "Error retrieving Tutorial with id=" + id });
//     });
// };

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Tutorial with id=" + id
          });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Users.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else {
          res.send({
            message: "Tutorial was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Tutorial with id=" + id
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Users.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
const express = require("express");

const server = express();

server.use(express.json());

// function choresGetById(id){

// }

server.get("/", (req, res) => {
  res.status(200).json({ message: "GET on root successful" });
});

//Hard code an array with a few people. No need to write endpoints to manage them.
let people = [
  {
    people_id: 1,
    name: "Reed"
  },
  {
    people_id: 2,
    name: "Not Reed"
  }
];
let chores = [
  {
    id: 1,
    description: "do something",
    assignedTo: 1,
    completed: true
  },
  {
    id: 2,
    description: "do more stuff",
    assignedTo: 1,
    completed: false
  }
];

let nextId = people.length + 1;
// console.log(nextId);
// console.log(people);
// console.log(chores);

// Write endpoints to manage(CRUD) chores.

server.get("/chores", (req, res) => {
  // const queryParameters = req.query;
  // res.status(200).json(queryParameters);
  res.status(200).json(chores);
});

server.get("/chores/task", (req, res) => {
  const isCompleted = req.query.task;
  const done = chores.completed.filter(complete => chores.completed === true);
  res.status(200).json(done);
});

server.post("/chores", (req, res) => {
  //   const { description, assignedTo, completed } = req.body;
  const chore = req.body;
  //   chores.id = nextId;
  if (chore.description || chore.assignedTo || chore.completed) {
    chores.push(chore);
    res.status(201).json(chores);
  } else {
    res.status(400).json({ message: "Missing a required field or something" });
  }
});

server.put("/chores/:id", (req, res) => {
  const chore = chores.find(task => task.id == req.params.id);
  if (!chore) {
    res.status(404).json({ message: "There is no chore with that id" });
  } else {
    Object.assign(chore, req.body);
    res.status(200).json(chore);
  }
});

server.delete("/chores/:id", (req, res) => {});

// Write an endpoint that accepts a person's id and returns the list of chores for the person. if a person with that id does not exist in the people array, the endpoint should return a 404 status code and a message. If the person exists, but has no chores assigned, return an empty array.

// Add support for a query string parameter called completed to the endpoint that returns the list of chores.When the client sends this query string parameter, and the value is true, the endpoint should return the list of completed chores.If the value of the query string parameter is false, the endpoint should return chores where completed is false.If the query string parameter is not sent, the endpoint should return all chores.

// Deploy the API to heroku and send the URL to your TL.

module.exports = server;

// const person = req.body;
// if (person.name) {
//     people.push(person)
//     person.id = nextId
//     res.status(201).json(people)
// } else {
//     res.status(400).json({ message: "Error posting data" })
// }

// function peopleGetById(people_id) {
//   //   return people.({ people_id }).first();
//   return people_id.first();
// }

// console.log(peopleGetById());

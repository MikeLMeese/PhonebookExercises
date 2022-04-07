//Setting up
const express = require("express");
const app = express();
app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];
//Step 1: Implement node application to return list of phonebook entries
app.get("/api/persons", (request, response) => {
  response.json(persons);
});
//Step 2: Implement info page with number of people in phonebook and date/time of last access
app.get("/info", (request, response) => {
  response.send(
    `Phonebook has info for ${persons.length} people.<br>
        ${new Date().toString()}`
  );
});
//Step 3: Implement functionality for displaying a single person's information
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
//Step 4: Implement functionality to delete a phonebook entry
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});
//Step 5 & 6: Implement functionality to add a phonebook entry and error handling for new entries
const generateId = () => {
  const maxId =
    persons.length > 0
      ? Math.floor(Math.random(...persons.map((n) => n.id)) * 100)
      : 0;
  return maxId + 1;
};
app.post("/api/persons", (request, response) => {
  const body = request.body;
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number.toString(),
  };
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Missing information!",
    });
  }
  for (let i = 0; i < persons.length; i++) {
    if (body.name === persons[i].name) {
      return response.status(400).json({
        error: "This name already exists!",
      });
    }
  }
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

require("dotenv").config();
const server = require("./server.js");

// const port = 8000;
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Success on http://localhost:${port}`);
});

const PORT = 3000;
const app = require('./app');

app().listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

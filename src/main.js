const PORT = 3000;
const app = require('./app');
const BookStorage = require('./in-memory-book-storage');

const storage = new BookStorage();
app(storage).listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

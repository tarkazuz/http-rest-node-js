const PORT = 3000;
const createApp = require('./app');
const BookStorage = require('./in-memory-book-storage');

const storage = new BookStorage();
createApp(storage).listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

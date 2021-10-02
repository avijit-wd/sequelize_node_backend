const app = require("./app");
const colors = require("colors");

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening to port:${port}`.bold.yellow);
  /* eslint-enable no-console */
});

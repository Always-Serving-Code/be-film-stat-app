import app from "./index";

const { PORT = 9000 } = process.env;

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));

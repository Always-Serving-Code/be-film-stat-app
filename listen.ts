import app from "./index";

const PORT = process.env.PORT || 4000;

app.listen(PORT, "0.0.0.0", () => console.log(`Listening on ${PORT}...`));

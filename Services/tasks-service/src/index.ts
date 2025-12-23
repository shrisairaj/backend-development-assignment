import app from "./app";

const PORT = 4002;

app.listen(PORT, () => {
  console.log(`Task service running on port ${PORT}`);
});

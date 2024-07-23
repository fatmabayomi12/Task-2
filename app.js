const express = require("express");
const staffsPath = require("./routes/staffs");

const app = express();

app.use(express.json());

app.use("/api/staffs",staffsPath);











const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
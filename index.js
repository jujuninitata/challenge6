// require("dotenv").config();
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");
const authRoutes = require("./routes/authRoutes");
const carRoutes = require("./routes/carRoutes");
const userRoutes = require("./routes/userRoutes");
const swaggerDocument = require("./swagger.json");

//view engine
app.set("view engine", "ejs");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/cars", carRoutes);

app.listen(3000, () => {
    console.log('your server is running on port 3000')
});

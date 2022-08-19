const express = require('express');
const app = express();
const dbConnection = require("./config/db");
const usersRoutes = require("./src/users/routes/user.routes");
const walletsRoutes = require("./src/wallets/routes/wallets.routes");
const conversionRoutes = require("./src/conversionOrders/routes/conversionOrders.routes")
require('dotenv/config');
const morgan = require('morgan');
const port = process.env.PORT || 8080;

dbConnection();
app.use(express.json());
app.use(morgan('tiny'))
app.use(usersRoutes);
app.use(walletsRoutes);
app.use(conversionRoutes);

app.get('/', (req, res) => res.send('Hello API!'));
app.listen(port, () => {
    console.log('server is running');
})
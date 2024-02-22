import express from "express";
import sqlite3 from "sqlite3";
import userRouter from './src/routes/userRoutes.js'
import skillsRouter from './src/routes/skillRoutes.js'
const port = process.env.PORT || 3000;
import db from "./src/database/db.js"
const app = express();
// Middleware
app.use(express.json())
// getRoutes
app.use('/users', userRouter)
// app.get("/users", (req, res, next) => {
//     var sql = "select * from user"
//     var params = []
//     db.all(sql, params, (err, rows) => {
//         if (err) {
//           res.status(400).json({"error":err.message});
//           return;
//         }
//         res.json({
//             "message":"success",
//             "data":rows
//         })
//       });
// });
app.use('/skills', skillsRouter)



app.listen(port, () => {
  console.log(`Example REST Express app listening at http://localhost:${port}`);
});

const express = require("express")
const app = express();
const cors = require('cors');
const pool = require("./db")
//middleware

app.use(cors());
app.use(express.json());

//ROUTES//
app.post('/books',async(req,res) => {
    try{
     
      const {title, image, description,writer} = req.body
      const newbook = await pool.query(
          "INSERT INTO books(title, image, description, writer) VALUES($1, $2,$3,$4) RETURNING * ",
          [title, image, description,writer]
      );
      res.json(newbook.rows[0])


    }catch (err){
        console.error(err.message);
    }

})






app.listen(5000, () => {
  console.log( "Port 5000 is coming in loud and clear");
  
});
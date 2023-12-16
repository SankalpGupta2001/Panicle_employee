const express = require('express');
const app = express();
const EmployeeController = require('./controllers/EmployeeControllers');
const cors = require('cors');

app.use(cors());

app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hey");
})
app.use('/api', EmployeeController);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

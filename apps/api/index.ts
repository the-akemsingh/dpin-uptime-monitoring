import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health",async(req,res)=>{
    res.status(200).json({message:"server healthy"})
})

app.listen(3000, () => {
  console.log("server running on 3000");
});

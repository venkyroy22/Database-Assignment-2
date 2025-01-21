const express = require('express');
const bodyParser = require('body-parser');
const data = require('./data.json');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

const books=[]

app.post("/books",(req,res)=>{
 const newBook = req.body 
  
  const exists = books.some((book) => book.book_id === newBook.book_id);
  if(!exists){
    books.push(newBook);
  }
  res.send(newBook)
})


app.get("/books",(req,res)=>{
  res.send(books)
})

app.get("/books/:id",(req,res)=>{

  const {id} = req.params;
 
  const filter = books.filter((x)=>{
    return x.book_id === id
  })
  if(filter.length<1){
    res.send("Not found")
  }else{
    res.send(filter)
  }
  
})

app.put("/books/:id",(req,res)=>{
  const {id} = req.params
  const z = req.body
  const r = books.findIndex((x)=>x.book_id == id)
  books[r] = z
  

})


app.delete("/books/:id",(req,res)=>{
  const {id} = req.params
  const r = books.findIndex((x)=>x.book_id == id)
  books.splice(r,1)
}) 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
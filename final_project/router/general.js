const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        if (!isValid(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
        } else {
        return res.status(404).json({message: "User already exists!"});    
        }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4)); 
});

// Get the book list available in the shop using Promises
public_users.get('/gp',function (req, res) {
    const getBooks = function(books){
        return new Promise((resolve,reject) => {
            res.send(JSON.stringify(books,null,4));
            if (res.status(200)){
                resolve("books retrieved")
            }
            else{
                reject("errors occurred")
            }
        });
    }
    getBooks(books).then((message)=>{
        console.log(message); 
    })
  });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn]);
 });

 // Get book details based on ISBN with Promises
public_users.get('/isbnp/:isbn',function (req, res) {
    const getBookByID = function(books,isbn){
        return new Promise((resolve,reject) => {
            res.send(books[isbn]);
            if (res.status(200)){
                resolve("book retrieved")
            }
            else{
                reject("errors occurred")
            }
        });
    }
    getBookByID(books,req.params.isbn).then((message)=>{
        console.log(message); 
    })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  let author = req.params.author;
  for (let book in books){
      if (books[book].author === author){
          return res.send(books[book]); 
      }
  }
    return res.status(300).json({message: `No book found with author: " ${author}`});
});

 // Get book details based on Author with Promises
 public_users.get('/authorp/:author',function (req, res) {
    const getBookByAuthor = function(books,author){
        return new Promise((resolve,reject) => {
            for (let book in books){
                if (books[book].author === author){
                    res.send(books[book]); 
                }
            }
            if (res.status(200)){
                resolve("book retrieved")
            }
            else{
                reject("errors occurred")
            }
        });
    }
    getBookByAuthor(books,req.params.author).then((message)=>{
        console.log(message); 
    })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  let title = req.params.title;
  for (let book in books){
      if (books[book].title === title){
          return res.send(books[book]); 
      }
  }
  return res.status(300).json({message: `No book found with title: " ${title}`});
});

 // Get book details based on Title with Promises
 public_users.get('/titlep/:title',function (req, res) {
    const getBookByTitle = function(books,title){
        return new Promise((resolve,reject) => {
            for (let book in books){
                if (books[book].title === title){
                    res.send(books[book]); 
                }
            }
            if (res.status(200)){
                resolve("book retrieved")
            }
            else{
                reject("errors occurred")
            }
        });
    }
    getBookByTitle(books,req.params.title).then((message)=>{
        console.log(message); 
    })
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  let isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;

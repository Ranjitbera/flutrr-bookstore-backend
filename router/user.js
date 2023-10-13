const express = require('express');
const router = express.Router();
const UserModel = require('../model/user')
const BookModel = require('../model/book')
const ReviewModel = require('../model/review')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const privateKey = 'GEUSEHSFJHEKGIUAHIE';

router.post('/register', async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ status: true, message: 'Please fill in all the input fields' });
      }
  
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ status: true, message: 'Please enter a valid email' });
      }
  
      if (password.length < 8 || password.length > 15) {
        return res.status(400).json({ status: true, message: 'Password should contain 8-15 characters' });
      }
  
      if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ status: true, message: 'Password should contain at least one uppercase letter' });
      }
  
      if (!/[^a-zA-Z0-9]/.test(password)) {
        return res.status(400).json({ status: true, message: 'Password should contain at least one special character' });
      }
  
      const user = await UserModel.findOne({ email: email });
      if (user) {
        return res.status(400).json({ status: true, message: 'Email ID already registered' });
      }
  
      const hashedPassword = await bcrypt.hash(password.trim(), 10);
      const userData = {
        name: name ? name.trim() : '',
        email: email ? email.trim() : '',
        password: hashedPassword,
      };
      const newUser = await UserModel.create(userData);
      return res.status(201).send({ status: true, message: "Registered successfully", data: newUser });
    } catch (error) {
      return res.status(500).send({ status: false, message: 'Server error' });
    }
  });
  


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
          return res.status(400).send({ message: 'Please filled all the input' })
        }

        let userExist = await UserModel.findOne({ email: email })
        if (!userExist) {
         return res.status(400).send({ message: 'user not exist' })
        }

        let comparePassword = await bcrypt.compare(password, userExist.password);
        if (!comparePassword) {
        return res.status(400).send({message:'Wrong Password'})
        }

        let token = jwt.sign(email, privateKey);
        
      return  res.status(200).send({message:'login successfully', data: token, name:userExist.name })
    } catch (error) {
      return res.status(500).send({message:'server error'})
    }
})


router.post('/addbook', async(req,res)=>{
  const {title,author,url} = req.body;
  try{
      let bookData = await BookModel.create({title:title,author:author,url:url}) 
      if(bookData){
        return res.status(200).send({message:'New Book Added'})
      }
  }catch(error){
    return res.status(500).send({message:'server error'})
  }
})

router.get('/getbooks', async(req,res)=>{
  try{
    let allBooks = await BookModel.find();
    return res.status(200).send({data:allBooks})
  }catch(error){
    return res.status(500).send({error:error})
  }
})

router.get('/get-single-book/:id', async(req,res)=>{
  let {id} = req.params;
  try{
    let book = await BookModel.findOne({_id:id});
    return res.status(200).send({data:book})
  }catch(error){
    return res.status(500).send({error:error})
  }
})


router.post('/addreview', async (req, res) => {
  const { name, rating, comment, bookId } = req.body;
  try {
    if (!name || !rating) {
      return res.status(400).send({ message: 'Please fill all required fields' });
    }
    if (!bookId) {
      return res.status(400).send({ message: 'Something went wrong' });
    }

    let review = await ReviewModel.create({ bookid: bookId, name: name, rating: rating, comment: comment });
    let arr = await ReviewModel.find({ bookid: bookId });
   
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum = sum + parseInt(arr[i].rating);
    }
    let average = (sum / arr.length).toFixed(1);

    const query = { _id: bookId };

    const updateData = {
      overallRating: average,
    };
    let overall = await BookModel.findByIdAndUpdate(query, updateData, { new: true });

    return res.status(200).send({ message: 'Review Added' });
  } catch (error) {
    return res.status(500).send({ message: 'Server error' });
  }
});



router.get('/get-all-review/:id', async(req,res)=>{
  let {id} = req.params;
  try{
    let allReview = await ReviewModel.find({bookid:id})
    return res.status(200).send({data:allReview})
  }catch(error){
    return res.status(500).send({error:error})
  }
})

router.get('/get-suggested-book', async(req,res)=>{
  try{
    let allBooks = await BookModel.find();
    let arr = allBooks.sort((a,b)=>{
      return b.overallRating - a.overallRating
    })
    let suggestBook = arr.slice(0,8);
    return res.status(200).send({data:suggestBook})

  }catch(error){
    return res.status(500).send({error:error})
  }
})
module.exports = router;
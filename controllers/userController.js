
// const UserData = require('../model/user')

// const userRegister = async(req,res)=>{
//     const {name,email,password} = req.body;
//     if(!name || !email || !password)[
//         res.status(400).send({message:'Please filled all the input'})
//     ]
//     if(email){
//         const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//         let validate = emailRegex.test(email)
//         if(!validate){
//             res.status(400).send({message:'Please enter a valid email'})
//         }
//     }
//     if(password){
//         let errMessage = '';
//         let regex1 = /^.{8,15}$/;
//         let regex2 =/[A-Z]/;
//         let regex3 = /[^a-zA-Z0-9]/;
//         let valid1 = regex1.test(email);
//         let valid2 = regex2.test(email);
//         let valid3 = regex3.test(email);
//         if(!valid1){
//             res.status(400).send({message:'Password Should Contain 8-15 Character'})
//         }
//         if(!valid2){
//             res.status(400).send({message:'Password Should Contain one Uppercase letter'})
//         }
//         if(!valid3){
//             res.status(400).send({message:'Password Should Contain one special character'})
//         }
//     }
// }

// module.exports ={userRegister}
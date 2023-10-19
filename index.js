import express from 'express';

const app =express();

app.use(express.json());

const students=[];

app.get('/students',(req,res)=>{
    res.json({
    success:true,
    data:students,
    message:"succesfullay added new student ."
    })
})

app.post('/student',(req,res)=>{
    const {name,age,mobile,email}=req.body;
    if(!name){
     return res.json({
        success:false,
        message:"name is requred.."
    })
    }
  if(!age){
    return res.json({
        success:false,
        message:"age is required..."
    })
  }

  if(!mobile){
    return res.json({
        success:false,
        message:"mobile is required..."
    })
  }

  if(!email){
    return res.json({
        success:false,
        message:"email is required..."
    })
  }
    const id=Math.floor(Math.random() * 1000 + 1)
   const newStudent={
    id,
    name,
    age,
    mobile,
    email
   }
   students.push(newStudent);

   res.json(
    {
        success:true,
        data:newStudent,
        message:"successfully added new student"
    }
   )
})

app.get('/student',(req,res)=>{
    const {id}=req.query;
    let student=null;
    students.forEach((stud)=>{
    if(stud.id == id){
        student=stud;
    }
    })

    if(student == null){
       res.json({
        success:false,
        message:"student not found.."
       })
    }
    res.json({
        success:true,
        data:student,
        message:"succesfully added new student..."
    })
})

const PORT =5000;

app.listen(PORT , ()=>{
    console.log(`server is runing on PORT ${PORT}`)
})

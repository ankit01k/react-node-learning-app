const express = require('express')
const Course = require('./mongoose/model')
require('./mongoose/connect')

const usersRouter =  new express.Router()

usersRouter.get('/courses', async (req,res) => {
  try{
    const courses =await Course.find()
    res.json(courses)
  }
  catch(e)
  {
    res.status(400).json({message: e.message})
  }
})

usersRouter.post('/courses/enroll/:id', async(req,res) => {
  try {
  const id = req.params.id
  const course = await Course.findById(id)
  if(course.isApplied){
    res.json({message : 'Already enrolled'})
  }
  else
  {
    course.isApplied = true
    await course.save()
    res.json({message : 'enrolled'})
  }
}
catch(e)
{
  res.json({message: e.message})
}
})

usersRouter.delete('/courses/drop/:id', async(req, res) => {
  const course = await Course.findById(req.params.id)
  if(course.isApplied){
    course.isApplied =  false
    course.save()
    res.json({message: 'dropped course'})
  }
  else
    res.json({message: 'not enrolled'})
})

usersRouter.patch('/courses/rating/:id', async(req, res) => {
  const course = await Course.findById(req.params.id)
  if(!course.isApplied){
    res.json({message: 'not enrolled'})
  }
  else{
    if(course.isRated){
      res.json({message: 'rated already'})
    }

    else{
      course.rating = 4.3;
      course.isRated = true
      await course.save();
      res.json({message: 'rated now'})
    }
  }
})



module.exports = usersRouter
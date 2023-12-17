const Course = require('./model')
require('./connect')

async function addData(){
    const c1 = new Course({
        name: 'Python',
        dept: 'backend',
        desc: 'Course on pyton',
        isApplied: true,
        isRated: true,
        rating: 4.0
    })

    await c1.save()
    console.log(c1)
}

addData()

// find()
// async function find() {
//    const c =await Course.find()
//    console.log(c)
// }


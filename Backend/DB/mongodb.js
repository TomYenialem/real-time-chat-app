const mongo=require('mongoose')

const mongoDb=async()=>{
    try {
        await mongo.connect(process.env.MONGO - DB);
        console.log('connected to mongos')
    } catch (error) {
        console.log(error)
    }
}


module.exports=mongoDb
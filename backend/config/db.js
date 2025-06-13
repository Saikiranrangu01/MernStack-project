import mongoose from "mongoose"

export const connecDB = async ()=>{
    await mongoose.connect('mongodb+srv://kiransai:7569092145@cluster0.hi9mz.mongodb.net/kiran_store').then(()=>console.log("DB connected"));

}
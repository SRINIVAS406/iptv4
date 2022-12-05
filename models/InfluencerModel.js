import mongoose from 'mongoose'

const inflschema = new mongoose.Schema({
    ward:{type:String, required:false, trim:true},
    booth:{type:String, required:false, trim:true},
    name:{type:String, required:false, trim:true},
    age:{type:String, required:false, trim:true},
    gender:{type:String, required:false, trim:true},
    religion:{type:String, required:false, trim:true},
    caste:{type:String, required:false, trim:true},
    subcaste:{type:String, required:false, trim:true},
    contact:{type:String, required:false, trim:true},
    emailID:{type:String, required:false, trim:true},
    fbID:{type:String, required:false, trim:true},
    tweet:{type:String, required:false, trim:true},
    Education:{type:String, required:false, trim:true},
    profession:{type:String, required:false, trim:true},
    address:{type:String, required:false, trim:true},
    directVote:{type:String, required:false, trim:true},
    weekday:{type:String, required:false, trim:true},
    weekend:{type:String, required:false, trim:true},
    lastmonth:{type:String, required:false, trim:true},
    meetings:{type:String, required:false, trim:true},
    date: { type: Date, default: Date.now }
})

const InflModel = mongoose.model('Infl_Data',inflschema);

export default InflModel
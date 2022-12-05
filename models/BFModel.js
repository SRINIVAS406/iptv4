

import mongoose from 'mongoose'

const bfschema = new mongoose.Schema({
    ward:{type:String, required:false, trim:true},
    booth:{type:String, required:false, trim:true},
    issues:{type:String, required:false, trim:true},
    impArea:{type:String, required:false, trim:true},
    events:{type:String, required:false, trim:true},
    women:{type:String, required:false, trim:true},
    womenNo:{type:String, required:false, trim:true},
    youth:{type:String, required:false, trim:true},
    youthNo:{type:String, required:false, trim:true},
    senior:{type:String, required:false, trim:true},
    seniorNo:{type:String, required:false, trim:true},
    lessVote:{type:String, required:false, trim:true},
    noMeeting:{type:String, required:false, trim:true},
    voters:{type:String, required:false, trim:true},
    votersturnOver:{type:String, required:false, trim:true},
    toHouses:{type:String, required:false, trim:true},
    casteVote:{type:String, required:false, trim:true},
    associations:{type:String, required:false, trim:true},
    religious:{type:String, required:false, trim:true},
    hotspot:{type:String, required:false, trim:true},
    WhatsApp:{type:String, required:false, trim:true},
    chance:{type:String, required:false, trim:true},
    voterSeg:{type:String, required:false, trim:true},
    date: { type: Date, default: Date.now }

})

const BFModel = mongoose.model('BF_Data',bfschema);

export default BFModel
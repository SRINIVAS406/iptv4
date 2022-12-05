import mongoose from 'mongoose'

// Defining Schema
const surveySchema= new mongoose.Schema ({
ward: { type: String, required: true, trim: true },
booth: { type: String, required: true, trim: true },
surveyed_by:{ type: String, required: true, trim: true },
name: { type: String, required: true, trim: true },
address:{ type: String, required: true, trim: true },
age: { type: String, required: true, trim: true,},
gender: { type: String, required: true, trim: true },
party: { type: String, required: true, trim: true },
choose_reason: { type: String, required: true, trim: true },
caste: { type: String, required: true, trim: true },
religion: { type: String, required: true, trim: true },
why_not_bjp:{ type: String, required: false, trim: true },
did_you_vote_last_time:{ type: String, required: false, trim: true },
did_you_vote_from_this_ward:{ type: String, required: false, trim: true },
contact_number:{ type: String, required: false, trim: true },
whom_did_you_vote_for:{ type: String, required: false, trim: true },
date: { type: Date, default: Date.now }
})

// Compiling Schema
const SurveyModel = mongoose.model('survey', surveySchema)

export default SurveyModel
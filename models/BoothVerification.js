import mongoose from 'mongoose'
import { stringify } from 'querystring'

// Defining Schema
const boothVerify= new mongoose.Schema ({
boothid: { type: String, required: true, trim: true },
names: { type: String, required: true, trim: true },
count: { type: String, required: true, trim: true },
date: { type: Date, default: Date.now }
})

// Compiling Schema
const BoothVerifyModel = mongoose.model('boothverify', boothVerify)

export default BoothVerifyModel
import mongoose from 'mongoose'

// Defining Schema
const boothVerificationSchema = new mongoose.Schema({
    name: { type: String, required: false, trim: true },
    contact: { type: String, required: false, trim: true },
    govtID: { type: String, required: false, trim: true },
    function: { type: String, required: false, trim: true },
    age: { type: String, required: false, trim: true },
    gender: { type: String, required: false, trim: true },
    religion: { type: String, required: false, trim: true },
    caste: { type: String, required: false, trim: true },
    subcaste: { type: String, required: false, trim: true },
    emailID: { type: String, required: false, trim: true },
    Education: { type: String, required: false, trim: true },
    profession: { type: String, required: false, trim: true },
    address: { type: String, required: false, trim: true },
    totalWork: { type: String, required: false, trim: true },
    weekday: { type: String, required: false, trim: true },
    weektime: { type: String, required: false, trim: true },
    weekend: { type: String, required: false, trim: true },
    weektimeend: { type: String, required: false, trim: true },
    lastmonth: { type: String, required: false, trim: true },
    timemonth: { type: String, required: false, trim: true },
    totalvoter: { type: String, required: false, trim: true },
    campaign: { type: String, required: false, trim: true },
    vehicleNo: { type: String, required: false, trim: true },
    influencers: { type: String, required: false, trim: true },
    ward: { type: String, required: false, trim: true },
    booth: { type: String, required: false, trim: true },
    verified_by: { type: String, required: false, trim: true },
    remark: { type: String, required: false, trim: true },
    date: { type: Date, default: Date.now },
    verification_status:{ type: String, required: false, trim: true },
    user_id:{ type: String, required: false, trim: true },
})

// Compiling Schema
const BoothVerificationModel = mongoose.model('TestSrinivas', boothVerificationSchema)
//TestSrinivas
//boothVerificationList
export default BoothVerificationModel
import mongoose from 'mongoose';

const connectDB = async (DATABASE_URL) => {
    try{
        var SRIDB_URL="mongodb+srv://srdec81:Sri123a@joinpath-cluster.ksxhe.mongodb.net/"
var SUSHDB_URL="mongodb+srv://iptpilot:iptpilot@cluster0.ngq7xfb.mongodb.net/"
        await mongoose.connect(SUSHDB_URL+"HubliTeamV1"+"?retryWrites=true&w=majority",  {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log('Connected Successfully..');
    } catch (err){
        console.log(err);
    }
}

export default connectDB
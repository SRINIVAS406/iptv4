import UserModel from '../models/User.js'
import SurveyModel from '../models/Survey.js'
import TreeModel from '../models/treedata.js'
import BoothVerifyModel from '../models/BoothVerification.js'
import BoothVerificationModel from '../models/BoothVerificationModel.js'
import BoothVerificationModelV2 from '../models/BoothVerificationModelV2.js'
import bcrypt from 'bcrypt'
import fs from 'fs'

import BFModel from '../models/BFModel.js'
import InfluencerModel from '../models/InfluencerModel.js'
import { format } from 'path'

import surveyjson from '../views/HighChartReport/survey.js'
import verificationjson from '../views/HighChartReport/boothverification.js'
import boothfactsjson from '../views/HighChartReport/boothfacts.js'
import influencerjson from '../views/HighChartReport/influencer.js'


class UserController {
    //static validUser = false;
    static userEmail = '';
    static userName = '';
    static tree = (req, res) => {
        if (req.session.validUser)
            res.render("tree", {
                email: this.userEmail,
                name: req.session.userName
            });
        else
            res.render("login", { 'name': '', 'message': "" })
    }

    static survey = (req, res) => {
        res.render('survey', { 'name': '', 'message': ((req.query.msg) ? "Survey Submitted Successfully" : "") });
    }

    static createSurvey = async (req, res) => {
        try {
            //creating new document using new model
            //const result1 = await UserModel.findOne({ email: req.body.email })
            const doc = new SurveyModel({
                ward: req.body.ward,
                booth: req.body.booth,
                surveyed_by: req.body.surveyed_by,
                name: req.body.name,
                address: req.body.address,
                age: req.body.age,
                gender: req.body.gender,
                party: req.body.party,
                choose_reason: req.body.choosereason,
                caste: req.body.caste,
                religion: req.body.religion,
                why_not_bjp: req.body.why_not_bjp,
                did_you_vote_last_time: req.body.did_you_vote_last_time,
                did_you_vote_from_this_ward: req.body.did_you_vote_from_this_ward,
                contact_number: req.body.contact_number,
                whom_did_you_vote_for: req.body.whom_did_you_vote_for
            })

            //Saving document
            await doc.save()

            res.redirect('/survey?msg=submitted')

        } catch (err) {
            res.render('error', { message: err });
            console.log("ERROR FROM Registration: " + err);
        }
    }

    static registration = (req, res) => {
        res.render("registration", {
            message: "",
            name: ''
        })
    }

    static logout = (req, res) => {
        req.session.destroy();
        //req.session.validUser = false;
        res.render("login", { name: '' });
    }

    static home = (req, res) => {
        if (req.session.validUser)
            res.render("home", {
                email: this.userEmail,
                name: req.session.userName
            });
        else
            res.render("login", { name: '' })
    }
    static edetails = (req, res) => {
        if (req.session.validUser)
            res.render("edetails", {
                email: this.userEmail,
                name: req.session.userName,
                message: ''
            });
        else
            res.render("login", { name: '' })
    }

    static wardDetails = (req, res) => {
        if (req.session.validUser)
            res.render("wardDetails", {
                email: this.userEmail,
                name: req.session.userName,
                message: ''
            });
        else
            res.render("login", { name: '' })
    }

    static createUserDoc = async (req, res) => {
        const hasPassword = await bcrypt.hash(req.body.password, 10);
        try {
            //creating new document using new model
            const result = await UserModel.findOne({ email: req.body.email })
            if (!result) {
                const doc = new UserModel({
                    name: req.body.name,
                    email: req.body.email,
                    password: hasPassword,
                    decryptPassword: req.body.password
                })

                //Saving document
                await doc.save()
                res.redirect('/login')
            } else {
                res.render("registration", {
                    name: '',
                    message: "Email already present"
                });
            }
        } catch (err) {
            res.render('error', { message: err });
            console.log("ERROR FROM Registration: " + err);
        }
    }

    static login = (req, res) => {
        res.render("login", { name: '' })
    }

    static verifyLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await UserModel.findOne({ email: email })

            if (result) {
                var passwordcheck = await bcrypt.compare(password, result.password);
                if (result.email == email && passwordcheck) {
                    this.userEmail = email;
                    this.userName = result.name;
                    res.redirect('/');
                    req.session.validUser = true;
                    req.session.userName = result.name;
                    req.session.userEmail = email;
                    req.session.save();
                } else {
                    res.redirect('/login?msg=login_failed');
                }
            } else {
                //res.send("<h1>Email Not found..</h1>");
                res.redirect('/login?msg=email_not_found');
            }

        } catch (err) {
            res.render('error', { message: err });
            console.log(err);
        }
    }

    static orgtreedata = (req, res) => {
        if (req.session.validUser) {
            TreeModel.find({ parent: req.query.id }, (err, data) => {
                if (!err) {
                    res.json(data);
                } else {
                    res.render('error', { message: err });
                    console.log('Failed to retrieve the Tree List: ' + err);
                }
            });
        } else
            res.redirect("/login")
    }

    

    static surveyReport = (req, res) => {
        if (req.session.validUser)
            res.render('highChartReport', { name: req.session.userName })
        else {
            res.render("login", { 'name': '', 'message': "" })
        }
    }

    static getChildNodes = async (req, res) => {
        if (req.session.validUser) {
            const result = await TreeModel.findOne({ email: req.body.email })
        } else
            res.redirect("/login")
    }

    static treeNodeInfo = (req, res) => {

        TreeModel.find({
            title: req.query.id
        }, (err, data) => {
            if (!err) {
                res.json(data);
            } else {
                res.render('error', { message: err });
                console.log('Failed to retrieve the Tree List: ' + err);
            }
        });

    }

    //Tree Node forms
    static boothCommitteeMember = (req, res) => {
        res.render('BoothCommiteeMember', { 'name': '', 'message': "" });
    }

    static boothAgent = (req, res) => {
        res.render('BoothAgent', { 'name': '', 'message': "" });
    }

    static boothPresident = (req, res) => {
        res.render('BoothPresident', { 'name': '', 'message': "" });
    }

    static wardIncharg = (req, res) => {
        res.render('WardIncharg', { 'name': '', 'message': "" });
    }

    static mandalPresident = (req, res) => {
        res.render('MandalPresident', { 'name': '', 'message': "" });
    }

    static districtPresident = (req, res) => {
        res.render('DistrictPresident', { 'name': '', 'message': "" });
    }

    static boothVerification = async (req, res) => {
        try {
            //creating new document using new model
            //const result1 = await UserModel.findOne({ email: req.body.email })
            const doc = new BoothVerifyModel({
                boothid: req.body.boothid,
                names: req.body.name,
                count: req.body.count
            })

            //Saving document
            await doc.save()
            res.redirect('/edetails');
            //res.render('home',{name:req.session.userName,message:'Survey Verification successfully sumitted'});
        } catch (err) {
            res.render('error', { message: err });
            console.log("ERROR FROM Registration: " + err);
        }
    }

    static getBoothVerify = async (req, res) => {
        try {
            //creating new document using new model
            //const result1 = await UserModel.findOne({ email: req.body.email })
            BoothVerifyModel.find({ boothid: req.query.id }, (err, data) => {
                if (!err) {
                    res.json(data);
                } else {
                    res.render('error', { message: err });
                    console.log('Failed to retrieve the Booth List: ' + err);
                }
            });

        } catch (err) {
            res.render('error', { message: err });
            console.log("ERROR FROM Registration: " + err);
        }
    }

    static getBoothVerificationForm = (req, res) => {
        res.render('boothVerificationList', { 'name': '', 'message': req.query.msg ? "Verification Completed." : "" });
    }

    static boothVerificationListV1 = async (req, res) => {
        try {
            //creating new document using new model
            //const result1 = await UserModel.findOne({ email: req.body.email })
            let result = req.body._id?await BoothVerificationModel.findOne({ _id: req.body._id }):'';
            if(result){
                result.name= req.body.name;
                    result.contact= req.body.contact;
                    result.govtID= req.body.govtID;
                    result.function= req.body.function;
                    result.age= req.body.age;
                    result.gender= req.body.gender;
                    result.religion= req.body.religion;
                    result.caste= req.body.caste;
                    result.subcaste= req.body.subcaste;
                    result.emailID= req.body.emailID;
                    result.Education= req.body.Education;
                    result.profession= req.body.profession;
                    result.address= req.body.address;
                    result.totalWork= req.body.totalWork;
                    result.weekday= req.body.weekday;
                    result.weektime= req.body.weektime;
                    result.weekend= req.body.weekend;
                    result.weektimeend= req.body.weektimeend;
                    result.lastmonth= req.body.lastmonth;
                    result.timemonth= req.body.timemonth;
                    result.totalvoter= req.body.totalvoter;
                    result.campaign= req.body.campaign;
                    result.vehicleNo= req.body.vehicleNo;
                    result.influencers= req.body.influencers;
                    result.ward= req.body.ward;
                    result.booth= req.body.booth;
                    result.remark= req.body.remark;
                    result.verified_by= req.body.verified_by;
                    result.verification_status=req.body.verification_status;
                    result.user_id=req.body.user_id;

                    await result.save();
                    res.redirect('/edetails#sectiontabs')
            }else{
                const doc = new BoothVerificationModel({
                    name: req.body.name,
                    contact: req.body.contact,
                    govtID: req.body.govtID,
                    function: req.body.function,
                    age: req.body.age,
                    gender: req.body.gender,
                    religion: req.body.religion,
                    caste: req.body.caste,
                    subcaste: req.body.subcaste,
                    emailID: req.body.emailID,
                    Education: req.body.Education,
                    profession: req.body.profession,
                    address: req.body.address,
                    totalWork: req.body.totalWork,
                    weekday: req.body.weekday,
                    weektime: req.body.weektime,
                    weekend: req.body.weekend,
                    weektimeend: req.body.weektimeend,
                    lastmonth: req.body.lastmonth,
                    timemonth: req.body.timemonth,
                    totalvoter: req.body.totalvoter,
                    campaign: req.body.campaign,
                    vehicleNo: req.body.vehicleNo,
                    influencers: req.body.influencers,
                    ward: req.body.ward,
                    booth: req.body.booth,
                    remark: req.body.remark,
                    verified_by: req.body.verified_by,
                    verification_status:req.body.verification_status,
                    user_id:req.body.user_id
                })
    
                //Saving document
                await doc.save()
                res.redirect('/verification?msg=submitted')
            }
            

        } catch (err) {
            res.render('error', { message: err });
            console.log("ERROR FROM Registration: " + err);
        }
    }

    static boothVerificationList = async (req, res) => {
        try {
            //creating new document using new model
            //const result1 = await UserModel.findOne({ email: req.body.email })
            let result = await BoothVerificationModel.findOne({ _id: req.body._id })
            if(result){
                result.name= req.body.name;
                    result.contact= req.body.contact;
                    result.govtID= req.body.govtID;
                    result.function= req.body.function;
                    result.age= req.body.age;
                    result.gender= req.body.gender;
                    result.religion= req.body.religion;
                    result.caste= req.body.caste;
                    result.subcaste= req.body.subcaste;
                    result.emailID= req.body.emailID;
                    result.Education= req.body.Education;
                    result.profession= req.body.profession;
                    result.address= req.body.address;
                    result.totalWork= req.body.totalWork;
                    result.weekday= req.body.weekday;
                    result.weektime= req.body.weektime;
                    result.weekend= req.body.weekend;
                    result.weektimeend= req.body.weektimeend;
                    result.lastmonth= req.body.lastmonth;
                    result.timemonth= req.body.timemonth;
                    result.totalvoter= req.body.totalvoter;
                    result.campaign= req.body.campaign;
                    result.vehicleNo= req.body.vehicleNo;
                    result.influencers= req.body.influencers;
                    result.ward= req.body.ward;
                    result.booth= req.body.booth;
                    result.remark= req.body.remark;
                    result.verified_by= req.body.verified_by;
                    result.verification_status=req.body.verification_status;
                    result.user_id=req.body.user_id;

                    await result.save();
                    res.redirect('/edetails#sectiontabs')
            }else{
                const doc = new BoothVerificationModel({
                    name: req.body.name,
                    contact: req.body.contact,
                    govtID: req.body.govtID,
                    function: req.body.function,
                    age: req.body.age,
                    gender: req.body.gender,
                    religion: req.body.religion,
                    caste: req.body.caste,
                    subcaste: req.body.subcaste,
                    emailID: req.body.emailID,
                    Education: req.body.Education,
                    profession: req.body.profession,
                    address: req.body.address,
                    totalWork: req.body.totalWork,
                    weekday: req.body.weekday,
                    weektime: req.body.weektime,
                    weekend: req.body.weekend,
                    weektimeend: req.body.weektimeend,
                    lastmonth: req.body.lastmonth,
                    timemonth: req.body.timemonth,
                    totalvoter: req.body.totalvoter,
                    campaign: req.body.campaign,
                    vehicleNo: req.body.vehicleNo,
                    influencers: req.body.influencers,
                    ward: req.body.ward,
                    booth: req.body.booth,
                    remark: req.body.remark,
                    verified_by: req.body.verified_by,
                    verification_status:req.body.verification_status,
                    user_id:req.body.user_id
                })
    
                //Saving document
                await doc.save()
                res.redirect('/verification?msg=submitted')
            }
            

        } catch (err) {
            res.render('error', { message: err });
            console.log("ERROR FROM Registration: " + err);
        }
    }


    static getVerificatioListData = (req, res) => {
        //if (req.session.validUser) {
        BoothVerificationModel.find((err, data) => {
            if (!err) {
                res.json(data);
                //res.render('SurveyTable',{'data':data,name:''})
            } else {
                res.render('error', { message: err });
                console.log('Failed to retrieve the Survey List: ' + err);
            }
        });
        //} else
        //res.redirect("/login")
    }


    static nodeForms = (req, res) => {
        if (req.session.validUser)
            res.render("NodeForms", {
                email: this.userEmail,
                name: req.session.userName
            });
        else
            res.redirect("/login")
    }


    //Booth Facts Data
    // Booth Facts

    static getFormBF = (req, res) => {
        res.render('BF_form', { message: req.query.msg });
    }

    static createUpdateBF = async (req, res) => {
        try {
            let result = req.body._id?await BFModel.findOne({ _id: req.body._id }):'';
            if(result){
                result.ward= req.body.ward;
                result.booth= req.body.booth;
                result.issues= req.body.issues;
                result.impArea= req.body.impArea;
                result.events= req.body.events;
                result.women= req.body.women;
                result.caste= req.body.caste;
                result.womenNo= req.body.womenNo;
                result.youth= req.body.youth;
                result.youthNo= req.body.youthNo;
                result.senior= req.body.senior;
                result.seniorNo= req.body.seniorNo;
                result.lessVote= req.body.lessVote;
                result.noMeeting= req.body.noMeeting;
                result.voters= req.body.voters;
                result.votersturnOver= req.body.votersturnOver;
                result.toHouses= req.body.toHouses;
                result.casteVote= req.body.casteVote;
                result.associations= req.body.associations;
                result.religious= req.body.religious;
                result.hotspot= req.body.hotspot;
                result.WhatsApp= req.body.WhatsApp;
                result.chance= req.body.chance;
                result.voterSeg= req.body.voterSeg;
                await result.save();
                    res.redirect('/edetails#sectiontabs')

            }else{
                const doc = new BFModel({
                    ward: req.body.ward,
                    booth: req.body.booth,
                    issues: req.body.issues,
                    impArea: req.body.impArea,
                    events: req.body.events,
                    women: req.body.women,
                    caste: req.body.caste,
                    womenNo: req.body.womenNo,
                    youth: req.body.youth,
                    youthNo: req.body.youthNo,
                    senior: req.body.senior,
                    seniorNo: req.body.seniorNo,
                    lessVote: req.body.lessVote,
                    noMeeting: req.body.noMeeting,
                    voters: req.body.voters,
                    votersturnOver: req.body.votersturnOver,
                    toHouses: req.body.toHouses,
                    casteVote: req.body.casteVote,
                    associations: req.body.associations,
                    religious: req.body.religious,
                    hotspot: req.body.hotspot,
                    WhatsApp: req.body.WhatsApp,
                    chance: req.body.chance,
                    voterSeg: req.body.voterSeg
                })

                //Saving document
                await doc.save()
                console.log('Data saved');
                res.redirect('/getFormBF?msg=submitted');
            }
               
            
        } catch (err) {
            console.log(err);

        }
    }

    // Influencer
    static getFormInfl = (req, res) => {
        res.render('Influencer',{message:req.query.msg});
    }

    static createUpdateInfl = async (req, res) => {
        try {
                const doc = new InfluencerModel({
                    ward: req.body.ward,
                    booth: req.body.booth,
                    name: req.body.name,
                    age: req.body.age,
                    gender: req.body.gender,
                    religion: req.body.religion,
                    caste: req.body.caste,
                    subcaste: req.body.subcaste,
                    contact: req.body.contact,
                    emailID: req.body.emailID,
                    fbID: req.body.fbID,
                    tweet: req.body.tweet,
                    Education: req.body.Education,
                    profession: req.body.profession,
                    address: req.body.address,
                    directVote: req.body.directVote,
                    weekday: req.body.weekday,
                    weekend: req.body.weekend,
                    lastmonth: req.body.lastmonth,
                    meetings: req.body.meetings,
                })

                //Saving document
                await doc.save()
                console.log('Data saved');
                res.redirect('/getFormInfl?msg=submitted');
            
        } catch (err) {
            console.log(err);

        }
    }



    //data for table format
    static surveyColumns = (req,res)=>{
        res.json(surveyjson);
    }

    static surveydata = (req, res) => {
        SurveyModel.find((err, data) => {
            if (!err) {
                res.json(data);
            } else {
                res.render('error', { message: err });
                console.log('Failed to retrieve the Survey List: ' + err);
            }
        });
    }

    static verificationColumns = (req,res)=>{
        res.json(verificationjson);
    }
    static verificationData = (req, res) => {
        BoothVerificationModel.find((err, data) => {
            if (!err) {
                res.json(data);
            } else {
                res.render('error', { message: err });
                console.log('Failed to retrieve the verification List: ' + err);
            }
        });
    }

    static verificationDatav2 = (req, res) => {
        BoothVerificationModelV2.find((err, data) => {
            if (!err) {
                res.json(data);
            } else {
                res.render('error', { message: err });
                console.log('Failed to retrieve the verification List: ' + err);
            }
        });
    }

    static boothFactColumns = (req,res)=>{
        res.json(boothfactsjson);
    }
    static boothFactData = (req, res) => {
        BFModel.find((err, data) => {
            if (!err) {
                res.json(data);
            } else {
                res.render('error', { message: err });
                console.log('Failed to retrieve the Booth Fact list List: ' + err);
            }
        });
    }

    static influencerColumns = (req,res)=>{
        res.json(influencerjson);
    }
    static influencerData = (req, res) => {
        InfluencerModel.find((err, data) => {
            if (!err) {
                res.json(data);
            } else {
                res.render('error', { message: err });
                console.log('Failed to retrieve the influencer List: ' + err);
            }
        });
    }


}

export default UserController
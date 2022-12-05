import BAModel from "../TreeNodeModels/BoothAgent.js";
import BCMModel from "../TreeNodeModels/BoothCommitte.js";
import BPModel from "../TreeNodeModels/BoothPresident.js";
import GSModel from "../TreeNodeModels/GeneralSecretary.js";
import WICModel from "../TreeNodeModels/WardInCharge.js";
import MPModel from "../TreeNodeModels/MandalPresident.js";
import DPSModel from "../TreeNodeModels/DistPresident.js";
import UserControl from "../controllers/userController.js"

class TreeNodeController {
    static getTreeChildNode = (req, res) => {
        if (UserControl.userName) {

            //District President childs Mandal President

            if (req.query.title == '') {
                if (req.query.id) {
                    DPSModel.find({
                        id: req.query.id
                    }, (err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                } else {
                    DPSModel.find((err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                }
            }

            if (req.query.title == "District President") {
                if (req.query.id) {
                    MPModel.find({
                        parent: req.query.id
                    }, (err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                } else {
                    MPModel.find((err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                }
            }
            //District President childs Mandal President
            if (req.query.title == "Mandal Adhyaksh") {
                if (req.query.id) {
                    WICModel.find({
                        parent: req.query.id
                    }, (err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                } else {
                    WICModel.find((err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                }
            }
            //District President childs Mandal President
            if (req.query.title == "Ward Incharge") {
                if (req.query.id) {
                    BPModel.find({
                        parent: req.query.id
                    }, (err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                } else {
                    BPModel.find((err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                }
            }
            //District President childs Mandal President
            if (req.query.title == "Booth Adhyaksh") {
                if (req.query.id) {
                    GSModel.find({
                        parent: req.query.id
                    }, (err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                } else {
                    GSModel.find((err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                }
            }
            //District President childs Mandal President
            if (req.query.title == "General Secretary") {
                if (req.query.id) {
                    BAModel.find({
                        parent: req.query.id
                    }, (err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                } else {
                    BAModel.find((err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                }
            }
            //District President childs Mandal President
            if (req.query.title == "Booth Agent" || req.query.title == "BLA") {
                if (req.query.id) {
                    BCMModel.find({
                        parent: req.query.id
                    }, (err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                } else {
                    BCMModel.find((err, data) => {
                        if (!err) {
                            res.json(data);
                        } else {
                            res.render('error', { message: err });
                            console.log('Failed to retrieve the Tree List: ' + err);
                        }
                    });
                }
            }
        } else {
            res.redirect('/login');
        }
    }

    // District President
    static getFormDPS = (req, res) => {
        if (UserControl.userName) { res.render('DPS_form', { name: UserControl.userName, message: "" }); } else {
            res.redirect('/login');
        }
    }

    static createUpdateDPS = async (req, res) => {
        try {
            if (UserControl.userName) {
                let result = await DPSModel.findOne({ id: req.body.id })
                if (result) {
                    result.name = req.body.name;
                    result.age = req.body.age;
                    result.gender = req.body.gender;
                    result.religion = req.body.religion
                    result.caste = req.body.caste;
                    result.subcaste = req.body.subcaste;
                    result.contact = req.body.contact
                    result.emailID = req.body.emailID;
                    result.fbID = req.body.fbID;
                    result.tweet = req.body.tweet;
                    result.Education = req.body.Education;
                    result.profession = req.body.profession;
                    result.address = req.body.address;
                    result.active = req.body.active;
                    result.parent = req.body.parent;
                    result.nobooth = req.body.Wards;
                    result.nowards = req.body.NoBooths;
                    result.updated = new Date().toLocaleDateString();
                    result.updatedBy = UserControl.userName;
                    result.title = req.body.title;
                    result.verfication = req.body.verfication;
                    //Saving document
                    await result.save();
                } else {
                    let doc = new DPSModel({
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
                        active: req.body.active,
                        parent: req.body.parent,
                        nobooth: req.body.Wards,
                        nowards: req.body.NoBooths,
                        created: new Date().toLocaleDateString(),
                        createdBy: UserControl.userName,
                        updated: new Date().toLocaleDateString(),
                        updatedBy: UserControl.userName,
                        id: req.body.id,
                        title: req.body.title,
                        verfication:req.body.verfication
                    })

                    //Saving document
                    await doc.save()
                }

                console.log('Data saved');
                res.redirect('/getFormDPS?msg=submitted');

            } else { res.redirect('/login'); }
        } catch (err) {
            console.log(err);

        }
    }

    //Mandal President
    static getFormMP = (req, res) => {
        if (UserControl.userName) { res.render('MP_form', { name: UserControl.userName, message: "" }); } else {
            res.redirect('/login');
        }
    }

    static createUpdateMP = async (req, res) => {
        try {
            if (UserControl.userName) {
                let result = await MPModel.findOne({ id: req.body.id })
                if (result) {
                    result.name = req.body.name;
                    result.age = req.body.age;
                    result.gender = req.body.gender;
                    result.religion = req.body.religion;
                    result.caste = req.body.caste;
                    result.subcaste = req.body.subcaste;
                    result.contact = req.body.contact
                    result.emailID = req.body.emailID;
                    result.fbID = req.body.fbID;
                    result.tweet = req.body.tweet;
                    result.Education = req.body.Education;
                    result.profession = req.body.profession;
                    result.address = req.body.address;
                    result.active = req.body.active;
                    result.parent = req.body.parent;
                    result.ZoneNo = req.body.ZoneNo;
                    result.Wards = req.body.Wards;
                    result.NoBooths = req.body.NoBooths;
                    result.updated = new Date().toLocaleDateString();
                    result.updatedBy = UserControl.userName;
                    result.title = req.body.title;
                    result.verfication = req.body.verfication;
                    //Saving document
                    await result.save()
                } else {
                    let doc = new MPModel({
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
                        active: req.body.active,
                        parent: req.body.parent,
                        ZoneNo: req.body.ZoneNo,
                        Wards: req.body.Wards,
                        NoBooths: req.body.NoBooths,
                        created: new Date().toLocaleDateString(),
                        createdBy: UserControl.userName,
                        updated: new Date().toLocaleDateString(),
                        updatedBy: UserControl.userName,
                        id: "MP" + req.body.id,
                        title: req.body.title,
                        verfication:req.body.verfication
                    })

                    //Saving document
                    await doc.save()
                }

                console.log('Data saved');
                res.redirect('/getFormMP?msg=submitted');

            } else { res.redirect('/login'); }
        } catch (err) {
            console.log(err);

        }
    }

    //Ward In-Charge
    static getFormWIC = (req, res) => {
        if (UserControl.userName) { res.render('WIC_form', { name: UserControl.userName, message: "" }); } else {
            res.redirect('/login');
        }
    }

    static createUpdateWIC = async (req, res) => {
        try {
            if (UserControl.userName) {
                let result = await WICModel.findOne({ id: req.body.id })
                if (result) {
                    result.name = req.body.name;
                    result.age = req.body.age;
                    result.gender = req.body.gender;
                    result.religion = req.body.religion;
                    result.caste = req.body.caste;
                    result.subcaste = req.body.subcaste;
                    result.contact = req.body.contact
                    result.emailID = req.body.emailID;
                    result.fbID = req.body.fbID;
                    result.tweet = req.body.tweet;
                    result.Education = req.body.Education;
                    result.profession = req.body.profession;
                    result.address = req.body.address;
                    result.active = req.body.active;
                    result.parent = req.body.parent;
                    result.wardNoName = req.body.wardNoName;
                    result.noOfBooths = req.body.noOfBooths;
                    result.updated = new Date().toLocaleDateString();
                    result.updatedBy = UserControl.userName;
                    result.title = req.body.title;
                    result.verfication = req.body.verfication;
                    
                    //Saving document
                    await result.save()
                } else {
                    let doc = new WICModel({
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
                        active: req.body.active,
                        parent: req.body.parent,
                        wardNoName: req.body.wardNoName,
                        noOfBooths: req.body.noOfBooths,
                        created: new Date().toLocaleDateString(),
                        createdBy: UserControl.userName,
                        updated: new Date().toLocaleDateString(),
                        updatedBy: UserControl.userName,
                        id: "W" + req.body.id,
                        title: req.body.title,
                        verfication:req.body.verfication
                    })

                    //Saving document
                    await doc.save()
                }

                console.log('Data saved');
                res.redirect('/getFormWIC?msg=submitted');

            } else { res.redirect('/login'); }
        } catch (err) {
            console.log(err);

        }
    }

    //Booth President
    static getFormBP = (req, res) => {
        if (UserControl.userName) { res.render('BP_form', { name: UserControl.userName, message: "" }); } else {
            res.redirect('/login');
        }
    }

    static createUpdateBP = async (req, res) => {
        try {
            if (UserControl.userName) {
                let result = await BPModel.findOne({ id: req.body.id })
                if (result) {
                    result.name = req.body.name;
                    result.age = req.body.age;
                    result.gender = req.body.gender;
                    result.religion = req.body.religion;
                    result.caste = req.body.caste;
                    result.subcaste = req.body.subcaste;
                    result.contact = req.body.contact
                    result.emailID = req.body.emailID;
                    result.fbID = req.body.fbID;
                    result.tweet = req.body.tweet;
                    result.Education = req.body.Education;
                    result.profession = req.body.profession;
                    result.address = req.body.address;
                    result.active = req.body.active;
                    result.parent = req.body.parent;
                    result.boothNo = req.body.boothNo;
                    result.updated = new Date().toLocaleDateString();
                    result.updatedBy = UserControl.userName;
                    result.title = req.body.title;
                    result.verfication = req.body.verfication;
                    result.psNo = req.body.psNo,
                        result.psName = req.body.psName,
                        result.noStations = req.body.noStations,
                        //Saving document
                        await result.save()
                } else {
                    let doc = new BPModel({
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
                        active: req.body.active,
                        psNo: req.body.psNo,
                        psName: req.body.psName,
                        noStations: req.body.noStations,

                        parent: req.body.parent,
                        boothNo: req.body.boothNo,
                        created: new Date().toLocaleDateString(),
                        createdBy: UserControl.userName,
                        updated: new Date().toLocaleDateString(),
                        updatedBy: UserControl.userName,
                        id: "B" + req.body.id,
                        title: req.body.title,

                        verfication :req.body.verfication
                    })
                    //Saving document
                    await doc.save()
                }

                console.log('Data saved');
                res.redirect('/getFormBP?msg=submitted');

            } else { res.redirect('/login'); }
        } catch (err) {
            console.log(err);

        }
    }

    //General Secretary
    static getFormGS = (req, res) => {
        if (UserControl.userName) { res.render('GS_form', { name: UserControl.userName, message: "" }); } else {
            res.redirect('/login');
        }
    }

    static createUpdateGS = async (req, res) => {
        try {
            if (UserControl.userName) {
                let result = await GSModel.findOne({ id: req.body.id })
                if (result) {
                    result.name = req.body.name;
                    result.age = req.body.age;
                    result.gender = req.body.gender;
                    result.religion = req.body.religion;
                    result.caste = req.body.caste;
                    result.subcaste = req.body.subcaste;
                    result.contact = req.body.contact
                    result.emailID = req.body.emailID;
                    result.fbID = req.body.fbID;
                    result.tweet = req.body.tweet;
                    result.Education = req.body.Education;
                    result.profession = req.body.profession;
                    result.address = req.body.address;
                    result.active = req.body.active;
                    result.parent = req.body.parent;
                    result.boothNo = req.body.boothNo;
                    result.updated = new Date().toLocaleDateString();
                    result.updatedBy = UserControl.userName;
                    result.title = req.body.title;
                    result.verfication = req.body.verfication;
                    //Saving document
                    await result.save()
                } else {
                    let doc = new GSModel({
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
                        active: req.body.active,

                        psNo: req.body.psNo,
                        psName: req.body.psName,
                        noStations: req.body.noStations,

                        parent: req.body.parent,
                        boothNo: req.body.boothNo,
                        created: new Date().toLocaleDateString(),
                        createdBy: UserControl.userName,
                        updated: new Date().toLocaleDateString(),
                        updatedBy: UserControl.userName,
                        id: req.body.parent + "-GS" + req.body.id,
                        title: req.body.title,
                        verfication:req.body.verfication
                    })
                    //Saving document
                    await doc.save()
                }
                console.log('Data saved');
                res.redirect('/getFormGS?msg=submitted');

            } else { res.redirect('/login'); }
        } catch (err) {
            console.log(err);

        }
    }
    //BoothAgent
    static getFormBA = (req, res) => {
        if (UserControl.userName) { res.render('BA_form', { name: UserControl.userName, message: "" }); } else {
            res.redirect('/login');
        }
    }

    static createUpdateBA = async (req, res) => {
        try {
            if (UserControl.userName) {
                let result = await BAModel.findOne({ id: req.body.id })
                if (result) {

                    result.name = req.body.name;
                    result.age = req.body.age;
                    result.gender = req.body.gender;
                    result.religion = req.body.religion;
                    result.caste = req.body.caste;
                    result.subcaste = req.body.subcaste;
                    result.contact = req.body.contact
                    result.emailID = req.body.emailID;
                    result.fbID = req.body.fbID;
                    result.tweet = req.body.tweet;
                    result.Education = req.body.Education;
                    result.profession = req.body.profession;
                    result.address = req.body.address;
                    result.active = req.body.active;
                    result.parent = req.body.parent;
                    result.boothInchargeOf = req.body.boothInchargeOf;
                    result.NoOfboothCommitteeReport = req.body.NoOfboothCommitteeReport;
                    result.updated = new Date().toLocaleDateString();
                    result.updatedBy = UserControl.userName;
                    result.title = req.body.title;
                    result.verfication = req.body.verfication;
                    //Saving document
                    await result.save()
                } else {
                    let doc = new BAModel({
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
                        active: req.body.active,
                        parent: req.body.parent,
                        boothInchargeOf: req.body.boothInchargeOf,
                        NoOfboothCommitteeReport: req.body.NoOfboothCommitteeReport,
                        created: new Date().toLocaleDateString(),
                        createdBy: UserControl.userName,
                        updated: new Date().toLocaleDateString(),
                        updatedBy: UserControl.userName,
                        id: req.body.parent + "-BA" + req.body.id,
                        title: req.body.title,
                        verfication:req.body.verfication
                    })

                    //Saving document
                    await doc.save()
                }

                console.log('Data saved');
                res.redirect('/getFormBA?msg=submitted');

            } else { res.redirect('/login'); }
        } catch (err) {
            console.log(err);

        }
    }

    //Booth Committee Member
    static getFormBCM = (req, res) => {
        if (UserControl.userName) { res.render('BCM_form', { name: UserControl.userName, message: "" }); } else {
            res.redirect('/login');
        }
    }

    static createUpdateBCM = async (req, res) => {
        try {
            if (UserControl.userName) {
                let result = await BCMModel.findOne({ id: req.body.id })
                if (result) {

                    result.name = req.body.name;
                    result.age = req.body.age;
                    result.gender = req.body.gender;
                    result.religion = req.body.religion;
                    result.caste = req.body.caste;
                    result.subcaste = req.body.subcaste;
                    result.contactNo = req.body.contactNo;
                    result.email = req.body.email;
                    result.facebook = req.body.facebook;
                    result.twitter = req.body.twitter;
                    result.education = req.body.education;
                    result.profession = req.body.profession;
                    result.address = req.body.address;
                    result.active = req.body.active;
                    result.parent = req.body.parent;
                    result.boothNo = req.body.boothNo;
                    result.updated = new Date().toLocaleDateString();
                    result.updatedBy = UserControl.userName;
                    result.title = req.body.title;
                    result.verfication = req.body.verfication;


                    //Saving document
                    await result.save()
                } else {
                    let result = await BCMModel.findOne({ id: req.body.id })
                    let doc = new BCMModel({
                        name: req.body.name,
                        age: req.body.age,
                        gender: req.body.gender,
                        religion: req.body.religion,
                        caste: req.body.caste,
                        subcaste: req.body.subcaste,
                        contactNo: req.body.contactNo,
                        email: req.body.email,
                        facebook: req.body.facebook,
                        twitter: req.body.twitter,
                        education: req.body.education,
                        profession: req.body.profession,
                        address: req.body.address,
                        active: req.body.active,
                        parent: req.body.parent,
                        boothNo: req.body.boothNo,
                        created: new Date().toLocaleDateString(),
                        createdBy: UserControl.userName,
                        updated: new Date().toLocaleDateString(),
                        updatedBy: UserControl.userName,
                        id: req.body.parent + "-BCM" + req.body.id,
                        title: req.body.title,
                        verfication:req.body.verfication
                    })

                    //Saving document
                    await doc.save()
                }
                console.log('Data saved');
                res.redirect('/getFormBCM?msg=submitted');

            } else { res.redirect('/login'); }
        } catch (err) {
            console.log(err);

        }
    }
}

export default TreeNodeController
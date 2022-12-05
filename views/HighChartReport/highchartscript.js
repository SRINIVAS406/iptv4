
let obj;
var request = new XMLHttpRequest();
request.open('GET', '/surveydata', false);  // `false` makes the request synchronous
request.send(null);
var surveyinfo=[];
if (request.status === 200) {
    obj = JSON.parse(request.response);
  }
// Data retrieved from https://netmarketshare.com/
// Radialize the colors
Highcharts.setOptions({
    colors: Highcharts.map(Highcharts.getOptions().colors, function (color) {
        return {
            radialGradient: {
                cx: 0.5,
                cy: 0.3,
                r: 0.7
            },
            stops: [
                [0, color],
                [1, Highcharts.color(color).brighten(-0.3).get('rgb')] // darken
            ]
        };
    })
});
let samplejson = {
    "_id": "6360b867a290765dd8744082",
    "ward": "W32",
    "booth": "B217",
    "surveyed_by": "Harish",
    "name": "Test2",
    "address": "test",
    "age": "36-49",
    "gender": "Male",
    "party": "BJP",
    "choose_reason": "Educational Development",
    "caste": "General",
    "religion": "Hindu",
    "why_not_bjp": "Anti-Incompetency",
    "did_you_vote_last_time": "Yes",
    "did_you_vote_from_this_ward": "Yes",
    "contact_number": "234343",
    "whom_did_you_vote_for": "INC",
    "date": "2022-11-01T06:10:47.428Z",
    "__v": 0
}

var gender,age,caste,religion,partypi;
document.addEventListener('generateReport', (e) => {
    console.log(
        `Reports are based on Boothid123 :
          ${e.detail.idlist}`
    );

    gender = generataDataBarReport('gender',e.detail.idlist);
genReport('container2',gender.data,gender.labels,'Gender based report','Number of votes')

age = generataDataBarReport('age',e.detail.idlist);
genReport('container3',age.data,age.labels,'Age based report','Number of votes')

caste = generataDataBarReport('caste',e.detail.idlist);
genReport('container4',caste.data,caste.labels,'Caste based report','Number of votes')

religion = generataDataBarReport('religion',e.detail.idlist);
genReport('container5',religion.data,religion.labels,'Religion based report','Number of votes')

partypi = generatePiData('party',e.detail.idlist);
generatePichart('container1',partypi,'Party wise report');
    
});



//Bar report data for higchartJS
function generataDataBarReport(columnLable,filterBooth){
    var labelsarr = [];
var partyarr = [];
var tempAllDataObj = {};
    
    if(filterBooth){
        let tempObj = obj.filter((val)=>{
           return filterBooth.indexOf(val.booth)>-1;
        });
        console.log(filterBooth);
        tempObj.forEach((val)=>{
            if(labelsarr.indexOf(val[columnLable])==-1)labelsarr.push(val[columnLable]);
            if(partyarr.indexOf(val.party)==-1)partyarr.push(val.party);
        
            if(!tempAllDataObj[val[columnLable]]) tempAllDataObj[val[columnLable]]={};
            if(!tempAllDataObj[val[columnLable]][val.party]) tempAllDataObj[val[columnLable]][val.party]=0;
            tempAllDataObj[val[columnLable]][val.party]+=1;
        });
    }else
{
obj.forEach((val)=>{
    if(labelsarr.indexOf(val[columnLable])==-1)labelsarr.push(val[columnLable]);
    if(partyarr.indexOf(val.party)==-1)partyarr.push(val.party);

    if(!tempAllDataObj[val[columnLable]]) tempAllDataObj[val[columnLable]]={};
    if(!tempAllDataObj[val[columnLable]][val.party]) tempAllDataObj[val[columnLable]][val.party]=0;
    tempAllDataObj[val[columnLable]][val.party]+=1;
});
}

// console.log(labelsarr);
var dataReportObj = [];
partyarr.forEach((partyName=>{
    let tempobj = {name:'',data:[]};
    tempobj.name=partyName;
    labelsarr.forEach((lval=>{
        if(tempAllDataObj[lval][partyName]) tempobj.data.push(tempAllDataObj[lval][partyName]);
        else tempobj.data.push(0);
    }));
    dataReportObj.push(tempobj);
}));
console.log("Data Report Object--",dataReportObj);

return {labels:labelsarr,data:dataReportObj};
}

gender = generataDataBarReport('gender');
genReport('container2',gender.data,gender.labels,'Gender based report','Number of votes')

age = generataDataBarReport('age');
genReport('container3',age.data,age.labels,'Age based report','Number of votes')

caste = generataDataBarReport('age');
genReport('container4',caste.data,caste.labels,'Caste based report','Number of votes')

religion = generataDataBarReport('age');
genReport('container5',religion.data,religion.labels,'Religion based report','Number of votes')

function genReport(id,dataReportObj,labelsarr,reporrtTitle,yaxslabel){
Highcharts.chart(id, {
    credits: {
        enabled: false
    },
    chart: {
        type: 'column'
    },
    title: {
        text: reporrtTitle,
        align: 'left'
    },
    xAxis: {
        categories: labelsarr
    },
    yAxis: {
        min: 0,
        title: {
            text: yaxslabel
        },
        stackLabels: {
            enabled: true,
            style: {
                fontWeight: 'bold',
                color: ( // theme
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || 'gray',
                textOutline: 'none'
            }
        }
    },
    legend: {
        align: 'left',
        x: 70,
        verticalAlign: 'top',
        y: 70,
        floating: true,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: dataReportObj
});
};


//Pi Report Data for HighchartJS
function generatePiData(columnName,filterBooth){
var piTempObj = {};
var total = 0;
if(filterBooth){
    let tempObj = obj.filter((val)=>{
        return filterBooth.indexOf(val.booth)>-1;
     });
     tempObj.forEach((val=>{
        if(!piTempObj[val[columnName]]) piTempObj[val[columnName]]=0;
        {if(val[columnName]){
            piTempObj[val[columnName]]+=1;
            total++;
        }} 
    }));
}else{
    obj.forEach((val=>{
        if(!piTempObj[val[columnName]]) piTempObj[val[columnName]]=0;
        {if(val[columnName]){
            piTempObj[val[columnName]]+=1;
            total++;
        }} 
    }));
}


var resultpidata = [];
for (val in piTempObj){
    resultpidata.push({name:val,y:(piTempObj[val]*100/total)});
}
console.log("resultpidata",resultpidata)
return resultpidata;
}

partypi = generatePiData('party');
generatePichart('container1',partypi,'Party wise report');
function generatePichart(id,pidata,label){


// Build the chart
Highcharts.chart(id, {
    credits: {
        enabled: false
    },
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: label
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'silver'
            }
        }
    },
    series: [{
        name: 'Share',
        data: pidata
    }]
});

}

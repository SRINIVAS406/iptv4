
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
    colors: Highcharts.map(['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'], function (color) {
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


genderdatareport = [
    {
        "name": "Not Decided",
        "data": [
            440,
            500
        ]
    },
    {
        "name": "BJP",
        "data": [
            1000,
            1500
        ]
    },
    {
        "name": "AAP",
        "data": [
            200,
            500
        ]
    },
    {
        "name": "Others",
        "data": [
            600,
            900
        ]
    },
    {
        "name": "INC",
        "data": [
            170,
            300
        ]
    }
];
genderlabelreport = ["Male","Female"]
agedatareport = [
    {
        "name": "Not Decided",
        "data": [
            440,
            500,
            200
        ]
    },
    {
        "name": "BJP",
        "data": [
            1000,
            1500,
            700
        ]
    },
    {
        "name": "AAP",
        "data": [
            200,
            500,
            400
        ]
    },
    {
        "name": "Others",
        "data": [
            600,
            900,
            600
        ]
    },
    {
        "name": "INC",
        "data": [
            170,
            300,
            400
        ]
    }
];
agelabelreport = ["18-35","36-49","50+"]
castedatareport = [
    {
        "name": "Not Decided",
        "data": [
            440,
            500,
            200,
            250,
            300
        ]
    },
    {
        "name": "BJP",
        "data": [
            1000,
            1500,
            700,
            600,
            800
        ]
    },
    {
        "name": "AAP",
        "data": [
            200,
            500,
            400,
            600,
            450
        ]
    },
    {
        "name": "Others",
        "data": [
            600,
            900,
            600,
            200,
            300
        ]
    },
    {
        "name": "INC",
        "data": [
            170,
            300,
            400,
            450,
            350
        ]
    }
];
castelabelreport = ["General","SC","ST","OBC","Other"]

religiondatareport = [
    {
        "name": "Not Decided",
        "data": [
            440,
            500,
            200,
            250,
            300
        ]
    },
    {
        "name": "BJP",
        "data": [
            1000,
            1500,
            700,
            600,
            800
        ]
    },
    {
        "name": "AAP",
        "data": [
            200,
            500,
            400,
            600,
            450
        ]
    },
    {
        "name": "Others",
        "data": [
            600,
            900,
            600,
            200,
            300
        ]
    },
    {
        "name": "INC",
        "data": [
            170,
            300,
            400,
            450,
            350
        ]
    }
];
religionlabelreport = ["Hindu","Muslim","Christian","Sikh","Other"]

var gender,age,caste,religion,partypi;
document.addEventListener('generateReport', (e) => {
    console.log(
        `Reports are based on Boothid123 :
          ${e.detail.idlist}`
    );

genReport('container2',genderdatareport,genderlabelreport,'Gender based report','Number of votes')

// age = generataDataBarReport('age',e.detail.idlist);
// genReport('container3',age.data,age.labels,'Age based report','Number of votes')

// caste = generataDataBarReport('age',e.detail.idlist);
// genReport('container4',caste.data,caste.labels,'Caste based report','Number of votes')

// religion = generataDataBarReport('age',e.detail.idlist);
// genReport('container5',religion.data,religion.labels,'Religion based report','Number of votes')

// partypi = generatePiData('party',e.detail.idlist);
// generatePichart('container1',partypi,'Party wise report');
    
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

genReport('container2',genderdatareport,genderlabelreport,'Gender based report','Number of votes')
// gender = generataDataBarReport('gender');
// genReport('container2',gender.data,gender.labels,'Gender based report','Number of votes')

// age = generataDataBarReport('age');
genReport('container3',agedatareport,agelabelreport,'Age based report','Number of votes')

// caste = generataDataBarReport('age');
genReport('container4',castedatareport,castelabelreport,'Caste based report','Number of votes')

// religion = generataDataBarReport('age');
genReport('container5',religiondatareport,religionlabelreport,'Religion based report','Number of votes')

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
                enabled: true,
                color:'#f2f2f2'
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

partypi = [
    {
        "name": "Not Decided",
        "y": 2
    },
    {
        "name": "BJP",
        "y": 45
    },
    {
        "name": "AAP",
        "y": 12
    },
    {
        "name": "Others",
        "y": 8
    },
    {
        "name": "INC",
        "y": 33
    }
]
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
                connectorColor: 'silver',
                color:'#121212'
            }
        }
    },
    series: [{
        name: 'Share',
        data: pidata
    }]
});

}

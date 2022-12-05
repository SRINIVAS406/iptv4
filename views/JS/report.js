
Chart.defaults.set('plugins.datalabels', {
    color: '#f2f2f2'
});

// ChartDataLabels.datalabels: {
//         color: 'blue',
//         labels: {
//           title: {
//             font: {
//               weight: 'bold'
//             }
//           },
//           value: {
//             color: 'green'
//           }
//         }
//       }
var request = new XMLHttpRequest();
request.open('GET', '/surveydata', false); // `false` makes the request synchronous
request.send(null);
var surveyinfoapidata = [];
if (request.status === 200) {
    surveyinfoapidata = JSON.parse(request.response);
}

function getRandomColor() {
    color = "hsl(" + Math.random() * 360 + ", 100%, 60%)";
    return color;
}

function bardata(title, legendby, stackby, booth_id) {
    surveyinfo = surveyinfoapidata.filter(getboothsurveys);
    function getboothsurveys(val) {
        return booth_id.indexOf(val.booth) > -1;
    }
    var labelsarr = [];
    surveyinfo.forEach(element => {
        labelsarr.push(element[stackby]);
    });
    var labeluniqueArray = [...new Set(labelsarr)];


    var reasonobj = {};
    surveyinfo.forEach(element => {
        if (!reasonobj[element[legendby]]) reasonobj[element[legendby]] = {};
        reasonobj[element[legendby]][element[stackby]] = reasonobj[element[legendby]][element[stackby]] ? ++reasonobj[element[legendby]][element[stackby]] : 1;
    });
    //  console.log(reasonobj);

    var mydatasets = [];
    var colors = ['#fe9a02','#364fcf','#3bd425','#77a1e5','#a6c96a','#f28f43', 'rgb(106, 90, 205)'];
    var xaxis = Object.keys(reasonobj);
    labeluniqueArray.forEach((la, index) => {
       // console.log('Color Code - '+index+"--"+colors[index]);
        var tempdataobj = {
            label: la,
            data: [],
            backgroundColor: colors[index],
        };
        xaxis.forEach((title) => {
            tempdataobj.data.push(reasonobj[title][la] ? reasonobj[title][la] : 0);
        });
        mydatasets.push(tempdataobj);
    });

    var customreportdata = {
        labels: xaxis,
        datasets: mydatasets
    };
    return customreportdata;

}

function barreportobj(title, legendby, stackby, booth_id) {

    var config = {
        type: 'bar',
        data: bardata(title, legendby, stackby, booth_id),
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: title
                },
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        },
        plugins: [ChartDataLabels], options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: title
                },
                datalabels: {
                    color: 'white',
                    textAlign: 'start',
                    formatter: function (value, ctx) {
                        var index = ctx.dataIndex;
                        var label = ctx.dataset.label;
                        return value;
                        if (value != 0) {
                            //return label + '-' + value;
                            return index;
                        }
                        else
                            return "";
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true
                }
            }
        }
    };

    return config;

}


// ************ EVENT LISTEN Start ***************


var boothid = ''
var ctx1 = document.getElementById("gender");
var myChart1 = new Chart(ctx1, barreportobj('Report based on Gender', 'gender', 'party', boothid));

var ctx2 = document.getElementById("age");
var myChart2 = new Chart(ctx2, barreportobj('Report based on Age', 'age', 'party', boothid));

var ctx3 = document.getElementById("caste");
var myChart3 = new Chart(ctx3, barreportobj('Report based on Caste', 'caste', 'party', boothid));

var ctx4 = document.getElementById("religion");
var myChart4 = new Chart(ctx4, barreportobj('Report based on Religion', 'religion', 'party', boothid));
// ************ EVENT LISTEN end ***************
function createReport(boothidtemp) {
    myChart1.data = bardata('Report based on Gender', 'gender', 'party', boothidtemp);
    myChart1.update();
    myChart2.data = bardata('Report based on Age', 'age', 'party', boothidtemp);
    myChart2.update();
    myChart3.data = bardata('Report based on Caste', 'caste', 'party', boothidtemp);
    myChart3.update();
    myChart4.data = bardata('Report based on Religion', 'religion', 'party', boothidtemp);
    myChart4.update();


}


// var ctx5 = document.getElementById("reason");
// var myChart5 = new Chart(ctx5, bardatageneration('Report based on Reason','choose_reason','party'));




// Pie Chart related code
var party = document.getElementById("party");

function pichartdata(booth_id) {
    var partyobj = {};

    var surveyinfo = surveyinfoapidata.filter(getboothsurveys);
    function getboothsurveys(val) {
        return booth_id.indexOf(val.booth + '') > -1;
    }

    surveyinfo.forEach(element => {
        partyobj[element['party']] = partyobj[element['party']] ? partyobj[element['party']] + 1 : 1;
    });


    var partyData = {
        labels: Object.keys(partyobj),
        datasets: [
            {
                data: Object.values(partyobj),
                backgroundColor: ['#fe9a02', '#364fcf', '#3bd425', 'rgb(0, 0, 255)', 'rgb(238, 130, 238)']
            }]
    };
    return partyData;
}


var pieChart = new Chart(party, {
    type: 'pie',
    data: pichartdata(boothid),
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Party Survey'
            }
        }
    },
    plugins: [ChartDataLabels], options: {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Party Survey'
            },
            legend: {
                position: 'bottom',
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 14
                    }
                }
            },
            datalabels: {
                color: 'white',
                textAlign: 'start',
                formatter: function (value, ctx) {
                    var index = ctx.dataIndex;
                    var label = ctx.chart.data.labels[index];
                    let sum = 0;
                    let dataArr = ctx.chart.data.datasets[0].data;
                    dataArr.map(data => {
                        sum += data;
                    });
                    let percentage = (value * 100 / sum).toFixed(2) + "%";
                    return percentage; 
                    if (value != 0)
                        return label + '-' + percentage;
                    else
                        return "";
                }
            }
        }
    }
});

document.addEventListener('generateReport', (e) => {
    console.log(
        `Reports are based on Boothid :
          ${e.detail.idlist}`
    );
    createReport(e.detail.idlist)
    pieChart.data = pichartdata(e.detail.idlist);
    pieChart.update();
});


//angularjs code for table
var app = angular.module('myApp', []);
app.controller('surveyinfoCtrl', function ($scope, $http) {
    $scope.names = [{
        name: 'res'
    }];
    $http.get('/surveydata').then(function (response) {
        $scope.names = response.data;
    });

});



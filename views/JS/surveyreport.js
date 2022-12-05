
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
  var surveyinfo = [];
  if (request.status === 200) {
    surveyinfo = JSON.parse(request.response);
  }

  function getRandomColor() {
  color = "hsl(" + Math.random() * 360 + ", 100%, 60%)";
  return color;
}

  function bardatageneration(title,legendby,stackby){
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
  var colors = ['#fe9a02', '#364fcf', '#3bd425', 'rgb(0, 0, 255)', 'rgb(238, 130, 238)',
    'rgb(106, 90, 205)', '#f28f43', '#77a1e5', '#a6c96a'
  ];
  var xaxis = Object.keys(reasonobj);
  labeluniqueArray.forEach((la, index) => {
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

  var config = {
    type: 'bar',
    data: customreportdata,
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
    plugins: [ChartDataLabels],options:{
      responsive:true,
      plugins: {title: {
          display: true,
          text: title
        },
      datalabels: {
        color: 'white',
        textAlign: 'center',
        formatter: function(value, ctx) {
          var index = ctx.dataIndex;
          var label = ctx.dataset.label;
          return value;
          if(value!=0)
          return label + '-' + value;
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

 

  var ctx1 = document.getElementById("gender");
  var myChart1 = new Chart(ctx1, bardatageneration('Report based on Gender','gender','party'));

  var ctx2 = document.getElementById("age");
  var myChart2 = new Chart(ctx2, bardatageneration('Report based on Age','age','party'));

  var ctx3 = document.getElementById("caste");
  var myChart3 = new Chart(ctx3, bardatageneration('Report based on Caste','caste','party'));

  var ctx4 = document.getElementById("religion");
  var myChart4 = new Chart(ctx4, bardatageneration('Report based on Religion','religion','party'));

  var ctx5 = document.getElementById("surveyed_by");
  var myChart4 = new Chart(ctx5, bardatageneration('Report based on Religion','surveyed_by','party'));


  // var ctx5 = document.getElementById("reason");
  // var myChart5 = new Chart(ctx5, bardatageneration('Report based on Reason','choose_reason','party'));




// Pie Chart related code
var party = document.getElementById("party");
var partyobj = {};
console.log(surveyinfo);
surveyinfo.forEach(element => {
    partyobj[element['party']]=partyobj[element['party']]?partyobj[element['party']]+1:1;
  });

  console.log(Object.keys(partyobj));
  console.log(Object.values(partyobj));

var partyData = {
    labels: Object.keys(partyobj),
    datasets: [
        {
            data: Object.values(partyobj),
            backgroundColor: ['#fe9a02','#364fcf','#3bd425','#77a1e5','#a6c96a','#f28f43', 'rgb(106, 90, 205)']
        }]
};

var pieChart = new Chart(party, {
    type: 'pie',
    data: partyData,
    options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: 'Party Survey'
          }}
        },
        plugins: [ChartDataLabels],options:{
        responsive:true,
        plugins: {title: {
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
          anchor: "center", //start, center, end
      rotation: function(ctx) {
        const valuesBefore = ctx.dataset.data.slice(0, ctx.dataIndex).reduce((a, b) => a + b, 0);
        const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
        const rotation = ((valuesBefore + ctx.dataset.data[ctx.dataIndex] /2) /sum *360);
        return rotation < 180 ? rotation-90 : rotation+90;
      },
          color: 'white',
          textAlign: 'center',
          formatter: function(value, ctx) {
            var index = ctx.dataIndex;
            var label = ctx.chart.data.labels[index];
            let sum = 0;
                  let dataArr = ctx.chart.data.datasets[0].data;
                  dataArr.map(data => {
                      sum += data;
                  });
                  let percentage = (value*100 / sum).toFixed(2)+"%";
                  
                return percentage;  
            if(value!=0)
            return label + '-' + percentage;
            else
            return "";
          }
        }
      }
      }
  });


//angularjs code for table
var app = angular.module('myApp', []);
app.controller('surveyinfoCtrl', function($scope, $http) {
  $scope.names = [{
    name: 'res'
  }];
  $http.get('/surveydata').then(function(response) {
    $scope.names = response.data;
  });

  $http.get('/getVerificatioListData').then(function(response) {
    $scope.verifieddata = response.data;
  });

});
  


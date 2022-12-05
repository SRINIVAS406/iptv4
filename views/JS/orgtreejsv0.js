
var allData = [];
var treeData = [];
var relationships = {};
//showChildNodes('DPS1','',true);
showChildNodes('DPS1', 'District President', true);
showChildNodes('MP1', 'Mandal Adhyaksh', true);

google.charts.load('current', { packages: ["orgchart"] });
google.charts.setOnLoadCallback(drawChart);
function getid(id) {
    return document.getElementById(id);
}
function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Name');
    data.addColumn('string', 'Manager');
    data.addColumn('string', 'ToolTip');


    // For each orgchart box, provide the name, manager, and tooltip to show.
    data.addRows(allData);

    // Create the chart.
    var chart = new google.visualization.OrgChart(document.getElementById('chart_div'));
    // Draw the chart, setting the allowHtml option to true for the tooltips.
    //addintion options
    chart.draw(data, { 'allowHtml': true }); //"nodeClass":"card"}


    //calling methods
    //console.log(chart.getChildrenIndexes('12'));
    //chart.collapse('3', true);
    //console.log(chart.getChildrenIndexes(3 + ''));

    //calling event
    //google.visualization.events.addListener(chart, 'select', selectHandler);

}

function selectHandler1(pos, key) {
    var message = '';
    message = treeData[pos][key];
    getid('blockdetailLabel').innerHTML = message.name;
    getid('name').value = message.name;
    getid('age').value = message.age;
    getid('gender').value = message.gender;
    getid('ward_no').value = message.ward_no;
    getid('poll_no').value = message.poll_no;
    getid('booth_no').value = message.booth_no;
    getid('caste').value = message.caste;
    getid('sub_caste').value = message.sub_caste;
    getid('address').value = message.address;
    getid('id_proof').value = message.id_proof;

    getid('openblockdetail').click();
    if (message == '') {
        message = 'nothing';
    }
    //alert('You selected ' + message);
}


//show children onclick of node
function showChildNodes(id, title, firstset) {
    if (title == "General" || title == "SC" || title == "ST" || title == "Mahila Adhyaksh") { alert("We are at last layer of of team."); return; }
    try {
        var request = new XMLHttpRequest();

        request.open('GET', '/getTreeChildNode?title=' + title + '&id=' + id, false);  // `false` makes the request synchronous
        request.send(null);
        if (request.status === 200) {
            json = JSON.parse(request.response);
            //fetch('/orgtreedata').then((response) => response.json()).then((json) => {
            if (json) {
                treeData = json;
                for (let i in json) {
                    let nodeobj = {};
                    nodeobj.v = json[i].id;
                    nodeobj.f = getTreeNode(i, json[i].name, json[i].title);
                    allData.push([nodeobj, json[i].parent, treeData[i].name])
                }
            }
            console.log(allData);
            if (!firstset)
                drawChart();

        }
    } catch (error) {
        console.log("Error from ShowchildNodes Mehtod:-" + error);
    }
}


//show children onclick of node
function hideChildNodes(key) {
    for (i in allData) {
        if (allData[i][1] == key) {
            //allData.splice(i, 1);
        }
    }
    drawChart();
}

function getTreeNode(i, name, title) {
    var treecard = `<div id="cardblock">
        <div id="tnode" class="tnode" style="width:auto;">
            <div id="cardid">${treeData[i].id}</div>
            <div class="card_body">
                <img src="/JS/male.png" alt="Avatar" id="cardimg" style="width:50px;height:50px;">
                <div class="">
                    <p><b id="cardname">${treeData[i].name}</b></p>
                    <p id="cardtitle">${treeData[i].title}</p>
                    <input type="button" class="form-control btn-secondary btn-sm" id="showdetail" onclick="showBaForm('${treeData[i].id}','${treeData[i].title}')"
                        value="ShowMore"></button>
                </div>
                <div class="showhidechildren"><button type="button" id="showchild" class="btn btn-default" onclick="showChildNodes('${treeData[i].id}','${treeData[i].title}',false)">
                        <i class="fa fa-angle-double-down"></i>
                    </button>
                  <!--  <button type="button" id="hidechild" class="btn btn-default" onclick="hideChildNodes('${treeData[i].id}')">
                        <i class="fa fa-angle-double-up"></i>
                    </button> -->
                </div>

            </div>

        </div>
    </div>`;

    return treecard;
}

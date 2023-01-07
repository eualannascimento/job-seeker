//----------------------------------------------
// Functions
//----------------------------------------------
function getNonDuppes(object, field) {
    let uniqueValues = {};
    let filteredArray = object.filter(object => !uniqueValues[object[`${field}`]] && (uniqueValues[object[`${field}`]] = true));
    let unOrdenedArray = filteredArray.map(function (el) { return el[field]; });
    let OrdenedArray = unOrdenedArray.sort((a, b) => a.localeCompare(b));
    
    return OrdenedArray
}

//----------------------------------------------
// Load JSON
//----------------------------------------------
var jobsFile = "./src/results/json/jobs.json"
var jobs = (function () {
    var jobs = null;
    var lastModified = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': jobsFile,
        'dataType': "json",
        'success': function (data, textStatus, request) {
            jobs = data;

            lastModified = new Date(request.getResponseHeader("Last-Modified"));
            dia  = lastModified.getDate().toString().padStart(2, '0'),
            mes  = (lastModified.getMonth()+1).toString().padStart(2, '0'),
            ano  = lastModified.getFullYear();
            hora = lastModified.getHours().toString().padStart(2, '0');
            minuto =  lastModified.getMinutes().toString().padStart(2, '0');
            
            document.getElementById('lastModified').innerHTML = "Última atualização: " + `${dia}/${mes}/${ano} - ${hora}:${minuto}`;
            document.getElementById('jobsCount').innerHTML = "Quantidade de Vagas: " + jobs.length;
        }
    });
    return jobs;
})();

//----------------------------------------------
// Generate Controller for jsGrid
//----------------------------------------------
var db = {
    loadData: function (filter) {
        return $.grep(jobs, function (group) {

            var newJobs = Object.keys(group).reduce(function (o, k) {
                o[k] = (group[k] || "").toUpperCase();
                
                return o;
            }, {});


            function verifyIndex(arrayItem, ArrayFilter) {
                if(arrayItem === undefined){
                     return "";
                } else { 
                    if(ArrayFilter === undefined){
                        return "";
                    } else { 
                        removedAccentArrayItem = arrayItem.normalize('NFD').replace(/\p{Diacritic}/gu, ""); // Old method: .replace(/[\u0300-\u036f]/g, "");
                        removedAccentArrayFilter = ArrayFilter.normalize('NFD').replace(/\p{Diacritic}/gu, ""); // Old method: .replace(/[\u0300-\u036f]/g, "");

                        return removedAccentArrayItem.indexOf((removedAccentArrayFilter || "").toUpperCase());
                    }
                }
            }

            return (
                verifyIndex(newJobs.title, filter.title) != -1
                & verifyIndex(newJobs.company, filter.company) != -1
                & verifyIndex(newJobs.company_type, filter.company_type) != -1
                & verifyIndex(newJobs.location, filter.location) != -1
                & verifyIndex(newJobs['remote?'], filter['remote?']) != -1
                & verifyIndex(newJobs.category, filter.category) != -1
                & verifyIndex(newJobs.level, filter.level) != -1
            );
        });
    },
    insertItem: null
}

//----------------------------------------------
// Configure jsGrid
//----------------------------------------------
$("#jsGrid").jsGrid({
    width: "85%",
    height: "35em",
    filtering: true,
    heading: true,
    editing: false,
    inserting: false,
    sorting: true,
    paging: false,
    autoload: false,
    pagerFormat: "total items: {itemsCount}",
    data: jobs,
    controller: db,

    fields: [
        { name: "title",            title: "Vaga",                      type: "text",       width: "30%" },
        { name: "company",          title: "Empresa",                   type: "text",       width: "7%"  },
        { name: "company_type",     title: "Categoria da Empresa",      type: "text",       width: "7%"  },
        { name: "location",         title: "Localização da Vaga",       type: "text",       width: "10%" },
        { name: "remote?",          title: "Vaga remota?",              type: "checkbox",   width: "4%" },
        { name: "category",         title: "Categoria da Vaga",         type: "text",       width: "3%"  },
        { name: "level",            title: "Nível da Vaga",             type: "text",       width: "7%"  }
    ],
});

//----------------------------------------------
// Enable click to job in jsGrid
//----------------------------------------------
$(function () {
    $("#jsGrid").on({
        click: function () {
            var item = $(this).data("JSGridItem");
            window.open(item.url, '_blank').focus();
        },
        auxclick: function () {
            var item = $(this).data("JSGridItem");
            window.open(item.url, '_blank').focus();
        }
    }, "tr");
});

//----------------------------------------------
// Enable export button
//----------------------------------------------
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
  
    var CSV = '';
    //Set Report title in first row or line
  
    CSV += ReportTitle + '\r\n\n';
  
    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";
  
      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {
  
        //Now convert each value to string and comma-seprated
        row += index + ',';
      }
  
      row = row.slice(0, -1);
  
      //append Label row with line break
      CSV += row + '\r\n';
    }
  
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";
  
      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        row += '"' + arrData[i][index] + '",';
      }
  
      row.slice(0, row.length - 1);
  
      //add a line break after each row
      CSV += row + '\r\n';
    }
  
    if (CSV == '') {
      alert("Invalid data");
      return;
    }
  
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");
  
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
  
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
  
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;
  
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
  
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
$(function () {
    $("#exporttable").click(function () {
        var data = $('#jsGrid').jsGrid('option', 'data');
        JSONToCSVConvertor(data, "Report", true);
    })
});
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
})
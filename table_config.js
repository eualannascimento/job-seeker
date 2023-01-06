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
            document.getElementById('lastModified').innerHTML = "Last update: " + lastModified;
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

            return (
                newJobs.title.indexOf(filter.title.toUpperCase()) != -1
                & newJobs.company.indexOf(filter.company.toUpperCase()) != -1
                & newJobs.company_type.indexOf(filter.company_type.toUpperCase()) != -1
                & newJobs.location.indexOf(filter.location.toUpperCase()) != -1
                & newJobs.Categoria.indexOf((filter.Categoria || "").toUpperCase()) != -1
            );
        });
    },
    insertItem: null
}

//----------------------------------------------
// Configure jsGrid
//----------------------------------------------
$("#jsGrid").jsGrid({
    width: "75%",
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
        { name: "title",        title: "Vaga",                  type: "text", width: "25%" },
        { name: "company",      title: "Empresa",               type: "text", width: "7%"  },
        { name: "company_type", title: "Categoria da Empresa",  type: "text", width: "5%" },
        // { name: "site_type", type: "text", width: "5%", autosearch: true },
        // { name: "url", type: "text", width: "10%" },
        { name: "location",     title: "Localização da Vaga",   type: "text", width: "10%" },
        //{ name: "contract", type: "text", width: "5%" },
        { name: "Categoria",    title: "Categoria da Vaga",     type: "text", width: "5%" }
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


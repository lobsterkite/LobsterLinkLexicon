$(document).ready( function () {
    let table = $('body>table').dataTable( {
      "columnDefs": [ {
          "targets": 4,
          "searchable": true,
          "orderable":false
        },
        {
        	"targets":[1,2,3],
        	"orderable":false
        },
        {
            "targets":0,
            "orderable":true,
            "type":"num",
            "render": function(data, type, row){
            	if ( type === 'sort' ) {
            		//console.log(data);
            		let n = data.match(/>#[0-9]+</g);
            		if(!!n){
            			return parseInt(n[0].substring(2, n[0].length-1));
            		}
            		return '';
            	}
            	return data;
            }
        }],
        "pageLength":100,
        "lengthMenu": [25,50,75,100,250],
        "dom":'<lfrtip<t>p>'
    } );
    table.on('page.dt', function() {
	  $('html, body').animate({
	    scrollTop: $(".dataTables_wrapper").offset().top
	   }, 'slow');
	});
});
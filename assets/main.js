$(document).ready( function () {
	let storage = window.localStorage;
	let dataTabler = function(){
		let dt = $('body>table');
		if(dt.length==0){
			storage.setItem('toggleState', false);
			$('body table.dataTable').DataTable().destroy();
		}
		else{
			storage.setItem('toggleState', true);
			createDataTable()
		}
	}
	let createDataTable = function(){
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
		        "autoWidth":false,
		        "pageLength":100,
		        "lengthMenu": [[25,50,75,100,250,-1],[25,50,75,100,250,"All"]],
		        "dom":'<lfrtip<t>p>'/*,
		        "responsive":{
		        	"details":{
		        		"display":$.fn.dataTable.Responsive.display.childRowImmediate,
		        		"type": 'none',
		                "target": ''
		        	}
		        }*/
		    } );
		    table.on('page.dt', function() {
		    	console.log('test');
			  $('html, body').animate({
			    scrollTop: $(".dataTables_wrapper").offset().top
			   }, 'slow');
			});
		}
	let hash = window.location.hash;

	let saveCheck = document.createElement("input");
	saveCheck.type="checkbox";
	saveCheck.name = "toggleSaver";


	let toggleState = storage.getItem('toggleState');
	saveCheck.checked = (toggleState!=null && toggleState=="true");


	//saveCheck.innerHTML = "Toggle use of DataTable";
	let label = document.createElement("label");
	label.for = "toggleSaver";
	label.textContent = "Use DataTables"
	//<label for="subscribeNews">Subscribe to newsletter?</label>
	
	let saveCheckHelp = document.createElement("span");
	saveCheckHelp.textContent = " The Post #'s and reply buttons in quoted posts are links. If they don't work then toggle this button, it will load the entire page as basic html with no filtering/paging.";

	let body = document.querySelector('body');
	//body.prepend(saveCheckHelp);
	//body.prepend(label);
	//body.prepend(saveCheck);
	console.log('added');
	//saveCheck.addEventListener("click", dataTabler);

	if(toggleState!=null && toggleState===true){		
		createDataTable();
	}
	else{
		//sometimes pgae size seems to fuck up anchors
		document.querySelector(hash).scrollIntoView({ behavior: "smooth", block: "start" });
		console.log('moving');
	}

});
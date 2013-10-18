$(function() {

  	$.ajax({
    	type: "POST",
    	url: "../ss/getEvents.php",
    	success: function(data) {
     		var obj = jQuery.parseJSON(data);
      		createTable(obj, formCreated);
    	}
  	});
});		

function deleteline(linenum)
	{
		$.ajax({
			type: "GET",
			url: "../ss/deleteline.php?lineNum="+(linenum+1),
			success: function(){window.location.reload();}
		});
	}
	
function createTable(obj, callback)
{
    var cnt=0;
	$.each(obj, function() { 
		if (cnt % 2 == 0) {$('#EventTable tr:last').after('<tr class="even"><td>'+this.start+'</td><td>'+this.title+'</td><td>'+this.type+'</td><td style="text-align:center"><img style="cursor:pointer" src="../images/x.png" onclick="deleteline('+cnt+')"></img></td></tr>');}
  		else{$('#EventTable tr:last').after('<tr class="odd"><td>'+this.start+'</td><td>'+this.title+'</td><td>'+this.type+'</td><td style="text-align:center"><img style="cursor:pointer" src="../images/x.png" onclick="deleteline('+cnt+')"></img></td></tr>');}
		cnt++;
	});
	//$('#EventTable tr:last').after('<tr class="addnew"><td><input type="text" name="date" value="4/1/2012" id="date"/></td><td><input type="text" name="title" id="title"/></td><td><input type="text" name="type" id="type"/></td><td style="text-align:center"><img style="cursor:pointer" src="../images/plus.jpg" class="button"></img></td></tr>');
	callback();
}

function formCreated()
{
	$('#date').datepicker();

			// form submission
			$('#error').hide();
			$('input').removeClass("error");
			$(".button").click(function() {
				//validate and process form
				var datestamp = new Date();
				datestamp = datestamp.getMonth() + "/" + datestamp.getDate() + "/" + datestamp.getFullYear();
				$("input").removeClass("error");
				$('#error').hide();
				
				var date = $("input#date").val();
				var title= $("input#title").val();
				var type = $("input#type").val();
				
				var dataString = 'title=' + sanitize(title) + '&start='+ sanitize(date) + '&type=' + sanitize(type);
  				//alert (dataString);return false;
  				$.ajax({
    				type: "POST",
    				url: "../ss/process.php",
    				data: dataString,
    				success: function(data) {
      					window.location.reload();
    				}
				});
  			});
}

$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

function sanitize(s)
{
	return s.replace('<','').replace('>','');
}
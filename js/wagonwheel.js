$(document).ready(function(){
	
	// mousover effects for the navigation
	$('.not_selected').mouseover(function() {
    	$(this).stop().animate({ borderTopColor: "#99cc00" }, 'slow');
	});
			
	$('.not_selected').mouseout(function() {
    	$(this).stop().animate({ borderTopColor: "#000" }, 'fast');
	});
			
	$("#copy_year").html(getYear());
	
	LoadEvents(8);

});

function LoadEvents(numToShow)
{
	$.getJSON('ss/getEvents.php', function(data) {
  var items = [];
  var cnt = 0;
  var today = new Date();
  console.log (today);
  var queryresult = Enumerable.From(data)
						.Where(function (x) { return new Date(x.start) >= today })
  						.OrderBy("$.start")
  						.Take(numToShow)
  						.ToArray();
  console.log(queryresult);
  $.each(queryresult, function(key, val) {
    cnt++;
    if(cnt <= numToShow)
    {
    	items.push('<li>' + formatDate(queryresult[key]["start"]) + ' - ' + queryresult[key]["title"] + '</li>');
	}  
  });
   
	if (items.length == 0)
	{
		items.push('<li>Please call for the latest event list</li>');
	}
	
	items.push('<li><a href="events.htm">See All Events</a></li>');

  $('<ul/>', {
    'class': 'event_item',
    html: items.join('')
  }).appendTo('#event_list');
});
}

function formatDate(dateString)
{
	var d = new Date(dateString);
	switch(d.getDay())
	{
		case 0:
			return "Sunday, " + (d.getMonth() + 1) + "/" + d.getDate();
			break;
		case 1:
			return "Monday, " + (d.getMonth() + 1) + "/" + d.getDate();
			break;
		case 2:
			return "Tuesday, " + (d.getMonth() + 1) + "/" + d.getDate();
			break;
		case 3:
			return "Wednesday, " + (d.getMonth() + 1) + "/" + d.getDate();
			break;
		case 4:
			return "Thursday, " + (d.getMonth() + 1) + "/" + d.getDate();
			break;
		case 5:
			return "Friday, " + (d.getMonth() + 1) + "/" + d.getDate();
			break;
		case 6:
			return "Saturday, " + (d.getMonth() + 1) + "/" + d.getDate();
			break;
		
	}
}

function getYear()
{
	var d = new Date();
	return d.getFullYear();
}
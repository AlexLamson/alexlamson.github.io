refreshInterval = 60*1000;
walkToBusStopInMinutes = 15;

//https://github.com/umts/BusInfoBoard
// https://bustracker.pvta.com/InfoPoint/swagger/ui/index#!/StopDepartures/StopDepartures_Get_GET
function updateTimes() {
	$.ajax({
		url: "https://bustracker.pvta.com/InfoPoint/rest/StopDepartures/Get/32",
		success: function(data) {
			// $('#times-display').html(function(i, oldText) {
			// 	return "<table><tr><th>Punctuality</th><th>Departure time</th></tr>";
			// });
			html_content = "<table><tr><th>Punctuality</th><th>Departure time</th></tr>";


			RouteDirections = data[0]['RouteDirections'];
			for(var i = 0; i < RouteDirections.length; i++) {
				Departures = RouteDirections[i]['Departures'];
				// console.log(Departures[0]);
				// console.log(Departures[1]);
				for(var j = 0; j < Departures.length; j++) {
				// for(var j = 0; j < 0; j++) {
					edt = Departures[j]['EDT'];
					now = moment();
					edt = moment(edt);
					// console.log(edt);

					// Is it still "yesterday" as far as the transit agency is concerned
					work_day_start = 4;
					if (now.hour() <= work_day_start) {
						dst_at_start = moment([now.year(), now.month(), now.date(), work_day_start]).subtract(1, "days").isDST();
					} else {
						dst_at_start = moment([now.year(), now.month(), now.date(), work_day_start]).isDST();
					}
					var offset = 0;
					// If we aren't in the same timezone as we were this morning
					if (dst_at_start != moment().isDST()) {
						// If the day started in DST and isn't any more, that means that the clock
						// has moved back an hour from where we want it to be, and we need to up it
						// an hour to display the correct relative times. 
						if (dst_at_start) {
							offset = 1;
						} else {
							offset = -1;
						}
					}

					nowInMinutes = (now.hour() + offset) * 60 + now.minute();
					edtInMinutes = edt.hour() * 60 + edt.minute();
					// Since EDT is always after now, the only reason the days will be different
					// is if the EDT is on the next day.
					if(edt.day() != now.day())
						edtInMinutes += 60 * 24;
					interval = edtInMinutes - nowInMinutes - walkToBusStopInMinutes;
					if (interval < 0)
						continue;
					if (interval == 0)
						ANSWER = 'Now';
					else if (interval < 60)
						ANSWER = interval + ' min';
					else {
						hours = Math.floor(interval / 60);
						minutes = interval % 60;
						ANSWER = hours + ' hr ' + minutes + ' min';
					}

					// console.log(ANSWER);
					// $('#times-display').html(function(i, oldText) {
					// 	return oldText+ANSWER+"<br/>\n";
					// });

					/* It takes 8 minutes from the time I get on the bus to the time I get into work.
					 * Use this information to make a "EARLY" "LATE" "ON TIME" based on my schedule
					*/
					punctuality = "TO DO";

					// $('#times-display').html(function(i, oldText) {
					// 	return oldText+"<tr><td>"+punctuality+"</td><td>"+ANSWER+"</td></tr>\n";
					// });
					html_content += "<tr><td>"+punctuality+"</td><td align=\"right\">"+ANSWER+"</td></tr>\n"
				}

			}

			// $('#times-display').html(function(i, oldText) {
			// 	return oldText+"</table>";
			// });
			html_content += "</table>";

			$('#times-display').html(html_content);
		},
		timeout: 1000,
		error: function(){
			// setTimeout(function(){startErrorRoutine()}, 5000)
			console.log("bus track call timed out");
		}
	});

}

function startRefreshing() {
	// Refresh the board every REFRESH_TIME ms
	updateTimes();
	refresh_id = setInterval(function() {
		updateTimes();
	}, refreshInterval);
}

startRefreshing();

document.getElementById("yearSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const year = document.getElementById("yearInput").value;
  if (year === "") {
    document.getElementById("data").innerHTML = "Please enter a year between 1936 and the current year";
    return;
  }
  if (year < 1936 || year > (new Date().getFullYear())) {
    document.getElementById("data").innerHTML = "Please enter a year between 1936 and the current year";
    return;
  }
  const url = "https://api.collegefootballdata.com/rankings?year=" + year;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      let weekForm = "";
      weekForm += '<label>Enter a week (between 1 and ' + json.length + '):</label>';
      weekForm += '<input id="weekInput" type="text"></input><br/>';
      weekForm += '<input id="weekSubmit" type="submit" value="Submit"></input>';

      document.getElementById("weekForm").innerHTML = weekForm;
      document.getElementById("data").innerHTML = "";
      document.getElementById("weekSubmit").addEventListener("click", function(weekEvent) {
        weekEvent.preventDefault();
        const week = document.getElementById("weekInput").value;
        if (week === "")
          return;

        let weekData = "Week data not available";

        json.forEach((item) => {
          if (item.week == week) {
            weekData = item;
          }
        });

        if (weekData == "Week data not available") {
          document.getElementById("data").innerHTML = weekData;
        }

        let weekPolls = weekData.polls;
        let APTop;

        weekPolls.forEach((item) => {
          if (item.poll == "AP Top 25") {
            APTop = item.ranks;
          }
        });

        let APTopSorted = [];

        for (var i = 0; i < APTop.length + 1; i++) {
          APTop.forEach((item) => {
            if (item.rank == i) {
              APTopSorted.push(item);
            }
          });
        }

        let results = '<table id="data">';
          results += '<tr>'
            results += '<th>Rank</th>';
            results += '<th>School</th>';
            results += '<th>Conference</th>';
          results += '</tr>';

          APTopSorted.forEach((item) => {
            results += '<tr>';
              results += '<td>' + item.rank + '</td>';
              results += '<td>' + item.school + '</td>';
              results += '<td>' + item.conference + '</td>';
            results += '</tr>';
          });

          results += '</table>';

          document.getElementById("data").innerHTML = results;
      });
    });
})

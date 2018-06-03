$(document).ready(function() {
  getTopSongs("short_term");
  getTopSongs("medium_term");
  getTopSongs("long_term");

      
});

function getTopSongs(timelength){
  var access_token = getCookie("access_token");
  $.ajax({  
      url: "https://api.spotify.com/v1/me/top/tracks?&limit=50&time_range=" + timelength,
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      dataType: 'json',
      async: false,
      success: function(response) { 
       var numExplicit = 0;
        var sum = 0;
        var weightedSum = 0;
      console.log(response);
      if(timelength === "short_term")
        short_term.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='pop'>Popularity of Song</div><div class='explicit'>Danceability</div><div class = 'energy'>Energy</div><div class = 'valence'>Valence</div></div>";
      else if(timelength === "medium_term")
        medium_term.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='pop'>Popularity of Song</div><div class='explicit'>Danceability</div><div class = 'energy'>Energy</div><div class = 'valence'>Valence</div></div>";
      else
        long_term.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='pop'>Popularity of Song</div><div class='explicit'>Danceability</div><div class = 'energy'>Energy</div><div class = 'valence'>Valence</div></div>";
      var sum = 0;
      var weightedSum = 0;
      var sumDance = 0;
      var sumEng = 0;
      var sumVal = 0;
      for(var i = 0; i < response["items"].length; i++){
        sum += response["items"][i]["popularity"];
        weightedSum += response["items"][i]["popularity"]*(response["items"].length - i);
 //       timelength.innerHTML += "<p>" + (i+1) + ") " + response["items"][i]["name"] + ", popularity: " + response["items"][i]["popularity"] + "</p>";
        var info = getSongInfo(response["items"][i]["id"]);

        sumDance += info[0];
        sumEng += info[1];
        sumVal += info[2];


        if(timelength === "short_term")
        short_term.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div><div class = 'explicit'>" + info[0] + "</div><div class = 'energy'>" + info[1] + "</div><div class = 'valence'>" + info[2] + "</div></div>";
      else if(timelength === "medium_term")
        medium_term.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div><div class = 'explicit'>" + info[0] + "</div><div class = 'energy'>" + info[1] + "</div><div class = 'valence'>" + info[2] + "</div></div>";
      else
        long_term.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div><div class = 'explicit'>" + info[0] + "</div><div class = 'energy'>" + info[1] + "</div><div class = 'valence'>" + info[2] + "</div></div>";


     //   timelength.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div></div>";
      }
      var num = response["items"].length;
     // "<h4>Average Popularity " + ((sum/num).toFixed(2)) + "<h4></br><h4>Average Weighted Popularity " + ((weightedSum/sumTo(num)).toFixed(2)) + "</h4><br><h4>Average Danceability " + ((sumDance/num).toFixed(2)) + "</h4><br><h4>Average Energy " + ((sumEng/num).toFixed(2)) + "</h4><br><h4>Average Valence " + ((sumVal/num).toFixed(2)) + "</h4>";

      if(timelength === "short_term")
        avgshort.innerHTML += "<h4>Average Popularity " + ((sum/num).toFixed(2)) + "<h4></br><h4>Average Weighted Popularity " + ((weightedSum/sumTo(num)).toFixed(2)) + "</h4><br><h4>Average Danceability " + ((sumDance/num).toFixed(2)) + "</h4><br><h4>Average Energy " + ((sumEng/num).toFixed(2)) + "</h4><br><h4>Average Valence " + ((sumVal/num).toFixed(2)) + "</h4>";
      else if(timelength === "medium_term")
        avgmedium.innerHTML += "<h4>Average Popularity " + ((sum/num).toFixed(2)) + "<h4></br><h4>Average Weighted Popularity " + ((weightedSum/sumTo(num)).toFixed(2)) + "</h4><br><h4>Average Danceability " + ((sumDance/num).toFixed(2)) + "</h4><br><h4>Average Energy " + ((sumEng/num).toFixed(2)) + "</h4><br><h4>Average Valence " + ((sumVal/num).toFixed(2)) + "</h4>";
      else
        avglong.innerHTML += "<h4>Average Popularity " + ((sum/num).toFixed(2)) + "<h4></br><h4>Average Weighted Popularity " + ((weightedSum/sumTo(num)).toFixed(2)) + "</h4><br><h4>Average Danceability " + ((sumDance/num).toFixed(2)) + "</h4><br><h4>Average Energy " + ((sumEng/num).toFixed(2)) + "</h4><br><h4>Average Valence " + ((sumVal/num).toFixed(2)) + "</h4>";

//      tops.innerHTML += "<br><h4>Average Popularity " + (sum/(response["items"].length)).toFixed(2) + "</h4><br>";
//      tops.innerHTML += "<br><h4>Weighted Average Popularity " + (weightedSum/sumTo(response["items"].length)).toFixed(2) + "</h4><br>";

        }
  });
}
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
}

function getSongInfo(songID){
  var retVals = [];
  var access_token = getCookie("access_token");

  $.ajax({
    url: "https://api.spotify.com/v1/audio-features/" + songID,
    headers: {
      'Authorization': 'Bearer ' + access_token
    },
    dataType: 'json',
    async: false,
    success: function(response) {
      retVals.push(response["danceability"]);
      retVals.push(response["energy"]);
      retVals.push(response["valence"]);
    }
  });
  return retVals;
}

function getStats(url){
  var access_token = getCookie("access_token");
  var cnt = 0;
  var sum = 0;
  var ex = 0;
  var ret = new Array();
  $.ajax({  
            url: url,
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            dataType: 'json',
            async: false,
            success: function(response) {
            
            console.log(response);
            for(var i = 0; i < response["items"].length; i++){
              sum += response["items"][i]["track"]["popularity"];
              cnt++;
              if(response["items"][i]["track"]["explicit"])
                ex++;
              }
              

            
}
});
  console.log(sum/cnt);
  ret.push((sum / cnt).toFixed(2));
  ret.push((((ex/cnt) * 100).toFixed(0)) + "%");
  return ret;
}


function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}      



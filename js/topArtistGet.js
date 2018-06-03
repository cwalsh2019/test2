$(document).ready(function() {
  getTopArtists("short_term");
  getTopArtists("medium_term");
  getTopArtists("long_term");

      
});

function getTopArtists(timelength){
  var access_token = getCookie("access_token");
  $.ajax({  
      url: "https://api.spotify.com/v1/me/top/artists?&limit=50&time_range=" + timelength,
      headers: {
        'Authorization': 'Bearer ' + access_token
      },
      dataType: 'json',
      async: false,
      success: function(response) { 
      console.log(response);
      if(timelength === "short_term")
        short_term.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='pop'>Popularity of the Artist</div></div>";
      else if(timelength === "medium_term")
        medium_term.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='pop'>Popularity of the Artist</div></div>";
      else
        long_term.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='pop'>Popularity of the Artist</div></div>";
      var sum = 0;
      var weightedSum = 0;
      for(var i = 0; i < response["items"].length; i++){
        sum += response["items"][i]["popularity"];
        weightedSum += response["items"][i]["popularity"]*(response["items"].length - i);
 //       timelength.innerHTML += "<p>" + (i+1) + ") " + response["items"][i]["name"] + ", popularity: " + response["items"][i]["popularity"] + "</p>";


        if(timelength === "short_term")
        short_term.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div></div>";
      else if(timelength === "medium_term")
        medium_term.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div></div>";
      else
        long_term.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div></div>";


     //   timelength.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='pop'>" + response["items"][i]["popularity"] + "</div></div>";
      }
//      tops.innerHTML += "<br><h4>Average Popularity " + (sum/(response["items"].length)).toFixed(2) + "</h4><br>";
//      tops.innerHTML += "<br><h4>Weighted Average Popularity " + (weightedSum/sumTo(response["items"].length)).toFixed(2) + "</h4><br>";


      if(timelength === "short_term"){
        avgshort.innerHTML += "<h4>Average Popularity " + (sum/(response["items"].length)).toFixed(2) + "</h4><br><br><h4>Weighted Average Popularity " + (weightedSum/sumTo(response["items"].length)).toFixed(2) + "</h4><br>";
        }
        else if(timelength === "medium_term"){
          avgmedium.innerHTML += "<h4>Average Popularity " + (sum/(response["items"].length)).toFixed(2) + "</h4><br><br><h4>Weighted Average Popularity " + (weightedSum/sumTo(response["items"].length)).toFixed(2) + "</h4><br>";
        }else{
          avglong.innerHTML += "<h4>Average Popularity " + (sum/(response["items"].length)).toFixed(2) + "</h4><br><br><h4>Weighted Average Popularity " + (weightedSum/sumTo(response["items"].length)).toFixed(2) + "</h4><br>";
        }
      }
  });
}
function sumTo(n) {
  if (n == 1) return 1;
  return n + sumTo(n - 1);
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



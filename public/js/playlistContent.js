$(document).ready(function() {
      var access_token = getCookie("access_token");
      $.ajax({  
            url: "https://api.spotify.com/v1/me/playlists",
            headers: {
              'Authorization': 'Bearer ' + access_token
            },
            dataType: 'json',
            async: false,
            success: function(response) { 
        //          playlistContent.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='num'>Number of Songs(limited to 100)</div><div class='pop'>Average Popularity of Songs</div></div>";
                  playlistContent.innerHTML += "<div class='table-head'><div class='serial'>#</div><div class='name'>Name</div><div class='num'>Number of Songs</div><div class='pop'>Average Popularity of the Songs</div><div class='explicit'>% Of Songs That Are Explicit</div></div>";

                  playlistContent.innerHTML += "";
                  playlistContent.innerHTML += "";
                  playlistContent.innerHTML += "";
                  playlistContent.innerHTML += "";
                for(var i = 0; i < response["items"].length; i++)
                 {

                    playlistContent.innerHTML += "<div class='table-row'><div class='serial'>" + (i+1) + "</div><div class='name'>" + response["items"][i-'0']["name"] + "</div><div class='num'>" + response["items"][i]["tracks"]["total"] + "</div><div class='pop'>" + getStats(response["items"][i]["tracks"]["href"])[0] + "</div><div class='explicit'>" + getStats(response["items"][i]["tracks"]["href"])[1] + "</div></div>";
                    playlistContent.innerHTML += "";
                    playlistContent.innerHTML += "";
                    playlistContent.innerHTML += "";
                    playlistContent.innerHTML += "";
                    playlistContent.innerHTML += "";

                           }
            } 
      });
});

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



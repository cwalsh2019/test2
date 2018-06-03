
$(document).ready(function() {
        console.log("this runs2");
        
      	 var userProfileSource = document.getElementById('user-profile-template').innerHTML,
            userProfileTemplate = Handlebars.compile(userProfileSource),
            userProfilePlaceholder = document.getElementById('user-profile');


      	var access_token = getCookie("access_token");
      	console.log(access_token);
                if (access_token) {
                    $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                async: false,
                success: function(response) {
                  userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                  userid = response["id"];
                  $('#login').hide();
                  $('#loggedin').show();
                }
            });

                  } else {
                  	console.log("stil now ork");
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
    });






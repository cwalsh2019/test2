
$(document).ready(function() {
        console.log("this runs2");
       function getHashParams() {
          var hashParams = {};
          var e, r = /([^&;=]+)=?([^&;]*)/g,
              q = window.location.hash.substring(1);
          while ( e = r.exec(q)) {
             hashParams[e[1]] = decodeURIComponent(e[2]);
          }
          return hashParams;
        }

        console.log("this runs 1");

        var params = getHashParams();

        var access_token = params.access_token,
        refresh_token = params.refresh_token,
        error = params.error;
        console.log(access_token);
        document.cookie = "access_token="+access_token;
        if (error) {
              alert('There was an error during the authentication');
        } else {
                if (access_token) {
                    window.location.href = "userInfo.html";

                  } else {

                  }


            }
    });




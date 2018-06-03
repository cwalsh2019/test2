var params;
var access_token;
$(document).ready(function() {
        console.log("this runs8");
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
});
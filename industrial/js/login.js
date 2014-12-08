/**
 * Created by Sefu on 12/8/2014.
 */
//for some reason console.log is not working
//I am using alert

function Authenticate(USERNAME, PAROLA){
    var isAuthenticated = new Boolean(false);
    $.getJSON( "js/data/myUsers.json", function(data) {
        for(var i in data.users){
            if(USERNAME===data.users[i].username &&
               PAROLA===data.users[i].password){
              this.isAuthenticated = true;
            }
        }
    });
    return isAuthenticated;
}
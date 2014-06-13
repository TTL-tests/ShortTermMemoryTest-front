function Login(){

    function start(){
        createHtml();
    }
    
    function createHtml(){
        document.body.innerHTML = '<div id="login">\
        ' + text["kirjoitaTunnus"] + '\
        <form onSubmit="stateMachine.checkUsername(document.getElementById(\'username\').value)">\
        <input type="text" id="username" autocomplete="off" autofocus required>\
        <input type="button" value="Aloita" onclick="stateMachine.checkUsername(document.getElementById(\'username\').value)" />\
        </form>';
    }
    
    function checkUsername(checkName, user){

        var req = new Request();
        var params = "username="+checkName;

        username = checkName;
        user.set(checkName);

        var jsonData = req.createPost(url+"login", params);
        var response = JSON.parse(jsonData);

        return checkResponse(response, user);

    }

    function checkResponse(response, user){

        if (response.isReserved) {

            user.setTrained(response.isTrained);
            return true;

        } else {
            return false;
        }

    }
    

    return {
        start:start,
        checkUsername:checkUsername
    }
}

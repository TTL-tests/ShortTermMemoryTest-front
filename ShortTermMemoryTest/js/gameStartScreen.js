function GameStartScreen(user){
    var page = 1;

    function start(){
        createHtml();
    }

    function keyPress(key){
        if(key == 32 && page == 3) {
            stateMachine.startWaitPractice();
        }else if(key == 13 && user.isTrained() && page == 3) {
            stateMachine.startGame('GAME');
        }else if(key == 32) {
            changePage();
        }
    }

    function changePage(){
        document.getElementById("startScreenP"+page).style.display = "none";
        page = page+1;
        document.getElementById("startScreenP"+page).style.display = "inline";
    }


    function createHtml(){

        if(user.isTrained()){
            document.body.innerHTML = '<div id="startScreen">' +
                '<div id="startScreenP1">' + text["ohje1"] + '</div>' +
                '<div id="startScreenP2">' + text["ohje2"] + '</div>' +
                '<div id="startScreenP3">' + text["ohje3"] + '</div></div>';
        }else{
            document.body.innerHTML = '<div id="startScreen">' +
                '<div id="startScreenP1">' + text["ohjeHarjoitteluSuorittamatta1"] + '</div>' +
                '<div id="startScreenP2">' + text["ohjeHarjoitteluSuorittamatta2"] + '</div>' +
                '<div id="startScreenP3">' + text["ohjeHarjoitteluSuorittamatta3"] + '</div></div>';
        }

    }

    return {
        start:start,
        keyPress:keyPress
    }
}

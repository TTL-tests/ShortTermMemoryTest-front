/**
 * Created by kristiak on 23.5.2014.
 */

function showPracticeFeedback(gameData) {

    var gameData = gameData;

    function createHTML() {
        var htmlStructure = "<div id=\"Result\">\
                                <h1 id=\"firstline\"></h1>\
                                <h1 id=\"secondline\"></h1>\
                                <h1 id=\"thirdline\"></h1>\
                                <h1 id=\"fourthline\"></h1>\
                                <h1 id=\"fifthline\"></h1>\
                                <h1 id=\"sixthline\"></h1>\
                             </div>";
        $("body").html(htmlStructure);
    }

    createHTML();

    if (gameData.result.lastSeriesCorrectness == true) {
        $("#firstline").html("CORRECT");
        $("#secondline").html("You entered the correct numbers in the correct order.");
    } else {
        $("#firstline").html("INCORRECT");
        $("#secondline").html("The numbers you entered were either not correct or not in the correct order.");
    }

    if (gameData.numberList.length == gameData.numberListIndex) {
        $("#thirdline").html("This concludes your practice.");
        $("#sixthline").html("Press enter to see your overall result.");

        gameData.requestFocus(function (event, keyCode) {
            if (keyCode == 13) {
                hidePracticeFeedback(event);
                gameData.eventHandler.triggerEvent("EVENT_SHOWRESULT_START", "", 0);
            }
        });
    } else {
        $("#thirdline").html("Press enter to attempt the next practice series.");

        gameData.requestFocus(function (event, keyCode) {
            if (keyCode == 13) {
                hidePracticeFeedback(event);
                gameData.eventHandler.triggerEvent("EVENT_SHOWSERIES_START", "", 0);
            }
        });
    }

    function hidePracticeFeedback(event) {
        $("#Result").html("");
    }
}

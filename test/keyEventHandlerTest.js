

describe("keyEventHandler", function() {

    var storer;
    var down1;
    var up1;
    var down2;
    var up2;

    beforeEach(function() {
        storer = new eventStorer();
        var handler = new keyEventHandler(storer);
        handler.activate();

        down1 = jQuery.Event("keydown");
        down1.keyCode = 1; // # Some key code value
        down2 = jQuery.Event("keydown");
        down2.keyCode = 2; // # Some key code value

        up1 = jQuery.Event("keyup");
        up1.keyCode = 1; // # Some key code value
        up2 = jQuery.Event("keyup");
        up2.keyCode = 2; // # Some key code value
    });

    it("eventStorer empty in the beginning", function() {
        expect(storer.getEvents().length).toBe(0);
    });


    it("two keydown-events for the same key records only one event", function() {
        $(document).trigger(down1);
        $(document).trigger(down1);
        expect(storer.getEvents().length).toBe(1);
    });

    it("two keydown-events for different keys records two events", function() {
        $(document).trigger(down1);
        $(document).trigger(down2);
        expect(storer.getEvents().length).toBe(2);
    });

    it("down-up for one key records two events", function() {
        $(document).trigger(down1);
        $(document).trigger(up1);
        expect(storer.getEvents().length).toBe(2);
    });

    it("down1-down2-up1-up2 records 4 events", function() {
        $(document).trigger(down1);
        $(document).trigger(down2);
        $(document).trigger(up1);
        $(document).trigger(up2);
        expect(storer.getEvents().length).toBe(4);
    });

    it("down1-down2-up2-down1 records 3 events", function() {
        $(document).trigger(down1);
        $(document).trigger(down2);
        $(document).trigger(up2);
        $(document).trigger(down1);
        expect(storer.getEvents().length).toBe(3);
    });

    it("details of the event recorded correctly", function() {
        $(document).trigger(down1);
        $(document).trigger(up2);
        var time = new Date().getTime();
        var savedEvent1 = storer.getEvents()[0];
        var savedEvent2 = storer.getEvents()[1];
        expect(savedEvent1.type).toBe("EVENT_TYPE_KEYDOWN");
        expect(savedEvent1.value).toBe(1);
        expect(savedEvent2.type).toBe("EVENT_TYPE_KEYUP");
        expect(savedEvent2.value).toBe(2);
        expect(savedEvent1.timeStamp-time).toBeGreaterThan(-100);
        expect(savedEvent1.timeStamp-time).toBeLessThan(100);
    });


});
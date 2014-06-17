function EventHandler() {

    var evStore = new EventStorer();

    function registerEventHandler(eventType, handlerFunction) {
        $(document).on(eventType, handlerFunction);
    }

    function triggerEvent(eventType, eventValue, delay) {

        if (delay == 0) {
            evStore.registerEvent(eventType, eventValue, Date.now());
            $.event.trigger({type: eventType, message: eventValue, time: Date.now()});
            return;
        }

        setTimeout(function () {
                evStore.registerEvent(eventType, eventValue, Date.now());
                $.event.trigger({type: eventType, message: eventValue, time: Date.now()});
            }
            , delay);
    }

    function getStoredEvents() {
        return evStore.getEvents();
    }

    return {
        triggerEvent            : triggerEvent,
        registerEventHandler    : registerEventHandler,
        getStoredEvents         : getStoredEvents
    };
}

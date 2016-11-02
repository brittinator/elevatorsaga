{
    init: function(elevators, floors) {
        var elevator = elevators[0]; // Let's use the first elevator
        var floorQueue = []
        // Whenever the elevator is idle (has no more queued destinations) ...
        elevator.on("idle", function() {
            elevator.goToFloor(0);
        });


        elevator.on("floor_button_pressed", function(floorNum) {
            floorQueue.push(floorNum);
            floorQueue.sort();
            elevator.goToFloor(floorQueue[0]);
            floorQueue.splice(0, 1);
        });

        // elevator.on("passing_floor", function(floorNum, direction) {
        //
        // });
        //
        // elevator.on("stopped_at_floor", function(floorNum) {
        //
        // });
    },
    update: function(dt, elevators, floors) {
        // We normally don't need to do anything here
    }
}

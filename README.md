# Elevator Saga

http://play.elevatorsaga.com/

* Challenge #1: Transport 15 people in 60 seconds or less
* Challenge #2: Transport 20 people in 60 seconds or less
* Challenge #3: Transport 23 people in 60 seconds or less
* Challenge #4: Transport 28 people in 60 seconds or less (now have 2 elevators handy)


(From website)
# Elevator Saga Help and API documentation
About the game
This is a game of programming!
Your task is to program the movement of elevators, by writing a program in JavaScript.

The goal is to transport people in an efficient manner.
Depending on how well you do it, you can progress through the ever more difficult challenges.
Only the very best programs will be able to complete all the challenges.

How to play
Enter your code in the input window below the game view, and press the Apply button to start the challenge.
You can increase or decrease the speed of time by pressing the  and  buttons.

If your program contains an error, you can use the developer tools in your web browser to try and debug it. If you want to start over with the code, press the Reset button. This will revert the code to a working but simplistic implementation.
If you have a favorite text editor, such as Sublime Text, feel free to edit the code there and paste it into the game editor.
Your code is automatically saved in your local storage, so don't worry - it doesn't disappear if you accidentally close the browser.

Basics
Your code must declare an object containing at least two functions called init and update. Like this:
`
{
    init: function(elevators, floors) {
        // Do stuff with the elevators and floors, which are both arrays of objects
    },
    update: function(dt, elevators, floors) {
        // Do more stuff with the elevators and floors
        // dt is the number of game seconds that passed since the last time update was called
    }
}
`
These functions will then be called by the game during the challenge.
init will be called when the challenge starts, and update repeatedly during the challenge.

Normally you will put most of your code in the init function, to set up event listeners and logic.

Code examples
How to control an elevator
elevator.goToFloor(1);
Tell the elevator to move to floor 1 after completing other tasks, if any. Note that this will have no effect if the elevator is already queued to go to that floor.
if(elevator.currentFloor() > 2) { ... }
Calling currentFloor gets the floor number that the elevator currently is on. Note that this is a rounded number and does not necessarily mean the elevator is in a stopped state.
Listening for events
It is possible to listen for events, like when stopping at a floor, or a button has been pressed.

elevator.on("idle", function() { elevator.goToFloor(0); });
Listen for the "idle" event issued by the elevator, when the task queue has been emptied and the elevator is doing nothing. In this example we tell it to move to floor 0.
elevator.on("floor_button_pressed", function(floorNum) { ... } );
Listen for the "floor_button_pressed" event, issued when a passenger pressed a button inside the elevator. This indicates that the passenger wants to go to that floor.
floor.on("up_button_pressed", function() { ... } );
Listen for the "up_button_pressed" event, issued when a passenger pressed the up button on the floor they are waiting on. This indicates that the passenger wants to go to another floor.
API documentation
Elevator object
Property	Type	Explanation	Example
goToFloor	function	Queue the elevator to go to specified floor number. If you specify true as second argument, the elevator will go to that floor directly, and then go to any other queued floors.
elevator.goToFloor(3); // Do it after anything else
elevator.goToFloor(2, true); // Do it before anything else
stop	function	Clear the destination queue and stop the elevator if it is moving. Note that you normally don't need to stop elevators - it is intended for advanced solutions with in-transit rescheduling logic. Also, note that the elevator will probably not stop at a floor, so passengers will not get out.
elevator.stop();
currentFloor	function	Gets the floor number that the elevator currently is on.
if(elevator.currentFloor() === 0) {
    // Do something special?
}
goingUpIndicator	function	Gets or sets the going up indicator, which will affect passenger behaviour when stopping at floors.
if(elevator.goingUpIndicator()) {
    elevator.goingDownIndicator(false);
}
goingDownIndicator	function	Gets or sets the going down indicator, which will affect passenger behaviour when stopping at floors.
if(elevator.goingDownIndicator()) {
    elevator.goingUpIndicator(false);
}
maxPassengerCount	function	Gets the maximum number of passengers that can occupy the elevator at the same time.
if(elevator.maxPassengerCount() > 5) {
    // Use this elevator for something special, because it's big
}
loadFactor	function	Gets the load factor of the elevator. 0 means empty, 1 means full. Varies with passenger weights, which vary - not an exact measure.
if(elevator.loadFactor() < 0.4) {
    // Maybe use this elevator, since it's not full yet?
}
destinationDirection	function	Gets the direction the elevator is currently going to move toward. Can be "up", "down" or "stopped".
destinationQueue	array	The current destination queue, meaning the floor numbers the elevator is scheduled to go to. Can be modified and emptied if desired. Note that you need to call checkDestinationQueue() for the change to take effect immediately.
elevator.destinationQueue = [];
elevator.checkDestinationQueue();
checkDestinationQueue	function	Checks the destination queue for any new destinations to go to. Note that you only need to call this if you modify the destination queue explicitly.
elevator.checkDestinationQueue();
getPressedFloors	function	Gets the currently pressed floor numbers as an array.
if(elevator.getPressedFloors().length > 0) {
    // Maybe go to some chosen floor first?
}
Event	Explanation	Example
idle	Triggered when the elevator has completed all its tasks and is not doing anything.
elevator.on("idle", function() { ... });
floor_button_pressed	Triggered when a passenger has pressed a button inside the elevator.
elevator.on("floor_button_pressed", function(floorNum) {
    // Maybe tell the elevator to go to that floor?
})
passing_floor	Triggered slightly before the elevator will pass a floor. A good time to decide whether to stop at that floor. Note that this event is not triggered for the destination floor. Direction is either "up" or "down".
elevator.on("passing_floor", function(floorNum, direction) { ... });
stopped_at_floor	Triggered when the elevator has arrived at a floor.
elevator.on("stopped_at_floor", function(floorNum) {
    // Maybe decide where to go next?
})
Floor object
Property	Type	Explanation	Example
floorNum	function	Gets the floor number of the floor object.
if(floor.floorNum() > 3) { ... }
Event	Explanation	Example
up_button_pressed	Triggered when someone has pressed the up button at a floor. Note that passengers will press the button again if they fail to enter an elevator.
floor.on("up_button_pressed", function() {
    // Maybe tell an elevator to go to this floor?
})
down_button_pressed	Triggered when someone has pressed the down button at a floor. Note that passengers will press the button again if they fail to enter an elevator.
floor.on("down_button_pressed", function() {
    // Maybe tell an elevator to go to this floor?
})
Made by Magnus Wolffelt and contributors
Source code on GitHub

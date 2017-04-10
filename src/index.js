/**
 * This is an educational parent reference skill.
 */

var Alexa = require('alexa-sdk');
// this is the datastructure that contains the educational information
var nodes = require('./tree');
// this is the logic for the exploratory mode
var explore = require('./explore');

// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
var welcomeMessage = "Welcome to the parent educational reference, ready?";

// This is the message that is repeated if the response to the initial welcome message is not heard
var repeatWelcomeMessage = "Say yes to start from the beginning, or no to exit.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
var promptToStartMessage = "Say yes to continue, or no to exit.";

// this is the help message during the setup at the beginning of the game
var helpMessage = "This is an educationl reference for parents.";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "See you next time!";



// --------------- Handlers -----------------------

// Called when the session starts.
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(newSessionHandler, explore.startGameHandlers, explore.askQuestionHandlers, explore.descriptionHandlers);
    alexa.execute();
};

// set state to start up and  welcome the user
var newSessionHandler = {
    'LaunchRequest': function() {
        this.handler.state = explore.states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.handler.state = explore.states.STARTMODE;
        this.emit(':ask', helpMessage, helpMessage);
    },
    'Unhandled': function() {
        this.handler.state = explore.states.STARTMODE;
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    }
};

/**
 * This is an educational parent reference skill with two modes: exploratory and game mode
 * 
 */

"use strict";
var Alexa = require('alexa-sdk');

// this is the datastructure that contains the educational information
var nodes = require('./tree');
// this is the logic for the exploratory mode
var explore = require('./explore');

// this is the logic for the game mode
var game = require('./game');


// These are messages that Alexa says to the user during conversation

// This is the intial welcome message
var welcomeMessage = "Welcome to the parent educational reference. Would you like to explore topics, or play a game?";

// this is the help message during the setup at the beginning of the game
var helpMessage = "This is an educational reference for parents. You can say 'explore' to learn about topics or say 'play game' to test your knowledge.";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "See you next time!";

// --------------- Game Messages ------------------

var languageString = game.languageString;

// --------------- Handlers -----------------------
var states = {
    CHOICEMODE: "_CHOICEMODE"
}

// Called when the session starts.
exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.resources = languageString;
    alexa.registerHandlers(newSessionHandler, choicePointHandler, explore.startGameHandlers, explore.categoryHandlers, explore.topicHandlers, game.startStateHandlers, game.triviaStateHandlers, game.helpStateHandlers);
    alexa.execute();
};


// set state to start up and  welcome the user
var newSessionHandler = {
    'LaunchRequest': function() {
        this.handler.state = states.CHOICEMODE;
        this.emit(':ask', welcomeMessage, helpMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.handler.state = states.CHOICEMODE;
        this.emit(':ask', helpMessage, helpMessage);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'Unhandled': function() {
        this.handler.state = states.CHOICEMODE;
        this.emit(':ask', helpMessage, helpMessage);
    }
};

// logic to decide which mode to enter - game or exploratory
var choicePointHandler = Alexa.CreateStateHandler(states.CHOICEMODE, {
    // jump into explore mode
    'ExploratoryIntent': function() {
        this.handler.state = explore.states.STARTMODE;
        this.emitWithState('AMAZON.YesIntent');

    },
    // jump into game mode
    'PlayGameIntent': function() {
        this.handler.state = game.GAME_STATES.START;
        this.emitWithState('StartGame', true);
    },
    // reenter from different mode
    'ReenterIntent': function () {
        this.handler.state = states.CHOICEMODE;
        this.emit(':ask', welcomeMessage, helpMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.handler.state = states.CHOICEMODE;
        this.emit(':ask', helpMessage, helpMessage);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'Unhandled': function() {
        this.handler.state = states.CHOICEMODE;
        this.emit(':ask', helpMessage, helpMessage);
    }
});

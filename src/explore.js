"use strict";
var Alexa = require('alexa-sdk');

var states = {
    STARTMODE: '_STARTMODE', // Prompt the user to start or restart the mode.
    CATEGORYMODE: '_CATEGORYMODE', // Alexa is in a node with subcategories to choose from.
    TOPICMODE: '_TOPICMODE', // Alexa is in a leaf node that has information about a particular topic.
};

// this is the datastructure that contains the educational information
var nodes = require('./tree');
// the first node that we will use
var START_NODE = "beginning";

// These are messages that Alexa says to the user during conversation

// This is the message that is said after reaching a topic node.
// it is given after a 'no' response about hearing more and after the fuller description body has been read
var endOfTopicMessage = "Say 'jump to beginning' to start from the top, 'start over' to restart the skill, or say 'help' to learn about more advanced exploration techniques.";

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
var sayAgain = "Please say that again.";

// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again
var hearMoreMessage = "Would you like to hear more?";

// this is the help message during the setup at the beginning of the game
var helpMessage = "You are in the exploratory mode of the parent educational reference. Here you can navigate a tree-like structure to learn about different topics. In addition to the basic navigation techniques, there are some more advanced modes of exploration. You can say 'go back' to go up one level, or say 'tell me about a topic' to jump to the topic you want to learn about. To start from the top, say 'jump to beginning'. If you would like to go back to the start of the skill, say 'start over'. You can jump over to the game mode by saying 'play game' at any time.";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "See you next time!";

var speechNotFoundMessage = "Could not find speech for node";

var nodeNotFoundMessage = "In nodes array could not find node";

var descriptionNotFoundMessage = "Could not find description for node";

var loopsDetectedMessage = "A potential loop was detected on the node tree, please fix before continuing";


// --------------- Functions that control the skill's behavior -----------------------

// Called at the start of the game, picks and asks first question for the user
// When mode inintially starts the YesIntent is called from index.js when user chooses explore mode
// Only entered through other handlers with YesIntent
var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {

    'AMAZON.YesIntent': function() {

        // set state to start exploring categories
        this.handler.state = states.CATEGORYMODE;

        // ask first response, the response will be handled in the askQuestionHandler
        var message = helper.getSpeechForNode(START_NODE);

        // record the node we are on
        this.attributes.currentNode = START_NODE;

        // ask the first question
        this.emit(':ask', message, message);
    }
});


// user will have chosen a category when this intent is called. We want to look at their
// response and go to another category node or a topic node
var categoryHandlers = Alexa.CreateStateHandler(states.CATEGORYMODE, {

    'CategoryIntent': function() {
        // Handle category answer
        var category = this.event.request.intent.slots.Category.value;
        helper.getCategory(this, category);
    },
    'GoBackIntent': function() {
        helper.getCategory(this, 'parent');
    },
    'JumpToIntent': function() {
        helper.jumpTo(this);
    },

    'AMAZON.HelpIntent': function() {
        this.emit(':ask', helpMessage, helpMessage);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    // go back to main entry point of skill over at index
    'AMAZON.StartOverIntent': function() {
        this.handler.state = '_CHOICEMODE';
        this.emitWithState('ReenterIntent');
    },
    // jump over to game mode
    'PlayGameIntent': function() {
        this.handler.state = '_CHOICEMODE';
        this.emitWithState('PlayGameIntent');
    },
    // repeat the question if it doens't understand the answer
    'Unhandled': function() {
        helper.repeat(this);
    }
});

// user has reached a topic node, has heard the header message and is prompted to hear more
var topicHandlers = Alexa.CreateStateHandler(states.TOPICMODE, {

    'GoBackIntent': function() {
        this.handler.state = states.CATEGORYMODE;
        helper.getCategory(this, 'parent');
    },
    'JumpToIntent': function() {
        helper.jumpTo(this);
    },
    // User answered 'yes' to 'would you like to hear more?'
    'AMAZON.YesIntent': function() {
        helper.giveDescription(this);
    },
    // User answered 'no' to 'would you like to hear more?'
    'AMAZON.NoIntent': function() {
        this.emit(':ask', endOfTopicMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', helpMessage, helpMessage);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    // go back to main entry point of skill over at index
    'AMAZON.StartOverIntent': function() {
        this.handler.state = '_CHOICEMODE';
        this.emitWithState('ReenterIntent');
    },
    // jump over to game mode
    'PlayGameIntent': function() {
        this.handler.state = '_CHOICEMODE';
        this.emitWithState('PlayGameIntent');
    },
    'Unhandled': function() {
        var topicUnhandledMessage = "Say 'yes' to hear more. Otherwise, " + endOfTopicMessage;
        this.emit(':ask', topicUnhandledMessage, endOfTopicMessage);
    }
});


// --------------- Helper Functions  -----------------------
var helper = {

    repeat: function(context) {
        var currentNode = context.attributes.currentNode;
        var message = helper.getSpeechForNode(currentNode);
        message = "I didn't catch that. " + message;
        context.emit(':ask', message, message);
    },

    // gives the user more information on their topic choice
    giveDescription: function(context) {

        // get the speech for the child node
        var description = helper.getDescriptionForNode(context.attributes.currentNode);
        var message = description + ', ' + endOfTopicMessage;

        context.emit(':ask', message, message);
    },

    // logic to provide the responses to the category/topic responses
    getCategory: function(context, reply) {

        // this is a category node so we need to see which subcategory/topic they chose
        var nextNodeId = helper.getNextNode(context.attributes.currentNode, reply);

        // error in node data
        if (nextNodeId == -1) {
            context.handler.state = states.STARTMODE;

            // the current node was not found in the nodes array
            // this is due to the current node in the nodes array having a yes / no node id for a node that does not exist
            context.emit(':tell', nodeNotFoundMessage, nodeNotFoundMessage);
        }

        // get the speech for the child node
        var message = helper.getSpeechForNode(nextNodeId);

        // have we reached a topic?
        if (helper.isTopicNode(nextNodeId) === true) {

            // set the game state to description mode
            context.handler.state = states.TOPICMODE;

            // append the play again prompt to the decision and speak it
            // message = decisionMessage + ' ' + message + ' ,' + hearMoreMessage;
            message = message + ' ,' + hearMoreMessage;
        }

        // set the current node to next node we want to go to
        context.attributes.currentNode = nextNodeId;

        context.emit(':ask', message, message);
    },

    // jump to logic
    jumpTo: function(context) {
        var nextNodeId = context.event.request.intent.slots.Category.value;

        // error in node data
        if (nextNodeId == -1) {
            context.handler.state = states.STARTMODE;

            // the current node was not found in the nodes array
            // this is due to the current node in the nodes array having a yes / no node id for a node that does not exist
            context.emit(':tell', nodeNotFoundMessage, nodeNotFoundMessage);
        }

        // get the speech for the child node
        var message = helper.getSpeechForNode(nextNodeId);

        // have we made a decision
        if (helper.isTopicNode(nextNodeId) === true) {

            // set the game state to description mode
            context.handler.state = states.TOPICMODE;

            // append the play again prompt to the decision and speak it
            // message = decisionMessage + ' ' + message + ' ,' + hearMoreMessage;
            message = message + ' ,' + hearMoreMessage;
        } else {
            context.handler.state = states.CATEGORYMODE;
        }

        // set the current node to next node we want to go to
        context.attributes.currentNode = nextNodeId;

        context.emit(':ask', message, message);
    },

    // gets the description for the given topic node id
    getDescriptionForNode: function(nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].description;
            }
        }
        return descriptionNotFoundMessage + nodeId;
    },

    // returns the speech for the provided node id
    getSpeechForNode: function(nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                return nodes[i].message;
            }
        }
        return speechNotFoundMessage + nodeId;
    },

    // checks to see if this node is a category node or a topic node
    isTopicNode: function(nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                // simple test for now. only topic nodes have descriptions
                return nodes[i].description != undefined;
            }
        }
        return false;
    },

    // gets the next node to traverse to based on the category/topic response
    getNextNode: function(nodeId, catOrTop) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                // returns the unique category/topic keyword as defined in the parent node
                return nodes[i][catOrTop];
            }
        }
        // error condition, didnt find a matching node id. Cause will be a yes / no entry in the array but with no corrosponding array entry
        return -1;
    },

    // Recursively walks the node tree looking for nodes already visited
    // This method could be changed if you want to implement another type of checking mechanism
    // This should be run on debug builds only not production
    // returns false if node tree path does not contain any previously visited nodes, true if it finds one
    debugFunction_walkNode: function(nodeId) {

        // console.log("Walking node: " + nodeId);

        if (helper.isTopicNode(nodeId) === true) {
            // found an answer node - this path to this node does not contain a previously visted node
            // so we will return without recursing further

            // console.log("Answer node found");
            return false;
        }

        // mark this question node as visited
        if (helper.debugFunction_AddToVisited(nodeId) === false) {
            // node was not added to the visited list as it already exists, this indicates a duplicate path in the tree
            return true;
        }

        // console.log("Recursing yes path");
        var catOrTopde = helper.getNextNode(nodeId, "yes");
        var duplicatePathHit = helper.debugFunction_walkNode(catOrTopde);

        if (duplicatePathHit === true) {
            return true;
        }

        // console.log("Recursing no");
        var noNode = helper.getNextNode(nodeId, "no");
        duplicatePathHit = helper.debugFunction_walkNode(noNode);

        if (duplicatePathHit === true) {
            return true;
        }

        // the paths below this node returned no duplicates
        return false;
    },

    // checks to see if this node has previously been visited
    // if it has it will be set to 1 in the array and we return false (exists)
    // if it hasnt we set it to 1 and return true (added)
    debugFunction_AddToVisited: function(nodeId) {

        if (visited[nodeId] === 1) {
            // node previously added - duplicate exists
            // console.log("Node was previously visited - duplicate detected");
            return false;
        }

        // was not found so add it as a visited node
        visited[nodeId] = 1;
        return true;
    }
};


module.exports = {
    states: states,
    startGameHandlers: startGameHandlers,
    categoryHandlers: categoryHandlers,
    topicHandlers: topicHandlers,
    helper: helper
}

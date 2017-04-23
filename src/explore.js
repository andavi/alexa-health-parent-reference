var Alexa = require('alexa-sdk');

var states = {
    STARTMODE: '_STARTMODE', // Prompt the user to start or restart the game.
    ASKMODE: '_ASKMODE', // Alexa is asking user the questions.
    DESCRIPTIONMODE: '_DESCRIPTIONMODE', // Alexa is describing the final choice and prompting to start again or quit
};

// this is the datastructure that contains the educational information
var nodes = require('./tree');
// the first node that we will use
var START_NODE = "beginning";

// These are messages that Alexa says to the user during conversation

// This is the message that is repeated if the response to the initial welcome message is not heard
var repeatWelcomeMessage = "Say yes to start from the beginning, or no to exit.";

// this is the message that is repeated if Alexa does not hear/understand the reponse to the welcome message
var promptToStartMessage = "Say yes to continue, or no to exit.";

// This is the prompt during the game when Alexa doesnt hear or understand a yes / no reply
var sayAgain = "Please say that again.";

// This is the response to the user after the final question when Alex decides on what group choice the user should be given
var decisionMessage = "Decision message";

// This is the prompt to ask the user if they would like to hear a short description of thier chosen profession or to play again
var playAgainMessage = "Say 'tell me more' to hear more";

// this is the help message during the setup at the beginning of the game
var helpMessage = "You are in the exploratory mode of the parent educational reference. Here you can navigate a tree-like structure to learn about different topics. In addition to the basic navigation techniques, there are some more advanced modes of exploration. You can say 'go back' to go up one level, or say 'tell me about a topic' to jump to the topic you want to learn about. To start over, say 'jump to beginning'.";

// This is the goodbye message when the user has asked to quit the game
var goodbyeMessage = "Ok, see you next time!";

var speechNotFoundMessage = "Could not find speech for node";

var nodeNotFoundMessage = "In nodes array could not find node";

var descriptionNotFoundMessage = "Could not find description for node";

var loopsDetectedMessage = "A potential loop was detected on the node tree, please fix before continuing";

var utteranceTellMeMore = "tell me more";

var utterancePlayAgain = "play again";



// --------------- Functions that control the skill's behavior -----------------------

// Called at the start of the game, picks and asks first question for the user
var startGameHandlers = Alexa.CreateStateHandler(states.STARTMODE, {
    // 'startExploring': function() {
    //
    // }
    'AMAZON.YesIntent': function() {

        // set state to asking questions
        this.handler.state = states.ASKMODE;

        // ask first question, the response will be handled in the askQuestionHandler
        var message = helper.getSpeechForNode(START_NODE);

        // record the node we are on
        this.attributes.currentNode = START_NODE;

        // ask the first question
        this.emit(':ask', message, message);
    },
    'AMAZON.NoIntent': function() {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', goodbyeMessage);
    },
    'AMAZON.StartOverIntent': function() {
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', helpMessage, helpMessage);
    },
    'Unhandled': function() {
        this.emit(':ask', promptToStartMessage, promptToStartMessage);
    }
});


// user will have chosen a category when this intent is called. We want to look at their
// response and then ask another question. If we have asked more than the requested number of questions Alexa will
// make a choice, inform the user and then ask if they want to play again
var askQuestionHandlers = Alexa.CreateStateHandler(states.ASKMODE, {

    'CategoryIntent': function() {
        // Handle category answer
        var category = this.event.request.intent.slots.Category.value;
        helper.yesOrNo(this, category);
    },
    'GoBackIntent': function() {
        helper.yesOrNo(this, 'parent');
    },
    'JumpToIntent': function() {
        helper.jumpTo(this);
    },

    // 'AMAZON.YesIntent': function() {
    //     // Handle Yes intent.
    //     helper.yesOrNo(this, 'yes');
    // },
    'AMAZON.NoIntent': function() {
        // Handle No intent.
        // helper.yesOrNo(this, 'no');
        this.emit(':tell', goodbyeMessage);
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
    'AMAZON.StartOverIntent': function() {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'Unhandled': function() {
        this.emit(':ask', sayAgain, sayAgain);
    }
});

// user has heard the final choice and has been asked if they want to hear the description or to start over
descriptionHandlers = Alexa.CreateStateHandler(states.DESCRIPTIONMODE, {

    'GoBackIntent': function() {
        this.handler.state = states.ASKMODE;
        helper.yesOrNo(this, 'parent');
    },
    'JumpToIntent': function() {
        helper.jumpTo(this);
    },

    'AMAZON.YesIntent': function() {
        // Handle Yes intent.
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
        // helper.giveDescription(this);
    },
    'AMAZON.NoIntent': function() {
        // Handle No intent.
        this.emit(':tell', goodbyeMessage);
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
    'AMAZON.StartOverIntent': function() {
        // reset the game state to start mode
        this.handler.state = states.STARTMODE;
        this.emit(':ask', welcomeMessage, repeatWelcomeMessage);
    },
    'DescriptionIntent': function() {
        //var reply = this.event.request.intent.slots.Description.value;
        //console.log('HEARD:' + reply);
        helper.giveDescription(this);
    },
    'Unhandled': function() {
        this.emit(':ask', sayAgain, sayAgain);
    }
});


// --------------- Helper Functions  -----------------------
var helper = {

    // gives the user more information on their final choice
    giveDescription: function(context) {

        // get the speech for the child node
        var description = helper.getDescriptionForNode(context.attributes.currentNode);
        var message = description + ', ' + repeatWelcomeMessage;

        context.emit(':ask', message, message);
    },

    // logic to provide the responses to the yes or no responses to the main questions
    yesOrNo: function(context, reply) {

        // this is a question node so we need to see if the user picked yes or no
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

        // have we made a decision
        if (helper.isAnswerNode(nextNodeId) === true) {

            // set the game state to description mode
            context.handler.state = states.DESCRIPTIONMODE;

            // append the play again prompt to the decision and speak it
            // message = decisionMessage + ' ' + message + ' ,' + playAgainMessage;
            message = message + ' ,' + playAgainMessage;
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
        if (helper.isAnswerNode(nextNodeId) === true) {

            // set the game state to description mode
            context.handler.state = states.DESCRIPTIONMODE;

            // append the play again prompt to the decision and speak it
            // message = decisionMessage + ' ' + message + ' ,' + playAgainMessage;
            message = message + ' ,' + playAgainMessage;
        } else {
            context.handler.state = states.ASKMODE;
        }

        // set the current node to next node we want to go to
        context.attributes.currentNode = nextNodeId;

        context.emit(':ask', message, message);
    },

    // gets the description for the given node id
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

    // checks to see if this node is an choice node or a decision node
    isAnswerNode: function(nodeId) {

        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                // if (nodes[i].yes === 0 && nodes[i].no === 0) {
                //     return true;
                // }
                return nodes[i].description != undefined;
            }
        }
        return false;

        // return nodeId >= 5;
    },

    // gets the next node to traverse to based on the yes no response
    getNextNode: function(nodeId, yesNo) {
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].node == nodeId) {
                // if (yesNo == "yes") {
                //     return nodes[i].yes;
                // }
                // return nodes[i].no;
                return nodes[i][yesNo];
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

        if (helper.isAnswerNode(nodeId) === true) {
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
        var yesNode = helper.getNextNode(nodeId, "yes");
        var duplicatePathHit = helper.debugFunction_walkNode(yesNode);

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
    askQuestionHandlers: askQuestionHandlers,
    descriptionHandlers: descriptionHandlers,
    helper: helper
}

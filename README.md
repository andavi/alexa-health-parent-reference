<h1>Parent Educational Reference</h1>

>Our group <a href="https://alexahealth.web.unc.edu/">website</a> with more information including documentation, architecture diagrams, and presentation slides given during the Software Engineering Lab course. 

This repository is for an Amazon Alexa skill prototype to be used by parents as an educational reference, focusing pediatric information about infants from 0-12 months in age.


<h3>Installation</h3>

In order to use this skill with your Alexa device you will need to do two things:

<ol>
    <li>Put the contents of the speechAssets folder into their appropriate places at developer.amazon.com</li>
    <li>Compress the contents of the src folder and upload it into a Lambda function at aws.amazon.com which will be linked to the skill set up at Amazon Developer</li>
</ol>

These steps are outlined in full detail <a href="https://github.com/alexa/skill-sample-nodejs-fact">here</a>.

<h3>Use</h3>

When you open the Parent Reference skill you will be given an option of whether you want to enter exploratory mode or play a game. You reply by saying either "play a game" or "explore."

<h4>Exploratory Mode</h4>

The exploratory mode allows you to navigate a tree-like structure of categories and subcategories that lead down to nodes with information about a particular topic. The structure allows for a logical grouping of information.

The basic navigation mode starts at the top of the tree, where it asks you which category would you like to learn about. You reply by saying whichever category you want to enter. This continues until you reach a leaf node with the information you are seeking.

There are advanced navigation techniques in place that allow for less tedious retrieval of information. These can be explained by saying "help" at an point in the exploratory mode. They include:

<ul>
    <li><em>"Go back"</em> - this will take you up one level of the tree to the category directly above whichever one you are currently at.</li>
    <li><em>"Jump to beginning"</em> - this takes you back to the top of the tree.</li>
    <li><em>"Tell me about [category/topic]"</em> - saying this will allow you to jump to a node that has keyword [category/topic]. It can be either a category or a topic. For example, saying "tell me about sleep" will take you to the "sleep" subcategory node which will list the topics to choose from there. If you say "tell me about sleep environment" it will jump directly to the topic node that contains information about sleeping environment for infants.</li>
    <li><em>"Start over"</em> - brings you back to the beginning of the skill to where you can choose game or explore mode</li>
    <li><em>"Play game"</em> - you can say this to jump right into the game mode from anywhere in the exploration side</li>
    <li><em>"Stop"</em> - will allow you to exit the skill</li>
</ul>

Any of these advanced navigation commands can be called at any point in the exploratory mode.

<h4>Game Mode</h4>

This is a quiz/game that allows users to test their knowledge of the pediatric information compiled for the skill. The questions are pulled from information used in the exploratory mode, and the game provides incentive for the user to go back and forth between modes in order to improve their understanding.

The game works by asking a series of multiple choice questions, and the user replies with the number of the answer they think is correct. The game will tell you if you answered correctly or not and at the end will give you a score out of how many questions you got right. Typically there will be 5 questions pulled randomly with 4 possible choices per question, however these can be changed.

<h3>Future Enhancements</h3>

There are a number of ways to expand and improve this skill which we have thought of throughout the development of the prototype.

<h4>The Information Datastructure</h4>

The first thing that would need to be changed is the design of the datastructure that holds the information central to the skill. As of now it is all contained in tree.js as a list of objects. Each object holds the keyword of its parent and children nodes as keys in the object. The navigation techniques work by iterating through the list until the keyword is found, then the node is retrieved. As the skill expands it would make sense to design this as an actual tree datastructure with parent nodes having a list of children objects. The navigation techniques would need to be updated to use appropriate tree-traversal algorithms to locate the requested nodes as opposed to a simple list iteration. Lastly, the tree.js file should be changed into a JSON file that can be parsed by explore.js into the desired datastructure. These changes would lay the groundwork for making future expansion of the skill into a more seamless process.

<h4>An HTML Form</h4>

With the JSON file in place holding the information tree, it should be possible to create an HTML form that would display the structure of the tree in a way that is visually apparent. Here the information tree could be edited by adding more categories, changing the content in the leaf nodes, restructuring the tree, etc. The form would then output a JSON file which could be plugged directly into the application.

As of now, the information is being entered by hand into the tree.js file with parent and children nodes being explicitly defined. An HTML form would automate this process and make entering information into the skill user-friendly enough to allow for greater oversight from subject matter experts.

Additionally, questions for the game mode could be created on this form attached to specific topic nodes. In this case the form should output two JSON files, one for the information tree and the other for the questions which would be parsed by game.js in a similar manner. If the user wanted to access the topic node in the game mode which relates to the question at hand, it could be done by adding the unique keyword of the topic node to the question object in this process.

<h4>Persistence</h4>

Adding persistence to the game mode would allow for a more personalized experience with the skill. The skill could keep track of which questions the user got wrong and keep a total score of correctly vs. incorrectly answered questions over time. It should be possible to have multiple users per household, which would allow for competition between users, encouraging further learning. This would be done by linking the Alexa skill with AWS DynamoDB.

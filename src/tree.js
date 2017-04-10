module.exports = [{
// Initial question
        "node": "beginning",
        "parent": "beginning",
        "message": "Would you like to learn about sleep, nutrition, or development?",
        "sleep": "sleep",
        "nutrition": "nutrition",
        "development": "development"
    },
// Main categories
    // Sleep
    {
        "node": "sleep",
        "parent": "beginning",
        "message": "In sleep: safety, soothing, or environment?",
        "safety": "sleep safety",
        "soothing": "sleep soothing",
        "environment": "sleep environment"
    },
    // Nutrition
    {
        "node": "nutrition",
        "parent": "beginning",
        "message": "In nutrition: food, output, or formula?",
        "food": "nutrition food",
        "output": "nutrition output",
        "formula": "nutrition formula"
    },
    // Development
    {
        "node": "development",
        "parent": "beginning",
        "message": "In development: communication or problem solving?",
        "communication": "development communication",
        "problem solving": "development problem solving"
    },

// Subcategories & descriptions
    // Sleep - safety
    {
        "node": "sleep safety",
        "parent": "sleep",
        "message": "This is header text for sleep - safety.",
        "description": "This is the fuller description text for the category sleep, subcategory safety. There will be a more in depth explanation of the subcategory here."
    },
    // Sleep - soothing
    {
        "node": "sleep soothing",
        "parent": "sleep",
        "message": "This is header text for sleep - soothing.",
        "description": "This is the fuller description text for the category sleep, subcategory soothing. There will be a more in depth explanation of the subcategory here."
    },
    // Sleep - environment
    {
        "node": "sleep environment",
        "parent": "sleep",
        "message": "This is header text for sleep - environment.",
        "description": "This is the fuller description text for the category sleep, subcategory environment. There will be a more in depth explanation of the subcategory here."
    },
    // Nutrition - food
    {
        "node": "nutrition food",
        "parent": "nutrition",
        "message": "This is header text for nutrition - food.",
        "description": "This is the fuller description for the category nutrition, subcategory food. There will be a more in depth explanation of the subcategory here."
    },
    // Nutrition - output
    {
        "node": "nutrition output",
        "parent": "nutrition",
        "message": "This is header text for nutrition - output.",
        "description": "This is the fuller description for the category nutrition, subcategory output. There will be a more in depth explanation of the subcategory here."
    },
    // Nutrition - formula
    {
        "node": "nutrition formula",
        "parent": "nutrition",
        "message": "This is header text for nutrition - formula.",
        "description": "This is the fuller description for the category nutrition, subcategory formula. There will be a more in depth explanation of the subcategory here."
    },
    // Development - communication
    {
        "node": "development communication",
        "parent": "development",
        "message": "This is the header text for development - communication.",
        "description": "This is the fuller description for the category development, subcategory communication. There will be a more in depth explanation of the subcategory here."
    },
    // Development - problem solving
    {
        "node": "development problem solving",
        "parent": "development",
        "message": "This is the header text for development - problem-solving.",
        "description": "This is the fuller description for the category development, subcategory problem-solving. There will be a more in depth explanation of the subcategory here."
    },
];

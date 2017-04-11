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
        "message": "In sleep: safety, positioning, or environment?",
        "safety": "sleep safety",
        "positioning": "sleep positioning",
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
        "message": "Thousands of babies die each year in the United States during sleep because of unsafe sleep environments. Although the cause of SIDS is unknown, there are some proven ways to reduce your baby's risk. First and foremost is make sure your baby sleeps on their back, but there are other key points to not forget.",
        "description": "Make sure your baby sleeps on a firm surface without any sort of cushion or pillow. Place your baby to sleep in the same room where you sleep but not the same bed. Breastfeed as much and for as long as you can and offer a pacifier at nap time and bedtime. All these things help reduce the risk of SIDS."
    },
    // Sleep - positioning
    {
        "node": "sleep positioning",
        "parent": "sleep",
        "message": "Healthy babies are safest when sleeping on their backs at nighttime and during naps. Side sleeping is not as safe as back sleeping and is not advised.",
        "description": "Keep soft objects, loose bedding, or any objects that could increase the risk of entrapment, suffocation, or strangulation from the baby's sleep area. Make sure the baby's head and face remain uncovered during sleep."
    },
    // Sleep - environment
    {
        "node": "sleep environment",
        "parent": "sleep",
        "message": "Buying a safe crib or bassinet is almost as important as making sure your baby sleeps the right way. Always keep in mind that babies grow fast and a cradle that’s sturdy enough for a 1-month-old may be outgrown by the next month.",
        "description": "Make sure your baby sleeps on a firm surface without any sort of cushion or pillow. Additionally, make sure the bottom of the cradle or bassinet is well supported to prevent its collapse. The cradle or bassinet should also have a wide base so it won’t tip over even if someone bumps it; if it has folding legs, make certain that they’re locked straight whenever it is being used. We suggest you place your crib well away from any windows and no less than an arm’s reach away from any nearby dressers or table-tops. Knowing that it won’t be long before anything and everything within reach will be fair game, we also recommend limiting your over-the-crib wall decorations to painted walls and wallpaper. As far as crib toys go, keep them out of the crib for the first few weeks. As you baby gets older they will enjoy playing with mirrors or toys with parts they can play with (such as spinners, rattles, and music), but make sure nothing you give them has a choking hazard."
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

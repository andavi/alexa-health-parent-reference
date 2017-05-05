module.exports = [{
        // Initial question
        "node": "beginning",
        "parent": "beginning",
        "message": "Would you like to learn about sleep, feeding, development, or hygiene?",
        "sleep": "sleep",
        "feeding": "feeding",
        "development": "development",
        "hygiene": "hygiene"
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
    // Feeding
    {
        "node": "feeding",
        "parent": "beginning",
        "message": "In feeding: food, output, or formula?",
        "food": "food",
        "output": "output",
        "formula": "formula"
    },
    // Development
    {
        "node": "development",
        "parent": "beginning",
        "message": "In development: communication, problem solving, or tummy time?",
        "communication": "communication",
        "problem solving": "problem solving",
        "tummy time": "tummy time"
    },
    // Hygiene
    {
        "node": "hygiene",
        "parent": "beginning",
        "message": "In hygiene: cradle cap, tooth decay, teething, fluoride, or dental visits?",
        "cradle cap": "cradle cap",
        "tooth decay": "tooth decay",
        "teething": "teething",
        "fluoride": "fluoride",
        "dental visits": "dental visits"
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
        "description": "Make sure your baby sleeps on a firm surface without any sort of cushion or pillow. Additionally, make sure the bottom of the cradle or bassinet is well supported to prevent its collapse. The cradle or bassinet should also have a wide base so it won’t tip over even if someone bumps it; if it has folding legs, make certain that they’re locked straight whenever it is being used."
    },
    // feeding - food
    {
        "node": "food",
        "parent": "feeding",
        "message": "This is header text for feeding - food.",
        "description": "This is the fuller description for the category feeding, subcategory food. There will be a more in depth explanation of the subcategory here."
    },
    // feeding - output
    {
        "node": "output",
        "parent": "feeding",
        "message": "This is header text for feeding - output.",
        "description": "This is the fuller description for the category feeding, subcategory output. There will be a more in depth explanation of the subcategory here."
    },
    // feeding - formula
    {
        "node": "formula",
        "parent": "feeding",
        "message": "This is header text for feeding - formula.",
        "description": "This is the fuller description for the category feeding, subcategory formula. There will be a more in depth explanation of the subcategory here."
    },
    // Development - communication
    {
        "node": "communication",
        "parent": "development",
        "message": "This is the header text for development - communication.",
        "description": "This is the fuller description for the category development, subcategory communication. There will be a more in depth explanation of the subcategory here."
    },
    // Development - problem solving
    {
        "node": "problem solving",
        "parent": "development",
        "message": "This is the header text for development - problem-solving.",
        "description": "This is the fuller description for the category development, subcategory problem-solving. There will be a more in depth explanation of the subcategory here."
    },
    // Development - tummy time
    {
        "node": "tummy time",
        "parent": "development",
        "message": "Tummy time is for babies who are awake and being watched. Your baby needs this to develop strong muscles",
        "description": "Beginning on his first day home from the hospital or in your family child care home or center, play and interact with the baby while he is awake and on the tummy 2 to 3 times each day for a short period of time (3-5 minutes), increasing the amount of time as the baby shows he enjoys the activity. A great time to do this is following a diaper change or when the baby wakes up from a nap."
    },
    // Hygiene - cradle cap
    {
        "node": "cradle cap",
        "parent": "hygiene",
        "message": "Cradle cap refers to when your baby scaliness or redness on his or her scalp. No one knows for sure the exact cause of this rash but there are ways to treat it.",
        "description": "Don't be afraid to shampoo the hair; in fact, you should wash it more frequently than before. Some parents have found using petroleum jelly or ointments beneficial. But baby oil is not very helpful or necessary. Your doctor also might prescribe a cortisone cream or lotion."
    },
    // Hygiene - tooth decay
    {
        "node": "tooth decay",
        "parent": "hygiene",
        "message": "Tooth decay is the most common chronic infectious disease of childhood. The most common way this happens is when parents put their children to bed with a bottle of formula, milk, juice, soft drinks, sugar water, or sugar drinks. It can also occur when children are allowed to frequently drink anything other than water from a sippy cup or bottle during the day or night.",
        "description": "Here are a couple tips to remember to prevent tooth decay. Never put your child to bed with a bottle or food. Do not use a bottle or sippy cup as a pacifier or let your child walk around with or drink from one for long periods. Limit the amount of sweet of sticky foods your child eats and Serve juice only during meals or not at all."
    },
    // Hygiene - teething
    {
        "node": "teething",
        "parent": "hygiene",
        "message": "Teething usually begins between 4 and 7 months, but don’t worry if it happens later for your baby. Teething occasionally may cause mild irritability, crying, a low-grade temperature, excessive drooling, and a desire to chew on something hard.",
        "description": "More often, the gums around the new teeth will swell and be tender. Try gently rubbing or massaging the gums with one of your fingers. Teething rings are helpful, too, but they should be made of firm rubber. If your child seems particularly miserable or has a fever higher than 101 degrees Fahrenheit, it’s probably not because she’s teething, and you should consult your pediatrician."
    },
    // Hygiene - fluoride
    {
        "node": "fluoride",
        "parent": "hygiene",
        "message": "Fluoride should be added to your baby’s diet at six months of age. The good news is that fluoride is often added to tap water. Give your baby a few ounces of water in a sippy or straw cup when you begin him or her on solid foods.",
        "description": "Once your child has a tooth, you should be brushing them twice a day with a smear of fluoride toothpaste the size of a grain of rice, especially after the last drink or food of the day. Remember not to put your baby to bed with a bottle—it can lead to tooth decay."
    },
    // Hygiene - dental visits
    {
        "node": "dental visits",
        "parent": "hygiene",
        "message": "Try to make your baby's first dental appointment after the eruption of the first tooth and by his or her first birthday. Both the AAP and the AAPD recommend that all children see a pediatric dentist and establish a 'dental home' by age one.",
        "description": "A pediatric dentist will make sure all teeth are developing normally and that there are no dental problems. He or she will also give you further advice on proper hygiene. If you don't have a pediatric dentist in your community, find a general dentist who is comfortable seeing young children."
    }
];

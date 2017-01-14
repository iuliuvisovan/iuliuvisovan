$(document).ready(() => {
    var randomNumber = new Date() % 30;
    var todaysName = names[randomNumber].name;
    var todaysDescription = names[randomNumber].description;

    var name = $(".daily-name");
    var description = $(".daily-description");
    name.text(todaysName);
    description.text("because " + todaysDescription);
});

var names = [
    {
        name: "my doll",
        description: "you are as perfect as a doll in my eyes."
    },
    {
        name: "my queen",
        description: "you're the queen of my heart."
    },
    {
        name: "my Juliet",
        description: "you're the heroine of my tale."
    },
    {
        name: "daisy",
        description: "you're delicate like a flower."
    },
    {
        name: "my happiness",
        description: "you're the reason I am happy."
    },
    {
        name: "my kitten",
        description: "you're as adorable as a kitten."
    },
    {
        name: "my angel",
        description: "you're my guardian angel."
    },
    {
        name: "magic",
        description: "you make my life magical."
    },
    {
        name: "mrs. Pink",
        description: "you're as girly as you can get."
    },
    {
        name: "my donut",
        description: "you're sweet and round, just like a donut. :DD"
    },
    {
        name: "cuddles",
        description: "I love to cuddle with you."
    },
    {
        name: "summer",
        description: "you bring warmth and brightness to my life."
    },
    {
        name: "gorgeous",
        description: "well..it's kind of obvious."
    },
    {
        name: "honey",
        description: "you're sweet as honey."
    },
    {
        name: "Cinderella",
        description: "you're a princess in my eyes."
    },
    {
        name: "pretty lady",
        description: "you're gentle and delicate."
    },
    {
        name: "sunshine",
        description: "you light up my day!"
    },
    {
        name: "sweetheart",
        description: "you're sweet and sincere."
    },
    {
        name: "precious",
        description: "you're too valuable to lose."
    },
    {
        name: "cookie",
        description: "you're sweet and delicious like a cookie."
    },
    {
        name: "my all",
        description: "you mean all to me."
    },
    {
        name: "cutie pie",
        description: "I find you cute and sweet."
    },
    {
        name: "my dreamgirl",
        description: "you're the girl of my dreams."
    },
    {
        name: "cupcake",
        description: "you're sweet and yummy."
    },
    {
        name: "my spring",
        description: "you add color to my life."
    },
    {
        name: "lemon",
        description: "you bring something new and exciting to my life."
    },
    {
        name: "my rose",
        description: "you're beautiful and precious as a rose."
    },
    {
        name: "my joy",
        description: "you bring me joy."
    },
    {
        name: "sprinkles",
        description: "you're colorful, fun and happy."
    },
    {
        name: "my cherry",
        description: "you complete my life."
    },
    {
        name: "peach",
        description: "I'd eat you out like a peach."
    },
]
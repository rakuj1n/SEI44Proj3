require('dotenv').config()
require('./config/database')

const User = require('./models/api/user')
const Movie = require('./models/api/movie')
const Account = require('./models/api/account')

const userArr = [
    {
        name: "userA",
        email: "userA@gmail.com",
        password: "$2b$06$xxE/AkQ.Q7L49wq7bxZrFOJLzz4HLrWCCHN9r5bKWJRB1/CMOPUDu", //userA1234
        picture: "https://picsum.photos/200",
    },
    {
        name: "userB",
        email: "userB@gmail.com",
        password: "$2b$06$5jEe2ShepEgPWLOTJgftj..Z0W9Rl9ELzCUCK5yvtvqDi1IqPSXD2", //userB1234
        picture: "https://picsum.photos/200",
    },
    {
        name: "hello",
        email: "hello@gmail.com",
        password: "$2b$06$5jEe2ShepEgPWLOTJgftj..Z0W9Rl9ELzCUCK5yvtvqDi1IqPSXD2", //userB1234 
        picture: "https://picsum.photos/200",
    },
    {
        name: "goodbye",
        email: "goodbye@gmail.com",
        password: "$2b$06$5jEe2ShepEgPWLOTJgftj..Z0W9Rl9ELzCUCK5yvtvqDi1IqPSXD2", //userB1234
        picture: "https://picsum.photos/200",
    }
]

const actor2 = ['Anthony Ramos','Dominique Fishback','Peter Cullen']

const movieArr = [
    {
        title: 'Star Wars: Episode IV – A New Hope',
        actor: ['Mark Hamill','Harrison Ford','Carrie Fisher'], 
        details:"It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
        director:'George Lucas',
        nowShowing:false,
        comments:[],
        genre:['Adventure', 'Action', 'Science Fiction']
    },  
    {
        title:'Transformers: Rise of the Beasts',
        actor: ['Anthony Ramos','Dominique Fishback','Peter Cullen'],
        details:'When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.',
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
        director:'Steven Caple Jr.',
        nowShowing:true,
        comments:[],
        genre:['Adventure', 'Action', 'Sci-Fi']
    },
    {
        title:'The Witcher',
        actor: ['Henry Cavill','Anya Chalotra','Freya Allan'],
        details:'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
        director:'Lauren Schmidt Hissrich',
        nowShowing:false,
        comments:[],
        genre: ['Drama', 'Action', 'Adventure', 'Sci-Fi', 'Fantasy']
    },
    {
        title:'Warrior',
        actor: ['Andrew Koji','Olivia Cheng','Jason Tobin'],
        details:'A gritty, action-packed crime drama set during the brutal Tong Wars of San Francisco’s Chinatown in the second half of the 19th century. The series follows Ah Sahm, a martial arts prodigy who immigrates from China to San Francisco under mysterious circumstances, and becomes a hatchet man for one of Chinatown’s most powerful tongs.',
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hR9qPFMI6BoR63XK6BBX5Ueghan.jpg',
        director:'Jonathan Tropper',
        nowShowing:false,
        comments:[],
        genre:['Crime', 'Drama', 'Action', 'Adventure']
    },
    {
      title: "Indiana Jones",
      actor: ["Philip Kaufman", "George Lucas"],
      details:
        "Finding himself in a new era, approaching retirement, Indy wrestles with fitting into a world that seems to have outgrown him. But as the tentacles of an all-too-familiar evil return in the form of an old rival, Indy must don his hat and pick up his whip once more to make sure an ancient and powerful artifact doesn’t fall into the wrong hands.",
      poster:
        "https://www.themoviedb.org/t/p/w1280/Af4bXE63pVsb2FtbW8uYIyPBadD.jpg",
      director: "James Mangold",
      nowShowing: false,
      comments: [],
      genre: ['Adventure', 'Action', 'Fantasy']
    },
    {
      title: "The Ghost Station",
      actor: ["Kim Bo-Ra", "Kim Jae-Hyun", "Shin So-yul"],
      details:
        "Reporter Na-yeong and her partner investigate a series of mysterious deaths and a perplexing case where her source was allegedly already dead at the time of their interview. Together they end up confronting a terrifying truth.",
      poster:
        "https://www.themoviedb.org/t/p/w1280/orL3v5KKRqFhwJYGkrZ3jmKEAgy.jpg",
      director: "Jeong Yong-ki",
      nowShowing: true,
      comments: [],
      genre: 'Horror'
    },
    {
        title: "Ready Player One",
        actor: ["Tye Sheridan", "Olivia Cooke", "Ben Mendelsohn"],
        details:
          "When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pU1ULUq8D3iRxl1fdX2lZIzdHuI.jpg",
        director: "Steven Spielberg",
        nowShowing: false,
        comments: [],
        genre: ['Sci-Fi', 'Adventure', 'Action']
      },
      {
        title: "Elemental",
        actor: ["Leah Lewis", "Mamoudou Athie", "Ronnie del Carmen"],
        details:
          "In a city where fire, water, land and air residents live together, a fiery young woman and a go-with-the-flow guy will discover something elemental: how much they have in common.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
        director: "Peter Sohn",
        nowShowing: true,
        comments: [],
        genre: ['Animation', 'Comedy', 'Family', 'Fantasy', 'Romance']
      },
      {
        title: "Insidious: The Red Door",
        actor: ["Ty Simpkins", "Patrick Wilson", "Rose Byrne"],
        details:
          "To put their demons to rest once and for all, Josh Lambert and a college-aged Dalton Lambert must go deeper into The Further than ever before, facing their family's dark past and a host of new and more horrifying terrors that lurk behind the red door.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/azTC5osYiqei1ofw6Z3GmUrxQbi.jpg",
        director: "Peter Sohn",
        nowShowing: true,
        comments: [],
        genre: ['Horror', 'Mystery', 'Thriller']
      },
      {
        title: "Carl's Date",
        actor: ["Ed Asner", "Bob Peterson"],
        details:
          "Carl Fredricksen reluctantly agrees to go on a date with a lady friend—but admittedly has no idea how dating works these days. Ever the helpful friend, Dug steps in to calm Carl's pre-date jitters and offer some tried-and-true tips for making friends—if you're a dog.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wakoF2UgsEE3fGs5KpuwMWsaNr2.jpg",
        director: "Bob Peterson",
        nowShowing: true,
        comments: [],
        genre: ['Animation', 'Adventure', 'Family']
      },
      {
        title: "The Godfather",
        actor: ["Marlon Brando", "Al Pacino","James Caan"],
        details:
          "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
        director: "Francis Ford Coppola",
        nowShowing: false,
        comments: [],
        genre: ['Drama', 'Crime']
      },
      {
        title: "The Dark Knight",
        actor: ["Christian Bale", "Heath Ledger","Michael Caine"],
        details:
          "Batman raises the stakes in his war on crime. With the help of Lt. Jim Gordon and District Attorney Harvey Dent, Batman sets out to dismantle the remaining criminal organizations that plague the streets. The partnership proves to be effective, but they soon find themselves prey to a reign of chaos unleashed by a rising criminal mastermind known to the terrified citizens of Gotham as the Joker.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
        director: "Christopher Nolan",
        nowShowing: false,
        comments: [],
        genre: ['Drama', 'Action', 'Crime', 'Thriller']
      },
      {
        title: "The Lord of the Rings: The Return of the King",
        actor: ["Elijah Wood", "Sean Astin","Ian McKellen"],
        details:
          "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
        director: "Peter Jackson",
        nowShowing: false,
        comments: [],
        genre: ['Adventure', 'Fantasy', 'Action']
      },
      {
        title: "Fight Club",
        actor: ["Edward Norton", "Brad Pitt","Helena Bonham Carter"],
        details:
          "A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground 'fight clubs' forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
        director: "David Fincher",
        nowShowing: false,
        comments: [],
        genre: ['Drama', 'Thriller', 'Comedy']
      },
      {
        title: "Avengers: Endgame",
        actor: ["Robert Downey Jr.", "Chris Evans","Mark Ruffalo"],
        details:
          "After the devastating events of Avengers: Infinity War, the universe is in ruins due to the efforts of the Mad Titan, Thanos. With the help of remaining allies, the Avengers must assemble once more in order to undo Thanos' actions and restore order to the universe once and for all, no matter what consequences may be in store.",
        poster:
          "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        director: "Anthony Russo",
        nowShowing: false,
        comments: [],
        genre: ['Adventure', 'Sci-Fi', 'Action']
      }
]

async function initialSeed() {
    try {
        await Account.deleteMany({})
        await User.deleteMany({})
        await Movie.deleteMany({})

        // await User.insertMany(userArr)
        await Movie.insertMany(movieArr)

        // const user1 = await User.findOne({name:"userA"})
        // const user2 = await User.findOne({name:"userB"})
        // const user3 = await User.findOne({name:"hello"})
        // const user4 = await User.findOne({name:"goodbye"})
        // const acc1 = await Account.create({user: user1._id})
        // const acc2 = await Account.create({user: user2._id})
        // const acc3 = await Account.create({user: user3._id})
        // const acc4 = await Account.create({user: user4._id})

        // const comment1 = {
        //     userId: user2._id,
        //     comment: 'Awesome movie!'
        // }
        // const comment2 = {
        //     userId: user1._id,
        //     comment: 'very cool.'
        // }
        // const comment5 = {
        //     userId: user3._id,
        //     comment: 'uhhhhhhh.'
        // }
        // const comment4 = {
        //     userId: user4._id,
        //     comment: 'WOW NOWAYing.'
        // }

        // const movie1 = await Movie.findOne({title:"Star Wars: Episode IV – A New Hope"})

        // movie1.comments.push(comment1)
        // movie1.comments.push(comment2)
        // movie1.comments.push(comment5)
        // movie1.comments.push(comment4)

        // await movie1.save()
        
        // const movie2 = await Movie.findOne({title:"Transformers: Rise of the Beasts"})
        // const comment3 = {
        //     userId: user2._id,
        //     comment: 'KEKW, so bad!'
        // }
        // const comment6 = {
        //     userId: user4._id,
        //     comment: 'Its fine.'
        // }
        // const comment7 = {
        //     userId: user3._id,
        //     comment: 'Idk about this one lul.'
        // }
        // for (let i of actor2) {
        //     movie2.actor.push(i)
        // }
        // movie2.comments.push(comment3)
        // movie2.comments.push(comment6)
        // movie2.comments.push(comment7)
        // await movie2.save()
     
        // const movie3 = await Movie.findOne({title:"The Witcher"})
        // const movie4 = await Movie.findOne({title:"Warrior"})

        // acc1.following.push(user2._id)
        // acc1.following.push(user3._id)
        // acc1.following.push(user4._id)
        // acc1.moviesRecommended.push(movie1._id)
        // acc1.watchHistory.push(movie1._id)
        // acc1.rentedMovies.push(movie1._id)
        // acc1.moviesRecommended.push(movie4._id)
        // acc1.watchHistory.push(movie4._id)
        // acc1.rentedMovies.push(movie4._id)
        // await acc1.save()

        // acc4.following.push(user3._id)
        // acc4.following.push(user4._id)
        // acc4.moviesRecommended.push(movie4._id)
        // acc4.watchHistory.push(movie1._id)
        // acc4.rentedMovies.push(movie1._id)
        // await acc4.save()

        // acc3.following.push(user1._id)
        // acc3.following.push(user2._id)
        // acc3.following.push(user4._id)

        // acc3.moviesRecommended.push(movie4._id)
        // acc3.moviesRecommended.push(movie3._id)
        // acc3.moviesRecommended.push(movie2._id)
        // acc3.watchHistory.push(movie1._id)
        // acc3.rentedMovies.push(movie1._id)
        // await acc3.save()


        // const comment10 = {
        //     userId: user3._id,
        //     comment: 'No.'
        // }
        // const comment11 = {
        //     userId: user1._id,
        //     comment: 'Yes!'
        // }
        // movie4.comments.push(comment10)
        // movie4.comments.push(comment11)
        // await movie4.save()

    } catch (err) {
        console.log('error')
    }
}


initialSeed()
require('dotenv').config()
require('./config/database')

const User = require('./models/api/user')
const Movie = require('./models/api/movie')
const user = require('./models/api/user')

const userArr = [
    {
        name: "userA",
        email: "userA@gmail.com",
        password: "$2b$06$xxE/AkQ.Q7L49wq7bxZrFOJLzz4HLrWCCHN9r5bKWJRB1/CMOPUDu", //userA1234
        picture: "https://picsum.photos/200",
        following: [],
        moviesRecommended: [],
        watchHistory: [],
        rentedMovies: []
    },
    {
        name: "userB",
        email: "userB@gmail.com",
        password: "$2b$06$5jEe2ShepEgPWLOTJgftj..Z0W9Rl9ELzCUCK5yvtvqDi1IqPSXD2", //userB1234
        picture: "https://picsum.photos/200",
        following: [],
        moviesRecommended: [],
        watchHistory: [],
        rentedMovies: []
    }
]

const actor2 = ['Anthony Ramos','Dominique Fishback','Peter Cullen']

const movieArr = [
    {
        title: 'A New Hope',
        actor: ['Mark Hamill','Harrison Ford','Carrie Fisher'], 
        details:"It is a period of civil war. Rebel spaceships, striking from a hidden base, have won their first victory against the evil Galactic Empire. During the battle, Rebel spies managed to steal secret plans to the Empire's ultimate weapon, the DEATH STAR, an armored space station with enough power to destroy an entire planet. Pursued by the Empire's sinister agents, Princess Leia races home aboard her starship, custodian of the stolen plans that can save her people and restore freedom to the galaxy....",
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6FfCtAuVAW8XJjZ7eWeLibRLWTw.jpg',
        director:'George Lucas',
        nowShowing:false,
        comments:[]
    },  
    {
        title:'Transformers: Rise of the Beasts',
        actor: [],
        details:'When a new threat capable of destroying the entire planet emerges, Optimus Prime and the Autobots must team up with a powerful faction known as the Maximals. With the fate of humanity hanging in the balance, humans Noah and Elena will do whatever it takes to help the Transformers as they engage in the ultimate battle to save Earth.',
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gPbM0MK8CP8A174rmUwGsADNYKD.jpg',
        director:'Steven Caple Jr.',
        nowShowing:true,
        comments:[]
    }
]

async function initialSeed() {
    try {
        await User.deleteMany({})
        await Movie.deleteMany({})
        await User.insertMany(userArr)
        await Movie.insertMany(movieArr)

        const user1 = await User.findOne({name:"userA"})
        const user2 = await User.findOne({name:"userB"})
        const comment1 = {
            userId: user2._id,
            comment: 'Awesome movie!'
        }
        const comment2 = {
            userId: user1._id,
            comment: 'very cool.'
        }
        const movie1 = await Movie.findOne({title:"A New Hope"})
        movie1.comments.push(comment1)
        movie1.comments.push(comment2)
        await movie1.save()
        
        const movie2 = await Movie.findOne({title:"Transformers: Rise of the Beasts"})
        const comment3 = {
            userId: user2._id,
            comment: 'KEKW, so bad!'
        }
        for (let i of actor2) {
            movie2.actor.push(i)
        }
        movie2.comments.push(comment3)
        await movie2.save()
      
        user1.following.push(user2._id)
        user1.moviesRecommended.push(movie1._id)
        user1.watchHistory.push(movie1._id)
        user1.rentedMovies.push(movie1._id)
        await user1.save()

    } catch (err) {
        console.log('error')
    }
}


initialSeed()
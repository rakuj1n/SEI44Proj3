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
    },
    {
        title:'The Witcher',
        actor: ['Henry Cavill','Anya Chalotra','Freya Allan'],
        details:'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.',
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/cZ0d3rtvXPVvuiX22sP79K3Hmjz.jpg',
        director:'Lauren Schmidt Hissrich',
        nowShowing:false,
        comments:[]
    },
    {
        title:'Warrior',
        actor: ['Andrew Koji','Olivia Cheng','Jason Tobin'],
        details:'A gritty, action-packed crime drama set during the brutal Tong Wars of San Francisco’s Chinatown in the second half of the 19th century. The series follows Ah Sahm, a martial arts prodigy who immigrates from China to San Francisco under mysterious circumstances, and becomes a hatchet man for one of Chinatown’s most powerful tongs.',
        poster:'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hR9qPFMI6BoR63XK6BBX5Ueghan.jpg',
        director:'Jonathan Tropper',
        nowShowing:false,
        comments:[]
    }
]

async function initialSeed() {
    try {
        await Account.deleteMany({})
        await User.deleteMany({})
        await Movie.deleteMany({})

        await User.insertMany(userArr)
        await Movie.insertMany(movieArr)

        const user1 = await User.findOne({name:"userA"})
        const user2 = await User.findOne({name:"userB"})
        const user3 = await User.findOne({name:"hello"})
        const user4 = await User.findOne({name:"goodbye"})
        const acc1 = await Account.create({user: user1._id})
        const acc2 = await Account.create({user: user2._id})
        const acc3 = await Account.create({user: user3._id})
        const acc4 = await Account.create({user: user4._id})

        const comment1 = {
            userId: user2._id,
            comment: 'Awesome movie!'
        }
        const comment2 = {
            userId: user1._id,
            comment: 'very cool.'
        }
        const comment5 = {
            userId: user3._id,
            comment: 'uhhhhhhh.'
        }
        const comment4 = {
            userId: user4._id,
            comment: 'WOW NOWAYing.'
        }

        const movie1 = await Movie.findOne({title:"Star Wars: Episode IV – A New Hope"})

        movie1.comments.push(comment1)
        movie1.comments.push(comment2)
        movie1.comments.push(comment5)
        movie1.comments.push(comment4)

        await movie1.save()
        
        const movie2 = await Movie.findOne({title:"Transformers: Rise of the Beasts"})
        const comment3 = {
            userId: user2._id,
            comment: 'KEKW, so bad!'
        }
        const comment6 = {
            userId: user4._id,
            comment: 'Its fine.'
        }
        const comment7 = {
            userId: user3._id,
            comment: 'Idk about this one lul.'
        }
        for (let i of actor2) {
            movie2.actor.push(i)
        }
        movie2.comments.push(comment3)
        movie2.comments.push(comment6)
        movie2.comments.push(comment7)
        await movie2.save()
     
        const movie3 = await Movie.findOne({title:"The Witcher"})
        const movie4 = await Movie.findOne({title:"Warrior"})

        acc1.following.push(user2._id)
        acc1.following.push(user3._id)
        acc1.following.push(user4._id)
        acc1.moviesRecommended.push(movie1._id)
        acc1.watchHistory.push(movie1._id)
        acc1.rentedMovies.push(movie1._id)
        acc1.moviesRecommended.push(movie4._id)
        acc1.watchHistory.push(movie4._id)
        acc1.rentedMovies.push(movie4._id)
        await acc1.save()

        acc4.following.push(user3._id)
        acc4.following.push(user4._id)
        acc4.moviesRecommended.push(movie4._id)
        acc4.watchHistory.push(movie1._id)
        acc4.rentedMovies.push(movie1._id)
        await acc4.save()

        acc3.following.push(user1._id)
        acc3.following.push(user2._id)
        acc3.following.push(user4._id)

        acc3.moviesRecommended.push(movie4._id)
        acc3.moviesRecommended.push(movie3._id)
        acc3.moviesRecommended.push(movie2._id)
        acc3.watchHistory.push(movie1._id)
        acc3.rentedMovies.push(movie1._id)
        await acc3.save()


        const comment10 = {
            userId: user3._id,
            comment: 'No.'
        }
        const comment11 = {
            userId: user1._id,
            comment: 'Yes!'
        }
        movie4.comments.push(comment10)
        movie4.comments.push(comment11)
        await movie4.save()

    } catch (err) {
        console.log('error')
    }
}


initialSeed()
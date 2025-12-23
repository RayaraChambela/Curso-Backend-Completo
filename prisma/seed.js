import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const userId = "b7f0fabb-38db-431f-9558-89235c7d4396";

const movies = [
  {
    title: "The Matrix",
    overview: "A computer hacker learns about the true nature of reality.",
    releaseYear: 1999,
    genres: ["Action", "Sci-Fi"],
    runtime: 136,
    posterUrl: "https://example.com/matrix.jpg",
    createdBy: userId,
  },
  {
    title: "Inception",
    overview: "A thief who steals corporate secrets through dream-sharing technology.",
    releaseYear: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    runtime: 148,
    posterUrl: "https://example.com/inception.jpg",
    createdBy: userId,
  },
  {
    title: "Interstellar",
    overview: "A team travels through a wormhole in space to ensure humanity’s survival.",
    releaseYear: 2014,
    genres: ["Adventure", "Drama", "Sci-Fi"],
    runtime: 169,
    posterUrl: "https://example.com/interstellar.jpg",
    createdBy: userId,
  },
  {
    title: "The Dark Knight",
    overview: "Batman faces the Joker, a criminal mastermind spreading chaos in Gotham.",
    releaseYear: 2008,
    genres: ["Action", "Crime", "Drama"],
    runtime: 152,
    posterUrl: "https://example.com/dark-knight.jpg",
    createdBy: userId,
  },
  {
    title: "Fight Club",
    overview: "An office worker forms an underground fight club that spirals out of control.",
    releaseYear: 1999,
    genres: ["Drama", "Thriller"],
    runtime: 139,
    posterUrl: "https://example.com/fight-club.jpg",
    createdBy: userId,
  },
  {
    title: "Pulp Fiction",
    overview: "The lives of criminals intertwine in a series of violent stories.",
    releaseYear: 1994,
    genres: ["Crime", "Drama"],
    runtime: 154,
    posterUrl: "https://example.com/pulp-fiction.jpg",
    createdBy: userId,
  },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    overview: "A hobbit begins a journey to destroy a powerful ring.",
    releaseYear: 2001,
    genres: ["Adventure", "Fantasy"],
    runtime: 178,
    posterUrl: "https://example.com/lotr-fellowship.jpg",
    createdBy: userId,
  },
  {
    title: "The Godfather",
    overview: "The aging patriarch of an organized crime dynasty transfers control to his son.",
    releaseYear: 1972,
    genres: ["Crime", "Drama"],
    runtime: 175,
    posterUrl: "https://example.com/godfather.jpg",
    createdBy: userId,
  },
  {
    title: "Forrest Gump",
    overview: "The story of a man with a low IQ who lives an extraordinary life.",
    releaseYear: 1994,
    genres: ["Drama", "Romance"],
    runtime: 142,
    posterUrl: "https://example.com/forrest-gump.jpg",
    createdBy: userId,
  },
  {
    title: "Gladiator",
    overview: "A former Roman general seeks revenge against the corrupt emperor.",
    releaseYear: 2000,
    genres: ["Action", "Drama"],
    runtime: 155,
    posterUrl: "https://example.com/gladiator.jpg",
    createdBy: userId,
  },
];

const main = async () => {
    console.log("Seeding movies...");
    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
        console.log(`Created movie: ${movie.title}`);
    }
    console.log("Seeding completed.");
};

main()
.catch(err => {
    console.error(err);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
using BAS.AppCommon;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BAS.Database
{
    public static class MovieSeeder
    {
        public static void Seed(MovieDbContext db)
        {
            db.Database.Migrate();

            List<Movie> movies = new List<Movie>
            {
                new Movie()
                {   
                    Title = "Pulp Fiction", 
                    AverageRating = 0.0,
                    Description = "Przemoc i odkupienie w opowieści o dwóch płatnych mordercach pracujących na zlecenie mafii, żonie gangstera, bokserze i parze okradającej ludzi w restauracji.",
                    MovieLengthInMinutes = 154,
                    Poster = "Movie_1.jpg",
                    ReleaseYear = 1994
                },
                new Movie()
                {   
                    Title = "Władca Pierścieni: Drużyna Pierścienia", 
                    AverageRating = 0.0,
                    Description = "Podróż hobbita z Shire i jego ośmiu towarzyszy, której celem jest zniszczenie potężnego pierścienia pożądanego przez Czarnego Władcę - Saurona.",
                    MovieLengthInMinutes = 178,
                    Poster = "Movie_2.jpg",
                    ReleaseYear = 2001
                },
                new Movie()
                {   
                    Title = "Władca Pierścieni: Dwie Wieże", 
                    AverageRating = 0.0,
                    Description = "Drużyna Pierścienia zostaje rozbita, lecz zdesperowany Frodo za wszelką cenę chce wypełnić powierzone mu zadanie. Aragorn z towarzyszami przygotowuje się, by odeprzeć atak hord Sarumana.",
                    MovieLengthInMinutes = 179,
                    Poster = "Movie_3.jpg",
                    ReleaseYear = 2002
                },
                new Movie()
                {   
                    Title = "Władca Pierścieni: Powrót Króla", 
                    AverageRating = 0.0,
                    Description = "Aragorn jednoczy siły Śródziemia, szykując się do bitwy, która ma odwrócić uwagę Saurona od podążających w kierunku Góry Przeznaczenia hobbitów.",
                    MovieLengthInMinutes = 201,
                    Poster = "Movie_4.jpeg",
                    ReleaseYear = 2003
                },
                new Movie()
                {   
                    Title = "Kac Vegas", 
                    AverageRating = 0.0,
                    Description = "Czterech przyjaciół spędza wieczór kawalerski w Las Vegas. Następnego dnia okazuje się, że zgubili pana młodego i nic nie pamiętają.",
                    MovieLengthInMinutes = 100,
                    Poster = "Movie_5.jpg",
                    ReleaseYear = 2009
                },
                new Movie()
                {   
                    Title = "Joker", 
                    AverageRating = 0.0,
                    Description = "Strudzony życiem komik popada w obłęd i staje się psychopatycznym mordercą.",
                    MovieLengthInMinutes = 122,
                    Poster = "Movie_6.jpg",
                    ReleaseYear = 2019
                },
                new Movie()
                {
                    Title = "Matrix", 
                    AverageRating = 0.0,
                    Description = "Haker komputerowy Neo dowiaduje się od tajemniczych rebeliantów, że świat, w którym żyje, jest tylko obrazem przesyłanym do jego mózgu przez roboty.",
                    MovieLengthInMinutes = 136,
                    Poster = "Movie_7.jpg",
                    ReleaseYear = 1999
                },
                new Movie()
                {   
                    Title = "Czas Apokalipsy", 
                    AverageRating = 0.0,
                    Description = "Adaptacja opowiadania Josepha Conrada 'Jądro ciemności'. Przeniesiona w realia wojny wietnamskiej historia kapitana Willarda, który otrzymuje misję odnalezienia i zlikwidowania pułkownika Kurtza.",
                    MovieLengthInMinutes = 147,
                    Poster = "Movie_8.jpg",
                    ReleaseYear = 1979
                },
                new Movie()
                {   
                    Title = "Shrek", 
                    AverageRating = 0.0,
                    Description = "By odzyskać swój dom, brzydki ogr z gadatliwym osłem wyruszają uwolnić piękną księżniczkę.",
                    MovieLengthInMinutes = 90,
                    Poster = "Movie_9.jpg",
                    ReleaseYear = 2001
                },
                new Movie()
                {   
                    Title = "Shrek 2", 
                    AverageRating = 0.0,
                    Description = "Shrek i Fiona postanawiają odwiedzić rodziców księżniczki, którzy nie wiedzą jednak, że poślubiła ona ogra, a sama zmieniła się w ogrzycę.",
                    MovieLengthInMinutes = 92,
                    Poster = "Movie_10.jpg",
                    ReleaseYear = 2004
                },
                new Movie()
                {   
                    Title = "Seven", 
                    AverageRating = 0.0,
                    Description = "Dwóch policjantów stara się złapać seryjnego mordercę wybierającego swoje ofiary według specjalnego klucza - siedmiu grzechów głównych.",
                    MovieLengthInMinutes = 127,
                    Poster = "Movie_11.jpg",
                    ReleaseYear = 1995
                }
            };

            List<Personnel> actors = new List<Personnel>
            {
                new Personnel()
                {
                    DateOfBirth = new DateTime(1948, 12, 21),
                    Name = "Samuel L.",
                    Surname = "Jackson",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1954, 2, 18),
                    Name = "John",
                    Surname = "Travolta",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1970, 4, 29),
                    Name = "Uma",
                    Surname = "Thurman",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1958, 10, 20),
                    Name = "Viggo",
                    Surname = "Mortensen",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1981, 1, 28),
                    Name = "Elijah",
                    Surname = "Wood",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1939, 5, 25),
                    Name = "Ian",
                    Surname = "McKellen",
                    Nationality = "Anglia"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1922, 5, 27),
                    Name = "Christopher",
                    Surname = "Lee",
                    Nationality = "Anglia"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1959, 4, 17),
                    Name = "Sean",
                    Surname = "Bean",
                    Nationality = "Anglia"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1960, 4, 4),
                    Name = "Hugo",
                    Surname = "Weaving",
                    Nationality = "Australia"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1975, 1, 5),
                    Name = "Bradley",
                    Surname = "Cooper",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1969, 10, 1),
                    Name = "Zach",
                    Surname = "Galifianakis",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1974, 10, 28),
                    Name = "Joaquin",
                    Surname = "Phoenix",
                    Nationality = "Portoryko"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1943, 8, 17),
                    Name = "Robert",
                    Surname = "De Niro",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1967, 8, 21),
                    Name = "Carie-Anne",
                    Surname = "Moss",
                    Nationality = "Kanada"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1964, 7, 2),
                    Name = "Keanu",
                    Surname = "Reeves",
                    Nationality = "Kanada"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1961, 7, 30),
                    Name = "Laurence",
                    Surname = "Fishburne",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1940, 8, 3),
                    Name = "Martin",
                    Surname = "Sheen",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1924, 4, 3),
                    Name = "Marlon",
                    Surname = "Brando",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1963, 5, 25),
                    Name = "Mike",
                    Surname = "Myers",
                    Nationality = "Kanada"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1961, 4, 3),
                    Name = "Eddie",
                    Surname = "Murphy",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1972, 8, 30),
                    Name = "Cameron",
                    Surname = "Diaz",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1963, 12, 18),
                    Name = "Brad",
                    Surname = "Pitt",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1937, 6, 1),
                    Name = "Morgan",
                    Surname = "Freeman",
                    Nationality = "USA"
                },

                //rezyserzy, scenarzysci
                new Personnel()
                {
                    DateOfBirth = new DateTime(1963, 3, 27),
                    Name = "Quentin",
                    Surname = "Tarantino",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1961, 10, 31),
                    Name = "Peter",
                    Surname = "Jackson",
                    Nationality = "Nowa Zelandia"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1970, 12, 20),
                    Name = "Todd",
                    Surname = "Phillips",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1967, 12, 29),
                    Name = "Andy",
                    Surname = "Wachowski",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1965, 6, 21),
                    Name = "Larry",
                    Surname = "Wachowski",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1939, 4, 7),
                    Name = "Francis Ford",
                    Surname = "Copolla",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1966, 12, 1),
                    Name = "Andrew",
                    Surname = "Adamson",
                    Nationality = "Nowa Zelandia"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1959, 8, 1),
                    Name = "Joe",
                    Surname = "Stillman",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1962, 8, 28),
                    Name = "David",
                    Surname = "Fincher",
                    Nationality = "USA"
                },
                new Personnel()
                {
                    DateOfBirth = new DateTime(1964, 8, 14),
                    Name = "Andrew Kevin",
                    Surname = "Walker",
                    Nationality = "USA"
                },
            };

            List<Genre> genres = new List<Genre>
            {
                new Genre()
                {
                    Description = "Świat gangów, narkotyków i konfliktów kryminalnego półświatka",
                    Name = "Gangsterski"
                },
                new Genre()
                {
                    Description = "Wydarzenia wokół jakiegoś problemu, konfliktu poruszające emocje",
                    Name = "Dramat"
                },
                new Genre()
                {
                    Description = "Dramaturgiczna i wielowątkowa fabuła przedstawiająca zaskakujące wydarzenia",
                    Name = "Sensacyjny"
                },
                new Genre()
                {
                    Description = "Śmieszne, humorystyczne sytuacje i postacie",
                    Name = "Komedia"
                },
                new Genre()
                {
                    Description = "Przestępczość oraz wymiar sprawiedliwości",
                    Name = "Kryminał"
                },
                new Genre()
                {
                    Description = "Napięcie, tajemniczość i niepewność w historii przedstawiającej realne zagrożenie",
                    Name = "Thriller"
                },
                new Genre()
                {
                    Description = "Nauka i technika w przyszłości lub hipotetycznych, alternatywnych rzeczywistościach",
                    Name = "Science Fiction"
                },
                new Genre()
                {
                    Description = "Magia oraz stworzenia nie z tego świata",
                    Name = "Fantasy"
                },
                new Genre()
                {
                    Description = "Bitwy i operacje wojskowe oraz realia życia cywili i żołnierzy w czasie działań wojennych",
                    Name = "Wojenny"
                },
                new Genre()
                {
                    Description = "Wędrówka i daleka podróż od domu często przepełniona niezwykłymi zdarzeniami",
                    Name = "Przygodowy"
                },
                new Genre()
                {
                    Description = "Seria ruchomych obrazków",
                    Name = "Animacja"
                },
                new Genre()
                {
                    Description = "Wybuchy, pościgy i strzelaniny",
                    Name = "Akcji"
                }
            };

            List<MoviePersonnel> moviePersonnels = new List<MoviePersonnel>
            {
                #region Pulp Fiction
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[0],
                    Personnel = actors[0]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[0],
                    Personnel = actors[1]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[0],
                    Personnel = actors[2]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[0],
                    Personnel = actors[23]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[0],
                    Personnel = actors[23]
                },
                #endregion

                #region Druzyna Pierscienia
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[1],
                    Personnel = actors[3]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[1],
                    Personnel = actors[4]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[1],
                    Personnel = actors[5]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[1],
                    Personnel = actors[6]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[1],
                    Personnel = actors[7]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[1],
                    Personnel = actors[8]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[1],
                    Personnel = actors[24]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[1],
                    Personnel = actors[24]
                },
                #endregion

                #region Dwie Wieze
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[2],
                    Personnel = actors[3]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[2],
                    Personnel = actors[4]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[2],
                    Personnel = actors[5]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[2],
                    Personnel = actors[6]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[2],
                    Personnel = actors[8]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[2],
                    Personnel = actors[24]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[2],
                    Personnel = actors[24]
                },
                #endregion

                #region Powrot Krola
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[3],
                    Personnel = actors[3]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[3],
                    Personnel = actors[4]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[3],
                    Personnel = actors[5]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[3],
                    Personnel = actors[6]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[3],
                    Personnel = actors[8]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[3],
                    Personnel = actors[24]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[3],
                    Personnel = actors[24]
                },
                #endregion

                #region Kac Vegas
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[4],
                    Personnel = actors[9]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[4],
                    Personnel = actors[10]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[4],
                    Personnel = actors[25]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[4],
                    Personnel = actors[25]
                },
                #endregion

                #region Joker
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[5],
                    Personnel = actors[11]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[5],
                    Personnel = actors[12]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[5],
                    Personnel = actors[25]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[5],
                    Personnel = actors[25]
                },
                #endregion

                #region Matrix
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[6],
                    Personnel = actors[14]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[6],
                    Personnel = actors[15]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[6],
                    Personnel = actors[13]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[6],
                    Personnel = actors[8]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[6],
                    Personnel = actors[26]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[6],
                    Personnel = actors[27]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[6],
                    Personnel = actors[26]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[6],
                    Personnel = actors[27]
                },
                #endregion

                #region Czas Apokalipsy
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[7],
                    Personnel = actors[16]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[7],
                    Personnel = actors[17]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[7],
                    Personnel = actors[28]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[7],
                    Personnel = actors[28]
                },
                #endregion

                #region Shrek
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[8],
                    Personnel = actors[18]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[8],
                    Personnel = actors[19]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[8],
                    Personnel = actors[20]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[8],
                    Personnel = actors[29]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[8],
                    Personnel = actors[30]
                },
                #endregion

                #region Shrek 2
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[9],
                    Personnel = actors[18]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[9],
                    Personnel = actors[19]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[9],
                    Personnel = actors[20]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[9],
                    Personnel = actors[29]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[9],
                    Personnel = actors[30]
                },
                #endregion

                #region Seven
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[10],
                    Personnel = actors[21]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Actor,
                    Movie = movies[10],
                    Personnel = actors[22]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Director,
                    Movie = movies[10],
                    Personnel = actors[31]
                },
                new MoviePersonnel()
                {
                    MemberPosition = FilmCrew.Writer,
                    Movie = movies[10],
                    Personnel = actors[32]
                },
                #endregion
            };
            List<MovieGenre> movieGenres = new List<MovieGenre>
            {
                #region Pulp Fiction
                new MovieGenre()
                {
                    Movie = movies[0],
                    Genre = genres[0]
                },
                new MovieGenre()
                {
                    Movie = movies[0],
                    Genre = genres[1]
                },
                #endregion

                #region Druzyna Pierscienia
                new MovieGenre()
                {
                    Movie = movies[1],
                    Genre = genres[7]
                },
                new MovieGenre()
                {
                    Movie = movies[1],
                    Genre = genres[9]
                },
                #endregion

                #region Dwie Wieze
                new MovieGenre()
                {
                    Movie = movies[2],
                    Genre = genres[7]
                },
                new MovieGenre()
                {
                    Movie = movies[2],
                    Genre = genres[9]
                },
                #endregion

                #region Powrot Krola
                new MovieGenre()
                {
                    Movie = movies[3],
                    Genre = genres[7]
                },
                new MovieGenre()
                {
                    Movie = movies[3],
                    Genre = genres[9]
                },
                #endregion

                #region Kac Vegas
                new MovieGenre()
                {
                    Movie = movies[4],
                    Genre = genres[3]
                },
                #endregion

                #region Joker
                new MovieGenre()
                {
                    Movie = movies[5],
                    Genre = genres[1]
                },
                new MovieGenre()
                {
                    Movie = movies[5],
                    Genre = genres[4]
                },
                #endregion

                #region Matrix
                new MovieGenre()
                {
                    Movie = movies[6],
                    Genre = genres[6]
                },
                new MovieGenre()
                {
                    Movie = movies[6],
                    Genre = genres[11]
                },
                #endregion

                #region Czas Apokalipsy
                new MovieGenre()
                {
                    Movie = movies[7],
                    Genre = genres[8]
                },
                new MovieGenre()
                {
                    Movie = movies[7],
                    Genre = genres[1]
                },
                #endregion

                #region Shrek
                new MovieGenre()
                {
                    Movie = movies[8],
                    Genre = genres[10]
                },
                new MovieGenre()
                {
                    Movie = movies[8],
                    Genre = genres[3]
                },
                new MovieGenre()
                {
                    Movie = movies[8],
                    Genre = genres[7]
                },
                new MovieGenre()
                {
                    Movie = movies[8],
                    Genre = genres[9]
                },
                #endregion

                #region Shrek 2
                new MovieGenre()
                {
                    Movie = movies[9],
                    Genre = genres[10]
                },
                new MovieGenre()
                {
                    Movie = movies[9],
                    Genre = genres[3]
                },
                new MovieGenre()
                {
                    Movie = movies[9],
                    Genre = genres[7]
                },
                new MovieGenre()
                {
                    Movie = movies[9],
                    Genre = genres[9]
                },
                #endregion

                #region Seven
                new MovieGenre()
                {
                    Movie = movies[10],
                    Genre = genres[5]
                },
                new MovieGenre()
                {
                    Movie = movies[10],
                    Genre = genres[4]
                },
                new MovieGenre()
                {
                    Movie = movies[10],
                    Genre = genres[1]
                },
                #endregion
            };
            //List<Review> reviews = new List<Review>();

            if (!db.Movies.Any())
            {
                db.AddRange(movies);
                db.SaveChanges();
            }

            if (!db.Actors.Any())
            {
                db.AddRange(actors);
                db.SaveChanges();
            }

            if (!db.Genres.Any())
            {
                db.AddRange(genres);
                db.SaveChanges();
            }

            if (!db.MovieGenres.Any())
            {
                db.AddRange(movieGenres);
                db.SaveChanges();
            }

            if (!db.MoviePersonnel.Any())
            {
                db.AddRange(moviePersonnels);
                db.SaveChanges();
            }
        }
    }
}

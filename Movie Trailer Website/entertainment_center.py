# Importing two Files
import fresh_tomatoes
import media

# Creating instances of media class

# First Instance
toy_story = media.Movie(
    "Toy Story", """A story in which toys come to life"""
    "A Story of a boy and toys that come to life",
    "https://upload.wikimedia.org/wikipedia/en/1/13/Toy_Story.jpg",
    "https://www.youtube.com/watch?v=KYz2wyBy3kc&t=3s"
    )
# Second Instance
avatar = media.Movie(
    "Avatar", """Jake, a paraplegic marine, replaces his brother
    on the Na'vi inhabited Pandora for a corporate mission. He is
    accepted by the natives as one of their own but he must
    decide where his loyalties lie.""",
    "https://upload.wikimedia.org/wikipedia/en/thumb/b/b0/Avatar-Teaser-" +
    "Poster.jpg/220px-Avatar-Teaser-Poster.jpg",
    "https://www.youtube.com/watch?v=5PSNL1qE6VY"
    )

# Third Instance
infinity_war = media.Movie(
    "Avengers", """The Avengers and their
    allies must be willing to sacrifice all in an
    attempt to defeat the powerful Thanos before
    his blitz of devastation and ruin puts an end
    to the universe."""
    "Save The World",
    "https://upload.wikimedia.org/wikipedia/en/f/ff/Avengers_Age_of_Ultron" +
    "_poster.jpg",
    "https://www.youtube.com/watch?v=6ZfuNTqbHE8&t=3s"
    )
# Array of movies
movies = [
    toy_story,
    avatar,
    infinity_war]
# Passing that Array
fresh_tomatoes.open_movies_page(movies)

# Making media class
"""A class that represents each movie instance"""
class Movie():
    def __init__(self,
                 title,
                 storyline,
                 image,
                 trailer):
        self.title = title #It represents title of the movie
        self.storyline = storyline #It represents storyline of the movie
        self.poster_image_url = image #It represents image of the movie
        self.trailer_youtube_url = trailer #It represents trailer of the movie

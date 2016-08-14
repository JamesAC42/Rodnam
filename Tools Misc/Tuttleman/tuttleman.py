#python3

import requests, bs4, html, datetime, smtplib

today = datetime.datetime.now()
message = "Movies for this week: \n\n"
grand_dict = {}

tuttle_page = requests.get("https://www.fi.edu/theaters")
tuttle_page.raise_for_status()
soupy_max = bs4.BeautifulSoup(tuttle_page, "html.parser")

movies = soupy_max.select(')

for i in range(5):
	today_string = str(today.month) + "/" + str(today.day) + "/" + str(today.year)
	message += today_string + "\n\n"
	imax_page = requests.get("https://www.fi.edu/theaters" + today_string)
	imax_page.raise_for_status()
	soupy_max = bs4.BeautifulSoup(imax_page.text, "html.parser")
	
	movies_dict = {}
	
	movies = soupy_max.select('div .showtimes-movie-container')
	print(movies)
	for movie in movies:
		movie_title = movie.find_all('h3')
		print(movie_title)
		movie_times = [time.getText() for time in movie.find_all('time')]
		movies_dict[movie_title] = movie_times
		message += movie_title + "\n" + ", ".join(movie_times) + "\n\n"
	
	grand_dict[today_string] = movies_dict
	
	today += datetime.timedelta(days=1)
	
print(grand_dict)	
		
	
	
	
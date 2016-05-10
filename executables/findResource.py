#! python3

import sys, webbrowser

print("Opening...")

searchTerm = "+'index of' '" + " ".join(sys.argv[2:]) + "'"
year = sys.argv[1]
if year == "?":
	year = ""
webbrowser.open('http://google.com/search?q=' + searchTerm + year)


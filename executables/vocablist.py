#! python3

import requests,bs4,os,html
from string import ascii_lowercase, ascii_uppercase

filename = input('Filename: ')
filename += '.txt'
print("Type break to end.")
words = [];
while True:
	word = input(": ")
	if word == "break":
		break
	else:
		word = "".join([n for n in word if n in ascii_lowercase + ascii_uppercase + "\'- "])
		if " " in word:
			newWord = ""
			for char in word:
				if char is " ":
					newWord += "%20"
				else:
					newWord += char
			words.append(newWord)
		else:
			words.append(word)

file = open(filename,'w')
file.write("Words + Form + Definitions\n\n")

for word in words:
	dictionary_page = requests.get('http://www.merriam-webster.com/dictionary/' + word)
	dictionary_page.raise_for_status()
	dictionary_soup = bs4.BeautifulSoup(dictionary_page.text, "html.parser")

	word_main = html.unescape(dictionary_soup.select('.word-and-pronunciation h1')[0].getText())
	main_form = html.unescape(dictionary_soup.select('.word-attributes .main-attr em')[0].getText())
	main_definition = html.unescape(dictionary_soup.select('.definition-inner-item span')[0].getText())
	file.write(word_main + ':\t\t' + main_form + ', ' + main_definition + '\n')

file.close()
command = 'start notepad {}'.format(filename)
os.system(command)

print("Success!")


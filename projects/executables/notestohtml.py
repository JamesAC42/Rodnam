#! python3
# NotesToHTML - takes markdown text in clipboard and coverts to HTML.
# Copies HTML to clipboard

import markdown, pyperclip

try:
	text = pyperclip.paste()
	html = markdown.markdown(text)
	pyperclip.copy(html)
	print("Success! HTML copied to clipboard!")
except Error as err:
	print("Something bad happened! Error: {}".format(err))

# Amazing efficiency

#░░░░░░░░░▄░░░░░░░░░░░░░░▄░░░░
#░░░░░░░░▌▒█░░░░░░░░░░░▄▀▒▌░░░
#░░░░░░░░▌▒▒█░░░░░░░░▄▀▒▒▒▐░░░
#░░░░░░░▐▄▀▒▒▀▀▀▀▄▄▄▀▒▒▒▒▒▐░░░
#░░░░░▄▄▀▒░▒▒▒▒▒▒▒▒▒█▒▒▄█▒▐░░░
#░░░▄▀▒▒▒░░░▒▒▒░░░▒▒▒▀██▀▒▌░░░ 
#░░▐▒▒▒▄▄▒▒▒▒░░░▒▒▒▒▒▒▒▀▄▒▒▌░░
#░░▌░░▌█▀▒▒▒▒▒▄▀█▄▒▒▒▒▒▒▒█▒▐░░
#░▐░░░▒▒▒▒▒▒▒▒▌██▀▒▒░░░▒▒▒▀▄▌░
#░▌░▒▄██▄▒▒▒▒▒▒▒▒▒░░░░░░▒▒▒▒▌░
#▀▒▀▐▄█▄█▌▄░▀▒▒░░░░░░░░░░▒▒▒▐░
#▐▒▒▐▀▐▀▒░▄▄▒▄▒▒▒▒▒▒░▒░▒░▒▒▒▒▌
#▐▒▒▒▀▀▄▄▒▒▒▄▒▒▒▒▒▒▒▒░▒░▒░▒▒▐░
#░▌▒▒▒▒▒▒▀▀▀▒▒▒▒▒▒░▒░▒░▒░▒▒▒▌░
#░▐▒▒▒▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▒▄▒▒▐░░
#░░▀▄▒▒▒▒▒▒▒▒▒▒▒░▒░▒░▒▄▒▒▒▒▌░░
#░░░░▀▄▒▒▒▒▒▒▒▒▒▒▄▄▄▀▒▒▒▒▄▀░░░
#░░░░░░▀▄▄▄▄▄▄▀▀▀▒▒▒▒▒▄▄▀░░░░░
#░░░░░░░░░▒▒▒▒▒▒▒▒▒▒▀▀░░░░░░

# Such grace░░
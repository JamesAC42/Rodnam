#! python3

from string import ascii_lowercase

characters = list(ascii_lowercase + "".join([str(i) for i in range(0,10)]) + " ")
values = list("-?.:3;()8$&@\\!9014/57,2#6*qwertyuiop ")

key_to = {}
key_from = {}

for i in range(len(characters)):
	key_to[characters[i]] = values[i]
	key_from[values[i]] = characters[i]
	
thekey = {"to":key_to,"from":key_from}

def refined(charvalues,oldinput):
	refined = ""
	errors = []
	for i in range(len(oldinput)):
		if oldinput[i] not in charvalues:
			if oldinput[i] == '\n':
				refined += " "
				continue
			refined += ""
			errors += oldinput[i]
		else:
			refined += oldinput[i]
	return refined, errors

def translate(to_or_from,transcript):
	new = ""
	refined_input, errors = refined(thekey[to_or_from],transcript)
	for char in range(len(refined_input)):
		new += thekey[to_or_from][refined_input[char]]
	return new, errors
		
	

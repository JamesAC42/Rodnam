#! python3

from string import ascii_lowercase

characters = list(ascii_lowercase + "".join([str(i) for i in range(1,10)]) + "0 ")
values = list("-?.:3;()8$&@\\!9014/57,2#6*qwertyuiop ")

key_to = {}
key_from = {}

for i in range(len(characters)):
	key_to[characters[i]] = values[i]
	key_from[values[i]] = characters[i]
	
def refined(charvalues,oldinput):
	refined = ""
	errors = []
	for i in range(len(oldinput)):
		if oldinput[i] not in charvalues:
			refined += ""
			errors += oldinput[i]
		else:
			refined += oldinput[i]
	return refined, errors

def main():
	to_or_from = input("Translating to or from: ")
	transcript = (input("Transcript: ")).lower()
	new = ""
	if to_or_from.lower() == "to":
		refined_input, errors = refined(characters,transcript)
		for char in range(len(refined_input)):
			new += key_to[refined_input[char]]
		print("")
		print(new)
		print("Errors: " + str(len(errors)) + " [" +  "".join(errors) + "]")
		print("")
		main()
	elif to_or_from.lower() == "from":
		refined_input, errors = refined(values,transcript)
		for char in range(len(refined_input)):
			new += key_from[refined_input[char]]
		print("")
		print(new)
		print("Errors: " + str(len(errors)) + " [" +  "".join(errors) + "]")
		print("")
		main()
	else:
		print("Select to or from.")
		main()
	
main()


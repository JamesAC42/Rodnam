def pygLatin():
	print ("Enter passage.")
	opassage = input(": ")
	opassage += " "
	opassage = opassage.lower()
	passage = ""
	for n in range(0,len(opassage)):
	   if opassage[n] not in "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890 ":
	       passage += ""
	   else:
	       passage += opassage[n]
	       
		   
	words = []
	i = 0
	string = ""
	amount = 0
	for n in range(0,len(passage)):
		if passage[i] == " ":
			i += 1
			words.append(string)
			string = ""
			amount += 1
			continue
		else:
			string += passage[i]
			i += 1
	
	y = 0
	while y < len(words):
		if words[y] == "":
			words.pop(y)
			amount -= 1
		else:
			y += 1
			
	return (words)
	
def translate(word_list):
	vowels = "AaEeIiOoUuYy"
	for i in range(0,len(word_list)):
		word = word_list[i]
		if word[0] in vowels:
			if word[-1] in vowels:
				word += "hay"
				word_list[i] = word
			else:
				word += "ay"
				word_list[i] = word
		elif word[1] not in vowels:
			end_append = word[0:2]
			word = word[2:]
			word += end_append
			word += "ay"
			word_list[i] = word
		else:
			end_append = word[0]
			word = word[1:]
			word += end_append
			word += "ay"
			word_list[i] = word
	return word_list
	
def display(new_words):
	print(" ".join(new_words))

def program():
	word_list = pygLatin()
	new_word_list = translate(word_list)
	display(new_word_list)

while True:
	program()
	input(": ")






























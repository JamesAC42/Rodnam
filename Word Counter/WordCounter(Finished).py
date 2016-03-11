
#control+shift+x to run

import operator

def Word_List():
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
			
	return (words, amount)
	
	
def Count_Appearence(words,amount):
	new = {}
	for i in words:
		new[i] = 0
	for n in words:
		new[n] += 1
	print(" ")
	print ("Words: ", amount)
	print(" ")
	return new
	
def Display(word_dict):
	ordered_dict = sorted(word_dict.items(),key=operator.itemgetter(1))
	for w, a in ordered_dict:
		n = 30 - len(w)
		f = ("-" * n)
		b = ("0" * a)
		print("{}: {} {} ({})".format(w,f,b,a))
	
#hello hello hello testing testing good	

def again():
	wrd, amt = Word_List()
	wrds = Count_Appearence(wrd,amt)
	Display(wrds)
	false_close = input("Run again: ")
	while True:
		if false_close == 'no':
			break
		else:
			again()
			
again()
i = input(" ")
	
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
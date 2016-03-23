#! python3

import operator

def count_words_in_string(opassage):
	
	opassage += " "
	opassage = opassage.lower()
	passage = ""
	for n in range(0,len(opassage)):
		if opassage[n] not in "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890 ":
			if opassage[n] is "\n":
				passage += " "
			else:
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
			
	# return (words, amount)
	
	new = {}
	for i in words:
		new[i] = 0
	for n in words:
		new[n] += 1

	ordered_dict = sorted(new.items(),key=operator.itemgetter(1))
	return ordered_dict, amount


def return_stats_string(ordered_dict,max_length,justify="left"):
	stat = ""
	if justify == "left":
		for w, a in ordered_dict:
			n = max_length - len(w)
			f = ("-" * n)
			b = ("0" * a)
			stat = stat + "{}: {} {} ({})\n".format(w,f,b,a)
		return stat
	elif justify == "right":
		for w,a in ordered_dict:
			n = max_length - (len(w) + a)
			f = ("-" * n)
			b = ("0" * a)
			stat = stat + "{}: {} {} ({})\n".format(w,f,b,a)
		return stat

	
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
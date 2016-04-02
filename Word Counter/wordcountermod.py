#! python3

import operator,requests,bs4,html
from string import ascii_lowercase, ascii_uppercase

def count_words_in_string(opassage):
	
	opassage += " "
	opassage = opassage.lower()
	passage = ""
	for n in range(0,len(opassage)):
		if opassage[n] not in (ascii_uppercase + ascii_lowercase + "1234567890 "):
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

def dictionary_of_words(passage):

	opassage = passage
	opassage += " "
	opassage = opassage.lower()
	passage = ""
	for n in range(0,len(opassage)):
		if opassage[n] not in (ascii_uppercase + ascii_lowercase + " "):
			if opassage[n] is "\n":
				passage += " "
			else:
				passage += ""
		else:
			passage += opassage[n]

	words = []
	i = 0
	string = ""
	for n in range(0,len(passage)):
		if passage[i] == " ":
			i += 1
			words.append(string)
			string = ""
			continue
		else:
			string += passage[i]
			i += 1
	
	y = 0
	while y < len(words):
		if words[y] == "":
			words.pop(y)
		else:
			y += 1
	
	dict_dict = {}

	for word in words:
		dictionary_page = requests.get('http://www.merriam-webster.com/dictionary/' + word)
		dictionary_page.raise_for_status()
		dictionary_soup = bs4.BeautifulSoup(dictionary_page.text, "html.parser")
		main_form = dictionary_soup.select('.word-attributes .main-attr em')[0].getText()
		main_definition = dictionary_soup.select('.definition-inner-item span')[0].getText()
		dict_dict[word] = [html.unescape(main_form),html.unescape(main_definition)]

	return dict_dict

def dictionary_single_word(word):

	word = "".join([n for n in word if n in ascii_lowercase + ascii_uppercase + "\'-"])
	print(word)

	dictionary_page = requests.get('http://www.merriam-webster.com/dictionary/' + word)
	dictionary_page.raise_for_status()

	dictionary_soup = bs4.BeautifulSoup(dictionary_page.text, "html.parser")

	mispelling_error = "The word you've entered isn't in the dictionary."
	nonexistent_word_error = "The word you've entered was not found. Please try your search again."

	try:
		error_check = dictionary_soup.select('.card-primary-content p')[0].getText()
		print(error_check)
	except:
		pass

	if mispelling_error == error_check[11:59]:
		word = dictionary_soup.select(".definition-inner-item span span a")[0].getText()
		print(word)
		new_dictionary_page = requests.get('http://www.merriam-webster.com/dictionary/' + word)
		new_dictionary_page.raise_for_status()
		new_dictionary_soup = bs4.BeautifulSoup(new_dictionary_page.text, "html.parser")
		main_form = new_dictionary_soup.select('.word-attributes .main-attr em')[0].getText()
		main_definition = new_dictionary_soup.select('.definition-inner-item span')[0].getText()
		dict_dict = {}
		dict_dict["Suggestion: " + word] = [html.unescape(main_form),html.unescape(main_definition)]
		return dict_dict

	elif nonexistent_word_error == error_check:
		dict_dict = {word:["This word does not exist","According to merriam-webster"]}
		return dict_dict
	

	main_form = dictionary_soup.select('.word-attributes .main-attr em')[0].getText()
	main_definition = dictionary_soup.select('.definition-inner-item span')[0].getText()
	dict_dict = {}
	dict_dict[word] = [html.unescape(main_form),html.unescape(main_definition)]
	return dict_dict

	
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
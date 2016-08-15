#! python3

#Command line word ladder
#Given two words, wordladder converts the first word into the second one letter at a time
#Optional: pass the argument "random" to make the order that letter are changed random

import sys,random

def wordLadder(random_order = False):
	word_one = input("Word 1: ").lower()
	original_one = word_one
	word_two = input("Word 2: ").lower()
	original_two = word_two

	if word_one == word_two:
		print("Words are equal.")
		return
	
	if len(word_one) is not len(word_two):
		print("Words are not the same length.")
		
	word_one = list(word_one)
	word_two = list(word_two)
	steps = 0
	order = list(range(0,len(word_one)))
	if random_order is True:
		random.shuffle(order)
	for letter in order:
		if word_one[letter] == word_two[letter]:
			pass
		else:
			steps += 1
			step = "{}. {} -> ".format(steps, "".join(word_one))
			word_one[letter] = word_two[letter]
			step += "".join(word_one)
			print(step)
	print("{} converted to {} in {} steps.".format(original_one, original_two, steps))
	
try:
	if sys.argv[1].lower() == "random":
		wordLadder(random_order = True)
	else:
		wordLadder()
except IndexError:
	wordLadder()
	
#! python3

#Command line word ladder
#Given two words, wordladder converts the first word into the second one letter at a time
#Optional: pass the argument "random" to make the order that letter are changed random

import sys
from random import shuffle

def wordLadder(random_order = False):
	word_one = input("Phrase 1: ").lower()
	original_one = word_one
	word_two = input("Phrase 2: ").lower()
	original_two = word_two
	print("")
	
	difference = abs(len(word_one) - len(word_two))
	if len(word_one) > len(word_two):
		word_two += " "*difference
	else:
		word_one += " "*difference
		
	if word_one == word_two:
		print("Words are equal.\n")
		return
		
	word_one = list(word_one)
	word_two = list(word_two)
	steps = 0
	order = list(range(0,len(word_one)))
	if random_order is True:
		shuffle(order)
	for letter in order:
		if word_one[letter] == word_two[letter]:
			pass
		else:
			steps += 1
			step = "{}. {} -> ".format(steps, "".join(word_one))
			word_one[letter] = word_two[letter]
			step += "".join(word_one)
			print(step)
	print("\n\"{firstword}\" converted to \"{secondword}\" in {amount} steps.\n".format(firstword=original_one, secondword=original_two, amount=steps))

if __name__ == "__main__":
	try:
		if sys.argv[1].lower() == "random":
			wordLadder(random_order = True)
		else:
			wordLadder()
	except IndexError:
		wordLadder()
	
	
	
	
	
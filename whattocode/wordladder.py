#! python3

#Command line word ladder
#Given two words, wordladder converts the first word into the second one letter at a time
#Optional: pass the argument "random" to make the order that letter are changed random

import argparse, sys
from random import shuffle

def main(random_order = False):
    word_one = input("Phrase 1: ").lower()
    word_two = input("Phrase 2: ").lower()
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
	
    convertWords(word_one, word_two, random_order)
	
def convertWords(word_list_one, word_list_two, random_order):
    steps = 0
    original_one = "".join(word_list_one)
    original_two = "".join(word_list_two)
    order = list(range(0,len(word_list_one)))
    if random_order is True:
        shuffle(order)
    for letter in order:
        if word_list_one[letter] != word_list_two[letter]:
            steps += 1
            step = "{}. {} -> ".format(steps, "".join(word_list_one))
            word_list_one[letter] = word_list_two[letter]
            step += "".join(word_list_one)
            print(step)
    print("\n\"{firstword}\" converted to \"{secondword}\" in {amount} steps.\n".format(firstword=original_one, secondword=original_two, amount=steps))

if __name__ == "__main__":
    try:
        if sys.argv[1].lower() == "-random":
            main(random_order = True)
        else:
            main()
    except IndexError:
	    main()
	
	
	
	
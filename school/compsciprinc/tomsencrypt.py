#!/usr/bin/python3
import sys

#Input
filename = sys.argv[1]
file = open(filename, 'r')
passage = file.read()
new = []

alphabet = 'abcdefghijklmnopqrstuvwxyz'
alphabet += alphabet.upper()

#Encrypt/ decrypt passage
words = passage.split(' ')
for word in words:
	total = 0
	letters = 0
	for letter in word:
		if letter not in alphabet:
			pass
		else:
			index = alphabet.index(letter) + 1
			total += index
			letters += 1
	if letters is not 0:
		rotation = int(round(total/letters))
	else:
		continue
	newword = ''
	for letter in word:
		if letter not in alphabet:
			newword += letter
		else:
			index = alphabet.index(letter) + 1
			index += rotation
			if index > 26:
				index = abs(26-index)
			newword += alphabet[index - 1]
	new.append(newword)
	
			
	
#Output
file.close()
filenew = open(filename, 'w')
filenew.write(" ".join(new))
filenew.close()
print(" ".join(new))
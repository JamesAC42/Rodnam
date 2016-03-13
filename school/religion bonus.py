import random
import math

letters = []
dictionary = open('dictionary.txt','r+')

while True:
	l = input('$: ')
	if l.lower() == 'break':
		break
	elif len(l) != 1:
		print('Error: enter only 1 letter')
		continue
	else:
		letters.append(l)


x = 0

#nPr = n! / (n - r)!
n = len(letters)

while True:
	r = input('R: ')
	try:
		r = int(r)
	except:
		print("Permutation length must be type int")
		continue
	if r > n:
		print("Permutation must not be greater than length of input.")
		print("Input length: {}".format(n))
		continue
	break
	
npr = (math.factorial(n)) / (n - r)

while x < npr:
	random.shuffle(letters)
	word = ""
	for i in letters:
		word += i
	if word in dictionary:
		print(word)
	x += 1
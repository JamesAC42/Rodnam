#!/usr/bin/python

import sys

alphabet = 'abcdefghijklmnopqrstuvwxyz'

def hash(pw):
	pw = pw.lower()
	spec = list('!@#$%^&*()')
	new = []
	pw = list(pw)
	pw.reverse()
	for letter in range(0,len(pw)):
		new.append(pw[letter])
		new.append(int((alphabet.index(pw[letter])) + 1) * 11)
	new = [str(x) for x in new]
	iindex = (int(new[-1]) % 10) - 1
	new.append(spec[iindex])
	if len(new) <= 7:
		wen = [x for x in new]
		wen.reverse()
		new += wen
	return(("".join(new)))

def encrypt(pw):
	pw = pw.lower()
	new = []

	numbers = list(range(10))
	for letter in pw:
		if letter not in alphabet:
			new.append(letter)
		else:
			'''if letter is 'a':
				new.append('z')
				continue
			else:'''
			letterspace = (((alphabet.index(letter) + 1) * 26) % 27) - 1
			newletter = alphabet[letterspace]
			new.append(newletter)
			
	return("".join(new))
	
def complicate(pw):
	pw = pw.lower()
	numbers = [str(x) for x in range(10)]
	new = []
	for character in pw:
		if character in numbers:
			new.append(alphabet[int(character) - 1])
			new.append(character)
		else:
			new.append(character)
	return("".join(new))
			
	
if __name__ == "__main__":
	#weak_pw = sys.argv[1]
	#final  = complicate(encrypt(hash(weak_pw)))
	#hashed_pw = hash(weak_pw)
	#encrypted_pw = encrypt(hashed_pw)
	#final_pw = complicate(encrypted_pw)
	print(encrypt("Hb2z0d4$Lb2e5f6^ca1c3i9(Rc3c3d4$ob2i9e5%Vc3h8f6^ob2i9e5% "))
	#print(final_pw)
	

#!/usr/bin/python3
import sys

#Input
filename = sys.argv[1]
file = open(filename, 'r')
passage = file.read()
new = []

alphabet = 'abcdefghijklmnopqrstuvwxyz'

#Encrypt/ decrypt passage
for letter in passage:
	if letter not in alphabet:
		if letter is " ":
			new.append(letter)
		else:
			new.append(letter)
	else:
		if letter is 'a':
			new.append('z')
			continue
		else:
			letterspace = ((alphabet.index(letter) * 26) % 27) - 2
			newletter = alphabet[letterspace]
			new.append(newletter)
	
#Output
file.close()
filenew = open(filename, 'w')
filenew.write("".join(new))
filenew.close()
print("".join(new))

'''
	My cipher takes a message and encrypts it using the following process. First, take the index of the letter and multiply it by 26. Then 
'''
#!/usr/bin/python3
import sys

#Input
filename = sys.argv[1]
file = open(filename, 'r')
passage = file.read()
new = []

alphabet = 'abcdefghijklmnopqrstuvwxyz'

#Encrypt/ decrypt passage
for letter in passage:
	if letter not in alphabet:
		if letter is " ":
			new.append(letter)
		else:
			continue
	else:
		if letter is 'a':
			new.append('z')
			continue
		else:
			letterspace = ((alphabet.index(letter) * 26) % 27) - 2
			newletter = alphabet[letterspace]
			new.append(newletter)
	
#Output
file.close()
filenew = open(filename, 'w')
filenew.write("".join(new))
filenew.close()
print("".join(new))

'''
	My cipher takes a message and encrypts it using the following process. First, take the index of the letter and multiply it by 26. Then 
'''
	
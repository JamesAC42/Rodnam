def hash(pw):
    alph = 'abcdefghijklmnopqrstuvwxyz'
    spec = list('!@#$%^&*()')
    new = []
    pw = list(pw)
    pw.reverse()
	
    for letter in range(0,len(pw)):
        new.append(pw[letter])
        new.append(int(alph.index(pw[letter])) * 11)
    new = [str(x) for x in new]
    iindex = round(int(new[-1]) / 10)
    new.append(spec[iindex])
	
    if len(new) <= 7:
        wen = [x for x in new]
        wen.reverse()
        new += wen
		
    return(("".join(new)))

def encrypt(pw):
	new = []

	alphabet = 'abcdefghijklmnopqrstuvwxyz'
	numbers = list(range(10))
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
	return("".join(new))
	

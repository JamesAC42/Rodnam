#!/usr/bin/python

import sys

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
if __name__ == "__main__":
	pw = sys.argv[1]
	print(hash(pw))



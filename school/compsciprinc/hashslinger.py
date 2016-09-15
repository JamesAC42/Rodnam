#!/usr/bin/python

import sys

def hash(pw):
    alph = 'abcdefghijklmnopqrstuvwxyz'
    spec = '!@#$%^&*()'
    new = []
    pw = list(pw)
    pw.reverse()
    for letter in pw:
        new.append(letter)
        new.append(str(alph.index(letter)))
    new.append(spec[int(new[-1])])
    if len(new) <= 10:
        wen = [x for x in new]
        wen.reverse()
        new += wen
    return("".join(new))

if __name__ == "__main__":
	pw = sys.argv[1]
	print(hash(pw))



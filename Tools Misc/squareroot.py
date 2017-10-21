import sys
base = float(sys.argv[1])

guess = 1.0

def getSquare(guess, base):
	if(abs(base - (guess * guess)) > 0.00000001):
		guess = ((base / guess) + guess) / 2
		getSquare(guess, base)
	else:
		return guess

print(getSquare(guess, base));
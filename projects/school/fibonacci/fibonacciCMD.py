#! python3

from fibonaccimod import *
from boardmaker import *


while True:
	start = int(input("a(1): "))
	second = int(input("a(2): "))
	length = int(input("Length: "))

	sequ = generate_sequence(start,second,length)
	ratio = generate_golden_ratio(start,second,length)

	print("\nRatio: {}\n".format(ratio))

	while len(sequ) % 4 != 0:
		sequ.append(" ")

	sequ = [str(i) for i in sequ]
	display = [[sequ[i],sequ[i+1],sequ[i+2],sequ[i+3]] for i in range(0,len(sequ),4)]

	table = toBoard(display)
	table.printBoard()

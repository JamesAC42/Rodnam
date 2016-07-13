from random import choice
import boardmaker

record = {}
chart = boardmaker.makeBoard(100,2)
for person in range(1,101):
	record[str(person)] = 0
for year in range(5000):
	town = (["O"]*99)+["X"]
	for person in record:
		slip = choice(town)
		if slip == "X":
			record[person] += 1
			break
		town.remove(slip)

average = 0
for person in range(1,101):
	p = str(person)
	chart.importRow((person-1),[p,record[p]])

chart.printBoard()



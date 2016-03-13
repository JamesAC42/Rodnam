
import random

#make board
board = [["-","-","-"],["-","-","-"],["-","-","-"]]

#board position cheat
#["0,0"; "0,1"; "0,2"]

#["1,0"; "1,1"; "1,2"]

#["2,0"; "2,1"; "2,2"]

#print the board
def printBoard():
	print("________________")
	for row in board:
		print("|    |    |    |")
		print("|  {} |  {} | {}  |".format(row[0],row[1],row[2]))
		print("|____|____|____|")

#check for rows 		
def checkRow(xoro):
	if xoro == "X":
		op = "O"
	else:
		op = "X"
	for n in range(0,3):
		if "-" not in board[n] and op not in board[n]:
			return [True, "row", xoro]
			break
		else:
			continue
	return [False, "row", xoro]

#check for columns
def checkCol(xoro):
	if xoro == "X":
		op = "O"
	else:
		op = "X"
	for n in range(0,3):
		i = 0
		if "-" not in board[0][n] and op not in board[0][n]:
			i += 1
		if "-" not in board[1][n] and op not in board[1][n]:
			i += 1
		if "-" not in board[2][n] and op not in board[2][n]:
			i += 1
		if i == 3:
			return [True, "column", xoro]
	return [False, "column", xoro]

#check for diagonals
def checkDia(xoro):
	if xoro == "X":
		op = "O"
	else:
		op = "X"
		
	i = 0
	for n in range(0,3):
		if "-" not in board[n][n] and op not in board[n][n]:
			i += 1
		
	a = 0
	if "-" not in board[0][2] and op not in board[0][2]:
		a += 1
	if "-" not in board[1][1] and op not in board[1][1]:
		a += 1
	if "-" not in board[2][0] and op not in board[2][0]:
		a += 1
		
	if a == 3 or i == 3:
		return [True, "diagonal", xoro]
	else:
		return [False, "diagonal", xoro]
	
#check for 3-in-a-rows function
def checkAll():
	a = checkCol("X")
	b = checkCol("O")
	c = checkRow("X")
	d = checkRow("O")
	e = checkDia("X")
	f = checkDia("O")
	x = [a,b,c,d,e,f]
	threes = []
	for i in x:
		if i[0] == True:
			threes.append(i)
	if len(threes) == 0:
		return False
	else:
		return threes
	
#intro
print("Welcome to Tic-Tac-Toe!")
user = input("What's your name?: ")
if user != "":
	print("Nice name, {}!".format(user))
else:
	print("Don't have a name, eh?")
input("Press enter to continue...:")
print("")
print("Instructions:")
print("Select a space by typing the number it corresponds to:")
print("________________")
intro_numbers = [[1,2,3],[4,5,6],[7,8,9]]
for i in intro_numbers:
	print("|    |    |    |")
	print("|  {} |  {} | {}  |".format(i[0],i[1],i[2]))
	print("|____|____|____|")
print("")
print("Selecting your indentity...")
player_xoro = random.choice(["X","O"])
print("You are {}'s!".format(player_xoro))

	
#game method
def Game(xoro)
	#taken spaces
	taken = {
		1: None,
		2: None,
		3: None,
		4: None,
		5: None,
		6: None,
		7: None,
		8: None,
		9: None
	}
	
	first_round = True
	
	#assign computer
	if player_xoro == "O":
		computer_xoro = "X"
	else:
		computer_xoro = "O"
		
	#game loop
	while True:
		#check for any 3-in-a-rows
		check = checkAll()
		if check != False:
			break
			
		#print board
		printBoard()
		break
		
		#first round move
		if first_round == True:
			if player_xoro == "O":
				player_move = input("Move: ")
				first_round = False
		
	
input(": ")
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		

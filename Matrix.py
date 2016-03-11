
#define the number of rows and columns
while True:	
	rows = input("Rows: ")
	try:
		rows = int(rows)
		break
	except:
		print("Type a number.")
		
while True:
	columns = input("Columns: ")
	try:
		columns = int(columns)
		break
	except:
		print("Type a number.")
		
#create the matrix
matrix = []

#add rows
for i in range(0,rows):
	matrix.append([])
	
#add data into rows
for i in range(0,len(matrix)):
	for n in range(0,columns):
		data_input = input("Data Row {}, Column {}:".format(i+1, n+1))
		matrix[i].append(data_input)
	
#print function
def print_matrix(matrix):
	print("")
	for row in matrix:
		 print("[   "+"     ".join(row)+"   ]")
		 print("")
		 
#print	 
print_matrix(matrix)

hold = input("Exit: ")
print (hold)

#! python3

from operator import itemgetter
from os.path import isdir
from os import mkdir
from openpyxl import Workbook
from openpyxl.chart import BarChart, Reference, Series
from boardmaker import *

while True:
	menu_list = [["1","2","3"],["Import (.txt)", "Paste from clipboard","Exit"]]
	options = toBoard(menu_list)

	while True:
		options.printBoard()
		choice = input("Select: ")
		if choice in menu_list[0]:
			break
		else:
			print("Invalid selection. Select 1 or 2.")
			continue

	if choice == "1":
		while True:
			ifile = input("Import file to count: ")
			try:
				fileimport = open(ifile, "r+")
				break
			except FileNotFoundError:
				print("File name {0} does not exist.".format(ifile))
				continue
		opassage = fileimport.read()
	elif choice == "2":
		print ("Enter passage.")
		opassage = input(": ")
		if not(isdir("C:/WordCounterExports")):
			mkdir("C:/WordCounterExports/")

		monty = opassage[0:8]
		preview = "".join([s for s in monty if s != " "])
		new_item = open("C:/WordCounterExports/{}.txt".format(preview),'w')
		new_item.write(opassage)
		new_item.close()
	else:
		break

	opassage += " "
	opassage = opassage.lower()
	passage = ""
	characters = 0
	for n in range(0,len(opassage)):
		if opassage[n] != " ":
			characters += 1
		if opassage[n] not in "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890 ":
			if opassage[n] == "\n":
				passage += " "
			else:
				passage += ""
		else:
			passage += opassage[n]
			   
			   
	words = []
	i = 0
	string = ""
	amount = 0
	for n in range(0,len(passage)):
		if passage[i] == " ":
			i += 1
			words.append(string)
			string = ""
			amount += 1
			continue
		else:
			string += passage[i]
			i += 1

	y = 0
	while y < len(words):
		if words[y] == "":
			words.pop(y)
			amount -= 1
		else:
			y += 1
			
	new = {}
	for i in words:
		new[i] = 0
	for n in words:
		new[n] += 1
	print(" ")
	print ("Words: ", amount)
	print(" ")

	ordered_dict = sorted(new.items(),key=itemgetter(1))
	for w, a in ordered_dict:
		n = 30 - len(w)
		f = ("-" * n)
		b = ("0" * a)
		print("{}: {} {} ({})".format(w,f,b,a))

	rerun_menu_list = [["1","2","3"],["Stop","Run Again","Export to (.xlsx)"]]
	rerun_menu = toBoard(rerun_menu_list)
	while True:
		rerun_menu.printBoard()
		rerun_choice = input("Select: ")
		if rerun_choice in rerun_menu_list[0]:
			break
		else:
			print("Invalid selection. Select 1, 2, or 3")
			continue
	if rerun_choice == "1":
		break
	elif rerun_choice == "2":
		continue
	else:
		wb = Workbook()
		sheet = wb.active
		monty = opassage[0:8]
		preview = "".join([s for s in monty if s != " "])
		sheet.title = "{}".format(preview)

		i = 1
		for word, occur in ordered_dict:
			sheet['A' + str(i)] = word
			sheet['B' + str(i)] = occur
			i += 1

		values = Reference(sheet, min_col=1,min_row=1,max_col=2,max_row=len(ordered_dict))
		chart = BarChart()
		chart.type = "col"
		chart.style = 11
		chart.title = "Word Frequency"
		chart.y_axis.title = "Frequency"
		chart.x_axis.title = "Word"
		chart.add_data(values, titles_from_data=True)
		sheet.add_chart(chart, "D2")

		if not(isdir("C:/WordCounterExports")):
			mkdir("C:/WordCounterExports/")
		name = "wc{}.xlsx".format(preview)
		wb.save("C:/WordCounterExports/{}".format(name))
		print("Workbook successfully created at C:/WordCounterExports/ named {}".format(name))
		continue

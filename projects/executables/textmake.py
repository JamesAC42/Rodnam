#! python3
# textmaker - create a text file with text in clipboard

import pyperclip,sys,os

name = input("Name: ")
f = open(name,"w+")

if len(sys.argv) == 1:
	f.write(pyperclip.paste())
	print("Success!")
	f.close()
elif sys.argv[1] == "write":
	text = ""
	print("Type 'break' to stop.")
	while True:
		new_line = input(": ")
		if new_line == "break":
			break
		else:
			text += new_line + "\n"
	f.write(text)
	print("Success!")
	f.close()
else:
	print("Invalid argument: {}".format(sys.argv[1:]))
	f.close()
	os.system("rm {}".format(name))



#! python3

import tkinter as tk 

class App(object):
	def __init__(self,master):
		self.master = master
		self.whitekeys = []
		self.blackkeys = []
		
		self.white = {	"a":["C"],
						"s":["D"],
						"d":["E"],
						"f":["F"],
						"g":["G"],
						"h":["A"],
						"j":["B"]}
		self.black = {	"w":["C#"],
						"e":["Eb"],
						"t":["F#"],
						"y":["G#"],
						"u":["Bb"]}
						
		self.makeFrame()
		
		for i in range(0,7):
			self.makeWhiteKey()
			
		for key in range(0,7):
			self.whitekeys[key].grid(row=0,column=key)
			
		for trigger in self.white:
			value = self.white[trigger]
			letter = value[0]
			self.master.bind(trigger,lambda event, note=letter: self.playNote(note=note))
			print(trigger,self.white[trigger])
		
	def playNote(event,note):
		print(note)
		
	def makeFrame(self):
		self.keysFrame = tk.Frame(self.master)
		self.keysFrame.grid(row=0,column=0)
		
	def makeWhiteKey(self):
		key = tk.Frame(self.keysFrame,height=200,width=50,bg="white",highlightcolor="#000000",highlightthickness=1,relief="raised",padx=2)
		self.whitekeys.append(key)
		
root = tk.Tk()
piano = App(root)
root.title = "Piano"
root.mainloop()
		
	
#! python3

import tkinter as tk 
import winsound

class App(object):
	def __init__(self,master):
		self.master = master
		self.whitekeys = []
		self.blackkeys = []
		self.white = {	"a":["C",261],
						"s":["D",293],
						"d":["E",329],
						"f":["F",349],
						"g":["G",392],
						"h":["A",440],
						"j":["B",494],
						"k":["C",523],
						"l":["D",587],
						";":["E",659],
						"'":["F",698]}
		self.black = {	"w":["C#",277],
						"e":["Eb",311],
						"t":["F#",370],
						"y":["G#",415],
						"u":["Bb",466],
						"o":["C#",554],
						"p":["Eb",622]}
						
						
		self.makeFrame()
		self.makeInterface()
			
		for trigger in self.white:
			value = self.white[trigger]
			letter = value[1]
			self.master.bind(trigger,lambda event, note=letter: self.playNote(note=note))
			
		for trigger in self.black:
			value = self.black[trigger]
			letter = value[1]
			self.master.bind(trigger,lambda event, note=letter: self.playNote(note=note))
		
	def playNote(event,note):
		winsound.Beep(note, 150)
		
	def makeFrame(self):
		self.keysFrame = tk.Frame(self.master)
		self.keysFrame.grid(row=0,column=0)
		
	def makeInterface(self):
		self.title = tk.Label(self.keysFrame,text="PIANO",anchor="center",font=("Verdana",40))
		self.title.grid(row=0,column=0)
		
		
root = tk.Tk()
piano = App(root)
root.title = "Piano"
root.mainloop()
		
	
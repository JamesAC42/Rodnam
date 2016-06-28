#! python3

import tkinter, kj7bmod

class Translator(object):
	def __init__(self, master):
	
		self.master = master
		self.makeFrames()
		self.makeInterfaces()
		
	def makeFrames(self):
	
		self.titleFrame = tkinter.Frame(self.master)
		self.titleFrame.grid(row=0,column=0,columnspan=3)
		
		self.buttonFrame = tkinter.Frame(self.master)
		self.buttonFrame.grid(row=1,column=0)
		
		self.inputFrame = tkinter.Frame(self.master)
		self.inputFrame.grid(row=1,column=1)
		
		self.resultFrame = tkinter.Frame(self.master)
		self.resultFrame.grid(row=1,column=2)
		
	def makeInterfaces(self):
	
		self.translateToButton = tkinter.Button(self.buttonFrame,text="To",command=self.translateTo,relief="raised",anchor="center",width=4)
		self.translateToButton.grid(row=0,column=0)
		
		self.translateFromButton = tkinter.Button(self.buttonFrame,text="From",command=self.translateFrom,relief="raised",anchor="center")
		self.translateFromButton.grid(row=1,column=0)
		
		self.inputBox = tkinter.Text(self.inputFrame, wrap="word")
		self.inputBox.grid(row=0,column=0)
		vertscroll = tkinter.Scrollbar(self.inputFrame)
		vertscroll.config(command=self.inputBox.yview)
		self.inputBox.config(yscrollcommand=vertscroll.set)
		self.inputBox.grid(column=0, row=0)
		vertscroll.grid(column=1, row=0, sticky='NS')
		
		self.resultBox = tkinter.Text(self.resultFrame, relief="flat",borderwidth=0, state="disabled",width=50)
		result_scroll = tkinter.Scrollbar(self.resultFrame)
		result_scroll.config(command=self.resultBox.yview)
		self.resultBox.config(yscrollcommand=result_scroll.set)
		self.resultBox.grid(row=1,column=0,columnspan=3)
		result_scroll.grid(row=1,column=3,sticky="NS")
		
	def translateTo(self):
		input = self.inputBox.get("1.0","end-1c")
		
	def translateFrom(self):
		pass
		
root = tkinter.Tk()
translator = Translator(root)
root.mainloop()

		
		
		
		
		
		
		
		
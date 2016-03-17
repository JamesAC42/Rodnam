#!/usr/bin/python

import tkinter as tk
from wordcountermod import *

class App(object):
	def __init__(self, master, **kwargs):

		self.master = master
		
		self.title_frame = tk.Frame(self.master)
		self.title_frame.grid(row=0,column=0,columnspan=3)
		self.title = tk.Label(self.title_frame,text="PyWord Counter",font=("Times",16),anchor="center",height=2)
		self.title.grid(row=0,column=0,columnspan=4,rowspan=3)

		self.text_frame = tk.Frame(self.master)
		self.text_frame.grid(row=3,column=0,columnspan=2)

		def count(event):
			inputs = self.textbox.get("1.0","end-1c")
			ordered, amount = count_words_in_string(inputs)
			stats_string = return_stats_string(ordered,40,justify="right")
			self.words.config(text=str(amount))
			self.stats.config(state="normal")
			self.stats.delete('1.0',"end-1c")
			self.stats.insert('1.0',stats_string)
			self.stats.config(state="disabled")

		self.result_frame=tk.Frame(self.master)
		self.result_frame.grid(row=3,column=2)

		self.textbox = tk.Text(self.text_frame,wrap = 'word',font=("Times",11))
		self.textbox.bind("<Key>",count)
		vertscroll = tk.Scrollbar(self.text_frame)
		vertscroll.config(command=self.textbox.yview)
		self.textbox.config(yscrollcommand=vertscroll.set)
		self.textbox.grid(column=0, row=0)
		vertscroll.grid(column=1, row=0, sticky='NS')

		words_font = ("Sans-Serif",13,"bold")
		self.words_label = tk.Label(self.result_frame, text="Words: ", relief="flat",anchor="w",height=2,font=words_font)
		self.words_label.grid(row=0,column=0,columnspan=2)
		self.words  = tk.Label(self.result_frame,text="0",relief="flat",anchor="w",height=2,font=words_font)
		self.words.grid(row=0,column=2,columnspan=2)
		#self.submit_button = tk.Button(self.result_frame,text="COUNT", relief="raised",anchor="center",command=self.count())
		#self.submit_button.grid(row=0,column=2,columnspan=2)

		self.stats = tk.Text(self.result_frame, relief="flat",borderwidth=0, state="disabled",width=50)

		result_scroll = tk.Scrollbar(self.result_frame)
		result_scroll.config(command=self.stats.yview)
		self.stats.config(yscrollcommand=result_scroll.set)
		self.stats.grid(row=1,column=0,columnspan=3)
		result_scroll.grid(row=1,column=3,sticky="NS")

root = tk.Tk()
app = App(root)
root.mainloop()
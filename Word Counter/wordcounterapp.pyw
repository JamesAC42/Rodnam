#!/usr/bin/python

import tkinter as tk

class App(object):
	def __init__(self, master, **kwargs):

		self.master = master
		self.set_title()
		self.set_text_box_frame()
		self.set_result_frame()
		self.create_text_box()
		self.create_result_box()

	def set_title(self):

		self.title_frame = tk.Frame(self.master,width=100)
		self.title_frame.grid(row=0,column=0,columnspan=2)
		self.title = tk.Label(self.title_frame,text="PyWord Counter",font=("Times",16))
		self.title.grid(row=0,column=0)

	def set_text_box_frame(self):

		self.text_frame = tk.Frame(self.master, width=70,height=25)
		self.text_frame.grid(row=1,column=0)

	def set_result_frame(self):

		self.result_frame=tk.Frame(self.master,width=30,height=25)
		self.result_frame.grid(row=1,column=1)

	def create_text_box(self):

		self.textbox = tk.Text(self.text_frame, height = 25, width = 70, wrap = 'word',font=("Times",11))
		vertscroll = tk.Scrollbar(self.text_frame)
		vertscroll.config(command=self.textbox.yview)
		self.textbox.config(yscrollcommand=vertscroll.set)
		self.textbox.grid(column=0, row=0)
		vertscroll.grid(column=1, row=0, sticky='NS')

	def create_result_box(self):

		self.words_label = tk.Label(self.result_frame, text="Words: ", relief="flat",width=15,anchor="center")
		self.words_label.grid(row=0,column=0)
		self.words  = tk.Label(self.result_frame,text="0",relief="flat",width=15,anchor="center")
		self.words.grid(row=0,column=1,columnspan=2)

		self.stats = tk.Text(self.result_frame, relief="flat",borderwidth=0, state="disabled",width=30)

		result_scroll = tk.Scrollbar(self.result_frame)
		result_scroll.config(command=self.stats.yview)
		self.stats.config(yscrollcommand=result_scroll.set)
		self.stats.grid(row=1,column=0,columnspan=2)
		result_scroll.grid(row=1,column=2,sticky="NS")



root = tk.Tk()
app = App(root)
root.mainloop()
#!/usr/bin/python

import tkinter as tk
from wordcountermod import *

class App(object):
	def __init__(self, master, **kwargs):

		self.master = master

		self.words_font = ("Sans-Serif",13,"bold")
		self.textbox_font = ("Times",11)

		self.set_menu()
		self.set_frames()
		self.set_title()
		self.set_textbox()
		self.set_results()

	def set_menu(self):
		self.menubar = tk.Menu(self.master)
		self.file_menu = tk.Menu(self.menubar,tearoff=0)
		self.file_menu.add_command(label="Save",command=self.save_text)
		self.file_menu.add_command(label="Open",command=self.open_text)
		self.file_menu.add_separator()
		self.file_menu.add_command(label="Exit",command=self.master.quit)

		self.menubar.add_cascade(label="File",menu=self.file_menu)

		self.master.config(menu=self.menubar)

	def set_frames(self):
		self.title_frame = tk.Frame(self.master)
		self.title_frame.grid(row=0,column=0,columnspan=3)

		self.pref_frame = tk.Frame(self.master)
		self.pref_frame.grid(row=3,column=0,columnspan=4,rowspan=2)

		self.text_frame = tk.Frame(self.master)
		self.text_frame.grid(row=4,column=0,columnspan=2)

		self.result_frame=tk.Frame(self.master)
		self.result_frame.grid(row=4,column=2)

	def set_title(self):
		self.title = tk.Label(self.title_frame,text="PyWord Counter",font=("Verdana",16),anchor="center",height=2)
		self.title.grid(row=0,column=0,columnspan=4,rowspan=3)

	def set_textbox(self):

		def count(event):
			inputs = self.textbox.get("1.0","end-1c")
			ordered, amount = count_words_in_string(inputs)
			stats_string = return_stats_string(ordered,40,justify="right")
			self.words.config(text=str(amount))
			self.stats.config(state="normal")
			self.stats.delete('1.0',"end-1c")
			self.stats.insert('1.0',stats_string)
			self.stats.config(state="disabled")

		self.textbox = tk.Text(self.text_frame,wrap = 'word',font=self.textbox_font)
		self.textbox.bind("<Key>",count)
		vertscroll = tk.Scrollbar(self.text_frame)
		vertscroll.config(command=self.textbox.yview)
		self.textbox.config(yscrollcommand=vertscroll.set)
		self.textbox.grid(column=0, row=0)
		vertscroll.grid(column=1, row=0, sticky='NS')

	def set_results(self):

		self.words_label = tk.Label(self.result_frame, text="Words: ", relief="flat",anchor="w",height=2,font=self.words_font)
		self.words_label.grid(row=0,column=0,columnspan=2)
		self.words  = tk.Label(self.result_frame,text="0",relief="flat",anchor="w",height=2,font=self.words_font)
		self.words.grid(row=0,column=2,columnspan=2)

		self.stats = tk.Text(self.result_frame, relief="flat",borderwidth=0, state="disabled",width=50)
		result_scroll = tk.Scrollbar(self.result_frame)
		result_scroll.config(command=self.stats.yview)
		self.stats.config(yscrollcommand=result_scroll.set)
		self.stats.grid(row=1,column=0,columnspan=3)
		result_scroll.grid(row=1,column=3,sticky="NS")

	def change_font_family(self):
		pass

	def change_font_size(self):
		pass

	def change_font_color(self):
		pass

	def toggle_superscripts(self):
		pass

	def change_justification(self):
		pass

	def change_left_margin(self):
		pass

	def change_right_margin(self):
		pass

	def change_line_spacing(self):
		pass

	def save_text(self):
		pass

	def open_text(self):
		pass

root = tk.Tk()
root.wm_title("PyWord Counter")
app = App(root)
root.mainloop()
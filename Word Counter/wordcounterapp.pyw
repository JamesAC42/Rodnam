#! python3

import tkinter as tk
from tkinter import filedialog
from wordcountermod import *
from os.path import basename

class App(object):
	def __init__(self, master, **kwargs):

		self.master = master

		self.set_menu()
		self.set_frames()
		self.set_preferences()
		self.set_textbox()
		self.set_pref_line()
		self.set_title()
		self.set_results()


	def set_menu(self):
		self.menubar = tk.Menu(self.master)
		self.file_menu = tk.Menu(self.menubar,tearoff=0)
		self.file_menu.add_command(label="Save",command=self.save_text)
		self.file_menu.add_command(label="Open",command=self.open_text)
		self.file_menu.add_separator()
		self.file_menu.add_command(label="Exit",command=self.master.quit)

		self.edit_menu = tk.Menu(self.menubar,tearoff=0)
		self.edit_menu.add_command(label="Clear",command=self.clear_text)
		self.edit_menu.add_command(label="Copy",command=self.copy_text)
		self.edit_menu.add_command(label="Cut",command=self.cut_text)
		self.edit_menu.add_command(label="Paste",command=self.paste_text)

		self.menubar.add_cascade(label="File",menu=self.file_menu)
		self.menubar.add_cascade(label="Edit",menu=self.edit_menu)

		self.master.config(menu=self.menubar)

	def set_frames(self):
		self.title_frame = tk.Frame(self.master)
		self.title_frame.grid(row=0,column=0,columnspan=4,rowspan=3)

		self.pref_frame = tk.Frame(self.master)
		self.pref_frame.grid(row=3,column=0,columnspan=4)

		self.text_frame = tk.Frame(self.master)
		self.text_frame.grid(row=4,column=0,columnspan=2)

		self.result_frame=tk.Frame(self.master)
		self.result_frame.grid(row=4,column=2)

	def set_title(self):
		self.title = tk.Label(self.title_frame,text="PyWord Counter",font=("Verdana",16),anchor="center",height=2)
		self.title.grid(row=0,column=0)

	def set_preferences(self):
		self.words_font = ("Sans-Serif",13,"bold")

		self.current_font = tk.StringVar(self.master)
		self.current_fontsize = tk.IntVar(self.master)
		self.current_justify = tk.StringVar(self.master)
		self.current_font.set("Times")
		self.current_fontsize.set(11)
		self.current_justify.set("left")

		self.textbox_font = self.current_font.get(),self.current_fontsize.get()

	def set_pref_line(self):
		self.font_option = tk.OptionMenu(self.pref_frame,self.current_font,"Times","Verdana","Courier","Comic Sans MS")
		self.font_size_option = tk.OptionMenu(self.pref_frame,self.current_fontsize,8,11,14,16,18,21,24,29)
		self.justify_option = tk.OptionMenu(self.pref_frame,self.current_justify,"left","right","center")
		self.submit_prefs = tk.Button(self.pref_frame,text="SUBMIT",command=self.configure_prefs,anchor="e")

		self.font_option.grid(row=0,column=0)
		self.font_size_option.grid(row=0,column=1)
		self.justify_option.grid(row=0,column=2)
		self.submit_prefs.grid(row=0,column=3)

	def count(self,event):
		inputs = self.textbox.get("1.0","end-1c")
		ordered, amount = count_words_in_string(inputs)
		stats_string = return_stats_string(ordered,40,justify="right")
		self.words.config(text=str(amount))
		self.stats.config(state="normal")
		self.stats.delete('1.0',"end-1c")
		self.stats.insert('1.0',stats_string)
		self.stats.config(state="disabled")

	def set_textbox(self):

		self.textbox = tk.Text(self.text_frame,wrap = 'word',font=self.textbox_font)
		self.textbox.bind("<Key>",self.count)
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

	def configure_prefs(self):
		self.textbox_font = self.current_font.get(),self.current_fontsize.get(),
		self.textbox.tag_add("a","1.0","end-1c")
		self.textbox.tag_config("a",font=self.textbox_font,justify=self.current_justify.get())

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
		file = filedialog.asksaveasfile(mode="w",defaultextension=".txt")
		if file is None:
			return
		file_string = self.textbox.get("1.0","end-1c")
		file.write(file_string)
		filename = basename(file.name)
		file.close()

		self.master.wm_title("PyWord Counter- " + filename)

	def open_text(self):
		file = filedialog.askopenfile(mode="r")
		file_string = file.read()
		filename = basename(file.name)

		self.textbox.delete('1.0',"end-1c")
		self.textbox.insert('1.0',file_string)

		self.master.wm_title("PyWord Counter- " + filename)

	def clear_text(self):
		self.textbox.delete("1.0","end-1c")

	def copy_text(self):
		pass

	def cut_text(self):
		pass

	def paste_text(self):
		pass

root = tk.Tk()
root.wm_title("PyWord Counter")
app = App(root)
root.mainloop()
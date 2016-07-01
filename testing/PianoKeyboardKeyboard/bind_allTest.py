#! python3

from tkinter import *

def keypress(key):
    print(key, "pressed")


root = Tk()
root.bind("<Return>", lambda event: keypress(key="enter"))
root.bind("a", lambda event: keypress(key="a"))
root.mainloop()
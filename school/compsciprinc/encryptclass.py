__author__ = "james"

import sys
class Crovocrypt:
    def __init__(self,original_pw):
        self.original_pw = original_pw
        self.alphabet = 'abcdefghijklmnopqrstuvwxyz'
    def hash(self):
        pw = self.original_pw.lower()
        spec = list('!@#$%^&*()')
        new = []
        pw = list(pw)
        pw.reverse()
        for letter in range(0, len(pw)):
            new.append(pw[letter])
            new.append(int((self.alphabet.index(pw[letter])) + 1) * 11)
        new = [str(x) for x in new]
        iindex = (int(new[-1]) % 10) - 1
        new.append(spec[iindex])
        if len(new) <= 7:
            wen = [x for x in new]
            wen.reverse()
            new += wen
        return (("".join(new)))
    def encrypt(self):
        pw = self.original_pw.lower()
        new = []
        numbers = list(range(10))
        for letter in pw:
            if letter not in self.alphabet:
                new.append(letter)
            else:
                letterspace = (((self.alphabet.index(letter) + 1) * 26) % 27) - 1
                newletter = self.alphabet[letterspace]
                new.append(newletter)
        return ("".join(new))
    def complicate(self):
        pw = self.original_pw.lower()
        numbers = [str(x) for x in range(10)]
        new = []
        for character in pw:
            if character in numbers:
                new.append(self.alphabet[int(character) - 1])
                new.append(character)
            else:
                new.append(character)
        return ("".join(new))

my_password = Crovocrypt("hotmail")

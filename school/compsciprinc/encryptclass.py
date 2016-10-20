__author__ = "james"

import sys
class Crovocrypt:
    def __init__(self,original_pw):
        self.original = original_pw
        self.updated = ""
        self.alphabet = 'abcdefghijklmnopqrstuvwxyz'
    def hash(self, word=True):
        pw = self.original if word else self.updated
        pw = pw.lower()
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
        self.updated = "".join(new)
        return self.updated
    def encrypt(self,word=True):
        pw = self.original if word else self.updated
        pw = pw.lower()
        new = []
        numbers = list(range(10))
        for letter in pw:
            if letter not in self.alphabet:
                new.append(letter)
            else:
                letterspace = (((self.alphabet.index(letter) + 1) * 26) % 27) - 1
                newletter = self.alphabet[letterspace]
                new.append(newletter)
        self.updated = "".join(new)
        return self.updated
    def complicate(self,word=True):
        pw = self.original if word else self.updated
        numbers = [str(x) for x in range(10)]
        new = []
        for character in pw:
            if character in numbers:
                new.append(self.alphabet[int(character) - 1])
                new.append(character)
            else:
                new.append(character)
        self.updated = "".join(new)
        return self.updated
    def encrypttri(self):
        pw = self.original.lower()
        hashed = self.hash()
        encrypted = self.encrypt(word=False)
        final = self.complicate(word=False)
        return(final)

my_password = Crovocrypt("lschs")
print(my_password.original)
print(my_password.hash())
print(my_password.encrypt(word=False))
print(my_password.complicate(word=False))


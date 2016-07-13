#! python3
#  defineWord - commandline executable to look up a word
#  ¯\_(ツ)_/¯

import requests, bs4, sys, html

word = sys.argv[1]

page = requests.get("http://www.merriam-webster.com/dictionary/" + word)
page.raise_for_status()

soup = bs4.BeautifulSoup(page.text,"html.parser")
main_form = soup.select('.word-attributes .main-attr em')[0].getText()
main_definition = soup.select('.definition-inner-item span')[0].getText()
dict_dict = {}
dict_dict[word] = [html.unescape(main_form),html.unescape(main_definition)]

print("")
print(word + ": ")
print(dict_dict[word][0])
print(dict_dict[word][1])
print("")

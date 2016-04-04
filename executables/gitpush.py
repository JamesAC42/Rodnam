#! python3

import os,sys,time

branch = sys.argv[1]
commitmessage = " ".join(sys.argv[2:])

add = "git add .\n"
commit = "git commit -m \"{}\"\n".format(commitmessage)
push = "git push origin {}\n".format(branch)

process = [add,commit,push]

for step in process:
	print(step)
	os.system(step)
	time.sleep(1)
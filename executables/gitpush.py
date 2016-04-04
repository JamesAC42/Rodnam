#! python3

import os,sys,time

branch = sys.argv[1]
commitmessage = " ".join(sys.argv[2:])

add = "git add ."
commit = "git commit -m \'{}\'".format(commitmessage)
push = "git push origin {}".format(branch)

process = [add,commit,push]

for step in process:
	os.system(step)
	print(step)
	time.sleep(1)


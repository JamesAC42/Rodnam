#! python3

import os,sys,time

branch = sys.argv[1]
commit = " ".join(sys.argv[2:])

os.system("git status")
time.sleep(1)
os.system("git add .")
time.sleep(.5)
os.system("git commit -m \'{}\'".format(commit))
time.sleep(.5)
os.system("git push origin {}".format(branch))


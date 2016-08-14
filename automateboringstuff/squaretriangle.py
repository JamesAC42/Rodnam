count = 6
while count < 10000:
	for i in range(0,round((count**2)/2)):
		if count**2 == ((i*(i+1))/2):
			print("{}; n = {}, m = {}".format(count**2,count,i))
		else:
			continue
	count += 1
			
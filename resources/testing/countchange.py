def countchange(amount):
	cc(amount, 5)

def cc(amount, koc):
	if amount == 0:
		return 1
	elif amount < 0 or koc == 0:
		return 0
	else:
		return (cc(amount, koc-1) + cc(amount - fd(koc), koc))

def fd(koc):
	if koc is 1:
		return 1
	elif koc is 2:
		return 5
	elif koc is 3:
		return 10
	elif koc is 4:
		return 25
	elif koc is 5:
		return 50

print(countchange(100))
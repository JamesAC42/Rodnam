#! python3

def generate_sequence(placeone, placetwo, length):
	a, b = placeone, placetwo
	sequ = [a, b]
	for i in range(0,length-2):
		a, b = b, a + b
		sequ.append(b)
	return sequ

def generate_golden_ratio(placeone, placetwo):
	a, b = placeone, placetwo
	for i in range(1,1000):
		a, b = b, b + a
	ratio = b/a
	return ratio


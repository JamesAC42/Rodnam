#! python3

def generate_sequence(placeone, placetwo, length):
	a, b = placeone, placetwo
	sequ = [a, b]
	for i in range(0,length-2):
		a, b = b, a + b
		sequ.append(b)
	return sequ

def generate_golden_ratio(placeone, placetwo, length):
	a, b = placeone, placetwo
	for i in range(0,length-2):
		a, b = b, b + a
	ratio = b/a
	return ratio

while True:
	start = int(input("a(1): "))
	second = int(input("a(2): "))
	length = int(input("Length: "))

	sequ = generate_sequence(start,second,length)
	ratio = generate_golden_ratio(start,second,length)

	print("\nRatio: {}\n".format(ratio))

	while len(sequ) % 4 != 0:
		sequ.append(" ")

	sequ = [str(i) for i in sequ]
	display = [[sequ[i],sequ[i+1],sequ[i+2],sequ[i+3]] for i in range(0,len(sequ),4)]

	for i in range(0,len(display)):
		print(",  ".join(display[i]))
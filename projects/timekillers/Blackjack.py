import random

#beginning tutorial
for i in range(0,1111):
	tutorial = input('Tutorial?: ')
	if tutorial.lower() == 'yes':
		print ('Blackjack, also known as twenty-one, is the most widely played casino banking game in the world.[1] Blackjack is a comparing card game between a player and dealer, meaning that players compete against the dealer but not against any other players. It is played with one or more decks of 52 cards. The object of the game is to beat the dealer, which can be done in a number of ways: Get 21 points on the players first two cards (called a blackjack), without a dealer blackjack; Reach a final score higher than the dealer without exceeding 21; or Let the dealer draw additional cards until his or her hand exceeds 21. The player or players are dealt an initial two-card hand and add together the value of their cards. Face cards (kings, queens, and jacks) are counted as ten points. A player and the dealer can count their own ace as 1 point or 11 points. All other cards are counted as the numeric value shown on the card. After receiving their initial two cards, players have the option of getting a hit, or taking an additional card. In a given round, the player or the dealer wins by having a score of 21 or by having the highest score that is less than 21. Scoring higher than 21 (called busting or going bust) results in a loss. A player may win by having any final score equal to or less than 21 if the dealer busts. If a player holds an ace valued as 11, the hand is called soft, meaning that the player cannot go bust by taking an additional card; 11 plus the value of any other card will always be less than or equal to 21. Otherwise, the hand is hard.The dealer has to take hits until his or her cards total 17 or more points. (In some casinos the dealer also hits on a "soft" 17, e.g. an initial ace and six.) Players win if they do not bust and have a total that is higher than the dealers. The dealer loses if he or she busts or has a lesser hand than the player who has not busted. If the player and dealer have the same total, this is called a "push" and the player typically does not win or lose money on that hand.')
		break
	elif tutorial.lower() == 'no':
		break
	else:
		print('Type yes or no.')
#start	
def blackjack():
	print('')
	print('Blackjack by James Crovo')
	print('')
	
#actual game
def game():
	#core lists
	suits = ['Hearts','Diamonds','Clubs','Spades']
	faces = ['2','3','4','5','6','7','8','9','10','Jack','Queen','King','Ace']
	deck = []
	
	#Make the deck and shuffle it
	for x in range(len(faces)):
		for n in range(len(suits)):
			card = '{} of {}'.format(faces[x],suits[n])
			deck.append(card)
	print('Shuffling......')
	random.shuffle(deck)
	
	#Your Hand
	your_card1 = random.choice(deck)
	deck.remove(your_card1)
	your_card2 = random.choice(deck)
	deck.remove(your_card2)
	your_hand = your_card1 + ' and ' + your_card2
	print('Your hand: ' + your_hand)
	
	#your total
	your_total = 0
	your_addend1 = 0
	your_addend2 = 0
	zed = 0
	if your_card1[0:2] == '10':
		your_addend1 = 10
		zed = 1
	if your_card1[0:4] == 'Jack' or your_card1[0:4] == 'King' or your_card1[0:5] == 'Queen':
		your_addend1 = 10
		zed = 1
	if your_card1[0:3] == 'Ace':
		for i in range(0,100):
			ace_value = input('Ace 1 or 11?: ')
			if ace_value == '1':
				your_addend1 = 1
				break
			elif ace_value == '11':
				your_addend1 = 11
				break
			else:
				print('Type either 1 or 11')
		zed = 1
	if zed == 0:
		for i in range(2,11):
			if your_card1[0] == str(i):
				your_addend1 = i
				continue
	zed = 0
	if your_card2[0:2] == '10':
		your_addend2 = 10
		zed = 1
	if your_card2[0:4] == 'Jack' or your_card2[0:4] == 'King' or your_card2[0:5] == 'Queen':
		your_addend2 = 10
		zed = 1
	if your_card2[0:3] == 'Ace':
		for i in range(0,100):
			ace_value = input('Ace 1 or 11?: ')
			if ace_value == '1':
				your_addend2 = 1
				break
			elif ace_value == '11':
				your_addend2 = 11
				break
			else:
				print('Type either 1 or 11')
		zed = 1
	if zed == 0:
		for i in range(2,11):
			if your_card2[0] == str(i):
				your_addend2 = i
				continue
	your_total = your_addend1 + your_addend2
	print('Total: {}'.format(your_total))
	
	#Dealer Hand
	dealer_card1 = random.choice(deck)
	deck.remove(dealer_card1)
	dealer_card2 = random.choice(deck)
	deck.remove(dealer_card2)
	dealer_hand = dealer_card1 + ' and ' + dealer_card2
	print('Dealer card: {}'.format(dealer_card1))
	
	#dealer total
	dealer_addend1 = 0
	dealer_addend2 = 0
	dealer_total = 0
	med = 0
	if dealer_card1[0:2] == '10':
		dealer_addend1 = 10
		med = 1
	if dealer_card1[0:4] == 'Jack' or dealer_card1[0:4] == 'King' or dealer_card1[0:5] == 'Queen':
		dealer_addend1 = 10
		med = 1
	if dealer_card1[0:3] == 'Ace':
		monty = [1, 11]
		dealer_addend1 = random.choice(monty)
		med = 1
	if med == 0:
		for i in range(2,11):
			if dealer_card1[0] == str(i):
				dealer_addend1 = i
				continue
	med = 0
	if dealer_card2[0:2] == '10':
		dealer_addend2 = 10
		med = 1
	if dealer_card2[0:4] == 'Jack' or dealer_card2[0:4] == 'King' or dealer_card2[0:5] == 'Queen':
		dealer_addend2 = 10
		med = 1
	if dealer_card2[0:3] == 'Ace':
		if dealer_addend1 > 10:
			dealer_addend2 == 1
		else:
			dealer_addend2 = 11
		med = 1
	if med == 0:
		for i in range(2,11):
			if dealer_card2[0] == str(i):
				dealer_addend2 = i
				continue
	dealer_total = dealer_addend1 + dealer_addend2
	print('The dealer has been dealt.')				
	
	#replay the game function
	def replay():
		for i in range(0,100):
			re = input('Play Again?: ')
			if re.lower() == 'yes':
				blackjack()
				game()
			elif re.lower() == 'no':
				print('Too bad')
				return
			else:
				print('Type yes or no')
	
	#beginning winning scenarios			
	if your_total == 21 and dealer_total == 21:
		print('Draw')
		print('Dealer hand: ' + dealer_hand)
		replay()
	if your_total == 21:
		print('You win! 21 Exactly!')
		print('Dealer hand: ' + dealer_hand)
		replay()
	if dealer_total == 21:
		print('The dealer wins. He received 21 exactly')
		print('Dealer hand: ' + dealer_hand)
		replay()
	if dealer_total > 21:
		print('You win! The dealer exceeded 21!')
		print('Dealer hand: ' + dealer_hand)
		replay()
	if your_total > 21:
		print('You Lose. You went over 21')
		print('Dealer hand: ' + dealer_hand)
		replay()
	
	#game loop
		
	while your_total < 21:
		if dealer_total < 17:
			print('Dealer must take hits until his total exceeds 16')
			his_new = random.choice(deck)
			deck.remove(his_new)
			dealer_hand = dealer_hand + ' and ' + his_new
			print('Dealer has been hit')
			sed = 0
			if his_new[0:2] == '10' or his_new[0:4] == 'Jack' or his_new[0:4] == 'King' or his_new[0:5] == 'Queen':
				his_addend = 10
				sed = 1
			if his_new[0:3] == 'Ace':
				if dealer_total > 10:
					his_addend = 1
				else:
					his_addend = 11
				sed = 1
			if sed == 0:
				for i in range(2,11):
					if his_new[0] == str(i):
						his_addend = i
			dealer_total = dealer_total + his_addend
		if dealer_total > 21:
			print('Dealers hand exceeds 21. You win')
			print('Dealers hand: ' + dealer_hand)	
			replay()
		if dealer_total == 21:
			print('Dealer was hit exactly 21. He wins.')
			print('Dealers hand: ' + dealer_hand)
			replay()
				
		if dealer_total >= 17:
			print('The dealer passes')
		
		hit_pass = input('Hit or pass?: ')
		if hit_pass.lower() == 'hit':
			your_new = random.choice(deck)
			deck.remove(your_new)
			your_hand = your_hand + ' and ' + your_new
			print('New Card: ' + your_new)
			ded = 0
			if your_new[0:2] == '10' or your_new[0:4] == 'Jack' or your_new[0:4] == 'King' or your_new[0:5] == 'Queen':
				new_addend = 10
				ded = 1
			if your_new[0:3] == 'Ace':
				new_addend = 10
				ded = 1
			if ded == 0:
				for i in range(2,11):
					if your_new[0] == str(i):
						new_addend = i
						continue
			your_total = your_total + new_addend
			print('New Total: {}' .format(your_total))
			continue
		elif hit_pass.lower() == 'pass':
			print('Dealer Hand: ' + dealer_hand)
			if dealer_total > your_total:
				print('The dealer wins! His hand was greater than yours.')
				replay()
			elif dealer_total < your_total:
				print("Your total is higher than the dealer's! You win!")
				replay()
			else:
				print('You and the dealer tied!')
				replay()
				
			continue
		else:
			print('Type either hit or miss.')
				
	if your_total == 21:
		print('You Win! Your total is 21 exactly.')
		print('Dealer hand: ' + dealer_hand)
		replay()
	if your_total > 21:
		print('You Lose. Your hand exceeded 21.')
		print('Dealer hand: ' + dealer_hand)
		replay()
	
blackjack()
game()

#Wikipedia, Wikimedia Foundation 'Blackjack' Copyright 2015

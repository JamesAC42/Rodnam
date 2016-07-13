#!/usr/bin/python3

#multiply matrices

m_one = [[1,2],[3,4]]
m_two = [[4,3],[2,1]]

product = [[None,None],[None,None]]

#[1 2]	[4,3] _	[8,  5]
#[3,4]  [2,1] -	[20,13]

for row in range(0,len(m_one)):
	
first = [99, 89, 79, 69, 59, 49, 39, 29, 19, 9]
second = [8, 7, 6, 5, 4, 3, 2, 1, 0]


def firstHalf():
    count = 0
    for e in first:
        print(e)
        c = 0
        while c < count:
            e += 9
            print(e)
            c += 1
        count += 1


def secondHalf():
    count = 8
    for e in second:
        print(e)
        c = 0
        while c < count:
            e += 9
            print(e)
            c += 1
        count -= 1


topRight = [
    91,
    81,
    92,
    71,
    82,
    93,
    61,
    72,
    83,
    94,
    51,
    62,
    73,
    84,
    95,
    41,
    52,
    63,
    74,
    85,
    96,
    31,
    42,
    53,
    64,
    75,
    86,
    97,
    21,
    32,
    43,
    54,
    65,
    76,
    87,
    98,
    11,
    22,
    33,
    44,
    55,
    66,
    77,
    88,
    99,
    1,
    12,
    23,
    34,
    45,
    56,
    67,
    78,
    89,
    2,
    13,
    24,
    35,
    46,
    57,
    68,
    79,
    3,
    14,
    25,
    36,
    47,
    58,
    69,
    4,
    15,
    26,
    37,
    48,
    59,
    5,
    16,
    27,
    38,
    49,
    6,
    17,
    28,
    39,
    7,
    18,
    29,
    8,
    19,
    9,
]

cellValues = {}

startingSpots = [81, 71, 61, 51, 41, 31, 21, 11, 1, 2, 3, 4, 5, 6, 7, 8, 9]
numEmptyRows = 0
isSelectedCell = False

for index in topRight:
    if index in startingSpots:
        print("At the first cell in a testing row")
        if not isSelectedCell:
            numEmptyRows += 1
            if numEmptyRows == 2:
                print("Done")
        isSelectedCell = False
    cellValues.update({index: (int(input("Value at " + str(index) + ":")))})
    if cellValues[index] != 0:
        isSelectedCell = True

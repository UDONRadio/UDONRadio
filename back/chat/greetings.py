import random

def get_random_greeting():
    greetings = [
        "Wesh !",
        "Salam !",
        "Bien ou bien ?",
        "C' est comment ?",
        "What up booooooy ?"
    ]
    return random.choice(greetings)

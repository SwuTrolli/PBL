import requests
import csv
from os.path import isfile
from pymongo import MongoClient

client = MongoClient('mongodb://trolli:trolli@3.34.185.185', 27017)
db = client.trolli


def bad_word_dict():
    db.trolli.drop()

    with open('욕설파일.csv', 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)

        for row in reader:
            #print(row)
            bad_word = row
            words = []
            word = bad_word.get('욕설')
            #print(word)
            labels = []
            label = bad_word.get('라벨')
            #print(label)
            # 욕설 하나하나 append
            words.append(word)
            # 라벨 하나하나 append
            labels.append(label)



            doc = {
                '욕설': word,
                '라벨': label,

            }

            print(doc)


            db.trolli.insert_one(doc)


    print("야호")


bad_word_dict()
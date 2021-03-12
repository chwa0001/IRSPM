# -*- coding: utf-8 -*-
"""
Spyder Editor

This is a temporary script file.
"""

from surprise import SVD
from surprise.model_selection import cross_validate
import pandas as pd
from surprise import Dataset
from surprise import Reader
import sqlite3
import numpy as np
from collections import defaultdict


def get_top_n(predictions, user_id, n=10):

    # First map the predictions to each user.
    top_n = defaultdict(list)
    bottom_n = defaultdict(list)
    for uid, iid, true_r, est, _ in predictions:
        top_n[uid].append((iid, est))

    # Then sort the predictions for each user and retrieve the k highest and lowest ones.
    for uid, user_ratings in top_n.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        top_n[uid] = user_ratings[:n]
        bottom_n[uid] = user_ratings[-n:]
        
    return top_n[user_id], bottom_n[user_id]

def recommend_exercise(user_id, db , n=10, rating_scale=(1, 10)):

    # conn = sqlite3.connect(db)
    # c = conn.cursor()

    # df = pd.read_sql_query("SELECT * from USER_EXERCISE", conn)
    df = db
    reader = Reader(rating_scale=rating_scale)

    data = Dataset.load_from_df(df[["user_id", "exercise_id", "user_score"]], reader)

    algo = SVD()

    trainingSet = data.build_full_trainset()
    algo.fit(trainingSet)
    
    innertorawid = []
    for innerid in range(0,trainingSet.n_items):
        innertorawid.append(trainingSet.to_raw_iid(innerid))
        
    print(trainingSet.to_raw_iid(0))
    
    testset = trainingSet.build_anti_testset()
    predictions = algo.test(testset)

    top_n, bottom_n = get_top_n(predictions, str(user_id), n=n)
    
    return [iid for (iid, _) in top_n], algo.qi, innertorawid
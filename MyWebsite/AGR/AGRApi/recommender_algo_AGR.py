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
    for innerid in range(0,trainingSet.n_users):
        innertorawid.append(trainingSet.to_raw_uid(innerid))
        
    # print(trainingSet.to_raw_iid(0))
    
    testset = trainingSet.build_anti_testset()
    predictions = algo.test(testset)

    top_n, bottom_n = get_top_n(predictions, str(user_id), n=n)
    
    return [iid for (iid, _) in top_n], algo.pu, innertorawid

from scipy.spatial import distance

def nearestuser(user, n_users, usermatrix):
    user_similarity = np.ndarray((usermatrix.shape[0],2),dtype = object)
    for i_user in range(0,usermatrix.shape[0]):
        user_similarity[i_user][0] = str(int(i_user + 1))
        user_similarity[i_user][1] = distance.euclidean(usermatrix[i_user],usermatrix[user-1])
    user_similarity = user_similarity[user_similarity[:,1].argsort()] 
    
    return user_similarity[1:n_users+1,0]


def recommend_exercise_n_users(user_id_array, db , n=10, rating_scale=(1, 10)):

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
        
    # print(trainingSet.to_raw_iid(0))
    
    testset = trainingSet.build_anti_testset()
    predictions = algo.test(testset)
    
    # calculate average user weights
    average_pu = np.zeros((1,100))    
    for n_user in user_id_array:
        average_pu = np.add(average_pu,algo.pu[n_user-1][:])
    average_pu = average_pu / (len(user_id_array))
    #print(algo.pu[0])
    algo.pu[0] = average_pu
    predictions = algo.test(testset)
    #print(algo.pu[0])
    
    top_n, bottom_n = get_top_n(predictions, str(1), n=n)
    
    return [int(iid) for (iid, _) in top_n]

    # print(algo.pu[0])
    # print(average_pu)
    # # calculate average exercise ratings
    # average_exercise_ratings = np.dot(algo.qi,average_pu.T)
    # print(average_exercise_ratings[0])
    # innertorawid = np.asarray(innertorawid).reshape((-1,1))
    
    # average_exercise_ratings = np.concatenate((innertorawid,average_exercise_ratings),axis=1)
    # print(average_exercise_ratings.shape)
    # average_exercise_ratings = average_exercise_ratings[average_exercise_ratings[:,1].argsort()]
    # print(average_exercise_ratings[0])
    # return average_exercise_ratings[:n]




# information extraction for time series analysis

import pandas as pd
import calendar
from functools import reduce

FILE_PATH = 'data/amazon_data_new.csv'
def read_data(file_path):
    df = pd.read_csv(file_path)
    return df

df = read_data(FILE_PATH)
def popular_category():
    df = read_data(FILE_PATH)
    categories = df.category.unique()
    category_list = {}
    for _, row in df.iterrows():
        if category_list.get(row['category']):
            category_list[row['category']] += 1
        else:
            category_list[row['category']] = 1
    print(category_list)
    
month_mapping = {'01':"January", "02":"February", "03":"March", "04":"April", "05":"May",
                     "06":"June", "07":"July", "08":"August", "09":"September", "10": "October",
                     "11":"November", "12":"December"}

def reviews_by_year():
    reviews_by_month = {}
    for i in range(1, 13):
        reviews_by_month[calendar.month_name[i]] = 0
    for _, row in df.iterrows():
        fdate = row['reviewTime']
        year = fdate.split(' ')
        if reviews_by_month.get(month_mapping[year[0]]):
            reviews_by_month[month_mapping[year[0]]] += 1
        else:
            reviews_by_month[month_mapping[year[0]]] = 1
    df1 = pd.DataFrame(reviews_by_month.items(), columns=['month', 'reviewsCount'])
    df1.to_csv('reviews_by_month.csv', index=False)
    
    
def categories_sale_by_month():
    categories = df.category.unique()
    category_sale_data = {}
    for item in categories:
        category_sale_data[item[:-2]] = {}
    
    for key, val in category_sale_data.items():
        for vals in month_mapping.values():
            val[vals] = 0
        
    for _, row in df.iterrows():
        category = row['category'][:-2]
        fdate = row['reviewTime']
        year = fdate.split(' ')
        category_sale_data[category][month_mapping[year[0]]] += 1
    data = {}    
    for key, _ in category_sale_data.items():
        data[key] = []
    data['month'] = []
    data['monthCode'] = []
    
    for k, v in month_mapping.items():
        data['month'].append(v)
        data['monthCode'].append("MT" + v)
            
    data['visName'] = ["sale in category over months"] * len(month_mapping.values())
    data['visCode'] = ["SCOM"] * len(month_mapping.values())
    for key, val in category_sale_data.items():
        data[key] = []
        for k, v in val.items():
            data[key].append(v)
    df1 = pd.DataFrame(data)
    df1.to_csv('sale_by_categories.csv', index=False)
    
def average_rating_over_the_months():
    categories = df.category.unique()
    average_rating_data ={}
    for item in categories:
        average_rating_data[item[:-2]] = {}
    for _, row in df.iterrows():
        category = row['category'][:-2]
        fdate = row['reviewTime']
        year = fdate.split(' ')
        if average_rating_data[category].get(year[0]):
            average_rating_data[category][year[0]].append(row['overall'])
        else:
            average_rating_data[category][year[0]] = [row['overall']]
            
    for k, v in average_rating_data.items():
        for key, val in v.items():
            v[key] = sum(val)/len(val)
    data = {}    
    for key, _ in average_rating_data.items():
        data[key] = []
    data['month'] = []
    data['monthCode'] = []
    
    for k, v in month_mapping.items():
        data['month'].append(k)
        data['monthCode'].append("MT" + k)
            
    data['visName'] = ["average rating over the months"] * len(month_mapping.values())
    data['visCode'] = ["AROM"] * len(month_mapping.values())
    for key, val in average_rating_data.items():
        data[key] = []
        for k, v in val.items():
            data[key].append(v)
    df1 = pd.DataFrame(data)
    df1.to_csv('average_rating_months.csv', index=False)
    
def no_users_in_each_category():
    categories = df.category.unique()
    no_of_users ={}
    for item in categories:
        no_of_users[item[:-2]] = {}     
    for _, row in df.iterrows():
        category = row['category'][:-2]
        fdate = row['reviewTime']
        year = fdate.split(' ')
        if no_of_users[category].get(year[0]):
            no_of_users[category][year[0]].add(row['reviewerID'])
        else:
            no_of_users[category][year[0]] = {row['reviewerID']}
    for k, v in no_of_users.items():
        for key, val in v.items():
            v[key] = len(val)
            
    data = {}    
    for key, _ in no_of_users.items():
        data[key] = []
    data['month'] = []
    data['monthCode'] = []
    
    for k, v in month_mapping.items():
        data['month'].append(k)
        data['monthCode'].append("MT" + k)
            
    data['visName'] = ["no of user in each category"] * len(month_mapping.values())
    data['visCode'] = ["NOUC"] * len(month_mapping.values())
    for key, val in no_of_users.items():
        data[key] = []
        for k, v in val.items():
            data[key].append(v)
            
    df1 = pd.DataFrame(data)
    df1.to_csv('no_of_users_months.csv', index=False)
     

def concat_data():
    df1 = pd.read_csv('average_rating_months.csv')
    df2 = pd.read_csv('sale_by_categories.csv')
    df3 = pd.read_csv('no_of_users_months.csv')
    d = [df1, df2, df3]
    df = pd.concat(d)
    df.to_csv('amazon_vis_data.csv', index=False)        
# reviews_by_year()
# average_rating_over_the_months()
# categories_sale_by_month() 
# popular_category()
# no_users_in_each_category()
# concat_data()
        

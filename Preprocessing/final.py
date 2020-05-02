import pandas as pd
import numpy as np
import nltk
from nltk.corpus import stopwords 
from nltk.stem.porter import PorterStemmer
from nltk.stem import SnowballStemmer, WordNetLemmatizer
from nltk import sent_tokenize, word_tokenize, pos_tag
#from wordcloud import WordCloud
import matplotlib.pyplot as plt
import json
import nltk.data
from cleaning import cleanText
import calendar
#nltk.download('punkt')
#nltk.download('stopwords')
def create_word_cloud(mnt, sentiment):
    dic={}
    df_mnt = df_cat.loc[df['month']==int(mnt)]
    #df_brand_sample = df_brand.sample(frac=0.1)
    word_cloud_collection = ''
    
    if sentiment == 1:
        df_reviews = df_mnt[df_mnt["Sentiment"]==1]["summary"]
        
    if sentiment == 0:
        df_reviews = df_mnt[df_mnt["Sentiment"]==0]["summary"]
        
    for val in df_reviews.str.lower():
        val = cleanText(val)
        tokens = nltk.word_tokenize(val)
        tokens = [word for word in tokens if word not in stopwords.words('english')]
        for words in tokens:
            dic[words] = dic.get(words,0)+1
            word_cloud_collection = word_cloud_collection + words + ' '
    d = sorted(dic.items(), key=lambda x: x[1], reverse = True)
    return (d[:30])
    # wordcloud = WordCloud(max_font_size=50, width=500, height=300).generate(word_cloud_collection)
    # plt.figure(figsize=(20,20))
    # plt.imshow(wordcloud)
    # plt.axis("off")
    # plt.show()


col_list = ['overall','reviewText', 'summary','unixReviewTime', 'category']
df = pd.read_csv('./combined_filtered_with_metadata.csv', usecols = col_list)
df.dropna(inplace=True)
df = df[df['overall']!=3]
#print(set(df['category']))
df['Sentiment'] = np.where(df['overall'] > 3, 1, 0)
df['month'] = pd.DatetimeIndex(df['unixReviewTime']).month


with open('./all_modified.json') as json_file: 
    data = json.load(json_file) 
    new_d = {}
for cat in list(set(df['category'])):
    di = data[cat]
    df_cat = df[df['category']==cat]
    new_m ={}
    for key, v in di.items():
        sen = 1 if v>=0 else 0
        fre = create_word_cloud(key, sentiment=sen)
        new_m[calendar.month_abbr[int(key)]] = fre
    new_d[cat] = new_m

json = json.dumps(new_d)
f = open("wordcloud.json","w")
f.write(json)
f.close()
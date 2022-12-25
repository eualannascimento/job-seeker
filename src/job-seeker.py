# Remove pandas FutureWarnings
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

# Import libs
import os
import re
import json
import pytz
import datetime
import requests
import openpyxl
import pandas as pd
from bs4 import BeautifulSoup

# Import my libs
import modules.filters as filters
import modules.handler as handler
import modules.notion as notion

# Define function to get html from website through webscraping
def website_request(url, site_type):
    if(site_type == 'Workable'):
        #POST request
        page = requests.post(url)
        data = page.json()
    else:
        #GET request
        page = requests.get(url)
        data = BeautifulSoup(page.content, "html.parser")
    return data

# Import companies dataframe and adjust some URLs for requests
company_df = pd.read_csv('src/companies.csv')
company_df.loc[company_df['Site'].str[-1] == '/', 'Site'] = company_df['Site'].str[:-1]
company_df.loc[company_df['Tipo de Site'] == 'Kenoby', 'Site'] = company_df['Site'] + '/position'
company_df.loc[company_df['Tipo de Site'] == 'Workable', 'Site'] = company_df['Site'].apply(lambda x: x.split('/')[-1])
company_df.loc[company_df['Tipo de Site'] == 'Workable', 'Site'] = 'https://apply.workable.com/api/v3/accounts/' + company_df['Site'] + '/jobs'

# Define function to get jobs
def get_array_of_jobs(response, company_name, company_type, site_type, site_url):
    results = []
    if (site_type == 'Gupy'): results = handler.treat_gupy(response, company_name, company_type, site_type, site_url)
    if (site_type == 'Lever'): results = handler.treat_lever(response, company_name, company_type, site_type, site_url)
    if (site_type == 'Greenhouse'): results = handler.treat_greenhouse(response, company_name, company_type, site_type, site_url)
    if (site_type == 'Kenoby'): results = handler.treat_kenoby(response, company_name, company_type, site_type, site_url)
    if (site_type == 'Workable'): results = handler.treat_workable(response, company_name, company_type, site_type, site_url)
    return pd.DataFrame(results)  

# Start collecting jobs
full_job_df = pd.DataFrame()
for n in company_df.index:
    website_response = website_request(company_df['Site'][n], company_df['Tipo de Site'][n])
    jobs = get_array_of_jobs(website_response, company_df['Empresa'][n], company_df['Tipo de Empresa'][n], company_df['Tipo de Site'][n], company_df['Site'][n])
    full_job_df = pd.concat([full_job_df, jobs], ignore_index=True)

# Get now date/time and export dataframe to excel file
now_sao_paulo = pytz.timezone('America/Sao_Paulo').localize(datetime.datetime.now())
now_for_filename = now_sao_paulo.strftime("%Y_%m_%d-%H%M%S")
full_job_df
print(full_job_df)
full_job_df.to_excel(rf'src/results/jobs_{now_for_filename}.xlsx', encoding='utf-8', index=False)
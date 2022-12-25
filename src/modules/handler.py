def treat_gupy(response, company_name, company_type, site_type, site_url):
    job_array = []

    for link in response.select('[aria-label="Lista de Vagas"] li'):
      for s in link.contents:
        job_title       = s.find_all('div')[1].text.upper()
        job_url         = (site_url + link.find_all('a')[0].get('href')).replace('//job','/job')
        job_location    = s.find_all('div')[2].text.upper()
        job_contract    = s.find_all('div')[3].text.upper()

        job_dict = {
            'company': company_name, 
            'company_type': company_type, 
            'site_type': site_type, 
            'title': job_title, 
            'url': job_url, 
            'location': job_location, 
            'contract': job_contract
        }

        job_array.append(job_dict)

    return job_array

def treat_lever(response, company_name, company_type, site_type, site_url):
    job_array = []

    for link in response.select('body div [class="posting"]'):
        for s in link.contents:
            job_title       = link.find_all('h5')[0].text.upper()
            job_url         = link.find_all('div')[0].find_all('a')[0].get('href')
            job_location    = link.find_all('div')[1].find_all('span')[0].text.upper()
            raw_contract    = link.find_all('div')[1].find_all('span')
            job_contract    = (raw_contract[2].text if (len(raw_contract) == 3) else 'Não informado').upper()

            job_dict = {
                'company': company_name, 
                'company_type': company_type, 
                'site_type': site_type, 
                'title': job_title, 
                'url': job_url, 
                'location': job_location, 
                'contract': job_contract
            }
            
            if job_dict not in job_array:
              job_array.append(job_dict)

    return job_array

def treat_greenhouse(response, company_name, company_type, site_type, site_url):
    job_array = []

    for link in response.select('body div [class="opening"]'):
        job_title       = link.find_all('a')[0].text.upper()
        job_url         = ('https://boards.greenhouse.io/' + link.find_all('a')[0].get('href')).replace('//job','/job')
        job_location    = link.find_all('span')[0].text.upper()
        job_contract    = 'Não informado'.upper()

        job_dict = {
            'company': company_name, 
            'company_type': company_type, 
            'site_type': site_type, 
            'title': job_title, 
            'url': job_url, 
            'location': job_location, 
            'contract': job_contract
        }

        job_array.append(job_dict)

    return job_array

def treat_kenoby(response, company_name, company_type, site_type, site_url):
    job_array = []

    for link in response.select('a'):
      if (link.get('data-title') != None):
        job_title       = link.get('data-title').upper()
        job_url         = link.get('href')
        job_location    = link.get('data-city').upper()
        job_contract    = 'Não informado'.upper()

        job_dict = {
            'company': company_name, 
            'company_type': company_type, 
            'site_type': site_type, 
            'title': job_title, 
            'url': job_url, 
            'location': job_location, 
            'contract': job_contract
        }

        job_array.append(job_dict)

    return job_array

def treat_workable(response, company_name, company_type, site_type, site_url):
    job_array = []

    site_name_attribute = site_url.replace('/jobs','').split('/')[-1]

    for i in response['results']:
        job_id          = i['id']
        job_title       = i['title']
        job_url         = rf"https://apply.workable.com/{site_name_attribute}/j/{i['shortcode']}"
        job_location    = rf"{i['location']['city']} / {i['location']['country']}"
        job_contract    = ('Trabalho Remoto' if (i['remote'] == True) else 'Presencial').upper()
        job_department  = i['department']

        job_dict = {
            'company': company_name, 
            'company_type': company_type, 
            'site_type': site_type, 
            'title': job_title, 
            'url': job_url, 
            'location': job_location, 
            'contract': job_contract
        }

        job_array.append(job_dict)

    return job_array
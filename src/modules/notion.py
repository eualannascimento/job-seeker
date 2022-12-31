import requests
import json

url = "https://api.notion.com/v1/databases"
token = ''

payload = {
    "parent": {
        "type": "page_id",
        "page_id": "07509c51fae94e8dbf587c4371bcab32",
    },
    "title": [{"type": "text", "text": {"content": "oiiii"}}],
    "properties": {
        "Grocery item": {
            "id": "fy:{",
            "type": "title",
            "title": {}
        },
        "Price": {
            "id": "dia[",
            "type": "number",
            "number": {
                "format": "dollar"
            }
        },
        "Last ordered": {
            "id": "]\\R[",
            "type": "date",
            "date": {}
        }
    }
}


headers = {
    "accept": "application/json",
    "Notion-Version": "2022-06-28",
    "content-type": "application/json",
    "Authorization": "Bearer " + token
}

#response = requests.post(url, json=payload, headers=headers)
#print(response.text)

#data['object']
#data['results']
#data['next_cursor']
#data['has_more']
#data['type']
#data['page']
def get_notion_database_to_df(database_id):
    has_more = True
    json_files = []
    body = { }

    while has_more == True:
        response = requests.post(rf'https://api.notion.com/v1/databases/{database_id}/query', json=body, headers=headers)
        data = response.json()
        has_more = data['has_more']
        next_cursor = data['next_cursor']
        body = { "start_cursor": next_cursor }
        json_files.append(data['results'])

    json_concat = pd.DataFrame()
    for n in range(len(json_files)):
        json_file_df = pd.DataFrame(json_files[n])  
        json_concat_df = pd.concat([json_concat_df, json_file_df], ignore_index=True)

    return json_concat_df
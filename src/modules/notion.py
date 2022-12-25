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
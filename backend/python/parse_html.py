import sys
from bs4 import BeautifulSoup

file_path = sys.argv[1]

with open(file_path, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
for tag in soup(['script', 'style', 'nav', 'footer']):
    tag.decompose()

print(soup.get_text(separator='\n').strip())

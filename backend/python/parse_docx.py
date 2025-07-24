import sys
from docx import Document

file_path = sys.argv[1]
doc = Document(file_path)
text = ''

for para in doc.paragraphs:
    text += para.text + '\n'

print(text.strip())

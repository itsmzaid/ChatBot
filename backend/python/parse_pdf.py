import sys
import PyPDF2

file_path = sys.argv[1]

with open(file_path, 'rb') as file:
    reader = PyPDF2.PdfReader(file)
    text = ''
    for page in reader.pages:
        text += page.extract_text() + '\n'

print(text.strip())

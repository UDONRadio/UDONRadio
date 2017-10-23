# tarlyfm_api
requires: python3

run:
python3 -m venv env && 
source env/bin/activate &&
pip3 install -r requirements.txt &&
python3 manage.py makemigrations &&
python3 manage.py migrate &&
python3 manage.py runserver &&

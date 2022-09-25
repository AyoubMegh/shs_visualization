FROM python:3.10.4-slim-buster
WORKDIR /flask_visualization_RDFLIB
ADD . /flask_visualization_RDFLIB
RUN pip install -r requirements.txt
CMD ["python","app.py"]
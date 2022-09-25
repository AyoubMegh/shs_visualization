from flask import Flask, render_template, request, send_file
import pandas as pd
import rdflib
import csv
import os
app = Flask(__name__)
graph = rdflib.Graph()
data_graph = graph.parse(os.path.join(os.getcwd(),"data","shs.nt"), format='nt')

IMG_FOLDER = os.path.join('static', 'img')
app.config['IMAGES'] = IMG_FOLDER

@app.route('/',methods = ['POST','GET'])
def index():
    if request.method == 'POST':
        query = request.form['query_data']
        try:
            results = data_graph.query(query)
            if(len(results) != 0):
                result_path = os.path.join(os.getcwd(),"static","temp","temp.csv")
                results.serialize(destination=result_path,format="csv")
                result_file = pd.read_csv(result_path)
                result_file_to_html = result_file.to_html()
                return render_template('index.html',csv_file = result_file_to_html , org_query = query , isDownlodable = True)
            else:
                message_warning = "Absence de résultats !"
                print(message_warning)
                return render_template('index.html', org_query = query , isDownlodable = False, warning = message_warning)
        except Exception as e:
            message_error = "Une erreur est survenue !\n"+str(e)
            return render_template('index.html',org_query = query , isDownlodable = False , error = message_error)
    else:
        return render_template('index.html',isDownlodable = False)


@app.route('/model',methods = ['GET'])
def model():
    schema = os.path.join(app.config['IMAGES'], 'schema.svg')
    return render_template('model.html', schema = schema)

@app.route('/about',methods = ['GET'])
def about():
    ensma = os.path.join(app.config['IMAGES'], 'Logo_ISAE-ENSMA.svg.png')
    poitiers = os.path.join(app.config['IMAGES'], 'Logo_Univ_Poitiers.svg')
    tlemcen = os.path.join(app.config['IMAGES'], 'Logo_Univ_Tlemcen.png')
    lias = os.path.join(app.config['IMAGES'], 'Logo-LIAS.png')
    return render_template('about.html', ensma = ensma , poitiers = poitiers , tlemcen = tlemcen, lias= lias)

@app.route('/sample',methods = ['GET'])
def sample():
    return render_template('sample.html')

@app.route('/download',methods = ['GET'])
def download():
    result_path = os.path.join(os.getcwd(),"static","temp","temp.csv")
    return send_file(result_path, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True,host='0.0.0.0')


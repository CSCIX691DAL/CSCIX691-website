import json
from datetime import datetime
from airflow.models import DAG
from airflow.providers.http.sensors.http import HttpSensor
from airflow.providers.http.operators.http import SimpleHttpOperator
from airflow.operators.python import PythonOperator

def save_students(ti):
    #xcom pull the return values from the get_posts tasks (which has return value of the users in json)
    students = ti.xcom_pull(task_ids=['get_users'])
    #then write it to this path 
    with open('\opt\airflow\data\posts.json', 'w') as f:
        json.dump(students[0], f)
        

#the dag Extracts the posts.json data from the website that we connected to
#dummy rest API for testing
with DAG(
    dag_id='api_dag',
    schedule_interval='@daily',
    start_date=datetime(2022, 7, 7),
    catchup=False
) as dag:


    task_is_api_active= HttpSensor(
        task_id='is_api_active',
        #establishing the HTTP connection
        http_conn_id = 'api_users',
        endpoint = 'users/'
    )


#Getting the response (and convert to json objects)
    task_get_users= SimpleHttpOperator(
        task_id='get_users',
        http_conn_id='api_users',
        endpoint='users/',
        #Uses GET METHOD to get the response 
        method='GET',
        #tells the task to get the text of the api response and convert it to json
        response_filter=lambda response: json.loads(response.text),
        #Log to console
        log_response=True
    )

    #Now we want to access this data
    # airlfow automatically stores return data into its xcoms


    #If you go to admin>xcom return values it will be the json objects
   
   #This task will save the return value locally 
    task_save = PythonOperator(task_id='save_users',
        python_callable=save_students
    )
    
    task_is_api_active >> task_get_users >> task_save
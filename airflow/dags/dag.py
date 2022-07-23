from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator
from datetime import datetime
from random import randint
from airflow.operators.dummy import DummyOperator

import json
from datetime import datetime
from airflow.models import DAG
from airflow.providers.http.sensors.http import HttpSensor
from airflow.providers.http.operators.http import SimpleHttpOperator
from airflow.operators.python import PythonOperator

from tenacity import retry

def save_students(ti):
    #xcom pull the return values from the get_posts tasks
    students = ti.xcom_pull(task_ids=['get_grades'])
    #specify the path we want to write to 
    with open('\opt\airflow\data\posts.json', 'w') as f:
        json.dump(students[0], f)

#Defining the functions for the tasks
def hire():
    return 'Hire TA'

def add():
    return 'Add Projects'

def enroll():
    return 'Enroll Student'

def assignStudents():
    return 'Assign Students to projects'

def assignLead():
    return 'Assign Team Leader'

def assignTAs():
    return 'Assign TAs to projects'


#Tasks that have a "grade" > random int between 0-100 
def _training_model(ti):
    mark = randint(0, 100)*0.05
    ti.xcom_push(key='grade', value=mark)
    

def _planning_phase(ti):
    mark = randint(0, 100)*0.05
    ti.xcom_push(key='grade', value=mark)


def quizzes(ti):
    mark = randint(0,100)*0.05
    ti.xcom_push(key='grade', value=mark)

def _student_questionnaire(ti):
    mark = randint(0,100)*0.05
    ti.xcom_push(key='grade', value=mark)

def _iterations(ti):
    mark = randint(0,100)*0.50
    ti.xcom_push(key='grade', value=mark)

def closing(ti):
    mark = randint(0,100)*0.30
    ti.xcom_push(key='grade', value=mark)

def _final_grades(ti):
    mark = ti.xcom_pull(key='grade', task_ids=['Project_Plan', 'Team_Charter', 'NDA', 'planning', 'student_Q', 'quizzes', '_iterations', 'closing_document'])
    
    
    #choose pass or fail
    finalgrade = sum(mark)
    if finalgrade>60:
        return 'pass'
    else :
        return 'fail'  


#DAG code
with DAG("CSCIX691_process",
start_date=datetime(2021, 7 ,2), 
schedule_interval='@daily', 
catchup=False) as dag:

    training_model_tasks = [
        PythonOperator(
            task_id=f"{model_id}",
            python_callable=_training_model,
            op_kwargs={
            "model": model_id
            }
        ) for model_id in ['Project_Plan', 'Team_Charter', 'NDA']
    ]

    task_is_api_active= HttpSensor(
        task_id='is_api_active',
        #establishing the HTTP connection
        http_conn_id = 'api_users',
        endpoint = 'users/'
    )


#Getting the response (and convert to json objects)
    task_get_users= SimpleHttpOperator(
        task_id='get_grades',
        http_conn_id='api_users',
        endpoint='users/',
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
    task_save = PythonOperator(task_id='save_grades',
        python_callable=save_students
    )

    TA_Hire = PythonOperator(task_id='hire',
                         python_callable=hire)

    Add_Projects = PythonOperator(task_id='add',
                         python_callable=add)
                     
    Enroll_Student = PythonOperator(task_id='enroll',
                         python_callable=enroll)

                         
    Assign_Student = PythonOperator(task_id='assign',
                         python_callable=assignStudents)

    Student_Questionnaire = PythonOperator(task_id='student_Q',
                            python_callable=_student_questionnaire)
    
    Assign_Leader = PythonOperator(task_id='assign_TeamLead',
                            python_callable=assignLead)

        
    Assign_TA = PythonOperator(task_id='assignTA',
                            python_callable=assignTAs)

    Planning_Phase = PythonOperator(task_id='planning',
                            python_callable=_planning_phase)
    
    Quizzes = PythonOperator(task_id='quizzes',
                            python_callable=quizzes)

    Retro = PythonOperator(task_id='it1_retrospective',
                            python_callable=quizzes)  

    Retro2 = PythonOperator(task_id='it2_retrospective',
                            python_callable=quizzes)                                                 
    
    Retro3 = PythonOperator(task_id='it3_retrospective',
                            python_callable=quizzes)

    Retro4 = PythonOperator(task_id='it4_retrospective',
                            python_callable=quizzes)

    Retro0 = PythonOperator(task_id='it0_retrospective',
                            python_callable=quizzes)   

    Iteration0 = [
        PythonOperator(
            task_id=f"it0{model_id}",
            python_callable=_iterations,
            op_kwargs={
            "model": model_id
            }
        ) for model_id in ['_Planning_Meeting', '_Standup', '_Review_Meeting']
    ] 

    Iteration1 = [
        PythonOperator(
            task_id=f"it1{model_id}",
            python_callable=_iterations,
            op_kwargs={
            "model": model_id
            }
        ) for model_id in ['_Planning_Meeting', '_Standup', '_Review_Meeting']
    ] 



    Iteration2 = [
        PythonOperator(
            task_id=f"it2{model_id}",
            python_callable=_iterations,
            op_kwargs={
            "model": model_id
            }
        ) for model_id in ['_Planning_Meeting', '_Standup', '_Review_Meeting']
    ]

    
    Iteration3 = [
        PythonOperator(
            task_id=f"it3{model_id}",
            python_callable=_iterations,
            op_kwargs={
            "model": model_id
            }
        ) for model_id in ['_Planning_Meeting', '_Standup', '_Review_Meeting']
    ]

    Iteration4 = [
        PythonOperator(
            task_id=f"it4{model_id}",
            python_callable=_iterations,
            op_kwargs={
            "model": model_id
            }
        ) for model_id in ['_Planning_Meeting', '_Standup', '_Review_Meeting']
    ] 


    Closing_Document = PythonOperator(task_id='closing_document',
                            python_callable=closing)



    final_grades = BranchPythonOperator(
        task_id='final_grades',
        python_callable = _final_grades
    )

    _pass = DummyOperator(
        task_id='pass'
    )

    _fail = DummyOperator(
        task_id = 'fail'
    )

    




#Dependencies 
TA_Hire >> Add_Projects >> Enroll_Student >> Student_Questionnaire >> Assign_Student >> Assign_Leader >> Assign_TA >> training_model_tasks >> Planning_Phase >> Quizzes >> Iteration0 >> Retro0 >> Iteration1 >> Retro >> Iteration2 >> Retro2 >> Iteration3 >> Retro3 >> Iteration4 >> Retro4 >> Closing_Document >>   task_is_api_active >> task_get_users >> task_save >> final_grades >> [_pass,_fail]


from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator
from datetime import datetime
from random import randint
from airflow.operators.dummy import DummyOperator

from tenacity import retry

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
    mark = randint(0, 100)*0.01
    ti.xcom_push(key='grade', value=mark)
    

def _planning_phase(ti):
    mark = randint(0, 100)*0.9
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
    mark = randint(0,100)*0.3
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
start_date=datetime(2021, 6 ,14), 
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
    
    Assign_Leader = PythonOperator(task_id='assignLead',
                            python_callable=assignLead)

        
    Assign_TA = PythonOperator(task_id='assignTA',
                            python_callable=assignTAs)

    Planning_Phase = PythonOperator(task_id='planning',
                            python_callable=_planning_phase)
    
    Quizzes = PythonOperator(task_id='quizzes',
                            python_callable=quizzes)
    
    Iterations = PythonOperator(task_id='_iterations',
                            python_callable=_iterations)

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
TA_Hire >> Add_Projects >> Enroll_Student >> Student_Questionnaire >> Assign_Student >> Assign_Leader >> Assign_TA >> training_model_tasks >> Planning_Phase >> Quizzes >> Iterations >> Closing_Document >> final_grades >> [_pass,_fail]


from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator
from datetime import datetime
from random import randint

from tenacity import retry

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

#Final grades task
def _final_grades(ti):
    #grade variable gets the "grade" of starting docs, and all other "grades"
    weighted_marks_sum = ti.xcom_pull(task_ids=[
'Project_Plan',
'Team_Charter',
'NDA'
#Calculating final grade
]) + ti.xcom_pull(task_id='_student_questionnaire') + ti.xcom_pull(task_id='planning') + ti.xcom_pull(task_id='quizzes') + ti.xcom_pull(task_id='_iterations') + ti.xcom_pull(task_id='closing_document')


#Final grade determines a pass or fail
    if weighted_marks_sum > 60:
        return 'pass'
    return 'fail'

#Define Tasks
def _starting_docs(model):
    #returns random number as the "grade"
    return randint(0, 100)

def _planning_phase():
    return randint(0,100)

def quizzes():
    return randint(0,100)

def _student_questionnaire():
    return randint(0,100)

def _iterations():
    return randint(0,100)

def closing():
    return randint(0,100)

#DAG code
with DAG("my_dag",
start_date=datetime(2021, 6 ,14), 
schedule_interval='@daily', 
catchup=False) as dag:

    #Tasks 7,8,9
    training_model_tasks = [
        PythonOperator(
            task_id=f"{model_id}",
            python_callable=_starting_docs,
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
#Final Grades task
    Final_Grades = BranchPythonOperator(
        task_id="Final_Grades_Release",
        python_callable=_final_grades
    )
    pass_course = BashOperator(
        task_id="pass",
        bash_command="echo 'Passed the course'"
    )
    fail_course = BashOperator(
        task_id="fail",
        bash_command=" echo 'Must retake the course'"
    )

TA_Hire >> Add_Projects >> Enroll_Student >> Student_Questionnaire >> Assign_Student >> Assign_Leader >> Assign_TA >> training_model_tasks >> Planning_Phase >> Quizzes >> Iterations >> Closing_Document >> Final_Grades >> [pass_course, fail_course]


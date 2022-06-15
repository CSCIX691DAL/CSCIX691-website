# #Code from: Adnan Siddiqi 
# #https://towardsdatascience.com/getting-started-with-apache-airflow-df1aa77d7b1b


# from airflow import DAG
# from airflow.operators.python import PythonOperator, BranchPythonOperator
# from airflow.operators.bash import BashOperator
# from datetime import datetime


# def greet():
#     print('Writing in file')
#     with open('path/to/file/greet.txt', 'a+', encoding='utf8') as f:
#         now = datetime.now()
#         t = now.strftime("%Y-%m-%d %H:%M")
#         f.write(str(t) + '\n')
#     return 'Greeted'
# def respond():
#     return 'Greet Responded Again'


# default_args = {
#     'owner': 'airflow',
#     'start_date': dt.datetime(2022, 6, 8, 13, 55, 00),
#     'concurrency': 1,
#     'retries': 0
# }

# #Creating the Airflow DAG object
# #Has two params: dag_id and start_date

# #dag_id: unique identifier of the DAG accross all DAGs

# #start_date: defines the date at which your DAG starts being scheduled 
# with DAG('my_simple_dag',
#          default_args=default_args,
#          schedule_interval='*/10 * * * *',
#          ) as dag:
#     opr_hello = BashOperator(task_id='say_Hi',
#                              bash_command='echo "Hi!!"')

#     opr_greet = PythonOperator(task_id='greet',
#                                python_callable=greet)
#     opr_sleep = BashOperator(task_id='sleep_me',
#                              bash_command='sleep 5')

#     opr_respond = PythonOperator(task_id='respond',
#                                  python_callable=respond)
# opr_hello >> opr_greet >> opr_sleep >> opr_respond

from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator
from datetime import datetime
from random import randint
def _choosing_best_model(ti): 
    accuracies = ti.xcom_pull(task_ids=[
'training_model_A',
'training_model_B',
'training_model_C'
])

    if max(accuracies) > 8: 
        return 'accurate'
        return 'inaccurate'

def _training_model(model):return randint(1, 10)
with DAG("my_dag",
start_date=datetime(2021, 6 ,14), 
schedule_interval='@daily', 
catchup=False) as dag: training_model_tasks = [
PythonOperator(
task_id=f"training_model_{model_id}",
python_callable=_training_model,
op_kwargs={
"model": model_id
}
) for model_id in ['A', 'B', 'C']
]
choosing_best_model = BranchPythonOperator(
task_id="choosing_best_model",
python_callable=_choosing_best_model
)
accurate = BashOperator(
task_id="accurate",
bash_command="echo 'accurate'"
)
inaccurate = BashOperator(
task_id="inaccurate",
bash_command=" echo 'inaccurate'"
)
training_model_tasks >> choosing_best_model >> [accurate, inaccurate]
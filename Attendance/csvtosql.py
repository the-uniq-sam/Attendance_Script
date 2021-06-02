import pandas as pd
import pyodbc

# Import CSV
data = pd.read_csv ('atten.csv')   
df = pd.DataFrame(data, columns= ['Name','email','student_id'])

# Connect to SQL Server
conn = pyodbc.connect('Driver={SQL Server};'
                      'Server=RON\SQLEXPRESS;'
                      'Database=TestDB;'
                      'Trusted_Connection=yes;')
cursor = conn.cursor()

# Create Table
cursor.execute('CREATE TABLE people_info (Name nvarchar(50), Country nvarchar(50), Age int)')

# Insert DataFrame to Table
for row in df.itertuples():
    cursor.execute('''
                INSERT INTO TestDB.dbo.people_info (Name, Country, Age)
                VALUES (?,?,?)
                ''',
                row.Name, 
                row.e_mail,
                row.student_id,
                )
conn.commit()
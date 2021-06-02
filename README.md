# Attendance_Script

Guide:-

In Attendance folder, we have bash script named as a.sh which is meant to be run on a server to take the attendance of students which allows only 2 requests, 1 for get and 1 for put from an IP.

We need to run this script with two arguments:-
1st argument for code and second for times in seconds.
Example:- bash a.sh sam 120

It will open a port on machine for 120s of the format http://ip:3000/sam

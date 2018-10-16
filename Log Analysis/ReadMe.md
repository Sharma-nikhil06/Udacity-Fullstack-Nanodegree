LOG ANALYSIS PROJECT

AIM:
1. To find out the most popular 3 articles.
2. To find out which authors get the most page views on 
   their articles.
3. On which days, there were more than 1% requests that 
   led to errors.

How to run the program ?

First of all, there are some files and softwares required for the project.
- Download vagrant from https://www.vagrantup.com/downloads.html    
  and install it with default settings.
- We'll need a VirtualBox to run linux using vagrant. Get it     
  from https://www.virtualbox.org/wiki/Downloads.
- Download the config and setup files of vagrant.
- Download the database(zip file) on which operations are  
  performed. Get it from udacity github.
- Unzip it and extract the file in vagrant directory.
- Download the project.
- Unzip it and extract all files in vagrant directory.

Next,
- Open terminal in your system and change the directory 
  to vagrant.
- Run command "vagrant up" to setup Virtual Machine.
- Now, run "vagrant ssh" to login.
- cd into the directory cd /vagrant/Project
- Run psql -d news -f newsdata.sql for loading the data.

To Run, 
- Run the command "python log_analysis.py".

You can check the sample output in text file named "Sample Output" that you can find in this very folder.

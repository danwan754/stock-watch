## Stock tracker

Make watchlists of stocks to track. Create an account to save your watchlists.
<br>
<br>
<br>

### Dev Setup

In **.env.txt**:
1. Rename **.env.txt** to **.env**
2. Modify the values as needed, especially the database log in credentials

\
On the commandline:
1. Start up MySQL server:
> sudo service mysql start

2. Connect to MySQL in commandline:
> mysql --user=*username/root* --password=*password*

3. Copy the SQL commands found in **.db.sql** and paste into commandline.
  These commands will:  
    i. create database\
    ii. create tables: Users, Stocks, Lists, List_items
    
The *Stocks* database table needs to be populated with data from:\
*https://cloud.iexapis.com/stable/ref-data/symbols?token=API_KEY* \
Only the company name and ticker will be stored in the table.


#### Start Dev Mode
Server:\
In the root directory: */stock-watch*\
run: *npm start*
\
\
Client:\
In another terminal in: */stock-watch/client*\
run: *npm start*

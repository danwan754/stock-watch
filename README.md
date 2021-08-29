## Stock tracker

Make watchlists of stocks to track. Create an account to save your watchlists.
<br>\
demo: https://stock-watch-demo.herokuapp.com/
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

3. Copy the SQL commands found in **/mysql/.db.sql** and paste into commandline.
  These commands will:  
    i. create database\
    ii. create tables: Users, Stocks, Lists, List_items
    
4. The *Stocks* database table needs to be populated with data of all company names and ticker symbols.\
  i. In **/routers/stockRouter.js**, go to the end of the file and uncomment the */dbupdate* route.\
  ii. In the browser, go to this path: http://localhost:5000/dbupdate \
  iii. After several seconds, the page will display message: "Finished updating database".\
  iV. Comment out the */dbupdate* route like it was originally.\

The app is now ready to be used.

#### Start Dev Mode
Server:\
In the root directory: */stock-watch*\
run: *npm start*
\
\
Client:\
In another terminal in: */stock-watch/client*\
run: *npm start*

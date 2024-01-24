# HPE-Communication-Script
An appscript project created to cycle through a Google spreadsheet, create a new workbook, attach it to an email, and send that email to the intended recipient in bulk. Highly specific use case. Cannot add spreadsheet data; sensitive info.

1. Main spreadsheet contains three tabs: 
	a. Sender Sheet tab
	b. Inventory Template
	c. Example Template

2. The sender sheet tab contains 5 columns; three with relevant data:
	a. A list of schools
	b. teacher emails
	c. principal emails

3. Script loops through the Sender Sheet tab and groups teachers and principals together according to school

4. Generates a new Google Sheets workbook with name "[School name] + 'Physical Education Equipment Inventory'"
	a. Copies Inventory Template and Example Template to new workbook
	b. "[School name] + 'Physical Education Equipment Inventory'" is written to cell A1 within the Inventory Template tab
	c. Saves workbooks to google drive folder
	d. Shares workbooks with school group

5. Generates an email with inventoryEmail.html and adds a link containing a link to the workbook

6. Sends email to proper recipients

Script parses through 222 schools and 599 email recipients

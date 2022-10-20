import csv
#define csv path
csvpath = "PyBank/Resources/budget_data.csv"

rows = 0
total = 0
last_profit = 0
tot_changes = 0
num_changes = 0 
# expect to be 85

max_change = -99999999999
min_change = 999999999
min_month = ""
max_month = ""

with open(csvpath, encoding='utf-8') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')

    # Read the header row first (skip this step if there is now header)
    csv_header = next(csvreader)
    print(f"CSV Header: {csv_header}")

    # Calculate the total months & total
    for row in csvreader:
        # print(# of rows)
        rows += 1
        #print(#total profit & loss)
        total +=int(row[1])
        #print the change, expected 85 changes as the first one does not have 1 before it
        
        if row !=1:
                last_profit = int(row[1])
        else:
                change = int(row[1]) - last_profit
                tot_changes += change
                num_changes += 1
        
        # reset
                last_profit = int(row[1])

                
    
        

  
print(rows)
print(total)
print(num_changes)
print(tot_changes / num_changes)


# The total number of months included in the dataset

# The net total amount of "Profit/Losses" over the entire period

# The changes in "Profit/Losses" over the entire period, and then the average of those changes

# The greatest increase in profits (date and amount) over the entire period

# The greatest decrease in profits (date and amount) over the entire period
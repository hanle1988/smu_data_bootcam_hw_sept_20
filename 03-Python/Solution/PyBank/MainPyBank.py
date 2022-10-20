import csv

csvpath = "budget_data.csv"

rows = 0
total = 0

last_profit = 0
tot_changes = 0
num_changes = 0
max_change = -999999999999999
min_change = 999999999999999999
min_month = ""
max_month = ""

with open(csvpath, encoding='utf-8') as csvfile:

    # CSV reader specifies delimiter and variable that holds contents
    csvreader = csv.reader(csvfile, delimiter=',')

    # Read the header row first (skip this step if there is now header)
    csv_header = next(csvreader)
    #print(f"CSV Header: {csv_header}")

    for row in csvreader:
        print(row)
        rows += 1
        total +=int(row[1])

        #calculate the changes
        if rows !=1:
            change = int(row[1]) - last_profit
            tot_changes +=change
            num_changes += 1

            if (change > max_change):
                    max_change = change
                    max_month = row[0]
            elif (change < min_change):
                    min_change = change
                    min_month = row[0]
            else:
                pass

        #reset
        last_profit = int(row[1])

    
print("Financial Analysis")
print("--------------------------------------------------------------")
print(f"Total Month: {rows}")
print(f"Total: ${total}")
#print(num_changes)
print(f"Average Change: {tot_changes/ num_changes}")
print(f"Greatest Increase in Profits: {max_month} (${max_change})")
print(f"Greatest Decrease in Profits: {min_month} (${min_change})")



output = f"""Financial Analysis
---------------------------------
Total Month: {rows}
Total: ${total}
Average Change: ${round(tot_changes/ num_changes,2)}
Greatest Increase in Profits: {max_month} (${max_change})
Greatest Decrease in Profits: {min_month} (${min_change})

"""
print(output)
with open('pybank_analysis.txt',"w") as f:
    f.write(output)



# The total number of months included in the dataset

# The net total amount of "Profit/Losses" over the entire period

# The changes in "Profit/Losses" over the entire period, and then the average of those changes

# The greatest increase in profits (date and amount) over the entire period

# The greatest decrease in profits (date and amount) over the entire period
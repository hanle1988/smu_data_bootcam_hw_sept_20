import csv

csvpath = "PyPoll/Resources/election_data.csv"

rows = 0


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
      


print(row)


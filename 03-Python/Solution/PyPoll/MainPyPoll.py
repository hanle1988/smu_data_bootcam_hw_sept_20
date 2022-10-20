import csv
#define csv path
csvpath = "PyPoll/election_data.csv"


#define variables
rows = 0
votes = {}
#winner = max(votes.key=votes.get)


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
        candidate = row[2]
        
        # dictionary for candidate    
        if candidate in votes.keys():
         votes[candidate]+=1
        else:
            votes[candidate]=1
        

#print
print ("Election Results")
print("------------------------")
print(f"Total Votes: {rows}")
print(votes)
print("------------------------")
for x in votes.keys():
    #print(f"x": {votes[x]} {100*votes[x]/rows})
   print(x)
   print(votes[x])
   print(f"{100*votes[x]/rows}%")
winner = max(votes, key=votes.get)
print(winner)

   
output = f"""Election Results
---------------------------------
Total Votes: {rows}
---------------------------------"""
for x in votes.keys():
   details =f""" 
   {x}: {round(100*votes[x]/rows,2)}% {votes[x]} """
   output += details

name_of_winner = f"""
------------------------------
Winner: {winner}
------------------------------"""

output += name_of_winner


print(output)

#create new file
with open('pypoll_analysis.txt',"w") as f:
    f.write(output)

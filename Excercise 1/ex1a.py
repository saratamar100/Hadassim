import heapq
SIZE_SECTION = 50_000

def find_n_common (file_path, N):
    frequency = dict()
    file = open(file_path,"r")
    while True:
        section = file.read(SIZE_SECTION) + file.readline()
        if section == "":
            break
        lines = section.split("\n")
        if(len(lines[-1])>2):
            print("ERROR!!!!!!!!!!!!!!!!!!!!")
        freq = dict()
        for line in lines[:-1]:
            _ , date, hour, _ , error = line.split()
            if error not in freq:
                freq[error] = 0
            else:
                freq[error] += 1
        for f in freq:
            if f in frequency:
                frequency[f] += freq[f]
            else:
                frequency[f] = freq[f]

    top_n_keys = heapq.nlargest(N, frequency, key=frequency.get) 
    return list(map(lambda k: [k, frequency[k]], top_n_keys) )






res = find_n_common("logs.txt",5)
print(res)

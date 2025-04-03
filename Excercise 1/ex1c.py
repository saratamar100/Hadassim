import datetime
from collections import defaultdict
import math

from ex1b import read_file, calculate_avarages


def split_file(file_path):
    file = open(file_path, "r")
    file.readline()
    files = dict()
    for line in file:
        time, value = line[:-1].split(",")
        date, hour = time.split(" ")
        DD, MM, YYYY = date.split("/")
        hh, mm = hour.split(":")
        # if not (len(DD) == len(MM) == len(hh) == len(mm) == 2) or len(YYYY) != 4:
        #     raise Exception("Time format exception")
        date = datetime.datetime(int(YYYY), int(MM), int(DD), int(hh), 0)
        if date not in files:
            pass
            file_section = open("Sections/"+date.strftime("%m_%d_%Y_%H") + ".csv", "w")
            file_section.write("timestamp,value\n")
            file_section.write(line)
            files[date] = file_section
        else:
            files[date].write(line)
            pass
    for f in files:
        files[f].close()
    file.close()
    return files


files = split_file("time_series.csv")
''''
standardized_data = dict()
for file in files:
    standardized_data.update(read_file(file))
calculate_avarages(standardized_data)
'''

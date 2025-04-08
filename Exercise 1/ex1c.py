import datetime
from collections import defaultdict
import math

from ex1b import read_file, calculate_avarages, parse_date_value


def split_file(file_path):
    file = open(file_path, "r")
    file.readline()
    files = dict()
    for line in file:
        try:
            time, value = line[:-1].split(",")
            date, value = parse_date_value(time, value)
            # date = date.replace(minute=0)
            file_name = date.strftime("%m_%d_%Y_%H")
            if file_name not in files:
                file_section = open("Sections/" + file_name + ".csv", "w")
                file_section.write("timestamp,value\n")
                file_section.write(line)
                files[file_name] = file_section
            else:
                files[file_name].write(line)
        except:
            pass
    for f in files:
        files[f].close()
    file.close()
    return files.keys()


files = split_file("time_series.csv")
standardized_data = dict()
for file in files:
    standardized_data.update(read_file("Sections/" + file + ".csv"))
calculate_avarages(standardized_data)

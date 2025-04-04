import datetime
from collections import defaultdict
import math


def parse_date_value(timestamp, value):
    value = float(value)
    if math.isnan(value):
        raise Exception("Value format exception")
    date, hour = timestamp.split(" ")
    DD, MM, YYYY = date.split("/")
    hh, mm = hour.split(":")
    if not (len(DD) == len(MM) == len(hh) == len(mm) == 2) or len(YYYY) != 4:
        raise Exception("Time format exception")
    date = datetime.datetime(int(YYYY), int(MM), int(DD), int(hh), int(mm))
    return date,value


def read_file(file_path):
    file = open(file_path, "r")
    file.readline()
    all_data = dict()
    for line in file:
        try:
            time, value = line[:-1].split(",")
            date,value = parse_date_value(time,value)
            if date not in all_data:
                all_data[date] = value
        except:
            pass
    return all_data


def calculate_avarages(data):
    dictionary = defaultdict(lambda: [0, 0])
    for record in data:
        dictionary[record.replace(minute=0)][0] += data[record]
        dictionary[record.replace(minute=0)][1] += 1

    file = open("averages.csv", "w")
    file.write("hour,average value")
    for time in dictionary:
        average = dictionary[time][0] / dictionary[time][1]
        file.write("\n{0},{1}".format(time, average))
    file.close()


standardized_data = read_file("time_series.csv")
calculate_avarages(standardized_data)

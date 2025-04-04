import datetime

import pyarrow.parquet as pq

from ex1b import parse_date_value, calculate_avarages, read_file

pf = pq.ParquetFile('time.parquet')
for df in pf.iter_batches():
    df_batch = df.to_pandas()
    files = dict()
    for index, row in df_batch.iterrows():
        try:
            date, value = parse_date_value(row[0].row[1])
            # date = date.replace(minute=0)
            file_name = date.strftime("%m_%d_%Y_%H")
            if file_name not in files:
                file_section = open("Sections/" + file_name + ".csv", "w")
                file_section.write("timestamp,value\n")
                file_section.write(",".join(row))
                files[file_name] = file_section
            else:
                files[file_name].write(",".join(row))
        except:
            pass
    for f in files:
        files[f].close()
    #
    # files = split_file("time_series.csv")
standardized_data = dict()
for file in files:
    standardized_data.update(read_file("Sections/" + file + ".csv"))
calculate_avarages(standardized_data)

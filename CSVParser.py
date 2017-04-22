import os
import sys
import marshal
import webbrowser
import FileHelper
import re

srcFilePath = "CardsData.csv"
destFilePath = "Cards.json"

def main():

    destFile = open(destFilePath, "w")
    destFile.write("")

    lineIndex = 0
    headerList = []

    toWrite = "{ \"cards\":["

    with open(srcFilePath) as f:
        for line in f:
            if lineIndex == 0:
                # this is the first line of the file, aka headers
                headers = line.split(",")
            else:
                # this is an actual data line
                print(" - Processing card %s\r" % lineIndex )
                toWrite += processSlgLine(headers, line)
            lineIndex = lineIndex + 1
    toWrite = toWrite[:-1]
    toWrite += "]}"
    FileHelper.appendLineTo(toWrite, destFilePath, False)
    print("Finished parsing csv file." )

def processSlgLine(headers, line):
    PATTERN = re.compile(r'''((?:[^,"']|"[^"]*"|'[^']*')+)''')
    dataList = PATTERN.split(line)[1::2]

    toWrite = "{"
    index = 0
    for name in headers:
        name = FileHelper.stripnl(name)
        dataContent = FileHelper.stripnl(dataList[index])
        if "chip" in name:
            dataContent = "(" + dataContent + ")"
        if dataContent.startswith('\"'):
            toWrite += "\"{0}\" : {1},".format(name, dataContent)
        else:
            toWrite += "\"{0}\" : \"{1}\",".format(name, dataContent)

        index += 1
    toWrite = toWrite[:-1]
    toWrite += "},"

    return toWrite

main()

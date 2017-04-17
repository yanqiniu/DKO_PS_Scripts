import os
import sys
import marshal
import webbrowser
import FileHelper

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
    toWrite = toWrite[:-3]
    toWrite += "]}"
    FileHelper.appendLineTo(toWrite, destFilePath, False)
    print("Finished parsing csv file." )

def processSlgLine(headers, line):
    dataList = line.split(",")
    toWrite = "\r\n{\r\n"
    index = 0
    for name in headers:
        name = FileHelper.stripnl(name)
        dataContent = FileHelper.stripnl(dataList[index])
        toWrite += "\"{0}\" : \"{1}\",\r\n".format(name, dataContent)
        index += 1
    toWrite = toWrite[:-3]
    toWrite += "\r\n},\r\n"

    return toWrite

main()

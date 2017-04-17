import os
import sys
import marshal
import webbrowser

def appendFileTo(fromfile, tofile):
	ffile = open(fromfile, 'r')
	tfile = open(tofile, "a")
	tfile.write("\r")
	tfile.write(ffile.read())

def appendLineTo (line, tofile, doSwitchLine):
	tfile = open(tofile, "a")
	if doSwitchLine == True:
		tfile.write('%s\r\n' % line)
	else:
		tfile.write('%s' % line)

# remove next line symbol at end of line
def stripnl(line):
	toRet = line.replace("\r\n", "")
	return toRet

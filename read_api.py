import serial
import struct

def hexToFloat(hex):
    #print(hex)
    return struct.unpack('!f', bytes.fromhex(hex))[0]

device = serial.Serial(port='/dev/ttyUSB0',
                       baudrate=57600)
try:
    device.open()
except:
    print("error")

while device.isOpen():
    line = str(device.readline())
    #line = line[12:-9]
    print(line)
    #qx = hexToFloat(line[0:8])
    #qy = hexToFloat(line[8:16])
    #qz = hexToFloat(line[16:24])
    #qw = hexToFloat(line[24:32])
    #print(qx)
    #print(qy)
    #print(qz)
    #print(qw)


device.close()

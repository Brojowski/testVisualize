from flask import Flask, redirect
import socketio
import eventlet
import time

sio = socketio.Server()
app = Flask(__name__)


@app.route('/')
def hello_world():
    return redirect('/static/index.html')


@sio.on('connect')
def connect(sid, environ):
    print('connect', sid)
    sio.emit('test', {'qx': 0, 'qy': 1, 'qz': 0, 'qw': .1})


@sio.on('updated')
def next(_, data):
    time.sleep(1)
    if data > 5:
        data = 0
    sio.emit('test', {'qx': 0, 'qy': 1, 'qz': 0, 'qw': data + .2})

@sio.on('disconnect')
def disconnect(sid):
    print('disconnect', sid)


if __name__ == '__main__':
    app = socketio.Middleware(sio, app)
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
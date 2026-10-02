"""Servidor local del laboratorio. La versión pública solo muestra evidencia guardada."""
import json
import threading
from http.server import SimpleHTTPRequestHandler,ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import core
import rag
LOCK=threading.Lock()
class Handler(SimpleHTTPRequestHandler):
    def __init__(self,*args,**kwargs):super().__init__(*args,directory=str(core.ROOT/'static'),**kwargs)
    def respond(self,status,data):
        content=json.dumps(data,ensure_ascii=False,allow_nan=False).encode()
        self.send_response(status);self.send_header('Content-Type','application/json; charset=utf-8');self.send_header('Content-Length',str(len(content)));self.end_headers();self.wfile.write(content)
    def do_GET(self):
        path=urlsplit(self.path).path
        if path=='/config.json':return self.respond(200,{'local':True})
        if path=='/results.json':
            try:return self.respond(200,core.read_json(core.ROOT/'reports/latest.json'))
            except FileNotFoundError:return self.respond(503,{'error':'Evaluación aún pendiente.'})
        super().do_GET()
    def do_POST(self):
        if self.path!='/api/infer':return self.respond(404,{'error':'Ruta inexistente.'})
        origin=self.headers.get('Origin')
        if origin and origin not in ['http://127.0.0.1:8092','http://localhost:8092']:return self.respond(403,{'error':'Origen no permitido.'})
        try:
            size=int(self.headers.get('Content-Length','0'))
            if not 0<size<=10000:raise ValueError('Tamaño inválido.')
            data=json.loads(self.rfile.read(size))
            if set(data)!={'text','engine','mode'} or data['mode'] not in ['none','rag']:raise ValueError('Contrato inválido; oracle solo en evaluación.')
            core.validate_text(data['text'])
            if data['engine'] not in core.MODELS:raise ValueError('Motor inválido.')
            if not LOCK.acquire(blocking=False):return self.respond(409,{'error':'Hay una inferencia local en curso.'})
            try:result=rag.safe_infer(data['engine'],data['text'],data['mode'])
            finally:LOCK.release()
            return self.respond(200 if result['ok'] else 502,result)
        except (ValueError,TypeError,KeyError):return self.respond(400,{'error':'Petición inválida.'})
if __name__=='__main__':
    print('Decision Lab RAG: http://127.0.0.1:8092/ (solo local)',flush=True)
    ThreadingHTTPServer(('127.0.0.1',8092),Handler).serve_forever()

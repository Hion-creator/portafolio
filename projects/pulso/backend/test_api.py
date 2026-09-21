import httpx
import pytest
from fastapi.testclient import TestClient
import main

client = TestClient(main.app)
TICKET = {"name":"Ana", "subject":"Problema con mi cuenta", "message":"No puedo acceder desde esta mañana."}


def test_validated_response(monkeypatch):
    async def fake(_):
        return '{"summary":"Acceso bloqueado", "category":"Acceso", "priority":"Alta", "reply":"Hola, ¿qué error aparece?"}'
    monkeypatch.setattr(main, "call_ollama", fake)
    response = client.post("/api/analyze", json=TICKET)
    assert response.status_code == 200
    assert response.json()["source"] == "ollama"
    assert response.json()["priority"] == "Alta"


@pytest.mark.parametrize("content", ['not json','{}','{"summary":"x","category":"Inventada","priority":"Alta","reply":"x"}'])
def test_invalid_model_output(monkeypatch, content):
    async def fake(_): return content
    monkeypatch.setattr(main, "call_ollama", fake)
    assert client.post("/api/analyze", json=TICKET).status_code == 503


def test_ollama_offline(monkeypatch):
    async def fake(_): raise httpx.ConnectError("offline")
    monkeypatch.setattr(main, "call_ollama", fake)
    assert client.post("/api/analyze", json=TICKET).status_code == 503


@pytest.mark.parametrize("changes", [{"message":"short"},{"name":" "},{"subject":"x"*141},{"message":"x"*3001},{"unexpected":True}])
def test_invalid_input(changes):
    assert client.post("/api/analyze", json={**TICKET,**changes}).status_code == 422

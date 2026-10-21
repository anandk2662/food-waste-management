from fastapi import FastAPI
from contextlib import asynccontextmanager
from db.connection import pool

@asynccontextmanager
async def lifespan(app:FastAPI):
    print("database open")
    pool.open()
    yield
    pool.close()
    print('database closed')

app= FastAPI(lifespan=lifespan)

@app.get("/health")
def status():
    return "ok"

@app.get("/health/db")
def database_health():
    with pool.connection() as conn:
        result = conn.execute("SELECT 1").fetchone()
    
    return {"database":result[0]}

@app.get("/items/{item}")
def get_item(id:int,item:int):
    print(type(id),type(item))
    return {"item":item,"id":id}

from fastapi import FastAPI, Body, HTTPException, status
from typing import Optional
from pydantic import BaseModel
# uvicorn blog:app --reload --host=0.0.0.0 --port=8000
app = FastAPI()

@app.get('/blog')
def index(limit = 10, published: bool = True, sort: Optional[str] = None):
    if published:
        return {'data' : f'{limit} published blogs from database'}
    else:
        return {'data' : f'{limit} blogs from database'}

@app.get('/blog/unpublished')
def unpublished():
    return {'data' : 'all unpublished blogs'}

@app.get('/blog/{id}')
def show(id: int):
    #fetch blog with id = id
    return {'data' : id}

#fastapi 에서 다이나믹 라우팅 기능을 쓴 뒤 ('/blog/unpublished') 와 같이 쓰면 오류가 발생한다.

@app.get('/blog/{id}/comment')
def comments(id):
    return {'data' : {'1', '2'}}

class Blog(BaseModel):
    title: str
    body: str
    published: Optional[bool]=False

@app.post('/blog')
def create_blog(blog: Blog):
    return {'data' : f"blog is created title as{request.title}"}

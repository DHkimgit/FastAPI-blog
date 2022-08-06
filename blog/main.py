from fastapi import FastAPI
from . import models
from .database import engine
from .routers import blog, user, authentication

app = FastAPI()
# uvicorn blog.main:app --reload --host=0.0.0.0 --port=8000
# https://fastapi.tiangolo.com/ko/advanced/sql-databases-peewee/
# https://docs.sqlalchemy.org/en/13/orm/query.html?highlight=update#sqlalchemy.orm.query.Query.update
# https://www.youtube.com/watch?v=7t2alSnE2-I

# 데이터베이스가 존재하지 않을 경우 만드는 명령어. 
models.Base.metadata.create_all(bind=engine)

app.include_router(blog.router)
app.include_router(user.router)
app.include_router(authentication.router)


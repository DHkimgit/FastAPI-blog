from sqlalchemy import create_engine

SQLALCHAMY_DATABASE_URL = 'sqlite:///./blog.db'
# https://www.youtube.com/watch?v=7t2alSnE2-I
engine = create_engine(SQLALCHAMY_DATABASE_URL, connect_args = ({"check_same_thread" : False}))
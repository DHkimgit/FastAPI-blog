from typing import List
from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, database, models
from ..hashing import Hash
from ..repository import user

router = APIRouter(tags = ['users'], prefix="/user")
get_db = database.get_db

@router.post('/', response_model = schemas.ShowUser, tags = ['users'])
def create_user(request: schemas.User, db: Session = Depends(get_db)):
    return user.create(request, db)

@router.get('/{id}', response_model = schemas.ShowUser, tags = ['users'])
def get_user(id: int, db: Session = Depends(get_db)):
    return user.show(id, db)

@router.get('/', response_model=List[schemas.ShowUserList], tags=['users'])
def get_user_list(db: Session = Depends(get_db)):
    return user.showAllUser(db)
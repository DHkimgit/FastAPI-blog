import os
from typing import Union, Optional, List
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response, JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from pymongo import MongoClient
from urllib.parse import quote_plus
from bson import ObjectId
# uvicorn main:app --reload --host=0.0.0.0 --port=8000

app = FastAPI()
username = quote_plus('dukekim001')
password = quote_plus('duke0720')
cluster = quote_plus('cluster0')
mongo_url = 'mongodb+srv://' + username + ':' + password + '@' + cluster + '.xsd9v.mongodb.net/?retryWrites=true&w=majority'
client = MongoClient(mongo_url)
db = client.college

print(client.list_database_names())

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate()
    
    @classmethod
    def validate(dls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)
    
    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type='string')

class StudentModel(BaseModel):
    id: PyObjectId = Field(default_factory = PyObjectId, alias = '_id')
    name: str = Field(...)
    email: EmailStr = Field(...)
    course: str = Field(...)
    gpa: float = Field(..., le = 4.0)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Jane Doe",
                "email": "jdoe@example.com",
                "course": "Experiments, Science, and Fashion in Nanophotonics",
                "gpa": "3.0",
            }
        }

class UpdateModel(BaseModel):
    name: Optional[str]
    email: Optional[EmailStr]
    course: Optional[str]
    gpa: Optional[float]

    class config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Jane Doe",
                "email": "jdoe@example.com",
                "course": "Experiments, Science, and Fashion in Nanophotonics",
                "gpa": "3.0",
            }
        }

@app.post("/", response_description = "Add New Student", response_model = StudentModel)
async def create_student(student: StudentModel = Body(...)):
    student = json_encoders(student)
    new_student = await db["students"].insert_one(student)
    create_student = await db["students"].find_one({"_id": new_student.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_student)

@app.get("/", response_description="List all students", response_model=List[StudentModel])
async def list_students():
    students = await db["students"].find().to_list(1000)
    return students

@app.get("/{id}", response_description="Get a single student", response_model=StudentModel)
async def show_student(id: str):
    if (student := await db["students"].find_one({"_id": id})) is not None:
        return student

    raise HTTPException(status_code=404, detail=f"Student {id} not found")

@app.put("/{id}", response_description="Update a student", response_model=StudentModel)
async def update_student(id: str, student: UpdateStudentModel = Body(...)):
    student = {k: v for k, v in student.dict().items() if v is not None}

    if len(student) >= 1:
        update_result = await db["students"].update_one({"_id": id}, {"$set": student})

        if update_result.modified_count == 1:
            if (
                updated_student := await db["students"].find_one({"_id": id})
            ) is not None:
                return updated_student

    if (existing_student := await db["students"].find_one({"_id": id})) is not None:
        return existing_student

    raise HTTPException(status_code=404, detail=f"Student {id} not found")

@app.delete("/{id}", response_description="Delete a student")
async def delete_student(id: str):
    delete_result = await db["students"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Student {id} not found")

# https://github.com/mongodb-developer/mongodb-with-fastapi



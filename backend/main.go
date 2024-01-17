package main

import (
	"context"
	"log"
	"net/http"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// employee model - id, name, email, phone, designation, salary
type Employee struct {
   ID           primitive.ObjectID  `json:"_id,omitempty" bson:"_id,omitempty"`
   Name         string               `json:"name,omitempty" bson:"name,omitempty"`
   Email        string               `json:"email,omitempty" bson:"email,omitempty"`
   Phone        string               `json:"phone,omitempty" bson:"phone,omitempty"`
   Designation  string               `json:"designation,omitempty" bson:"designation,omitempty"`
   Salary       string               `json:"salary,omitempty" bson:"salary,omitempty"`
}

// adding mongodb connection name and url
const (
	ConnectionString="mongodb://localhost:27017"
	DbName="emp"
	CollectionName="employee"
)	

var db *mongo.Database

func init(){
	clientOptions := options.Client().ApplyURI(ConnectionString)
	client, err := mongo.NewClient(clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	err = client.Connect(context.Background())
	if err != nil {
		log.Fatal(err)
	}
	db=client.Database(DbName)
}

func main() {
	r:=gin.Default()
	// to allow for CORS
	r.Use(cors.Default())
	//Routes 
	r.GET("/api/employees", getEmployees)
	r.GET("/api/employees/:id", getEmployeeById)
	r.POST("/api/employees", createEmployee)
	r.PUT("/api/employees/:id", updateEmployee)
	r.DELETE("/api/employees/:id", deleteEmployee)
	//run server
	r.Run(":8000")
}

func getEmployees(c *gin.Context){
	cursor, err := db.Collection(CollectionName).Find(context.Background(), bson.D{})
	if err != nil {
		log.Fatal(err)
	}
	var employees []Employee
	// iterate their cursor
	for cursor.Next(context.Background()){
		var employee Employee
		if err := cursor.Decode(&employee); err != nil {
			log.Fatal(err)
		}
		employees=append(employees, employee)
	}
     cursor.Close(context.Background())
	c.JSON(http.StatusOK, employees)
}

// getEmployeeById
func getEmployeeById(c *gin.Context){
   id, _ := primitive.ObjectIDFromHex(c.Param("id"))
   var employee Employee
   if err := db.Collection(CollectionName).FindOne(
	context.Background(), Employee{ID: id}).Decode(&employee);
	err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, employee)
}

// create employee
func createEmployee(c *gin.Context){
	var employee Employee
	if err := c.BindJSON(&employee);
	err != nil {
		log.Fatal(err)
	}
	// insert employee
	result, err := db.Collection(CollectionName).InsertOne(context.Background(), employee)
	if err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, result)
}

// update EmployeeById
func updateEmployee(c *gin.Context){
	// get id from param
	id, _ := primitive.ObjectIDFromHex(c.Param("id"))
	// from client employee
	var employee Employee
	if err := c.BindJSON(&employee); 
	err != nil {
		log.Fatal(err)
	}
	// update employee - phone, designation, salary
	update := bson.D{
		{"$set", bson.D{
            {"phone", employee.Phone},
		  {"designation", employee.Designation},
		  {"salary", employee.Salary},
		}},
}
result, err := db.Collection(CollectionName).UpdateOne(context.Background(), Employee{ID: id}, update)
if err != nil {
	log.Fatal(err)
}
c.JSON(http.StatusOK, result)
}

// delete employee
func deleteEmployee(c *gin.Context){
	// get id from param
	id, _ := primitive.ObjectIDFromHex(c.Param("id"))
	result, err := db.Collection(CollectionName).DeleteOne(context.Background(), Employee{ID:id})
     if err != nil {
		log.Fatal(err)
	}
	c.JSON(http.StatusOK, result)
}
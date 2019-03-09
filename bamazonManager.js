var mysql=require("mysql");
const inquirer=require("inquirer");
var connection = mysql.createConnection({
    host:'localhost',
    port:3306,
    user:'root',
    password:'mysql',
    database: 'bamazon_db'
});
connection.connect(function(err){
// addNewProduct("Beans","Grocery",1,1000);
showTable();
var deptArray=generateDeparments();
console.log(deptArray);
connection.end();
});

function addNewProduct(productName,departmentName,price,quantity){
connection.query("INSERT INTO products SET ?",{
    product_name: productName,
    department_name:departmentName,
    price:price,
    stock_quantity:quantity
},function(err,resp){
    if(err){
        console.error(err);
    }

})
};

function showTable(){
    connection.query("SELECT * FROM products", function(err,response){    
        if(err){
            console.error(err);
        }
        console.log(response);
    })
};
// inquirer.prompt([
// {
//     message:"What would you like to do?",
//     type:"list",
//     choices:["View Products For Sale","View Low Inventory","Add to Inventory","Add New Product"],
//     name:"firstQuestion"
// }
// ]).then(function(response){
//     if(response.firstQuestion==="Add New Product"){
//         inquirer.prompt([{
//             name:"name",
//             message:"What is the name of the product?",
//             type:"input"
//         },{
//             name:"department",
//             message:"What department is this product in?",
//             type:"list",
//             choices:[]
//         },{

//         },{

//         }
    
//     ]).then(function(responseTwo){

//         });
//     }
// });
function generateDeparments(){
    connection.query("SELECT department_name FROM products",function(err,response){
        console.log(response[0].departmentName);
        if(err){
            console.log(err);
        }
        var departmentArray=[];
        for (var i=0;i<response.length;i++){
            if (departmentArray.indexOf(response[i].department_name===-1)){
                departmentArray.push(response[i].department_name);
            }
        }
        return departmentArray;
    })
};
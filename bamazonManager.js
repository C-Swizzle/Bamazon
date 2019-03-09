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
addNewProduct("Beans","Grocery",1,1000);
showTable();
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
        console.table(response);
    })
};
inquirer.prompt([
{
    message:"What would you like to do?",
    type:"list",
    choices:["View Products For Sale","View Low Inventory","Add to Inventory","Add New Product"],
    name:"firstQuestion"
}
]).then(function(response){

});
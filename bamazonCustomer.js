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
    if(err){
        console.log(err);
    }
    // showTable();
    connection.query("SELECT * FROM products", function(err,response){    
        if(err){
            console.error(err);
        }
        console.table(response);
        askAway();
    });
   
});
function showTable(){
    connection.query("SELECT * FROM products", function(err,response){    
        if(err){
            console.error(err);
        }
        console.table(response);
    });
};

function addStock(ID,stock){
    var currentStock;
    var newStock;
    connection.query("SELECT stock_quantity, price FROM products WHERE ?",{id:ID},function(err,response){
        if(err){
            console.log(error);
        }
        // console.log(response[0].stock_quantity);
        currentStock=response[0].stock_quantity;
    newStock=Number(currentStock)-Number(stock);
    // console.log(newStock);
    var totalPrice=Number(stock)*response[0].price;
    if(newStock>=0){
        console.log("Your purchase cost "+totalPrice);
    changeStock(ID,newStock);
    showTable();
        connection.end();
} else{
    console.log("There are not enough of those! Try again!");
    showTable();
    connection.end();
}
    
});

};
function changeStock(ID,stock){
    connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity:stock},{id:ID}],function(err,response){
        if(err){
            console.log(err);
        }
    });
};
function askAway(){
    inquirer.prompt([{message:"What is the ID of the item you would like to purchase?\n",name:"id",type:"input"},
    {message:"How many of that item would you like to buy?\n",name:"quantity",type:"input"}]).then(function(response){
        addStock(response.id,response.quantity);
    });
}
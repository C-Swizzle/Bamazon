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
        console.error(err);
    }
// // addNewProduct("Headphones","Electronics",250,100);

// var depts = generateDeparments();
// setTimeout(throwaway,1000);
var depts=[];
connection.query("SELECT DISTINCT department_name FROM products",function(err,response){
    if(err){
        console.log(err);
    }
    for(var i=0;i<response.length;i++){
        depts.push(response[i].department_name);
    }
});
// console.log(depts);
// setTimeout(askQuestions(),500);
// addInventory(10,1);
// addStock(2,900);
askQuestions(depts);
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
showTable();
})
};

function showTable(){
    connection.query("SELECT * FROM products", function(err,response){    
        if(err){
            console.error(err);
        }
        console.table(response);
    });
    connection.end();
};

function askQuestions(depts){
inquirer.prompt([
{
    message:"What would you like to do?",
    type:"list",
    choices:["View Products For Sale","View Low Inventory","Add to Inventory","Add New Product"],
    name:"firstQuestion"
}
]).then(function(response){

    if(response.firstQuestion==="Add New Product"){
        // var deptArray=generateDeparments();
        inquirer.prompt([{
            name:"name",
            message:"What is the name of the product?",
            type:"input"
        },{
            name:"department",
            message:"What department is this product in?",
            type:"list",
            choices:depts
        },{
            name:"price",
            message:"What is the price of this product?",
            type:"input"
        },{
            name:"quantity",
            message:"What quantity?",
            type:"input"
        }
    
    ]).then(function(responseTwo){
        addNewProduct(responseTwo.name,responseTwo.department,responseTwo.price,responseTwo.quantity);
        });
    }
    if(response.firstQuestion==="View Products For Sale"){
        showTable();

    }
    if(response.firstQuestion==="View Low Inventory"){
        viewLow();

    }
    if(response.firstQuestion==="Add to Inventory"){
        inquirer.prompt([{message:"What item ID would you like to add stock?",name:"id",type:"input"},
{name:"quantity",type:"input",message:"How much stock would you like to add?"}]).then(function(response){
    addStock(response.id,response.quantity);
});
        
    }
    
});

};
// function generateDeparments(){
//     connection.query("SELECT DISTINCT department_name FROM products",function(err,response){
//         if(err){
//             console.log(err);

//         }cle
//         var temp=[];
//         for(var i=0;i<response.length;i++){
//             temp.push(response[i].department_name);
//         }
//         // console.log(temp);
//         return temp;
        
//     })
    
// };
// function throwaway(){
//     console.log(generateDeparments());
// };
function viewLow(){
    connection.query("SELECT * FROM products WHERE stock_quantity < 20",function(err,response){
        if(err){
            console.error(err);
        }
        console.table(response);
    })
    connection.end();
}
// function addInventory(ID,quantity){
//     var newStock;
//     connection.query("SELECT stock_quantity FROM products WHERE ?",{id:ID},function(err,response){
//         if(err){
//             console.log(err);
//         }
//         var start=Number(response[0].stock_quantity);
//         console.log(start);
//         var newStock=Number(start)+Number(quantity);
        
//     });
    // addInvent(newStock,ID);s
// }
// // function addInvent(newquant,ID){
// //     connection.query("UPDATE PRODUCTS SET ? WHERE ?",[{stock_quantity:newquant},{id:ID}],function(err,response){
// //         console.log(err);
// //     })
// }

function addStock(ID,stock){
    var currentStock;
    var newStock;
    connection.query("SELECT stock_quantity FROM products WHERE ?",{id:ID},function(err,response){
        if(err){
            console.log(error);
        }
        // console.log(response[0].stock_quantity);
        currentStock=response[0].stock_quantity;
    newStock=Number(currentStock)+Number(stock);
    // console.log(newStock);
    changeStock(ID,newStock);
    showTable();
    
});

};
function changeStock(ID,stock){
    connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity:stock},{id:ID}],function(err,response){
        if(err){
            console.log(err);
        }
    });
};

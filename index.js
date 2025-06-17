const http=require ('http')
const fs=require ('fs')
const url=require ('url')

http.createServer((req,res)=>{
    let products = JSON.parse(fs.readFileSync('./products.json','utf-8'))
    let URL = url.parse(req.url,true)
    const Query = URL.query;
    
    if(req.method=='GET' && URL.pathname==='/products'){
        if(Query.id==undefined && Query.title==undefined && Query.brand==undefined && Query.category==undefined){
            res.end(JSON.stringify(products));
            console.log("id:1-90 , title: 'iPhone 9 ,iPhone X ,OPPO F19 etc', brand: 'Apple , OPPO , Infinix , HP Pavilion etc', category: 'smartphones , laptops , fragrances , skincare etc'");
        }else if (Query.id!=undefined && Query.title==undefined && Query.brand==undefined && Query.category==undefined){
            let product = products.find((product)=>{
                return product.id==Query.id;
            })
            if (product!==undefined){
                res.end(JSON.stringify(product))
            }else{
                res.end(JSON.stringify({'message':'Product ID is Undefined'}))
            }
        }else if (Query.id==undefined && Query.title!=undefined && Query.brand==undefined && Query.category==undefined){
            let product = products.find((product)=>{
                return product.title==Query.title;
            })
            if (product!==undefined){
                res.end(JSON.stringify(product))
            }else{
                res.end(JSON.stringify({'message':'Product Title is Undefined'}))
            }
        }else if (Query.id==undefined && Query.title==undefined && Query.brand!=undefined && Query.category==undefined){
            let product = products.find((product)=>{
                return product.brand==Query.brand;
            })
            if (product!==undefined){
                res.end(JSON.stringify(product))
            }else{
                res.end(JSON.stringify({'message':'Product Brand is Undefined'}))
            }
        }else if (Query.id==undefined && Query.title==undefined && Query.brand==undefined && Query.category!=undefined){
            let product = products.find((product)=>{
                return product.category==Query.category;
            })
            if (product!==undefined){
                res.end(JSON.stringify(product))
            }else{
                res.end(JSON.stringify({'message':'Product Category is Undefined'}))
            }
        }
    } 
        
    //
        

    
     

}).listen(7002)

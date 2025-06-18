const http=require ('http')
const fs=require ('fs')
const url=require ('url')

http.createServer((req,res)=>{
    let products = JSON.parse(fs.readFileSync('./products.json','utf-8'))
    let URL = url.parse(req.url,true)
    const Query = URL.query;

    res.setHeaders("Access-Control-Allow-Origin", "*");
    res.setHeaders("Access-Control-Allow-Headers", "*");
    res.setHeaders("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

    if(req.method=="OPTIONS"){
        res.end();
    }
    
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
        }else if(req.method=="POST",URL.pathname==='/products'){
            let product = '';
            req.on('data',(chunck)=>{
                product+=chunck;
            })
            req.on('end',()=>{
                let newProduct=JSON.parse(product);
                products.push(newProduct);
                fs.writeFile('/products.json',JSON.stringify(products),(err)=>{
                    if(err){
                        res.end(JSON.stringify({"message":"Error saving product"}));
                    }else{
                        res.end(JSON.stringify({"message":"Product added successfully"}));

                    }
                })
            })
        }else if(req.method=='PUT' && URL.pathname==="/products"){
            let product ='';
            req.on('data',(chunck)=>{
                product+=chunck;
            })
            req.on('end',()=>{
                let updatedProduct =JSON.parse(product)
                let index = products.findIndex((product)=>{
                    return Query.id==product.id;
                })
                if(index!=-1){
                    products[index]=updatedProduct;
                    fs.writeFile('products.json',JSON.stringify(products),(err)=>{
                        if(err){
                            res.end(JSON.stringify({"message":"cannot Update Item"}));
                        }else{
                            console.log(updatedProduct);
                            res.end(JSON.stringify({"message":"Item successfully Updated"}));
                        }
                    })
                }else{
                    res.end(JSON.stringify({"message":"Product ID is Invalid"}))
                }
                
            })
        }else if(req.method=="DELETE",URL.pathname==='/products'){
            let index=products.findIndex((product)=>{
                return Query.id==product.id;
            })

            if (index!=-1){
                let deletedProduct = products.splice(index,1);
                fs.writeFile('products.json',JSON.stringify(products),(err)=>{
                        if(err){
                            res.end(JSON.stringify({"message":"cannot Delete Item"}));
                        }else{
                            console.log(deletedProduct);
                            res.end(JSON.stringify({"message":"Item successfully Deleted"}));
                        }
                    })
            }else{
                res.end(JSON.stringify({"message":"Product ID is Invalid"}))
            }
            
        }
    } 
        
    //
        

    
     

}).listen(7002)

const http=require ('http')
const fs=require ('fs')
const url=require ('url')

http.createServer((req,res)=>{
    let products = JSON.parse(fs.readFileSync('./products.json','utf-8'))
    let URL = url.parse(req.url,true)
    const Query = URL.query;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

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
        }else if(Query.id==undefined && Query.title!=undefined && Query.brand==undefined && Query.category==undefined){
            let matchedProducts = products.filter((product) => {
                return product.title == Query.title;
            });

            if (matchedProducts.length > 0) {
                res.end(JSON.stringify(matchedProducts));
            } else {
                res.end(JSON.stringify({ message: 'No products found with that title' }));
            }
            return;
        }else if (Query.id==undefined && Query.title==undefined && Query.brand!=undefined && Query.category==undefined){
            let matchedProducts = products.filter((product)=>{
                return product.brand==Query.brand;
            })
            if (matchedProducts.length > 0){
                res.end(JSON.stringify(matchedProducts))
            }else{
                res.end(JSON.stringify({'message':'Product Brand is Undefined'}))
            }
            return;
        }else if (Query.id==undefined && Query.title==undefined && Query.brand==undefined && Query.category!=undefined){
            let matchedProducts = products.filter((product)=>{
                return product.category==Query.category;
            })
            if (matchedProducts.length > 0){
                res.end(JSON.stringify(matchedProducts))
            }else{
                res.end(JSON.stringify({'message':'Product Category is Undefined'}))
            }
            return;
        }else if (Query.id==undefined && Query.title!=undefined && Query.brand!=undefined && Query.category==undefined){
            let matchedProducts = products.filter((product)=>{
                return product.title==Query.title && product.brand==Query.brand;
            })
            if (matchedProducts.length > 0){
                res.end(JSON.stringify(matchedProducts))
            }else{
                let anyTitle = products.find(product=>{
                    return product.title==Query.title;
                })
                let anyBrand = products.find(product=>{
                    return product.brand==Query.brand;
                })
                if(anyTitle==undefined && anyBrand!=undefined){
                    res.end(JSON.stringify({'message':'Product Title is mismatched or Undefined'}))
                }else if(anyTitle!=undefined && anyBrand==undefined){
                     res.end(JSON.stringify({'message':'Product Brand is mismatched or Undefined'}))
                }else{
                    res.end(JSON.stringify({'message':'Product Brand & Product Title are mismatched or Undefined'}))
                }
               
            }
            return;
        }else if (Query.id==undefined && Query.title!=undefined && Query.brand==undefined && Query.category!=undefined){
            let matchedProducts = products.filter((product)=>{
                return product.category==Query.category && product.title==Query.title;
            })
            if (matchedProducts.length > 0){
                res.end(JSON.stringify(matchedProducts))
            }else{
                let anyCategory = products.find(product=>{
                    return product.category==Query.category
                });
                let anyTitle = products.find(product=>{
                    return product.title==Query.title
                });
                if(anyCategory==undefined && anyTitle!=undefined){
                    res.end(JSON.stringify({'message':'Product Category is mismatched or Undefined'}))
                }else if(anyCategory!=undefined && anyTitle==undefined){
                    res.end(JSON.stringify({'message':'Product Title is mismatched or Undefined'}))
                }else{
                    res.end(JSON.stringify({'message':'Product Title and Product Category are mismatched or Undefined'}))
                }
                
            }
            return;
        }else if (Query.id==undefined && Query.title==undefined && Query.brand!=undefined && Query.category!=undefined){
            let matchedProducts = products.filter((product)=>{
                return product.category==Query.category && product.brand==Query.brand;
            })
            if (matchedProducts.length > 0){
                res.end(JSON.stringify(matchedProducts))
            }else{
                res.end(JSON.stringify({'message':'Product Category or Brand Undefined'}))
            }
            return;
        }else if (Query.id==undefined && Query.title!=undefined && Query.brand!=undefined && Query.category!=undefined){
            let matchedProducts = products.filter((product)=>{
                return product.category==Query.category && product.brand==Query.brand && product.title==Query.title;
            })
            if (matchedProducts.length > 0){
                res.end(JSON.stringify(matchedProducts))
            }else{

                let anyBrand = products.find(product=>{
                    return product.brand == Query.brand
                })
                let anyTitle = products.find(product=>{
                    return product.title == Query.title
                })
                let anyCategory = products.find(product=>{
                    return product.category == Query.category
                })

                if(anyTitle == undefined && anyBrand != undefined && anyCategory !=undefined){
                    res.end(JSON.stringify({'message':'Product Title is mismatched or undefined'}))
                }else if (anyTitle != undefined && anyBrand == undefined && anyCategory !=undefined){
                    res.end(JSON.stringify({'message':'Product Brand is mismatched or undefined'}))
                }else if (anyTitle != undefined && anyBrand != undefined && anyCategory ==undefined){
                    res.end(JSON.stringify({'message':'Product Category is mismatched or undefined'}))
                }else if(anyTitle == undefined && anyBrand == undefined && anyCategory !=undefined){
                    res.end(JSON.stringify({'message':'Product Title & Product Brand is mismatched or undefined'}))
                }else if(anyTitle == undefined && anyBrand != undefined && anyCategory ==undefined){
                    res.end(JSON.stringify({'message':'Product Title & Product Category is mismatched or undefined'}))
                }else if(anyTitle != undefined && anyBrand == undefined && anyCategory ==undefined){
                    res.end(JSON.stringify({'message':'Product Category & Product Brand is mismatched or undefined'}))
                }else{
                    res.end(JSON.stringify({'message':'Product Title , Product Brand & Product Category is mismatched or undefined'}))
                }
                
            }
            return;
        }else if(req.method=="POST" && URL.pathname==='/products'){
            let product = '';
            req.on('data',(chunk)=>{
                product+=chunk;
            })
            req.on('end',()=>{
                let newProduct=JSON.parse(product);
                products.push(newProduct);
                fs.writeFile('./products.json',JSON.stringify(products),(err)=>{
                    if(err){
                        res.end(JSON.stringify({"message":"Error saving product"}));
                    }else{
                        res.end(JSON.stringify({"message":"Product added successfully"}));

                    }
                })
            })
            return;
        }else if(req.method=='PUT' && URL.pathname==="/products"){
            let product ='';
            req.on('data',(chunk)=>{
                product+=chunk;
            })
            req.on('end',()=>{
                let updatedProduct =JSON.parse(product)
                let index = products.findIndex((product)=>{
                    return Query.id==product.id;
                })
                if(index!=-1){
                    products[index]=updatedProduct;
                    fs.writeFile('./products.json',JSON.stringify(products),(err)=>{
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
            return;
        }else if(req.method=="DELETE" && URL.pathname==='/products'){
            let index=products.findIndex((product)=>{
                return Query.id==product.id;
            })

            if (index!=-1){
                let deletedProduct = products.splice(index,1);
                fs.writeFile('./products.json',JSON.stringify(products),(err)=>{
                        if(err){
                            res.end(JSON.stringify({"message":"Cannot Delete Item"}));
                        }else{
                            console.log(deletedProduct);
                            res.end(JSON.stringify({"message":"Item successfully Deleted"}));
                        }
                    })
            }else{
                res.end(JSON.stringify({"message":"Product ID is Invalid"}))
            }
            return;
        }else{
            res.statusCode = 404;
            res.end(JSON.stringify({ message: "Invalid request" }));
        }
    }
    
        
    //
        

    
     

}).listen(7002)

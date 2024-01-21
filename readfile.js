const fs=require('fs');
const http=require('http');
const url=require('url');
const index="";
//synchronous way to read file from the file system.

//const b=fs.readFileSync('./text1.txt','utf-8');
//console.log(b);
//const c=`This is Ashish Kumar\n ${b}\n and the date is:${Date()}`;
//fs.writeFileSync('./text2.txt',c);
//fs.writeFileSync('./text2.txt',`This is Ashish kumar from MNIT Jaipur.`);

//Asynchronous way to read file from the file system.


/*
fs.readFile('text1.txt','utf-8',(err,data)=>{
    fs.readFile('text2.txt','utf-8',(err,data2)=>{
        console.log(`This data taken from the text1:${data}\n This data taken from the text2:${data2}`);
        fs.appendFile('text.txt',`${data}\n ${data2}`,'utf-8',err =>{
            if(err) return console.log("ERROR!!");
            else console.log("Successfully written into file ");
        });
    });
});
console.log("HEY MAN what's are you doing");
*/
const homepage=fs.readFileSync('overview.html','utf-8');
const card=fs.readFileSync('template-card.html','utf-8');
const cardinside=fs.readFileSync('product.html','utf-8');
const data=fs.readFileSync('data.json','utf-8');
const dataobj=JSON.parse(data);

const replaceTemplate= (temp,product) =>{
    let output=temp.replace(/{%PRODUCTNAME%}/g,product.productName);
    output=output.replace(/{%IMAGE%}/g,product.image);
    output=output.replace(/{%ID%}/g,product.id);
    output=output.replace(/{%QUANTITY%}/g,product.Quantity);
    output=output.replace(/{%NUTRIENTS%}/g,product.Nutrients);
    output=output.replace(/{%PRICE%}/g,product.Price);
    output=output.replace(/{%FROM%}/g,product.from);
    output=output.replace(/{%DESCRIPTION%}/g,product.Description);
    return output;
}










const server=http.createServer((req,res)=>{
    const {query,pathname}=url.parse(req.url,true); 
    const path1=req.url;
    if(pathname=='/'){
        res.writeHead(200,{'content-type':'text/html'});
        const htmlcard=dataobj.map(el => replaceTemplate(card,el));
        const output=homepage.replace('{%PRODUCT_CARD%}',htmlcard);
        res.end(output);
    }else if(pathname=='/product'){
        res.writeHead(200,{'content-type':'text/html'});
        const product=dataobj[query.id];
        const output=replaceTemplate(cardinside,product);
        res.end(output);
    }else if(pathname==='/api_request'){
        fs.readFile('data.json','utf-8',(err,data3)=>{
            res.end(data3);
        });
    }else{
        res.end("<h1>PAGE and  NOT FOUND!!!!!!!!!!!</h1>");
    }
});





server.listen(5000,'127.0.0.1',()=>{
    console.log("Listening to the server.");
}); 
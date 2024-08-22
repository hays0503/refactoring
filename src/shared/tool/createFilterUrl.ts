const createFilterUrl = (filters: any): string => {
    // debugger;
    
    let url:string = "";

    let urlSpecifications:string = ""

    Object.keys(filters).forEach((key) => {
        if(key!=="specifications"){
            const data = filters[key];
            //is array ?
            if(!Array.isArray(data)){
                url+=`/${key}/${filters[key]}`;
            }else{
                url+=`/${key}/${filters[key].join(",")}`
            }
           
        }else{
            filters[key].forEach((item:{name:string,value:string}) => {
                urlSpecifications+=`/${item.name}:${item.value}`;
            });

            url+=`/specifications/${urlSpecifications}`
        }
    });

    return url;
};
  
  

  
export default createFilterUrl
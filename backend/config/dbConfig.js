const mysql = require('mysql');

class DbConfig{

    constructor(){
        this.where_parms = '';
        this.sqlCmd = null;
        this.tbdata = '';

        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'ang4'
        });


        this.connection.connect(function(err) {
            if (err) {
              return console.error('error: ' + err.message);
            }
           
            console.log('Connected to the MySQL server.');
        });    
    }

    //WHERE 
    where(fieldName,fieldValue, attr = ''){
        //console.log(attr);
        if(this.where_parms == ''){
            this.where_parms = "WHERE `"+fieldName+"` = '"+fieldValue+"'";
        }else{
            if(attr == 'or' || attr == 'OR'){
                this.where_parms = this.where_parms + " OR  `"+fieldName+"` = '"+fieldValue+"'";
            }else{
                this.where_parms = this.where_parms + " AND  `"+fieldName+"` = '"+fieldValue+"'";
            }
        }
    }


    // SELECT CMD
    select(tbname, callback){

        this.sqlCmd = "SELECT * FROM "+tbname+" "+this.where_parms; 
        this.queryRunner(function(results){
            callback(results);
        });
        
    }    

    //UPDATE CMD
    update(tbname, data, callback){
        
        var dataKeys = Object.keys(data);
        var dataValues = Object.values(data);
        for(var i=0; i<dataKeys.length; i++){
            this.tbdata = "`"+dataKeys[i]+"` = '"+dataValues[i]+"', "+ this.tbdata;
        }
        this.sqlCmd = "UPDATE "+tbname+" SET "+this.tbdata.replace(/,\s*$/, "")+" "+this.where_parms;

        this.queryRunner(function(results){
            callback(results);
        })
    }

    //INSERT CMD
    insert(tbname, data, callback){
        
        var dataKeys = Object.keys(data);
        var dataValues = Object.values(data);

        for(var i=0; i<dataKeys.length; i++){
            this.tbdata = this.tbdata+"`"+dataKeys[i]+"`, ";
        }
        this.sqlCmd = "INSERT INTO "+tbname+" ("+this.tbdata.replace(/,\s*$/, "")+") VALUES (";

        this.tbdata = '';

        for(var i=0; i<dataValues.length; i++){
            this.tbdata = this.tbdata+"'"+dataValues[i]+"', ";
        }

        this.sqlCmd = this.sqlCmd + this.tbdata.replace(/,\s*$/, "")+")";
        this.queryRunner(function(results){
            callback(results);
        })
        
    }


    //QUERY BUILDER
    queryRunner(callback){

        this.connection.query(this.sqlCmd, (error, results, fields)=>{
            if(error){
                callback('Error Occured' + error.message)
            }else{
                //console.log(results);
                callback(results);
            }
        });

        this.reset_params();
    }

    //RESET PARAMS
    reset_params(){
        this.where_parms = '';
        this.tbdata = '';
        this.sqlCmd = null;
    }
    

}


module.exports = new DbConfig();
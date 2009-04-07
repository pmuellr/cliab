//------------------------------------------------------------------------------
// function wrapper around our definitions
//------------------------------------------------------------------------------
(function () {

//==============================================================================
//==============================================================================

//------------------------------------------------------------------------------
// already installed?  then leave
//------------------------------------------------------------------------------
if (window.cliab) return

//------------------------------------------------------------------------------
window.cliab = {}
var cliab = window.cliab

//------------------------------------------------------------------------------
var log = function(message) { console.log("cliab: " + message) }

var debugging=true
var debug = !debugging ? function() {} : function(message) { log("debug: " + message) }

//------------------------------------------------------------------------------
var available = window.openDatabase
cliab.isAvailable = function() {
    return !!available
}

//------------------------------------------------------------------------------
cliab.openDatabase = function(name, size) {
    if (!available) return null
    
    if (!size) size = 1000 * 1000
    
    var db = openDatabase(name, "0.1", "cliab db: " + name, size)
    
    var result = new Database(db, name, size) 
    
    return result
}

//==============================================================================
//==============================================================================

var result_cb_noop = function(transaction, results) { if (debugging) debug(results_toString(results)) }
var error_cb_noop  = function(transaction, error)   { if (debugging) debug(error_toString(error))     }

var results_toString = function(results) { 
    result = ""
    result += "executeSql result callback:\n" 
    result += "   insertId:     " + results.insertId + "\n"
    result += "   rowsAffected: " + results.rowsAffected + "\n"
    result += "   rows:         " + result.rows.length + "\n"
    
    for (var i=0; i<result.rows.length; i++) {
        var row = result.rows.item(i)
        result += "   rows[" + i + "]\n"
        for (var name in row) {
            var col = row[name]
            result += "      " + name + ": " + col + "\n"
        }
    }
    
    return result
}

var error_toString  = function(error) {
    result = ""
    result += "executeSql error callback:\n"
    result += "   code:    " + error.code + "\n"
    result += "   message: " + error.message + "\n"
}

//------------------------------------------------------------------------------
var Database = function(db, name, size) {
    this.db   = db
    this.name = name
    this.size = size
    
    Database_create_tables(this)
}

var Database_create_tables = function(database) {
    stmt_1 = "CREATE TABLE cliab-objects (" +
        "oid    INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," +
        "rev    INTEGER NOT NULL," + 
        "object CLOB" +
        ")"
    stmt_2 = "CREATE TABLE cliab-views (" + 
        "id   INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT," + 
        "name NVCHAR(255) UNIQUE NOT NULL," + 
        "mapf CLOB" + 
        ")"

    db.transaction(
        function (transaction) {
            transaction.executeSql(stmt_1, [], result_cb_noop, error_cb_noop)
            transaction.executeSql(stmt_2, [], result_cb_noop, error_cb_noop)
        }
    )
    
}

//------------------------------------------------------------------------------
Database.prototype.createObject = function(object) {

    if (object.oid) throw new Error("object has pre-existing 'oid' property")
    if (object.rev) throw new Error("object has pre-existing 'rev' property")

    stmt = "INSERT INTO cliab-objects ( rev, object ) VALUES ( 0 , ? );"

    var insert_handler = function(transaction, results) {
        object.oid = results.insertId
        object.rev = 0
        
    }
    
    db.transaction(
        function (transaction) {
            transaction.executeSql(stmt, [0,object], result_cb_log, error_cb_log)
        }
    )
    
}

//------------------------------------------------------------------------------
Database.prototype.readObject = function(oid) {
}

//------------------------------------------------------------------------------
Database.prototype.updateObject = function(oid, object) {
}

//------------------------------------------------------------------------------
Database.prototype.deleteObject = function(oid) {
}

//------------------------------------------------------------------------------
Database.prototype.readViews = function() {
}

//------------------------------------------------------------------------------
Database.prototype.createView = function(name, fun) {
}

//------------------------------------------------------------------------------
Database.prototype.deleteView = function(name) {
}

//==============================================================================
//==============================================================================

//------------------------------------------------------------------------------
var View = function(name, functionBody) {
    this.name         = name
    this.functionBody = functionBody
}

//------------------------------------------------------------------------------
View.prototype.getName = function() {
    return this.name
}

//------------------------------------------------------------------------------
View.prototype.getFunction = function() {
    return this.functionBody
}

//------------------------------------------------------------------------------
View.prototype.getItems = function(object) {
}

//==============================================================================
//==============================================================================

//------------------------------------------------------------------------------
var Result = function() {
}

//------------------------------------------------------------------------------
Result.prototype.toString = function() {
    result = "Result:"
    for (prop in this) {
        result += "   " + prop + ": " + this[prop] + "\n"
    }
    return result
}

//------------------------------------------------------------------------------
Result.prototype.isError = function() {
    return false
}

//==============================================================================
//==============================================================================

//------------------------------------------------------------------------------
var Error = function(message) {
    this.message = message
}

//------------------------------------------------------------------------------
Error.prototype.name = "cliab.Error"

Error.prototype.toString = function() {
    return this.name + ": " + this.message
}

Error.prototype.isError = function() {
    return true
}

//==============================================================================
//==============================================================================

//------------------------------------------------------------------------------
// end of the function wrapper
//------------------------------------------------------------------------------
})()
//------------------------------------------------------------------------------
// function wrapper around our definitions
//------------------------------------------------------------------------------
(function () {

//------------------------------------------------------------------------------
// already installed?  then leave
//------------------------------------------------------------------------------
if (window.cliab) return

//------------------------------------------------------------------------------
/**
 * @namespace the namespace for the cliab module
 * @name cliab
 */
window.cliab = {}
var cliab = window.cliab

//------------------------------------------------------------------------------
/**
 * cliab.available()
 */
var available = window.openDatabase
cliab.available = function() {
    return !!available
}

//------------------------------------------------------------------------------
/**
 * opens a new or existing cliab database.
 * 
 * @returns {cliab.Database} the database opened or null if it could not be opened
 */
cliab.openDatabase = function(name, size) {
    if (!available) return null
}

//------------------------------------------------------------------------------
/**
 * database constructor
 *
 * @name Database
 * @memberof cliab
 * @class represents an open cliab database
 * @constructor
 */
var Database = function(name) {
}


//------------------------------------------------------------------------------
/**
 * creates a new object in the database
 *
 * @name     createObject
 * @method
 * @methodof cliab.Database
 * @returns  the oid of the object added to the database
 */
Database.prototype.createObject(oid) = function(object) {
}

//------------------------------------------------------------------------------
/**
 * reads an object from the database
 *
 * @name     readObject
 * @method
 * @methodof cliab.Database
 * @returns the object 
 */
Database.prototype.readObject(oid) = function(object) {
}

//------------------------------------------------------------------------------
/**
 * updates an object in the database
 * 
 * @name     updateObject
 * @method
 * @methodof cliab.Database
 */
Database.prototype.updateObject(oid) = function(object) {
}

//------------------------------------------------------------------------------
/**
 * deletes an object from the database
 * 
 * @name     deleteObject
 * @method
 * @methodof cliab.Database
 */
Database.prototype.deleteObject(oid) = function(object) {
}

//------------------------------------------------------------------------------
/**
 * ???
 * 
 * @name     getViews
 * @method
 * @methodof cliab.Database
 * @returns {cliab.View[]} the database opened or null if it could not be opened
 */
Database.prototype.getViews() = function(object) {
}

//==============================================================================
//==============================================================================

//------------------------------------------------------------------------------
/**
 * view constructor
 * 
 * @name View
 * @memberof cliab
 * @class represents a cliab view
 * @constructor
 */
var View = function(name) {
}

//------------------------------------------------------------------------------
/**
 * get all the objects from the view
 * 
 * @name     get
 * @method
 * @methodof cliab.View
 * @returns a whole bunch of stuff
 */
View.prototype.get() = function(object) {
}


//------------------------------------------------------------------------------
// end of the function wrapper
//------------------------------------------------------------------------------
})()
//-------------------------------------------------------------------
// The MIT License
// 
// Copyright (c) 2009 Patrick Mueller
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
// 
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
// 
//-------------------------------------------------------------------

//------------------------------------------------------------------------------
Test = function() {
    var suites = []

    //--------------------------------------------------------------------------
    var getSuite = function() {
        if (0 == suites.length) Test.Suite("unnamed")
        
        var suite = suites.pop()
        suites.push(suite)
        
        return suite
    }

    //--------------------------------------------------------------------------
    Test.Suite = function(name) {
        if (typeof(name) != "string") {
            errorMessage("Test.Suite passed a non-string: " + name)
            return
        }
    
        var noop = function() {}
        var suite = {
            name:          name,
            tests:         [],
            setUp:         noop,
            tearDown:      noop,
            suiteSetUp:    noop,
            suiteTearDown: noop
        }
        
        suites.push(suite)
    }
    
    //--------------------------------------------------------------------------
    Test.SetUp = function(fun) {
        var suite = getSuite()
        
        if (typeof(fun) != "function") {
            errorMessage("For suite '" + suite.name + "', Test.Setup() passed a non-function")
            return
        }
        
        suite.setUp = fun
    }
    
    //--------------------------------------------------------------------------
    Test.TearDown = function(fun) {
        var suite = getSuite()
        
        if (typeof(fun) != "function") {
            errorMessage("For suite '" + suite.name + "', Test.TearDown() passed a non-function")
            return
        }
        
        suite.tearDown = fun
    }
    
    //--------------------------------------------------------------------------
    Test.SuiteSetUp = function(fun) {
        var suite = getSuite()
        
        if (typeof(fun) != "function") {
            errorMessage("For suite '" + suite.name + "', Test.SuiteSetup() passed a non-function")
            return
        }
        
        suite.suiteSetUp = fun
    }
    
    //--------------------------------------------------------------------------
    Test.SuiteTearDown = function(fun) {
        var suite = getSuite()
        
        if (typeof(fun) != "function") {
            errorMessage("For suite '" + suite.name + "', Test.SuiteTearDown() passed a non-function")
            return
        }
        
        suite.suiteTearDown = fun
    }
    
    //--------------------------------------------------------------------------
    Test.Case = function(name, fun) {
        var suite = getSuite()
        
        if (typeof(name) != "string") {
            errorMessage("For suite '" + suite.name + "', Test.Case() passed a non-string")
            return
        }
        
        if (typeof(fun) != "function") {
            errorMessage("For suite '" + suite.name + "', Test.Case() passed a non-function")
            return
        }
        
        suite.tests.push({ name: name, fun: fun })
        
    }
    
    //--------------------------------------------------------------------------
    Test.Run = function() {
        logMessage("Loaded " + suites.length + " test suites.")
        
        for (var i=0; i<suites.length; i++) {
            var suite = suites[i]
            
            logMessage("Running suite: {" + suite.name + "} (" + i + "/" + suites.length + ")")
            
            //------------------------------------------------------------------
            suite.pass = 0
            suite.fail = 0
            suite.err  = 0

            //--------------------------------------------------------------
            try {
                suite.suiteSetUp()
            }
            
            catch (e) {
                suite.fail += 1
                errorMessage(" - Error running suiteSetUp: <u>" + e + "</u>")
                continue
            }
            
            for (var j=0; j<suite.tests.length; j++) {

                //--------------------------------------------------------------
                var test = suite.tests[j]
                
                //--------------------------------------------------------------
                try {
                    suite.setUp()
                }
                
                catch (e) {
                    test.status = "FAIL"
                    suite.fail += 1
                    errorMessage(" - Error running setUp: <u>" + e + "</u>")
                    continue
                }
    
                //--------------------------------------------------------------
                try {
                    test.fun()
                    test.status = "PASS"
                    suite.pass += 1
                }
                
                catch (e) {
                    if (e.name == "Test.FailureException") {
                        test.status = "FAIL"
                        suite.fail += 1
                        errorMessage(" - Failure running [" + test.name + "]: <u>" + e.message + "</u>")
                    }
                    else {
                        test.status = "ERROR"
                        suite.err += 1
                        errorMessage(" - Error running [" + test.name + "]: <u>" + e.toString() + "</u>")
                    }
                }
                
                //--------------------------------------------------------------
                try {
                    suite.tearDown()
                }
                
                catch (e) {
                    test.status = "FAIL"
                    suite.fail += 1
                    errorMessage(" - Error running tearDown: <u>" + e + "</u>")
                    continue
                }
                
            }
    
            //--------------------------------------------------------------
            try {
                suite.suiteTearDown()
            }
            
            catch (e) {
                suite.fail += 1
                errorMessage(" - Error running suiteTearDown: <u>" + e + "</u>")
                continue
            }
            
    
            //------------------------------------------------------------------
            logSuite(suite)
        }
        
    }
    
    //--------------------------------------------------------------------------
    var logSuite = function(suite) {
        if (0 != suite.err) {
            style= "background-color:#FF7;"
        }
        else if (0 != suite.fail) {
            style= "background-color:#F77;"
        }
        else {
            style= "background-color:#7F7;"
        }
        
        message = "<b>suite {" + suite.name + "}</b>; " +
            "pass: " + suite.pass + "; " +
            "fail: " + suite.fail + "; " +
            "err : " + suite.err
        $("#results").append("<span style='" + style + "'>" + message + "<br>")
    }
    
    //--------------------------------------------------------------------------
    var logMessage = function(message) {
        $("#messages").append(message + "<br>")
    }
    
    //--------------------------------------------------------------------------
    var errorMessage = function(message) {
        $("#messages").append("<span style='color:#A00'>" + message + "</span><br>")
    }

    //--------------------------------------------------------------------------
    Test.FailureException = function(message) {
        this.name    = "Test.FailureException"
        this.message = message
    }
}

//------------------------------------------------------------------------------
Assert = function() {

    //--------------------------------------------------------------------------
    Assert.Equals = function(expected, actual, message) {
        if (expected == actual) return
        
        if (null == message) {
            message = "expected did not equal actual: (" + expected + "), (" + actual + ")"
        }
        throw new Test.FailureException(message)
    }
    
    //--------------------------------------------------------------------------
    Assert.True = function(condition, message) {
        if (condition) return
        
        if (null == message) {
            message = "condition was not true"
        }
        throw new Test.FailureException(message)
    }
    
    //--------------------------------------------------------------------------
    Assert.False = function(condition, message) {
        if (!condition) return
        
        if (null == message) {
            message = "condition was true"
        }
        throw new Test.FailureException(message)
    }
    
    //--------------------------------------------------------------------------
    Assert.Null = function(expected, message) {
        if (expected == null) return
        
        if (null == message) {
            message = "expected did not equal null: (" + expected + ")"
        }
        throw new Test.FailureException(message)
    }
    
    //--------------------------------------------------------------------------
    Assert.Fail = function(message) {
        if (null == message) {
            message = "failed"
        }
        throw new Test.FailureException(message)
    }
    
}

Test()
Assert()
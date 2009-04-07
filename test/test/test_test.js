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
(function() {

//------------------------------------------------------------------------------
Test.Suite("one pass")

Test.Case("pass", function() {
})

//------------------------------------------------------------------------------
Test.Suite("one fail")

Test.Case("fail", function() {
    Assert.Fail("should fail")
})

//------------------------------------------------------------------------------
Test.Suite("one error")

Test.Case("error", function() {
    fooBlatz()
})

//------------------------------------------------------------------------------
Test.Suite("assert failures")

Test.Case("equals no message", function() {
    Assert.Equals(1,2)
})

Test.Case("equals message", function() {
    Assert.Equals(1,2,"a message")
})

Test.Case("true no message", function() {
    Assert.True(false)
})

Test.Case("true message", function() {
    Assert.True(false, "a message")
})

Test.Case("false no message", function() {
    Assert.False(true)
})

Test.Case("false message", function() {
    Assert.False(true, "a message")
})

Test.Case("null no message", function() {
    Assert.Null(true)
})

Test.Case("null", function() {
    Assert.Null(true, "a message")
})

Test.Case("fail no message", function() {
    Assert.Fail()
})

Test.Case("fail message", function() {
    Assert.Fail("a message")
})

//------------------------------------------------------------------------------
Test.Suite("assert passes")

Test.Case("equals", function() {
    Assert.Equals(1,1)
    Assert.Equals("1","1")
    Assert.Equals(null, null)
    Assert.Equals(null, undefined)
})

Test.Case("true", function() {
    Assert.True(true)
})

Test.Case("false", function() {
    Assert.False(false)
})

Test.Case("null", function() {
    Assert.Null(null)
})

//------------------------------------------------------------------------------
Test.Suite("setup")

var a = 0

Test.SetUp(function() {
    a = 1
})

Test.Case("test", function() {
    Assert.Equals(1, a)
    a = 2
})

Test.Case("test", function() {
    Assert.Equals(1, a)
})

//------------------------------------------------------------------------------
Test.Suite("suiteSetup")

var a = 0

Test.SuiteSetUp(function() {
    a = 1
})

Test.Case("test", function() {
    Assert.Equals(1, a)
    a  = 2
})

Test.Case("test", function() {
    Assert.Equals(2, a)
})

//------------------------------------------------------------------------------
Test.Suite("tearDown")

Test.SuiteSetUp(function() {
    a = 1
})

Test.TearDown(function() {
    a = 2
})

Test.Case("test", function() {
    Assert.Equals(1, a)
})

Test.Case("test", function() {
    Assert.Equals(2, a)
})


//------------------------------------------------------------------------------
})()
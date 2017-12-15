onmessage = function(e) {
    console.log("message received" + e.data);
    postMessage("hello there");
}
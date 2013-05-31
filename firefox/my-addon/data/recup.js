self.port.on("show", function (arg) {

var fprice = document.getElementById("priceText").textContent;
console.log(fprice);
self.port.emit("text-entered", fprice);
var fromus_price = document.getElementById("fromus_price");
console.log(fromus_price);
fromus_price = fprice;
});
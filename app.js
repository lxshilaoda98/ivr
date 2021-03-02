const express = require('express');

const app = express();
app.use(express.static('./dist'))
app.get('/1', function (req, res) {
    res.sendFile( __dirname + "/" + "dist/index.html" );
 })
app.listen(8083,function(err){  //8080
	if(err){
		console.log(err)
	}else {
		console.log('IVR Server Success ..'+8083)
	}
})

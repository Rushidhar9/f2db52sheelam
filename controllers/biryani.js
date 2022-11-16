var Biryani = require('../models/biryani');
// List of all Biryani
exports.biryani_list = async function(req, res) {
    try{
    theBiryanis = await Biryani.find();
    res.send(theBiryanis);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};
// for a specific Biryani.
exports.biryani_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await Biryani.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
};

// Handle Biryani delete on DELETE.
exports.biryani_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await Biryani.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };

// Handle Biryani update form on PUT.
exports.biryani_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await Biryani.findById( req.params.id)
   
    // Do updates of properties
    if(req.body.biryaniType)
    toUpdate.biryaniType = req.body.biryaniType;
    if(req.body.biryaniFlavor) toUpdate.biryaniFlavor = req.body.biryaniFlavor;
    if(req.body.biryaniPrice) toUpdate.biryaniPrice = req.body.biryaniPrice;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
};

exports.biryani_view_all_Page = async function(req, res) {
    try{
    theBiryanis = await Biryani.find();
    res.render('biryani', { title: 'Biryani Search Results', results: theBiryanis });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};
// Handle Biryani create on POST.
exports.biryani_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Biryani();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    document.biryaniType = req.body.biryaniType;
    document.biryaniFlavor = req.body.biryaniFlavor;
    document.biryaniPrice = req.body.biryaniPrice;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };

    // Handle a show one view with id specified by query
exports.biryani_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await Biryani.findById( req.query.id)
    res.render('biryanidetail',
   { title: 'Biryani Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.biryani_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('biryanicreate', { title: 'Biryani Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a costume.
// query provides the id
exports.biryani_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await Biryani.findById(req.query.id)
    res.render('biryaniupdate', { title: 'Biruyani Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
    };
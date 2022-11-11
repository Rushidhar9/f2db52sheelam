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

// Handle Biryani delete form on DELETE.
exports.biryani_delete = function(req, res) {
res.send('NOT IMPLEMENTED: Biryani delete DELETE ' + req.params.id);
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
const appRouter = (app) => {
    const { check, validationResult } = require('express-validator/check'); // impoerting express validator
    const moment = require('moment'); //importing date module for validatoing date
    const Album = require('../models/albums'); //importing album schema
    const Musicians = require('../models/musicians'); // importing musician schema
    let musician_array = [];


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////Ans-2 endpoint for adding musician////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.post("/add_musician", [
        check("musician_name", "it's too short").isLength({min:3}),       //validating musician_name
        check("musician_type", "it's mandatory").not().isEmpty(),        //validating musician_type
    ], async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() });
        }

        const { musician_name, musician_type } = req.body;
        try {
            let musician = await Musicians.findOne({ musician_name }); // searching existing musician name

            if (musician) {
                return res.send({ message: "oops! musician already exists....please choose update option" })
            }

            new_musician = new Musicians({ musician_name, musician_type });
            await new_musician.save().then((Result) => {
                res.send({ message: "Bingo! musician sucessfully added", Result });  //saving to mongo and sending saved data as a response
            })
        }
        catch (err) {
            return res.send({ message: "oops! something went wrong" })
        }
    })


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Ans - 2 endpoint for updating musician////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.post("/update_musician", async (req, res) => {
        const musician_name = req.body.musician_name;
        const new_musician_type = req.body.new_musician_type;
        try {
            let musician = await Musicians.findOne({ musician_name });  //searchng existance of musician in collection

            if (!musician) {
                return res.send({ message: "oops! seems this musician is not in your list" })
            }

            await Musicians.updateOne({ musician_name: musician_name }, { $set: { musician_type: new_musician_type } })
            await Musicians.findOne({ musician_name }).then((result) => {
                return res.send(result)
            })
        }
        catch (err) {
            return res.send({ message: "oops! something went wrong" })
        }
    })

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////// Ans -1 endpoint for adding album////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.post("/add_album", [
        check("album_name", "it's mandatory").not().isEmpty(),       //validating album_name
        check("release_date", "it's mandatory").isDate(),        //validating date
        check("genre", "it's mandatory").not().isEmpty(),               //validating genre
        check("price", "not in range").isFloat({ min: 100, max: 1000 }),   //validating price range
    ], async (req, res) => {
        let not_listed_musician = [];
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() }); //responding with error array if entered data is not validated
        }

        const { album_name, release_date, genre, price, description } = req.body;

        try {
            let album = await Album.findOne({ album_name });
            let description_array = description.split(',');
            console.log(description_array)
            await Musicians.find().sort({ musician_name: 1 }).then((data) => {
                for (i = 0; i < data.length; i++) {
                    musician_array.push(data[i].musician_name);
                }
            })

            //searching the musician name in descripton array
            for (j = 0; j < description_array.length; j++) {
                if (!musician_array.includes(description_array[j])) {
                    not_listed_musician.push(description_array[j])
                }
            }
            // responding with list of unregistered musicians if unregisterd musician is entered
            if (not_listed_musician.length > 0) {
                return res.send({ message: "oops!  " + not_listed_musician + " is/are missing from your list please add using add_musician endpoint" })
            }

            //responding when entered album is already exists in collection
            if (album) {
                return res.send({ message: "oops! album already exists....please choose update option" })
            }
            new_album = new Album({ album_name, release_date, genre, price});
            await new_album.save()
            await Album.updateOne({ album_name: album_name }, { $set: { description: description_array } })
            await Album.findOne({album_name}).then((Result) => {  //saving entered data and responding with saved result
                res.send({message:"sucessfully added",Result});
            })
        }
        catch (err) {
            return res.send({ message: "oops! something went wrong" })
        }
    })


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////Ans -1 endpoint for updating album////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.post("/update_album", [
        check("album_name", "it's mandatory").not().isEmpty(),      
    ], async (req, res) => {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.send({ errors: errors.array() });  //responding with error array if entered data is not validated
        }
        const update_date = req.query.update_date;
        const update_genre = req.query.update_genre;
        const update_price = req.query.update_price;
        const add_singer = req.query.add_singer;
        const remove_singer = req.query.remove_singer;
        const new_date = req.body.new_date;
        const new_genre = req.body.new_genre;
        const new_price = req.body.new_price;
        const { album_name } = req.body;
        let album_check = await Album.findOne({ album_name }); // checking the existance of album_name in collection

        try {
            if (!album_check) {
                return res.send({ message: "oops! album not found" })  //responding when entered album_name is not found
             }
             else

                ////////////////////////////updating release date///////////////////////////////

                    if (update_date == 'confirm') {   

                        if (!(moment(new_date, "YYYY-MM-DD").isValid())) { //validating entered date using moment module
                            return res.send({ message: "invalid date" })
                        }
                        await Album.updateOne({ album_name: album_name }, { $set: { release_date: new_date } })
                        await Album.findOne({ album_name }).then((data) => {
                            return res.send({ message: "date sucessfully updated", data })
                        })
                    }
             else

                //////////////////////////////updating genre////////////////////////////////////////

                    if ((update_genre == 'confirm') && (new_genre)) {

                        await Album.updateOne({ album_name: album_name }, { $set: { genre: new_genre } }) 
                        await Album.findOne({ album_name }).then((data) => {
                            return res.send({ message: "genre sucessfully updated", data })
                        })
                    }
             else

                ////////////////////////////////////////updaing price//////////////////////////////////

                    if ((update_price == 'confirm') && (new_price)) {


                        if ((new_price < 100) || (new_price > 1000)) { //validating given price range
                                return res.send({ message: "price not in range" })
                            }

                            await Album.updateOne({ album_name: album_name }, { $set: { price: new_price } })
                            await Album.findOne({ album_name }).then((data) => {
                                return res.send({ message: "price sucessfully updated", data })
                            })
                        }
             else
                            
                ///////////////////////adding singer to description array/////////////////////////////////////

                    if (add_singer == 'confirm') {
                        let singer_array = album_check.description;
                        const musician_name = req.body.new_singer;
                        let musician_in_list = await Musicians.findOne({ musician_name }) //checking musician in a list

                            if (!musician_in_list) {
                                return res.send({ message: "seems this musician does not exist " })
                            }

                            // not allowing to add same musician twice
                            if (singer_array.includes(musician_name)) {
                                return res.send({ message: "hey! you need not have to add the same musician twice...." })
                            }
                            singer_array.push(musician_name); // pushing new musician in an array which will be added to description
                            await Album.updateOne({ album_name: album_name }, { $set: { description: singer_array } })
                            await Album.findOne({ album_name }).then((data) => {
                                    return res.send({ message: "sucessfully added", data })
                                })
                             }
                            
             else
                
                ////////////////////////////////removing singer/////////////////////////////////////////////////////
                                
                    if (remove_singer == 'confirm') {
                        let singer_array = album_check.description;
                        //console.log(singer_array[1])
                        const singer_to_remove = req.body.singer_to_remove;
                        //console.log(singer_array.includes(singer_to_remove));
                            if (!singer_array.includes(singer_to_remove)) { //checking wheather entered musician exists or not
                                return res.send({ message: "oops! seems this musician has not been added in this album :) " })
                            }

                        singer_array = singer_array.filter(item => item !== singer_to_remove); // removing singer from description array 
                            //console.log(singer_array);
                        await Album.updateOne({ album_name: album_name }, { $set: { description: singer_array } }) //updating modified array
                        await Album.findOne({ album_name }).then((data) => {
                                return res.send({ message: "sucessfully updated", data })
                            })
                        }
                else 
                {
                    Album.findOne({ album }).then((result) => {
                    return res.send({ message: "seems you are fine with your data...nice!", result })
                    })
                }
        }

        catch (err) {
            return res.send({ message: "oops! something went wrong" })
        }
    })

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////Ans -3 endpoint for getting album in ascending order of releasr date////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.get("/asc_order_album", async (req, res) => {
        await Album.find().then((data) => {
            function custom_sort(a, b) {
                return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
            }
            // return res.send(sortJsonArray(data,'release_date','asc'));
            return res.send(data.sort(custom_sort));
        })
    })


    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////Ans -4 endpoint for getting album in ascending order of price for a specified musician///////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    app.get("/specified_album", async (req, res) => {
        let musician_name = req.body.musician_name;
        let check_musician_name = await Musicians.findOne({ musician_name })
        if (!check_musician_name) {
            return res.send({ message: "oops! seems the musician is not in your list... :(" })
        }
        await Album.find({ description: { $in: [musician_name] } }).sort(({ price: 1 })).then((result) => {
            return res.send({ message: "Bingo! seems you got the list of albums which includes your favourite musician", result });
        })
    })

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////Ans -5 endpoint for getting album in ascending order of musician for a specified album////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    app.get("/musician_list", async (req, res) => {
        const album_name = req.body.album_name;
        let check_album_name = await Album.findOne({ album_name })
        if (!check_album_name) {
            return res.send({ message: "oops! Album is not in your list" })
        }
        check_album_name.description.sort();
        res.send({ message: "List of musicians in a specified album is " + check_album_name.description })
    })
}
module.exports = appRouter
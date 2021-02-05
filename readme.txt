//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/
Method: Get
Request: --
Response: 
        {
            "message": "Welcome to your JukeBox......! Keep loving Music "
        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/add_musician
Method: Post
Request:
        {
            "musician_name":"asha bhosle",
            "musician_type": "vocalist"
        }
Response:

        { 
            "message": "Bingo! musician sucessfully added",
            "Result": {
                "createdAt": "2021-02-04T21:09:59.840Z",
                "_id": "601c62f2c69ab8bd02a4fbaa",
                "musician_name": "asha bhosle",
                "musician_type": "vocalist",
                "__v": 0
            }
        }

validation 1 = Request = not allowing to add musician of same name 
                            {
                                "musician_name": "asha bhosle",
                                "musician_type": "vocalist"
                            }
                
                Response = 
                            {
                                "message": "oops! musician already exists....please choose an update option"
                            }

validation 2 = Request = validating entered data
                            {
                                "musician_name": "we",
                                "musician_type": "vocalist"
                            }

                Response = 
                            {
                                "errors": [
                                    {
                                        "value": "we",
                                        "msg": "it's too short",
                                        "param": "musician_name",
                                        "location": "body"
                                    }
                                ]
                            }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/update_musician
Method:Post
Request:
        {
            "musician_name": "sanjeev",
            "new_musician_type": "violinst"
        }
Response:
        {
            "createdAt": "2021-02-03T22:15:23.896Z",
            "_id": "601b2089bf843f0159abaa58",
            "musician_name": "sanjeev",
            "musician_type": "violinst",
            "__v": 0
        }

Validation 1 : validating entered musician with musician collection
Request:
        {
            "musician_name": "shreya ghoshal",
            "new_musician_type": "violinst"
        }

Response: 
        {
            "message": "oops! seems this musician is not in your list"
        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/add_album
Method: Post
Request:
        {
            "album_name": "namak halal",
            "release_date": "1982-01-01",
            "genre": "romance",
            "price": "500",
            "description": "asha bhosle, Bappi Lahiri"
        }

Response:
        {
            "description": [
                "asha bhosle,Bappi Lahiri"
            ],
            "createdAt": "2021-02-04T21:09:59.806Z",
            "_id": "601c63fac69ab8bd02a4fbac",
            "album_name": "namak halal",
            "release_date": "1982-01-01",
            "genre": "romance",
            "price": "500",
            "__v": 0
        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/update_album?update_date=confirm
Method: Post
Request:
        {
            "album_name":"namak halal",
            "new_date":"1982-09-07"
        }
Response:
        {
            "message": "date sucessfully updated",
            "data": {
                "description": [
                    "asha bhosle,Bappi Lahiri"
                ],
                "createdAt": "2021-02-04T21:09:59.806Z",
                "_id": "601c63fac69ab8bd02a4fbac",
                "album_name": "namak halal",
                "release_date": "1982-09-07",
                "genre": "romance",
                "price": "500",
                "__v": 0
            }
        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/update_album?update_genre=confirm
Method:Post
Request:
        {
            "album_name":"namak halal",
            "new_genre":"romantic"
        }
Response:
        {
            "message": "genre sucessfully updated",
            "data": {
                "description": [
                    "asha bhosle,Bappi Lahiri"
                ],
                "createdAt": "2021-02-04T21:09:59.806Z",
                "_id": "601c63fac69ab8bd02a4fbac",
                "album_name": "namak halal",
                "release_date": "1982-03-08",
                "genre": "romantic",
                "price": "500",
                "__v": 0
            }
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/update_album?update_price=confirm
Method:Post
Request:
        {
            "album_name":"namak halal",
            "new_price":"900"
        }
Response:
        {
            "message": "price sucessfully updated",
            "data": {
                "description": [
                    "asha bhosle,Bappi Lahiri"
                ],
                "createdAt": "2021-02-04T21:09:59.806Z",
                "_id": "601c63fac69ab8bd02a4fbac",
                "album_name": "namak halal",
                "release_date": "1982-03-08",
                "genre": "romantic",
                "price": "900",
                "__v": 0
            }
        }

validation 1 =  price range
Request = 
            {
                "album_name":"namak halal",
                "new_price":"1001"
            }
Response: 
            {
                "message": "price not in range"
            }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/update_album?add_singer=confirm
Method:Post
Request:
        {
            "album_name":"namak halal",
            "new_singer":"sanjeev"
        }
Response:
        {
            "message": "sucessfully added",
            "data": {
                "description": [
                    "asha bhosle,Bappi Lahiri",
                    "sanjeev"
                ],
                "createdAt": "2021-02-04T21:09:59.806Z",
                "_id": "601c63fac69ab8bd02a4fbac",
                "album_name": "namak halal",
                "release_date": "1982-03-08",
                "genre": "romantic",
                "price": "900",
                "__v": 0
            }
        }

Validation 1 =  checking existance of musican in description array
Request = 
        {
            "album_name":"namak halal",
            "new_singer":"random singer"
        }

Response = 
        {
            "message": "seems this musician does not exist "
        }

Validation 2 = 
Request = 
        {
            "album_name":"namak halal",
            "new_singer":"sanjeev"
        }

Response = 
        {
            "message": "hey! you need not have to add the same musician twice...."
        }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/update_album?remove_singer=confirm
Method:Post
Request:
        {
            "album_name":"namak halal",
            "singer_to_remove":"sanjeev"
        }
Response:
        {
            "message": "sucessfully updated",
            "data": {
                "description": [
                    "asha bhosle","Bappi Lahiri"
                ],
                "createdAt": "2021-02-04T21:09:59.806Z",
                "_id": "601c63fac69ab8bd02a4fbac",
                "album_name": "namak halal",
                "release_date": "1982-03-08",
                "genre": "romantic",
                "price": "900",
                "__v": 0
            }
        }

Validation 1 = 
Request = 
        {
            "album_name":"namak halal",
            "singer_to_remove":"shubham"
        }  

Response = 
        {
            "message": "oops! seems this musician has not been added in this album:) "
        }  

Validation 2 = this is done in every part og update
Request = 
        {
            "album_name":"the local train",
            "singer_to_remove":"shubham"
        }
Response = 
        {
            "message": "oops! album not found"
        }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/asc_order_album
Method:Get
Request:--
Response:
        [
            {
                "description": [
                    "asha bhosle","Bappi Lahiri"
                ],
                "createdAt": "2021-02-04T21:09:59.806Z", 
                "_id": "601c63fac69ab8bd02a4fbac",
                "album_name": "namak halal",
                "release_date": "1982-03-08", //check date
                "genre": "romantic",
                "price": "900",
                "__v": 0
            },
            {
                "description": [
                    "[sanjeev,shubham]"
                ],
                "createdAt": "2021-02-03T22:27:00.236Z",
                "_id": "601b233630fc2317b7018096",
                "album_name": "bhojpuri",
                "release_date": "2020-02-22", //check date
                "genre": "testing",
                "price": "900",
                "__v": 0
            },..................................etc etc etc..............}]


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/specified_album
Method:Get
Request:
        {
            "musician_name":"sanjeev"
            
        }
Response:
{
    "message": "Bingo! seems you got the list of albums which includes your favourite musician",
    "result": [
        {
            "description": [
                "sanjeev",
                "oindra"
            ],
            "createdAt": "2021-02-03T23:55:14.996Z",
            "_id": "601b38001b5056bb6df61c74",
            "album_name": "surila",
            "release_date": "2021-03-11",
            "genre": "romantic",
            "price": "455",                                //check price
            "__v": 0
        },
        {
            "description": [
                "sanjeev"
            ],
            "createdAt": "2021-02-03T23:48:55.040Z",
            "_id": "601b36688c4552af62af6eaa",
            "album_name": "sur",
            "release_date": "2020-02-22",
            "genre": "drama",
            "price": "899",                                 //check price
            "__v": 0
        },
        {
            "description": [
                "sanjeev",
                "shubham"
            ],
            "createdAt": "2021-02-03T23:55:14.996Z",
            "_id": "601b37e51b5056bb6df61c73",
            "album_name": "the chirping bird",
            "release_date": "2020-02-22",
            "genre": "instrumental",
            "price": "900",                                 //check price
            "__v": 0
        }
    ]
}

validation 1 = 
Request=
        {
            "musician_name": "dhinchak pooja"
        }

Response = 
        {
            "message": "oops! seems the musician is not in your list... :("
        }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

Endpoint:http://localhost:8082/musician_list
Method:Get
Request:
        {
            "album_name":"namak halal"
        }
Response:
        {
            "message": "List of musicians in a specified album is asha bhosle,Bappi Lahiri"
        }

validation 1 = 
Request = 
            {
                "album_name":"swadesh"
            }

Response = 
            {
                "message": "oops! Album is not in your list"
            }




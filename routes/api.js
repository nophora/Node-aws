const express = require('express');
const account = require('../models/accounts');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const AWS = require('aws-sdk');




//IMAGE STORAGE
const storage = multer.diskStorage({

      filename: function (req, file, cb) {
         cb(null, Date.now() + '-' + file.originalname)
     }
 
 
 });

 const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
        console.log('file type not required')
    }

}

//IMAGE UPLOAD 
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 },
    fileFilter: fileFilter,
})

const s3Client = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey:process.env.secretAccessKey,
   // region :'US East (Ohio) us-east-2'
   correctClockSkew: true,  
});

;

router.post('/photos', upload.single('file'), async (req, res, next) => {
    const file = req.file.path
   
   //node-nhapho-s3-user
    
    fs.readFile(file, (err, buffer) => {
    
       const params = {
            Bucket: 'node-nhapho-s3', 
            Key:req.file.filename ,
            Body:buffer, 
        }


        s3Client.upload(params, (err, data) => {

           
            console.log('data', data)
            

            if (err) {
                console.log('err',err)
                res.status(500).json({error:"Error -> " + err});
            }
         res.status(200).json({path:data.Location});
        });


    })
    
    /*vuyelwaadelaid@gmail.com  Adelaide18!
  
    dipole..

0837286971
    
    0631204364

   

    {
        "Version": "2012-10-17",
        "Id": "Policy1488494182833",
        "Statement": [
            {
                "Sid": "Stmt1488493308547",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "arn:aws:iam::595140346299:user/node-nhapho-s3-user"
                },
                "Action": [
                    "s3:ListBucket",
                    "s3:ListBucketVersions",
                    "s3:GetBucketLocation",
                    "s3:Get*",
                    "s3:Put*"
                ],
                "Resource": "arn:aws:s3:::node-nhapho-s3"
            }
        ]
    }
    
    
    
    
    
    [
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "http://www.example1.com"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "PUT",
            "POST",
            "DELETE"
        ],
        "AllowedOrigins": [
            "http://www.example2.com"
        ],
        "ExposeHeaders": []
    },
    {
        "AllowedHeaders": [],
        "AllowedMethods": [
            "GET"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
    
    
    
    */
   
})


module.exports = router;

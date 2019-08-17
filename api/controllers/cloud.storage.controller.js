exports.upload = (req, res) => {
    let file = req.file;
    if(!file) {
      res.status(500);
      res.json('file not found');
      return;
    }
    let fileUpload = req.bucket.file(file.originalname);
 
  // Get File from request Form data.
  fileUpload.save(new Buffer(file.buffer)).then(  
      result => {
        res.status(200);
        res.json('file uploaded successfully');
      },
      error => {
        res.status(500);
        console.log(error);
        res.json({error: error});
      }
    );
  };
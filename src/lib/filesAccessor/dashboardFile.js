const S3fileCallback = require("./aws-response");

async function fileNamesFile(prefixPath, marker){
    try{
        const response = await S3fileCallback(prefixPath, "", marker);
        // console.log(response);
        if(response.IsTruncated){
            marker = response.Contents.slice(-1)[0].Key;
        }

        return [response.Contents, response.IsTruncated, marker];

    } catch (e) {
        console.log('our error', e);
    }


};

// fileNamesFile("Gainesville/2019/10/30/5024/")

module.exports = fileNamesFile;
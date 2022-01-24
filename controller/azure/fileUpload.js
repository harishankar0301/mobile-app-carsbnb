const getStream = require('into-stream');
const { BlobServiceClient } = require("@azure/storage-blob");

const account = process.env.AZURE_STORAGE_ACCOUNT_NAME;

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const uploadtoAzure = async (containerName, file, fileName) => {
    var blobName = fileName;
    console.log(blobName);
    var stream = getStream(file.buffer);
    var containerClient = blobServiceClient.getContainerClient(containerName);;
    var blockBlobClient = containerClient.getBlockBlobClient(blobName);
    try {
        await blockBlobClient.uploadStream(stream);
        return { stats: 200, message: "Uploaded" }
    } catch (err) {
        return { stats: 500, message: err }
        console.log(err);
    }
}

module.exports = uploadtoAzure;
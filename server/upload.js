const formidable = require('formidable')

const uploadMiddleware = settings => (req, res, next) => {
    const ct = req.get('content-type')
    if(!ct || !ct.startsWith('multipart/form-data')){
        return next()
    }

    const form = formidable({
        uploadDir: settings.uploadDir,
        keepExtensions: true,
        maxFiles: 1
    })

    form.parse(req, (err, fields, files) => {
        req.body = {
            ...fields,
            uploadUrl: settings.baseUrl + files.image.newFilename
        }

        next(err)
    })
}

module.exports = uploadMiddleware
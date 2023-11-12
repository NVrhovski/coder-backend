import { Router } from "express";
import userModel from "../dao/dbmanagers/models/user.model.js";
import multer from "multer";
import __dirname from "../../utils.js";

const usersRouter = Router();

const storage = multer.diskStorage({
    destination: `${__dirname}/public/assets/documents`,
    filename: function(req, file, cb) {
        const dividedName = file.originalname.split('.');
        const fileExtension = dividedName[dividedName.length - 1];
        cb(null, `${file.fieldname}-${req.params.uid}.${fileExtension}`)
    }
})
const upload = multer({storage: storage})

usersRouter.post('/premium/:uid', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.uid);
        if(user.role === 'Premium')
        {
            const message = await userModel.findByIdAndUpdate(req.params.uid, {role: 'User'})
            return res.status(200).json({status: 'Success', payload: message})
        }else
        {
            let hasId = false;
            let hasAddress = false;
            let hasAccount = false;
            user.documents.forEach((document) => {
                switch(document.name)
                {
                    case 'id':
                        hasId = true;
                        break;
                    case 'address':
                        hasAddress = true;
                        break;
                    case 'account':
                        hasAccount = true;
                        break;
                }
            })
            if(hasId && hasAddress && hasAccount)
            {
                const message = await userModel.findByIdAndUpdate(req.params.uid, {role: 'Premium'})
                return res.status(200).json({status: 'Success', payload: message})
            }else
            {
                return res.status(401).json({status: 'Error', error: 'Missing documentation'})
            }
        }
    } catch (error) {
        req.logger.error(`Cant change role - ${new Date().toLocaleDateString()}`)
        return res.status(400).json({status: 'Error', error})
    }
})

usersRouter.post('/:uid/documents', 
    upload.fields([{name: 'document_id'}, {name: 'document_address'}, {name: 'document_account'}]),
    async (req, res) => {
        const user = await userModel.findById(req.params.uid);
        const currentDocuments = user.documents;
        let newDocuments = [];

        if(req.files['document_id'])
        {
            newDocuments.push({
                name: 'id',
                reference: `/public/assets/documents/${req.files['document_id'][0].filename}`
            })
        }else {
            const index = currentDocuments.findIndex(document => document.name === 'id')
            if(index !== -1)
            {
                newDocuments.push(currentDocuments[index])
            }
        }

        if(req.files['document_address'])
        {
            newDocuments.push({
                name: 'address',
                reference: `/public/assets/documents/${req.files['document_address'][0].filename}`
            })
        }else {
            const index = currentDocuments.findIndex(document => document.name === 'address')
            if(index !== -1)
            {
                newDocuments.push(currentDocuments[index])
            }
        }

        if(req.files['document_account'])
        {
            newDocuments.push({
                name: 'account',
                reference: `/public/assets/documents/${req.files['document_account'][0].filename}`
            })
        }else {
            const index = currentDocuments.findIndex(document => document.name === 'account')
            if(index !== -1)
            {
                newDocuments.push(currentDocuments[index])
            }
        }
        const message = await userModel.findByIdAndUpdate(req.params.uid, {documents: newDocuments})
        res.status(200).json({status: 'Success', payload: message})
})

export default usersRouter
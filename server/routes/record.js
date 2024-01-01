import express from "express";
import { createRecord, deleteRecord, getRecord, getRecords, updateRecord } from "../controllers/record.js";


const router = express.Router();

router.get('/getrecords',getRecords)
router.post('/create',createRecord)
router.get('/getrecord/:id',getRecord)
router.post('/edit/:id',updateRecord)
router.delete('/delete/:id',deleteRecord)
export default router;

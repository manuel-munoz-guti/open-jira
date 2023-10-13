import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

type Data = 
    | { message: string }
    | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id } = req.query;

    if (!mongoose.isValidObjectId(id)){
        res.status(400).json({ message: 'El id no es valido '+ id})
    }

    switch (req.method) {
        case 'PUT':
            return updateEntry(req, res)
        case 'GET':
            return getEntryById(req, res)
    
        default:
            res.status(400).json({ message: 'El metodo no existe'})
    }
}

const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryToUpdate = await Entry.findById(id);

    if(!entryToUpdate) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con el id: '+ id});
    }

    const { 
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status}, { runValidators: true, new: true});
        await db.disconnect();
        res.status(200).json(updatedEntry!);
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: 'bad request: ' + error.errors.status.message });
    }
}

const getEntryById = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query;

    await db.connect();

    const entryFound = await Entry.findById(id);

    if(!entryFound) {
        await db.disconnect();
        return res.status(400).json({ message: 'No hay entrada con el id: '+ id});
    }
    try {
        await db.disconnect();
        res.status(200).json(entryFound!);
    } catch (error: any) {
        await db.disconnect();
        res.status(400).json({ message: 'bad request: ' + error.errors.status.message });
    }
}
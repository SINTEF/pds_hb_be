import express from 'express';
import db from '../../db';
import { CompanyModel } from '../../models';

const registerCompany = async (req: express.Request, res: express.Response): Promise<void> => {
    db.connect();
    // missing facilities. Bound to componentIds, employeeIds & dataInstanceIds
    const {organizationNr, name, email, phoneNr, description} = req.body;
    if (!organizationNr || !name) {
        res.status(400).send({
            success: false,
            message: 'Missing required fields',
        });
    }

    const newCompany = new CompanyModel({
        organizationNr,
        name,
        email,
        phoneNr,
        description
    });

    newCompany
        .save()
        .then(() => 
            res.status(200).send({
                succes: true,
                message: 'Company successfully created.',
            })
        )
        .catch((err) =>
            res.status(409).send({
                success:false,
                message: 'Something went wrong when creating user.',
                duplicateField: err.keyValue,
            })
        );
};

export default registerCompany; 
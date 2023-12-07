import _ from "lodash";
import { ObjectId } from "bson";
import memberModel from "../models/member.model.js";
export async function create(req, res) {
    try {
        const { body } = req;
        const { _id } = await memberModel.create(body);
        res.status(200).send({ status: 200, message: "success", result: { _id } }).end();
    } catch (e) {
        if (e instanceof Error) {
            const desc = { message: e.message, stack: e.stack };
            res.status(500).send({ status: 500, message: "internal server error", error: desc }).end();
        } else {
            res.status(500).send(e).end();
        }
    }
}
export async function getById(req, res) {
    try {
        const { params } = req;
        const { _id } = params;
        if (!_.isString(_id) || _.isEmpty(_id)) throw { status: 100, message: "invalid parameter (_id)" };
        const result = await memberModel.findOne({ _id: new ObjectId(_id) }, { password: 0, __v: 0 });
        res.status(200).send({ status: 200, message: "success", result }).end();
    } catch (e) {
        if (e instanceof Error) {
            const desc = { message: e.message, stack: e.stack };
            res.status(500).send({ status: 500, message: "internal server error", error: desc }).end();
        } else {
            res.status(500).send(e).end();
        }
    }
}
export async function updateOne(req, res) {
    try {
        const { params, body } = req;
        const { _id } = params;
        const { password } = body;
        if (!_.isString(_id) || _.isEmpty(_id)) throw { status: 100, message: "invalid parameter (_id)" };
        if (!_.isString(password) || _.isEmpty(password))
            throw { status: 100, message: "invalid parameter (password)" };
        const result = await memberModel.updateOne({ _id: new ObjectId(_id) }, { $set: { password } });
        res.status(200).send({ status: 200, message: "success", result }).end();
    } catch (e) {
        if (e instanceof Error) {
            const desc = { message: e.message, stack: e.stack };
            res.status(500).send({ status: 500, message: "internal server error", error: desc }).end();
        } else {
            res.status(500).send(e).end();
        }
    }
}
export async function deleteOne(req, res) {
    try {
        const { params } = req;
        const { _id } = params;
        if (!_.isString(_id) || _.isEmpty(_id)) throw { status: 100, message: "invalid parameter (_id)" };
        const result = await memberModel.deleteOne({ _id: new ObjectId(_id) });
        res.status(200).send({ status: 200, message: "success", result }).end();
    } catch (e) {
        if (e instanceof Error) {
            const desc = { message: e.message, stack: e.stack };
            res.status(500).send({ status: 500, message: "internal server error", error: desc }).end();
        } else {
            res.status(500).send(e).end();
        }
    }
}

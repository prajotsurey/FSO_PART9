"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date');
    }
    return date;
};
const parseSSN = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing SSN');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing Occupation');
    }
    return occupation;
};
const isGender = (gender) => {
    return Object.values(types_1.Gender).includes(gender);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing Gender');
    }
    return gender;
};
const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newPatient;
};
exports.default = toNewPatient;

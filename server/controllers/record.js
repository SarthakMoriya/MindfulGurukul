import Record from "../models/record.js";

//-------------------------------CREATING RECORD----------------------------- */

export const createRecord = async (req, res) => {
  try {
    // http://localhost:8000/records/createrecord
    const { email, phoneNo, usernames } = req.body;
    const exisitingEmail = await Record.findOne({ email });
    const exisitingNumber = await Record.findOne({ phoneNo });

    if (exisitingEmail) {
      return res.status(400).json({ message: "Email already in use" });
    }
    if (exisitingNumber) {
      return res.status(400).json({ message: "Phone Number in use" });
    }
    const record = await Record.create({ ...req.body });
    await record.save();
    // Sending the record created as response
    res.status(200).json({ record, ok: true });
  } catch (error) {
    res.status(404).json({ message: error.message, error, ok: false });
  }
};

//-------------------------------GETTING ALL RECORDS----------------------------- */

export const getRecords = async (req, res) => {
  try {
    // http://localhost:8000/records/getrecords
    const records = await Record.find();
    // Sending the records as response
    res.status(200).json(records);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateRecordCertificate = async (req, res) => {
  try {
    await Record.findByIdAndUpdate(req.body.id, {
      certificate: req.body.certificate,
    });
    res.send({});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//-------------------------------GETTING SINGLE RECORD----------------------------- */

export const getRecord = async (req, res) => {
  try {
    // http://localhost:8080/records/getrecord/:id
    // Fetching record from id recieved through req.params.id
    const { id } = req.params;
    console.log(id+"yoyo");
    const record = await Record.findById(id);

    //If wrong recordId was send
    if (!record)
      return res.status(500).json({ message: "Record not found!", ok: false });

    //Sending back record found
    res.status(200).json({ data: record });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//-------------------------------DELETE ENTIRE RECORD----------------------------- */
export const deleteRecord = async (req, res) => {
  try {
    // http://localhost:8080/records/deleterecord/:id
    // Deleting record by record id as in req.params.id
    await Record.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Record deleted!" });
  } catch (error) {
    return res.status(404).json({ message: "Record not found!" });
  }
};

//-------------------------------UPDATE ENTIRE RECORD----------------------------- */

export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    //If wrong recordId was send
    if (!record)
      return res.status(500).json({ message: "Record not found!", ok: false });

    //NEW STUDENTID WAS NOT USED BY SOME OTHER RECORD SO UPDATED THE STUDENTID AS WELL AS OTHER DETAILS
    await Record.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body }
    );
    const updatedRecords=await Record.findByIdAndUpdate();
    return res
      .status(200)
      .json({ message: "Record updated", records: updatedRecords, ok: true });
  } catch (error) {
    return res.status(404).json({ message: "Record not found!" });
  }
};

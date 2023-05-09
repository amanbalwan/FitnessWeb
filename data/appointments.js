import { ObjectId } from "mongodb";
import { appointments } from "../config/mongoCollections.js";
import validation from "../helpers.js";

  const getAppointmentsByUserId = async (id) => {
    id = validation.idValidation(id, "User Id");
    const appointmentCollection = await appointments();
    let userAppointments = await appointmentCollection.find({
      userId:id,
    }).toArray()
    
    if(userAppointments) userAppointments =userAppointments.map((appointment) => ({...appointment,_id:appointment._id.toString()}));

    return userAppointments;
  };

  const getAppointmentsByDietitiansId = async (id) => {
    id = validation.idValidation(id, "Dietitian Id");
    const appointmentCollection = await appointments();
    let dietitianAppointments = await appointmentCollection.find({
      dietitianId: id,
    }).toArray()

    if(dietitianAppointments) dietitianAppointments=dietitianAppointments.map((appointment) => ({...appointment,_id:appointment._id.toString()}));

    return dietitianAppointments;
  }; 

  const createAppointment = async ({
    userId,
    dietitianId,
    date,
    startTime,
    // endTime,
    weightType,
  }) => {
    if (
      !userId ||
      !dietitianId ||
      !date ||
      !startTime ||
      // !endTime ||
      !weightType
    )
      throw "All Fields need to have valid values";
console.log('Db')
    userId = validation.idValidation(userId, "User Id");
    dietitianId = validation.idValidation(dietitianId, "Dietitian Id");
    date = validation.checkDate(date, "Appointment Date");
    weightType = validation.stringValidation(weightType, "Weight Type");

    const dietitianAppointments = await getAppointmentsByDietitiansId(
      dietitianId
    );

    const timeToMin = (time) => {
      const splitTime = time.split(":").map((item) => parseInt(item));
      return splitTime[0]*60+splitTime[1];
    }

    const startTimeMin = timeToMin(startTime);

    if (
      dietitianAppointments?.some(
        (item) =>{
          const startTime = timeToMin(item.startTime);
          return item.date.toString() === date.toString() &&
         startTime+60 >= startTimeMin
        }
      )
    )
      throw "An appointment with same details has been already booked with this dietitian. Please book in some other time";


    const newAppointment = {
      userId,
      dietitianId,
      date,
      startTime,
      weightType,
      // endTime,
    };
    const appointmentCollection = await appointments();
    const insertInfo = await appointmentCollection.insertOne(newAppointment);
    if (!insertInfo.acknowledged || !insertInfo.insertedId)
      throw "Could not Book Appointment";

    return true;
};

export default {createAppointment,getAppointmentsByDietitiansId,getAppointmentsByUserId};

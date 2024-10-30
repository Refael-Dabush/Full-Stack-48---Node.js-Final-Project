const employeeRepoDB = require('../repositories/employeeRepoDB');
const departmentRepoDB = require('../repositories/departmentRepoDB');
const shiptRepoDB = require('../repositories/shiftRepoDB');

const getEmployeesInfo = async (filters) => {
   const employeeds = await employeeRepoDB.getAllEmployees(filters);
   const departments = await departmentRepoDB.getAllDepartments();
   const shifts = await shiptRepoDB.getAllShifts();

   const employeesWithDep = employeeds.map((e) => {
    const department = departments.find((d) => (e.departmentId !== undefined && d._id.toString() === e.departmentId.toString()));
    let name = '';
    if(department != undefined && department.name !== undefined) name = department.name;
    const empShiftsDate = [];
    e.shifts.forEach((sh) => {
        console.log('sh', sh);
        const { date } = shifts.find(s => s._id.toString() === sh.shiftId.toString());

        empShiftsDate.push({shiftId: sh.shiftId , date});

    })
    return {...e._doc, departmentName: name, shifts: empShiftsDate};
   })

   return employeesWithDep;
}

const getById = async (empId) => {
    const employee = await employeeRepoDB.getEmployeeById(empId);
    const shifts = await shiptRepoDB.getAllShifts();
    const employShifts = employee.shifts.map(sh => {
        const emShifts = shifts.find(s => s._id.toString() === sh.shiftId.toString());
        return emShifts;
    })
    

    return {...employee._doc, shifts: employShifts}
}

const addEmployee = (obj) => {
    return employeeRepoDB.addEmployee(obj);
}

const updateEmployee = (id, obj) => {
    return employeeRepoDB.updateEmployee(id, obj);
}

const addShiftToEmployee = async (id, shiftId) => {
    const employee = await employeeRepoDB.getEmployeeById(id);
    const updateEmployeeShifts = [...employee.shifts];
    const shitExists = employee.shifts.find((s) => s.shiftId.toString() === shiftId.toString());
    if(shitExists !== undefined) {
        return 'The shift is already added';
    }
    updateEmployeeShifts.push({shiftId});
    employee.shifts = updateEmployeeShifts;
    
    return employee.save();

}

const deleteEmployee = (id) => {
    return employeeRepoDB.deleteEmployee(id);
} 


module.exports = {
    getEmployeesInfo,
    getById,
    addEmployee,
    updateEmployee,
    addShiftToEmployee,
    deleteEmployee
  };
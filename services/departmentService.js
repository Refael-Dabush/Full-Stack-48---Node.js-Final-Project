const departmentRepoDB = require('../repositories/departmentRepoDB');
const employeeRepoDB = require('../repositories/employeeRepoDB');

const getAllDepartmentsWithEmployeesName = async () => {
  const allDepartments = await departmentRepoDB.getAllDepartments();
  const allEmployees = await employeeRepoDB.getAllEmployees({});

  const departmentsWithEmployees = allDepartments.map((d) => {
    const employeesFullName = allEmployees
      .filter((e) => (e.departmentId !== undefined && e.departmentId.toString() === d._id.toString()))
      .map((e) => {
        return { name: `${e.firstName} ${e.lastName}`, employeeId: e._id };
      });
    let managerInfo = [];
    if (d.manager != undefined) {

      managerInfo = allEmployees
        .filter((e) => e._id.toString() === d.manager.toString())
        .map((e) => {
          return { name: `${e.firstName} ${e.lastName}`, managerId: e._id };
        });
    }


    return { ...d._doc, manager: managerInfo, employees: employeesFullName };
  });

  return departmentsWithEmployees;
};

const getDepartmentsListOfName = async () => {
  const allDepartments = await departmentRepoDB.getAllDepartments();
  const listOfNameAndId = allDepartments.map((d) => {
    return {
      name: d.name,
      id: d._id,
    };
  });
  return listOfNameAndId;
};

const addDepartment = (obj) => {
    return departmentRepoDB.addDepartment(obj);
}

const updatedDepartment = (id, obj) => {
    return departmentRepoDB.updateDepartment(id, obj);
}
const deleteDepartment = async (id) => {
    const filter = {departmentId: id};
    // const employees = await employeeRepoDB.getAllEmployees({departmentId: id});
    // const updateEmployees = employees.map((e) =>  {return {...e._doc, departmentId: {}}});
    // console.log('updateEmployees: ', updateEmployees);
    const result = await employeeRepoDB.removeDepartmentFromMany(filter);
    console.log('result:', result)
    return '';//departmentRepoDB.deleteDepartment(id);
}
const deleteAllDepartments = async () => {
    const result = await employeeRepoDB.removeDepartmentFromAll();
    return departmentRepoDB.deleteAllDepartments();
}

module.exports = {
  getDepartmentsListOfName,
  getAllDepartmentsWithEmployeesName,
  addDepartment,
  updatedDepartment,
  deleteDepartment,
  deleteAllDepartments
};

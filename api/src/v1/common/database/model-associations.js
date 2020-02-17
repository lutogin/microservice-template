// import { HAS_ONE, HAS_MANY, BELONGS_TO_MANY } from './association-types';
// import {
//   VacancySpecialization,
//   VacancySkill,
//   VacancyDrivingLicenseCategory,
//   VacancyArea,
//   AddressEmployer,
// } from './models-connectors';
// import Acount from '../../account/account-model';
// import Manager from '../../manager/manager-model';
// import Employer from '../../employer/employer-model';
// import Vacancy from '../../vacancy/vacancy-model';
// import Specialization from '../../specialization/specialization-model';
// import Skill from '../../skill/skill-model';
// import Area from '../../area/area-model';
// import DrivingLicenseCategory from '../../driving-license-category/driving-license-category-model';
// import Address from '../../address/address-model';

// const associate = [
//   [Acount, HAS_ONE, Manager, { foreignKey: 'account_id' }],
//   [Employer, HAS_MANY, Manager, { foreignKey: 'employer_id' }],
//   [Manager, HAS_MANY, Vacancy, { foreignKey: 'manager_id' }],
//   [Employer, HAS_MANY, Vacancy, { foreignKey: 'employer_id' }],
//   [Address, HAS_ONE, AddressEmployer, { foreignKey: 'address_id' }],
//   [Employer, HAS_ONE, AddressEmployer, { foreignKey: 'employer_id' }],
//   [
//     Vacancy,
//     BELONGS_TO_MANY,
//     Specialization,
//     { through: VacancySpecialization, foreignKey: 'vacancy_id' },
//   ],
//   [
//     Specialization,
//     BELONGS_TO_MANY,
//     Vacancy,
//     { through: VacancySpecialization, foreignKey: 'specialization_id' },
//   ],
//   [Vacancy, BELONGS_TO_MANY, Skill, { through: VacancySkill, foreignKey: 'vacancy_id' }],
//   [Skill, BELONGS_TO_MANY, Vacancy, { through: VacancySkill, foreignKey: 'skill_id' }],
//   [
//     Vacancy,
//     BELONGS_TO_MANY,
//     DrivingLicenseCategory,
//     { through: VacancyDrivingLicenseCategory, foreignKey: 'vacancy_id' },
//   ],
//   [
//     DrivingLicenseCategory,
//     BELONGS_TO_MANY,
//     Vacancy,
//     { through: VacancyDrivingLicenseCategory, foreignKey: 'driving_license_category_id' },
//   ],
//   [Vacancy, BELONGS_TO_MANY, Area, { through: VacancyArea, foreignKey: 'vacancy_id' }],
//   [Area, BELONGS_TO_MANY, Vacancy, { through: VacancyArea, foreignKey: 'area_id' }],
//   [Address, HAS_MANY, Vacancy, { foreignKey: 'address_id' }],
//   [Vacancy, BELONGS_TO_MANY, Area, { through: VacancyArea, foreignKey: 'vacancy_id' }],
//   [Area, BELONGS_TO_MANY, Vacancy, { through: VacancyArea, foreignKey: 'area_id' }],
// ];

// export default associate;
export default [];

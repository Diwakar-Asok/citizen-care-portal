export interface Step1Data {
  name: string;
  nationalId: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}

export interface Step2Data {
  maritalStatus: string;
  dependents: string;
  employmentStatus: string;
  monthlyIncome: string;
  housingStatus: string;
}

export interface Step3Data {
  financialSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface FormState {
  step1: Step1Data;
  step2: Step2Data;
  step3: Step3Data;
}

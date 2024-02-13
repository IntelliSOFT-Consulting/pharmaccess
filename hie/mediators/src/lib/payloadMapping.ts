
let CAREPAY_POLICY_ID = process.env['CAREPAY_POLICY_ID'];

function generateRandomString(length:number) {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const randomString = generateRandomString(15); // Change 15 to the desired length of the string
console.log(randomString);


export const fhirPatientToCarepayBeneficiary = async (patient: any) => {
    try {
        let gender = String(patient.gender).toUpperCase();
        let _date = String(patient.birthDate).split("-")

        return {
                "title": patient.gender == "MALE" ? "MR" : "MRS" ,
                "firstName": patient.name[0].given[0],
                "middleName": patient.name[0].family,
                "lastName": patient.name[0].given[1] ?? " ",
                "gender": gender,
                "dateOfBirth":  `${_date[0]}-${_date[2].padStart(2, '0')}-${_date[1].padStart(2, '0')}`,
                "maritalStatus": "SINGLE",
                "nationality": "string",
                "identification": [
                  {
                    "type": "NATIONAL_ID",
                    "number": `78452638982${generateRandomString(4)}`
                  }
                ],
                "acceptTermsAndCondition": true,
                "beneficiaryType": "string",
                "occupation": "EMPLOYED",
                "employment": {
                  "employeeCode": "string",
                  "workCountryCode": "string",
                  "workCountyCode": "string",
                  "workLocationCode": "string",
                  "department": "string",
                  "profession": "string",
                  "salary": "string",
                  "commission": true
                },
                "email": "kochieng@intellisoft.com","residentialCountryCode": "string",
                "residentialCountyCode": "string",
                "residentialLocationCode": "string",
                "height": -1.7976931348623157e+308,
                "weight": -1.7976931348623157e+308,
                "bmi": -1.7976931348623157e+308,
                "categoryId": "930f15cc-9f26-4d07-8ff4-3f39b3fe0b3b",
                "policyId": `${CAREPAY_POLICY_ID}`,
                "insuranceMemberId": "string",
                "familyIdentifier": "string",
                "relationship": "PRIMARY",
                "dateOfEnrollment": "2014-02-07",
                "document": [
                  {
                    "documentType": "string",
                    "documentLocation": "string"
                  }
                ],
                "visaPlaceOfIssueCode": "string",
                "startDate": "2024-01-01T14:15:22Z",
                "endDate": "2024-12-31T14:15:22Z",
                "medicalApplicationForm": {
                  "mafConditions": [
                    {
                      "question": "Diabetes, gout, or any disorder of thyroid, or other glands.",
                      "answer": true,
                      "answerDetails": "My diabetes was diagnosed 2 years ago, and I have been under controlled treatment ever since.",
                      "premiumImpact": 0.1,
                      "medicalCodes": [
                        {
                          "codingStandard": "ICD-10-CM",
                          "code": "A15-A19"
                        }
                      ]
                    }
                  ],
                  "signatureDate": "2023-10-10"
                }
              }
        }
    catch (error) {
        console.log(error);
        return null;    
    }
}
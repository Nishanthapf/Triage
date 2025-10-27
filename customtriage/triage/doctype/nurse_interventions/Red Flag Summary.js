const ensureLoader = () => {
  if (!document.getElementById("pdf-loader")) {
    const loaderStyle = `
      <style>
        #pdf-loader {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255, 255, 255, 0.8);
          z-index: 9999;
          display: none;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          font-family: sans-serif;
        }
        .spinner {
          width: 60px;
          height: 60px;
          border: 6px solid #e0e0e0;
          border-top: 6px solid #000;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        #pdf-loader-text {
          margin-top: 16px;
          font-size: 16px;
          color: #000;
          font-weight: 500;
          text-align: center;
        }
        .custom-alert {
          padding: 14px 18px;
          border-radius: 5px;
          margin-bottom: 20px;
          font-weight: bold;
        }
        .custom-alert.red {
          background: #ffe5e5;
          border: 2px solid #dc3545;
          color: #870404;
        }
        .custom-alert.green {
          background: #e3ffe5;
          border: 2px solid #13c467;
          color: #176637;
        }
        .red-flag-section {
          margin-top: 20px;
          padding: 15px;
          background-color: #ffe5e5;
          border: 2px solid #dc3545;
          border-radius: 5px;
        }
        .red-flag-box {
          border: 2px solid #dc3545;
          background-color: #ffe5e5;
          padding: 10px;
          margin: 10px 0;
          border-radius: 5px;
        }
        .summary-bullet-points {
          margin-left: 20px;
        }
        .summary-bullet-points li {
          margin-bottom: 5px;
        }
        .patient-details, .nurse-intervention-summary, .screening-diabetes-summary, .diabetes-followup-summary, .hypertension-summary {
          background-color: #f8f9fa;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .screening-diabetes-summary b, .diabetes-followup-summary b, .hypertension-summary b {
          font-size: 1.1em;
          color: #004085;
        }
        .red-flag-button {
          background-color: #dc3545;
          color: white;
          border: none;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 3px;
          font-size: 14px;
        }
        .red-flag-button:hover {
          background-color: #c82333;
        }
        .list-row .btn-action[data-label="Summary (PDF)"] {
          display: inline-block !important;
          visibility: visible !important;
        }
        .vital-stats, .patient-info {
          display: inline-block;
          vertical-align: top;
          width: 48%;
          margin-right: 2%;
          background-color: #e9ecef;
          padding: 10px;
          border-radius: 5px;
        }
        .vital-stats ul, .patient-info ul {
          margin: 0;
          padding-left: 20px;
        }
        .danger {
          color: #dc3545;
          font-weight: bold;
        }
        a.pdf-link {
          color: #007bff;
          text-decoration: underline;
          cursor: pointer;
        }
        a.pdf-link:hover {
          color: #0056b3;
        }
        .full-records {
          margin-bottom: 20px;
          background-color: #e9ecef;
          padding: 10px;
          border-radius: 5px;
        }
        .full-records ul {
          margin: 0;
          padding-left: 20px;
        }
        @media print {
          a.pdf-link {
            color: #007bff !important;
            text-decoration: underline !important;
          }
        }
        .hypertension-followup-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.hypertension-followup-summary b {
  font-size: 1.1em;
  color: #004085;
}
.abdominal-pain-gastrointestinal-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.abdominal-pain-gastrointestinal-summary b {
  font-size: 1.1em;
  color: #004085;
}
.diarrhea-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.diarrhea-summary b {
  font-size: 1.1em;
  color: #004085;
}
.vomiting-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.vomiting-summary b {
  font-size: 1.1em;
  color: #004085;
}
.fatigue-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.fatigue-summary b {
  font-size: 1.1em;
  color: #004085;
}
.eye-problem-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.eye-problem-summary b {
  font-size: 1.1em;
  color: #004085;
}
.back-and-neck-pain-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.back-and-neck-pain-summary b {
  font-size: 1.1em;
  color: #004085;
}
.shoulder-and-hand-pain-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.shoulder-and-hand-pain-summary b {
  font-size: 1.1em;
  color: #004085;
}
.leg-knee-hip-pain-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.leg-knee-hip-pain-summary b {
  font-size: 1.1em;
  color: #004085;
}
.dyspepsia-acidity-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.dyspepsia-acidity-summary b {
  font-size: 1.1em;
  color: #004085;
}
.foot-ankle-pain-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.foot-ankle-pain-summary b {
  font-size: 1.1em;
  color: #004085;
}
.anemia-adolescents-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.anemia-adolescents-summary b {
  font-size: 1.1em;
  color: #004085;
}
.anemia-children-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.anemia-children-summary b {
  font-size: 1.1em;
  color: #004085;
}
.headache-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.headache-summary b {
  font-size: 1.1em;
  color: #004085;
}
.pregnancy-care-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.pregnancy-care-summary b {
  font-size: 1.1em;
  color: #004085;
}
.postnatal-care-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.postnatal-care-summary b {
  font-size: 1.1em;
  color: #004085;
}
.jaundice-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.jaundice-summary b {
  font-size: 1.1em;
  color: #004085;
}
.thyroid-problem-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.thyroid-problem-summary b {
  font-size: 1.1em;
  color: #004085;
}
.skin-problem-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.skin-problem-summary b {
  font-size: 1.1em;
  color: #004085;
}
.lymph-node-enlargement-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.lymph-node-enlargement-summary b {
  font-size: 1.1em;
  color: #004085;
}
.chest-pain-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.chest-pain-summary b {
  font-size: 1.1em;
  color: #004085;
}
.constipation-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.constipation-summary b {
  font-size: 1.1em;
  color: #004085;
}
.respiratory-issue-summary {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}
.respiratory-issue-summary b {
  font-size: 1.1em;
  color: #004085;
}

      </style>
      <div id="pdf-loader">
        <div class="spinner"></div>
        <div id="pdf-loader-text">Please wait, generating PDF...</div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", loaderStyle);
  }
};

const screeningRedFlagsInfo = {
  'loose_stools_with_dehydration': { label: 'Loose Stools with Dehydration', message: 'Diabetic with dehydration can go into hypoglycemia soon.' },
  'severe_vomiting': { label: 'Severe Vomiting', message: 'Diabetic with dehydration can go into hypoglycemia soon.' },
  'any_foul_smelling_ulcer': { label: 'Foul Smelling Ulcer', message: 'Infection needs IV antibiotics, daily dressing, and continuous GRBS monitoring.' },
  'tooth_infection': { label: 'Tooth Infection', message: 'Can lead to high blood sugar level.' },
  'swelling_of_legs': { label: 'Swelling of Legs', message: 'Could indicate kidney damage.' },
  'fever_with_dysuria': { label: 'Fever with Dysuria', message: 'Urinary infection needs antibiotics.' },
  'high_fever': { label: 'High Fever', message: 'Requires lab test to determine cause.' },
  'check_hmpy': { label: 'New Diabetic', message: 'New diabetic, needs regular monitoring.' }
};

const followupRedFlagsInfo = {
  'loose_stools_with_dehydration': { label: 'Loose Stools with Dehydration', message: 'Refer to Health center/PHC/CHC: Diabetic with dehydration can go into hypoglycemia soon.' },
  'severe_vomiting': { label: 'Severe Vomiting', message: 'Refer to Health center/PHC/CHC: Diabetic with dehydration can go into hypoglycemia soon.' },
  'any_foul_smelling_ulcer': { label: 'Foul Smelling Ulcer', message: 'Refer to Health center/PHC/CHC: Infection needs IV antibiotics, daily dressing, and continuous GRBS monitoring.' },
  'tooth_infection': { label: 'Tooth Infection', message: 'Refer to Health center/PHC/CHC: Can lead to high blood sugar level.' },
  'swelling_of_legs': { label: 'Swelling of Legs', message: 'Refer to Health center/PHC/CHC: Could indicate kidney damage.' },
  'fever_with_dysuria': { label: 'Fever with Dysuria', message: 'Refer to Health center/PHC/CHC: Urinary infection needs antibiotics.' },
  'high_fever': { label: 'High Fever', message: 'Refer to Health center/PHC/CHC: Requires lab test to determine cause.' },
  'new_diabetic': { label: 'New Diabetic', message: 'Refer to Health center/PHC/CHC: New diabetic, needs regular monitoring.' }
};

const hypertensionRedFlagsInfo = {
  'new_hypertensive': { label: 'New Hypertensive', message: 'Refer to Health center/PHC/CHC: New hypertensive, needs regular monitoring.' },
  'sudden_swelling_of_legs': { label: 'Sudden Swelling of Legs', message: 'Refer to Health center/PHC/CHC: Could indicate heart or kidney issues.' },
  'any_history_of_fainting_or_fall': { label: 'History of Fainting or Fall', message: 'Refer to Health center/PHC/CHC: Indicates risk of cardiovascular or neurological issues.' },
  'severe_headache_sudden_onset': { label: 'Severe Headache (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Possible hypertensive crisis.' },
  'chest_pain_sudden_onset': { label: 'Chest Pain (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Potential cardiac emergency.' },
  'breathlessness_sudden_onset': { label: 'Breathlessness (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Suggests heart or lung issues.' },
  'any_nausea_vomiting_sudden_onset': { label: 'Nausea or Vomiting (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Possible severe hypertension or related issues.' },
  'drowsy': { label: 'Drowsiness', message: 'Refer to Health center/PHC/CHC: Suggests neurological or systemic issues.' },
  'any_slurrred_speech': { label: 'Slurred Speech', message: 'Refer to Health center/PHC/CHC: Indicates possible stroke risk.' },
  'any_change_in_gaitimbalance': { label: 'Change in Gait or Imbalance', message: 'Refer to Health center/PHC/CHC: Suggests neurological or balance issues.' }
};

const hypertensionFollowupRedFlagsInfo = {
  'new_hypertensive': { label: 'New Hypertensive', message: 'Refer to Health center/PHC/CHC: New hypertensive, needs regular monitoring.' },
  'sudden_swelling_of_legs': { label: 'Sudden Swelling of Legs', message: 'Refer to Health center/PHC/CHC: Could indicate heart or kidney issues.' },
  'any_history_of_fainting_or_fall': { label: 'History of Fainting or Fall', message: 'Refer to Health center/PHC/CHC: Indicates risk of cardiovascular or neurological issues.' },
  'severe_headache_sudden_onset': { label: 'Severe Headache (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Possible hypertensive crisis.' },
  'chest_pain_sudden_onset': { label: 'Chest Pain (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Potential cardiac emergency.' },
  'breathlessness_sudden_onset': { label: 'Breathlessness (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Suggests heart or lung issues.' },
  'any_nausea_vomiting_sudden_onset': { label: 'Nausea or Vomiting (Sudden Onset)', message: 'Refer to Health center/PHC/CHC: Possible severe hypertension or related issues.' },
  'drowsy': { label: 'Drowsiness', message: 'Refer to Health center/PHC/CHC: Suggests neurological or systemic issues.' },
  'any_slurrred_speech': { label: 'Slurred Speech', message: 'Refer to Health center/PHC/CHC: Indicates possible stroke risk.' },
  'any_change_in_gaitimbalance': { label: 'Change in Gait or Imbalance', message: 'Refer to Health center/PHC/CHC: Suggests neurological or balance issues.' }
};

const abdominalPainGastrointestinalRedFlagsInfo = {
  'sudden_abdominalpain_vomiting': { label: 'Sudden Abdominal Pain with Vomiting', message: 'Refer to Health center/PHC/CHC: Possible acute gastrointestinal issue requiring urgent evaluation.' },
  'abdominal_pain_with_vomiting': { label: 'Abdominal Pain with Vomiting', message: 'Refer to Health center/PHC/CHC: Indicates potential serious condition.' },
  'worsening_of_abdominal_pain': { label: 'Worsening of Abdominal Pain', message: 'Refer to Health center/PHC/CHC: Suggests deteriorating condition needing immediate attention.' },
  'any_bloating_sensation': { label: 'Bloating Sensation', message: 'Refer to Health center/PHC/CHC: May indicate gastrointestinal obstruction or infection.' },
  'any_weight_loss': { label: 'Weight Loss', message: 'Refer to Health center/PHC/CHC: Could be a sign of chronic illness or malignancy.' },
  'change_in_color_of_stools': { label: 'Change in Color of Stools', message: 'Refer to Health center/PHC/CHC: Possible gastrointestinal bleeding or liver issue.' },
  'history_of_abdominai': { label: 'History of Abdominal Issues', message: 'Refer to Health center/PHC/CHC: Recurrent issues require specialist evaluation.' }
};

const diarrheaRedFlagsInfo = {
  'severly_dehydrated': { label: 'Severe Dehydration (Child)', message: 'Refer to Health center/PHC/CHC: Urgent rehydration and evaluation needed.' },
  'any_child_with_diarrhoea': { label: 'Child with Diarrhea', message: 'Refer to Health center/PHC/CHC: Requires pediatric assessment.' },
  'fever_with_diarrhoea': { label: 'Fever with Diarrhea (Child)', message: 'Refer to Health center/PHC/CHC: Possible infection requiring treatment.' },
  'severe_dehydration': { label: 'Severe Dehydration (Adult)', message: 'Refer to Health center/PHC/CHC: Urgent rehydration and evaluation needed.' },
  'diarrhoea_vomiting': { label: 'Diarrhea with Vomiting', message: 'Refer to Health center/PHC/CHC: Risk of severe dehydration.' },
  'blood_in_stools': { label: 'Blood in Stools', message: 'Refer to Health center/PHC/CHC: Possible gastrointestinal bleeding or infection.' },
  'foul_smelling_diarrhoea': { label: 'Foul-Smelling Diarrhea', message: 'Refer to Health center/PHC/CHC: May indicate bacterial infection.' },
  'severe_abdominal_pain_with_diarrhoea': { label: 'Severe Abdominal Pain with Diarrhea', message: 'Refer to Health center/PHC/CHC: Suggests serious gastrointestinal issue.' },
  'diarrhoea_fever': { label: 'Fever with Diarrhea (Adult)', message: 'Refer to Health center/PHC/CHC: Possible infection requiring treatment.' }
};

const vomitingRedFlagsInfo = {
  'dehydration': { label: 'Dehydration', message: 'Refer to Health center/PHC/CHC: Patient may require rehydration therapy.' },
  'sever_dehydration': { label: 'Severe Dehydration', message: 'Refer to Health center/PHC/CHC: Urgent intervention needed to prevent complications.' },
  'if_vomiting_with_mild_dehydration': { label: 'Vomiting with Mild Dehydration', message: 'Refer to Health center/PHC/CHC: Monitor for progression to severe dehydration.' },
  'if_vomiting_with_sever_dehydration_and_drowsiness': { label: 'Vomiting with Severe Dehydration and Drowsiness', message: 'Refer to Health center/PHC/CHC: Possible electrolyte imbalance or shock.' },
  'blood_in_the_vomit': { label: 'Blood in Vomit', message: 'Refer to Health center/PHC/CHC: Indicates potential gastrointestinal bleeding.' },
  'none_vomiting_child': { label: 'None (Child-Specific Vomiting)', message: 'Refer if persistent: Special monitoring for pediatric cases.' }
};

const eyeProblemRedFlagsInfo = {
  'sudden_loss_of_partial_or_complete_vision': { label: 'Sudden Loss of Partial or Complete Vision', message: 'Refer to Tertiary health care centre: Possible glaucoma (increased eye pressure can lead to loss of vision).' },
  'any_history_of_trauma': { label: 'History of Trauma', message: 'Refer to Tertiary health care centre: Risk of permanent vision loss.' },
  'any_history_of_foreign_body': { label: 'History of Foreign Body', message: 'Refer to Tertiary health care centre: Can lead to severe eye infection or permanent corneal damage.' }
};

const fatigueRedFlagsInfo = {
  // No red flags specified for Fatigue doctype; placeholder for future use
  // Example: 'some_field': { label: 'Some Condition', message: 'Refer to Health center: Description of issue.' }
};
const backAndNeckPainRedFlagsInfo = {
  'exercises_morethen_5days': { label: 'Back/Neck Pain Not Subsiding >5 Days', message: 'Refer to Health centre/PHC/CHC: Persistent pain requires evaluation.' },
  'sudden_onset_back_pain': { label: 'Sudden Onset Back Pain', message: 'Refer to Tertiary health care center: Possible disk involvement.' },
  'numbness_or_tingling_of_legs_or_hands': { label: 'Numbness or Tingling of Legs/Hands', message: 'Refer to Tertiary health care center: Possible disk involvement.' },
  'weakness_in_the_legs_or_hands': { label: 'Weakness in Legs/Hands', message: 'Refer to Tertiary health care center: Possible disk involvement.' },
  'any_bowel_or_bladder_dysfunction': { label: 'Bowel or Bladder Dysfunction', message: 'Refer to Tertiary health care center: Possible disk involvement.' },
  'any_abnormal_gait': { label: 'Abnormal Gait', message: 'Refer to Tertiary health care center: Possible disk involvement.' },
  'any_fever_or_unexplained_weight_loss': { label: 'Fever or Unexplained Weight Loss', message: 'Refer to Tertiary health care center: Rule out secondary malignancy.' },
  'any_history_of_trauma_or_fall': { label: 'History of Trauma or Fall', message: 'Refer to Tertiary health care center: Needs further investigation.' }
};
const shoulderAndHandPainRedFlagsInfo = {
  'left_shoulder_rediatingto': { label: 'Left Shoulder Pain Radiating to Hand with Chest Pain/Sweating/Nausea/Vomiting', message: 'Refer to Tertiary health care centre: Possible myocardial infarction.' },
  'any_history_of_trauma_or_fall': { label: 'History of Trauma or Fall', message: 'Refer to Tertiary health care centre: Possible fracture or dislocation needing further investigation.' },
  'sever_sweeling_or_redness_of_the_affected_joint': { label: 'Severe Swelling or Redness of Affected Joint', message: 'Refer to Tertiary health care centre: Possible fracture or dislocation needing further investigation.' },
  'not_able_to_move_affected_part': { label: 'Inability to Move Affected Part', message: 'Refer to Tertiary health care centre: Possible fracture or dislocation needing further investigation.' },
  'change_in_vital_signs_with_these_pains': { label: 'Change in Vital Signs with Pain', message: 'Refer to Tertiary health care centre: Possible fracture or dislocation needing further investigation.' },
  'numbness_or_tingling_of_hands': { label: 'Numbness or Tingling of Hands', message: 'Refer to Tertiary health care centre: Possible fracture or dislocation needing further investigation.' },
  'sudden_onset_of_pain': { label: 'Sudden Onset of Pain', message: 'Refer to Tertiary health care centre: Needs further investigation.' }
};
const legKneeHipPainRedFlagsInfo = {
  'leg_knee_hip_pain': { label: 'Leg/Knee/Hip Pain Not Subsiding >5 Days', message: 'Refer to Health centre/PHC/CHC: Persistent pain requires evaluation.' },
  'sever_sweeling_or_redness_of_the_affected_joint': { label: 'Severe Swelling or Redness of Affected Joint', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'numbness_or_tingling_of_legs': { label: 'Numbness or Tingling of Legs', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'weakness_in_the_legs': { label: 'Weakness in Legs', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'any_bowel_or_bladder_dysfunction': { label: 'Bowel or Bladder Dysfunction', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'any_abnormal_gait': { label: 'Abnormal Gait', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'any_fever_or_unexplained_weight_loss': { label: 'Fever or Unexplained Weight Loss', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'any_history_of_trauma_or_fall': { label: 'History of Trauma or Fall', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'not_able_to_move_affected_part': { label: 'Inability to Move Affected Part', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' },
  'change_in_vital_signs_with_these_pains': { label: 'Change in Vital Signs with Pain', message: 'Refer to Tertiary health care center: Possible fracture or dislocation needing further investigation.' }
};
const dyspepsiaAcidityRedFlagsInfo = {
  'any_sudden_onset_abdominal_pain_with_vomiting_and_drowsiness': { label: 'Sudden Onset Abdominal Pain with Vomiting and Drowsiness', message: 'Refer to Tertiary health care centre: Possible acute appendicitis, ectopic, or ulcer perforation.' },
  'abdominal_pain_with_vomiting': { label: 'Abdominal Pain with Vomiting', message: 'Refer to Health centre/PHC/CHC.' },
  'worsening_of_abdominal_pain': { label: 'Worsening of Abdominal Pain', message: 'Refer to Health centre/PHC/CHC.' },
  'any_bloating_sensation': { label: 'Bloating Sensation', message: 'Refer to Health centre/PHC/CHC: Possible gallstones.' },
  'any_weight_loss': { label: 'Weight Loss', message: 'Refer to Health centre/PHC/CHC: Possible malignancy.' },
  'change_in_color_of_stools': { label: 'Change in Color of Stools', message: 'Refer to Health centre/PHC/CHC: Possible malignancy.' },
  'if_more_than50': { label: 'Age >50 with First-Time Abdominal Pain', message: 'Refer to Health centre/PHC/CHC: Possible malignancy.' }
};
const footAnklePainRedFlagsInfo = {
  'foot_ankle_pain_not_subsiding': { label: 'Foot/Ankle Pain Not Subsiding >5 Days', message: 'Refer to Health centre/PHC/CHC.' },
  'sever_swelling': { label: 'Severe Swelling or Redness of Affected Joint', message: 'Refer to Tertiary health care center: Could be fracture or dislocation needing further investigations.' },
  'any_abnormal_gait': { label: 'Abnormal Gait', message: 'Refer to Tertiary health care center: Could be fracture or dislocation needing further investigations.' },
  'any_fever_or_unexplained_weight_loss': { label: 'Fever or Unexplained Weight Loss', message: 'Refer to Tertiary health care center: Could be fracture or dislocation needing further investigations.' },
  'any_history_of_trauma_or_fall': { label: 'History of Trauma or Fall', message: 'Refer to Tertiary health care center: Could be fracture or dislocation needing further investigations.' },
  'not_able_to_move_affected_part': { label: 'Inability to Move Affected Part', message: 'Refer to Tertiary health care center: Could be fracture or dislocation needing further investigations.' },
  'change_in_vital_signs_with_these_pains': { label: 'Change in Vital Signs with Pain', message: 'Refer to Tertiary health care center: Could be fracture or dislocation needing further investigations.' }
};
const anemiaAdolescentsRedFlagsInfo = {
  'hb_lessthan_7': { label: 'Hb < 7 gm/dl', message: 'Refer to Tertiary health care centre: Needs blood transfusion.' },
  'anaemic_individual': { label: 'Anaemic Individual with Shortness of Breath/Swelling of Legs/Rapid Pulse/Weight Loss/Rectal Bleed', message: 'Refer to Tertiary health care centre: Could be acute or chronic blood loss needing investigation.' },
  'hb_morethan_7': { label: 'Hb 7-11 gm/dl', message: 'Refer to Health centre/PHC/CHC.' }
};
const anemiaChildrenRedFlagsInfo = {
  'if_hb_less_than_7_gmdl': { label: 'Hb < 7 gm/dl', message: 'Refer to Tertiary health care centre: Needs blood transfusion.' },
  'anaemic_individual': { label: 'Anaemic Individual with Shortness of Breath/Swelling of Legs/Rapid Pulse/Weight Loss/Rectal Bleed', message: 'Refer to Tertiary health care centre: Could be acute or chronic blood loss needing investigation.' },
  'if_hb_more_than_7_gmdl_to_less_than_11_gmdl': { label: 'Hb 7-11 gm/dl', message: 'Refer to Health centre/PHC/CHC.' }
};
const headacheRedFlagsInfo = {
  'any_sudden_severe': { label: 'Sudden Severe Headache with BP >180/120 mmHg', message: 'Refer to Tertiary health care centre: Possible stroke or bleed.' },
  'headche_associated': { label: 'Headache with Drowsiness/Agitation/Confused State', message: 'Refer to Tertiary health care centre: Possible stroke, bleed, malignancy, or trauma.' },
  'slurred_speech': { label: 'Headache with Slurred Speech/Drooling/Weakness in Limbs', message: 'Refer to Tertiary health care centre: Possible stroke or bleed.' },
  'headache_nasal': { label: 'Headache with Sudden Nasal Bleed', message: 'Refer to Tertiary health care centre: Probably traumatic.' }
};
const pregnancyCareRedFlagsInfo = {
  'any_urinary_complaints': { label: 'Urinary Complaints', message: 'Refer to Health centre/PHC/CHC: Investigation and treat.' },
  'if_hb_less_than_7_gmdl': { label: 'Hb < 7 gm/dl', message: 'Refer to Tertiary health care centre: Required blood transfusion.' },
  'if_hb_more_than_7_gmdl_to_less_than_11_gmdl': { label: 'Hb 7-11 gm/dl', message: 'Refer to Health centre/PHC/CHC: Required Inj. Iron.' },
  'server_headche': { label: 'Severe Headache/Blurring of Vision/Breathlessness/Swelling of Extremities/Severe Abdominal Pain', message: 'Refer to Tertiary health care centre: Could be PIH.' },
  'reduces_or_absent_foetal_movement': { label: 'Reduced or Absent Fetal Movement', message: 'Refer to Tertiary health care centre: Required further monitoring or can lose baby.' },
  'leaking_or_bleeding_pv': { label: 'Leaking or Bleeding PV', message: 'Refer to Tertiary health care centre: Required further monitoring or can lose baby.' }
};
const postnatalCareRedFlagsInfo = {
  'fever_more_than_normal': { label: 'Fever > 104°F', message: 'Refer to Tertiary health care centre: Could be an infection/PID/improper evacuation of placenta.' },
  'breathlessness': { label: 'Breathlessness/Swelling of Legs/Foul Smelling Discharge/Severe Abdominal Pain/Passing Clots PV', message: 'Refer to Tertiary health care centre: Could be an infection/PID/improper evacuation of placenta.' },
  'mental_issues': { label: 'Mental Issues (Crying Easily/Irritable/Mood Swings/Not Feeding Baby)', message: 'Refer to Tertiary health care centre: Possible postpartum depression.' },
  'pain_breast': { label: 'Pain in Breast or Cracked/Sore Nipple', message: 'Refer to Health centre/PHC/CHC.' },
  'child_feeding_is_reduced': { label: 'Child Feeding Reduced', message: 'Refer to Tertiary health care centre: Emergency requiring admission and monitoring.' },
  'child_is_drowsy': { label: 'Child is Drowsy', message: 'Refer to Tertiary health care centre: Could be pneumonia.' },
  'respiratory_rate_is_more_than__60_beats_per_minute': { label: 'Respiratory Rate > 60 Beats/Minute', message: 'Refer to Tertiary health care centre: Could be pneumonia.' },
  'chest_indrawing': { label: 'Chest Indrawing', message: 'Refer to Tertiary health care centre: Could be pneumonia.' },
  'abdominal_distension': { label: 'Abdominal Distension', message: 'Refer to Tertiary health care centre: Could be gas/constipation or fatal intestinal obstruction.' },
  'jaundice': { label: 'Jaundice', message: 'Refer to Tertiary health care centre: Requires further investigation.' },
  'child_not_passing_urine_and_stool': { label: 'Child Not Passing Urine and Stool', message: 'Refer to Tertiary health care centre: Could be an obstruction.' },
  'cough_or_cold': { label: 'Cough or Cold', message: 'Refer to Health centre/PHC/CHC.' }
};
const jaundiceRedFlagsInfo = {
  'any_jaundice_refer_for_lab_test': { label: 'Any Jaundice (Adults)', message: 'Refer to Health centre/PHC/CHC.' },
  'severe_abdominal_pain_or_tenderness': { label: 'Severe Abdominal Pain or Tenderness (Adults)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy, alcohol overdose, GI bleed, terminal malignancy, hepatitis C/E, or pre-existing liver diseases.' },
  'patient_is_confusedagitated_or_drowsy': { label: 'Patient Confused/Agitated or Drowsy (Adults)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy, alcohol overdose, GI bleed, terminal malignancy, hepatitis C/E, or pre-existing liver diseases.' },
  'high_fever': { label: 'High Fever (Adults)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy, alcohol overdose, GI bleed, terminal malignancy, hepatitis C/E, or pre-existing liver diseases.' },
  'vomiting_blood': { label: 'Vomiting Blood (Adults)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy, alcohol overdose, GI bleed, terminal malignancy, hepatitis C/E, or pre-existing liver diseases.' },
  'blood_in_stool_or_black_stoolnot_passing_urine': { label: 'Blood in Stool or Black Stool/Not Passing Urine (Adults)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy, alcohol overdose, GI bleed, terminal malignancy, hepatitis C/E, or pre-existing liver diseases.' },
  'any_painful_lymphnode': { label: 'Painful Lymph Node (Adults)', message: 'Refer to Tertiary health care centre: Could indicate underlying malignancy or infection.' },
  'jaundice': { label: 'Any Jaundice (Children)', message: 'Refer to Health centre/PHC/CHC.' },
  'abdominal': { label: 'Severe Abdominal Pain or Tenderness (Children)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy due to pre-existing liver diseases or severe dehydration.' },
  'child_is_confusedagitated_or_drowsy': { label: 'Child Confused/Agitated or Drowsy (Children)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy due to pre-existing liver diseases or severe dehydration.' },
  'fever_jaundice': { label: 'High Fever (Children)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy due to pre-existing liver diseases or severe dehydration.' },
  'excessive_vomiting': { label: 'Excessive Vomiting (Children)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy due to pre-existing liver diseases or severe dehydration.' },
  'not_passing_urine': { label: 'Not Passing Urine (Children)', message: 'Refer to Tertiary health care centre: Could be hepatic encephalopathy due to pre-existing liver diseases or severe dehydration.' }
};
const thyroidProblemRedFlagsInfo = {
  'based_on_labreport': { label: 'TSH Level Abnormal (High or Low)', message: 'Refer to Health centre/PHC/CHC.' }
};
const skinProblemRedFlagsInfo = {
  'any_painful_skin_rash_with_blisters_or_open_sores': { label: 'Painful Skin Rash with Blisters or Open Sores', message: 'Refer to Health centre/PHC/CHC: Infective skin disorder.' },
  'any_yellow_or_bloody_discharge': { label: 'Yellow or Bloody Discharge', message: 'Refer to Health centre/PHC/CHC: Infective skin disorder.' },
  'any_rash_which_is_extensive_on_the_body': { label: 'Extensive Rash on the Body', message: 'Refer to Health centre/PHC/CHC: Infective skin disorder.' },
  'sudden_oset': { label: 'Sudden Onset Rash with Fever and Breathing Difficulty', message: 'Refer to Tertiary health care centre: Life-threatening, could be due to severe drug reaction or infection.' }
};
const lymphNodeEnlargementRedFlagsInfo = {
  'any_painful_lymphnode': { label: 'Painful Lymph Node', message: 'Refer to Health centre/PHC/CHC: Could be due to local infections.' }
};
const chestPainRedFlagsInfo = {
  'sudden_onset_chest_pain': { label: 'Sudden Onset Chest Pain with Sweating, Breathing Difficulty, or Giddiness', message: 'Refer to Tertiary health care center: Could be myocardial infarction.' }
};
const constipationRedFlagsInfo = {
  'blood_stool': { label: 'Blood in the Stool', message: 'Refer to Health centre/PHC/CHC: Could be hemorrhoids or tumor.' },
  'not_able_to_pass_the_gas': { label: 'Not Able to Pass Gas', message: 'Refer to Health centre/PHC/CHC: Could be tumor.' },
  'sever_abdominal_pain': { label: 'Severe Abdominal Pain', message: 'Refer to Health centre/PHC/CHC: Could be tumor.' },
  'recent_loss_of_appetite_or_weight_loss': { label: 'Recent Loss of Appetite or Weight Loss', message: 'Refer to Health centre/PHC/CHC: Could be tumor.' },
  'recent_onset_of_constipation': { label: 'Recent Onset of Constipation', message: 'Refer to Health centre/PHC/CHC: Could be tumor.' }
};
const respiratoryIssueRedFlagsInfo = {
  'if_the_child_is_breathless': { label: 'Child is Breathless', message: 'Refer to Tertiary health centre: Probably pneumonia needs admission and monitoring.' },
  'if_the_child_is_having_chest_in_drawing': { label: 'Child has Chest In-Drawing', message: 'Refer to Tertiary health centre: Probably pneumonia needs admission and monitoring.' },
  'if_the_child_is_drowsy_or_constantly_crying': { label: 'Child is Drowsy or Constantly Crying', message: 'Refer to Tertiary health centre: Probably pneumonia needs admission and monitoring.' },
  'if_the_child_is_refusing_breast_feeding_or_any_feed': { label: 'Child is Refusing Breast Feeding or Any Feed', message: 'Refer to Tertiary health centre: Probably pneumonia needs admission and monitoring.' },
  'high_fever_more_than_3_days': { label: 'High Fever More Than 3 Days', message: 'Refer to Health center/PHC/CHC: Needs more investigation.' },
  'associated_with_chills': { label: 'Associated with Chills', message: 'Refer to Health center/PHC/CHC: Needs more investigation.' },
  'discoloured_nasal_discharge_or_sputum_discolor': { label: 'Discoloured Nasal Discharge or Sputum', message: 'Refer to Health center/PHC/CHC: Will need further investigation and antibiotics.' },
  'sputum': { label: 'Bloody Sputum', message: 'Refer to Health center/PHC/CHC: Will need further investigation and antibiotics.' },
  'finding_difficulty_to_swallow': { label: 'Difficulty Swallowing', message: 'Refer to Health center/PHC/CHC: Will need further investigation and antibiotics.' },
  'tender_lymphnodes_in_the_neck': { label: 'Tender Lymph Nodes in the Neck', message: 'Refer to Health center/PHC/CHC: Will need further investigation and antibiotics.' },
  'breathing_difficulty': { label: 'Breathing Difficulty', message: 'Refer to Health center/PHC/CHC: Will need further investigation and antibiotics.' },
  'chest_pain': { label: 'Chest Pain', message: 'Refer to Health center/PHC/CHC: Will need further investigation and antibiotics.' },
  'any_change_in_the_sound_while_coughing': { label: 'Change in Sound While Coughing', message: 'Refer to Health center/PHC/CHC: Will need further investigation and antibiotics.' }
};




frappe.listview_settings["Nurse Interventions"] = {
  onload: function (listview) {
    ensureLoader();
    listview.page.set_title(__("Nurse Interventions"));
    listview.page.add_action_item(__("Summary (PDF)"), function () {
      const checked_items = listview.get_checked_items();
      if (checked_items.length > 0) {
        checked_items.forEach((item) => {
          frappe.listview_settings["Nurse Interventions"].button.action(item);
        });
      }
    }, true);
  },
  button: {
    show: function () {
      return true;
    },
    get_label: function () {
      return __("Summary (PDF)");
    },
    get_description: function (doc) {
      return __("Generate Red Flag Summary for {0} as PDF", [doc.name]);
    },
    action: async function (doc) {
      ensureLoader();

      const formatDate = (rawDate) => {
        if (!rawDate) return "Not specified";
        try {
          const date = new Date(rawDate);
          if (isNaN(date.getTime())) return "Invalid date";
          const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata"
          };
          return date.toLocaleString("en-IN", options);
        } catch {
          return "Error formatting date";
        }
      };

      const getFrappeDoc = async (method, args) => {
        return new Promise((resolve, reject) => {
          frappe.call({
            method: method,
            args: args,
            callback: function (r) {
              resolve(r.message || []);
            },
            error: function (err) {
              let errorMessage = "Unknown error during API call";
              if (err.httpStatus) {
                errorMessage = `HTTP ${err.httpStatus}: ${err.httpStatusText || "Request failed"}`;
              } else if (err.exception) {
                errorMessage = `Exception: ${err.exception}`;
              } else if (err.message) {
                errorMessage = err.message;
              }
              reject(new Error(errorMessage));
            },
          });
        });
      };

      const isRedFlag = (record) => {
        try {
          const temperature = parseFloat(record.temperature || 0);
          const pulse = parseInt(record.pulse || 0);
          const saturation = parseInt(record.saturation || 0);
          const bpParts = (record.bp || '').split('/').map(p => parseInt(p.trim()) || 0);
          const sys = bpParts[0] || 0;
          const dia = bpParts[1] || 0;
          const rbg = parseFloat(record.rbg_level || 0);
          const hasSevere = record.chn_primary_diagnosis?.toLowerCase().includes("severe");
          return (
            temperature > 100 ||
            (pulse > 100 || pulse < 60) ||
            saturation < 90 ||
            (sys > 140 || dia > 90) ||
            (rbg > 200 || rbg < 70 || !record.rbg_level) ||
            hasSevere
          );
        } catch {
          return false;
        }
      };

      const generateSummary = async () => {
        try {
          const currentRecord = await getFrappeDoc("frappe.client.get", {
            doctype: "Nurse Interventions",
            name: doc.name
          });
          if (!currentRecord) throw new Error("No record found for Nurse Interventions");

          let patientInfo = `<div class="patient-info"><b>Patient Details:</b><ul class="summary-bullet-points">`;
          const patientFields = [
            'patient_name', 'patient_unique_id', 'age', 'gender',
            'community_name', 'occupation', 'address', 'health_insurance'
          ];
          for (const key of patientFields) {
            if (currentRecord[key]) {
              const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              patientInfo += `<li><b>${formattedKey}:</b> ${currentRecord[key]}</li>`;
            }
          }
          patientInfo += `</ul></div>`;

          let vitalStats = `<div class="vital-stats"><b>Physical Examination:</b><ul>`;
          const vitalFields = ['temperature', 'pulse', 'respiration', 'saturation', 'height', 'weight', 'bmi', 'bmi_category'];
          for (const key of vitalFields) {
            if (currentRecord[key]) {
              const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
              vitalStats += `<li><b>${formattedKey}:</b> ${currentRecord[key]}</li>`;
            }
          }
          vitalStats += `</ul></div>`;

          let interventionDetails = '';

          return { currentRecord, patientInfo, vitalStats, interventionDetails };
        } catch (err) {
          frappe.show_alert({ message: __(`Error generating summary: ${err.message}`), indicator: "red" });
          return null;
        }
      };

      const generateRedFlagContent = async (currentRecord) => {
        try {
          const patient_unique_id = currentRecord.patient_unique_id || null;
          const patient_name = currentRecord.patient_name || "Unknown Patient";
          const args = {
            doctype: "Nurse Interventions",
            fields: ["*"],
            limit_page_length: 0
          };
          const or_filters = [];
          if (patient_unique_id) {
            or_filters.push(["patient_unique_id", "=", patient_unique_id]);
          }
          if (patient_name && patient_name !== "Unknown Patient") {
            or_filters.push(["patient_name", "=", patient_name]);
          }
          if (or_filters.length === 0) {
            return { redFlagRecords: [], redFlagContent: `` };
          }
          args.or_filters = or_filters;

          const records = await getFrappeDoc("frappe.client.get_list", args);

          const redFlagRecords = records.filter(record => isRedFlag(record));
          let redFlagContent = `<div class="red-flag-box"><b>Red Flag Records (Emergency Cases) for ${patient_name}:</b><ul class="summary-bullet-points">`;
          if (redFlagRecords.length === 0) {
            redFlagContent += '<li>No red flag records found for this patient.</li>';
          } else {
            redFlagRecords.forEach((record, index) => {
              let recordSummary = `<li>Record ${index + 1} (Date: ${formatDate(record.creation)}): `;
              const flags = [];

              if (record.temperature && parseFloat(record.temperature) > 100)
                flags.push(`High Fever (${record.temperature}°F)`);
              if (record.pulse && (parseInt(record.pulse) > 100 || parseInt(record.pulse) < 60))
                flags.push(`Abnormal Pulse Rate (${record.pulse} bpm)`);
              if (record.saturation && parseInt(record.saturation) < 90)
                flags.push(`Low SpO₂ (${record.saturation}%)`);
              if (record.bp) {
                const bpParts = record.bp.split("/").map(p => parseInt(p.trim()) || 0);
                if (bpParts[0] > 140 || bpParts[1] > 90)
                  flags.push(`High BP (${record.bp} mmHg)`);
              }
              if (record.rbg_level) {
                const rbg = parseFloat(record.rbg_level);
                if (rbg > 200 || rbg < 70)
                  flags.push(`Abnormal RBS (${record.rbg_level} mg/dl)`);
              } else {
                flags.push(`RBG Not Recordable`);
              }
              if (record.chn_primary_diagnosis?.toLowerCase().includes("severe"))
                flags.push(`Severe Diagnosis (${record.chn_primary_diagnosis})`);

              recordSummary += flags.join(", ") + `.</li>`;
              redFlagContent += recordSummary;
            });
          }
          redFlagContent += `</ul></div>`;
          return { redFlagRecords, redFlagContent };
        } catch (err) {
          return { redFlagRecords: [], redFlagContent: `<div class="red-flag-box">Error loading Nurse Interventions red flag records: ${err.message}</div>` };
        }
      };

      const generateScreeningDiabetesSummary = async (currentRecord) => {
        try {
          const patient_unique_id = currentRecord.patient_unique_id || null;
          const patient_name = currentRecord.patient_name || null;
          const args = {
            doctype: "Screening for Diabetes",
            fields: [
              'name', 'creation', 'loose_stools_with_dehydration', 'severe_vomiting', 'any_foul_smelling_ulcer',
              'tooth_infection', 'swelling_of_legs', 'fever_with_dysuria', 'high_fever', 'check_hmpy',
              'hungry_alltime', 'thirsty_alltime', 'dizzy_sweating', 'urine_alltime', 'passurine_often',
              'buring_sensation', 'lost_weight6', 'dentist_visit6', 'unusually_tired', 'injury_6months',
              'blurring_vision', 'white_discharge', 'urinary_infections', 'skin_infections',
              'are_you_diagnosed_with_high_bp_hypertension', 'any_history_of_chest_pain_in_the_last_one_year',
              'breathing_difficulty', 'other_complaint', 'pcod_diagnosis', 'gestational_diabetes', 'large_baby',
              'exercise_cycle', 'consume_bakery', 'job_involve', 'limb_amputation',
              'peripheral_pulse', 'peripheral_edema', 'feet_fissures', 'toes_ulcers', 'skin_changes', 'oral_cavity',
              'hba1c', 'rft_lipid', 'urine_microalbumin'
            ],
            limit_page_length: 0
          };
          const or_filters = [];
          if (patient_unique_id) or_filters.push(["patient_unique_id", "=", patient_unique_id]);
          if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
          if (or_filters.length > 0) args.or_filters = or_filters;

          const records = await getFrappeDoc("frappe.client.get_list", args);

          if (!records || records.length === 0) {
            return { screeningDiabetesSummaryHtml: ``, redFlagsList: [], diagnosisRecords: [] };
          }

          let redFlagsList = [];
          records.forEach((rec, idx) => {
            Object.keys(screeningRedFlagsInfo).forEach(field => {
              if (rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
                redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${screeningRedFlagsInfo[field].label} - ${screeningRedFlagsInfo[field].message}`);
              }
            });
          });

          const redFlagsHtml = redFlagsList.length
            ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
            : '<ul class="summary-bullet-points"><li>No red flags detected in Screening for Diabetes records.</li></ul>';

          let screeningSummaryHtml = '<ul class="summary-bullet-points">';
          records.forEach((rec, idx) => {
            screeningSummaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
            const conditions = [];
            if (rec.hungry_alltime && (rec.hungry_alltime === "Yes" || rec.hungry_alltime === true)) conditions.push("experiences constant hunger");
            if (rec.thirsty_alltime && (rec.thirsty_alltime === "Yes" || rec.thirsty_alltime === true)) conditions.push("feels constant thirst");
            if (rec.dizzy_sweating && (rec.dizzy_sweating === "Yes" || rec.dizzy_sweating === true)) conditions.push("suffers from <span class='danger'>dizziness and sweating</span>");
            if (rec.urine_alltime && (rec.urine_alltime === "Yes" || rec.urine_alltime === true)) conditions.push("has frequent urination");
            if (rec.passurine_often && (rec.passurine_often === "Yes" || rec.passurine_often === true)) conditions.push("often passes urine");
            if (rec.buring_sensation && (rec.buring_sensation === "Yes" || rec.buring_sensation === true)) conditions.push("experiences a <span class='danger'>burning sensation</span>");
            if (rec.lost_weight6 && (rec.lost_weight6 === "Yes" || rec.lost_weight6 === true)) conditions.push("has lost weight in the last 6 months");
            if (rec.dentist_visit6 && (rec.dentist_visit6 === "Yes" || rec.dentist_visit6 === true)) conditions.push("visited a dentist in the last 6 months");
            if (rec.unusually_tired && (rec.unusually_tired === "Yes" || rec.unusually_tired === true)) conditions.push("feels <span class='danger'>unusually tired</span>");
            if (rec.injury_6months && (rec.injury_6months === "Yes" || rec.injury_6months === true)) conditions.push("had an injury in the last 6 months");
            if (rec.blurring_vision && (rec.blurring_vision === "Yes" || rec.blurring_vision === true)) conditions.push("experiences <span class='danger'>blurred vision</span>");
            if (rec.white_discharge && (rec.white_discharge === "Yes" || rec.white_discharge === true)) conditions.push("has white discharge");
            if (rec.urinary_infections && (rec.urinary_infections === "Yes" || rec.urinary_infections === true)) conditions.push("suffers from <span class='danger'>urinary infections</span>");
            if (rec.skin_infections && (rec.skin_infections === "Yes" || rec.skin_infections === true)) conditions.push("has <span class='danger'>skin infections</span>");
            if (rec.are_you_diagnosed_with_high_bp_hypertension && (rec.are_you_diagnosed_with_high_bp_hypertension === "Yes" || rec.are_you_diagnosed_with_high_bp_hypertension === true)) conditions.push("is diagnosed with <span class='danger'>high blood pressure or hypertension</span>");
            if (rec.any_history_of_chest_pain_in_the_last_one_year && (rec.any_history_of_chest_pain_in_the_last_one_year === "Yes" || rec.any_history_of_chest_pain_in_the_last_one_year === true)) conditions.push("has a history of <span class='danger'>chest pain</span> in the last year");
            if (rec.breathing_difficulty && (rec.breathing_difficulty === "Yes" || rec.breathing_difficulty === true)) conditions.push("experiences <span class='danger'>breathing difficulty</span>");
            if (rec.pcod_diagnosis && (rec.pcod_diagnosis === "Yes" || rec.pcod_diagnosis === true)) conditions.push("is diagnosed with PCOD");
            if (rec.gestational_diabetes && (rec.gestational_diabetes === "Yes" || rec.gestational_diabetes === true)) conditions.push("has <span class='danger'>gestational diabetes</span>");
            if (rec.large_baby && (rec.large_baby === "Yes" || rec.large_baby === true)) conditions.push("had a large baby");
            if (rec.hba1c && (rec.hba1c === "Yes" || rec.hba1c === true)) conditions.push("has an abnormal HbA1c level");
            if (rec.rft_lipid && (rec.rft_lipid === "Yes" || rec.rft_lipid === true)) conditions.push("has abnormal RFT or lipid levels");
            if (rec.urine_microalbumin && (rec.urine_microalbumin === "Yes" || rec.urine_microalbumin === true)) conditions.push("has microalbumin in urine");

            let sentence = "The patient is a healthy individual with no notable conditions.";
            if (conditions.length > 0) {
              sentence = `The patient ${conditions.slice(0, 4).join(", ")}.`;
              if (conditions.length > 4) sentence += ` Additional conditions include ${conditions.slice(4).join(", ")}.`;
            }
            screeningSummaryHtml += sentence + '</li>';
          });
          screeningSummaryHtml += '</ul>';

          const diagnosisRecords = records.map((rec, idx) => ({name: rec.name, recordNumber: idx + 1, creation: rec.creation}));

const screeningDiabetesSummaryHtml = `
  <div class="screening-diabetes-summary">
    <b>Screening for Diabetes Summary:</b>
    ${screeningSummaryHtml}
    <div class="red-flag-box"><b>Screening for Diabetes Red Flags:</b> ${redFlagsHtml}</div>
  </div>
`;       

          return { screeningDiabetesSummaryHtml, redFlagsList, diagnosisRecords };
        } catch (err) {
          return {
            screeningDiabetesSummaryHtml: `<div class="screening-diabetes-summary" style="color:red;">
              <b>Error loading Screening for Diabetes data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
            redFlagsList: [],
            diagnosisRecords: []
          };
        }
      };


     // Corrected generateDiabetesFollowupSummary function
const generateDiabetesFollowupSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const args = {
      doctype: "Diabetes Followup",
      fields: [
        'name', 'creation', 'patient_id',
        'loose_stools_with_dehydration', 'severe_vomiting', 'any_foul_smelling_ulcer', 'tooth_infection',
        'swelling_of_legs', 'fever_with_dysuria', 'high_fever', 'new_diabetic', 'none',
        'diabetes_followup', 'blurring_of_vision', 'anychest_pain', 'breathing_difficultyon',
        'swelling_legs', 'tingling_sensation', 'check_jycp', 'peripheral_pulses',
        'peripheral_edemas', 'feet_for_fissures', 'body_skinchanges', 'gingivitis',
        'feet_fissures_photo', 'check_fvvg', 'stopped_sugar', 'stopped_junks',
        'exercise_30mins', 'check_azac', 'medicines_regularly', 'no_medicine',
        'other_medicines', 'check_nbrf', 'hba1c_done', 'lipid_profile',
        'micro_albumin', 'lab_reports'
      ],
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        diabetesFollowupSummaryHtml: ``,
        redFlagsList: [],
        followupRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        diabetesFollowupSummaryHtml: ``,
        redFlagsList: [],
        followupRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(followupRedFlagsInfo).forEach(field => {
        if (rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${followupRedFlagsInfo[field].label} - ${followupRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Diabetes Followup records.</li></ul>';

    let followupSummaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      followupSummaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.blurring_of_vision && (rec.blurring_of_vision === "Yes" || rec.blurring_of_vision === true)) conditions.push("suffers from <span class='danger'>blurring of vision</span>");
      if (rec.anychest_pain && (rec.anychest_pain === "Yes" || rec.anychest_pain === true)) conditions.push("has <span class='danger'>chest pain</span>");
      if (rec.breathing_difficultyon && (rec.breathing_difficultyon === "Yes" || rec.breathing_difficultyon === true)) conditions.push("experiences <span class='danger'>breathing difficulty</span>");
      if (rec.swelling_legs && (rec.swelling_legs === "Yes" || rec.swelling_legs === true)) conditions.push("has <span class='danger'>swelling of legs</span>");
      if (rec.tingling_sensation && (rec.tingling_sensation === "Yes" || rec.tingling_sensation === true)) conditions.push("experiences <span class='danger'>tingling sensation</span>");
      if (rec.peripheral_pulses && (rec.peripheral_pulses === "Yes" || rec.peripheral_pulses === true)) conditions.push("has abnormal peripheral pulses");
      if (rec.peripheral_edemas && (rec.peripheral_edemas === "Yes" || rec.peripheral_edemas === true)) conditions.push("has <span class='danger'>peripheral edema</span>");
      if (rec.feet_for_fissures && (rec.feet_for_fissures === "Yes" || rec.feet_for_fissures === true)) conditions.push("has <span class='danger'>feet fissures</span>");
      if (rec.body_skinchanges && (rec.body_skinchanges === "Yes" || rec.body_skinchanges === true)) conditions.push("has <span class='danger'>body skin changes</span>");
      if (rec.gingivitis && (rec.gingivitis === "Yes" || rec.gingivitis === true)) conditions.push("has <span class='danger'>gingivitis</span>");
      if (rec.stopped_sugar && (rec.stopped_sugar === "Yes" || rec.stopped_sugar === true)) conditions.push("has stopped sugar intake");
      if (rec.stopped_junks && (rec.stopped_junks === "Yes" || rec.stopped_junks === true)) conditions.push("has stopped junk food");
      if (rec.exercise_30mins && (rec.exercise_30mins === "Yes" || rec.exercise_30mins === true)) conditions.push("exercises 30 minutes daily");
      if (rec.medicines_regularly && (rec.medicines_regularly === "Yes" || rec.medicines_regularly === true)) conditions.push("takes medicines regularly");
      if (rec.no_medicine && (rec.no_medicine === "Yes" || rec.no_medicine === true)) conditions.push("is not taking any medicine");
      if (rec.other_medicines && rec.other_medicines !== "0") conditions.push(`takes other medicines: ${rec.other_medicines}`);
      if (rec.hba1c_done && (rec.hba1c_done === "Yes" || rec.hba1c_done === true)) conditions.push("has HbA1c test done");
      if (rec.lipid_profile && (rec.lipid_profile === "Yes" || rec.lipid_profile === true)) conditions.push("has lipid profile done");
      if (rec.micro_albumin && (rec.micro_albumin === "Yes" || rec.micro_albumin === true)) conditions.push("has micro albumin test done");
      if (rec.lab_reports && rec.lab_reports !== "0") conditions.push("has uploaded a lab report");

      let sentence = "The patient is stable with no notable complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      followupSummaryHtml += sentence + '</li>';
    });
    followupSummaryHtml += '</ul>';

    const followupRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      lab_reports: rec.lab_reports
    }));

    const diabetesFollowupSummaryHtml = `
      <div class="diabetes-followup-summary">
        <b>Diabetes Followup Summary:</b>
        ${followupSummaryHtml}
        <div class="red-flag-box"><b>Diabetes Followup Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { diabetesFollowupSummaryHtml, redFlagsList, followupRecords };
  } catch (err) {
    return {
      diabetesFollowupSummaryHtml: `<div class="diabetes-followup-summary" style="color:red;">
        <b>Error loading Diabetes Followup data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      followupRecords: []
    };
  }
};

   // Corrected generateHypertensionSummary function
const generateHypertensionSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    // Define all fields, including lab_scanning
    const allFields = [
      'name', 'creation', 'patient_id',
      'new_hypertensive', 'sudden_swelling_of_legs', 'any_history_of_fainting_or_fall',
      'severe_headache_sudden_onset', 'chest_pain_sudden_onset', 'breathlessness_sudden_onset',
      'any_nausea_vomiting_sudden_onset', 'drowsy', 'any_slurrred_speech', 'any_change_in_gaitimbalance', 'none',
      'screening_for_hypertension', 'headache_6months', 'feel_giddy_6months', 'feel_giddy',
      'chest_painmonths', 'blurred_vision6', 'palpitation', 'often_getting_angry', 'breathing_while_walking',
      'ifyes_chestpain', 'check_dtvk', 'check_ytyo', 'heart_disease_history', 'kidney_history',
      'stroke_history', 'bp_sugar_history', 'bp_other_complaints', 'check_lgdm', 'high_bp',
      'lbw', 'regular_exercise', 'consume_fried', 'long_periods', 'feel_stressed', 'check_bmgb',
      'peripheral_pulsefeet', 'for_peripheral_edema', 'rft_last_oneyear', 'urine_albumin6', 'lab_scanning'
    ];
    // Validate fields by fetching doctype metadata (assumed to be handled elsewhere)
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Screening for Hypertension" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Screening for Hypertension" });
      // if (!doctypeMeta) throw new Error("Doctype 'Screening for Hypertension' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id');
      if (!validFields.includes('any_slurrred_speech')) {
        console.warn("Field 'any_slurrred_speech' not found in Screening for Hypertension doctype. Excluding from query.");
      }
    } catch (metaErr) {
      console.warn(`Could not validate fields for Screening for Hypertension: ${metaErr.message}`);
    }

    const args = {
      doctype: "Screening for Hypertension",
      fields: validFields,
      limit_page_length: 0 // Note: Consider limiting to 100 records for performance if needed
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        hypertensionSummaryHtml: ``,
        redFlagsList: [],
        hypertensionRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        hypertensionSummaryHtml: ``,
        redFlagsList: [],
        hypertensionRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(hypertensionRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${hypertensionRedFlagsInfo[field].label} - ${hypertensionRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Screening for Hypertension records.</li></ul>';

    let summaryContent = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryContent += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.none && (rec.none === "1" || rec.none === true)) conditions.push("reported no notable issues");
      if (rec.headache_6months && (rec.headache_6months === "Yes" || rec.headache_6months === true)) conditions.push("had headaches in the last 6 months");
      if (rec.feel_giddy_6months && (rec.feel_giddy_6months === "Yes" || rec.feel_giddy_6months === true)) conditions.push("felt giddy in the last 6 months");
      if (rec.feel_giddy && (rec.feel_giddy === "Yes" || rec.feel_giddy === true)) conditions.push("currently feels <span class='danger'>giddy</span>");
      if (rec.chest_painmonths && (rec.chest_painmonths === "Yes" || rec.chest_painmonths === true)) conditions.push("had <span class='danger'>chest pain</span> in recent months");
      if (rec.blurred_vision6 && (rec.blurred_vision6 === "Yes" || rec.blurred_vision6 === true)) conditions.push("experienced <span class='danger'>blurred vision</span> in the last 6 months");
      if (rec.palpitation && (rec.palpitation === "Yes" || rec.palpitation === true)) conditions.push("experiences <span class='danger'>palpitations</span>");
      if (rec.often_getting_angry && (rec.often_getting_angry === "Yes" || rec.often_getting_angry === true)) conditions.push("often feels angry");
      if (rec.breathing_while_walking && (rec.breathing_while_walking === "Yes" || rec.breathing_while_walking === true)) conditions.push("has <span class='danger'>breathing difficulty while walking</span>");
      if (rec.ifyes_chestpain && rec.ifyes_chestpain !== "0") conditions.push(`reported chest pain details: ${rec.ifyes_chestpain}`);
      if (rec.check_dtvk && (rec.check_dtvk === "1" || rec.check_dtvk === true)) conditions.push("has specific complaints noted");
      if (rec.check_ytyo && (rec.check_ytyo === "1" || rec.check_ytyo === true)) conditions.push("has additional medical history noted");
      if (rec.heart_disease_history && (rec.heart_disease_history === "Yes" || rec.heart_disease_history === true)) conditions.push("has a history of <span class='danger'>heart disease</span>");
      if (rec.kidney_history && (rec.kidney_history === "Yes" || rec.kidney_history === true)) conditions.push("has a history of <span class='danger'>kidney disease</span>");
      if (rec.stroke_history && (rec.stroke_history === "Yes" || rec.stroke_history === true)) conditions.push("has a history of <span class='danger'>stroke</span>");
      if (rec.bp_sugar_history && (rec.bp_sugar_history === "Yes" || rec.bp_sugar_history === true)) conditions.push("has a history of hypertension or diabetes");
      if (rec.bp_other_complaints && rec.bp_other_complaints !== "0") conditions.push(`other complaints: ${rec.bp_other_complaints}`);
      if (rec.check_lgdm && (rec.check_lgdm === "1" || rec.check_lgdm === true)) conditions.push("has women-specific history noted");
      if (rec.high_bp && (rec.high_bp === "Yes" || rec.high_bp === true)) conditions.push("diagnosed with <span class='danger'>high blood pressure</span>");
      if (rec.lbw && (rec.lbw === "Yes" || rec.lbw === true)) conditions.push("had a low birth weight baby");
      if (rec.regular_exercise && (rec.regular_exercise === "Yes" || rec.regular_exercise === true)) conditions.push("engages in regular exercise");
      if (rec.consume_fried && (rec.consume_fried === "Yes" || rec.consume_fried === true)) conditions.push("consumes fried foods");
      if (rec.long_periods && (rec.long_periods === "Yes" || rec.long_periods === true)) conditions.push("sits for long periods");
      if (rec.feel_stressed && (rec.feel_stressed === "Yes" || rec.feel_stressed === true)) conditions.push("feels stressed");
      if (rec.check_bmgb && (rec.check_bmgb === "1" || rec.check_bmgb === true)) conditions.push("has physical examination findings");
      if (rec.peripheral_pulsefeet && rec.peripheral_pulsefeet !== "0") conditions.push(`peripheral pulse (feet): ${rec.peripheral_pulsefeet}`);
      if (rec.for_peripheral_edema && (rec.for_peripheral_edema === "Yes" || rec.for_peripheral_edema === true)) conditions.push("has <span class='danger'>peripheral edema</span>");
      if (rec.rft_last_oneyear && (rec.rft_last_oneyear === "Yes" || rec.rft_last_oneyear === true)) conditions.push("had RFT test in the last year");
      if (rec.urine_albumin6 && (rec.urine_albumin6 === "Yes" || rec.urine_albumin6 === true)) conditions.push("has albumin in urine");
      if (rec.lab_scanning && rec.lab_scanning !== "0") conditions.push("has uploaded a lab report");

      let sentence = "The patient is stable with no notable complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryContent += sentence + '</li>';
    });
    summaryContent += '</ul>';

    const hypertensionRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      lab_scanning: rec.lab_scanning
    }));

    const hypertensionSummaryHtml = `
      <div class="hypertension-summary">
        <b>Screening for Hypertension Summary:</b>
        ${summaryContent}
        <div class="red-flag-box"><b>Screening for Hypertension Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { hypertensionSummaryHtml, redFlagsList, hypertensionRecords };
  } catch (err) {
    return {
      hypertensionSummaryHtml: `<div class="hypertension-summary" style="color:red;">
        <b>Error loading Screening for Hypertension data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      hypertensionRecords: []
    };
  }
};



 // Corrected generateHypertensionFollowupSummary function
const generateHypertensionFollowupSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'new_hypertensive', 'sudden_swelling_of_legs', 'any_history_of_fainting_or_fall',
      'severe_headache_sudden_onset', 'chest_pain_sudden_onset', 'breathlessness_sudden_onset',
      'any_nausea_vomiting_sudden_onset', 'drowsy', 'any_slurrred_speech',
      'any_change_in_gaitimbalance', 'none', 'hypertension_follow_up',
      'blurring_of_vision', 'anychest_pain', 'breathing_difficultyon', 'swelling_legs',
      'tingling_sensation', 'heavy_breathing', 'peripheral_edemas', 'peripheral_pulses',
      'check_kpry', 'check_dgyi', 'stopped_junks', 'medicines_regularly',
      'exercise_30mins', 'bp_medicinereason', 'provide_explanation', 'check_xdfn',
      'lipid_profile', 'micro_albumin', 'lab_reports'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Hypertension Follow up" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Hypertension Follow up" });
      // if (!doctypeMeta) throw new Error("Doctype 'Hypertension Follow up' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
      if (!validFields.includes('any_slurrred_speech')) {
        console.warn("Field 'any_slurrred_speech' not found in Hypertension Follow up doctype. Excluding from query.");
      }
    } catch (metaErr) {
      console.warn(`Could not validate fields for Hypertension Follow up: ${metaErr.message}`);
    }

    const args = {
      doctype: "Hypertension Follow up",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        hypertensionFollowupSummaryHtml: ``,
        redFlagsList: [],
        hypertensionFollowupRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        hypertensionFollowupSummaryHtml: ``,
        redFlagsList: [],
        hypertensionFollowupRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(hypertensionFollowupRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${hypertensionFollowupRedFlagsInfo[field].label} - ${hypertensionFollowupRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Hypertension Follow up records.</li></ul>';

    let summaryContent = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryContent += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.none && (rec.none === "1" || rec.none === true)) conditions.push("reported no notable issues");
      if (rec.blurring_of_vision && (rec.blurring_of_vision === "Yes" || rec.blurring_of_vision === true)) conditions.push("suffers from <span class='danger'>blurring of vision</span>");
      if (rec.anychest_pain && (rec.anychest_pain === "Yes" || rec.anychest_pain === true)) conditions.push("has <span class='danger'>chest pain</span>");
      if (rec.breathing_difficultyon && (rec.breathing_difficultyon === "Yes" || rec.breathing_difficultyon === true)) conditions.push("experiences <span class='danger'>breathing difficulty</span>");
      if (rec.swelling_legs && (rec.swelling_legs === "Yes" || rec.swelling_legs === true)) conditions.push("has <span class='danger'>swelling of legs</span>");
      if (rec.tingling_sensation && (rec.tingling_sensation === "Yes" || rec.tingling_sensation === true)) conditions.push("experiences <span class='danger'>tingling sensation</span>");
      if (rec.heavy_breathing && (rec.heavy_breathing === "Yes" || rec.heavy_breathing === true)) conditions.push("has <span class='danger'>heavy breathing</span>");
      if (rec.peripheral_edemas && (rec.peripheral_edemas === "Yes" || rec.peripheral_edemas === true)) conditions.push("has <span class='danger'>peripheral edema</span>");
      if (rec.peripheral_pulses && rec.peripheral_pulses !== "0") conditions.push(`peripheral pulses: ${rec.peripheral_pulses}`);
      if (rec.check_kpry && (rec.check_kpry === "1" || rec.check_kpry === true)) conditions.push("has specific physical exam findings");
      if (rec.check_dgyi && (rec.check_dgyi === "1" || rec.check_dgyi === true)) conditions.push("has specific lifestyle history noted");
      if (rec.stopped_junks && (rec.stopped_junks === "Yes" || rec.stopped_junks === true)) conditions.push("has stopped junk food");
      if (rec.medicines_regularly && (rec.medicines_regularly === "Yes" || rec.medicines_regularly === true)) conditions.push("takes medicines regularly");
      if (rec.exercise_30mins && (rec.exercise_30mins === "Yes" || rec.exercise_30mins === true)) conditions.push("exercises 30 minutes daily");
      if (rec.bp_medicinereason && rec.bp_medicinereason !== "0") conditions.push(`reason for BP medicine: ${rec.bp_medicinereason}`);
      if (rec.provide_explanation && rec.provide_explanation !== "0") conditions.push(`medical history explanation: ${rec.provide_explanation}`);
      if (rec.check_xdfn && (rec.check_xdfn === "1" || rec.check_xdfn === true)) conditions.push("has laboratory test findings");
      if (rec.lipid_profile && (rec.lipid_profile === "Yes" || rec.lipid_profile === true)) conditions.push("has lipid profile done");
      if (rec.micro_albumin && (rec.micro_albumin === "Yes" || rec.micro_albumin === true)) conditions.push("has micro albumin test done");
      if (rec.lab_reports && rec.lab_reports !== "0") conditions.push("has uploaded a lab report");

      let sentence = "The patient is stable with no notable complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryContent += sentence + '</li>';
    });
    summaryContent += '</ul>';

    const hypertensionFollowupRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      lab_reports: rec.lab_reports
    }));

    const hypertensionFollowupSummaryHtml = `
      <div class="hypertension-followup-summary">
        <b>Hypertension Follow up Summary:</b>
        ${summaryContent}
        <div class="red-flag-box"><b>Hypertension Follow up Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { hypertensionFollowupSummaryHtml, redFlagsList, hypertensionFollowupRecords };
  } catch (err) {
    return {
      hypertensionFollowupSummaryHtml: `<div class="hypertension-followup-summary" style="color:red;">
        <b>Error loading Hypertension Follow up data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      hypertensionFollowupRecords: []
    };
  }
};



// Corrected generateAbdominalPainGastrointestinalSummary function
const generateAbdominalPainGastrointestinalSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'sudden_abdominalpain_vomiting', 'abdominal_pain_with_vomiting', 'worsening_of_abdominal_pain',
      'any_bloating_sensation', 'any_weight_loss', 'change_in_color_of_stools', 'history_of_abdominai', 'none',
      'abdominal_pain_gastrointestinal', 'abdominal_distension', 'abnomial_symptoms', 'swelling_food',
      'weight_change', 'appetite_changes', 'abdominal_pain', 'yes_abdominalpain', 'abdominalpain_start',
      'constant_continuous', 'colicky', 'cramping', 'dull_aching', 'stabbing', 'burning', 'bloating',
      'other_gastric', 'gasother_describe', 'check_dmle', 'hunger', 'after_food', 'urination', 'pressure',
      'movement', 'coughing', 'straining', 'unsure_gaspain', 'other_paingas', 'pain_other_describe',
      'medication_describe', 'relief_other', 'medication', 'food', 'leaning_forward', 'squatting',
      'gastric_vomit', 'passing_of_stool', 'gastric_none', 'dontknow_gastric', 'gasother_relief',
      'check_ugdt', 'otherbody_pain', 'yes_radiates', 'severity_of_the_pain', 'fever', 'constipation',
      'unable_to_pass_the_gas', 'blenching', 'hiccups', 'stool_color', 'diarrhea', 'vomiting',
      'night_sweats', 'difficulty_in_breathing', 'pedal_oedema', 'abd_none', 'check_sksj',
      'shortness_breath', 'difficulty_in_urination', 'buring_sensation', 'jaundice', 'none_gastricpain',
      'others', 'other_symptoms', 'tired_easily', 'acidity_reflux', 'check_slhq', 'spicy_food',
      'food_ontime', 'food_outside', 'check_lkxh', 'last_menstruation_period', 'menstrual_cycle',
      'any_white_discharge', 'discharge_character', 'foul_smelling', 'check_gtte', 'stomach_cancer',
      'yes_upload'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Abdominal pain Gastrointestinal" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Abdominal pain Gastrointestinal" });
      // if (!doctypeMeta) throw new Error("Doctype 'Abdominal pain Gastrointestinal' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Abdominal pain Gastrointestinal: ${metaErr.message}`);
    }

    const args = {
      doctype: "Abdominal pain Gastrointestinal",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        abdominalPainGastrointestinalSummaryHtml: ``,
        redFlagsList: [],
        abdominalPainGastrointestinalRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        abdominalPainGastrointestinalSummaryHtml: ``,
        redFlagsList: [],
        abdominalPainGastrointestinalRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      const flags = [];
      Object.keys(abdominalPainGastrointestinalRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          flags.push(`${abdominalPainGastrointestinalRedFlagsInfo[field].label} - ${abdominalPainGastrointestinalRedFlagsInfo[field].message}`);
        }
      });
      if (flags.length > 0) {
        redFlagsList.push({
          recordNumber: idx + 1,
          creation: rec.creation,
          flags: flags
        });
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Abdominal pain Gastrointestinal records.</li></ul>';

    let summaryContent = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryContent += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.none && (rec.none === "1" || rec.none === true) || rec.abd_none && (rec.abd_none === "1" || rec.abd_none === true)) conditions.push("reported no notable issues");
      if (rec.abdominal_distension && (rec.abdominal_distension === "Yes" || rec.abdominal_distension === true)) conditions.push("has abdominal distension");
      if (rec.abnomial_symptoms && (rec.abnomial_symptoms === "Yes" || rec.abnomial_symptoms === true)) conditions.push("has abdominal symptoms");
      if (rec.swelling_food && (rec.swelling_food === "Yes" || rec.swelling_food === true)) conditions.push("experiences swelling after food");
      if (rec.weight_change && (rec.weight_change === "Yes" || rec.weight_change === true)) conditions.push("has <span class='danger'>weight change</span>");
      if (rec.appetite_changes && (rec.appetite_changes === "Yes" || rec.appetite_changes === true)) conditions.push("has appetite changes");
      if (rec.abdominal_pain && (rec.abdominal_pain === "Yes" || rec.abdominal_pain === true)) conditions.push("has <span class='danger'>abdominal pain</span>");
      if (rec.yes_abdominalpain && (rec.yes_abdominalpain === "Yes" || rec.yes_abdominalpain === true)) conditions.push("confirmed abdominal pain");
      if (rec.abdominalpain_start && rec.abdominalpain_start !== "0") conditions.push(`abdominal pain started: ${rec.abdominalpain_start}`);
      if (rec.constant_continuous && (rec.constant_continuous === "1" || rec.constant_continuous === true)) conditions.push("pain is constant/continuous");
      if (rec.colicky && (rec.colicky === "1" || rec.colicky === true)) conditions.push("pain is colicky");
      if (rec.cramping && (rec.cramping === "1" || rec.cramping === true)) conditions.push("pain is cramping");
      if (rec.dull_aching && (rec.dull_aching === "1" || rec.dull_aching === true)) conditions.push("pain is dull/aching");
      if (rec.stabbing && (rec.stabbing === "1" || rec.stabbing === true)) conditions.push("pain is <span class='danger'>stabbing</span>");
      if (rec.burning && (rec.burning === "1" || rec.burning === true)) conditions.push("pain is <span class='danger'>burning</span>");
      if (rec.bloating && (rec.bloating === "1" || rec.bloating === true)) conditions.push("pain is bloating");
      if (rec.other_gastric && (rec.other_gastric === "1" || rec.other_gastric === true)) conditions.push("has other gastric pain characteristics");
      if (rec.gasother_describe && rec.gasother_describe !== "0") conditions.push(`other pain description: ${rec.gasother_describe}`);
      if (rec.check_dmle && (rec.check_dmle === "1" || rec.check_dmle === true)) conditions.push("has pain triggers noted");
      if (rec.hunger && (rec.hunger === "1" || rec.hunger === true)) conditions.push("pain increases with hunger");
      if (rec.after_food && (rec.after_food === "1" || rec.after_food === true)) conditions.push("pain increases after food");
      if (rec.urination && (rec.urination === "1" || rec.urination === true)) conditions.push("pain increases with urination");
      if (rec.pressure && (rec.pressure === "1" || rec.pressure === true)) conditions.push("pain increases with pressure");
      if (rec.movement && (rec.movement === "1" || rec.movement === true)) conditions.push("pain increases with movement");
      if (rec.coughing && (rec.coughing === "1" || rec.coughing === true)) conditions.push("pain increases with coughing");
      if (rec.straining && (rec.straining === "1" || rec.straining === true)) conditions.push("pain increases with straining");
      if (rec.unsure_gaspain && (rec.unsure_gaspain === "1" || rec.unsure_gaspain === true)) conditions.push("unsure about pain triggers");
      if (rec.other_paingas && (rec.other_paingas === "1" || rec.other_paingas === true)) conditions.push("has other pain triggers");
      if (rec.pain_other_describe && rec.pain_other_describe !== "0") conditions.push(`other pain triggers: ${rec.pain_other_describe}`);
      if (rec.medication && (rec.medication === "1" || rec.medication === true)) conditions.push("pain relieved by medication");
      if (rec.medication_describe && rec.medication_describe !== "0") conditions.push(`medication description: ${rec.medication_describe}`);
      if (rec.food && (rec.food === "1" || rec.food === true)) conditions.push("pain relieved by food");
      if (rec.leaning_forward && (rec.leaning_forward === "1" || rec.leaning_forward === true)) conditions.push("pain relieved by leaning forward");
      if (rec.squatting && (rec.squatting === "1" || rec.squatting === true)) conditions.push("pain relieved by squatting");
      if (rec.gastric_vomit && (rec.gastric_vomit === "1" || rec.gastric_vomit === true)) conditions.push("pain relieved by vomiting");
      if (rec.passing_of_stool && (rec.passing_of_stool === "1" || rec.passing_of_stool === true)) conditions.push("pain relieved by passing stool");
      if (rec.gastric_none && (rec.gastric_none === "1" || rec.gastric_none === true)) conditions.push("no known pain relief methods");
      if (rec.dontknow_gastric && (rec.dontknow_gastric === "1" || rec.dontknow_gastric === true)) conditions.push("unsure about pain relief");
      if (rec.gasother_relief && (rec.gasother_relief === "1" || rec.gasother_relief === true)) conditions.push("has other pain relief methods");
      if (rec.relief_other && rec.relief_other !== "0") conditions.push(`other relief methods: ${rec.relief_other}`);
      if (rec.check_ugdt && (rec.check_ugdt === "1" || rec.check_ugdt === true)) conditions.push("has other complaints noted");
      if (rec.otherbody_pain && (rec.otherbody_pain === "Yes" || rec.otherbody_pain === true)) conditions.push("has other body pain");
      if (rec.yes_radiates && (rec.yes_radiates === "Yes" || rec.yes_radiates === true)) conditions.push("pain radiates");
      if (rec.severity_of_the_pain && rec.severity_of_the_pain !== "0") conditions.push(`pain severity: ${rec.severity_of_the_pain}`);
      if (rec.fever && (rec.fever === "1" || rec.fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.constipation && (rec.constipation === "1" || rec.constipation === true)) conditions.push("has constipation");
      if (rec.unable_to_pass_the_gas && (rec.unable_to_pass_the_gas === "1" || rec.unable_to_pass_the_gas === true)) conditions.push("is <span class='danger'>unable to pass gas</span>");
      if (rec.blenching && (rec.blenching === "1" || rec.blenching === true)) conditions.push("has blenching");
      if (rec.hiccups && (rec.hiccups === "1" || rec.hiccups === true)) conditions.push("has hiccups");
      if (rec.stool_color && (rec.stool_color === "1" || rec.stool_color === true)) conditions.push("has <span class='danger'>abnormal stool color</span>");
      if (rec.diarrhea && (rec.diarrhea === "1" || rec.diarrhea === true)) conditions.push("has <span class='danger'>diarrhea</span>");
      if (rec.vomiting && (rec.vomiting === "1" || rec.vomiting === true)) conditions.push("has <span class='danger'>vomiting</span>");
      if (rec.night_sweats && (rec.night_sweats === "1" || rec.night_sweats === true)) conditions.push("has <span class='danger'>night sweats</span>");
      if (rec.difficulty_in_breathing && (rec.difficulty_in_breathing === "1" || rec.difficulty_in_breathing === true)) conditions.push("has <span class='danger'>difficulty in breathing</span>");
      if (rec.pedal_oedema && (rec.pedal_oedema === "1" || rec.pedal_oedema === true)) conditions.push("has <span class='danger'>pedal oedema</span>");
      if (rec.shortness_breath && (rec.shortness_breath === "1" || rec.shortness_breath === true)) conditions.push("has <span class='danger'>shortness of breath</span>");
      if (rec.difficulty_in_urination && (rec.difficulty_in_urination === "1" || rec.difficulty_in_urination === true)) conditions.push("has <span class='danger'>difficulty in urination</span>");
      if (rec.buring_sensation && (rec.buring_sensation === "1" || rec.buring_sensation === true)) conditions.push("has <span class='danger'>burning sensation</span>");
      if (rec.jaundice && (rec.jaundice === "1" || rec.jaundice === true)) conditions.push("has <span class='danger'>jaundice</span>");
      if (rec.none_gastricpain && (rec.none_gastricpain === "1" || rec.none_gastricpain === true)) conditions.push("no associated gastric complaints");
      if (rec.others && (rec.others === "1" || rec.others === true)) conditions.push("has other symptoms");
      if (rec.other_symptoms && rec.other_symptoms !== "0") conditions.push(`other symptoms: ${rec.other_symptoms}`);
      if (rec.tired_easily && (rec.tired_easily === "Yes" || rec.tired_easily === true)) conditions.push("tires easily");
      if (rec.acidity_reflux && (rec.acidity_reflux === "Yes" || rec.acidity_reflux === true)) conditions.push("has history of acidity/reflux");
      if (rec.check_slhq && (rec.check_slhq === "1" || rec.check_slhq === true)) conditions.push("has lifestyle history noted");
      if (rec.spicy_food && (rec.spicy_food === "Yes" || rec.spicy_food === true)) conditions.push("consumes spicy food");
      if (rec.food_ontime && (rec.food_ontime === "Yes" || rec.food_ontime === true)) conditions.push("eats food on time");
      if (rec.food_outside && (rec.food_outside === "Yes" || rec.food_outside === true)) conditions.push("consumes food from outside");
      if (rec.check_lkxh && (rec.check_lkxh === "1" || rec.check_lkxh === true)) conditions.push("has menstrual history noted");
      if (rec.last_menstruation_period && rec.last_menstruation_period !== "0") conditions.push(`last menstruation period: ${rec.last_menstruation_period}`);
      if (rec.menstrual_cycle && (rec.menstrual_cycle === "Yes" || rec.menstrual_cycle === true)) conditions.push("has irregular menstrual cycle");
      if (rec.any_white_discharge && (rec.any_white_discharge === "Yes" || rec.any_white_discharge === true)) conditions.push("has <span class='danger'>white discharge</span>");
      if (rec.discharge_character && rec.discharge_character !== "0") conditions.push(`discharge character: ${rec.discharge_character}`);
      if (rec.foul_smelling && (rec.foul_smelling === "Yes" || rec.foul_smelling === true)) conditions.push("has <span class='danger'>foul-smelling discharge</span>");
      if (rec.check_gtte && (rec.check_gtte === "1" || rec.check_gtte === true)) conditions.push("has family history noted");
      if (rec.stomach_cancer && (rec.stomach_cancer === "Yes" || rec.stomach_cancer === true)) conditions.push("has family history of <span class='danger'>stomach cancer</span>");
      if (rec.yes_upload && rec.yes_upload !== "0") conditions.push("has uploaded a lab report");

      let sentence = "The patient is stable with no notable complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryContent += sentence + '</li>';
    });
    summaryContent += '</ul>';

    const abdominalPainGastrointestinalRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      yes_upload: rec.yes_upload
    }));

    const abdominalPainGastrointestinalSummaryHtml = `
      <div class="abdominal-pain-gastrointestinal-summary">
        <b>Abdominal pain Gastrointestinal Summary:</b>
        ${summaryContent}
        <div class="red-flag-box"><b>Abdominal pain Gastrointestinal Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { abdominalPainGastrointestinalSummaryHtml, redFlagsList, abdominalPainGastrointestinalRecords };
  } catch (err) {
    return {
      abdominalPainGastrointestinalSummaryHtml: `<div class="abdominal-pain-gastrointestinal-summary" style="color:red;">
        <b>Error loading Abdominal pain Gastrointestinal data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      abdominalPainGastrointestinalRecords: []
    };
  }
};



// Corrected generateDiarrheaSummary function
const generateDiarrheaSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'severly_dehydrated', 'any_child_with_diarrhoea', 'fever_with_diarrhoea', 'none_child',
      'severe_dehydration', 'diarrhoea_vomiting', 'blood_in_stools', 'foul_smelling_diarrhoea',
      'severe_abdominal_pain_with_diarrhoea', 'feeding_better_ors', 'diarrhoea_fever', 'none_diarrhea',
      'diarrhea', 'suffering_diarrhea', 'stool_type', 'food_outside', 'travel_recently',
      'diarrhea_episodes', 'since_howlong', 'times_aday', 'yes_outsidefood', 'what_outsidefood',
      'check_zpwe', 'vomiting', 'fever', 'abdominal_pain_with_diarrhea', 'none', 'pain_bowl',
      'recurrent_diarrhea', 'check_jspw', 'dehydration_degree', 'bloodprevious', 'report_upload'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Diarrhea" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Diarrhea" });
      // if (!doctypeMeta) throw new Error("Doctype 'Diarrhea' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Diarrhea: ${metaErr.message}`);
    }

    const args = {
      doctype: "Diarrhea",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        diarrheaSummaryHtml: ``,
        redFlagsList: [],
        diarrheaRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        diarrheaSummaryHtml: ``,
        redFlagsList: [],
        diarrheaRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      const flags = [];
      Object.keys(diarrheaRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          flags.push(`${diarrheaRedFlagsInfo[field].label} - ${diarrheaRedFlagsInfo[field].message}`);
        }
      });
      if (flags.length > 0) {
        redFlagsList.push({
          recordNumber: idx + 1,
          creation: rec.creation,
          flags: flags
        });
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Diarrhea records.</li></ul>';

    let summaryContent = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryContent += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.none && (rec.none === "1" || rec.none === true) || 
          rec.none_child && (rec.none_child === "1" || rec.none_child === true) || 
          rec.none_diarrhea && (rec.none_diarrhea === "1" || rec.none_diarrhea === true)) {
        conditions.push("reported no notable issues");
      }
      if (rec.suffering_diarrhea && (rec.suffering_diarrhea === "Yes" || rec.suffering_diarrhea === true)) conditions.push("has <span class='danger'>diarrhea</span>");
      if (rec.stool_type && rec.stool_type !== "0") conditions.push(`stool type: ${rec.stool_type}`);
      if (rec.food_outside && (rec.food_outside === "Yes" || rec.food_outside === true)) conditions.push("consumed food from outside");
      if (rec.yes_outsidefood && rec.yes_outsidefood !== "0") conditions.push(`outside food: ${rec.yes_outsidefood}`);
      if (rec.what_outsidefood && rec.what_outsidefood !== "0") conditions.push(`specific outside food: ${rec.what_outsidefood}`);
      if (rec.travel_recently && (rec.travel_recently === "Yes" || rec.travel_recently === true)) conditions.push("recently traveled");
      if (rec.diarrhea_episodes && rec.diarrhea_episodes !== "0") conditions.push(`diarrhea episodes: ${rec.diarrhea_episodes}`);
      if (rec.since_howlong && rec.since_howlong !== "0") conditions.push(`diarrhea duration: ${rec.since_howlong}`);
      if (rec.times_aday && rec.times_aday !== "0") conditions.push(`diarrhea frequency: ${rec.times_aday} times/day`);
      if (rec.check_zpwe && (rec.check_zpwe === "1" || rec.check_zpwe === true)) conditions.push("has additional complaints noted");
      if (rec.vomiting && (rec.vomiting === "1" || rec.vomiting === true)) conditions.push("has <span class='danger'>vomiting</span>");
      if (rec.fever && (rec.fever === "1" || rec.fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.abdominal_pain_with_diarrhea && (rec.abdominal_pain_with_diarrhea === "1" || rec.abdominal_pain_with_diarrhea === true)) conditions.push("has <span class='danger'>abdominal pain with diarrhea</span>");
      if (rec.pain_bowl && (rec.pain_bowl === "Yes" || rec.pain_bowl === true)) conditions.push("has pain during bowel movements");
      if (rec.recurrent_diarrhea && (rec.recurrent_diarrhea === "Yes" || rec.recurrent_diarrhea === true)) conditions.push("has history of recurrent diarrhea");
      if (rec.check_jspw && (rec.check_jspw === "1" || rec.check_jspw === true)) conditions.push("has physical examination findings");
      if (rec.dehydration_degree && rec.dehydration_degree !== "0") conditions.push(`dehydration degree: ${rec.dehydration_degree}`);
      if (rec.bloodprevious && (rec.bloodprevious === "Yes" || rec.bloodprevious === true)) conditions.push("has history of <span class='danger'>blood in stools</span>");
      if (rec.feeding_better_ors && (rec.feeding_better_ors === "1" || rec.feeding_better_ors === true)) conditions.push("improving with ORS");
      if (rec.report_upload && rec.report_upload !== "0") conditions.push("has uploaded a lab report");

      let sentence = "The patient is stable with no notable complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryContent += sentence + '</li>';
    });
    summaryContent += '</ul>';

    const diarrheaRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      report_upload: rec.report_upload
    }));

    const diarrheaSummaryHtml = `
      <div class="diarrhea-summary">
        <b>Diarrhea Summary:</b>
        ${summaryContent}
        <div class="red-flag-box"><b>Diarrhea Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { diarrheaSummaryHtml, redFlagsList, diarrheaRecords };
  } catch (err) {
    return {
      diarrheaSummaryHtml: `<div class="diarrhea-summary" style="color:red;">
        <b>Error loading Diarrhea data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      diarrheaRecords: []
    };
  }
};


// Fixed generateVomitingSummary function
const generateVomitingSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'dehydration', 'sever_dehydration', 'none_vomiting_child', 'if_vomiting_with_mild_dehydration',
      'blood_in_the_vomit', 'none_vomiting',
      'vomiting', 'suffering_vomiting', 'happen_shortly', 'sudden_vomit', 'outside_food',
      'travelled_anywhere', 'jatra_functions', 'pregnant_women', 'since_howlong', 'vomit_colour',
      'check_mflx', 'cough', 'abdominal_pain', 'diarrhoea', 'acidity', 'fever', 'headache',
      'change_in_vision', 'giddiness', 'ringing_in_ears', 'none', 'relived_vomiting', 'acidity_relieved',
      'check_vdwf', 'spicy_oily', 'food_on_time', 'history_past', 'migrane_diagnose',
      'acidity_diagnose', 'noise_factory', 'check_auuw', 'check_gycf', 'degree_dehydration',
      'oral_cavity', 'previous_report', 'upload_report'
    ];
    let validFields = [...allFields];
    // try {
    // //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Vomiting" });
    // //   if (!doctypeMeta) throw new Error("Doctype 'Vomiting' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Vomiting: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Vomiting",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        vomitingSummaryHtml: ``,
        redFlagsList: [],
        vomitingRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        vomitingSummaryHtml: ``,
        redFlagsList: [],
        vomitingRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(vomitingRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${vomitingRedFlagsInfo[field].label} - ${vomitingRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Vomiting records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.vomiting && rec.vomiting !== "0") conditions.push(`vomiting status: ${rec.vomiting}`);
      if (rec.suffering_vomiting && (rec.suffering_vomiting === "Yes" || rec.suffering_vomiting === true)) conditions.push("is suffering from <span class='danger'>vomiting</span>");
      if (rec.happen_shortly && (rec.happen_shortly === "Yes" || rec.happen_shortly === true)) conditions.push("vomiting happened shortly after eating");
      if (rec.sudden_vomit && (rec.sudden_vomit === "Yes" || rec.sudden_vomit === true)) conditions.push("experienced <span class='danger'>sudden vomiting</span>");
      if (rec.outside_food && (rec.outside_food === "Yes" || rec.outside_food === true)) conditions.push("consumed outside food");
      if (rec.travelled_anywhere && (rec.travelled_anywhere === "Yes" || rec.travelled_anywhere === true)) conditions.push("travelled recently");
      if (rec.jatra_functions && (rec.jatra_functions === "Yes" || rec.jatra_functions === true)) conditions.push("attended jatra or functions");
      if (rec.pregnant_women && (rec.pregnant_women === "Yes" || rec.pregnant_women === true)) conditions.push("is <span class='danger'>pregnant</span>");
      if (rec.since_howlong && rec.since_howlong !== "0") conditions.push(`symptoms since: ${rec.since_howlong}`);
      if (rec.vomit_colour && rec.vomit_colour !== "0") conditions.push(`vomit color: ${rec.vomit_colour}`);
      if (rec.cough && (rec.cough === "Yes" || rec.cough === true)) conditions.push("has cough");
      if (rec.abdominal_pain && (rec.abdominal_pain === "Yes" || rec.abdominal_pain === true)) conditions.push("has <span class='danger'>abdominal pain</span>");
      if (rec.diarrhoea && (rec.diarrhoea === "Yes" || rec.diarrhoea === true)) conditions.push("has <span class='danger'>diarrhea</span>");
      if (rec.acidity && (rec.acidity === "Yes" || rec.acidity === true)) conditions.push("has acidity");
      if (rec.fever && (rec.fever === "Yes" || rec.fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.headache && (rec.headache === "Yes" || rec.headache === true)) conditions.push("has headache");
      if (rec.change_in_vision && (rec.change_in_vision === "Yes" || rec.change_in_vision === true)) conditions.push("has <span class='danger'>change in vision</span>");
      if (rec.giddiness && (rec.giddiness === "Yes" || rec.giddiness === true)) conditions.push("experiences <span class='danger'>giddiness</span>");
      if (rec.ringing_in_ears && (rec.ringing_in_ears === "Yes" || rec.ringing_in_ears === true)) conditions.push("has <span class='danger'>ringing in ears</span>");
      if (rec.none && (rec.none === "Yes" || rec.none === true) || rec.none_vomiting && (rec.none_vomiting === "Yes" || rec.none_vomiting === true) || rec.none_vomiting_child && (rec.none_vomiting_child === "Yes" || rec.none_vomiting_child === true)) conditions.push("reports no other symptoms");
      if (rec.relived_vomiting && (rec.relived_vomiting === "Yes" || rec.relived_vomiting === true)) conditions.push("vomiting is relieved");
      if (rec.acidity_relieved && (rec.acidity_relieved === "Yes" || rec.acidity_relieved === true)) conditions.push("acidity is relieved");
      if (rec.spicy_oily && (rec.spicy_oily === "Yes" || rec.spicy_oily === true)) conditions.push("consumes spicy or oily food");
      if (rec.food_on_time && (rec.food_on_time === "Yes" || rec.food_on_time === true)) conditions.push("eats food on time");
      if (rec.history_past && rec.history_past !== "0") conditions.push(`past history: ${rec.history_past}`);
      if (rec.migrane_diagnose && (rec.migrane_diagnose === "Yes" || rec.migrane_diagnose === true)) conditions.push("diagnosed with <span class='danger'>migraine</span>");
      if (rec.acidity_diagnose && (rec.acidity_diagnose === "Yes" || rec.acidity_diagnose === true)) conditions.push("diagnosed with acidity");
      if (rec.noise_factory && (rec.noise_factory === "Yes" || rec.noise_factory === true)) conditions.push("works in a noisy factory");
      if (rec.check_auuw && (rec.check_auuw === "Yes" || rec.check_auuw === true)) conditions.push("has occupational health concerns");
      if (rec.check_gycf && (rec.check_gycf === "Yes" || rec.check_gycf === true)) conditions.push("has physical examination findings");
      if (rec.degree_dehydration && rec.degree_dehydration !== "0") conditions.push(`degree of dehydration: ${rec.degree_dehydration}`);
      if (rec.oral_cavity && rec.oral_cavity !== "0") conditions.push(`oral cavity condition: ${rec.oral_cavity}`);
      if (rec.previous_report && (rec.previous_report === "Yes" || rec.previous_report === true)) conditions.push("has previous lab reports");
      if (rec.upload_report && rec.upload_report !== "0") conditions.push("has uploaded a lab report");

      let sentence = "The patient is stable with no notable vomiting complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const vomitingRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      upload_report: rec.upload_report
    }));

    const vomitingSummaryHtml = `
      <div class="vomiting-summary">
        <b>Vomiting Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Vomiting Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { vomitingSummaryHtml, redFlagsList, vomitingRecords };
  } catch (err) {
    return {
      vomitingSummaryHtml: `<div class="vomiting-summary" style="color:red;">
        <b>Error loading Vomiting data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      vomitingRecords: []
    };
  }
};


// Corrected generateFatigueSummary function
const generateFatigueSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'since_when_have_you_had_this_symptom', 'other_fatigue', 'customary_meal',
      'in_a_day_when_do_you_feel_the_symptom_the_most',
      'fever', 'chills', 'night_sweats', 'diarrhea', 'vomiting', 'breathlessness_on_exertion',
      'weight_change_kg', 'none', 'if_weight_change', 'do_you_have_jaundice',
      'day_time_sleepiness', 'do_you_have_frequent_nose_bleeding', 'gums_bleed',
      'have_you_vomited_blood_anytime', 'have_you_noticed_blood_in_your_stool',
      'is_the_color_of_your_stool_black', 'any_difficulty_or_burning_while_passing_urine',
      'any_tooth_extractions', 'since_when',
      'any_surgerytrauma_in_the_past', 'any_blood_transfusion_in_the_past',
      'have_you_been_diagnosed_with_cancer', 'any_history_of_hypertension',
      'any_history_of_heart_diseases', 'any_history_of_diabetes', 'any_history_of_thyroid_issues',
      'any_history_of_lung_disease', 'excessive_bleeding_after_delivery',
      'are_you_breastfeeding_your_child_now', 'regularly_fasting',
      'is_your_work_involves_night_shift', 'previous_lab_reports', 'if_yes_please_upload'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Fatigue" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Fatigue" });
      // if (!doctypeMeta) throw new Error("Doctype 'Fatigue' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Fatigue: ${metaErr.message}`);
    }

    const args = {
      doctype: "Fatigue",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        fatigueSummaryHtml: ``,
        redFlagsList: [],
        fatigueRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        fatigueSummaryHtml: ``,
        redFlagsList: [],
        fatigueRecords: []
      };
    }

    let redFlagsList = [];
    // Uncomment and define fatigueRedFlagsInfo if red flags are needed
    // records.forEach((rec, idx) => {
    //   const flags = [];
    //   Object.keys(fatigueRedFlagsInfo).forEach(field => {
    //     if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
    //       flags.push(`${fatigueRedFlagsInfo[field].label} - ${fatigueRedFlagsInfo[field].message}`);
    //     }
    //   });
    //   if (flags.length > 0) {
    //     redFlagsList.push({
    //       recordNumber: idx + 1,
    //       creation: rec.creation,
    //       flags: flags
    //     });
    //   }
    // });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags defined for Fatigue records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.since_when_have_you_had_this_symptom && rec.since_when_have_you_had_this_symptom !== "0") conditions.push(`symptoms since: ${rec.since_when_have_you_had_this_symptom}`);
      if (rec.other_fatigue && rec.other_fatigue !== "0") conditions.push(`other fatigue details: ${rec.other_fatigue}`);
      if (rec.customary_meal && rec.customary_meal !== "0") conditions.push(`customary meal: ${rec.customary_meal}`);
      if (rec.in_a_day_when_do_you_feel_the_symptom_the_most && rec.in_a_day_when_do_you_feel_the_symptom_the_most !== "0") conditions.push(`most symptomatic time: ${rec.in_a_day_when_do_you_feel_the_symptom_the_most}`);
      if (rec.fever && (rec.fever === "Yes" || rec.fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.chills && (rec.chills === "Yes" || rec.chills === true)) conditions.push("has <span class='danger'>chills</span>");
      if (rec.night_sweats && (rec.night_sweats === "Yes" || rec.night_sweats === true)) conditions.push("has <span class='danger'>night sweats</span>");
      if (rec.diarrhea && (rec.diarrhea === "Yes" || rec.diarrhea === true)) conditions.push("has <span class='danger'>diarrhea</span>");
      if (rec.vomiting && (rec.vomiting === "Yes" || rec.vomiting === true)) conditions.push("has <span class='danger'>vomiting</span>");
      if (rec.breathlessness_on_exertion && (rec.breathlessness_on_exertion === "Yes" || rec.breathlessness_on_exertion === true)) conditions.push("has <span class='danger'>breathlessness on exertion</span>");
      if (rec.weight_change_kg && rec.weight_change_kg !== "0") conditions.push(`weight change: ${rec.weight_change_kg} kg`);
      if (rec.if_weight_change && rec.if_weight_change !== "0") conditions.push(`weight change details: ${rec.if_weight_change}`);
      if (rec.do_you_have_jaundice && (rec.do_you_have_jaundice === "Yes" || rec.do_you_have_jaundice === true)) conditions.push("has <span class='danger'>jaundice</span>");
      if (rec.day_time_sleepiness && (rec.day_time_sleepiness === "Yes" || rec.day_time_sleepiness === true)) conditions.push("has day-time sleepiness");
      if (rec.do_you_have_frequent_nose_bleeding && (rec.do_you_have_frequent_nose_bleeding === "Yes" || rec.do_you_have_frequent_nose_bleeding === true)) conditions.push("has <span class='danger'>frequent nose bleeding</span>");
      if (rec.gums_bleed && (rec.gums_bleed === "Yes" || rec.gums_bleed === true)) conditions.push("has <span class='danger'>bleeding gums</span>");
      if (rec.have_you_vomited_blood_anytime && (rec.have_you_vomited_blood_anytime === "Yes" || rec.have_you_vomited_blood_anytime === true)) conditions.push("has <span class='danger'>vomited blood</span>");
      if (rec.have_you_noticed_blood_in_your_stool && (rec.have_you_noticed_blood_in_your_stool === "Yes" || rec.have_you_noticed_blood_in_your_stool === true)) conditions.push("has <span class='danger'>blood in stool</span>");
      if (rec.is_the_color_of_your_stool_black && (rec.is_the_color_of_your_stool_black === "Yes" || rec.is_the_color_of_your_stool_black === true)) conditions.push("has <span class='danger'>black stool</span>");
      if (rec.any_difficulty_or_burning_while_passing_urine && (rec.any_difficulty_or_burning_while_passing_urine === "Yes" || rec.any_difficulty_or_burning_while_passing_urine === true)) conditions.push("has <span class='danger'>difficulty or burning while passing urine</span>");
      if (rec.any_tooth_extractions && (rec.any_tooth_extractions === "Yes" || rec.any_tooth_extractions === true)) conditions.push("had tooth extractions");
      if (rec.since_when && rec.since_when !== "0") conditions.push(`associated symptoms since: ${rec.since_when}`);
      if (rec.any_surgerytrauma_in_the_past && (rec.any_surgerytrauma_in_the_past === "Yes" || rec.any_surgerytrauma_in_the_past === true)) conditions.push("had <span class='danger'>past surgery or trauma</span>");
      if (rec.any_blood_transfusion_in_the_past && (rec.any_blood_transfusion_in_the_past === "Yes" || rec.any_blood_transfusion_in_the_past === true)) conditions.push("had <span class='danger'>past blood transfusion</span>");
      if (rec.have_you_been_diagnosed_with_cancer && (rec.have_you_been_diagnosed_with_cancer === "Yes" || rec.have_you_been_diagnosed_with_cancer === true)) conditions.push("diagnosed with <span class='danger'>cancer</span>");
      if (rec.any_history_of_hypertension && (rec.any_history_of_hypertension === "Yes" || rec.any_history_of_hypertension === true)) conditions.push("has history of <span class='danger'>hypertension</span>");
      if (rec.any_history_of_heart_diseases && (rec.any_history_of_heart_diseases === "Yes" || rec.any_history_of_heart_diseases === true)) conditions.push("has history of <span class='danger'>heart disease</span>");
      if (rec.any_history_of_diabetes && (rec.any_history_of_diabetes === "Yes" || rec.any_history_of_diabetes === true)) conditions.push("has history of <span class='danger'>diabetes</span>");
      if (rec.any_history_of_thyroid_issues && (rec.any_history_of_thyroid_issues === "Yes" || rec.any_history_of_thyroid_issues === true)) conditions.push("has history of <span class='danger'>thyroid issues</span>");
      if (rec.any_history_of_lung_disease && (rec.any_history_of_lung_disease === "Yes" || rec.any_history_of_lung_disease === true)) conditions.push("has history of <span class='danger'>lung disease</span>");
      if (rec.excessive_bleeding_after_delivery && (rec.excessive_bleeding_after_delivery === "Yes" || rec.excessive_bleeding_after_delivery === true)) conditions.push("had <span class='danger'>excessive bleeding after delivery</span>");
      if (rec.are_you_breastfeeding_your_child_now && (rec.are_you_breastfeeding_your_child_now === "Yes" || rec.are_you_breastfeeding_your_child_now === true)) conditions.push("is breastfeeding");
      if (rec.regularly_fasting && (rec.regularly_fasting === "Yes" || rec.regularly_fasting === true)) conditions.push("regularly fasts");
      if (rec.is_your_work_involves_night_shift && (rec.is_your_work_involves_night_shift === "Yes" || rec.is_your_work_involves_night_shift === true)) conditions.push("works night shifts");
      if (rec.previous_lab_reports && (rec.previous_lab_reports === "Yes" || rec.previous_lab_reports === true)) conditions.push("has previous lab reports");
      if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable fatigue-related complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const fatigueRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      if_yes_please_upload: rec.if_yes_please_upload
    }));

    const fatigueSummaryHtml = `
      <div class="fatigue-summary">
        <b>Fatigue Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Fatigue Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { fatigueSummaryHtml, redFlagsList, fatigueRecords };
  } catch (err) {
    return {
      fatigueSummaryHtml: `<div class="fatigue-summary" style="color:red;">
        <b>Error loading Fatigue data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      fatigueRecords: []
    };
  }
};



// Corrected generateEyeProblemSummary function
const generateEyeProblemSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'sudden_loss_of_partial_or_complete_vision', 'any_history_of_trauma', 'any_history_of_foreign_body', 'none_eyeproblem',
      'select_kpbe', 'which_eye', 'something_get_in_eye', 'check_xdnq', 'had_this_symptom',
      'if_yes_when', 'describe_the_foreign_body', 'following_symptom', 'any_blurred_vision',
      'any_double_vision', 'eye_discomfort_due_to_light_exposure', 'nausea', 'vomiting',
      'eyelid_swelling', 'headache', 'none', 'check_azju', 'itching_eyenose', 'sneezing',
      'eye_pain', 'redness_of_eye', 'discharge_from_the_eye', 'if_yes',
      'any_history_of_hypertension', 'any_history_of_heart_diseases', 'any_history_of_diabetes',
      'any_history_of_thyroid_issues', 'any_history_of_trauma_to_the_eye', 'any_history_of_eye_surgery',
      'check_eqhu', 'involved_usage_of_laptop', 'are_you_doing_any_welding_work', 'check_emcp',
      'upload_the_photo', 'check_rskd', 'previous_lab_reports', 'if_yes_please_upload'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Eye problem" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Eye problem" });
      // if (!doctypeMeta) throw new Error("Doctype 'Eye problem' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Eye problem: ${metaErr.message}`);
    }

    const args = {
      doctype: "Eye problem",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        eyeProblemSummaryHtml: ``,
        redFlagsList: [],
        eyeProblemRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        eyeProblemSummaryHtml: ``,
        redFlagsList: [],
        eyeProblemRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      const flags = [];
      Object.keys(eyeProblemRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          flags.push(`${eyeProblemRedFlagsInfo[field].label} - ${eyeProblemRedFlagsInfo[field].message}`);
        }
      });
      if (flags.length > 0) {
        redFlagsList.push({
          recordNumber: idx + 1,
          creation: rec.creation,
          flags: flags
        });
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Eye problem records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.sudden_loss_of_partial_or_complete_vision && (rec.sudden_loss_of_partial_or_complete_vision === "Yes" || rec.sudden_loss_of_partial_or_complete_vision === true)) conditions.push("has <span class='danger'>sudden vision loss</span>");
      if (rec.any_history_of_trauma && (rec.any_history_of_trauma === "Yes" || rec.any_history_of_trauma === true)) conditions.push("has history of <span class='danger'>trauma</span>");
      if (rec.any_history_of_foreign_body && (rec.any_history_of_foreign_body === "Yes" || rec.any_history_of_foreign_body === true)) conditions.push("has history of <span class='danger'>foreign body in eye</span>");
      if (rec.select_kpbe && rec.select_kpbe !== "0") conditions.push(`eye problem status: ${rec.select_kpbe}`);
      if (rec.which_eye && rec.which_eye !== "0") conditions.push(`affected eye: ${rec.which_eye}`);
      if (rec.something_get_in_eye && (rec.something_get_in_eye === "Yes" || rec.something_get_in_eye === true)) conditions.push("something got in the eye");
      if (rec.check_xdnq && (rec.check_xdnq === "Yes" || rec.check_xdnq === true)) conditions.push("has additional examination findings");
      if (rec.had_this_symptom && rec.had_this_symptom !== "0") conditions.push(`symptom duration: ${rec.had_this_symptom}`);
      if (rec.if_yes_when && rec.if_yes_when !== "0") conditions.push(`symptom onset: ${rec.if_yes_when}`);
      if (rec.describe_the_foreign_body && rec.describe_the_foreign_body !== "0") conditions.push(`foreign body description: ${rec.describe_the_foreign_body}`);
      if (rec.following_symptom && (rec.following_symptom === "Yes" || rec.following_symptom === true)) conditions.push("has additional symptoms");
      if (rec.any_blurred_vision && (rec.any_blurred_vision === "Yes" || rec.any_blurred_vision === true)) conditions.push("has <span class='danger'>blurred vision</span>");
      if (rec.any_double_vision && (rec.any_double_vision === "Yes" || rec.any_double_vision === true)) conditions.push("has <span class='danger'>double vision</span>");
      if (rec.eye_discomfort_due_to_light_exposure && (rec.eye_discomfort_due_to_light_exposure === "Yes" || rec.eye_discomfort_due_to_light_exposure === true)) conditions.push("has <span class='danger'>eye discomfort due to light</span>");
      if (rec.nausea && (rec.nausea === "Yes" || rec.nausea === true)) conditions.push("has <span class='danger'>nausea</span>");
      if (rec.vomiting && (rec.vomiting === "Yes" || rec.vomiting === true)) conditions.push("has <span class='danger'>vomiting</span>");
      if (rec.eyelid_swelling && (rec.eyelid_swelling === "Yes" || rec.eyelid_swelling === true)) conditions.push("has <span class='danger'>eyelid swelling</span>");
      if (rec.headache && (rec.headache === "Yes" || rec.headache === true)) conditions.push("has <span class='danger'>headache</span>");
      if (rec.itching_eyenose && (rec.itching_eyenose === "Yes" || rec.itching_eyenose === true)) conditions.push("has itching in eye/nose");
      if (rec.sneezing && (rec.sneezing === "Yes" || rec.sneezing === true)) conditions.push("has sneezing");
      if (rec.eye_pain && (rec.eye_pain === "Yes" || rec.eye_pain === true)) conditions.push("has <span class='danger'>eye pain</span>");
      if (rec.redness_of_eye && (rec.redness_of_eye === "Yes" || rec.redness_of_eye === true)) conditions.push("has <span class='danger'>eye redness</span>");
      if (rec.discharge_from_the_eye && rec.discharge_from_the_eye !== "0") conditions.push(`discharge from eye: ${rec.discharge_from_the_eye}`);
      if (rec.if_yes && rec.if_yes !== "0") conditions.push(`additional symptom details: ${rec.if_yes}`);
      if (rec.any_history_of_hypertension && (rec.any_history_of_hypertension === "Yes" || rec.any_history_of_hypertension === true)) conditions.push("has history of <span class='danger'>hypertension</span>");
      if (rec.any_history_of_heart_diseases && (rec.any_history_of_heart_diseases === "Yes" || rec.any_history_of_heart_diseases === true)) conditions.push("has history of <span class='danger'>heart diseases</span>");
      if (rec.any_history_of_diabetes && (rec.any_history_of_diabetes === "Yes" || rec.any_history_of_diabetes === true)) conditions.push("has history of <span class='danger'>diabetes</span>");
      if (rec.any_history_of_thyroid_issues && (rec.any_history_of_thyroid_issues === "Yes" || rec.any_history_of_thyroid_issues === true)) conditions.push("has history of <span class='danger'>thyroid issues</span>");
      if (rec.any_history_of_trauma_to_the_eye && (rec.any_history_of_trauma_to_the_eye === "Yes" || rec.any_history_of_trauma_to_the_eye === true)) conditions.push("has history of <span class='danger'>eye trauma</span>");
      if (rec.any_history_of_eye_surgery && (rec.any_history_of_eye_surgery === "Yes" || rec.any_history_of_eye_surgery === true)) conditions.push("has history of eye surgery");
      if (rec.check_eqhu && (rec.check_eqhu === "Yes" || rec.check_eqhu === true)) conditions.push("has additional clinical findings");
      if (rec.involved_usage_of_laptop && (rec.involved_usage_of_laptop === "Yes" || rec.involved_usage_of_laptop === true)) conditions.push("uses laptop extensively");
      if (rec.are_you_doing_any_welding_work && (rec.are_you_doing_any_welding_work === "Yes" || rec.are_you_doing_any_welding_work === true)) conditions.push("performs welding work");
      if (rec.check_emcp && (rec.check_emcp === "Yes" || rec.check_emcp === true)) conditions.push("has occupational exposure");
      if (rec.upload_the_photo && rec.upload_the_photo !== "0") conditions.push("has uploaded an eye photo");
      if (rec.check_rskd && (rec.check_rskd === "Yes" || rec.check_rskd === true)) conditions.push("has additional risk factors");
      if (rec.previous_lab_reports && (rec.previous_lab_reports === "Yes" || rec.previous_lab_reports === true)) conditions.push("has previous lab reports");
      if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.none && (rec.none === "Yes" || rec.none === true) || rec.none_eyeproblem && (rec.none_eyeproblem === "Yes" || rec.none_eyeproblem === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable eye-related complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const eyeProblemRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      if_yes_please_upload: rec.if_yes_please_upload,
      upload_the_photo: rec.upload_the_photo
    }));

    const eyeProblemSummaryHtml = `
      <div class="eye-problem-summary">
        <b>Eye Problem Summary:</b>
 Friendship Hospital</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Eye Problem Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { eyeProblemSummaryHtml, redFlagsList, eyeProblemRecords };
  } catch (err) {
    return {
      eyeProblemSummaryHtml: `<div class="eye-problem-summary" style="color:red;">
        <b>Error loading Eye problem data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      eyeProblemRecords: []
    };
  }
};



// Corrected generateBackAndNeckPainSummary function
const generateBackAndNeckPainSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'exercises_morethen_5days', 'sudden_onset_back_pain', 'numbness_or_tingling_of_legs_or_hands',
      'weakness_in_the_legs_or_hands', 'any_bowel_or_bladder_dysfunction', 'any_abnormal_gait',
      'any_fever_or_unexplained_weight_loss', 'any_history_of_trauma_or_fall', 'none_back_neck_pain',
      'back_and_neck_pain', 'do_you_have', 'if_weight_change', 'any_surgery', 'scan_report',
      'accident_history', 'standing_hours', 'lifting_heavy', 'stressful_job', 'gym_frequently',
      'severity_pain', 'high_pillow', 'sleeping_mattress', 'check_eizy', 'affecting_right',
      'affecting_left', 'affecting_both', 'urine_leakage', 'gait_abnormalities', 'muscle_spasm',
      'backpain_fever', 'sweating', 'weight_change', 'abdominal_pain', 'none2', 'morning',
      'evening', 'night', 'constant', 'other_painfelt', 'buttock', 'legs', 'arms', 'abdomen',
      'other_neckpain', 'postural_change', 'sneezing', 'activities', 'pain_worse_at_rest', 'none',
      'unsure', 'since_when_symptom', 'since_when', 'abdomen_part', 'descrive_ifother',
      'yes_describe_mattress', 'other_backpain', 'check_mtyy', 'family_issues',
      'arthritis_history', 'previous_labreports', 'posture_gait', 'upload_report'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Back and Neck Pain" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Back and Neck Pain" });
      // if (!doctypeMeta) throw new Error("Doctype 'Back and Neck Pain' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Back and Neck Pain: ${metaErr.message}`);
    }

    const args = {
      doctype: "Back and Neck Pain",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        backAndNeckPainSummaryHtml: ``,
        redFlagsList: [],
        backAndNeckPainRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        backAndNeckPainSummaryHtml: ``,
        redFlagsList: [],
        backAndNeckPainRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      const flags = [];
      Object.keys(backAndNeckPainRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          flags.push(`${backAndNeckPainRedFlagsInfo[field].label} - ${backAndNeckPainRedFlagsInfo[field].message}`);
        }
      });
      if (flags.length > 0) {
        redFlagsList.push({
          recordNumber: idx + 1,
          creation: rec.creation,
          flags: flags
        });
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Back and Neck Pain records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.exercises_morethen_5days && (rec.exercises_morethen_5days === "Yes" || rec.exercises_morethen_5days === true)) conditions.push("exercises more than 5 days a week");
      if (rec.sudden_onset_back_pain && (rec.sudden_onset_back_pain === "Yes" || rec.sudden_onset_back_pain === true)) conditions.push("has <span class='danger'>sudden onset back pain</span>");
      if (rec.numbness_or_tingling_of_legs_or_hands && (rec.numbness_or_tingling_of_legs_or_hands === "Yes" || rec.numbness_or_tingling_of_legs_or_hands === true)) conditions.push("has <span class='danger'>numbness or tingling in legs/hands</span>");
      if (rec.weakness_in_the_legs_or_hands && (rec.weakness_in_the_legs_or_hands === "Yes" || rec.weakness_in_the_legs_or_hands === true)) conditions.push("has <span class='danger'>weakness in legs/hands</span>");
      if (rec.any_bowel_or_bladder_dysfunction && (rec.any_bowel_or_bladder_dysfunction === "Yes" || rec.any_bowel_or_bladder_dysfunction === true)) conditions.push("has <span class='danger'>bowel or bladder dysfunction</span>");
      if (rec.any_abnormal_gait && (rec.any_abnormal_gait === "Yes" || rec.any_abnormal_gait === true)) conditions.push("has <span class='danger'>abnormal gait</span>");
      if (rec.any_fever_or_unexplained_weight_loss && (rec.any_fever_or_unexplained_weight_loss === "Yes" || rec.any_fever_or_unexplained_weight_loss === true)) conditions.push("has <span class='danger'>fever or unexplained weight loss</span>");
      if (rec.any_history_of_trauma_or_fall && (rec.any_history_of_trauma_or_fall === "Yes" || rec.any_history_of_trauma_or_fall === true)) conditions.push("has history of <span class='danger'>trauma or fall</span>");
      if (rec.back_and_neck_pain && rec.back_and_neck_pain !== "0") conditions.push(`pain status: ${rec.back_and_neck_pain}`);
      if (rec.do_you_have && rec.do_you_have !== "0") conditions.push(`complaint: ${rec.do_you_have}`);
      if (rec.if_weight_change && (rec.if_weight_change === "Yes" || rec.if_weight_change === true)) conditions.push("has <span class='danger'>weight change</span>");
      if (rec.any_surgery && (rec.any_surgery === "Yes" || rec.any_surgery === true)) conditions.push("had surgery");
      if (rec.scan_report && (rec.scan_report === "Yes" || rec.scan_report === true)) conditions.push("has scan report");
      if (rec.accident_history && (rec.accident_history === "Yes" || rec.accident_history === true)) conditions.push("has <span class='danger'>accident history</span>");
      if (rec.standing_hours && (rec.standing_hours === "Yes" || rec.standing_hours === true)) conditions.push("stands for long hours");
      if (rec.lifting_heavy && (rec.lifting_heavy === "Yes" || rec.lifting_heavy === true)) conditions.push("lifts heavy objects");
      if (rec.stressful_job && (rec.stressful_job === "Yes" || rec.stressful_job === true)) conditions.push("has stressful job");
      if (rec.gym_frequently && (rec.gym_frequently === "Yes" || rec.gym_frequently === true)) conditions.push("frequently visits gym");
      if (rec.severity_pain && rec.severity_pain !== "0") conditions.push(`pain severity: ${rec.severity_pain}`);
      if (rec.high_pillow && (rec.high_pillow === "Yes" || rec.high_pillow === true)) conditions.push("uses high pillow");
      if (rec.sleeping_mattress && (rec.sleeping_mattress === "Yes" || rec.sleeping_mattress === true)) conditions.push("has specific mattress");
      if (rec.check_eizy && (rec.check_eizy === "Yes" || rec.check_eizy === true)) conditions.push("has additional examination findings");
      if (rec.affecting_right && (rec.affecting_right === "Yes" || rec.affecting_right === true)) conditions.push("pain affects right side");
      if (rec.affecting_left && (rec.affecting_left === "Yes" || rec.affecting_left === true)) conditions.push("pain affects left side");
      if (rec.affecting_both && (rec.affecting_both === "Yes" || rec.affecting_both === true)) conditions.push("pain affects both sides");
      if (rec.urine_leakage && (rec.urine_leakage === "Yes" || rec.urine_leakage === true)) conditions.push("has <span class='danger'>urine leakage</span>");
      if (rec.gait_abnormalities && (rec.gait_abnormalities === "Yes" || rec.gait_abnormalities === true)) conditions.push("has <span class='danger'>gait abnormalities</span>");
      if (rec.muscle_spasm && (rec.muscle_spasm === "Yes" || rec.muscle_spasm === true)) conditions.push("has <span class='danger'>muscle spasms</span>");
      if (rec.backpain_fever && (rec.backpain_fever === "Yes" || rec.backpain_fever === true)) conditions.push("has <span class='danger'>fever with back pain</span>");
      if (rec.sweating && (rec.sweating === "Yes" || rec.sweating === true)) conditions.push("has sweating");
      if (rec.weight_change && (rec.weight_change === "Yes" || rec.weight_change === true)) conditions.push("has <span class='danger'>weight change</span>");
      if (rec.abdominal_pain && (rec.abdominal_pain === "Yes" || rec.abdominal_pain === true)) conditions.push("has <span class='danger'>abdominal pain</span>");
      if (rec.morning && (rec.morning === "Yes" || rec.morning === true)) conditions.push("pain felt in morning");
      if (rec.evening && (rec.evening === "Yes" || rec.evening === true)) conditions.push("pain felt in evening");
      if (rec.night && (rec.night === "Yes" || rec.night === true)) conditions.push("pain felt at night");
      if (rec.constant && (rec.constant === "Yes" || rec.constant === true)) conditions.push("has constant pain");
      if (rec.other_painfelt && rec.other_painfelt !== "0") conditions.push(`other pain details: ${rec.other_painfelt}`);
      if (rec.buttock && (rec.buttock === "Yes" || rec.buttock === true)) conditions.push("pain radiates to buttock");
      if (rec.legs && (rec.legs === "Yes" || rec.legs === true)) conditions.push("pain radiates to legs");
      if (rec.arms && (rec.arms === "Yes" || rec.arms === true)) conditions.push("pain radiates to arms");
      if (rec.abdomen && (rec.abdomen === "Yes" || rec.abdomen === true)) conditions.push("pain radiates to abdomen");
      if (rec.other_neckpain && rec.other_neckpain !== "0") conditions.push(`other neck pain details: ${rec.other_neckpain}`);
      if (rec.postural_change && (rec.postural_change === "Yes" || rec.postural_change === true)) conditions.push("pain worsens with postural change");
      if (rec.sneezing && (rec.sneezing === "Yes" || rec.sneezing === true)) conditions.push("pain worsens with sneezing");
      if (rec.activities && (rec.activities === "Yes" || rec.activities === true)) conditions.push("pain worsens with activities");
      if (rec.pain_worse_at_rest && (rec.pain_worse_at_rest === "Yes" || rec.pain_worse_at_rest === true)) conditions.push("pain worse at rest");
      if (rec.unsure && (rec.unsure === "Yes" || rec.unsure === true)) conditions.push("unsure about pain triggers");
      if (rec.since_when_symptom && rec.since_when_symptom !== "0") conditions.push(`symptoms since: ${rec.since_when_symptom}`);
      if (rec.since_when && rec.since_when !== "0") conditions.push(`pain duration: ${rec.since_when}`);
      if (rec.abdomen_part && rec.abdomen_part !== "0") conditions.push(`abdomen part affected: ${rec.abdomen_part}`);
      if (rec.descrive_ifother && rec.descrive_ifother !== "0") conditions.push(`other description: ${rec.descrive_ifother}`);
      if (rec.yes_describe_mattress && rec.yes_describe_mattress !== "0") conditions.push(`mattress description: ${rec.yes_describe_mattress}`);
      if (rec.other_backpain && rec.other_backpain !== "0") conditions.push(`other back pain details: ${rec.other_backpain}`);
      if (rec.check_mtyy && (rec.check_mtyy === "Yes" || rec.check_mtyy === true)) conditions.push("has additional clinical findings");
      if (rec.family_issues && (rec.family_issues === "Yes" || rec.family_issues === true)) conditions.push("has family issues");
      if (rec.arthritis_history && (rec.arthritis_history === "Yes" || rec.arthritis_history === true)) conditions.push("has <span class='danger'>arthritis history</span>");
      if (rec.previous_labreports && (rec.previous_labreports === "Yes" || rec.previous_labreports === true)) conditions.push("has previous lab reports");
      if (rec.posture_gait && rec.posture_gait !== "0") conditions.push(`posture/gait: ${rec.posture_gait}`);
      if (rec.upload_report && rec.upload_report !== "0") conditions.push("has uploaded a lab report");
      if (rec.none && (rec.none === "Yes" || rec.none === true) || rec.none2 && (rec.none2 === "Yes" || rec.none2 === true) || rec.none_back_neck_pain && (rec.none_back_neck_pain === "Yes" || rec.none_back_neck_pain === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable back or neck pain complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const backAndNeckPainRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      upload_report: rec.upload_report
    }));

    const backAndNeckPainSummaryHtml = `
      <div class="back-and-neck-pain-summary">
        <b>Back and Neck Pain Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Back and Neck Pain Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { backAndNeckPainSummaryHtml, redFlagsList, backAndNeckPainRecords };
  } catch (err) {
    return {
      backAndNeckPainSummaryHtml: `<div class="back-and-neck-pain-summary" style="color:red;">
        <b>Error loading Back and Neck Pain data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      backAndNeckPainRecords: []
    };
  }
};


// Corrected generateShoulderAndHandPainSummary function
const generateShoulderAndHandPainSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'left_shoulder_rediatingto', 'any_history_of_trauma_or_fall', 'sever_sweeling_or_redness_of_the_affected_joint',
      'not_able_to_move_affected_part', 'change_in_vital_signs_with_these_pains', 'numbness_or_tingling_of_hands',
      'sudden_onset_of_pain', 'none_shoulder_hand_pain', 'shoulder_and_hand_pain', 'check_tfiz',
      'check_rnxv', 'discomfort_pain', 'affecting_left', 'sweating', 'backpain_fever', 'weight_change',
      'none_handpain', 'other_hand', 'dullaching', 'tingling_numbness', 'sharp_shooting', 'burning',
      'other_handpain', 'postural_change', 'cough_sneeze', 'activities', 'worse_pain', 'flexing_neck',
      'none1', 'dont_know', 'have_pain', 'pain_start', 'pain_worsened', 'severity_pain', 'swelling_area',
      'redness_area', 'stiffness_fingers', 'pain_on', 'finger_joints', 'nodules_hand', 'daily_activities',
      'affected_part', 'any_surgery', 'scan_report', 'accident_history', 'standing_hours', 'lifting_heavy',
      'stressful_job', 'gym_frequently', 'family_issues', 'arthritis_history', 'previous_labreports',
      'since_when_symptoms', 'shoulder_pain', 'pain_other', 'stiffness_time', 'if_yes_describe',
      'if_other', 'posture_gait', 'upload_report'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Shoulder and Hand Pain" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Shoulder and Hand Pain' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Shoulder and Hand Pain: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Shoulder and Hand Pain",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        shoulderAndHandPainSummaryHtml: ``,
        redFlagsList: [],
        shoulderAndHandPainRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        shoulderAndHandPainSummaryHtml: ``,
        redFlagsList: [],
        shoulderAndHandPainRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(shoulderAndHandPainRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${shoulderAndHandPainRedFlagsInfo[field].label} - ${shoulderAndHandPainRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Shoulder and Hand Pain records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.left_shoulder_rediatingto && rec.left_shoulder_rediatingto !== "0") conditions.push(`pain radiates to: <span class='danger'>${rec.left_shoulder_rediatingto}</span>`);
      if (rec.any_history_of_trauma_or_fall && (rec.any_history_of_trauma_or_fall === "Yes" || rec.any_history_of_trauma_or_fall === true)) conditions.push("has <span class='danger'>history of trauma or fall</span>");
      if (rec.sever_sweeling_or_redness_of_the_affected_joint && (rec.sever_sweeling_or_redness_of_the_affected_joint === "Yes" || rec.sever_sweeling_or_redness_of_the_affected_joint === true)) conditions.push("has <span class='danger'>severe swelling or redness of the affected joint</span>");
      if (rec.not_able_to_move_affected_part && (rec.not_able_to_move_affected_part === "Yes" || rec.not_able_to_move_affected_part === true)) conditions.push("has <span class='danger'>inability to move affected part</span>");
      if (rec.change_in_vital_signs_with_these_pains && (rec.change_in_vital_signs_with_these_pains === "Yes" || rec.change_in_vital_signs_with_these_pains === true)) conditions.push("has <span class='danger'>change in vital signs with pain</span>");
      if (rec.numbness_or_tingling_of_hands && (rec.numbness_or_tingling_of_hands === "Yes" || rec.numbness_or_tingling_of_hands === true)) conditions.push("has <span class='danger'>numbness or tingling of hands</span>");
      if (rec.sudden_onset_of_pain && (rec.sudden_onset_of_pain === "Yes" || rec.sudden_onset_of_pain === true)) conditions.push("has <span class='danger'>sudden onset of pain</span>");
      if (rec.shoulder_and_hand_pain && rec.shoulder_and_hand_pain !== "0") conditions.push(`reports shoulder or hand pain: ${rec.shoulder_and_hand_pain}`);
      if (rec.check_tfiz && (rec.check_tfiz === "Yes" || rec.check_tfiz === true)) conditions.push("has additional examination findings");
      if (rec.check_rnxv && (rec.check_rnxv === "Yes" || rec.check_rnxv === true)) conditions.push("has additional clinical findings");
      if (rec.discomfort_pain && (rec.discomfort_pain === "Yes" || rec.discomfort_pain === true)) conditions.push("experiences discomfort or pain");
      if (rec.affecting_left && (rec.affecting_left === "Yes" || rec.affecting_left === true)) conditions.push("pain affects left side");
      if (rec.sweating && (rec.sweating === "Yes" || rec.sweating === true)) conditions.push("has <span class='danger'>sweating</span>");
      if (rec.backpain_fever && (rec.backpain_fever === "Yes" || rec.backpain_fever === true)) conditions.push("has <span class='danger'>fever associated with pain</span>");
      if (rec.weight_change && (rec.weight_change === "Yes" || rec.weight_change === true)) conditions.push("has <span class='danger'>weight change</span>");
      if (rec.other_hand && rec.other_hand !== "0") conditions.push(`other hand details: ${rec.other_hand}`);
      if (rec.dullaching && (rec.dullaching === "Yes" || rec.dullaching === true)) conditions.push("describes pain as dull or aching");
      if (rec.tingling_numbness && (rec.tingling_numbness === "Yes" || rec.tingling_numbness === true)) conditions.push("has <span class='danger'>tingling or numbness</span>");
      if (rec.sharp_shooting && (rec.sharp_shooting === "Yes" || rec.sharp_shooting === true)) conditions.push("describes pain as sharp or shooting");
      if (rec.burning && (rec.burning === "Yes" || rec.burning === true)) conditions.push("describes pain as burning");
      if (rec.other_handpain && rec.other_handpain !== "0") conditions.push(`additional pain details: ${rec.other_handpain}`);
      if (rec.postural_change && (rec.postural_change === "Yes" || rec.postural_change === true)) conditions.push("pain worsens with postural changes");
      if (rec.cough_sneeze && (rec.cough_sneeze === "Yes" || rec.cough_sneeze === true)) conditions.push("pain worsens with coughing or sneezing");
      if (rec.activities && (rec.activities === "Yes" || rec.activities === true)) conditions.push("pain worsens during activities");
      if (rec.worse_pain && (rec.worse_pain === "Yes" || rec.worse_pain === true)) conditions.push("reports worsening pain");
      if (rec.flexing_neck && (rec.flexing_neck === "Yes" || rec.flexing_neck === true)) conditions.push("pain worsens when flexing neck");
      if (rec.dont_know && (rec.dont_know === "Yes" || rec.dont_know === true)) conditions.push("unsure about pain triggers");
      if (rec.have_pain && rec.have_pain !== "0") conditions.push(`pain type: ${rec.have_pain}`);
      if (rec.pain_start && rec.pain_start !== "0") conditions.push(`pain onset: ${rec.pain_start}`);
      if (rec.pain_worsened && (rec.pain_worsened === "Yes" || rec.pain_worsened === true)) conditions.push("pain has worsened");
      if (rec.severity_pain && rec.severity_pain !== "0") conditions.push(`pain severity: ${rec.severity_pain}`);
      if (rec.swelling_area && (rec.swelling_area === "Yes" || rec.swelling_area === true)) conditions.push("has <span class='danger'>swelling in the affected area</span>");
      if (rec.redness_area && (rec.redness_area === "Yes" || rec.redness_area === true)) conditions.push("has <span class='danger'>redness in the affected area</span>");
      if (rec.stiffness_fingers && (rec.stiffness_fingers === "Yes" || rec.stiffness_fingers === true)) conditions.push("has finger stiffness");
      if (rec.pain_on && rec.pain_on !== "0") conditions.push(`pain location: ${rec.pain_on}`);
      if (rec.finger_joints && (rec.finger_joints === "Yes" || rec.finger_joints === true)) conditions.push("has pain in finger joints");
      if (rec.nodules_hand && (rec.nodules_hand === "Yes" || rec.nodules_hand === true)) conditions.push("has <span class='danger'>nodules on hand</span>");
      if (rec.daily_activities && (rec.daily_activities === "Yes" || rec.daily_activities === true)) conditions.push("pain affects daily activities");
      if (rec.affected_part && rec.affected_part !== "0") conditions.push(`affected part: ${rec.affected_part}`);
      if (rec.any_surgery && (rec.any_surgery === "Yes" || rec.any_surgery === true)) conditions.push("has history of surgery");
      if (rec.scan_report && (rec.scan_report === "Yes" || rec.scan_report === true)) conditions.push("has scan report");
      if (rec.accident_history && (rec.accident_history === "Yes" || rec.accident_history === true)) conditions.push("has <span class='danger'>history of accidents</span>");
      if (rec.standing_hours && (rec.standing_hours === "Yes" || rec.standing_hours === true)) conditions.push("stands for long hours");
      if (rec.lifting_heavy && (rec.lifting_heavy === "Yes" || rec.lifting_heavy === true)) conditions.push("lifts heavy objects");
      if (rec.stressful_job && (rec.stressful_job === "Yes" || rec.stressful_job === true)) conditions.push("has stressful job");
      if (rec.gym_frequently && (rec.gym_frequently === "Yes" || rec.gym_frequently === true)) conditions.push("frequently visits gym");
      if (rec.family_issues && (rec.family_issues === "Yes" || rec.family_issues === true)) conditions.push("has family issues");
      if (rec.arthritis_history && (rec.arthritis_history === "Yes" || rec.arthritis_history === true)) conditions.push("has <span class='danger'>history of arthritis</span>");
      if (rec.previous_labreports && (rec.previous_labreports === "Yes" || rec.previous_labreports === true)) conditions.push("has previous lab reports");
      if (rec.since_when_symptoms && rec.since_when_symptoms !== "0") conditions.push(`symptoms since: ${rec.since_when_symptoms}`);
      if (rec.shoulder_pain && rec.shoulder_pain !== "0") conditions.push(`shoulder pain description: ${rec.shoulder_pain}`);
      if (rec.pain_other && rec.pain_other !== "0") conditions.push(`additional pain details: ${rec.pain_other}`);
      if (rec.stiffness_time && rec.stiffness_time !== "0") conditions.push(`finger stiffness duration: ${rec.stiffness_time}`);
      if (rec.if_yes_describe && rec.if_yes_describe !== "0") conditions.push(`description: ${rec.if_yes_describe}`);
      if (rec.if_other && rec.if_other !== "0") conditions.push(`other details: ${rec.if_other}`);
      if (rec.posture_gait && rec.posture_gait !== "0") conditions.push(`posture/gait: ${rec.posture_gait}`);
      if (rec.upload_report && rec.upload_report !== "0") conditions.push("has uploaded a lab report");
      if (rec.none_shoulder_hand_pain && (rec.none_shoulder_hand_pain === "Yes" || rec.none_shoulder_hand_pain === true) || 
          rec.none_handpain && (rec.none_handpain === "Yes" || rec.none_handpain === true) || 
          rec.none1 && (rec.none1 === "Yes" || rec.none1 === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable shoulder or hand pain complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const shoulderAndHandPainRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      upload_report: rec.upload_report
    }));

    const shoulderAndHandPainSummaryHtml = `
      <div class="shoulder-and-hand-pain-summary">
        <b>Shoulder and Hand Pain Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Shoulder and Hand Pain Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { shoulderAndHandPainSummaryHtml, redFlagsList, shoulderAndHandPainRecords };
  } catch (err) {
    return {
      shoulderAndHandPainSummaryHtml: `<div class="shoulder-and-hand-pain-summary" style="color:red;">
        <b>Error loading Shoulder and Hand Pain data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      shoulderAndHandPainRecords: []
    };
  }
};



// Corrected generateLegKneeHipPainSummary function
const generateLegKneeHipPainSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const doctype = "Leg or Knee or Hip pain"; // Exact doctype name as per your system

    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'leg_knee_hip_pain', 'sever_sweeling_or_redness_of_the_affected_joint', 'numbness_or_tingling_of_legs',
      'weakness_in_the_legs', 'any_bowel_or_bladder_dysfunction', 'any_abnormal_gait',
      'any_fever_or_unexplained_weight_loss', 'any_history_of_trauma_or_fall', 'not_able_to_move_affected_part',
      'change_in_vital_signs_with_these_pains', 'none_leg_knee_hip_pain', 'leg_or_knee_or_hip_pain',
      'check_nuqq', 'leg', 'knee', 'hip', 'legpain_part', 'swelling_legs', 'leg_pain_charactertistice',
      'leg_symptoms', 'symptom_progressed_leg', 'severity_pain_leg', 'legpain_symptoms', 'other_legpain',
      'check_pwti', 'which_kneepain', 'involved_kneepain', 'swelling_knee', 'knee_pain_characteristics',
      'kneepain_symptom_start', 'symptom_progressed_knee', 'severity_pain_knee', 'kneepain_symptoms',
      'other_kneepain', 'check_hftr', 'hip_paining', 'swelling_hip', 'pain_characteristics_hip',
      'symptom_hip', 'symptom_progressed_hip', 'pain_severity_hip', 'hip_symptoms', 'pain_other',
      'check_uydi', 'fever2', 'breathing', 'swelling_painful', 'redness_painful', 'leg_feels',
      'stiffness', 'unable_to_walk', 'unable_bear_weight', 'movement_limitation', 'night_pain',
      'locking_in_a_specific_position', 'groin_pain', 'other2', 'knee_other', 'by_movement',
      'using_stairs', 'rest', 'other', 'none', 'none2', 'ifother', 'check_ymqq', 'any_surgery',
      'scan_report', 'accident_history', 'bp_sugar', 'gym_frequently', 'standing_hours', 'lifting_heavy',
      'stressful_job', 'family_issues', 'arthritis_history', 'previous_labreports', 'posture_gait',
      'upload_report'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: doctype });
    //   if (!doctypeMeta) throw new Error(`Doctype '${doctype}' does not exist`);
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for ${doctype}: ${metaErr.message}`);
    // }

    const args = {
      doctype: doctype,
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        legKneeHipPainSummaryHtml: ``,
        redFlagsList: [],
        legKneeHipPainRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        legKneeHipPainSummaryHtml: ``,
        redFlagsList: [],
        legKneeHipPainRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(legKneeHipPainRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${legKneeHipPainRedFlagsInfo[field].label} - ${legKneeHipPainRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : `<ul class="summary-bullet-points"><li>No red flags detected in ${doctype} records.</li></ul>`;

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.leg_knee_hip_pain && rec.leg_knee_hip_pain !== "0") conditions.push(`reports pain status: ${rec.leg_knee_hip_pain}`);
      if (rec.sever_sweeling_or_redness_of_the_affected_joint && (rec.sever_sweeling_or_redness_of_the_affected_joint === "Yes" || rec.sever_sweeling_or_redness_of_the_affected_joint === true)) conditions.push("has <span class='danger'>severe swelling or redness of the affected joint</span>");
      if (rec.numbness_or_tingling_of_legs && (rec.numbness_or_tingling_of_legs === "Yes" || rec.numbness_or_tingling_of_legs === true)) conditions.push("has <span class='danger'>numbness or tingling of legs</span>");
      if (rec.weakness_in_the_legs && (rec.weakness_in_the_legs === "Yes" || rec.weakness_in_the_legs === true)) conditions.push("has <span class='danger'>weakness in the legs</span>");
      if (rec.any_bowel_or_bladder_dysfunction && (rec.any_bowel_or_bladder_dysfunction === "Yes" || rec.any_bowel_or_bladder_dysfunction === true)) conditions.push("has <span class='danger'>bowel or bladder dysfunction</span>");
      if (rec.any_abnormal_gait && (rec.any_abnormal_gait === "Yes" || rec.any_abnormal_gait === true)) conditions.push("has <span class='danger'>abnormal gait</span>");
      if (rec.any_fever_or_unexplained_weight_loss && (rec.any_fever_or_unexplained_weight_loss === "Yes" || rec.any_fever_or_unexplained_weight_loss === true)) conditions.push("has <span class='danger'>fever or unexplained weight loss</span>");
      if (rec.any_history_of_trauma_or_fall && (rec.any_history_of_trauma_or_fall === "Yes" || rec.any_history_of_trauma_or_fall === true)) conditions.push("has <span class='danger'>history of trauma or fall</span>");
      if (rec.not_able_to_move_affected_part && (rec.not_able_to_move_affected_part === "Yes" || rec.not_able_to_move_affected_part === true)) conditions.push("has <span class='danger'>inability to move affected part</span>");
      if (rec.change_in_vital_signs_with_these_pains && (rec.change_in_vital_signs_with_these_pains === "Yes" || rec.change_in_vital_signs_with_these_pains === true)) conditions.push("has <span class='danger'>change in vital signs with pain</span>");
      if (rec.leg_or_knee_or_hip_pain && rec.leg_or_knee_or_hip_pain !== "0") conditions.push(`pain status: ${rec.leg_or_knee_or_hip_pain}`);
      if (rec.check_nuqq && (rec.check_nuqq === "Yes" || rec.check_nuqq === true)) conditions.push("has additional leg examination findings");
      if (rec.leg && (rec.leg === "Yes" || rec.leg === true)) conditions.push("has pain in the leg");
      if (rec.knee && (rec.knee === "Yes" || rec.knee === true)) conditions.push("has pain in the knee");
      if (rec.hip && (rec.hip === "Yes" || rec.hip === true)) conditions.push("has pain in the hip");
      if (rec.legpain_part && rec.legpain_part !== "0") conditions.push(`leg pain location: ${rec.legpain_part}`);
      if (rec.swelling_legs && (rec.swelling_legs === "Yes" || rec.swelling_legs === true)) conditions.push("has <span class='danger'>swelling in the legs</span>");
      if (rec.leg_pain_charactertistice && rec.leg_pain_charactertistice !== "0") conditions.push(`leg pain characteristics: ${rec.leg_pain_charactertistice}`);
      if (rec.leg_symptoms && rec.leg_symptoms !== "0") conditions.push(`leg symptoms: ${rec.leg_symptoms}`);
      if (rec.symptom_progressed_leg && rec.symptom_progressed_leg !== "0") conditions.push(`leg symptom progression: ${rec.symptom_progressed_leg}`);
      if (rec.severity_pain_leg && rec.severity_pain_leg !== "0") conditions.push(`leg pain severity: ${rec.severity_pain_leg}`);
      if (rec.legpain_symptoms && rec.legpain_symptoms !== "0") conditions.push(`leg pain symptoms: ${rec.legpain_symptoms}`);
      if (rec.other_legpain && rec.other_legpain !== "0") conditions.push(`other leg pain details: ${rec.other_legpain}`);
      if (rec.check_pwti && (rec.check_pwti === "Yes" || rec.check_pwti === true)) conditions.push("has additional knee examination findings");
      if (rec.which_kneepain && rec.which_kneepain !== "0") conditions.push(`knee pain location: ${rec.which_kneepain}`);
      if (rec.involved_kneepain && rec.involved_kneepain !== "0") conditions.push(`knee pain involves: ${rec.involved_kneepain}`);
      if (rec.swelling_knee && (rec.swelling_knee === "Yes" || rec.swelling_knee === true)) conditions.push("has <span class='danger'>swelling in the knee</span>");
      if (rec.knee_pain_characteristics && rec.knee_pain_characteristics !== "0") conditions.push(`knee pain characteristics: ${rec.knee_pain_characteristics}`);
      if (rec.kneepain_symptom_start && rec.kneepain_symptom_start !== "0") conditions.push(`knee pain onset: ${rec.kneepain_symptom_start}`);
      if (rec.symptom_progressed_knee && rec.symptom_progressed_knee !== "0") conditions.push(`knee symptom progression: ${rec.symptom_progressed_knee}`);
      if (rec.severity_pain_knee && rec.severity_pain_knee !== "0") conditions.push(`knee pain severity: ${rec.severity_pain_knee}`);
      if (rec.kneepain_symptoms && rec.kneepain_symptoms !== "0") conditions.push(`knee pain symptoms: ${rec.kneepain_symptoms}`);
      if (rec.other_kneepain && rec.other_kneepain !== "0") conditions.push(`other knee pain details: ${rec.other_kneepain}`);
      if (rec.check_hftr && (rec.check_hftr === "Yes" || rec.check_hftr === true)) conditions.push("has additional hip examination findings");
      if (rec.hip_paining && rec.hip_paining !== "0") conditions.push(`hip pain location: ${rec.hip_paining}`);
      if (rec.swelling_hip && (rec.swelling_hip === "Yes" || rec.swelling_hip === true)) conditions.push("has <span class='danger'>swelling in the hip</span>");
      if (rec.pain_characteristics_hip && rec.pain_characteristics_hip !== "0") conditions.push(`hip pain characteristics: ${rec.pain_characteristics_hip}`);
      if (rec.symptom_hip && rec.symptom_hip !== "0") conditions.push(`hip symptoms: ${rec.symptom_hip}`);
      if (rec.symptom_progressed_hip && rec.symptom_progressed_hip !== "0") conditions.push(`hip symptom progression: ${rec.symptom_progressed_hip}`);
      if (rec.pain_severity_hip && rec.pain_severity_hip !== "0") conditions.push(`hip pain severity: ${rec.pain_severity_hip}`);
      if (rec.hip_symptoms && rec.hip_symptoms !== "0") conditions.push(`hip symptoms description: ${rec.hip_symptoms}`);
      if (rec.pain_other && rec.pain_other !== "0") conditions.push(`other pain details: ${rec.pain_other}`);
      if (rec.check_uydi && (rec.check_uydi === "Yes" || rec.check_uydi === true)) conditions.push("has additional clinical findings");
      if (rec.fever2 && (rec.fever2 === "Yes" || rec.fever2 === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.breathing && (rec.breathing === "Yes" || rec.breathing === true)) conditions.push("has <span class='danger'>breathing issues</span>");
      if (rec.swelling_painful && (rec.swelling_painful === "Yes" || rec.swelling_painful === true)) conditions.push("has <span class='danger'>painful swelling</span>");
      if (rec.redness_painful && (rec.redness_painful === "Yes" || rec.redness_painful === true)) conditions.push("has <span class='danger'>painful redness</span>");
      if (rec.leg_feels && rec.leg_feels !== "0") conditions.push(`leg sensation: ${rec.leg_feels}`);
      if (rec.stiffness && (rec.stiffness === "Yes" || rec.stiffness === true)) conditions.push("has stiffness");
      if (rec.unable_to_walk && (rec.unable_to_walk === "Yes" || rec.unable_to_walk === true)) conditions.push("is <span class='danger'>unable to walk</span>");
      if (rec.unable_bear_weight && (rec.unable_bear_weight === "Yes" || rec.unable_bear_weight === true)) conditions.push("is <span class='danger'>unable to bear weight</span>");
      if (rec.movement_limitation && (rec.movement_limitation === "Yes" || rec.movement_limitation === true)) conditions.push("has <span class='danger'>movement limitation</span>");
      if (rec.night_pain && (rec.night_pain === "Yes" || rec.night_pain === true)) conditions.push("has pain at night");
      if (rec.locking_in_a_specific_position && (rec.locking_in_a_specific_position === "Yes" || rec.locking_in_a_specific_position === true)) conditions.push("has <span class='danger'>locking in a specific position</span>");
      if (rec.groin_pain && (rec.groin_pain === "Yes" || rec.groin_pain === true)) conditions.push("has <span class='danger'>groin pain</span>");
      if (rec.other2 && rec.other2 !== "0") conditions.push(`other symptoms: ${rec.other2}`);
      if (rec.knee_other && rec.knee_other !== "0") conditions.push(`other knee symptoms: ${rec.knee_other}`);
      if (rec.by_movement && (rec.by_movement === "Yes" || rec.by_movement === true)) conditions.push("has pain triggered by movement");
      if (rec.using_stairs && (rec.using_stairs === "Yes" || rec.using_stairs === true)) conditions.push("has pain when using stairs");
      if (rec.rest && (rec.rest === "Yes" || rec.rest === true)) conditions.push("has pain at rest");
      if (rec.other && rec.other !== "0") conditions.push(`other pain triggers: ${rec.other}`);
      if (rec.ifother && rec.ifother !== "0") conditions.push(`other pain details: ${rec.ifother}`);
      if (rec.check_ymqq && (rec.check_ymqq === "Yes" || rec.check_ymqq === true)) conditions.push("has additional examination findings");
      if (rec.any_surgery && (rec.any_surgery === "Yes" || rec.any_surgery === true)) conditions.push("has history of surgery");
      if (rec.scan_report && (rec.scan_report === "Yes" || rec.scan_report === true)) conditions.push("has scan report");
      if (rec.accident_history && (rec.accident_history === "Yes" || rec.accident_history === true)) conditions.push("has <span class='danger'>history of accident</span>");
      if (rec.bp_sugar && (rec.bp_sugar === "Yes" || rec.bp_sugar === true)) conditions.push("has <span class='danger'>history of hypertension or diabetes</span>");
      if (rec.gym_frequently && (rec.gym_frequently === "Yes" || rec.gym_frequently === true)) conditions.push("frequently visits gym");
      if (rec.standing_hours && (rec.standing_hours === "Yes" || rec.standing_hours === true)) conditions.push("stands for long hours");
      if (rec.lifting_heavy && (rec.lifting_heavy === "Yes" || rec.lifting_heavy === true)) conditions.push("lifts heavy objects");
      if (rec.stressful_job && (rec.stressful_job === "Yes" || rec.stressful_job === true)) conditions.push("has stressful job");
      if (rec.family_issues && (rec.family_issues === "Yes" || rec.family_issues === true)) conditions.push("has family issues");
      if (rec.arthritis_history && (rec.arthritis_history === "Yes" || rec.arthritis_history === true)) conditions.push("has <span class='danger'>history of arthritis</span>");
      if (rec.previous_labreports && (rec.previous_labreports === "Yes" || rec.previous_labreports === true)) conditions.push("has previous lab reports");
      if (rec.posture_gait && rec.posture_gait !== "0") conditions.push(`posture/gait: ${rec.posture_gait}`);
      if (rec.upload_report && rec.upload_report !== "0") conditions.push("has uploaded a lab report");
      if (rec.none && (rec.none === "Yes" || rec.none === true) || rec.none2 && (rec.none2 === "Yes" || rec.none2 === true) || rec.none_leg_knee_hip_pain && (rec.none_leg_knee_hip_pain === "Yes" || rec.none_leg_knee_hip_pain === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable leg, knee, or hip pain complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const legKneeHipPainRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      upload_report: rec.upload_report
    }));

    const legKneeHipPainSummaryHtml = `
      <div class="leg-knee-hip-pain-summary">
        <b>Leg or Knee or Hip pain Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Leg or Knee or Hip pain Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { legKneeHipPainSummaryHtml, redFlagsList, legKneeHipPainRecords };
  } catch (err) {
    return {
      legKneeHipPainSummaryHtml: `<div class="leg-knee-hip-pain-summary" style="color:red;">
        <b>Error loading Leg or Knee or Hip pain data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      legKneeHipPainRecords: []
    };
  }
};



// Update the `generateDyspepsiaAciditySummary` function to include lab report in records
const generateDyspepsiaAciditySummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const args = {
      doctype: "Dyspepsia_Acidity",
      fields: [
        'name', 'creation', 'patient_id',
        'any_sudden_onset_abdominal_pain_with_vomiting_and_drowsiness', 'abdominal_pain_with_vomiting', 'worsening_of_abdominal_pain',
        'any_bloating_sensation', 'any_weight_loss', 'change_in_color_of_stools', 'if_more_than50', 'none_dyspepsia',
        'dyspepsia_acidity', 'do_you_have_dyspepsia', 'how_does_this_symptom_start', 'since_when_have_you_had_this_symptom',
        'bloody_vomiting', 'blacktarry_stool', 'blood_in_stool', 'chest_paindiscomfort', 'abdominal_pain', 'check_blsh',
        'is_abdominal_pain_where_is_the_pain', 'onset_of_the_abdominal_pain', 'check_ippo', 'constant', 'colicky_intermittent',
        'gnawing', 'cramping', 'dull', 'stabbing', 'bloating', 'burning', 'other_check', 'check_yibx', 'describe',
        'when_does_the_pain_increases', 'do_you_eat_in_hotels_in_regularly', 'have_reflux', 'difficulty_swallowing',
        'have_you_lost_weight', 'do_you_have_heartburn', 'when_does_the_heartburn_get_worse', 'do_you_have_cough',
        'do_you_hoarseness_voice', 'do_you_nausea', 'do_you_have__vomiting', 'do_you_have__stressanxiety', 'loss_of_appetite',
        'heartburn_other', 'if_sputum_decribe_the_color', 'any_history_of_hypertension', 'any_history_of_heart_diseases',
        'any_history_of_diabetes', 'any_history_of_thyroid_issues', 'any_history_of_stomach_cancer',
        'have_you_done_any_endoscopy_in_the_past', 'check_qwyi', 'do_you_take_your_meal_on_time',
        'do_you_take_more_spicy_and_oily_food', 'do_you_drink_a_lot_of_coffee_or_tea', 'check_qdyk',
        'how_much_water_do_you_drink_everyday', 'check_offh', 'look_for_lymphnodes_in_the_neck_lt_supra_clavicular',
        'check_owzn', 'lymphnodes', 'previous_lab_reports', 'check_vkrm', 'if_yes_please_upload'
      ],
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        dyspepsiaAciditySummaryHtml: ``,
        redFlagsList: [],
        dyspepsiaAcidityRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        dyspepsiaAciditySummaryHtml: ``,
        redFlagsList: [],
        dyspepsiaAcidityRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(dyspepsiaAcidityRedFlagsInfo).forEach(field => {
        if (rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${dyspepsiaAcidityRedFlagsInfo[field].label} - ${dyspepsiaAcidityRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Dyspepsia/Acidity records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.dyspepsia_acidity && rec.dyspepsia_acidity !== "0") conditions.push(`experiences dyspepsia/acidity`);
      if (rec.do_you_have_dyspepsia && rec.do_you_have_dyspepsia !== "0") conditions.push(`reports dyspepsia symptoms`);
      if (rec.how_does_this_symptom_start && rec.how_does_this_symptom_start !== "0") conditions.push(`describes symptom onset as ${rec.how_does_this_symptom_start.toLowerCase()}`);
      if (rec.since_when_have_you_had_this_symptom && rec.since_when_have_you_had_this_symptom !== "0") conditions.push(`has experienced symptoms for ${rec.since_when_have_you_had_this_symptom}`);
      if (rec.bloody_vomiting && (rec.bloody_vomiting === "Yes" || rec.bloody_vomiting === true)) conditions.push(`has <span class='danger'>bloody vomiting</span>`);
      if (rec.blacktarry_stool && (rec.blacktarry_stool === "Yes" || rec.blacktarry_stool === true)) conditions.push(`has <span class='danger'>black tarry stool</span>`);
      if (rec.blood_in_stool && (rec.blood_in_stool === "Yes" || rec.blood_in_stool === true)) conditions.push(`has <span class='danger'>blood in stool</span>`);
      if (rec.chest_paindiscomfort && (rec.chest_paindiscomfort === "Yes" || rec.chest_paindiscomfort === true)) conditions.push(`has <span class='danger'>chest pain or discomfort</span>`);
      if (rec.abdominal_pain && (rec.abdominal_pain === "Yes" || rec.abdominal_pain === true)) conditions.push(`has <span class='danger'>abdominal pain</span>`);
      if (rec.is_abdominal_pain_where_is_the_pain && rec.is_abdominal_pain_where_is_the_pain !== "0") conditions.push(`describes abdominal pain location as ${rec.is_abdominal_pain_where_is_the_pain}`);
      if (rec.onset_of_the_abdominal_pain && rec.onset_of_the_abdominal_pain !== "0") conditions.push(`describes abdominal pain onset as ${rec.onset_of_the_abdominal_pain.toLowerCase()}`);
      if (rec.constant && (rec.constant === "Yes" || rec.constant === true)) conditions.push(`describes pain as constant`);
      if (rec.colicky_intermittent && (rec.colicky_intermittent === "Yes" || rec.colicky_intermittent === true)) conditions.push(`describes pain as colicky or intermittent`);
      if (rec.gnawing && (rec.gnawing === "Yes" || rec.gnawing === true)) conditions.push(`describes pain as gnawing`);
      if (rec.cramping && (rec.cramping === "Yes" || rec.cramping === true)) conditions.push(`describes pain as cramping`);
      if (rec.dull && (rec.dull === "Yes" || rec.dull === true)) conditions.push(`describes pain as dull`);
      if (rec.stabbing && (rec.stabbing === "Yes" || rec.stabbing === true)) conditions.push(`describes pain as stabbing`);
      if (rec.bloating && (rec.bloating === "Yes" || rec.bloating === true)) conditions.push(`describes pain as bloating`);
      if (rec.burning && (rec.burning === "Yes" || rec.burning === true)) conditions.push(`describes pain as burning`);
      if (rec.other_check && (rec.other_check === "Yes" || rec.other_check === true)) conditions.push(`describes other pain characteristics`);
      if (rec.describe && rec.describe !== "0") conditions.push(`describes pain as ${rec.describe}`);
      if (rec.when_does_the_pain_increases && rec.when_does_the_pain_increases !== "0") conditions.push(`notes pain increases with ${rec.when_does_the_pain_increases.toLowerCase()}`);
      if (rec.do_you_eat_in_hotels_in_regularly && rec.do_you_eat_in_hotels_in_regularly !== "0" && rec.do_you_eat_in_hotels_in_regularly !== "No") conditions.push(`eats in hotels ${rec.do_you_eat_in_hotels_in_regularly.toLowerCase()}`);
      if (rec.have_reflux && rec.have_reflux !== "0" && rec.have_reflux !== "No") conditions.push(`experiences reflux`);
      if (rec.difficulty_swallowing && rec.difficulty_swallowing !== "0" && rec.difficulty_swallowing !== "No") conditions.push(`has <span class='danger'>difficulty swallowing</span>`);
      if (rec.have_you_lost_weight && rec.have_you_lost_weight !== "0" && rec.have_you_lost_weight !== "No") conditions.push(`has <span class='danger'>experienced weight loss</span>`);
      if (rec.do_you_have_heartburn && rec.do_you_have_heartburn !== "0" && rec.do_you_have_heartburn !== "No") conditions.push(`experiences heartburn`);
      if (rec.when_does_the_heartburn_get_worse && rec.when_does_the_heartburn_get_worse !== "0") conditions.push(`notes heartburn worsens when ${rec.when_does_the_heartburn_get_worse.toLowerCase()}`);
      if (rec.do_you_have_cough && rec.do_you_have_cough !== "0" && rec.do_you_have_cough !== "No") conditions.push(`has cough`);
      if (rec.do_you_hoarseness_voice && rec.do_you_hoarseness_voice !== "0" && rec.do_you_hoarseness_voice !== "No") conditions.push(`has hoarseness of voice when ${rec.do_you_hoarseness_voice.toLowerCase()}`);
      if (rec.do_you_nausea && rec.do_you_nausea !== "0" && rec.do_you_nausea !== "No") conditions.push(`experiences nausea described as ${rec.do_you_nausea.toLowerCase()}`);
      if (rec.do_you_have__vomiting && rec.do_you_have__vomiting !== "0" && rec.do_you_have__vomiting !== "No") conditions.push(`experiences vomiting described as ${rec.do_you_have__vomiting.toLowerCase()}`);
      if (rec.do_you_have__stressanxiety && rec.do_you_have__stressanxiety !== "0" && rec.do_you_have__stressanxiety !== "No") conditions.push(`experiences stress or anxiety when ${rec.do_you_have__stressanxiety.toLowerCase()}`);
      if (rec.loss_of_appetite && rec.loss_of_appetite !== "0" && rec.loss_of_appetite !== "No") conditions.push(`has <span class='danger'>loss of appetite</span>`);
      if (rec.heartburn_other && rec.heartburn_other !== "0") conditions.push(`notes other heartburn details as ${rec.heartburn_other}`);
      if (rec.if_sputum_decribe_the_color && rec.if_sputum_decribe_the_color !== "0") conditions.push(`describes sputum color as ${rec.if_sputum_decribe_the_color}`);
      if (rec.any_history_of_hypertension && rec.any_history_of_hypertension !== "0" && rec.any_history_of_hypertension !== "No") conditions.push(`has <span class='danger'>a history of hypertension</span>`);
      if (rec.any_history_of_heart_diseases && rec.any_history_of_heart_diseases !== "0" && rec.any_history_of_heart_diseases !== "No") conditions.push(`has <span class='danger'>a history of heart diseases</span>`);
      if (rec.any_history_of_diabetes && rec.any_history_of_diabetes !== "0" && rec.any_history_of_diabetes !== "No") conditions.push(`has <span class='danger'>a history of diabetes</span>`);
      if (rec.any_history_of_thyroid_issues && rec.any_history_of_thyroid_issues !== "0" && rec.any_history_of_thyroid_issues !== "No") conditions.push(`has a history of thyroid issues`);
      if (rec.any_history_of_stomach_cancer && rec.any_history_of_stomach_cancer !== "0" && rec.any_history_of_stomach_cancer !== "No") conditions.push(`has <span class='danger'>a history of stomach cancer</span>`);
      if (rec.have_you_done_any_endoscopy_in_the_past && rec.have_you_done_any_endoscopy_in_the_past !== "0" && rec.have_you_done_any_endoscopy_in_the_past !== "No") conditions.push(`has undergone endoscopy in the past`);
      if (rec.do_you_take_your_meal_on_time && rec.do_you_take_your_meal_on_time !== "0" && rec.do_you_take_your_meal_on_time !== "No") conditions.push(`takes meals ${rec.do_you_take_your_meal_on_time.toLowerCase()}`);
      if (rec.do_you_take_more_spicy_and_oily_food && rec.do_you_take_more_spicy_and_oily_food !== "0" && rec.do_you_take_more_spicy_and_oily_food !== "No") conditions.push(`consumes spicy or oily food ${rec.do_you_take_more_spicy_and_oily_food.toLowerCase()}`);
      if (rec.do_you_drink_a_lot_of_coffee_or_tea && rec.do_you_drink_a_lot_of_coffee_or_tea !== "0" && rec.do_you_drink_a_lot_of_coffee_or_tea !== "No") conditions.push(`drinks coffee or tea ${rec.do_you_drink_a_lot_of_coffee_or_tea.toLowerCase()}`);
      if (rec.how_much_water_do_you_drink_everyday && rec.how_much_water_do_you_drink_everyday !== "0") conditions.push(`drinks ${rec.how_much_water_do_you_drink_everyday} of water daily`);
      if (rec.look_for_lymphnodes_in_the_neck_lt_supra_clavicular && rec.look_for_lymphnodes_in_the_neck_lt_supra_clavicular !== "0") conditions.push(`reports lymph node findings as ${rec.look_for_lymphnodes_in_the_neck_lt_supra_clavicular.toLowerCase()}`);
      if (rec.lymphnodes && rec.lymphnodes !== "0" && rec.lymphnodes !== "Not Present") conditions.push(`has <span class='danger'>lymph nodes present</span>`);
      if (rec.previous_lab_reports && rec.previous_lab_reports !== "0" && rec.previous_lab_reports !== "No") conditions.push(`has previous lab reports`);
      if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") conditions.push(`has uploaded a lab report`);

      let sentence = "The patient is stable with no notable dyspepsia or acidity complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes include ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const dyspepsiaAcidityRecords = records.map((rec, idx) => ({ 
      name: rec.name, 
      recordNumber: idx + 1, 
      creation: rec.creation, 
      uploadedReport: rec.if_yes_please_upload 
    }));

    const dyspepsiaAciditySummaryHtml = `
      <div class="dyspepsia-acidity-summary">
        <b>Dyspepsia/Acidity Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Dyspepsia/Acidity Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { dyspepsiaAciditySummaryHtml, redFlagsList, dyspepsiaAcidityRecords };
  } catch (err) {
    return {
      dyspepsiaAciditySummaryHtml: `<div class="dyspepsia-acidity-summary" style="color:red;">
        <b>Error loading Dyspepsia/Acidity data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      dyspepsiaAcidityRecords: []
    };
  }
};

const generateFootAnklePainSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const args = {
      doctype: "Foot and Ankle Pain",
      fields: [
        'name', 'creation', 'patient_id',
        'foot_ankle_pain_not_subsiding', 'sever_swelling', 'any_abnormal_gait', 'any_fever_or_unexplained_weight_loss',
        'any_history_of_trauma_or_fall', 'not_able_to_move_affected_part', 'change_in_vital_signs_with_these_pains',
        'none_foot_ankle_pain', 'foot_and_ankle_pain', 'check_vtwa', 'have_pain_in', 'ankle_pain', 'swelling_ankle',
        'pain_characteristics_ankle', 'symptom_start_ankle', 'symptom_progressed_ankle', 'pain_severity_ankle',
        'ankle_symptoms', 'other_anklepain', 'check_jovb', 'foot_pain', 'foot_swelling', 'foot_pain_charcteristics',
        'how_did_the_symptom_start_foot', 'symptom_progrssed_foot', 'severity_pain_foot', 'footpain_symptoms',
        'pain_other', 'fever2', 'breathing', 'swelling_painful', 'redness_painful', 'stiffness', 'unable_to_walk',
        'unable_bear_weight', 'movement_limitation', 'night_pain', 'other2', 'none', 'knee_other', 'check_hstn',
        'by_movement', 'using_stairs', 'rest', 'other', 'none2', 'ifother', 'any_surgery', 'scan_report',
        'accident_history', 'sugar_bp_history', 'check_ndgt', 'standing_hours', 'lifting_heavy', 'stressful_job',
        'are_you_involves_in_tailoringor_in_garment_factory', 'gym_frequently', 'check_yujn', 'family_issues',
        'arthritis_history', 'posture_gait', 'previous_labreports', 'upload_report'
      ],
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        footAnklePainSummaryHtml: ``,
        redFlagsList: [],
        footAnklePainRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        footAnklePainSummaryHtml: ``,
        redFlagsList: [],
        footAnklePainRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(footAnklePainRedFlagsInfo).forEach(field => {
        if (rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${footAnklePainRedFlagsInfo[field].label} - ${footAnklePainRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Foot and Ankle Pain records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.foot_and_ankle_pain && rec.foot_and_ankle_pain !== "0") conditions.push(`experiences foot or ankle pain`);
      if (rec.have_pain_in && rec.have_pain_in !== "0") conditions.push(`reports pain in the ${rec.have_pain_in.toLowerCase()}`);
      if (rec.ankle_pain && rec.ankle_pain !== "0" && rec.ankle_pain !== "No") conditions.push(`has ankle pain`);
      if (rec.swelling_ankle && rec.swelling_ankle !== "0" && rec.swelling_ankle !== "No") conditions.push(`has <span class='danger'>swelling in the ankle</span>`);
      if (rec.pain_characteristics_ankle && rec.pain_characteristics_ankle !== "0") conditions.push(`describes ankle pain as ${rec.pain_characteristics_ankle.toLowerCase()}`);
      if (rec.symptom_start_ankle && rec.symptom_start_ankle !== "0") conditions.push(`reports ankle symptom onset as ${rec.symptom_start_ankle.toLowerCase()}`);
      if (rec.symptom_progressed_ankle && rec.symptom_progressed_ankle !== "0") conditions.push(`notes ankle symptom progression as ${rec.symptom_progressed_ankle.toLowerCase()}`);
      if (rec.pain_severity_ankle && rec.pain_severity_ankle !== "0") conditions.push(`rates ankle pain severity as ${rec.pain_severity_ankle.toLowerCase()}`);
      if (rec.ankle_symptoms && rec.ankle_symptoms !== "0") conditions.push(`describes ankle symptoms as ${rec.ankle_symptoms}`);
      if (rec.other_anklepain && rec.other_anklepain !== "0") conditions.push(`notes other ankle pain details as ${rec.other_anklepain}`);
      if (rec.foot_pain && rec.foot_pain !== "0" && rec.foot_pain !== "No") conditions.push(`has foot pain`);
      if (rec.foot_swelling && rec.foot_swelling !== "0" && rec.foot_swelling !== "No") conditions.push(`has <span class='danger'>swelling in the foot</span>`);
      if (rec.foot_pain_charcteristics && rec.foot_pain_charcteristics !== "0") conditions.push(`describes foot pain as ${rec.foot_pain_charcteristics.toLowerCase()}`);
      if (rec.how_did_the_symptom_start_foot && rec.how_did_the_symptom_start_foot !== "0") conditions.push(`reports foot symptom onset as ${rec.how_did_the_symptom_start_foot.toLowerCase()}`);
      if (rec.symptom_progrssed_foot && rec.symptom_progrssed_foot !== "0") conditions.push(`notes foot symptom progression as ${rec.symptom_progrssed_foot.toLowerCase()}`);
      if (rec.severity_pain_foot && rec.severity_pain_foot !== "0") conditions.push(`rates foot pain severity as ${rec.severity_pain_foot.toLowerCase()}`);
      if (rec.footpain_symptoms && rec.footpain_symptoms !== "0") conditions.push(`describes foot pain symptoms as ${rec.footpain_symptoms}`);
      if (rec.pain_other && rec.pain_other !== "0") conditions.push(`notes other pain details as ${rec.pain_other}`);
      if (rec.fever2 && (rec.fever2 === "Yes" || rec.fever2 === true)) conditions.push(`has <span class='danger'>fever</span>`);
      if (rec.breathing && (rec.breathing === "Yes" || rec.breathing === true)) conditions.push(`has <span class='danger'>breathing issues</span>`);
      if (rec.swelling_painful && (rec.swelling_painful === "Yes" || rec.swelling_painful === true)) conditions.push(`has <span class='danger'>painful swelling</span>`);
      if (rec.redness_painful && (rec.redness_painful === "Yes" || rec.redness_painful === true)) conditions.push(`has <span class='danger'>painful redness</span>`);
      if (rec.stiffness && (rec.stiffness === "Yes" || rec.stiffness === true)) conditions.push(`has stiffness`);
      if (rec.unable_to_walk && (rec.unable_to_walk === "Yes" || rec.unable_to_walk === true)) conditions.push(`is <span class='danger'>unable to walk</span>`);
      if (rec.unable_bear_weight && (rec.unable_bear_weight === "Yes" || rec.unable_bear_weight === true)) conditions.push(`is <span class='danger'>unable to bear weight</span>`);
      if (rec.movement_limitation && (rec.movement_limitation === "Yes" || rec.movement_limitation === true)) conditions.push(`has <span class='danger'>movement limitation</span>`);
      if (rec.night_pain && (rec.night_pain === "Yes" || rec.night_pain === true)) conditions.push(`has pain at night`);
      if (rec.other2 && rec.other2 !== "0") conditions.push(`notes other symptoms as ${rec.other2}`);
      if (rec.knee_other && rec.knee_other !== "0") conditions.push(`notes other knee symptoms as ${rec.knee_other}`);
      if (rec.by_movement && (rec.by_movement === "Yes" || rec.by_movement === true)) conditions.push(`has pain triggered by movement`);
      if (rec.using_stairs && (rec.using_stairs === "Yes" || rec.using_stairs === true)) conditions.push(`has pain when using stairs`);
      if (rec.rest && (rec.rest === "Yes" || rec.rest === true)) conditions.push(`has pain at rest`);
      if (rec.other && rec.other !== "0") conditions.push(`notes other pain triggers as ${rec.other}`);
      if (rec.ifother && rec.ifother !== "0") conditions.push(`describes other pain details as ${rec.ifother}`);
      if (rec.any_surgery && rec.any_surgery !== "0" && rec.any_surgery !== "No") conditions.push(`has a history of surgery`);
      if (rec.scan_report && rec.scan_report !== "0" && rec.scan_report !== "No") conditions.push(`has a scan report`);
      if (rec.accident_history && rec.accident_history !== "0" && rec.accident_history !== "No") conditions.push(`has <span class='danger'>a history of accident</span>`);
      if (rec.sugar_bp_history && rec.sugar_bp_history !== "0" && rec.sugar_bp_history !== "No") conditions.push(`has <span class='danger'>a history of hypertension or diabetes</span>`);
      if (rec.standing_hours && rec.standing_hours !== "0" && rec.standing_hours !== "No") conditions.push(`stands for long hours ${rec.standing_hours.toLowerCase()}`);
      if (rec.lifting_heavy && rec.lifting_heavy !== "0" && rec.lifting_heavy !== "No") conditions.push(`lifts heavy objects ${rec.lifting_heavy.toLowerCase()}`);
      if (rec.stressful_job && rec.stressful_job !== "0" && rec.stressful_job !== "No") conditions.push(`has a stressful job`);
      if (rec.are_you_involves_in_tailoringor_in_garment_factory && rec.are_you_involves_in_tailoringor_in_garment_factory !== "0" && rec.are_you_involves_in_tailoringor_in_garment_factory !== "No") conditions.push(`is involved in tailoring or garment factory work`);
      if (rec.gym_frequently && rec.gym_frequently !== "0" && rec.gym_frequently !== "No") conditions.push(`frequently visits the gym`);
      if (rec.family_issues && rec.family_issues !== "0" && rec.family_issues !== "No") conditions.push(`has family issues`);
      if (rec.arthritis_history && rec.arthritis_history !== "0" && rec.arthritis_history !== "No") conditions.push(`has <span class='danger'>a history of arthritis</span>`);
      if (rec.posture_gait && rec.posture_gait !== "0") conditions.push(`describes posture or gait as ${rec.posture_gait}`);
      if (rec.previous_labreports && rec.previous_labreports !== "0" && rec.previous_labreports !== "No") conditions.push(`has previous lab reports`);
      if (rec.upload_report && rec.upload_report !== "0") conditions.push(`has uploaded a lab report`);

      let sentence = "The patient is stable with no notable foot or ankle pain complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes include ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const footAnklePainRecords = records.map((rec, idx) => ({ 
      name: rec.name, 
      recordNumber: idx + 1, 
      creation: rec.creation, 
      uploadedReport: rec.upload_report 
    }));

    const footAnklePainSummaryHtml = `
      <div class="foot-ankle-pain-summary">
        <b>Foot and Ankle Pain Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Foot and Ankle Pain Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { footAnklePainSummaryHtml, redFlagsList, footAnklePainRecords };
  } catch (err) {
    return {
      footAnklePainSummaryHtml: `<div class="foot-ankle-pain-summary" style="color:red;">
        <b>Error loading Foot and Ankle Pain data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      footAnklePainRecords: []
    };
  }
};


// Corrected generateAnemiaAdolescentsSummary function
const generateAnemiaAdolescentsSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'hb_lessthan_7', 'anaemic_individual', 'hb_morethan_7', 'none_anemia', 'anemia_adolescents',
      'have_anemia', 'feeling_tired', 'concentrate_work', 'have_you_attained_menarche', 'marital_status',
      'feeling_breathless', 'feel_palpitation', 'swelling_oflegs', 'gained_weight', 'dewormning_tablet',
      'blood_transfusion', 'iron_injection', 'blood_loss', 'similar_issue', 'anemia_history',
      'family_blood_transfusion', 'check_bdxg', 'describe_regularwork', 'describe_activity',
      'having_children', 'please_decribe_the_age_of_the_children', 'which_method', 'yes_complication',
      'fp_methods', 'delivery_blood_transfusion', 'afterdelivery_complication', 'recently_abortion',
      'menstrual_bleeding', 'check_wfpc', 'check_xfez', 'regular_diet', 'please_upload',
      'toiletin_home', 'slippers_regularly', 'any_previous_lab'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Anemia-Adolescents" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Anemia-Adolescents' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Anemia-Adolescents: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Anemia-Adolescents",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        anemiaAdolescentsSummaryHtml: ``,
        redFlagsList: [],
        anemiaAdolescentsRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        anemiaAdolescentsSummaryHtml: ``,
        redFlagsList: [],
        anemiaAdolescentsRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(anemiaAdolescentsRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${anemiaAdolescentsRedFlagsInfo[field].label} - ${anemiaAdolescentsRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Anemia-Adolescents records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.hb_lessthan_7 && (rec.hb_lessthan_7 === "Yes" || rec.hb_lessthan_7 === true)) conditions.push("has <span class='danger'>hemoglobin less than 7 g/dL</span>");
      if (rec.anaemic_individual && (rec.anaemic_individual === "Yes" || rec.anaemic_individual === true)) conditions.push("is <span class='danger'>diagnosed as anemic</span>");
      if (rec.hb_morethan_7 && (rec.hb_morethan_7 === "Yes" || rec.hb_morethan_7 === true)) conditions.push("has hemoglobin greater than 7 g/dL");
      if (rec.anemia_adolescents && rec.anemia_adolescents !== "0") conditions.push("is diagnosed with anemia");
      if (rec.have_anemia && rec.have_anemia !== "0") conditions.push(`reports anemia symptoms: ${rec.have_anemia}`);
      if (rec.feeling_tired && (rec.feeling_tired === "Yes" || rec.feeling_tired === true)) conditions.push("has <span class='danger'>fatigue</span>");
      if (rec.concentrate_work && (rec.concentrate_work === "Yes" || rec.concentrate_work === true)) conditions.push("has difficulty concentrating on work");
      if (rec.have_you_attained_menarche && (rec.have_you_attained_menarche === "Yes" || rec.have_you_attained_menarche === true)) conditions.push("has attained menarche");
      if (rec.marital_status && rec.marital_status !== "0") conditions.push(`marital status: ${rec.marital_status}`);
      if (rec.feeling_breathless && (rec.feeling_breathless === "Yes" || rec.feeling_breathless === true)) conditions.push("has <span class='danger'>shortness of breath</span>");
      if (rec.feel_palpitation && (rec.feel_palpitation === "Yes" || rec.feel_palpitation === true)) conditions.push("has <span class='danger'>palpitations</span>");
      if (rec.swelling_oflegs && (rec.swelling_oflegs === "Yes" || rec.swelling_oflegs === true)) conditions.push("has <span class='danger'>swelling of legs</span>");
      if (rec.gained_weight && (rec.gained_weight === "Yes" || rec.gained_weight === true)) conditions.push("has <span class='danger'>gained weight</span>");
      if (rec.dewormning_tablet && (rec.dewormning_tablet === "Yes" || rec.dewormning_tablet === true)) conditions.push("has taken deworming tablets");
      if (rec.blood_transfusion && (rec.blood_transfusion === "Yes" || rec.blood_transfusion === true)) conditions.push("has <span class='danger'>had a blood transfusion</span>");
      if (rec.iron_injection && (rec.iron_injection === "Yes" || rec.iron_injection === true)) conditions.push("has received iron injections");
      if (rec.blood_loss && (rec.blood_loss === "Yes" || rec.blood_loss === true)) conditions.push("has <span class='danger'>experienced blood loss</span>");
      if (rec.similar_issue && (rec.similar_issue === "Yes" || rec.similar_issue === true)) conditions.push("has had similar issues previously");
      if (rec.anemia_history && (rec.anemia_history === "Yes" || rec.anemia_history === true)) conditions.push("has <span class='danger'>a history of anemia</span>");
      if (rec.family_blood_transfusion && (rec.family_blood_transfusion === "Yes" || rec.family_blood_transfusion === true)) conditions.push("has a <span class='danger'>family history of blood transfusion</span>");
      if (rec.check_bdxg && (rec.check_bdxg === "Yes" || rec.check_bdxg === true)) conditions.push("has additional clinical findings");
      if (rec.describe_regularwork && rec.describe_regularwork !== "0") conditions.push(`regular work: ${rec.describe_regularwork}`);
      if (rec.describe_activity && rec.describe_activity !== "0") conditions.push(`daily activity: ${rec.describe_activity}`);
      if (rec.having_children && (rec.having_children === "Yes" || rec.having_children === true)) conditions.push("has children");
      if (rec.please_decribe_the_age_of_the_children && rec.please_decribe_the_age_of_the_children !== "0") conditions.push(`children's ages: ${rec.please_decribe_the_age_of_the_children}`);
      if (rec.which_method && rec.which_method !== "0") conditions.push(`family planning method: ${rec.which_method}`);
      if (rec.yes_complication && rec.yes_complication !== "0") conditions.push(`complications: ${rec.yes_complication}`);
      if (rec.fp_methods && rec.fp_methods !== "0") conditions.push(`family planning methods: ${rec.fp_methods}`);
      if (rec.delivery_blood_transfusion && (rec.delivery_blood_transfusion === "Yes" || rec.delivery_blood_transfusion === true)) conditions.push("had <span class='danger'>blood transfusion during delivery</span>");
      if (rec.afterdelivery_complication && (rec.afterdelivery_complication === "Yes" || rec.afterdelivery_complication === true)) conditions.push("had <span class='danger'>complications after delivery</span>");
      if (rec.recently_abortion && (rec.recently_abortion === "Yes" || rec.recently_abortion === true)) conditions.push("has <span class='danger'>had a recent abortion</span>");
      if (rec.menstrual_bleeding && (rec.menstrual_bleeding === "Yes" || rec.menstrual_bleeding === true)) conditions.push("has <span class='danger'>abnormal menstrual bleeding</span>");
      if (rec.check_wfpc && (rec.check_wfpc === "Yes" || rec.check_wfpc === true)) conditions.push("has additional reproductive health findings");
      if (rec.check_xfez && (rec.check_xfez === "Yes" || rec.check_xfez === true)) conditions.push("has additional clinical observations");
      if (rec.regular_diet && rec.regular_diet !== "0") conditions.push(`regular diet: ${rec.regular_diet}`);
      if (rec.please_upload && rec.please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.toiletin_home && (rec.toiletin_home === "Yes" || rec.toiletin_home === true)) conditions.push("has a toilet at home");
      if (rec.slippers_regularly && (rec.slippers_regularly === "Yes" || rec.slippers_regularly === true)) conditions.push("wears slippers regularly");
      if (rec.any_previous_lab && (rec.any_previous_lab === "Yes" || rec.any_previous_lab === true)) conditions.push("has previous lab reports");
      if (rec.none_anemia && (rec.none_anemia === "Yes" || rec.none_anemia === true)) conditions.push("reports no anemia symptoms");

      let sentence = "The patient is stable with no notable anemia complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const anemiaAdolescentsRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      please_upload: rec.please_upload
    }));

    const anemiaAdolescentsSummaryHtml = `
      <div class="anemia-adolescents-summary">
        <b>Anemia-Adolescents Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Anemia-Adolescents Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { anemiaAdolescentsSummaryHtml, redFlagsList, anemiaAdolescentsRecords };
  } catch (err) {
    return {
      anemiaAdolescentsSummaryHtml: `<div class="anemia-adolescents-summary" style="color:red;">
        <b>Error loading Anemia-Adolescents data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      anemiaAdolescentsRecords: []
    };
  }
};


// Corrected generateAnemiaChildrenSummary function
const generateAnemiaChildrenSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'if_hb_less_than_7_gmdl', 'anaemic_individual', 'if_hb_more_than_7_gmdl_to_less_than_11_gmdl', 'none', 'anemia_children',
      'child_anemia', 'more_irritable', 'child_tired', 'child_sleeping', 'losing_concentration', 'any_jaundice',
      'recurrent_nosebleed', 'eat_mud', 'attenaied_menarche', 'child_bloodtest', 'child_blood_transfusion',
      'surgery_bloodloss', 'jaundice_afterbirth', 'breastfeeding_child', 'toiletat_home', 'wearing_slipper',
      'family_issue', 'family_anemia', 'family_blood', 'check_rcks', 'menstrual_history', 'days_admitted',
      'did_childtalk', 'did_childwalk', 'childsit_support', 'daily_milk', 'daily_diet', 'complementary_feeding',
      'no_breastfeed', 'check_znsu', 'observe_the_developmental_milestones', 'any_previous_lab', 'please_upload'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Anemia- Children" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Anemia- Children' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Anemia-Children: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Anemia- Children",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        anemiaChildrenSummaryHtml: ``,
        redFlagsList: [],
        anemiaChildrenRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        anemiaChildrenSummaryHtml: ``,
        redFlagsList: [],
        anemiaChildrenRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(anemiaChildrenRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${anemiaChildrenRedFlagsInfo[field].label} - ${anemiaChildrenRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Anemia-Children records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.if_hb_less_than_7_gmdl && (rec.if_hb_less_than_7_gmdl === "Yes" || rec.if_hb_less_than_7_gmdl === true)) conditions.push("has <span class='danger'>hemoglobin less than 7 g/dL</span>");
      if (rec.anaemic_individual && (rec.anaemic_individual === "Yes" || rec.anaemic_individual === true)) conditions.push("is <span class='danger'>diagnosed as anemic</span>");
      if (rec.if_hb_more_than_7_gmdl_to_less_than_11_gmdl && (rec.if_hb_more_than_7_gmdl_to_less_than_11_gmdl === "Yes" || rec.if_hb_more_than_7_gmdl_to_less_than_11_gmdl === true)) conditions.push("has hemoglobin between 7 and 11 g/dL");
      if (rec.anemia_children && rec.anemia_children !== "0") conditions.push("is diagnosed with anemia");
      if (rec.child_anemia && (rec.child_anemia === "Yes" || rec.child_anemia === true)) conditions.push("has <span class='danger'>anemia symptoms</span>");
      if (rec.more_irritable && (rec.more_irritable === "Yes" || rec.more_irritable === true)) conditions.push("is <span class='danger'>more irritable than usual</span>");
      if (rec.child_tired && (rec.child_tired === "Yes" || rec.child_tired === true)) conditions.push("has <span class='danger'>fatigue</span>");
      if (rec.child_sleeping && (rec.child_sleeping === "Yes" || rec.child_sleeping === true)) conditions.push("has <span class='danger'>changes in sleeping patterns</span>");
      if (rec.losing_concentration && (rec.losing_concentration === "Yes" || rec.losing_concentration === true)) conditions.push("has <span class='danger'>difficulty concentrating</span>");
      if (rec.any_jaundice && (rec.any_jaundice === "Yes" || rec.any_jaundice === true)) conditions.push("has <span class='danger'>jaundice</span>");
      if (rec.recurrent_nosebleed && (rec.recurrent_nosebleed === "Yes" || rec.recurrent_nosebleed === true)) conditions.push("has <span class='danger'>recurrent nosebleeds</span>");
      if (rec.eat_mud && (rec.eat_mud === "Yes" || rec.eat_mud === true)) conditions.push("has <span class='danger'>pica by eating mud</span>");
      if (rec.attenaied_menarche && (rec.attenaied_menarche === "Yes" || rec.attenaied_menarche === true)) conditions.push("has attained menarche");
      if (rec.child_bloodtest && (rec.child_bloodtest === "Yes" || rec.child_bloodtest === true)) conditions.push("has had a blood test");
      if (rec.child_blood_transfusion && (rec.child_blood_transfusion === "Yes" || rec.child_blood_transfusion === true)) conditions.push("has <span class='danger'>had a blood transfusion</span>");
      if (rec.surgery_bloodloss && (rec.surgery_bloodloss === "Yes" || rec.surgery_bloodloss === true)) conditions.push("has <span class='danger'>experienced blood loss from surgery</span>");
      if (rec.jaundice_afterbirth && (rec.jaundice_afterbirth === "Yes" || rec.jaundice_afterbirth === true)) conditions.push("had <span class='danger'>jaundice after birth</span>");
      if (rec.breastfeeding_child && (rec.breastfeeding_child === "Yes" || rec.breastfeeding_child === true)) conditions.push("is breastfeeding");
      if (rec.toiletat_home && (rec.toiletat_home === "Yes" || rec.toiletat_home === true)) conditions.push("has a toilet at home");
      if (rec.wearing_slipper && (rec.wearing_slipper === "Yes" || rec.wearing_slipper === true)) conditions.push("wears slippers regularly");
      if (rec.family_issue && (rec.family_issue === "Yes" || rec.family_issue === true)) conditions.push("has family issues");
      if (rec.family_anemia && (rec.family_anemia === "Yes" || rec.family_anemia === true)) conditions.push("has <span class='danger'>a family history of anemia</span>");
      if (rec.family_blood && (rec.family_blood === "Yes" || rec.family_blood === true)) conditions.push("has <span class='danger'>a family history of blood disorders</span>");
      if (rec.check_rcks && (rec.check_rcks === "Yes" || rec.check_rcks === true)) conditions.push("has additional clinical findings");
      if (rec.menstrual_history && rec.menstrual_history !== "0") conditions.push(`menstrual history: ${rec.menstrual_history}`);
      if (rec.days_admitted && rec.days_admitted !== "0") conditions.push(`was admitted for ${rec.days_admitted} days`);
      if (rec.did_childtalk && rec.did_childtalk !== "0") conditions.push(`talking milestone: ${rec.did_childtalk}`);
      if (rec.did_childwalk && rec.did_childwalk !== "0") conditions.push(`walking milestone: ${rec.did_childwalk}`);
      if (rec.childsit_support && rec.childsit_support !== "0") conditions.push(`sitting with support: ${rec.childsit_support}`);
      if (rec.daily_milk && rec.daily_milk !== "0") conditions.push(`daily milk consumption: ${rec.daily_milk}`);
      if (rec.daily_diet && rec.daily_diet !== "0") conditions.push(`daily diet: ${rec.daily_diet}`);
      if (rec.complementary_feeding && rec.complementary_feeding !== "0") conditions.push(`complementary feeding: ${rec.complementary_feeding}`);
      if (rec.no_breastfeed && rec.no_breastfeed !== "0") conditions.push(`not breastfed: ${rec.no_breastfeed}`);
      if (rec.check_znsu && (rec.check_znsu === "Yes" || rec.check_znsu === true)) conditions.push("has additional developmental observations");
      if (rec.observe_the_developmental_milestones && rec.observe_the_developmental_milestones !== "0") conditions.push(`developmental milestones: ${rec.observe_the_developmental_milestones}`);
      if (rec.any_previous_lab && (rec.any_previous_lab === "Yes" || rec.any_previous_lab === true)) conditions.push("has previous lab reports");
      if (rec.please_upload && rec.please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no anemia symptoms");

      let sentence = "The patient is stable with no notable anemia complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const anemiaChildrenRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      please_upload: rec.please_upload
    }));

    const anemiaChildrenSummaryHtml = `
      <div class="anemia-children-summary">
        <b>Anemia-Children Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Anemia-Children Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { anemiaChildrenSummaryHtml, redFlagsList, anemiaChildrenRecords };
  } catch (err) {
    return {
      anemiaChildrenSummaryHtml: `<div class="anemia-children-summary" style="color:red;">
        <b>Error loading Anemia-Children data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      anemiaChildrenRecords: []
    };
  }
};


// Corrected generateHeadacheSummary function
const generateHeadacheSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'any_sudden_severe', 'headche_associated', 'slurred_speech', 'headache_nasal', 'none_headache', 'headache',
      'do_you_have_headache', 'seviarity', 'how_did_it_start', 'which_time_of_the_day_is_the_most', 'since_when',
      'which_part_of_the_head', 'check_pdxh', 'throbbing', 'stabbing', 'pounding', 'dull_continuous', 'other_option',
      'check_zmlp', 'coughing', 'bending_forward', 'exposure_to_cold', 'exposure_to_sun', 'while_working_on_laptop',
      'if_other_please_describe', 'any_fever', 'any_cold', 'any_cough', 'any_throat_pain', 'any_blurring_of_vision',
      'any_nausea_or_vomiting', 'if_yes_does_vomiting_relieve_headache', 'does_the_headache_cause_sleep_disturbance',
      'any_dizziness', 'if_yes_have_you_fallen_due_to_diziness', 'check_yift', 'if_yes_describe_the_color_of_the_sputum',
      'any_history_of_hypertension', 'any_history_of_heart_diseases', 'any_history_of_diabetes', 'any_history_of_thyroid_issues',
      'any_past_history_of_vision_problem', 'any_history_of_fall_in_the_past_6_months', 'any_history_of_head_injury',
      'check_mrai', 'does_your_work_involved_very_loud_sound', 'do_you_have_very_long_working_hours',
      'does_your_work_involved_lots_of_stress', 'check_reps', 'check_dwfp', 'check_vision_with_snellens_chart',
      'previous_lab_reports', 'check_vojh', 'if_yes_please_upload'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Headache" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Headache' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Headache: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Headache",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        headacheSummaryHtml: ``,
        redFlagsList: [],
        headacheRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        headacheSummaryHtml: ``,
        redFlagsList: [],
        headacheRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(headacheRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${headacheRedFlagsInfo[field].label} - ${headacheRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Headache records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.any_sudden_severe && (rec.any_sudden_severe === "Yes" || rec.any_sudden_severe === true)) conditions.push("has <span class='danger'>sudden severe headache</span>");
      if (rec.headche_associated && (rec.headche_associated === "Yes" || rec.headche_associated === true)) conditions.push("has <span class='danger'>associated neurological symptoms</span>");
      if (rec.slurred_speech && (rec.slurred_speech === "Yes" || rec.slurred_speech === true)) conditions.push("has <span class='danger'>slurred speech</span>");
      if (rec.headache_nasal && (rec.headache_nasal === "Yes" || rec.headache_nasal === true)) conditions.push("has <span class='danger'>nasal symptoms with headache</span>");
      if (rec.headache && rec.headache !== "0") conditions.push("experiences headache");
      if (rec.do_you_have_headache && (rec.do_you_have_headache === "Yes" || rec.do_you_have_headache === true)) conditions.push("reports <span class='danger'>headache symptoms</span>");
      if (rec.seviarity && rec.seviarity !== "0") conditions.push(`headache seviarity: ${rec.seviarity}`);
      if (rec.how_did_it_start && rec.how_did_it_start !== "0") conditions.push(`headache onset: ${rec.how_did_it_start}`);
      if (rec.which_time_of_the_day_is_the_most && rec.which_time_of_the_day_is_the_most !== "0") conditions.push(`headache most severe during: ${rec.which_time_of_the_day_is_the_most}`);
      if (rec.since_when && rec.since_when !== "0") conditions.push(`headache duration: ${rec.since_when}`);
      if (rec.which_part_of_the_head && rec.which_part_of_the_head !== "0") conditions.push(`headache location: ${rec.which_part_of_the_head}`);
      if (rec.check_pdxh && (rec.check_pdxh === "Yes" || rec.check_pdxh === true)) conditions.push("has additional headache findings");
      if (rec.throbbing && (rec.throbbing === "Yes" || rec.throbbing === true)) conditions.push("describes headache as <span class='danger'>throbbing</span>");
      if (rec.stabbing && (rec.stabbing === "Yes" || rec.stabbing === true)) conditions.push("describes headache as <span class='danger'>stabbing</span>");
      if (rec.pounding && (rec.pounding === "Yes" || rec.pounding === true)) conditions.push("describes headache as <span class='danger'>pounding</span>");
      if (rec.dull_continuous && (rec.dull_continuous === "Yes" || rec.dull_continuous === true)) conditions.push("describes headache as dull and continuous");
      if (rec.other_option && (rec.other_option === "Yes" || rec.other_option === true)) conditions.push("describes other headache characteristics");
      if (rec.check_zmlp && (rec.check_zmlp === "Yes" || rec.check_zmlp === true)) conditions.push("has additional clinical observations");
      if (rec.coughing && (rec.coughing === "Yes" || rec.coughing === true)) conditions.push("headache worsens with coughing");
      if (rec.bending_forward && (rec.bending_forward === "Yes" || rec.bending_forward === true)) conditions.push("headache worsens when bending forward");
      if (rec.exposure_to_cold && (rec.exposure_to_cold === "Yes" || rec.exposure_to_cold === true)) conditions.push("headache worsens with exposure to cold");
      if (rec.exposure_to_sun && (rec.exposure_to_sun === "Yes" || rec.exposure_to_sun === true)) conditions.push("headache worsens with exposure to sun");
      if (rec.while_working_on_laptop && (rec.while_working_on_laptop === "Yes" || rec.while_working_on_laptop === true)) conditions.push("headache worsens while working on a laptop");
      if (rec.if_other_please_describe && rec.if_other_please_describe !== "0") conditions.push(`headache described as: ${rec.if_other_please_describe}`);
      if (rec.any_fever && (rec.any_fever === "Yes" || rec.any_fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.any_cold && (rec.any_cold === "Yes" || rec.any_cold === true)) conditions.push("has a cold");
      if (rec.any_cough && (rec.any_cough === "Yes" || rec.any_cough === true)) conditions.push("has a cough");
      if (rec.any_throat_pain && (rec.any_throat_pain === "Yes" || rec.any_throat_pain === true)) conditions.push("has throat pain");
      if (rec.any_blurring_of_vision && (rec.any_blurring_of_vision === "Yes" || rec.any_blurring_of_vision === true)) conditions.push("has <span class='danger'>blurring of vision</span>");
      if (rec.any_nausea_or_vomiting && (rec.any_nausea_or_vomiting === "Yes" || rec.any_nausea_or_vomiting === true)) conditions.push("has <span class='danger'>nausea or vomiting</span>");
      if (rec.if_yes_does_vomiting_relieve_headache && (rec.if_yes_does_vomiting_relieve_headache === "Yes" || rec.if_yes_does_vomiting_relieve_headache === true)) conditions.push("vomiting relieves headache");
      if (rec.does_the_headache_cause_sleep_disturbance && (rec.does_the_headache_cause_sleep_disturbance === "Yes" || rec.does_the_headache_cause_sleep_disturbance === true)) conditions.push("has <span class='danger'>sleep disturbance due to headache</span>");
      if (rec.any_dizziness && (rec.any_dizziness === "Yes" || rec.any_dizziness === true)) conditions.push("has <span class='danger'>dizziness</span>");
      if (rec.if_yes_have_you_fallen_due_to_diziness && (rec.if_yes_have_you_fallen_due_to_diziness === "Yes" || rec.if_yes_have_you_fallen_due_to_diziness === true)) conditions.push("has <span class='danger'>fallen due to dizziness</span>");
      if (rec.check_yift && (rec.check_yift === "Yes" || rec.check_yift === true)) conditions.push("has additional respiratory findings");
      if (rec.if_yes_describe_the_color_of_the_sputum && rec.if_yes_describe_the_color_of_the_sputum !== "0") conditions.push(`sputum color: ${rec.if_yes_describe_the_color_of_the_sputum}`);
      if (rec.any_history_of_hypertension && (rec.any_history_of_hypertension === "Yes" || rec.any_history_of_hypertension === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.any_history_of_heart_diseases && (rec.any_history_of_heart_diseases === "Yes" || rec.any_history_of_heart_diseases === true)) conditions.push("has <span class='danger'>a history of heart diseases</span>");
      if (rec.any_history_of_diabetes && (rec.any_history_of_diabetes === "Yes" || rec.any_history_of_diabetes === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.any_history_of_thyroid_issues && (rec.any_history_of_thyroid_issues === "Yes" || rec.any_history_of_thyroid_issues === true)) conditions.push("has a history of thyroid issues");
      if (rec.any_past_history_of_vision_problem && (rec.any_past_history_of_vision_problem === "Yes" || rec.any_past_history_of_vision_problem === true)) conditions.push("has <span class='danger'>a history of vision problems</span>");
      if (rec.any_history_of_fall_in_the_past_6_months && (rec.any_history_of_fall_in_the_past_6_months === "Yes" || rec.any_history_of_fall_in_the_past_6_months === true)) conditions.push("has <span class='danger'>a history of falls in the past 6 months</span>");
      if (rec.any_history_of_head_injury && (rec.any_history_of_head_injury === "Yes" || rec.any_history_of_head_injury === true)) conditions.push("has <span class='danger'>a history of head injury</span>");
      if (rec.check_mrai && (rec.check_mrai === "Yes" || rec.check_mrai === true)) conditions.push("has additional medical history findings");
      if (rec.does_your_work_involved_very_loud_sound && (rec.does_your_work_involved_very_loud_sound === "Yes" || rec.does_your_work_involved_very_loud_sound === true)) conditions.push("works in an environment with loud sounds");
      if (rec.do_you_have_very_long_working_hours && (rec.do_you_have_very_long_working_hours === "Yes" || rec.do_you_have_very_long_working_hours === true)) conditions.push("has long working hours");
      if (rec.does_your_work_involved_lots_of_stress && (rec.does_your_work_involved_lots_of_stress === "Yes" || rec.does_your_work_involved_lots_of_stress === true)) conditions.push("has a stressful work environment");
      if (rec.check_reps && (rec.check_reps === "Yes" || rec.check_reps === true)) conditions.push("has additional environmental findings");
      if (rec.check_dwfp && (rec.check_dwfp === "Yes" || rec.check_dwfp === true)) conditions.push("has additional work-related findings");
      if (rec.check_vision_with_snellens_chart && rec.check_vision_with_snellens_chart !== "0") conditions.push(`vision test results: ${rec.check_vision_with_snellens_chart}`);
      if (rec.previous_lab_reports && (rec.previous_lab_reports === "Yes" || rec.previous_lab_reports === true)) conditions.push("has previous lab reports");
      if (rec.check_vojh && (rec.check_vojh === "Yes" || rec.check_vojh === true)) conditions.push("has additional clinical observations");
      if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.none_headache && (rec.none_headache === "Yes" || rec.none_headache === true)) conditions.push("reports no headache symptoms");

      let sentence = "The patient is stable with no notable headache complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const headacheRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      if_yes_please_upload: rec.if_yes_please_upload
    }));

    const headacheSummaryHtml = `
      <div class="headache-summary">
        <b>Headache Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Headache Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { headacheSummaryHtml, redFlagsList, headacheRecords };
  } catch (err) {
    return {
      headacheSummaryHtml: `<div class="headache-summary" style="color:red;">
        <b>Error loading Headache data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      headacheRecords: []
    };
  }
};


// Corrected generatePregnancyCareSummary function
const generatePregnancyCareSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'any_urinary_complaints', 'if_hb_less_than_7_gmdl', 'if_hb_more_than_7_gmdl_to_less_than_11_gmdl',
      'server_headche', 'reduces_or_absent_foetal_movement', 'leaking_or_bleeding_pv', 'none_pregnancy',
      'pregnancy_care', 'pregnancy_confirmed', 'taken_iron_injection', 'fetal_movement', 'early_pregnancy',
      'any_bloodtest', 'scanning_done', 'td_booster', 'any_medication', 'deworming_tablet', 'which_pregnancy',
      'lmp', 'edd', 'complication_other', 'hospital_name', 'ncd_diabetes', 'ncd_hypertension', 'thyroid',
      'fever_care', 'dysuria', 'burning_micturition', 'headsche', 'high_blood_pressure', 'high_blood_sugar',
      'white_discharge', 'edema', 'jaundice', 'bleeding_pv', 'other', 'none2', 'if_yes_upload_the_report',
      'scanning_report', 'tablets_pic', 'number_of_living_children', 'pregnancy_complication', 'baby_weight',
      'post_delivery_issue', 'contraception_pregnancies', 'reason_for_abortion', 'mode_of_previous_delivery',
      'any_preterm_delivery', 'lbw_baby', 'defects_congenital', 'any_abortion', 'if_yes_which_trimister',
      'type_of_abortion', 'stillbirth_history', 'history_iron_injection', 'twin_pregnancies', 'ectopic_pregnancy',
      'check_wbmb', 'hypertension', 'diabetes', 'heart_diseases', 'thyroid_issues', 'none', 'check_cquo',
      'fundal_height', 'fetal_heart_rate', 'breast_examination', 'twin_pregnancies', 'any_previous_lab',
      'please_upload'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Pregnancy Care" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Pregnancy Care" });
      // if (!doctypeMeta) throw new Error("Doctype 'Pregnancy Care' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Pregnancy Care: ${metaErr.message}`);
    }

    const args = {
      doctype: "Pregnancy Care",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        pregnancyCareSummaryHtml: ``,
        redFlagsList: [],
        pregnancyCareRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        pregnancyCareSummaryHtml: ``,
        redFlagsList: [],
        pregnancyCareRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      const flags = [];
      Object.keys(pregnancyCareRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          flags.push(`${pregnancyCareRedFlagsInfo[field].label} - ${pregnancyCareRedFlagsInfo[field].message}`);
        }
      });
      if (rec.high_blood_pressure && (rec.high_blood_pressure === "Yes" || rec.high_blood_pressure === true || (rec.high_blood_pressure !== "0" && rec.high_blood_pressure !== ""))) {
        flags.push(`BP > 130/80 mmHg - Refer to Health centre/PHC/CHC: Monitor at health centre, check fetal heart if BP increasing, refer.`);
        if (rec.high_blood_pressure === "BP > 150/90") {
          flags.push(`BP > 150/90 mmHg - Refer to Tertiary health care centre: Need to start antihypertensives and monitor.`);
        }
      }
      if (rec.high_blood_sugar && (rec.high_blood_sugar === "Yes" || rec.high_blood_sugar === true || (rec.high_blood_sugar !== "0" && rec.high_blood_sugar !== ""))) {
        flags.push(`GRBS > 140 mg/dl - Refer to Health centre/PHC/CHC: Required further investigation and to start Antidiabetic.`);
      }
      if (rec.fever_care && (rec.fever_care === "Yes" || rec.fever_care === true)) {
        flags.push(`Fever > 104°F - Refer to Health centre/PHC/CHC: Investigation and treat.`);
      }
      if (flags.length > 0) {
        redFlagsList.push({
          recordNumber: idx + 1,
          creation: rec.creation,
          flags: flags
        });
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Pregnancy Care records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.any_urinary_complaints && (rec.any_urinary_complaints === "Yes" || rec.any_urinary_complaints === true)) conditions.push("has <span class='danger'>urinary complaints</span>");
      if (rec.if_hb_less_than_7_gmdl && (rec.if_hb_less_than_7_gmdl === "Yes" || rec.if_hb_less_than_7_gmdl === true)) conditions.push("has <span class='danger'>hemoglobin less than 7 g/dL</span>");
      if (rec.if_hb_more_than_7_gmdl_to_less_than_11_gmdl && (rec.if_hb_more_than_7_gmdl_to_less_than_11_gmdl === "Yes" || rec.if_hb_more_than_7_gmdl_to_less_than_11_gmdl === true)) conditions.push("has hemoglobin between 7 and 11 g/dL");
      if (rec.server_headche && (rec.server_headche === "Yes" || rec.server_headche === true)) conditions.push("has <span class='danger'>severe headache</span>");
      if (rec.reduces_or_absent_foetal_movement && (rec.reduces_or_absent_foetal_movement === "Yes" || rec.reduces_or_absent_foetal_movement === true)) conditions.push("has <span class='danger'>reduced or absent fetal movement</span>");
      if (rec.leaking_or_bleeding_pv && (rec.leaking_or_bleeding_pv === "Yes" || rec.leaking_or_bleeding_pv === true)) conditions.push("has <span class='danger'>leaking or bleeding per vagina</span>");
      if (rec.pregnancy_care && rec.pregnancy_care !== "0" && rec.pregnancy_care !== "") conditions.push("is under pregnancy care");
      if (rec.pregnancy_confirmed && (rec.pregnancy_confirmed === "Yes" || rec.pregnancy_confirmed === true)) conditions.push("has confirmed pregnancy");
      if (rec.taken_iron_injection && (rec.taken_iron_injection === "Yes" || rec.taken_iron_injection === true)) conditions.push("has received iron injections");
      if (rec.fetal_movement && rec.fetal_movement !== "0" && rec.fetal_movement !== "") conditions.push(`fetal movement: ${rec.fetal_movement}`);
      if (rec.early_pregnancy && rec.early_pregnancy !== "0" && rec.early_pregnancy !== "") conditions.push(`pregnancy stage: ${rec.early_pregnancy}`);
      if (rec.any_bloodtest && (rec.any_bloodtest === "Yes" || rec.any_bloodtest === true)) conditions.push("has undergone blood tests");
      if (rec.scanning_done && (rec.scanning_done === "Yes" || rec.scanning_done === true)) conditions.push("has had ultrasound scanning");
      if (rec.td_booster && (rec.td_booster === "Yes" || rec.td_booster === true)) conditions.push("has received a Td booster");
      if (rec.any_medication && (rec.any_medication === "Yes" || rec.any_medication === true)) conditions.push("is taking medication");
      if (rec.deworming_tablet && (rec.deworming_tablet === "Yes" || rec.deworming_tablet === true)) conditions.push("has taken deworming tablets");
      if (rec.which_pregnancy && rec.which_pregnancy !== "0" && rec.which_pregnancy !== "") conditions.push(`pregnancy number: ${rec.which_pregnancy}`);
      if (rec.lmp && rec.lmp !== "0" && rec.lmp !== "") conditions.push(`last menstrual period: ${rec.lmp}`);
      if (rec.edd && rec.edd !== "0" && rec.edd !== "") conditions.push(`expected delivery date: ${rec.edd}`);
      if (rec.complication_other && rec.complication_other !== "0" && rec.complication_other !== "") conditions.push(`other complications: ${rec.complication_other}`);
      if (rec.hospital_name && rec.hospital_name !== "0" && rec.hospital_name !== "") conditions.push(`care facility: ${rec.hospital_name}`);
      if (rec.ncd_diabetes && (rec.ncd_diabetes === "Yes" || rec.ncd_diabetes === true)) conditions.push("has <span class='danger'>non-communicable disease diabetes</span>");
      if (rec.ncd_hypertension && (rec.ncd_hypertension === "Yes" || rec.ncd_hypertension === true)) conditions.push("has <span class='danger'>non-communicable disease hypertension</span>");
      if (rec.thyroid && (rec.thyroid === "Yes" || rec.thyroid === true)) conditions.push("has <span class='danger'>thyroid issues</span>");
      if (rec.fever_care && (rec.fever_care === "Yes" || rec.fever_care === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.dysuria && (rec.dysuria === "Yes" || rec.dysuria === true)) conditions.push("has <span class='danger'>dysuria</span>");
      if (rec.burning_micturition && (rec.burning_micturition === "Yes" || rec.burning_micturition === true)) conditions.push("has <span class='danger'>burning micturition</span>");
      if (rec.headsche && (rec.headsche === "Yes" || rec.headsche === true)) conditions.push("has <span class='danger'>headache</span>");
      if (rec.high_blood_pressure && (rec.high_blood_pressure === "Yes" || rec.high_blood_pressure === true || (rec.high_blood_pressure !== "0" && rec.high_blood_pressure !== ""))) conditions.push("has <span class='danger'>high blood pressure</span>");
      if (rec.high_blood_sugar && (rec.high_blood_sugar === "Yes" || rec.high_blood_sugar === true || (rec.high_blood_sugar !== "0" && rec.high_blood_sugar !== ""))) conditions.push("has <span class='danger'>high blood sugar</span>");
      if (rec.white_discharge && (rec.white_discharge === "Yes" || rec.white_discharge === true)) conditions.push("has <span class='danger'>white discharge</span>");
      if (rec.edema && (rec.edema === "Yes" || rec.edema === true)) conditions.push("has <span class='danger'>edema</span>");
      if (rec.jaundice && (rec.jaundice === "Yes" || rec.jaundice === true)) conditions.push("has <span class='danger'>jaundice</span>");
      if (rec.bleeding_pv && (rec.bleeding_pv === "Yes" || rec.bleeding_pv === true)) conditions.push("has <span class='danger'>bleeding per vagina</span>");
      if (rec.other && rec.other !== "0" && rec.other !== "") conditions.push(`other symptoms: ${rec.other}`);
      if (rec.check_wbmb && (rec.check_wbmb === "Yes" || rec.check_wbmb === true)) conditions.push("has additional pregnancy-related findings");
      if (rec.check_cquo && (rec.check_cquo === "Yes" || rec.check_cquo === true)) conditions.push("has additional clinical observations");
      if (rec.if_yes_upload_the_report && rec.if_yes_upload_the_report !== "0" && rec.if_yes_upload_the_report !== "") conditions.push("has uploaded a lab report");
      if (rec.scanning_report && rec.scanning_report !== "0" && rec.scanning_report !== "") conditions.push("has uploaded a scanning report");
      if (rec.tablets_pic && rec.tablets_pic !== "0" && rec.tablets_pic !== "") conditions.push("has uploaded a picture of tablets");
      if (rec.number_of_living_children && rec.number_of_living_children !== "0" && rec.number_of_living_children !== "") conditions.push(`has ${rec.number_of_living_children} living children`);
      if (rec.pregnancy_complication && rec.pregnancy_complication !== "0" && rec.pregnancy_complication !== "") conditions.push(`previous pregnancy complications: ${rec.pregnancy_complication}`);
      if (rec.baby_weight && rec.baby_weight !== "0" && rec.baby_weight !== "") conditions.push(`previous baby weight: ${rec.baby_weight}`);
      if (rec.post_delivery_issue && rec.post_delivery_issue !== "0" && rec.post_delivery_issue !== "") conditions.push(`post-delivery issues: ${rec.post_delivery_issue}`);
      if (rec.contraception_pregnancies && rec.contraception_pregnancies !== "0" && rec.contraception_pregnancies !== "") conditions.push(`contraception between pregnancies: ${rec.contraception_pregnancies}`);
      if (rec.reason_for_abortion && rec.reason_for_abortion !== "0" && rec.reason_for_abortion !== "") conditions.push(`reason for abortion: ${rec.reason_for_abortion}`);
      if (rec.mode_of_previous_delivery && rec.mode_of_previous_delivery !== "0" && rec.mode_of_previous_delivery !== "") conditions.push(`previous delivery mode: ${rec.mode_of_previous_delivery}`);
      if (rec.any_preterm_delivery && (rec.any_preterm_delivery === "Yes" || rec.any_preterm_delivery === true)) conditions.push("had <span class='danger'>a preterm delivery</span>");
      if (rec.lbw_baby && (rec.lbw_baby === "Yes" || rec.lbw_baby === true)) conditions.push("had <span class='danger'>a low birth weight baby</span>");
      if (rec.defects_congenital && (rec.defects_congenital === "Yes" || rec.defects_congenital === true)) conditions.push("had <span class='danger'>a baby with congenital defects</span>");
      if (rec.any_abortion && (rec.any_abortion === "Yes" || rec.any_abortion === true)) conditions.push("has <span class='danger'>had an abortion</span>");
      if (rec.if_yes_which_trimister && rec.if_yes_which_trimister !== "0" && rec.if_yes_which_trimister !== "") conditions.push(`abortion in the ${rec.if_yes_which_trimister} trimester`);
      if (rec.type_of_abortion && rec.type_of_abortion !== "0" && rec.type_of_abortion !== "") conditions.push(`abortion type: ${rec.type_of_abortion}`);
      if (rec.stillbirth_history && (rec.stillbirth_history === "Yes" || rec.stillbirth_history === true)) conditions.push("has <span class='danger'>a history of stillbirth</span>");
      if (rec.history_iron_injection && (rec.history_iron_injection === "Yes" || rec.history_iron_injection === true)) conditions.push("has a history of iron injections");
      if (rec.twin_pregnancies && (rec.twin_pregnancies === "Yes" || rec.twin_pregnancies === true)) conditions.push("has <span class='danger'>a history of twin pregnancy</span>");
      if (rec.ectopic_pregnancy && (rec.ectopic_pregnancy === "Yes" || rec.ectopic_pregnancy === true)) conditions.push("has <span class='danger'>a history of ectopic pregnancy</span>");
      if (rec.hypertension && (rec.hypertension === "Yes" || rec.hypertension === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.diabetes && (rec.diabetes === "Yes" || rec.diabetes === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.heart_diseases && (rec.heart_diseases === "Yes" || rec.heart_diseases === true)) conditions.push("has <span class='danger'>a history of heart diseases</span>");
      if (rec.thyroid_issues && (rec.thyroid_issues === "Yes" || rec.thyroid_issues === true)) conditions.push("has <span class='danger'>a history of thyroid issues</span>");
      if (rec.fundal_height && rec.fundal_height !== "0" && rec.fundal_height !== "") conditions.push(`fundal height: ${rec.fundal_height}`);
      if (rec.fetal_heart_rate && rec.fetal_heart_rate !== "0" && rec.fetal_heart_rate !== "") conditions.push(`fetal heart rate: ${rec.fetal_heart_rate}`);
      if (rec.breast_examination && rec.breast_examination !== "0" && rec.breast_examination !== "") conditions.push(`breast examination findings: ${rec.breast_examination}`);
      if (rec.twin_pregnancies && (rec.twin_pregnancies === "Yes" || rec.twin_pregnancies === true)) conditions.push("has <span class='danger'>twin pregnancies</span>");
      if (rec.any_previous_lab && (rec.any_previous_lab === "Yes" || rec.any_previous_lab === true)) conditions.push("has previous lab reports");
      if (rec.none_pregnancy && (rec.none_pregnancy === "Yes" || rec.none_pregnancy === true)) conditions.push("reports no pregnancy-related symptoms");
      if (rec.none2 && (rec.none2 === "Yes" || rec.none2 === true)) conditions.push("reports no additional pregnancy symptoms");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable pregnancy care complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const pregnancyCareRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      please_upload: rec.please_upload,
      if_yes_upload_the_report: rec.if_yes_upload_the_report,
      scanning_report: rec.scanning_report,
      tablets_pic: rec.tablets_pic
    }));

    const pregnancyCareSummaryHtml = `
      <div class="pregnancy-care-summary">
        <b>Pregnancy Care Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Pregnancy Care Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { pregnancyCareSummaryHtml, redFlagsList, pregnancyCareRecords };
  } catch (err) {
    return {
      pregnancyCareSummaryHtml: `<div class="pregnancy-care-summary" style="color:red;">
        <b>Error loading Pregnancy Care data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      pregnancyCareRecords: []
    };
  }
};


// Corrected generatePostnatalCareSummary function
const generatePostnatalCareSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'breathlessness', 'mental_issues', 'pain_breast', 'none_mother', 'postnatal_care',
      'child_feeding_is_reduced', 'child_is_drowsy', 'respiratory_rate_is_more_than__60_beats_per_minute',
      'chest_indrawing', 'abdominal_distension', 'jaundice', 'child_not_passing_urine_and_stool',
      'fever_more_than_normal', 'cough_or_cold', 'none', 'delivery_date', 'delivery_place',
      'delivery_mode', 'baby_gender', 'delivery_complication', 'after_complication',
      'no_of_birth', 'delivery_hospital', 'yes_complication', 'bleeding', 'high_fever_with_abdominal_pain',
      'breathing_difficulty', 'foul_smelling', 'any_pain_in_the_breast', 'headache', 'inability_to_feed_baby',
      'swelling_of_legs_with_pain', 'other', 'pnc_other', 'check_wugd', 'baby_birth_weight',
      'if_sick', 'where_treatment', 'no_reason', 'no_familyplanning', 'if_no_please_refer',
      'baby_condition', 'breastfeed_baby', 'pregnancy_issue', 'family_planning', 'specific_vaccination',
      'ifa_calcium', 'pain_killer', 'prescription', 'check_fddd', 'hypertension', 'heart_diseases',
      'diabetes', 'thyroid_issues', 'describe_daily_diet', 'check_qzoy', 'breast_examination',
      'abdomen_examination', 'episiotomy_assesment', 'any_previous_lab', 'please_upload'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Postnatal Care" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Postnatal Care" });
      // if (!doctypeMeta) throw new Error("Doctype 'Postnatal Care' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Postnatal Care: ${metaErr.message}`);
    }

    const args = {
      doctype: "Postnatal Care",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        postnatalCareSummaryHtml: ``,
        redFlagsList: [],
        postnatalCareRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        postnatalCareSummaryHtml: ``,
        redFlagsList: [],
        postnatalCareRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      const flags = [];
      Object.keys(postnatalCareRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          flags.push(`${postnatalCareRedFlagsInfo[field].label} - ${postnatalCareRedFlagsInfo[field].message}`);
        }
      });
      if (rec.bp && rec.bp !== "0" && rec.bp !== "") {
        const bpParts = rec.bp.split("/").map(p => parseInt(p.trim()) || 0);
        if (bpParts[0] > 140 || bpParts[1] > 90) {
          flags.push(`BP > 140/90 mmHg - Refer to Health centre/PHC/CHC.`);
        }
      }
      if (flags.length > 0) {
        redFlagsList.push({
          recordNumber: idx + 1,
          creation: rec.creation,
          flags: flags
        });
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Postnatal Care records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.breathlessness && (rec.breathlessness === "Yes" || rec.breathlessness === true)) conditions.push("has <span class='danger'>breathlessness</span>");
      if (rec.mental_issues && (rec.mental_issues === "Yes" || rec.mental_issues === true)) conditions.push("has <span class='danger'>mental health issues</span>");
      if (rec.pain_breast && (rec.pain_breast === "Yes" || rec.pain_breast === true)) conditions.push("has <span class='danger'>breast pain</span>");
      if (rec.postnatal_care && rec.postnatal_care !== "0" && rec.postnatal_care !== "") conditions.push("is under postnatal care");
      if (rec.child_feeding_is_reduced && (rec.child_feeding_is_reduced === "Yes" || rec.child_feeding_is_reduced === true)) conditions.push("reports <span class='danger'>reduced child feeding</span>");
      if (rec.child_is_drowsy && (rec.child_is_drowsy === "Yes" || rec.child_is_drowsy === true)) conditions.push("reports <span class='danger'>child drowsiness</span>");
      if (rec.respiratory_rate_is_more_than__60_beats_per_minute && (rec.respiratory_rate_is_more_than__60_beats_per_minute === "Yes" || rec.respiratory_rate_is_more_than__60_beats_per_minute === true)) conditions.push("reports <span class='danger'>child respiratory rate exceeding 60 beats per minute</span>");
      if (rec.chest_indrawing && (rec.chest_indrawing === "Yes" || rec.chest_indrawing === true)) conditions.push("reports <span class='danger'>chest indrawing in the child</span>");
      if (rec.abdominal_distension && (rec.abdominal_distension === "Yes" || rec.abdominal_distension === true)) conditions.push("reports <span class='danger'>abdominal distension in the child</span>");
      if (rec.jaundice && (rec.jaundice === "Yes" || rec.jaundice === true)) conditions.push("reports <span class='danger'>jaundice in the child</span>");
      if (rec.child_not_passing_urine_and_stool && (rec.child_not_passing_urine_and_stool === "Yes" || rec.child_not_passing_urine_and_stool === true)) conditions.push("reports <span class='danger'>child not passing urine and stool</span>");
      if (rec.fever_more_than_normal && (rec.fever_more_than_normal === "Yes" || rec.fever_more_than_normal === true)) conditions.push("reports <span class='danger'>fever in the child</span>");
      if (rec.cough_or_cold && (rec.cough_or_cold === "Yes" || rec.cough_or_cold === true)) conditions.push("reports cough or cold in the child");
      if (rec.delivery_date && rec.delivery_date !== "0" && rec.delivery_date !== "") conditions.push(`delivered on ${rec.delivery_date}`);
      if (rec.delivery_place && rec.delivery_place !== "0" && rec.delivery_place !== "") conditions.push(`delivered at ${rec.delivery_place}`);
      if (rec.delivery_mode && rec.delivery_mode !== "0" && rec.delivery_mode !== "") conditions.push(`delivery mode: ${rec.delivery_mode}`);
      if (rec.baby_gender && rec.baby_gender !== "0" && rec.baby_gender !== "") conditions.push(`baby gender: ${rec.baby_gender}`);
      if (rec.delivery_complication && (rec.delivery_complication === "Yes" || rec.delivery_complication === true)) conditions.push("had <span class='danger'>delivery complications</span>");
      if (rec.after_complication && (rec.after_complication === "Yes" || rec.after_complication === true)) conditions.push("had <span class='danger'>post-delivery complications</span>");
      if (rec.no_of_birth && rec.no_of_birth !== "0" && rec.no_of_birth !== "") conditions.push(`number of births: ${rec.no_of_birth}`);
      if (rec.delivery_hospital && rec.delivery_hospital !== "0" && rec.delivery_hospital !== "") conditions.push(`delivery hospital: ${rec.delivery_hospital}`);
      if (rec.yes_complication && rec.yes_complication !== "0" && rec.yes_complication !== "") conditions.push(`complications: ${rec.yes_complication}`);
      if (rec.bleeding && (rec.bleeding === "Yes" || rec.bleeding === true)) conditions.push("has <span class='danger'>bleeding</span>");
      if (rec.high_fever_with_abdominal_pain && (rec.high_fever_with_abdominal_pain === "Yes" || rec.high_fever_with_abdominal_pain === true)) conditions.push("has <span class='danger'>high fever with abdominal pain</span>");
      if (rec.breathing_difficulty && (rec.breathing_difficulty === "Yes" || rec.breathing_difficulty === true)) conditions.push("has <span class='danger'>breathing difficulty</span>");
      if (rec.foul_smelling && (rec.foul_smelling === "Yes" || rec.foul_smelling === true)) conditions.push("has <span class='danger'>foul-smelling discharge</span>");
      if (rec.any_pain_in_the_breast && (rec.any_pain_in_the_breast === "Yes" || rec.any_pain_in_the_breast === true)) conditions.push("has <span class='danger'>pain in the breast</span>");
      if (rec.headache && (rec.headache === "Yes" || rec.headache === true)) conditions.push("has <span class='danger'>headache</span>");
      if (rec.inability_to_feed_baby && (rec.inability_to_feed_baby === "Yes" || rec.inability_to_feed_baby === true)) conditions.push("has <span class='danger'>inability to feed the baby</span>");
      if (rec.swelling_of_legs_with_pain && (rec.swelling_of_legs_with_pain === "Yes" || rec.swelling_of_legs_with_pain === true)) conditions.push("has <span class='danger'>swelling of legs with pain</span>");
      if (rec.other && rec.other !== "0" && rec.other !== "") conditions.push(`other symptoms: ${rec.other}`);
      if (rec.pnc_other && rec.pnc_other !== "0" && rec.pnc_other !== "") conditions.push(`other postnatal care details: ${rec.pnc_other}`);
      if (rec.check_wugd && (rec.check_wugd === "Yes" || rec.check_wugd === true)) conditions.push("has additional postnatal findings");
      if (rec.baby_birth_weight && rec.baby_birth_weight !== "0" && rec.baby_birth_weight !== "") conditions.push(`baby birth weight: ${rec.baby_birth_weight}`);
      if (rec.if_sick && rec.if_sick !== "0" && rec.if_sick !== "") conditions.push(`baby sickness: ${rec.if_sick}`);
      if (rec.where_treatment && rec.where_treatment !== "0" && rec.where_treatment !== "") conditions.push(`treatment location: ${rec.where_treatment}`);
      if (rec.no_reason && rec.no_reason !== "0" && rec.no_reason !== "") conditions.push(`reason for no family planning: ${rec.no_reason}`);
      if (rec.no_familyplanning && (rec.no_familyplanning === "Yes" || rec.no_familyplanning === true)) conditions.push("does not use family planning");
      if (rec.if_no_please_refer && rec.if_no_please_refer !== "0" && rec.if_no_please_refer !== "") conditions.push(`family planning referral: ${rec.if_no_please_refer}`);
      if (rec.baby_condition && rec.baby_condition !== "0" && rec.baby_condition !== "") conditions.push(`baby condition: ${rec.baby_condition}`);
      if (rec.breastfeed_baby && (rec.breastfeed_baby === "Yes" || rec.breastfeed_baby === true)) conditions.push("breastfeeds the baby");
      if (rec.pregnancy_issue && (rec.pregnancy_issue === "Yes" || rec.pregnancy_issue === true)) conditions.push("had <span class='danger'>pregnancy issues</span>");
      if (rec.family_planning && rec.family_planning !== "0" && rec.family_planning !== "") conditions.push(`family planning method: ${rec.family_planning}`);
      if (rec.specific_vaccination && (rec.specific_vaccination === "Yes" || rec.specific_vaccination === true)) conditions.push("has specific vaccinations");
      if (rec.ifa_calcium && (rec.ifa_calcium === "Yes" || rec.ifa_calcium === true)) conditions.push("takes IFA or calcium supplements");
      if (rec.pain_killer && (rec.pain_killer === "Yes" || rec.pain_killer === true)) conditions.push("uses painkillers");
      if (rec.prescription && rec.prescription !== "0" && rec.prescription !== "") conditions.push("has uploaded a prescription");
      if (rec.check_fddd && (rec.check_fddd === "Yes" || rec.check_fddd === true)) conditions.push("has additional clinical observations");
      if (rec.hypertension && (rec.hypertension === "Yes" || rec.hypertension === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.heart_diseases && (rec.heart_diseases === "Yes" || rec.heart_diseases === true)) conditions.push("has <span class='danger'>a history of heart diseases</span>");
      if (rec.diabetes && (rec.diabetes === "Yes" || rec.diabetes === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.thyroid_issues && (rec.thyroid_issues === "Yes" || rec.thyroid_issues === true)) conditions.push("has <span class='danger'>a history of thyroid issues</span>");
      if (rec.describe_daily_diet && rec.describe_daily_diet !== "0" && rec.describe_daily_diet !== "") conditions.push(`daily diet: ${rec.describe_daily_diet}`);
      if (rec.check_qzoy && (rec.check_qzoy === "Yes" || rec.check_qzoy === true)) conditions.push("has additional postnatal observations");
      if (rec.breast_examination && rec.breast_examination !== "0" && rec.breast_examination !== "") conditions.push(`breast examination findings: ${rec.breast_examination}`);
      if (rec.abdomen_examination && rec.abdomen_examination !== "0" && rec.abdomen_examination !== "") conditions.push(`abdomen examination findings: ${rec.abdomen_examination}`);
      if (rec.episiotomy_assesment && rec.episiotomy_assesment !== "0" && rec.episiotomy_assesment !== "") conditions.push(`episiotomy assessment findings: ${rec.episiotomy_assesment}`);
      if (rec.any_previous_lab && (rec.any_previous_lab === "Yes" || rec.any_previous_lab === true)) conditions.push("has previous lab reports");
      if (rec.please_upload && rec.please_upload !== "0" && rec.please_upload !== "") conditions.push("has uploaded a lab report");
      if (rec.none_mother && (rec.none_mother === "Yes" || rec.none_mother === true)) conditions.push("reports no maternal symptoms");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable postnatal care complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const postnatalCareRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      please_upload: rec.please_upload,
      prescription: rec.prescription
    }));

    const postnatalCareSummaryHtml = `
      <div class="postnatal-care-summary">
        <b sixe=4>Postnatal Care Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Postnatal Care Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { postnatalCareSummaryHtml, redFlagsList, postnatalCareRecords };
  } catch (err) {
    return {
      postnatalCareSummaryHtml: `<div class="postnatal-care-summary" style="color:red;">
        <b>Error loading Postnatal Care data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      postnatalCareRecords: []
    };
  }
};


// Corrected generateJaundiceSummary function
const generateJaundiceSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'severe_abdominal_pain_or_tenderness', 'patient_is_confusedagitated_or_drowsy',
      'high_fever', 'vomiting_blood', 'blood_in_stool_or_black_stoolnot_passing_urine', 'any_painful_lymphnode',
      'none', 'jaundice', 'abdominal', 'child_is_confusedagitated_or_drowsy', 'fever_jaundice',
      'excessive_vomiting', 'not_passing_urine', 'none_jaundice', 'check_iepj', 'do_you_have_jaundice',
      'onset', 'onset_copyhave_you_eaten_outside_recently', 'have_you_travelled_recently', 'since_when',
      'check_uheh', 'any_fever', 'any_chills', 'do_you_have_itchy_skin', 'have_you_lost_weight',
      'any_abdominal_bloting', 'any_abdominal_pain', 'if_yes', 'does_the_pain_radiated_to_the_right_shoulder',
      'any_swelling_of_legs', 'urine_output_reduced', 'reduced_appetite', 'nausea_vomiting',
      'what_is_the_color_of_urine', 'what_is_the_color_of_the_stool', 'check_rkwa',
      'any_history_of_hypertension', 'any_history_of_heart_diseases', 'any_history_of_diabetes',
      'any_history_of_thyroid_issues', 'any_past_history_of_blood_transfusion', 'any_surgeries_in_the_past',
      'are_you_on_tb_drugs_now', 'diagnosed_with_liver_problem', 'check_rcsw',
      'how_many_years_have_been_drinking', 'how_often_do_you_drink', 'do_you_have_tatoos_on_your_body',
      'check_ylws', 'any_family_history_of_jaundice', 'check_rvmy', 'skin_changes_in_on_the_abdomen',
      'look_for_hepatic_flap_and_tremor', 'abdominal_examination', 'check_wkjy', 'previous_lab_reports',
      'if_yes_please_upload'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Jaundice" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Jaundice' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Jaundice: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Jaundice",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        jaundiceSummaryHtml: ``,
        redFlagsList: [],
        jaundiceRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        jaundiceSummaryHtml: ``,
        redFlagsList: [],
        jaundiceRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(jaundiceRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${jaundiceRedFlagsInfo[field].label} - ${jaundiceRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Jaundice records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.severe_abdominal_pain_or_tenderness && (rec.severe_abdominal_pain_or_tenderness === "Yes" || rec.severe_abdominal_pain_or_tenderness === true)) conditions.push("has <span class='danger'>severe abdominal pain or tenderness</span>");
      if (rec.patient_is_confusedagitated_or_drowsy && (rec.patient_is_confusedagitated_or_drowsy === "Yes" || rec.patient_is_confusedagitated_or_drowsy === true)) conditions.push("is <span class='danger'>confused, agitated, or drowsy</span>");
      if (rec.high_fever && (rec.high_fever === "Yes" || rec.high_fever === true)) conditions.push("has <span class='danger'>high fever</span>");
      if (rec.vomiting_blood && (rec.vomiting_blood === "Yes" || rec.vomiting_blood === true)) conditions.push("has <span class='danger'>vomiting blood</span>");
      if (rec.blood_in_stool_or_black_stoolnot_passing_urine && (rec.blood_in_stool_or_black_stoolnot_passing_urine === "Yes" || rec.blood_in_stool_or_black_stoolnot_passing_urine === true)) conditions.push("has <span class='danger'>blood in stool, black stool, or not passing urine</span>");
      if (rec.any_painful_lymphnode && (rec.any_painful_lymphnode === "Yes" || rec.any_painful_lymphnode === true)) conditions.push("has <span class='danger'>painful lymph nodes</span>");
      if (rec.abdominal && (rec.abdominal === "Yes" || rec.abdominal === true)) conditions.push("has <span class='danger'>abdominal symptoms</span>");
      if (rec.fever_jaundice && (rec.fever_jaundice === "Yes" || rec.fever_jaundice === true)) conditions.push("has <span class='danger'>fever with jaundice</span>");
      if (rec.excessive_vomiting && (rec.excessive_vomiting === "Yes" || rec.excessive_vomiting === true)) conditions.push("has <span class='danger'>excessive vomiting</span>");
      if (rec.not_passing_urine && (rec.not_passing_urine === "Yes" || rec.not_passing_urine === true)) conditions.push("has <span class='danger'>not passing urine</span>");
      if (rec.do_you_have_jaundice && (rec.do_you_have_jaundice === "Yes" || rec.do_you_have_jaundice === true)) conditions.push("has <span class='danger'>jaundice symptoms</span>");
      if (rec.onset && rec.onset !== "0") conditions.push(`jaundice onset: ${rec.onset}`);
      if (rec.onset_copyhave_you_eaten_outside_recently && (rec.onset_copyhave_you_eaten_outside_recently === "Yes" || rec.onset_copyhave_you_eaten_outside_recently === true)) conditions.push("has eaten outside recently");
      if (rec.have_you_travelled_recently && (rec.have_you_travelled_recently === "Yes" || rec.have_you_travelled_recently === true)) conditions.push("has traveled recently");
      if (rec.since_when && rec.since_when !== "0") conditions.push(`symptoms since: ${rec.since_when}`);
      if (rec.check_iepj && (rec.check_iepj === "Yes" || rec.check_iepj === true)) conditions.push("has additional jaundice findings");
      if (rec.any_fever && (rec.any_fever === "Yes" || rec.any_fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.any_chills && (rec.any_chills === "Yes" || rec.any_chills === true)) conditions.push("has <span class='danger'>chills</span>");
      if (rec.do_you_have_itchy_skin && (rec.do_you_have_itchy_skin === "Yes" || rec.do_you_have_itchy_skin === true)) conditions.push("has <span class='danger'>itchy skin</span>");
      if (rec.have_you_lost_weight && (rec.have_you_lost_weight === "Yes" || rec.have_you_lost_weight === true)) conditions.push("has <span class='danger'>lost weight</span>");
      if (rec.any_abdominal_bloting && (rec.any_abdominal_bloting === "Yes" || rec.any_abdominal_bloting === true)) conditions.push("has <span class='danger'>abdominal bloating</span>");
      if (rec.any_abdominal_pain && (rec.any_abdominal_pain === "Yes" || rec.any_abdominal_pain === true)) conditions.push("has <span class='danger'>abdominal pain</span>");
      if (rec.if_yes && rec.if_yes !== "0") conditions.push(`abdominal pain details: ${rec.if_yes}`);
      if (rec.does_the_pain_radiated_to_the_right_shoulder && (rec.does_the_pain_radiated_to_the_right_shoulder === "Yes" || rec.does_the_pain_radiated_to_the_right_shoulder === true)) conditions.push("has <span class='danger'>pain radiating to the right shoulder</span>");
      if (rec.any_swelling_of_legs && (rec.any_swelling_of_legs === "Yes" || rec.any_swelling_of_legs === true)) conditions.push("has <span class='danger'>swelling of legs</span>");
      if (rec.urine_output_reduced && (rec.urine_output_reduced === "Yes" || rec.urine_output_reduced === true)) conditions.push("has <span class='danger'>reduced urine output</span>");
      if (rec.reduced_appetite && (rec.reduced_appetite === "Yes" || rec.reduced_appetite === true)) conditions.push("has <span class='danger'>reduced appetite</span>");
      if (rec.nausea_vomiting && (rec.nausea_vomiting === "Yes" || rec.nausea_vomiting === true)) conditions.push("has <span class='danger'>nausea or vomiting</span>");
      if (rec.what_is_the_color_of_urine && rec.what_is_the_color_of_urine !== "0") conditions.push(`urine color: ${rec.what_is_the_color_of_urine}`);
      if (rec.what_is_the_color_of_the_stool && rec.what_is_the_color_of_the_stool !== "0") conditions.push(`stool color: ${rec.what_is_the_color_of_the_stool}`);
      if (rec.check_rkwa && (rec.check_rkwa === "Yes" || rec.check_rkwa === true)) conditions.push("has additional clinical findings");
      if (rec.any_history_of_hypertension && (rec.any_history_of_hypertension === "Yes" || rec.any_history_of_hypertension === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.any_history_of_heart_diseases && (rec.any_history_of_heart_diseases === "Yes" || rec.any_history_of_heart_diseases === true)) conditions.push("has <span class='danger'>a history of heart diseases</span>");
      if (rec.any_history_of_diabetes && (rec.any_history_of_diabetes === "Yes" || rec.any_history_of_diabetes === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.any_history_of_thyroid_issues && (rec.any_history_of_thyroid_issues === "Yes" || rec.any_history_of_thyroid_issues === true)) conditions.push("has <span class='danger'>a history of thyroid issues</span>");
      if (rec.any_past_history_of_blood_transfusion && (rec.any_past_history_of_blood_transfusion === "Yes" || rec.any_past_history_of_blood_transfusion === true)) conditions.push("has <span class='danger'>a history of blood transfusion</span>");
      if (rec.any_surgeries_in_the_past && (rec.any_surgeries_in_the_past === "Yes" || rec.any_surgeries_in_the_past === true)) conditions.push("has <span class='danger'>a history of past surgeries</span>");
      if (rec.are_you_on_tb_drugs_now && (rec.are_you_on_tb_drugs_now === "Yes" || rec.are_you_on_tb_drugs_now === true)) conditions.push("is <span class='danger'>currently on TB drugs</span>");
      if (rec.diagnosed_with_liver_problem && (rec.diagnosed_with_liver_problem === "Yes" || rec.diagnosed_with_liver_problem === true)) conditions.push("has <span class='danger'>a diagnosed liver problem</span>");
      if (rec.check_rcsw && (rec.check_rcsw === "Yes" || rec.check_rcsw === true)) conditions.push("has additional medical history findings");
      if (rec.how_many_years_have_been_drinking && rec.how_many_years_have_been_drinking !== "0") conditions.push(`has been drinking for ${rec.how_many_years_have_been_drinking} years`);
      if (rec.how_often_do_you_drink && rec.how_often_do_you_drink !== "0") conditions.push(`drinks alcohol ${rec.how_often_do_you_drink}`);
      if (rec.do_you_have_tatoos_on_your_body && (rec.do_you_have_tatoos_on_your_body === "Yes" || rec.do_you_have_tatoos_on_your_body === true)) conditions.push("has tattoos on the body");
      if (rec.check_ylws && (rec.check_ylws === "Yes" || rec.check_ylws === true)) conditions.push("has additional jaundice-related observations");
      if (rec.any_family_history_of_jaundice && (rec.any_family_history_of_jaundice === "Yes" || rec.any_family_history_of_jaundice === true)) conditions.push("has <span class='danger'>a family history of jaundice</span>");
      if (rec.check_rvmy && (rec.check_rvmy === "Yes" || rec.check_rvmy === true)) conditions.push("has additional clinical observations");
      if (rec.skin_changes_in_on_the_abdomen && rec.skin_changes_in_on_the_abdomen !== "0") conditions.push(`skin changes on abdomen: ${rec.skin_changes_in_on_the_abdomen}`);
      if (rec.look_for_hepatic_flap_and_tremor && rec.look_for_hepatic_flap_and_tremor !== "0") conditions.push(`hepatic flap or tremor: ${rec.look_for_hepatic_flap_and_tremor}`);
      if (rec.abdominal_examination && rec.abdominal_examination !== "0") conditions.push(`abdominal examination findings: ${rec.abdominal_examination}`);
      if (rec.check_wkjy && (rec.check_wkjy === "Yes" || rec.check_wkjy === true)) conditions.push("has additional examination findings");
      if (rec.previous_lab_reports && (rec.previous_lab_reports === "Yes" || rec.previous_lab_reports === true)) conditions.push("has previous lab reports");
      if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.none_jaundice && (rec.none_jaundice === "Yes" || rec.none_jaundice === true)) conditions.push("reports no jaundice-specific symptoms");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable jaundice complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const jaundiceRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      if_yes_please_upload: rec.if_yes_please_upload
    }));

    const jaundiceSummaryHtml = `
      <div class="jaundice-summary">
        <b>Jaundice Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Jaundice Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { jaundiceSummaryHtml, redFlagsList, jaundiceRecords };
  } catch (err) {
    return {
      jaundiceSummaryHtml: `<div class="jaundice-summary" style="color:red;">
        <b>Error loading Jaundice data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      jaundiceRecords: []
    };
  }
};


// Corrected generateThyroidProblemSummary function
const generateThyroidProblemSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'based_on_labreport', 'none', 'thyroid_problem', 'check_pwoq', 'do_you_have',
      'lost_weight', 'sweat_alot', 'experience_tremor', 'easily_irritated',
      'regular_work', 'poor_appetite', 'history_of_palpitation', 'excessively_cold',
      'hair_loss', 'voice_hoarse', 'concentrate_dailywork', 'regular_menstrual_cycle',
      'menstrual_yes', 'sleep_pattern', 'sleep_yes', 'check_uhyw',
      'thyroid_hypertension', 'thyroid_diabetes', 'heart_diseases', 'thyroid_issues',
      'thyroid_surgery', 'thyroid_pregnancy', 'thyroid_none', 'skin_texture',
      'generalized_edema', 'eye_examination', 'neck_swelling', 'any_previous_lab',
      'please_upload'
    ];
    let validFields = [...allFields];
    try {
      // Placeholder: Fetch doctype metadata (e.g., getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Thyroid Problem" }))
      // const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Thyroid Problem" });
      // if (!doctypeMeta) throw new Error("Doctype 'Thyroid Problem' does not exist");
      // const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
      // validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    } catch (metaErr) {
      console.warn(`Could not validate fields for Thyroid Problem: ${metaErr.message}`);
    }

    const args = {
      doctype: "Thyroid Problem",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        thyroidProblemSummaryHtml: ``,
        redFlagsList: [],
        thyroidProblemRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        thyroidProblemSummaryHtml: ``,
        redFlagsList: [],
        thyroidProblemRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      const flags = [];
      Object.keys(thyroidProblemRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          flags.push(`${thyroidProblemRedFlagsInfo[field].label} - ${thyroidProblemRedFlagsInfo[field].message}`);
        }
      });
      if (flags.length > 0) {
        redFlagsList.push({
          recordNumber: idx + 1,
          creation: rec.creation,
          flags: flags
        });
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(item => `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Thyroid Problem records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.based_on_labreport && (rec.based_on_labreport === "Yes" || rec.based_on_labreport === true)) conditions.push("thyroid diagnosis based on lab report");
      if (rec.thyroid_problem && (rec.thyroid_problem === "Yes" || rec.thyroid_problem === true)) conditions.push("is diagnosed with a <span class='danger'>thyroid problem</span>");
      if (rec.check_pwoq && (rec.check_pwoq === "Yes" || rec.check_pwoq === true)) conditions.push("has additional thyroid findings");
      if (rec.do_you_have && rec.do_you_have !== "0" && rec.do_you_have !== "") conditions.push(`thyroid symptoms: ${rec.do_you_have}`);
      if (rec.lost_weight && (rec.lost_weight === "Yes" || rec.lost_weight === true)) conditions.push("has <span class='danger'>lost weight</span>");
      if (rec.sweat_alot && (rec.sweat_alot === "Yes" || rec.sweat_alot === true)) conditions.push("has <span class='danger'>excessive sweating</span>");
      if (rec.experience_tremor && (rec.experience_tremor === "Yes" || rec.experience_tremor === true)) conditions.push("has <span class='danger'>tremors</span>");
      if (rec.easily_irritated && (rec.easily_irritated === "Yes" || rec.easily_irritated === true)) conditions.push("is <span class='danger'>easily irritated</span>");
      if (rec.regular_work && rec.regular_work !== "0" && rec.regular_work !== "") conditions.push(`regular work: ${rec.regular_work}`);
      if (rec.poor_appetite && (rec.poor_appetite === "Yes" || rec.poor_appetite === true)) conditions.push("has <span class='danger'>poor appetite</span>");
      if (rec.history_of_palpitation && (rec.history_of_palpitation === "Yes" || rec.history_of_palpitation === true)) conditions.push("has <span class='danger'>a history of palpitations</span>");
      if (rec.excessively_cold && (rec.excessively_cold === "Yes" || rec.excessively_cold === true)) conditions.push("feels <span class='danger'>excessively cold</span>");
      if (rec.hair_loss && (rec.hair_loss === "Yes" || rec.hair_loss === true)) conditions.push("has <span class='danger'>hair loss</span>");
      if (rec.voice_hoarse && (rec.voice_hoarse === "Yes" || rec.voice_hoarse === true)) conditions.push("has <span class='danger'>hoarse voice</span>");
      if (rec.concentrate_dailywork && (rec.concentrate_dailywork === "Yes" || rec.concentrate_dailywork === true)) conditions.push("has <span class='danger'>difficulty concentrating on daily work</span>");
      if (rec.regular_menstrual_cycle && (rec.regular_menstrual_cycle === "No" || rec.regular_menstrual_cycle === false)) conditions.push("has <span class='danger'>irregular menstrual cycle</span>");
      if (rec.menstrual_yes && rec.menstrual_yes !== "0" && rec.menstrual_yes !== "") conditions.push(`menstrual cycle details: ${rec.menstrual_yes}`);
      if (rec.sleep_pattern && (rec.sleep_pattern === "No" || rec.sleep_pattern === false)) conditions.push("has <span class='danger'>irregular sleep pattern</span>");
      if (rec.sleep_yes && rec.sleep_yes !== "0" && rec.sleep_yes !== "") conditions.push(`sleep pattern details: ${rec.sleep_yes}`);
      if (rec.check_uhyw && (rec.check_uhyw === "Yes" || rec.check_uhyw === true)) conditions.push("has additional clinical observations");
      if (rec.thyroid_hypertension && (rec.thyroid_hypertension === "Yes" || rec.thyroid_hypertension === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.thyroid_diabetes && (rec.thyroid_diabetes === "Yes" || rec.thyroid_diabetes === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.heart_diseases && (rec.heart_diseases === "Yes" || rec.heart_diseases === true)) conditions.push("has <span class='danger'>a history of heart diseases</span>");
      if (rec.thyroid_issues && (rec.thyroid_issues === "Yes" || rec.thyroid_issues === true)) conditions.push("has <span class='danger'>a history of thyroid issues</span>");
      if (rec.thyroid_surgery && (rec.thyroid_surgery === "Yes" || rec.thyroid_surgery === true)) conditions.push("has <span class='danger'>undergone thyroid surgery</span>");
      if (rec.thyroid_pregnancy && (rec.thyroid_pregnancy === "Yes" || rec.thyroid_pregnancy === true)) conditions.push("has <span class='danger'>thyroid issues related to pregnancy</span>");
      if (rec.thyroid_none && (rec.thyroid_none === "Yes" || rec.thyroid_none === true)) conditions.push("reports no thyroid-specific symptoms");
      if (rec.skin_texture && rec.skin_texture !== "0" && rec.skin_texture !== "") conditions.push(`skin texture: ${rec.skin_texture}`);
      if (rec.generalized_edema && (rec.generalized_edema === "Yes" || rec.generalized_edema === true)) conditions.push("has <span class='danger'>generalized edema</span>");
      if (rec.eye_examination && rec.eye_examination !== "0" && rec.eye_examination !== "") conditions.push(`eye examination findings: ${rec.eye_examination}`);
      if (rec.neck_swelling && (rec.neck_swelling === "Yes" || rec.neck_swelling === true)) conditions.push("has <span class='danger'>neck swelling</span>");
      if (rec.any_previous_lab && (rec.any_previous_lab === "Yes" || rec.any_previous_lab === true)) conditions.push("has previous lab reports");
      if (rec.please_upload && rec.please_upload !== "0" && rec.please_upload !== "") conditions.push("has uploaded a lab report");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable thyroid complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const thyroidProblemRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      please_upload: rec.please_upload
    }));

    const thyroidProblemSummaryHtml = `
      <div class="thyroid-problem-summary">
        <b>Thyroid Problem Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Thyroid Problem Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { thyroidProblemSummaryHtml, redFlagsList, thyroidProblemRecords };
  } catch (err) {
    return {
      thyroidProblemSummaryHtml: `<div class="thyroid-problem-summary" style="color:red;">
        <b>Error loading Thyroid Problem data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      thyroidProblemRecords: []
    };
  }
};


// Corrected generateSkinProblemSummary function
const generateSkinProblemSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'any_painful_skin_rash_with_blisters_or_open_sores', 'any_yellow_or_bloody_discharge',
      'any_rash_which_is_extensive_on_the_body', 'sudden_oset', 'none_skin', 'skin_problem',
      'check_cbvu', 'itchy_skin', 'skin_rash', 'bullae', 'skin_burn', 'bumps', 'not_applicable',
      'skin_other', 'skin_otherdescibe', 'face', 'scalp', 'hands', 'feet', 'palms', 'groin_region',
      'legs', 'skin_creases', 'trunk', 'no_lesions', 'lesion_symptoms', 'get_worse', 'same_problem',
      'hair_colors', 'any_associated_symptoms', 'discharge_from_the_lesion', 'pain_in_the_lesions',
      'itching_in_the_lesions', 'skin_fever', 'runny_nose', 'wheezing', 'any_joint_pain',
      'dandruff_issue', 'other_skin', 'none', 'describe_skinother', 'hypertension_history',
      'any_heart_diseases', 'any_diabetes', 'any_thyroid', 'any_asthma', 'any_skin_lesions',
      'repeated_sneezing', 'check_hgfb', 'chemical_exposure', 'family_skin_allergy',
      'family_asthma_history', 'lesion_present', 'lesion_photo', 'any_previous_lab', 'please_upload'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Skin Problem" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Skin Problem' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Skin Problem: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Skin Problem",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        skinProblemSummaryHtml: ``,
        redFlagsList: [],
        skinProblemRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        skinProblemSummaryHtml: ``,
        redFlagsList: [],
        skinProblemRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(skinProblemRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${skinProblemRedFlagsInfo[field].label} - ${skinProblemRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Skin Problem records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.any_painful_skin_rash_with_blisters_or_open_sores && (rec.any_painful_skin_rash_with_blisters_or_open_sores === "Yes" || rec.any_painful_skin_rash_with_blisters_or_open_sores === true)) conditions.push("has <span class='danger'>painful skin rash with blisters or open sores</span>");
      if (rec.any_yellow_or_bloody_discharge && (rec.any_yellow_or_bloody_discharge === "Yes" || rec.any_yellow_or_bloody_discharge === true)) conditions.push("has <span class='danger'>yellow or bloody discharge</span>");
      if (rec.any_rash_which_is_extensive_on_the_body && (rec.any_rash_which_is_extensive_on_the_body === "Yes" || rec.any_rash_which_is_extensive_on_the_body === true)) conditions.push("has <span class='danger'>extensive body rash</span>");
      if (rec.sudden_oset && (rec.sudden_oset === "Yes" || rec.sudden_oset === true)) conditions.push("has <span class='danger'>sudden onset of skin symptoms</span>");
      if (rec.skin_problem && (rec.skin_problem === "Yes" || rec.skin_problem === true)) conditions.push("has a <span class='danger'>skin problem</span>");
      if (rec.check_cbvu && (rec.check_cbvu === "Yes" || rec.check_cbvu === true)) conditions.push("has additional skin findings");
      if (rec.itchy_skin && (rec.itchy_skin === "Yes" || rec.itchy_skin === true)) conditions.push("has <span class='danger'>itchy skin</span>");
      if (rec.skin_rash && (rec.skin_rash === "Yes" || rec.skin_rash === true)) conditions.push("has <span class='danger'>skin rash</span>");
      if (rec.bullae && (rec.bullae === "Yes" || rec.bullae === true)) conditions.push("has <span class='danger'>bullae</span>");
      if (rec.skin_burn && (rec.skin_burn === "Yes" || rec.skin_burn === true)) conditions.push("has <span class='danger'>skin burn</span>");
      if (rec.bumps && (rec.bumps === "Yes" || rec.bumps === true)) conditions.push("has <span class='danger'>bumps on the skin</span>");
      if (rec.not_applicable && (rec.not_applicable === "Yes" || rec.not_applicable === true)) conditions.push("reports no applicable skin symptoms");
      if (rec.skin_other && (rec.skin_other === "Yes" || rec.skin_other === true)) conditions.push("has other skin issues");
      if (rec.skin_otherdescibe && rec.skin_otherdescibe !== "0") conditions.push(`other skin issues: ${rec.skin_otherdescibe}`);
      if (rec.face && (rec.face === "Yes" || rec.face === true)) conditions.push("has skin issues on the face");
      if (rec.scalp && (rec.scalp === "Yes" || rec.scalp === true)) conditions.push("has skin issues on the scalp");
      if (rec.hands && (rec.hands === "Yes" || rec.hands === true)) conditions.push("has skin issues on the hands");
      if (rec.feet && (rec.feet === "Yes" || rec.feet === true)) conditions.push("has skin issues on the feet");
      if (rec.palms && (rec.palms === "Yes" || rec.palms === true)) conditions.push("has skin issues on the palms");
      if (rec.groin_region && (rec.groin_region === "Yes" || rec.groin_region === true)) conditions.push("has skin issues in the groin region");
      if (rec.legs && (rec.legs === "Yes" || rec.legs === true)) conditions.push("has skin issues on the legs");
      if (rec.skin_creases && (rec.skin_creases === "Yes" || rec.skin_creases === true)) conditions.push("has skin issues in skin creases");
      if (rec.trunk && (rec.trunk === "Yes" || rec.trunk === true)) conditions.push("has skin issues on the trunk");
      if (rec.no_lesions && rec.no_lesions !== "0") conditions.push(`number of lesions: ${rec.no_lesions}`);
      if (rec.lesion_symptoms && rec.lesion_symptoms !== "0") conditions.push(`lesion symptoms: ${rec.lesion_symptoms}`);
      if (rec.get_worse && rec.get_worse !== "0") conditions.push(`skin condition worsens with: ${rec.get_worse}`);
      if (rec.same_problem && (rec.same_problem === "Yes" || rec.same_problem === true)) conditions.push("has experienced the same skin problem before");
      if (rec.hair_colors && rec.hair_colors !== "0") conditions.push(`hair color changes: ${rec.hair_colors}`);
      if (rec.any_associated_symptoms && (rec.any_associated_symptoms === "Yes" || rec.any_associated_symptoms === true)) conditions.push("has associated symptoms");
      if (rec.discharge_from_the_lesion && (rec.discharge_from_the_lesion === "Yes" || rec.discharge_from_the_lesion === true)) conditions.push("has <span class='danger'>discharge from the lesion</span>");
      if (rec.pain_in_the_lesions && (rec.pain_in_the_lesions === "Yes" || rec.pain_in_the_lesions === true)) conditions.push("has <span class='danger'>pain in the lesions</span>");
      if (rec.itching_in_the_lesions && (rec.itching_in_the_lesions === "Yes" || rec.itching_in_the_lesions === true)) conditions.push("has <span class='danger'>itching in the lesions</span>");
      if (rec.skin_fever && (rec.skin_fever === "Yes" || rec.skin_fever === true)) conditions.push("has <span class='danger'>fever related to skin condition</span>");
      if (rec.runny_nose && (rec.runny_nose === "Yes" || rec.runny_nose === true)) conditions.push("has <span class='danger'>runny nose</span>");
      if (rec.wheezing && (rec.wheezing === "Yes" || rec.wheezing === true)) conditions.push("has <span class='danger'>wheezing</span>");
      if (rec.any_joint_pain && (rec.any_joint_pain === "Yes" || rec.any_joint_pain === true)) conditions.push("has <span class='danger'>joint pain</span>");
      if (rec.dandruff_issue && (rec.dandruff_issue === "Yes" || rec.dandruff_issue === true)) conditions.push("has <span class='danger'>dandruff issues</span>");
      if (rec.other_skin && (rec.other_skin === "Yes" || rec.other_skin === true)) conditions.push("has other skin symptoms");
      if (rec.describe_skinother && rec.describe_skinother !== "0") conditions.push(`other skin symptoms: ${rec.describe_skinother}`);
      if (rec.hypertension_history && (rec.hypertension_history === "Yes" || rec.hypertension_history === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.any_heart_diseases && (rec.any_heart_diseases === "Yes" || rec.any_heart_diseases === true)) conditions.push("has <span class='danger'>a history of heart diseases</span>");
      if (rec.any_diabetes && (rec.any_diabetes === "Yes" || rec.any_diabetes === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.any_thyroid && (rec.any_thyroid === "Yes" || rec.any_thyroid === true)) conditions.push("has <span class='danger'>a history of thyroid issues</span>");
      if (rec.any_asthma && (rec.any_asthma === "Yes" || rec.any_asthma === true)) conditions.push("has <span class='danger'>a history of asthma</span>");
      if (rec.any_skin_lesions && (rec.any_skin_lesions === "Yes" || rec.any_skin_lesions === true)) conditions.push("has <span class='danger'>a history of skin lesions</span>");
      if (rec.repeated_sneezing && (rec.repeated_sneezing === "Yes" || rec.repeated_sneezing === true)) conditions.push("has <span class='danger'>repeated sneezing</span>");
      if (rec.check_hgfb && (rec.check_hgfb === "Yes" || rec.check_hgfb === true)) conditions.push("has additional clinical findings");
      if (rec.chemical_exposure && (rec.chemical_exposure === "Yes" || rec.chemical_exposure === true)) conditions.push("has <span class='danger'>chemical exposure</span>");
      if (rec.family_skin_allergy && (rec.family_skin_allergy === "Yes" || rec.family_skin_allergy === true)) conditions.push("has <span class='danger'>a family history of skin allergies</span>");
      if (rec.family_asthma_history && (rec.family_asthma_history === "Yes" || rec.family_asthma_history === true)) conditions.push("has <span class='danger'>a family history of asthma</span>");
      if (rec.lesion_present && (rec.lesion_present === "Yes" || rec.lesion_present === true)) conditions.push("has lesions present");
      if (rec.lesion_photo && rec.lesion_photo !== "0") conditions.push("has uploaded a lesion photo");
      if (rec.any_previous_lab && (rec.any_previous_lab === "Yes" || rec.any_previous_lab === true)) conditions.push("has previous lab reports");
      if (rec.please_upload && rec.please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.none_skin && (rec.none_skin === "Yes" || rec.none_skin === true)) conditions.push("reports no skin-specific symptoms");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable skin problem complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const skinProblemRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      please_upload: rec.please_upload,
      lesion_photo: rec.lesion_photo
    }));

    const skinProblemSummaryHtml = `
      <div class="skin-problem-summary">
        <b>Skin Problem Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Skin Problem Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { skinProblemSummaryHtml, redFlagsList, skinProblemRecords };
  } catch (err) {
    return {
      skinProblemSummaryHtml: `<div class="skin-problem-summary" style="color:red;">
        <b>Error loading Skin Problem data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      skinProblemRecords: []
    };
  }
};


// Corrected generateLymphNodeEnlargementSummary function
const generateLymphNodeEnlargementSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const doctypeCandidates = ["Lymph node Enlargement", "Lymph Node Enlargement", "Lymph Node"];
    let doctype = doctypeCandidates[0]; // Default to LymphNodeEnlargement

    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'any_painful_lymphnode', 'none_lymph', 'lymph_node_enlargement',
      'check_baks', 'neck', 'axilla', 'chect', 'groin', 'is_it', 'how_start', 'pain_lump', 'since_noticed',
      'check_fdcu', 'any_fever', 'any_cough', 'sputum', 'any_sore_throat', 'any_loose_stools', 'any_joint_pain',
      'animal_bite', 'limb_injury', 'if_yes_please_describe', 'check_rkua', 'bp_history', 'heart_diseases',
      'diabetes_history', 'thyroid_issues', 'similar_lump', 'breast_lumps', 'diagnosed_tb', 'cancer_treatment',
      'check_lyvk', 'lymph_node', 'any_previous_lab', 'please_upload'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: doctype });
    //   if (!doctypeMeta) throw new Error(`Doctype '${doctype}' does not exist`);
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for ${doctype}: ${metaErr.message}`);
    // }

    const args = {
      doctype: doctype,
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        lymphNodeEnlargementSummaryHtml: ``,
        redFlagsList: [],
        lymphNodeEnlargementRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        lymphNodeEnlargementSummaryHtml: ``,
        redFlagsList: [],
        lymphNodeEnlargementRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(lymphNodeEnlargementRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${lymphNodeEnlargementRedFlagsInfo[field].label} - ${lymphNodeEnlargementRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Lymph Node Enlargement records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.any_painful_lymphnode && (rec.any_painful_lymphnode === "Yes" || rec.any_painful_lymphnode === true)) conditions.push("has <span class='danger'>painful lymph nodes</span>");
      if (rec.lymph_node_enlargement && (rec.lymph_node_enlargement === "Yes" || rec.lymph_node_enlargement === true)) conditions.push("has <span class='danger'>lymph node enlargement</span>");
      if (rec.check_baks && (rec.check_baks === "Yes" || rec.check_baks === true)) conditions.push("has additional lymph node findings");
      if (rec.neck && (rec.neck === "Yes" || rec.neck === true)) conditions.push("has a <span class='danger'>lump in the neck</span>");
      if (rec.axilla && (rec.axilla === "Yes" || rec.axilla === true)) conditions.push("has a <span class='danger'>lump in the axilla</span>");
      if (rec.chect && (rec.chect === "Yes" || rec.chect === true)) conditions.push("has a <span class='danger'>lump in the chest</span>");
      if (rec.groin && (rec.groin === "Yes" || rec.groin === true)) conditions.push("has a <span class='danger'>lump in the groin</span>");
      if (rec.is_it && rec.is_it !== "0") conditions.push(`lump description: ${rec.is_it}`);
      if (rec.how_start && rec.how_start !== "0") conditions.push(`lump onset: ${rec.how_start}`);
      if (rec.pain_lump && (rec.pain_lump === "Yes" || rec.pain_lump === true)) conditions.push("has <span class='danger'>painful lump</span>");
      if (rec.since_noticed && rec.since_noticed !== "0") conditions.push(`noticed lump since: ${rec.since_noticed}`);
      if (rec.check_fdcu && (rec.check_fdcu === "Yes" || rec.check_fdcu === true)) conditions.push("has additional clinical observations");
      if (rec.any_fever && (rec.any_fever === "Yes" || rec.any_fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.any_cough && (rec.any_cough === "Yes" || rec.any_cough === true)) conditions.push("has <span class='danger'>cough</span>");
      if (rec.sputum && (rec.sputum === "Yes" || rec.sputum === true)) conditions.push("has <span class='danger'>sputum</span>");
      if (rec.any_sore_throat && (rec.any_sore_throat === "Yes" || rec.any_sore_throat === true)) conditions.push("has <span class='danger'>sore throat</span>");
      if (rec.any_loose_stools && (rec.any_loose_stools === "Yes" || rec.any_loose_stools === true)) conditions.push("has <span class='danger'>loose stools</span>");
      if (rec.any_joint_pain && (rec.any_joint_pain === "Yes" || rec.any_joint_pain === true)) conditions.push("has <span class='danger'>joint pain</span>");
      if (rec.animal_bite && (rec.animal_bite === "Yes" || rec.animal_bite === true)) conditions.push("has <span class='danger'>history of animal bite</span>");
      if (rec.limb_injury && (rec.limb_injury === "Yes" || rec.limb_injury === true)) conditions.push("has <span class='danger'>limb injury</span>");
      if (rec.if_yes_please_describe && rec.if_yes_please_describe !== "0") conditions.push(`associated symptoms: ${rec.if_yes_please_describe}`);
      if (rec.check_rkua && (rec.check_rkua === "Yes" || rec.check_rkua === true)) conditions.push("has additional medical history findings");
      if (rec.bp_history && (rec.bp_history === "Yes" || rec.bp_history === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.heart_diseases && (rec.heart_diseases === "Yes" || rec.heart_diseases === true)) conditions.push("has <span class='danger'>a history of heart diseases</span>");
      if (rec.diabetes_history && (rec.diabetes_history === "Yes" || rec.diabetes_history === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.thyroid_issues && (rec.thyroid_issues === "Yes" || rec.thyroid_issues === true)) conditions.push("has <span class='danger'>a history of thyroid issues</span>");
      if (rec.similar_lump && (rec.similar_lump === "Yes" || rec.similar_lump === true)) conditions.push("has <span class='danger'>had similar lumps previously</span>");
      if (rec.breast_lumps && (rec.breast_lumps === "Yes" || rec.breast_lumps === true)) conditions.push("has <span class='danger'>breast lumps</span>");
      if (rec.diagnosed_tb && (rec.diagnosed_tb === "Yes" || rec.diagnosed_tb === true)) conditions.push("has <span class='danger'>been diagnosed with TB</span>");
      if (rec.cancer_treatment && (rec.cancer_treatment === "Yes" || rec.cancer_treatment === true)) conditions.push("has <span class='danger'>undergone cancer treatment</span>");
      if (rec.check_lyvk && (rec.check_lyvk === "Yes" || rec.check_lyvk === true)) conditions.push("has additional lymph node observations");
      if (rec.lymph_node && rec.lymph_node !== "0") conditions.push(`lymph node findings: ${rec.lymph_node}`);
      if (rec.any_previous_lab && (rec.any_previous_lab === "Yes" || rec.any_previous_lab === true)) conditions.push("has previous lab reports");
      if (rec.please_upload && rec.please_upload !== "0") conditions.push("has uploaded a lab report");
      if (rec.none_lymph && (rec.none_lymph === "Yes" || rec.none_lymph === true)) conditions.push("reports no lymph node-specific symptoms");

      let sentence = "The patient is stable with no notable lymph node enlargement complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const lymphNodeEnlargementRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      please_upload: rec.please_upload
    }));

    const lymphNodeEnlargementSummaryHtml = `
      <div class="lymph-node-enlargement-summary">
        <b>Lymph Node Enlargement Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Lymph Node Enlargement Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { lymphNodeEnlargementSummaryHtml, redFlagsList, lymphNodeEnlargementRecords };
  } catch (err) {
    return {
      lymphNodeEnlargementSummaryHtml: `<div class="lymph-node-enlargement-summary" style="color:red;">
        <b>Error loading Lymph Node Enlargement data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      lymphNodeEnlargementRecords: []
    };
  }
};


// Corrected generateChestPainSummary function
const generateChestPainSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'sudden_onset_chest_pain', 'none', 'chest_pain', 'check_mhdx', 'chect_discomfort',
      'restrosternal', 'left_sided', 'right_sided', 'epigastric', 'between_the_scapulae', 'other',
      'other_chestpain', 'chestpain_symptom', 'very_sudden', 'gradual', 'intermittent', 'symtom_other',
      'if_gradual', 'otherpain_chest', 'heavy', 'ripping', 'sharp_stabbing', 'dull_aching', 'burning',
      'other_pain', 'chest_ifother', 'few_minutes', 'prolonged', 'variable', 'other_continuepain',
      'continue_other', 'at_night', 'in_the_morning', 'not_linked', 'mostpain_other', 'mostpain_ifother',
      'severity_of_the_pain', 'does_not_move', 'pain_radiates_to', 'left_arm', 'right_arm', 'neck',
      'jaw', 'epigastric_abdomen', 'left_shoulder', 'right_shoulder', 'back_left', 'back_right',
      'bodypain_other', 'other_painbody', 'difficulty_breathing', 'anxiety', 'sweating', 'nausea',
      'vomiting', 'palpitations', 'fatigue', 'fainting', 'dizziness', 'chestpain_fever', 'chestpain_cough',
      'chestpain_other', 'ifother_describe', 'movement', 'exercise', 'emotional_distress', 'chestpain_anxiety',
      'cold', 'lying_down_on_the_back', 'lying_down_to_the_side', 'sitting_up', 'some_foods',
      'chestpain_none', 'dontknow_unsure', 'chestpain_otherscheck', 'otherpain_describe', 'check_rehf',
      'rest', 'chest_sittingup', 'leaning_forward', 'medications', 'none_situation', 'unsure_situation',
      'situation_other', 'please_describeother', 'check_uoln', 'chestpain_bp', 'chestpain_heart',
      'chestpain_diabetes', 'chestpain_asthma', 'acidity_and_reflux', 'spicy_oily', 'food_ontime',
      'previous_test', 'attach_photo'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Chest Pain" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Chest Pain' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Chest Pain: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Chest Pain",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        chestPainSummaryHtml: ``,
        redFlagsList: [],
        chestPainRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        chestPainSummaryHtml: ``,
        redFlagsList: [],
        chestPainRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(chestPainRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${chestPainRedFlagsInfo[field].label} - ${chestPainRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Chest Pain records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.sudden_onset_chest_pain && (rec.sudden_onset_chest_pain === "Yes" || rec.sudden_onset_chest_pain === true)) conditions.push("has <span class='danger'>sudden onset chest pain</span>");
      if (rec.chest_pain && (rec.chest_pain === "Yes" || rec.chest_pain === true)) conditions.push("has <span class='danger'>chest pain</span>");
      if (rec.check_mhdx && (rec.check_mhdx === "Yes" || rec.check_mhdx === true)) conditions.push("has additional chest pain findings");
      if (rec.chect_discomfort && rec.chect_discomfort !== "0") conditions.push("has <span class='danger'>chest discomfort</span>: ${rec.chect_discomfort}");
      if (rec.restrosternal && (rec.restrosternal === "Yes" || rec.restrosternal === true)) conditions.push("has <span class='danger'>retrosternal pain</span>");
      if (rec.left_sided && (rec.left_sided === "Yes" || rec.left_sided === true)) conditions.push("has <span class='danger'>left-sided chest pain</span>");
      if (rec.right_sided && (rec.right_sided === "Yes" || rec.right_sided === true)) conditions.push("has <span class='danger'>right-sided chest pain</span>");
      if (rec.epigastric && (rec.epigastric === "Yes" || rec.epigastric === true)) conditions.push("has <span class='danger'>epigastric pain</span>");
      if (rec.between_the_scapulae && (rec.between_the_scapulae === "Yes" || rec.between_the_scapulae === true)) conditions.push("has <span class='danger'>pain between the scapulae</span>");
      if (rec.other && (rec.other === "Yes" || rec.other === true)) conditions.push("has other chest pain locations");
      if (rec.other_chestpain && rec.other_chestpain !== "0") conditions.push(`other chest pain location: ${rec.other_chestpain}`);
      if (rec.chestpain_symptom && rec.chestpain_symptom !== "0") conditions.push(`chest pain symptoms: ${rec.chestpain_symptom}`);
      if (rec.very_sudden && (rec.very_sudden === "Yes" || rec.very_sudden === true)) conditions.push("has <span class='danger'>very sudden onset of pain</span>");
      if (rec.gradual && (rec.gradual === "Yes" || rec.gradual === true)) conditions.push("has <span class='danger'>gradual onset of pain</span>");
      if (rec.intermittent && (rec.intermittent === "Yes" || rec.intermittent === true)) conditions.push("has <span class='danger'>intermittent pain</span>");
      if (rec.symtom_other && (rec.symtom_other === "Yes" || rec.symtom_other === true)) conditions.push("has other symptom onset patterns");
      if (rec.if_gradual && rec.if_gradual !== "0") conditions.push(`gradual onset details: ${rec.if_gradual}`);
      if (rec.otherpain_chest && rec.otherpain_chest !== "0") conditions.push(`other pain characteristics: ${rec.otherpain_chest}`);
      if (rec.heavy && (rec.heavy === "Yes" || rec.heavy === true)) conditions.push("has <span class='danger'>heavy pain</span>");
      if (rec.ripping && (rec.ripping === "Yes" || rec.ripping === true)) conditions.push("has <span class='danger'>ripping pain</span>");
      if (rec.sharp_stabbing && (rec.sharp_stabbing === "Yes" || rec.sharp_stabbing === true)) conditions.push("has <span class='danger'>sharp or stabbing pain</span>");
      if (rec.dull_aching && (rec.dull_aching === "Yes" || rec.dull_aching === true)) conditions.push("has <span class='danger'>dull or aching pain</span>");
      if (rec.burning && (rec.burning === "Yes" || rec.burning === true)) conditions.push("has <span class='danger'>burning pain</span>");
      if (rec.other_pain && (rec.other_pain === "Yes" || rec.other_pain === true)) conditions.push("has other pain characteristics");
      if (rec.chest_ifother && rec.chest_ifother !== "0") conditions.push(`other pain description: ${rec.chest_ifother}`);
      if (rec.few_minutes && (rec.few_minutes === "Yes" || rec.few_minutes === true)) conditions.push("has pain lasting a few minutes");
      if (rec.prolonged && (rec.prolonged === "Yes" || rec.prolonged === true)) conditions.push("has <span class='danger'>prolonged pain</span>");
      if (rec.variable && (rec.variable === "Yes" || rec.variable === true)) conditions.push("has variable pain duration");
      if (rec.other_continuepain && (rec.other_continuepain === "Yes" || rec.other_continuepain === true)) conditions.push("has other pain duration patterns");
      if (rec.continue_other && rec.continue_other !== "0") conditions.push(`other pain duration: ${rec.continue_other}`);
      if (rec.at_night && (rec.at_night === "Yes" || rec.at_night === true)) conditions.push("has <span class='danger'>pain most severe at night</span>");
      if (rec.in_the_morning && (rec.in_the_morning === "Yes" || rec.in_the_morning === true)) conditions.push("has <span class='danger'>pain most severe in the morning</span>");
      if (rec.not_linked && (rec.not_linked === "Yes" || rec.not_linked === true)) conditions.push("has pain not linked to specific times");
      if (rec.mostpain_other && (rec.mostpain_other === "Yes" || rec.mostpain_other === true)) conditions.push("has other pain timing patterns");
      if (rec.mostpain_ifother && rec.mostpain_ifother !== "0") conditions.push(`other pain timing: ${rec.mostpain_ifother}`);
      if (rec.severity_of_the_pain && rec.severity_of_the_pain !== "0") conditions.push(`pain severity: ${rec.severity_of_the_pain}`);
      if (rec.does_not_move && (rec.does_not_move === "Yes" || rec.does_not_move === true)) conditions.push("has pain that does not radiate");
      if (rec.pain_radiates_to && (rec.pain_radiates_to === "Yes" || rec.pain_radiates_to === true)) conditions.push("has pain that radiates");
      if (rec.left_arm && (rec.left_arm === "Yes" || rec.left_arm === true)) conditions.push("has pain radiating to the <span class='danger'>left arm</span>");
      if (rec.right_arm && (rec.right_arm === "Yes" || rec.right_arm === true)) conditions.push("has pain radiating to the right arm");
      if (rec.neck && (rec.neck === "Yes" || rec.neck === true)) conditions.push("has pain radiating to the neck");
      if (rec.jaw && (rec.jaw === "Yes" || rec.jaw === true)) conditions.push("has pain radiating to the <span class='danger'>jaw</span>");
      if (rec.epigastric_abdomen && (rec.epigastric_abdomen === "Yes" || rec.epigastric_abdomen === true)) conditions.push("has pain radiating to the epigastric abdomen");
      if (rec.left_shoulder && (rec.left_shoulder === "Yes" || rec.left_shoulder === true)) conditions.push("has pain radiating to the <span class='danger'>left shoulder</span>");
      if (rec.right_shoulder && (rec.right_shoulder === "Yes" || rec.right_shoulder === true)) conditions.push("has pain radiating to the right shoulder");
      if (rec.back_left && (rec.back_left === "Yes" || rec.back_left === true)) conditions.push("has pain radiating to the left back");
      if (rec.back_right && (rec.back_right === "Yes" || rec.back_right === true)) conditions.push("has pain radiating to the right back");
      if (rec.bodypain_other && (rec.bodypain_other === "Yes" || rec.bodypain_other === true)) conditions.push("has pain radiating to other areas");
      if (rec.other_painbody && rec.other_painbody !== "0") conditions.push(`other pain radiation: ${rec.other_painbody}`);
      if (rec.difficulty_breathing && (rec.difficulty_breathing === "Yes" || rec.difficulty_breathing === true)) conditions.push("has <span class='danger'>difficulty breathing</span>");
      if (rec.anxiety && (rec.anxiety === "Yes" || rec.anxiety === true)) conditions.push("has <span class='danger'>anxiety</span>");
      if (rec.sweating && (rec.sweating === "Yes" || rec.sweating === true)) conditions.push("has <span class='danger'>sweating</span>");
      if (rec.nausea && (rec.nausea === "Yes" || rec.nausea === true)) conditions.push("has <span class='danger'>nausea</span>");
      if (rec.vomiting && (rec.vomiting === "Yes" || rec.vomiting === true)) conditions.push("has <span class='danger'>vomiting</span>");
      if (rec.palpitations && (rec.palpitations === "Yes" || rec.palpitations === true)) conditions.push("has <span class='danger'>palpitations</span>");
      if (rec.fatigue && (rec.fatigue === "Yes" || rec.fatigue === true)) conditions.push("has <span class='danger'>fatigue</span>");
      if (rec.fainting && (rec.fainting === "Yes" || rec.fainting === true)) conditions.push("has <span class='danger'>fainting</span>");
      if (rec.dizziness && (rec.dizziness === "Yes" || rec.dizziness === true)) conditions.push("has <span class='danger'>dizziness</span>");
      if (rec.chestpain_fever && (rec.chestpain_fever === "Yes" || rec.chestpain_fever === true)) conditions.push("has <span class='danger'>fever</span>");
      if (rec.chestpain_cough && (rec.chestpain_cough === "Yes" || rec.chestpain_cough === true)) conditions.push("has <span class='danger'>cough</span>");
      if (rec.chestpain_other && (rec.chestpain_other === "Yes" || rec.chestpain_other === true)) conditions.push("has other symptoms");
      if (rec.ifother_describe && rec.ifother_describe !== "0") conditions.push(`other symptoms: ${rec.ifother_describe}`);
      if (rec.movement && (rec.movement === "Yes" || rec.movement === true)) conditions.push("has pain triggered by <span class='danger'>movement</span>");
      if (rec.exercise && (rec.exercise === "Yes" || rec.exercise === true)) conditions.push("has pain triggered by <span class='danger'>exercise</span>");
      if (rec.emotional_distress && (rec.emotional_distress === "Yes" || rec.emotional_distress === true)) conditions.push("has pain triggered by <span class='danger'>emotional distress</span>");
      if (rec.chestpain_anxiety && (rec.chestpain_anxiety === "Yes" || rec.chestpain_anxiety === true)) conditions.push("has pain triggered by <span class='danger'>anxiety</span>");
      if (rec.cold && (rec.cold === "Yes" || rec.cold === true)) conditions.push("has pain triggered by <span class='danger'>cold</span>");
      if (rec.lying_down_on_the_back && (rec.lying_down_on_the_back === "Yes" || rec.lying_down_on_the_back === true)) conditions.push("has pain triggered by <span class='danger'>lying down on the back</span>");
      if (rec.lying_down_to_the_side && (rec.lying_down_to_the_side === "Yes" || rec.lying_down_to_the_side === true)) conditions.push("has pain triggered by <span class='danger'>lying down to the side</span>");
      if (rec.sitting_up && (rec.sitting_up === "Yes" || rec.sitting_up === true)) conditions.push("has pain triggered by <span class='danger'>sitting up</span>");
      if (rec.some_foods && (rec.some_foods === "Yes" || rec.some_foods === true)) conditions.push("has pain triggered by <span class='danger'>some foods</span>");
      if (rec.chestpain_none && (rec.chestpain_none === "Yes" || rec.chestpain_none === true)) conditions.push("has pain with no specific triggers");
      if (rec.dontknow_unsure && (rec.dontknow_unsure === "Yes" || rec.dontknow_unsure === true)) conditions.push("is unsure about pain triggers");
      if (rec.chestpain_otherscheck && (rec.chestpain_otherscheck === "Yes" || rec.chestpain_otherscheck === true)) conditions.push("has other pain triggers");
      if (rec.otherpain_describe && rec.otherpain_describe !== "0") conditions.push(`other pain triggers: ${rec.otherpain_describe}`);
      if (rec.check_rehf && (rec.check_rehf === "Yes" || rec.check_rehf === true)) conditions.push("has additional relief findings");
      if (rec.rest && (rec.rest === "Yes" || rec.rest === true)) conditions.push("finds pain relief with rest");
      if (rec.chest_sittingup && (rec.chest_sittingup === "Yes" || rec.chest_sittingup === true)) conditions.push("finds pain relief by sitting up");
      if (rec.leaning_forward && (rec.leaning_forward === "Yes" || rec.leaning_forward === true)) conditions.push("finds pain relief by leaning forward");
      if (rec.medications && (rec.medications === "Yes" || rec.medications === true)) conditions.push("finds pain relief with medications");
      if (rec.none_situation && (rec.none_situation === "Yes" || rec.none_situation === true)) conditions.push("has no specific pain relief situations");
      if (rec.unsure_situation && (rec.unsure_situation === "Yes" || rec.unsure_situation === true)) conditions.push("is unsure about pain relief situations");
      if (rec.situation_other && (rec.situation_other === "Yes" || rec.situation_other === true)) conditions.push("has other pain relief situations");
      if (rec.please_describeother && rec.please_describeother !== "0") conditions.push(`other pain relief situations: ${rec.please_describeother}`);
      if (rec.check_uoln && (rec.check_uoln === "Yes" || rec.check_uoln === true)) conditions.push("has additional medical history findings");
      if (rec.chestpain_bp && (rec.chestpain_bp === "Yes" || rec.chestpain_bp === true)) conditions.push("has <span class='danger'>a history of hypertension</span>");
      if (rec.chestpain_heart && (rec.chestpain_heart === "Yes" || rec.chestpain_heart === true)) conditions.push("has <span class='danger'>a history of heart disease</span>");
      if (rec.chestpain_diabetes && (rec.chestpain_diabetes === "Yes" || rec.chestpain_diabetes === true)) conditions.push("has <span class='danger'>a history of diabetes</span>");
      if (rec.chestpain_asthma && (rec.chestpain_asthma === "Yes" || rec.chestpain_asthma === true)) conditions.push("has <span class='danger'>a history of asthma</span>");
      if (rec.acidity_and_reflux && (rec.acidity_and_reflux === "Yes" || rec.acidity_and_reflux === true)) conditions.push("has <span class='danger'>a history of acidity or reflux</span>");
      if (rec.spicy_oily && (rec.spicy_oily === "Yes" || rec.spicy_oily === true)) conditions.push("consumes <span class='danger'>spicy or oily foods</span>");
      if (rec.food_ontime && (rec.food_ontime === "Yes" || rec.food_ontime === true)) conditions.push("takes meals on time");
      if (rec.previous_test && (rec.previous_test === "Yes" || rec.previous_test === true)) conditions.push("has previous lab tests");
      if (rec.attach_photo && rec.attach_photo !== "0") conditions.push("has uploaded a report or image");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no other symptoms");

      let sentence = "The patient is stable with no notable chest pain complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const chestPainRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      attach_photo: rec.attach_photo
    }));

    const chestPainSummaryHtml = `
      <div class="chest-pain-summary">
        <b>Chest Pain Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Chest Pain Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { chestPainSummaryHtml, redFlagsList, chestPainRecords };
  } catch (err) {
    return {
      chestPainSummaryHtml: `<div class="chest-pain-summary" style="color:red;">
        <b>Error loading Chest Pain data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      chestPainRecords: []
    };
  }
};


// Corrected generateConstipationSummary function
const generateConstipationSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const allFields = [
      'name', 'creation', 'patient_id', 'patient_name',
      'blood_stool', 'not_able_to_pass_the_gas', 'sever_abdominal_pain', 'recent_loss_of_appetite_or_weight_loss',
      'recent_onset_of_constipation', 'none_constipation', 'constipation', 'check_vwfw', 'notpassed_stool',
      'constipation_symptoms', 'color_stool', 'hard_dry', 'pain_passing_stool', 'urge_pass_stool', 'abdomen_pain',
      'heavyness_in_the_abdomen', 'blood_in_the_stool', 'recent_loss_of_weight', 'recent_loss_of_appetite',
      'lower_back_pain', 'able_to_pass_gas', 'vomiting', 'none', 'check_inid', 'water_intake', 'recent_dietory',
      'regular_exercise', 'undergone_surgery', 'if_yes_specify', 'check_qeqi', 'toilet_facility', 'sitting_jobs',
      'safe_drinking_water', 'previous_report', 'upload_report'
    ];
    let validFields = [...allFields];
    // try {
    //   const doctypeMeta = await getFrappeDoc("frappe.client.get", { doctype: "DocType", name: "Constipation" });
    //   if (!doctypeMeta) throw new Error("Doctype 'Constipation' does not exist");
    //   const doctypeFields = doctypeMeta.fields.map(f => f.fieldname);
    //   validFields = allFields.filter(field => doctypeFields.includes(field) || field === 'name' || field === 'creation' || field === 'patient_id' || field === 'patient_name');
    // } catch (metaErr) {
    //   console.warn(`Could not validate fields for Constipation: ${metaErr.message}`);
    // }

    const args = {
      doctype: "Constipation",
      fields: validFields,
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        constipationSummaryHtml: ``,
        redFlagsList: [],
        constipationRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        constipationSummaryHtml: ``,
        redFlagsList: [],
        constipationRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(constipationRedFlagsInfo).forEach(field => {
        if (validFields.includes(field) && rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${constipationRedFlagsInfo[field].label} - ${constipationRedFlagsInfo[field].message}`);
        }
      });
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Constipation records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.blood_stool && (rec.blood_stool === "Yes" || rec.blood_stool === true)) conditions.push("has <span class='danger'>blood in the stool (reported)</span>");
      if (rec.not_able_to_pass_the_gas && (rec.not_able_to_pass_the_gas === "Yes" || rec.not_able_to_pass_the_gas === true)) conditions.push("has <span class='danger'>inability to pass gas</span>");
      if (rec.sever_abdominal_pain && (rec.sever_abdominal_pain === "Yes" || rec.sever_abdominal_pain === true)) conditions.push("has <span class='danger'>severe abdominal pain</span>");
      if (rec.recent_loss_of_appetite_or_weight_loss && (rec.recent_loss_of_appetite_or_weight_loss === "Yes" || rec.recent_loss_of_appetite_or_weight_loss === true)) conditions.push("has <span class='danger'>recent loss of appetite or weight loss</span>");
      if (rec.recent_onset_of_constipation && (rec.recent_onset_of_constipation === "Yes" || rec.recent_onset_of_constipation === true)) conditions.push("has <span class='danger'>recent onset of constipation</span>");
      if (rec.constipation && (rec.constipation === "Yes" || rec.constipation === true)) conditions.push("has <span class='danger'>constipation</span>");
      if (rec.check_vwfw && (rec.check_vwfw === "Yes" || rec.check_vwfw === true)) conditions.push("has additional constipation findings");
      if (rec.notpassed_stool && rec.notpassed_stool !== "0") conditions.push(`has not passed stool for: ${rec.notpassed_stool}`);
      if (rec.constipation_symptoms && rec.constipation_symptoms !== "0") conditions.push(`constipation symptoms: ${rec.constipation_symptoms}`);
      if (rec.color_stool && rec.color_stool !== "0") conditions.push(`stool color: ${rec.color_stool}`);
      if (rec.hard_dry && (rec.hard_dry === "Yes" || rec.hard_dry === true)) conditions.push("has <span class='danger'>hard or dry stools</span>");
      if (rec.pain_passing_stool && (rec.pain_passing_stool === "Yes" || rec.pain_passing_stool === true)) conditions.push("has <span class='danger'>pain while passing stool</span>");
      if (rec.urge_pass_stool && (rec.urge_pass_stool === "Yes" || rec.urge_pass_stool === true)) conditions.push("has <span class='danger'>urge to pass stool</span>");
      if (rec.abdomen_pain && (rec.abdomen_pain === "Yes" || rec.abdomen_pain === true)) conditions.push("has <span class='danger'>abdominal pain</span>");
      if (rec.heavyness_in_the_abdomen && (rec.heavyness_in_the_abdomen === "Yes" || rec.heavyness_in_the_abdomen === true)) conditions.push("has <span class='danger'>heaviness in the abdomen</span>");
      if (rec.blood_in_the_stool && (rec.blood_in_the_stool === "Yes" || rec.blood_in_the_stool === true)) conditions.push("has <span class='danger'>blood in the stool</span>");
      if (rec.recent_loss_of_weight && (rec.recent_loss_of_weight === "Yes" || rec.recent_loss_of_weight === true)) conditions.push("has <span class='danger'>recent weight loss</span>");
      if (rec.recent_loss_of_appetite && (rec.recent_loss_of_appetite === "Yes" || rec.recent_loss_of_appetite === true)) conditions.push("has <span class='danger'>recent loss of appetite</span>");
      if (rec.lower_back_pain && (rec.lower_back_pain === "Yes" || rec.lower_back_pain === true)) conditions.push("has <span class='danger'>lower back pain</span>");
      if (rec.able_to_pass_gas && (rec.able_to_pass_gas === "Yes" || rec.able_to_pass_gas === true)) conditions.push("is able to pass gas");
      if (rec.vomiting && (rec.vomiting === "Yes" || rec.vomiting === true)) conditions.push("has <span class='danger'>vomiting</span>");
      if (rec.check_inid && (rec.check_inid === "Yes" || rec.check_inid === true)) conditions.push("has additional dietary or lifestyle findings");
      if (rec.water_intake && rec.water_intake !== "0") conditions.push(`water intake: ${rec.water_intake}`);
      if (rec.recent_dietory && rec.recent_dietory !== "0") conditions.push("has <span class='danger'>recent dietary changes</span>: ${rec.recent_dietory}");
      if (rec.regular_exercise && rec.regular_exercise !== "0") conditions.push(`regular exercise: ${rec.regular_exercise}`);
      if (rec.undergone_surgery && (rec.undergone_surgery === "Yes" || rec.undergone_surgery === true)) conditions.push("has <span class='danger'>undergone surgery</span>");
      if (rec.if_yes_specify && rec.if_yes_specify !== "0") conditions.push(`surgery details: ${rec.if_yes_specify}`);
      if (rec.check_qeqi && (rec.check_qeqi === "Yes" || rec.check_qeqi === true)) conditions.push("has additional environmental findings");
      if (rec.toilet_facility && rec.toilet_facility !== "0") conditions.push(`toilet facility access: ${rec.toilet_facility}`);
      if (rec.sitting_jobs && (rec.sitting_jobs === "Yes" || rec.sitting_jobs === true)) conditions.push("has <span class='danger'>a job involving prolonged sitting</span>");
      if (rec.safe_drinking_water && (rec.safe_drinking_water === "Yes" || rec.safe_drinking_water === true)) conditions.push("has access to safe drinking water");
      if (rec.previous_report && (rec.previous_report === "Yes" || rec.previous_report === true)) conditions.push("has previous lab reports");
      if (rec.upload_report && rec.upload_report !== "0") conditions.push("has uploaded a lab report");
      if (rec.none && (rec.none === "Yes" || rec.none === true)) conditions.push("reports no constipation-specific symptoms");
      if (rec.none_constipation && (rec.none_constipation === "Yes" || rec.none_constipation === true)) conditions.push("reports no constipation symptoms");

      let sentence = "The patient is stable with no notable constipation complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes: ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const constipationRecords = records.map((rec, idx) => ({
      name: rec.name,
      recordNumber: idx + 1,
      creation: rec.creation,
      upload_report: rec.upload_report
    }));

    const constipationSummaryHtml = `
      <div class="constipation-summary">
        <b>Constipation Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Constipation Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { constipationSummaryHtml, redFlagsList, constipationRecords };
  } catch (err) {
    return {
      constipationSummaryHtml: `<div class="constipation-summary" style="color:red;">
        <b>Error loading Constipation data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      constipationRecords: []
    };
  }
};
const generateRespiratoryIssueSummary = async (currentRecord) => {
  try {
    const patient_id = currentRecord.patient_id || currentRecord.patient_unique_id || null;
    const patient_name = currentRecord.patient_name || null;
    const args = {
      doctype: "Respiratory Issue",
      fields: [
        'name', 'creation', 'patient_id',
        'if_the_child_is_breathless', 'if_the_child_is_having_chest_in_drawing', 'if_the_child_is_drowsy_or_constantly_crying',
        'if_the_child_is_refusing_breast_feeding_or_any_feed', 'none4', 'respiratory_issue', 'high_fever_more_than_3_days',
        'associated_with_chills', 'discoloured_nasal_discharge_or_sputum_discolor', 'sputum', 'finding_difficulty_to_swallow',
        'tender_lymphnodes_in_the_neck', 'breathing_difficulty', 'chest_pain', 'any_change_in_the_sound_while_coughing',
        'none', 'check_sayy', 'fever', 'cough', 'cold', 'headache', 'select_ygoh', 'fever_since', 'severity_fever',
        'fever_most', 'fever_withchills', 'select_upnm', 'howlong_cough', 'day', 'night', 'lying_down', 'talking',
        'seasonal', 'constant', 'after_contact_with_pet_animals', 'others', 'if_seasonal', 'other_describe',
        'howis_cough', 'sputum_color', 'wheezing', 'shortness_of_breath', 'pain_chest', 'bloody_sputum', 'weight_loss',
        'hoarseness', 'throat_buring', 'stuffy_nose', 'runny_nose', 'select_umxs', 'cold_weather', 'wind',
        'known_allergy', 'other_cause', 'cause_none', 'cold_sincewhen', 'any_allergy', 'coldother_describe',
        'nasal_congestion', 'select_beav', 'since_headache', 'headache_other', 'severity', 'when_feelpain',
        'throbbing', 'stabbing', 'pounding', 'dull_continuous', 'headache_others', 'select_zfpp', 'any_history_of_asthama',
        'any_history_of_allergy', 'past_symptoms', 'select_ffsm', 'history_asthma', 'allergy_history', 'throat_examination',
        'sinus_tenderness', 'lab_previous', 'if_yes_please_upload'
      ],
      limit_page_length: 0
    };
    const or_filters = [];
    if (patient_id) or_filters.push(["patient_id", "=", patient_id]);
    if (patient_name && patient_name !== "Unknown Patient") or_filters.push(["patient_name", "=", patient_name]);
    if (or_filters.length === 0) {
      return {
        respiratoryIssueSummaryHtml: ``,
        redFlagsList: [],
        respiratoryIssueRecords: []
      };
    }
    args.or_filters = or_filters;

    const records = await getFrappeDoc("frappe.client.get_list", args);

    if (!records || records.length === 0) {
      return {
        respiratoryIssueSummaryHtml: ``,
        redFlagsList: [],
        respiratoryIssueRecords: []
      };
    }

    let redFlagsList = [];
    records.forEach((rec, idx) => {
      Object.keys(respiratoryIssueRedFlagsInfo).forEach(field => {
        if (rec[field] && rec[field] !== "0" && rec[field] !== 0 && rec[field] !== false) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): ${respiratoryIssueRedFlagsInfo[field].label} - ${respiratoryIssueRedFlagsInfo[field].message}`);
        }
      });
      // Special handling for fever in children (not a direct field, but derived from `fever` and `severity_fever`)
      if (rec.fever && (rec.fever === "Yes" || rec.fever === true)) {
        if (rec.severity_fever && rec.severity_fever.includes("100.4 to 104")) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): Fever 100.4°F to 104°F - Refer to Health center/PHC/CHC.`);
        } else if (rec.severity_fever && rec.severity_fever.includes("Above 104")) {
          redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): Fever Above 104°F - Refer to Tertiary health centre: Probably pneumonia needs admission and monitoring.`);
        }
      }
      // Special handling for SpO2 (not a direct field, derived from Nurse Interventions `saturation`)
      if (currentRecord.saturation && parseInt(currentRecord.saturation) < 90) {
        redFlagsList.push(`Record ${idx + 1} (${formatDate(rec.creation)}): SpO2 Less Than 90 - Refer to Tertiary health centre: Severe hypoxia leads to brain damage/death. It can be seen in severe asthma and pneumonia.`);
      }
    });

    const redFlagsHtml = redFlagsList.length
      ? `<ul class="summary-bullet-points">${redFlagsList.map(flag => `<li>${flag}</li>`).join('')}</ul>`
      : '<ul class="summary-bullet-points"><li>No red flags detected in Respiratory Issue records.</li></ul>';

    let summaryHtml = '<ul class="summary-bullet-points">';
    records.forEach((rec, idx) => {
      summaryHtml += `<li><b>Record ${idx + 1} (${formatDate(rec.creation)}):</b> `;
      const conditions = [];
      if (rec.respiratory_issue && rec.respiratory_issue !== "0") conditions.push(`experiences respiratory issues`);
      if (rec.if_the_child_is_breathless && (rec.if_the_child_is_breathless === "Yes" || rec.if_the_child_is_breathless === true)) conditions.push(`is a child with <span class='danger'>breathlessness</span>`);
      if (rec.if_the_child_is_having_chest_in_drawing && (rec.if_the_child_is_having_chest_in_drawing === "Yes" || rec.if_the_child_is_having_chest_in_drawing === true)) conditions.push(`is a child with <span class='danger'>chest in-drawing</span>`);
      if (rec.if_the_child_is_drowsy_or_constantly_crying && (rec.if_the_child_is_drowsy_or_constantly_crying === "Yes" || rec.if_the_child_is_drowsy_or_constantly_crying === true)) conditions.push(`is a child with <span class='danger'>drowsiness or constant crying</span>`);
      if (rec.if_the_child_is_refusing_breast_feeding_or_any_feed && (rec.if_the_child_is_refusing_breast_feeding_or_any_feed === "Yes" || rec.if_the_child_is_refusing_breast_feeding_or_any_feed === true)) conditions.push(`is a child <span class='danger'>refusing breast feeding or any feed</span>`);
      if (rec.high_fever_more_than_3_days && (rec.high_fever_more_than_3_days === "Yes" || rec.high_fever_more_than_3_days === true)) conditions.push(`has <span class='danger'>high fever for more than 3 days</span>`);
      if (rec.associated_with_chills && (rec.associated_with_chills === "Yes" || rec.associated_with_chills === true)) conditions.push(`has <span class='danger'>chills</span>`);
      if (rec.discoloured_nasal_discharge_or_sputum_discolor && (rec.discoloured_nasal_discharge_or_sputum_discolor === "Yes" || rec.discoloured_nasal_discharge_or_sputum_discolor === true)) conditions.push(`has <span class='danger'>discoloured nasal discharge or sputum</span>`);
      if (rec.sputum && (rec.sputum === "Yes" || rec.sputum === true)) conditions.push(`has <span class='danger'>bloody sputum</span>`);
      if (rec.finding_difficulty_to_swallow && (rec.finding_difficulty_to_swallow === "Yes" || rec.finding_difficulty_to_swallow === true)) conditions.push(`has <span class='danger'>difficulty swallowing</span>`);
      if (rec.tender_lymphnodes_in_the_neck && (rec.tender_lymphnodes_in_the_neck === "Yes" || rec.tender_lymphnodes_in_the_neck === true)) conditions.push(`has <span class='danger'>tender lymph nodes in the neck</span>`);
      if (rec.breathing_difficulty && (rec.breathing_difficulty === "Yes" || rec.breathing_difficulty === true)) conditions.push(`has <span class='danger'>breathing difficulty</span>`);
      if (rec.chest_pain && (rec.chest_pain === "Yes" || rec.chest_pain === true)) conditions.push(`has <span class='danger'>chest pain</span>`);
      if (rec.any_change_in_the_sound_while_coughing && (rec.any_change_in_the_sound_while_coughing === "Yes" || rec.any_change_in_the_sound_while_coughing === true)) conditions.push(`has <span class='danger'>a change in sound while coughing</span>`);
      if (rec.fever && (rec.fever === "Yes" || rec.fever === true)) conditions.push(`has fever`);
      if (rec.cough && (rec.cough === "Yes" || rec.cough === true)) conditions.push(`has cough`);
      if (rec.cold && (rec.cold === "Yes" || rec.cold === true)) conditions.push(`has a cold`);
      if (rec.headache && (rec.headache === "Yes" || rec.headache === true)) conditions.push(`has headache`);
      if (rec.fever_since && rec.fever_since !== "0") conditions.push(`has had fever since ${rec.fever_since.toLowerCase()}`);
      if (rec.severity_fever && rec.severity_fever !== "0") conditions.push(`rates fever severity as ${rec.severity_fever.toLowerCase()}`);
      if (rec.fever_most && rec.fever_most !== "0") conditions.push(`notes fever is most prominent ${rec.fever_most.toLowerCase()}`);
      if (rec.fever_withchills && rec.fever_withchills !== "0" && rec.fever_withchills !== "No") conditions.push(`has fever with chills`);
      if (rec.howlong_cough && rec.howlong_cough !== "0") conditions.push(`has had cough for ${rec.howlong_cough}`);
      if (rec.day && (rec.day === "Yes" || rec.day === true)) conditions.push(`has cough during the day`);
      if (rec.night && (rec.night === "Yes" || rec.night === true)) conditions.push(`has cough at night`);
      if (rec.lying_down && (rec.lying_down === "Yes" || rec.lying_down === true)) conditions.push(`has cough when lying down`);
      if (rec.talking && (rec.talking === "Yes" || rec.talking === true)) conditions.push(`has cough when talking`);
      if (rec.seasonal && (rec.seasonal === "Yes" || rec.seasonal === true)) conditions.push(`has seasonal cough`);
      if (rec.constant && (rec.constant === "Yes" || rec.constant === true)) conditions.push(`has constant cough`);
      if (rec.after_contact_with_pet_animals && (rec.after_contact_with_pet_animals === "Yes" || rec.after_contact_with_pet_animals === true)) conditions.push(`has cough after contact with pet animals`);
      if (rec.others && (rec.others === "Yes" || rec.others === true)) conditions.push(`has cough triggered by other factors`);
      if (rec.if_seasonal && rec.if_seasonal !== "0") conditions.push(`describes seasonal cough as ${rec.if_seasonal}`);
      if (rec.other_describe && rec.other_describe !== "0") conditions.push(`describes other cough details as ${rec.other_describe}`);
      if (rec.howis_cough && rec.howis_cough !== "0") conditions.push(`describes cough as ${rec.howis_cough.toLowerCase()}`);
      if (rec.sputum_color && rec.sputum_color !== "0") conditions.push(`reports sputum color as ${rec.sputum_color.toLowerCase()}`);
      if (rec.wheezing && (rec.wheezing === "Yes" || rec.wheezing === true)) conditions.push(`has <span class='danger'>wheezing</span>`);
      if (rec.shortness_of_breath && (rec.shortness_of_breath === "Yes" || rec.shortness_of_breath === true)) conditions.push(`has <span class='danger'>shortness of breath</span>`);
      if (rec.pain_chest && (rec.pain_chest === "Yes" || rec.pain_chest === true)) conditions.push(`has <span class='danger'>chest pain</span>`);
      if (rec.bloody_sputum && (rec.bloody_sputum === "Yes" || rec.bloody_sputum === true)) conditions.push(`has <span class='danger'>bloody sputum</span>`);
      if (rec.weight_loss && (rec.weight_loss === "Yes" || rec.weight_loss === true)) conditions.push(`has <span class='danger'>weight loss</span>`);
      if (rec.hoarseness && (rec.hoarseness === "Yes" || rec.hoarseness === true)) conditions.push(`has hoarseness`);
      if (rec.throat_buring && (rec.throat_buring === "Yes" || rec.throat_buring === true)) conditions.push(`has throat burning`);
      if (rec.stuffy_nose && (rec.stuffy_nose === "Yes" || rec.stuffy_nose === true)) conditions.push(`has a stuffy nose`);
      if (rec.runny_nose && (rec.runny_nose === "Yes" || rec.runny_nose === true)) conditions.push(`has a runny nose`);
      if (rec.cold_weather && (rec.cold_weather === "Yes" || rec.cold_weather === true)) conditions.push(`has cold triggered by cold weather`);
      if (rec.wind && (rec.wind === "Yes" || rec.wind === true)) conditions.push(`has cold triggered by wind`);
      if (rec.known_allergy && (rec.known_allergy === "Yes" || rec.known_allergy === true)) conditions.push(`has cold triggered by known allergy`);
      if (rec.other_cause && (rec.other_cause === "Yes" || rec.other_cause === true)) conditions.push(`has cold triggered by other causes`);
      if (rec.cold_sincewhen && rec.cold_sincewhen !== "0") conditions.push(`has had cold since ${rec.cold_sincewhen}`);
      if (rec.any_allergy && rec.any_allergy !== "0") conditions.push(`reports allergies as ${rec.any_allergy}`);
      if (rec.coldother_describe && rec.coldother_describe !== "0") conditions.push(`describes other cold details as ${rec.coldother_describe}`);
      if (rec.nasal_congestion && rec.nasal_congestion !== "0") conditions.push(`has nasal congestion described as ${rec.nasal_congestion.toLowerCase()}`);
      if (rec.since_headache && rec.since_headache !== "0") conditions.push(`has had headache since ${rec.since_headache}`);
      if (rec.headache_other && rec.headache_other !== "0") conditions.push(`describes other headache details as ${rec.headache_other}`);
      if (rec.severity && rec.severity !== "0") conditions.push(`rates headache severity as ${rec.severity.toLowerCase()}`);
      if (rec.when_feelpain && rec.when_feelpain !== "0") conditions.push(`feels headache pain ${rec.when_feelpain.toLowerCase()}`);
      if (rec.throbbing && (rec.throbbing === "Yes" || rec.throbbing === true)) conditions.push(`has throbbing headache`);
      if (rec.stabbing && (rec.stabbing === "Yes" || rec.stabbing === true)) conditions.push(`has stabbing headache`);
      if (rec.pounding && (rec.pounding === "Yes" || rec.pounding === true)) conditions.push(`has pounding headache`);
      if (rec.dull_continuous && (rec.dull_continuous === "Yes" || rec.dull_continuous === true)) conditions.push(`has dull continuous headache`);
      if (rec.headache_others && (rec.headache_others === "Yes" || rec.headache_others === true)) conditions.push(`has other headache characteristics`);
      if (rec.any_history_of_asthama && rec.any_history_of_asthama !== "0" && rec.any_history_of_asthama !== "No") conditions.push(`has <span class='danger'>a history of asthma</span>`);
      if (rec.any_history_of_allergy && rec.any_history_of_allergy !== "0" && rec.any_history_of_allergy !== "No") conditions.push(`has <span class='danger'>a history of allergies</span>`);
      if (rec.past_symptoms && rec.past_symptoms !== "0") conditions.push(`has past symptoms described as ${rec.past_symptoms.toLowerCase()}`);
      if (rec.history_asthma && rec.history_asthma !== "0" && rec.history_asthma !== "No") conditions.push(`has <span class='danger'>a family history of asthma</span>`);
      if (rec.allergy_history && rec.allergy_history !== "0" && rec.allergy_history !== "No") conditions.push(`has <span class='danger'>a family history of allergies</span>`);
      if (rec.throat_examination && rec.throat_examination !== "0") conditions.push(`has throat examination findings as ${rec.throat_examination}`);
      if (rec.sinus_tenderness && rec.sinus_tenderness !== "0" && rec.sinus_tenderness !== "No") conditions.push(`has sinus tenderness`);
      if (rec.lab_previous && rec.lab_previous !== "0" && rec.lab_previous !== "No") conditions.push(`has previous lab reports`);
      if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") conditions.push(`has uploaded a lab report`);

      let sentence = "The patient is stable with no notable respiratory complaints.";
      if (conditions.length > 0) {
        sentence = `The patient ${conditions.slice(0, 4).join(", ")}`;
        if (conditions.length > 4) sentence += `. Additional notes include ${conditions.slice(4).join(", ")}.`;
        else sentence += ".";
      }
      summaryHtml += sentence + '</li>';
    });
    summaryHtml += '</ul>';

    const respiratoryIssueRecords = records.map((rec, idx) => ({ name: rec.name, recordNumber: idx + 1, creation: rec.creation, uploadedReport: rec.if_yes_please_upload }));

    const respiratoryIssueSummaryHtml = `
      <div class="respiratory-issue-summary">
        <b>Respiratory Issue Summary:</b>
        ${summaryHtml}
        <div class="red-flag-box"><b>Respiratory Issue Red Flags:</b> ${redFlagsHtml}</div>
      </div>
    `;

    return { respiratoryIssueSummaryHtml, redFlagsList, respiratoryIssueRecords };
  } catch (err) {
    return {
      respiratoryIssueSummaryHtml: `<div class="respiratory-issue-summary" style="color:red;">
        <b>Error loading Respiratory Issue data:</b><ul class="summary-bullet-points"><li>${err.message}</li></ul></div>`,
      redFlagsList: [],
      respiratoryIssueRecords: []
    };
  }
};








      const summaryData = await generateSummary();
      if (!summaryData) return;
      const { currentRecord, patientInfo, vitalStats, interventionDetails } = summaryData;

const [redFlagResult, screeningResult, followupResult, hypertensionResult, hypertensionFollowupResult, 
abdominalPainGastrointestinalResult, diarrheaResult, vomitingResult, fatigueResult, eyeProblemResult, backAndNeckPainResult, 
shoulderAndHandPainResult, legKneeHipPainResult, dyspepsiaAcidityResult, footAnklePainResult, anemiaAdolescentsResult, anemiaChildrenResult, 
headacheResult, pregnancyCareResult, postnatalCareResult, jaundiceResult, thyroidProblemResult,
skinProblemResult, lymphNodeEnlargementResult, chestPainResult, constipationResult, respiratoryIssueResult] = await Promise.all([
  generateRedFlagContent(currentRecord),
  generateScreeningDiabetesSummary(currentRecord),
  generateDiabetesFollowupSummary(currentRecord),
  generateHypertensionSummary(currentRecord),
  generateHypertensionFollowupSummary(currentRecord),
  generateAbdominalPainGastrointestinalSummary(currentRecord),
  generateDiarrheaSummary(currentRecord),
  generateVomitingSummary(currentRecord),
  generateFatigueSummary(currentRecord),
  generateEyeProblemSummary(currentRecord),
  generateBackAndNeckPainSummary(currentRecord),
  generateShoulderAndHandPainSummary(currentRecord),
  generateLegKneeHipPainSummary(currentRecord),
  generateDyspepsiaAciditySummary(currentRecord),
  generateFootAnklePainSummary(currentRecord),
  generateAnemiaAdolescentsSummary(currentRecord),
  generateAnemiaChildrenSummary(currentRecord),
  generateHeadacheSummary(currentRecord),
  generatePregnancyCareSummary(currentRecord),
  generatePostnatalCareSummary(currentRecord),
  generateJaundiceSummary(currentRecord),
  generateThyroidProblemSummary(currentRecord),
  generateSkinProblemSummary(currentRecord),
  generateLymphNodeEnlargementSummary(currentRecord),
  generateChestPainSummary(currentRecord),
  generateConstipationSummary(currentRecord),
   generateRespiratoryIssueSummary(currentRecord)
]);


const { redFlagRecords, redFlagContent } = redFlagResult;
const { screeningDiabetesSummaryHtml, redFlagsList: screeningRedFlagsList, diagnosisRecords: screeningRecords } = screeningResult;
const { diabetesFollowupSummaryHtml, redFlagsList: followupRedFlagsList, followupRecords } = followupResult;
const { hypertensionSummaryHtml, redFlagsList: hypertensionRedFlagsList, hypertensionRecords } = hypertensionResult;
const { hypertensionFollowupSummaryHtml, redFlagsList: hypertensionFollowupRedFlagsList, hypertensionFollowupRecords } = hypertensionFollowupResult;
const { abdominalPainGastrointestinalSummaryHtml, redFlagsList: abdominalPainGastrointestinalRedFlagsList, abdominalPainGastrointestinalRecords } = abdominalPainGastrointestinalResult;
const { diarrheaSummaryHtml, redFlagsList: diarrheaRedFlagsList, diarrheaRecords } = diarrheaResult;
const { vomitingSummaryHtml, redFlagsList: vomitingRedFlagsList, vomitingRecords } = vomitingResult;
const { fatigueSummaryHtml, redFlagsList: fatigueRedFlagsList, fatigueRecords } = fatigueResult;
const { eyeProblemSummaryHtml, redFlagsList: eyeProblemRedFlagsList, eyeProblemRecords } = eyeProblemResult;
const { backAndNeckPainSummaryHtml, redFlagsList: backAndNeckPainRedFlagsList, backAndNeckPainRecords } = backAndNeckPainResult;
const { shoulderAndHandPainSummaryHtml, redFlagsList: shoulderAndHandPainRedFlagsList, shoulderAndHandPainRecords } = shoulderAndHandPainResult;
const { legKneeHipPainSummaryHtml, redFlagsList: legKneeHipPainRedFlagsList, legKneeHipPainRecords } = legKneeHipPainResult;
const { dyspepsiaAciditySummaryHtml, redFlagsList: dyspepsiaAcidityRedFlagsList, dyspepsiaAcidityRecords } = dyspepsiaAcidityResult;
const { footAnklePainSummaryHtml, redFlagsList: footAnklePainRedFlagsList, footAnklePainRecords } = footAnklePainResult;
const { anemiaAdolescentsSummaryHtml, redFlagsList: anemiaAdolescentsRedFlagsList, anemiaAdolescentsRecords } = anemiaAdolescentsResult;
const { anemiaChildrenSummaryHtml, redFlagsList: anemiaChildrenRedFlagsList, anemiaChildrenRecords } = anemiaChildrenResult;
const { headacheSummaryHtml, redFlagsList: headacheRedFlagsList, headacheRecords } = headacheResult;
const { pregnancyCareSummaryHtml, redFlagsList: pregnancyCareRedFlagsList, pregnancyCareRecords } = pregnancyCareResult;
const { postnatalCareSummaryHtml, redFlagsList: postnatalCareRedFlagsList, postnatalCareRecords } = postnatalCareResult;
const { jaundiceSummaryHtml, redFlagsList: jaundiceRedFlagsList, jaundiceRecords } = jaundiceResult;
const { thyroidProblemSummaryHtml, redFlagsList: thyroidProblemRedFlagsList, thyroidProblemRecords } = thyroidProblemResult;
const { skinProblemSummaryHtml, redFlagsList: skinProblemRedFlagsList, skinProblemRecords } = skinProblemResult;
const { lymphNodeEnlargementSummaryHtml, redFlagsList: lymphNodeEnlargementRedFlagsList, lymphNodeEnlargementRecords } = lymphNodeEnlargementResult;
const { chestPainSummaryHtml, redFlagsList: chestPainRedFlagsList, chestPainRecords } = chestPainResult;
const { constipationSummaryHtml, redFlagsList: constipationRedFlagsList, constipationRecords } = constipationResult;
const { respiratoryIssueSummaryHtml, redFlagsList: respiratoryIssueRedFlagsList, respiratoryIssueRecords } = respiratoryIssueResult;


const hasRedFlags = redFlagRecords.length > 0 || screeningRedFlagsList.length > 0 || 
followupRedFlagsList.length > 0 || hypertensionRedFlagsList.length > 0 || hypertensionFollowupRedFlagsList.length > 0 || 
abdominalPainGastrointestinalRedFlagsList.length > 0 || diarrheaRedFlagsList.length > 0 || vomitingRedFlagsList.length > 0 || 
fatigueRedFlagsList.length > 0 || eyeProblemRedFlagsList.length > 0 || backAndNeckPainRedFlagsList.length > 0 || shoulderAndHandPainRedFlagsList.length > 0
|| legKneeHipPainRedFlagsList.length > 0 || dyspepsiaAcidityRedFlagsList.length > 0 || footAnklePainRedFlagsList.length > 0 || 
anemiaAdolescentsRedFlagsList.length > 0 || anemiaChildrenRedFlagsList.length > 0 || headacheRedFlagsList.length > 0 || 
pregnancyCareRedFlagsList.length > 0 || postnatalCareRedFlagsList.length > 0 || jaundiceRedFlagsList.length > 0 || thyroidProblemRedFlagsList.length > 0 
 || skinProblemRedFlagsList.length > 0 || lymphNodeEnlargementRedFlagsList.length > 0 || chestPainRedFlagsList.length > 0 || constipationRedFlagsList.length > 0 || respiratoryIssueRedFlagsList.length > 0;
 

let redFlagAlertHtml = "";
if (hasRedFlags) {
  let alertContent = `<ul class="summary-bullet-points">`;
  if (redFlagRecords.length > 0) {
    alertContent += `<li><b>Nurse Interventions Red Flags:</b><ul class="summary-bullet-points">`;
    redFlagRecords.forEach((record, idx) => {
      let flags = [];
      if (record.temperature && parseFloat(record.temperature) > 100)
        flags.push(`High Fever (${record.temperature}°F)`);
      if (record.pulse && (parseInt(record.pulse) > 100 || parseInt(record.pulse) < 60))
        flags.push(`Abnormal Pulse Rate (${record.pulse} bpm)`);
      if (record.saturation && parseInt(record.saturation) < 90)
        flags.push(`Low SpO₂ (${record.saturation}%)`);
      if (record.bp) {
        const bpParts = record.bp.split("/").map(p => parseInt(p.trim()) || 0);
        if (bpParts[0] > 140 || bpParts[1] > 90)
          flags.push(`High BP (${record.bp} mmHg)`);
      }
      if (record.rbg_level) {
        const rbg = parseFloat(record.rbg_level);
        if (rbg > 200 || rbg < 70)
          flags.push(`Abnormal RBS (${record.rbg_level} mg/dl)`);
      } else {
        flags.push(`RBG Not Recordable`);
      }
      if (record.chn_primary_diagnosis?.toLowerCase().includes("severe"))
        flags.push(`Severe Diagnosis (${record.chn_primary_diagnosis})`);
      alertContent += `<li>Record ${idx + 1} (${formatDate(record.creation)}): ${flags.join(", ")}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  if (screeningRedFlagsList.length > 0) {
    alertContent += `<li><b>Screening for Diabetes Red Flags:</b><ul class="summary-bullet-points">`;
    screeningRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  if (followupRedFlagsList.length > 0) {
    alertContent += `<li><b>Diabetes Followup Red Flags:</b><ul class="summary-bullet-points">`;
    followupRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  if (hypertensionRedFlagsList.length > 0) {
    alertContent += `<li><b>Screening for Hypertension Red Flags:</b><ul class="summary-bullet-points">`;
    hypertensionRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  if (hypertensionFollowupRedFlagsList.length > 0) {
    alertContent += `<li><b>Hypertension Follow up Red Flags:</b><ul class="summary-bullet-points">`;
    hypertensionFollowupRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (abdominalPainGastrointestinalRedFlagsList.length > 0) {
    alertContent += `<li><b>Abdominal pain Gastrointestinal Red Flags:</b><ul class="summary-bullet-points">`;
    abdominalPainGastrointestinalRedFlagsList.forEach(item => {
      alertContent += `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (diarrheaRedFlagsList.length > 0) {
    alertContent += `<li><b>Diarrhea Red Flags:</b><ul class="summary-bullet-points">`;
    diarrheaRedFlagsList.forEach(item => {
      alertContent += `<li>Record ${item.recordNumber} (${formatDate(item.creation)}): ${item.flags.join(", ")}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  
  if (vomitingRedFlagsList.length > 0) {
    alertContent += `<li><b>Vomiting Red Flags:</b><ul class="summary-bullet-points">`;
    vomitingRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  
    if (fatigueRedFlagsList.length > 0) {
    alertContent += `<li><b>Fatigue Red Flags:</b><ul class="summary-bullet-points">`;
    fatigueRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
   if (eyeProblemRedFlagsList.length > 0) {
    alertContent += `<li><b>Eye Problem Red Flags:</b><ul class="summary-bullet-points">`;
    eyeProblemRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  
   if (backAndNeckPainRedFlagsList.length > 0) {
    alertContent += `<li><b>Back and Neck Pain Red Flags:</b><ul class="summary-bullet-points">`;
    backAndNeckPainRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
 if (shoulderAndHandPainRedFlagsList.length > 0) {
    alertContent += `<li><b>Shoulder and Hand Pain Red Flags:</b><ul class="summary-bullet-points">`;
    shoulderAndHandPainRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
   if (legKneeHipPainRedFlagsList.length > 0) {
    alertContent += `<li><b>Leg or Knee or Hip Pain Red Flags:</b><ul class="summary-bullet-points">`;
    legKneeHipPainRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  if (dyspepsiaAcidityRedFlagsList.length > 0) {
    alertContent += `<li><b>Dyspepsia/Acidity Red Flags:</b><ul class="summary-bullet-points">`;
    dyspepsiaAcidityRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (footAnklePainRedFlagsList.length > 0) {
    alertContent += `<li><b>Foot and Ankle Pain Red Flags:</b><ul class="summary-bullet-points">`;
    footAnklePainRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (anemiaAdolescentsRedFlagsList.length > 0) {
    alertContent += `<li><b>Anemia-Adolescents Red Flags:</b><ul class="summary-bullet-points">`;
    anemiaAdolescentsRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  if (anemiaChildrenRedFlagsList.length > 0) {
    alertContent += `<li><b>Anemia-Children Red Flags:</b><ul class="summary-bullet-points">`;
    anemiaChildrenRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (headacheRedFlagsList.length > 0) {
    alertContent += `<li><b>Headache Red Flags:</b><ul class="summary-bullet-points">`;
    headacheRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (pregnancyCareRedFlagsList.length > 0) {
    alertContent += `<li><b>Pregnancy Care Red Flags:</b><ul class="summary-bullet-points">`;
    pregnancyCareRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (postnatalCareRedFlagsList.length > 0) {
    alertContent += `<li><b>Postnatal Care Red Flags:</b><ul class="summary-bullet-points">`;
    postnatalCareRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (jaundiceRedFlagsList.length > 0) {
    alertContent += `<li><b>Jaundice Red Flags:</b><ul class="summary-bullet-points">`;
    jaundiceRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (thyroidProblemRedFlagsList.length > 0) {
    alertContent += `<li><b>Thyroid Problem Red Flags:</b><ul class="summary-bullet-points">`;
    thyroidProblemRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (skinProblemRedFlagsList.length > 0) {
    alertContent += `<li><b>Skin Problem Red Flags:</b><ul class="summary-bullet-points">`;
    skinProblemRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (lymphNodeEnlargementRedFlagsList.length > 0) {
    alertContent += `<li><b>Lymph Node Enlargement Red Flags:</b><ul class="summary-bullet-points">`;
    lymphNodeEnlargementRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
   if (chestPainRedFlagsList.length > 0) {
    alertContent += `<li><b>Chest Pain Red Flags:</b><ul class="summary-bullet-points">`;
    chestPainRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (constipationRedFlagsList.length > 0) {
    alertContent += `<li><b>Constipation Red Flags:</b><ul class="summary-bullet-points">`;
    constipationRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
    if (respiratoryIssueRedFlagsList.length > 0) {
    alertContent += `<li><b>Respiratory Issue Red Flags:</b><ul class="summary-bullet-points">`;
    respiratoryIssueRedFlagsList.forEach(flag => {
      alertContent += `<li>${flag}</li>`;
    });
    alertContent += `</ul></li>`;
  }
  
  
  alertContent += `</ul>`;
  redFlagAlertHtml = `<div class="custom-alert red">⚠️ <strong>Red Flags Detected for patient: ${currentRecord.patient_name || "Unknown"}</strong>${alertContent}</div>`;

  frappe.msgprint({
    title: __('🚩 Red Flag Warning'),
    message: redFlagAlertHtml,
    indicator: 'red'
  });
} else {
  redFlagAlertHtml = `<div class="custom-alert green">
    <ul class="summary-bullet-points"><li>✅ <strong>No red flags detected for patient: ${currentRecord.patient_name || "Unknown"}</strong></li></ul>
  </div>`;

  frappe.msgprint({
    title: __('✅ No Red Flags'),
    message: redFlagAlertHtml,
    indicator: 'green'
  });
}



// Update fullRecordsHtml: Add conditional checks for lab report links and remove unnecessary <ul> nesting
let fullRecordsHtml = `<div class="full-records"><b>Full Records PDFs:</b><ul class="summary-bullet-points">`;
fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Nurse Interventions")}&name=${doc.name}&format=Standard&no_letterhead=0" target="_blank">Full Nurse Interventions PDF (Date: ${formatDate(currentRecord.creation)})</a></li>`;
screeningRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Screening for Diabetes")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Screening for Diabetes Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
});
followupRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Diabetes Followup")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Diabetes Followup Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.lab_reports && rec.lab_reports !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.lab_reports}" target="_blank">Lab Report for Diabetes Followup Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
hypertensionRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Screening for Hypertension")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Screening for Hypertension Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.lab_scanning && rec.lab_scanning !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.lab_scanning}" target="_blank">Lab Report for Screening for Hypertension Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
hypertensionFollowupRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Hypertension Follow up")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Hypertension Follow up Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.lab_reports && rec.lab_reports !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.lab_reports}" target="_blank">Lab Report for Hypertension Follow up Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
abdominalPainGastrointestinalRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Abdominal pain Gastrointestinal")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Abdominal pain Gastrointestinal Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.yes_upload && rec.yes_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.yes_upload}" target="_blank">Lab Report for Abdominal pain Gastrointestinal Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
diarrheaRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Diarrhea")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Diarrhea Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.report_upload && rec.report_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.report_upload}" target="_blank">Lab Report for Diarrhea Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
vomitingRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Vomiting")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Vomiting Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.upload_report && rec.upload_report !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.upload_report}" target="_blank">Lab Report for Vomiting Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
fatigueRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Fatigue")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Fatigue Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.if_yes_please_upload}" target="_blank">Lab Report for Fatigue Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
eyeProblemRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Eye problem")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Eye Problem Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.upload_report && rec.upload_report !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.upload_report}" target="_blank">Lab Report for Eye Problem Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
backAndNeckPainRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Back and Neck Pain")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Back and Neck Pain Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.if_yes_please_upload}" target="_blank">Lab Report for Back and Neck Pain Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
shoulderAndHandPainRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Shoulder and Hand Pain")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Shoulder and Hand Pain Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.upload_report && rec.upload_report !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.upload_report}" target="_blank">Lab Report for Shoulder and Hand Pain Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
legKneeHipPainRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Leg or Knee or Hip pain")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Leg or Knee or Hip Pain Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.upload_report && rec.upload_report !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.upload_report}" target="_blank">Lab Report for Leg or Knee or Hip Pain Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
dyspepsiaAcidityRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Dyspepsia_Acidity")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Dyspepsia/Acidity Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.uploadedReport && rec.uploadedReport !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.uploadedReport}" target="_blank">Dyspepsia/Acidity Lab Report for Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
footAnklePainRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Foot and Ankle Pain")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Foot and Ankle Pain Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.uploadedReport && rec.uploadedReport !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.uploadedReport}" target="_blank">Foot and Ankle Pain Lab Report for Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
anemiaAdolescentsRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Anemia-Adolescents")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Anemia-Adolescents Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.please_upload && rec.please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.please_upload}" target="_blank">Lab Report for Anemia-Adolescents Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
anemiaChildrenRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Anemia- Children")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Anemia-Children Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.please_upload && rec.please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.please_upload}" target="_blank">Lab Report for Anemia-Children Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
headacheRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Headache")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Headache Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.if_yes_please_upload}" target="_blank">Lab Report for Headache Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
pregnancyCareRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Pregnancy Care")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Pregnancy Care Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.please_upload && rec.please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.please_upload}" target="_blank">Lab Report for Pregnancy Care Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
postnatalCareRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Postnatal Care")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Postnatal Care Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.please_upload && rec.please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.please_upload}" target="_blank">Lab Report for Postnatal Care Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
jaundiceRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Jaundice")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Jaundice Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.if_yes_please_upload && rec.if_yes_please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.if_yes_please_upload}" target="_blank">Lab Report for Jaundice Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
thyroidProblemRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Thyroid Problem")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Thyroid Problem Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.please_upload && rec.please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.please_upload}" target="_blank">Lab Report for Thyroid Problem Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
skinProblemRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Skin Problem")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Skin Problem Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.please_upload && rec.please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.please_upload}" target="_blank">Lab Report for Skin Problem Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
lymphNodeEnlargementRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Lymph node Enlargement")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Lymph Node Enlargement Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.please_upload && rec.please_upload !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.please_upload}" target="_blank">Lab Report for Lymph Node Enlargement Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
chestPainRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Chest Pain")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Chest Pain Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.attach_photo && rec.attach_photo !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.attach_photo}" target="_blank">Lab Report for Chest Pain Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
constipationRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Constipation")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Constipation Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.upload_report && rec.upload_report !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.upload_report}" target="_blank">Lab Report for Constipation Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
respiratoryIssueRecords.forEach(rec => {
  fullRecordsHtml += `<li><a class="pdf-link" href="/api/method/frappe.utils.print_format.download_pdf?doctype=${encodeURIComponent("Respiratory Issue")}&name=${rec.name}&format=Standard&no_letterhead=0" target="_blank">Full Respiratory Issue Record ${rec.recordNumber} PDF (Date: ${formatDate(rec.creation)})</a></li>`;
  if (rec.uploadedReport && rec.uploadedReport !== "0") {
    fullRecordsHtml += `<ul><li><a class="pdf-link" href="${rec.uploadedReport}" target="_blank">Respiratory Issue Lab Report for Record ${rec.recordNumber} (Date: ${formatDate(rec.creation)})</a></li></ul>`;
  }
});
fullRecordsHtml += `</ul></ul></div>`;




let showRedFlags = true;

const buildDialogContent = () => `
  
  <div style="max-height: 60vh; overflow-y: auto; padding-right: 10px;">
    <div style="display: flex; gap: 10px;">
      ${patientInfo}
      ${vitalStats}
    </div>
    ${screeningDiabetesSummaryHtml}
    ${diabetesFollowupSummaryHtml}
    ${hypertensionSummaryHtml}
    ${hypertensionFollowupSummaryHtml}
    ${abdominalPainGastrointestinalSummaryHtml}
    ${diarrheaSummaryHtml}
    ${vomitingSummaryHtml}
    ${fatigueSummaryHtml}
    ${eyeProblemSummaryHtml}
    ${backAndNeckPainSummaryHtml}
    ${shoulderAndHandPainSummaryHtml}
    ${legKneeHipPainSummaryHtml}
    ${dyspepsiaAciditySummaryHtml}
    ${footAnklePainSummaryHtml}
    ${anemiaAdolescentsSummaryHtml}
    ${anemiaChildrenSummaryHtml}
    ${headacheSummaryHtml}
    ${pregnancyCareSummaryHtml}
    ${postnatalCareSummaryHtml}
    ${jaundiceSummaryHtml}
    ${thyroidProblemSummaryHtml}
    ${skinProblemSummaryHtml}
    ${lymphNodeEnlargementSummaryHtml}
    ${chestPainSummaryHtml}
    ${constipationSummaryHtml}
    ${respiratoryIssueSummaryHtml}

    <div class="red-flag-section" style="display: ${showRedFlags ? 'block' : 'none'};">${redFlagContent}</div>
    ${fullRecordsHtml}
  </div>
`;
      const dialog = new frappe.ui.Dialog({
        title: __("Patient Summary for {0}", [currentRecord.patient_name || "Patient"]),
        fields: [{
          fieldtype: "HTML",
          fieldname: "summary_content",
          options: buildDialogContent()
        }],
        size: "large",
        primary_action_label: __("Download as PDF"),
        primary_action: function() {
          const loader = document.getElementById("pdf-loader");
          if (loader) loader.style.display = "flex";

          const pdfRedFlagContent = showRedFlags ? redFlagContent : "";
          let pdfRedFlagAlertHtml = "";
          if (hasRedFlags) {
            pdfRedFlagAlertHtml = `<div class="custom-alert red">
              <ul class="summary-bullet-points"><li>⚠️ <strong>Red Flags Detected for patient: ${currentRecord.patient_name || "Unknown"}</strong></li></ul>
            </div>`;
            if (!showRedFlags) {
              pdfRedFlagAlertHtml += `<div class="custom-alert red">
                <ul class="summary-bullet-points"><li>⚠️ <strong>Note: Red Flags are hidden in this report.</strong></li></ul>
              </div>`;
            }
          } else {
            pdfRedFlagAlertHtml = `<div class="custom-alert green">
              <ul class="summary-bullet-points"><li>✅ <strong>No red flags detected for patient: ${currentRecord.patient_name || "Unknown"}</strong></li></ul>
            </div>`;
          }

          const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: `${currentRecord.patient_name || "Patient"}_Summary_${doc.name}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2pdf: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
            pagebreak: { mode: ['css', 'legacy'] }
          };

const generatePDF = () => {
  try {
    const pdfElement = document.createElement('div');
    let pdfContent = `
      <div style="padding: 20px;">
        <div style="display: flex; gap: 10px;">
          ${patientInfo}
          ${vitalStats}
        </div>
    `;
    if (!screeningDiabetesSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${screeningDiabetesSummaryHtml}`;
    }
    if (!diabetesFollowupSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${diabetesFollowupSummaryHtml}`;
    }
    if (!hypertensionSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${hypertensionSummaryHtml}`;
    }
    if (!hypertensionFollowupSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${hypertensionFollowupSummaryHtml}`;
    }
    if (!abdominalPainGastrointestinalSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${abdominalPainGastrointestinalSummaryHtml}`;
    }
    if (!diarrheaSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${diarrheaSummaryHtml}`;
    }
    if (!vomitingSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${vomitingSummaryHtml}`;
    }
     if (!fatigueSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${fatigueSummaryHtml}`;
    }
    if (!eyeProblemSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${eyeProblemSummaryHtml}`;
    }
    if (!backAndNeckPainSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${backAndNeckPainSummaryHtml}`;
    }
    if (!shoulderAndHandPainSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${shoulderAndHandPainSummaryHtml}`;
    }
    if (!legKneeHipPainSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${legKneeHipPainSummaryHtml}`;
    }
     if (!dyspepsiaAciditySummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${dyspepsiaAciditySummaryHtml}`;
    }
     if (!footAnklePainSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${footAnklePainSummaryHtml}`;
    }
    if (!anemiaAdolescentsSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${anemiaAdolescentsSummaryHtml}`;
    }
    if (!anemiaChildrenSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${anemiaChildrenSummaryHtml}`;
    }
       if (!headacheSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${headacheSummaryHtml}`;
    }
        if (!pregnancyCareSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${pregnancyCareSummaryHtml}`;
    }
        if (!postnatalCareSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${postnatalCareSummaryHtml}`;
    }
        if (!jaundiceSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${jaundiceSummaryHtml}`;
    }
        if (!thyroidProblemSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${thyroidProblemSummaryHtml}`;
    }
        if (!skinProblemSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${skinProblemSummaryHtml}`;
    }
        if (!lymphNodeEnlargementSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${lymphNodeEnlargementSummaryHtml}`;
    }
       if (!chestPainSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${chestPainSummaryHtml}`;
    }
        if (!constipationSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${constipationSummaryHtml}`;
    }
        if (!respiratoryIssueSummaryHtml.includes("No records found for this patient.")) {
      pdfContent += `${respiratoryIssueSummaryHtml}`;
    }
    
    
    pdfContent += `
        ${pdfRedFlagContent}
        ${fullRecordsHtml}
        ${pdfRedFlagAlertHtml}
      </div>
    `;
    pdfElement.innerHTML = pdfContent;

    html2pdf().set(opt).from(pdfElement).save().then(() => {
      if (loader) loader.style.display = "none";
      frappe.show_alert({ message: __("PDF Downloaded"), indicator: "green" });
    }).catch((err) => {
      throw new Error("PDF generation failed: " + err.message);
    });
  } catch (err) {
    if (loader) loader.style.display = "none";
    frappe.show_alert({ message: __(`Error generating PDF: ${err.message}`), indicator: "red" });
  }
};

          if (typeof html2pdf === "undefined") {
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.onload = generatePDF;
            script.onerror = () => {
              if (loader) loader.style.display = "none";
              frappe.show_alert({ message: __("Failed to load html2pdf library"), indicator: "red" });
            };
            document.head.appendChild(script);
          } else {
            generatePDF();
          }
        }
      });

      dialog.show();

      function updateDialogContent() {
        dialog.fields_dict.summary_content.$wrapper.empty().html(buildDialogContent());

        const redFlagButton = dialog.$wrapper.find('.red-flag-button')[0];
        if (redFlagButton) {
          redFlagButton.addEventListener('click', () => {
            showRedFlags = !showRedFlags;
            updateDialogContent();
          });
        }
      }

      setTimeout(updateDialogContent, 10);
    }
  }
};
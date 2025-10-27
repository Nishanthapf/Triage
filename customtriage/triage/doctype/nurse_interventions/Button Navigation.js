frappe.ui.form.on('Nurse Interventions', {
    refresh: function(frm) {
        // Hide all buttons initially
        frm.set_df_property('screening_for_diebetes_button', 'hidden', 1);
        frm.set_df_property('diabetic_follow_up_form', 'hidden', 1);
        frm.set_df_property('button_kapr', 'hidden', 1);
        frm.set_df_property('hypertension_follow_up_form', 'hidden', 1);
        frm.set_df_property('respiratory_issue_fever_cough_cold_and_headache_form', 'hidden', 1);
        frm.set_df_property('chest_pain_form', 'hidden', 1);
        frm.set_df_property('abdominal_pain_form', 'hidden', 1);
        frm.set_df_property('diarrhea_form', 'hidden', 1);
        frm.set_df_property('vomiting_form', 'hidden', 1);
        frm.set_df_property('back_pain_and_neck_pain_form', 'hidden', 1);
        frm.set_df_property('button_klpy', 'hidden', 1);
        frm.set_df_property('leg_or_knee_or_hip_pain_form', 'hidden', 1);
        frm.set_df_property('foot_and_ankle_pain_form', 'hidden', 1);
        frm.set_df_property('anemia_adolescent_form', 'hidden', 1);
        frm.set_df_property('anemia_children_form', 'hidden', 1);
        frm.set_df_property('pregnancy_care_form', 'hidden', 1);
        frm.set_df_property('postnatal_care_form', 'hidden', 1);
        frm.set_df_property('thyroid_problem_form', 'hidden', 1);
        frm.set_df_property('skin_problem_form', 'hidden', 1);
        frm.set_df_property('button_smfg', 'hidden', 1);
        frm.set_df_property('jaundice_form', 'hidden', 1);
        frm.set_df_property('headache_form', 'hidden', 1);
        frm.set_df_property('dyspepsia_form', 'hidden', 1);
        frm.set_df_property('fatigue_form', 'hidden', 1);
        frm.set_df_property('eye_problem_form', 'hidden', 1);
        frm.set_df_property('constipation_form', 'hidden', 1);

        // Show buttons based on respective checkboxes
        frm.set_df_property('screening_for_diebetes_button', 'hidden', !frm.doc.screening_for_diebetes);
        frm.set_df_property('diabetic_follow_up_form', 'hidden', !frm.doc.diabetic_follow_up);
        frm.set_df_property('button_kapr', 'hidden', !frm.doc.screening_for_hypertension);
        frm.set_df_property('hypertension_follow_up_form', 'hidden', !frm.doc.hypertension_follow_up);
        frm.set_df_property('respiratory_issue_fever_cough_cold_and_headache_form', 'hidden', !frm.doc.respiratory_issue);
        frm.set_df_property('chest_pain_form', 'hidden', !frm.doc.chest_pain);
        frm.set_df_property('abdominal_pain_form', 'hidden', !frm.doc.abdominal_pain);
        frm.set_df_property('diarrhea_form', 'hidden', !frm.doc.diarrhea);
        frm.set_df_property('vomiting_form', 'hidden', !frm.doc.vomiting);
        frm.set_df_property('back_pain_and_neck_pain_form', 'hidden', !frm.doc.back_pain_and_neck_pain);
        frm.set_df_property('button_klpy', 'hidden', !frm.doc.shoulder_and_hand_pain);
        frm.set_df_property('leg_or_knee_or_hip_pain_form', 'hidden', !frm.doc.leg_or_knee_or_hip_pain);
        frm.set_df_property('foot_and_ankle_pain_form', 'hidden', !frm.doc.foot_and_ankle_pain);
        frm.set_df_property('anemia_adolescent_form', 'hidden', !frm.doc.anemia_adolescent);
        frm.set_df_property('anemia_children_form', 'hidden', !frm.doc.anemia_children);
        frm.set_df_property('pregnancy_care_form', 'hidden', !frm.doc.pregnancy_care);
        frm.set_df_property('postnatal_care_form', 'hidden', !frm.doc.postnatal_care);
        frm.set_df_property('thyroid_problem_form', 'hidden', !frm.doc.thyroid_problem);
        frm.set_df_property('skin_problem_form', 'hidden', !frm.doc.skin_problem);
        frm.set_df_property('button_smfg', 'hidden', !frm.doc.lymph_node);
        frm.set_df_property('jaundice_form', 'hidden', !frm.doc.jaundice);
        frm.set_df_property('headache_form', 'hidden', !frm.doc.headache);
        frm.set_df_property('dyspepsia_form', 'hidden', !frm.doc.dyspepsia);
        frm.set_df_property('fatigue_form', 'hidden', !frm.doc.fatigue);
        frm.set_df_property('eye_problem_form', 'hidden', !frm.doc.eye_problem);
        frm.set_df_property('constipation_form', 'hidden', !frm.doc.constipation);

        // Apply color formatting to all relevant fields - without triggering alerts
        apply_color_formatting(frm);

        // Button click events to save Nurse Interventions and navigate to Doctype
        frm.fields_dict['screening_for_diebetes_button'].$input.click(function() {
            if (frm.doc.screening_for_diebetes) {
                save_and_navigate(frm, 'Screening for Diabetes');
            }
        });

        frm.fields_dict['diabetic_follow_up_form'].$input.click(function() {
            if (frm.doc.diabetic_follow_up) {
                save_and_navigate(frm, 'Diabetes Followup');
            }
        });

        frm.fields_dict['button_kapr'].$input.click(function() {
            if (frm.doc.screening_for_hypertension) {
                save_and_navigate(frm, 'Screening for Hypertension');
            }
        });

        frm.fields_dict['hypertension_follow_up_form'].$input.click(function() {
            if (frm.doc.hypertension_follow_up) {
                save_and_navigate(frm, 'Hypertension Follow up');
            }
        });

        frm.fields_dict['respiratory_issue_fever_cough_cold_and_headache_form'].$input.click(function() {
            if (frm.doc.respiratory_issue) {
                save_and_navigate(frm, 'Respiratory Issue');
            }
        });

        frm.fields_dict['chest_pain_form'].$input.click(function() {
            if (frm.doc.chest_pain) {
                save_and_navigate(frm, 'Chest Pain');
            }
        });

        frm.fields_dict['abdominal_pain_form'].$input.click(function() {
            if (frm.doc.abdominal_pain) {
                save_and_navigate(frm, 'Abdominal pain Gastrointestinal');
            }
        });

        frm.fields_dict['diarrhea_form'].$input.click(function() {
            if (frm.doc.diarrhea) {
                save_and_navigate(frm, 'Diarrhea');
            }
        });

        frm.fields_dict['vomiting_form'].$input.click(function() {
            if (frm.doc.vomiting) {
                save_and_navigate(frm, 'Vomiting');
            }
        });

        frm.fields_dict['back_pain_and_neck_pain_form'].$input.click(function() {
            if (frm.doc.back_pain_and_neck_pain) {
                save_and_navigate(frm, 'Back and Neck Pain');
            }
        });

        frm.fields_dict['button_klpy'].$input.click(function() {
            if (frm.doc.shoulder_and_hand_pain) {
                save_and_navigate(frm, 'Shoulder and Hand Pain');
            }
        });

        frm.fields_dict['leg_or_knee_or_hip_pain_form'].$input.click(function() {
            if (frm.doc.leg_or_knee_or_hip_pain) {
                save_and_navigate(frm, 'Leg or Knee or Hip Pain');
            }
        });

        frm.fields_dict['foot_and_ankle_pain_form'].$input.click(function() {
            if (frm.doc.foot_and_ankle_pain) {
                save_and_navigate(frm, 'Foot and Ankle Pain');
            }
        });

        frm.fields_dict['anemia_adolescent_form'].$input.click(function() {
            if (frm.doc.anemia_adolescent) {
                save_and_navigate(frm, 'Anemia-Adolescents');
            }
        });

        frm.fields_dict['anemia_children_form'].$input.click(function() {
            if (frm.doc.anemia_children) {
                save_and_navigate(frm, 'Anemia- Children');
            }
        });

        frm.fields_dict['pregnancy_care_form'].$input.click(function() {
            if (frm.doc.pregnancy_care) {
                save_and_navigate(frm, 'Pregnancy Care');
            }
        });

        frm.fields_dict['postnatal_care_form'].$input.click(function() {
            if (frm.doc.postnatal_care) {
                save_and_navigate(frm, 'Postnatal Care');
            }
        });

        frm.fields_dict['thyroid_problem_form'].$input.click(function() {
            if (frm.doc.thyroid_problem) {
                save_and_navigate(frm, 'Thyroid Problem');
            }
        });

        frm.fields_dict['skin_problem_form'].$input.click(function() {
            if (frm.doc.skin_problem) {
                save_and_navigate(frm, 'Skin Problem');
            }
        });

        frm.fields_dict['button_smfg'].$input.click(function() {
            if (frm.doc.lymph_node) {
                save_and_navigate(frm, 'Lymph Node Enlargement');
            }
        });

        frm.fields_dict['jaundice_form'].$input.click(function() {
            if (frm.doc.jaundice) {
                save_and_navigate(frm, 'Jaundice');
            }
        });

        frm.fields_dict['headache_form'].$input.click(function() {
            if (frm.doc.headache) {
                save_and_navigate(frm, 'Headache');
            }
        });

        frm.fields_dict['dyspepsia_form'].$input.click(function() {
            if (frm.doc.dyspepsia) {
                save_and_navigate(frm, 'Dyspepsia_Acidity');
            }
        });

        frm.fields_dict['fatigue_form'].$input.click(function() {
            if (frm.doc.fatigue) {
                save_and_navigate(frm, 'Fatigue');
            }
        });

        frm.fields_dict['eye_problem_form'].$input.click(function() {
            if (frm.doc.eye_problem) {
                save_and_navigate(frm, 'Eye Problem');
            }
        });

        frm.fields_dict['constipation_form'].$input.click(function() {
            if (frm.doc.constipation) {
                save_and_navigate(frm, 'Constipation');
            }
        });
    },

    // Temperature field trigger for color formatting
    temperature: function(frm) {
        if (frm.doc.temperature) {
            let $temperatureField = frm.get_field('temperature').$input;
            let color = frm.doc.temperature < 100 ? 'green' : 'red';
            $temperatureField.css('background-color', color);
            $temperatureField.css('color', 'white');
        } else {
            let $temperatureField = frm.get_field('temperature').$input;
            $temperatureField.css('background-color', '');
            $temperatureField.css('color', '');
        }
    },

    // Pulse field trigger for color formatting
    pulse: function(frm) {
        if (frm.doc.pulse) {
            let $pulseField = frm.get_field('pulse').$input;
            let color;
            if (frm.doc.pulse > 100) {
                color = 'red';
            } else if (frm.doc.pulse < 60) {
                color = 'blue';
            } else {
                color = 'green';
            }
            $pulseField.css('background-color', color);
            $pulseField.css('color', 'white');
        } else {
            let $pulseField = frm.get_field('pulse').$input;
            $pulseField.css('background-color', '');
            $pulseField.css('color', '');
        }
    },

    // Saturation field trigger for color formatting
    saturation: function(frm) {
        if (frm.doc.saturation) {
            let $saturationField = frm.get_field('saturation').$input;
            let color = frm.doc.saturation < 90 ? 'red' : 'green';
            $saturationField.css('background-color', color);
            $saturationField.css('color', 'white');
        } else {
            let $saturationField = frm.get_field('saturation').$input;
            $saturationField.css('background-color', '');
            $saturationField.css('color', '');
        }
    },

    // Blood Pressure (mmHg) field trigger for color formatting
    blood_pressure_mmhg: function(frm) {
        if (frm.doc.blood_pressure_mmhg) {
            let $bpField = frm.get_field('blood_pressure_mmhg').$input;
            let color;
            if (frm.doc.blood_pressure_mmhg > 140) {
                color = 'red';
            } else if (frm.doc.blood_pressure_mmhg < 90) {
                color = 'blue';
            } else {
                color = 'green';
            }
            $bpField.css('background-color', color);
            $bpField.css('color', 'white');
        } else {
            let $bpField = frm.get_field('blood_pressure_mmhg').$input;
            $bpField.css('background-color', '');
            $bpField.css('color', '');
        }
    },

    // RBG level trigger - with GRBS alert only when user interacts
    rbg_level: function(frm) {
        // Apply color formatting
        if (frm.doc.rbg_level !== undefined && frm.doc.rbg_level !== null && frm.doc.rbg_level !== '') {
            let $rbgField = frm.get_field('rbg_level').$input;
            let color;
            if (frm.doc.rbg_level > 200) {
                color = 'red';
            } else if (frm.doc.rbg_level < 70) {
                color = 'blue';
            } else {
                color = 'green';
            }
            $rbgField.css('background-color', color);
            $rbgField.css('color', 'white');
        } else {
            let $rbgField = frm.get_field('rbg_level').$input;
            $rbgField.css('background-color', '');
            $rbgField.css('color', '');
            
            // Show GRBS alert only if user manually triggered this (not during form load)
            if (frm._user_interacting && frm.is_new()) {
                frappe.msgprint({
                    title: 'Alert',
                    message: 'GRBS is not recordable until a value is entered for RBG Level.',
                    indicator: 'orange'
                });
            }
        }
    },

    // Checkbox trigger functions
    screening_for_diebetes: function(frm) {
        frm._user_interacting = true; // Flag that user is interacting
        frm.set_df_property('screening_for_diebetes_button', 'hidden', !frm.doc.screening_for_diebetes);
    },
    diabetic_follow_up: function(frm) {
        frm._user_interacting = true; // Flag that user is interacting
        frm.set_df_property('diabetic_follow_up_form', 'hidden', !frm.doc.diabetic_follow_up);
    },
    screening_for_hypertension: function(frm) {
        frm.set_df_property('button_kapr', 'hidden', !frm.doc.screening_for_hypertension);
    },
    hypertension_follow_up: function(frm) {
        frm.set_df_property('hypertension_follow_up_form', 'hidden', !frm.doc.hypertension_follow_up);
    },
    respiratory_issue: function(frm) {
        frm.set_df_property('respiratory_issue_fever_cough_cold_and_headache_form', 'hidden', !frm.doc.respiratory_issue);
    },
    chest_pain: function(frm) {
        frm.set_df_property('chest_pain_form', 'hidden', !frm.doc.chest_pain);
    },
    abdominal_pain: function(frm) {
        frm.set_df_property('abdominal_pain_form', 'hidden', !frm.doc.abdominal_pain);
    },
    diarrhea: function(frm) {
        frm.set_df_property('diarrhea_form', 'hidden', !frm.doc.diarrhea);
    },
    vomiting: function(frm) {
        frm.set_df_property('vomiting_form', 'hidden', !frm.doc.vomiting);
    },
    back_pain_and_neck_pain: function(frm) {
        frm.set_df_property('back_pain_and_neck_pain_form', 'hidden', !frm.doc.back_pain_and_neck_pain);
    },
    shoulder_and_hand_pain: function(frm) {
        frm.set_df_property('button_klpy', 'hidden', !frm.doc.shoulder_and_hand_pain);
    },
    leg_or_knee_or_hip_pain: function(frm) {
        frm.set_df_property('leg_or_knee_or_hip_pain_form', 'hidden', !frm.doc.leg_or_knee_or_hip_pain);
    },
    foot_and_ankle_pain: function(frm) {
        frm.set_df_property('foot_and_ankle_pain_form', 'hidden', !frm.doc.foot_and_ankle_pain);
    },
    anemia_adolescent: function(frm) {
        frm.set_df_property('anemia_adolescent_form', 'hidden', !frm.doc.anemia_adolescent);
    },
    anemia_children: function(frm) {
        frm.set_df_property('anemia_children_form', 'hidden', !frm.doc.anemia_children);
    },
    pregnancy_care: function(frm) {
        frm.set_df_property('pregnancy_care_form', 'hidden', !frm.doc.pregnancy_care);
    },
    postnatal_care: function(frm) {
        frm.set_df_property('postnatal_care_form', 'hidden', !frm.doc.postnatal_care);
    },
    thyroid_problem: function(frm) {
        frm.set_df_property('thyroid_problem_form', 'hidden', !frm.doc.thyroid_problem);
    },
    skin_problem: function(frm) {
        frm.set_df_property('skin_problem_form', 'hidden', !frm.doc.skin_problem);
    },
    lymph_node: function(frm) {
        frm.set_df_property('button_smfg', 'hidden', !frm.doc.lymph_node);
    },
    jaundice: function(frm) {
        frm.set_df_property('jaundice_form', 'hidden', !frm.doc.jaundice);
    },
    headache: function(frm) {
        frm.set_df_property('headache_form', 'hidden', !frm.doc.headache);
    },
    dyspepsia: function(frm) {
        frm.set_df_property('dyspepsia_form', 'hidden', !frm.doc.dyspepsia);
    },
    fatigue: function(frm) {
        frm.set_df_property('fatigue_form', 'hidden', !frm.doc.fatigue);
    },
    eye_problem: function(frm) {
        frm.set_df_property('eye_problem_form', 'hidden', !frm.doc.eye_problem);
    },
    constipation: function(frm) {
        frm.set_df_property('constipation_form', 'hidden', !frm.doc.constipation);
    },

    // Validate before save to check critical fields
    validate: function(frm) {
        if (frm.doc.screening_for_diebetes || frm.doc.diabetic_follow_up) {
            if (!frm.doc.rbg_level) {
                frappe.throw('RBG Level is required for Diabetes-related interventions.');
            }
        }
    }
});

// Helper function to apply color formatting without triggering alerts
function apply_color_formatting(frm) {
    // Temperature
    if (frm.doc.temperature) {
        let $temperatureField = frm.get_field('temperature').$input;
        let color = frm.doc.temperature < 100 ? 'green' : 'red';
        $temperatureField.css('background-color', color);
        $temperatureField.css('color', 'white');
    }
    
    // Pulse
    if (frm.doc.pulse) {
        let $pulseField = frm.get_field('pulse').$input;
        let color;
        if (frm.doc.pulse > 100) {
            color = 'red';
        } else if (frm.doc.pulse < 60) {
            color = 'blue';
        } else {
            color = 'green';
        }
        $pulseField.css('background-color', color);
        $pulseField.css('color', 'white');
    }
    
    // Saturation
    if (frm.doc.saturation) {
        let $saturationField = frm.get_field('saturation').$input;
        let color = frm.doc.saturation < 90 ? 'red' : 'green';
        $saturationField.css('background-color', color);
        $saturationField.css('color', 'white');
    }
    
    // Blood Pressure
    if (frm.doc.blood_pressure_mmhg) {
        let $bpField = frm.get_field('blood_pressure_mmhg').$input;
        let color;
        if (frm.doc.blood_pressure_mmhg > 140) {
            color = 'red';
        } else if (frm.doc.blood_pressure_mmhg < 90) {
            color = 'blue';
        } else {
            color = 'green';
        }
        $bpField.css('background-color', color);
        $bpField.css('color', 'white');
    }
    
    // RBG Level - only color formatting, no alerts
    if (frm.doc.rbg_level !== undefined && frm.doc.rbg_level !== null && frm.doc.rbg_level !== '') {
        let $rbgField = frm.get_field('rbg_level').$input;
        let color;
        if (frm.doc.rbg_level > 200) {
            color = 'red';
        } else if (frm.doc.rbg_level < 70) {
            color = 'blue';
        } else {
            color = 'green';
        }
        $rbgField.css('background-color', color);
        $rbgField.css('color', 'white');
    }
}

// Function to save Nurse Interventions and navigate to Doctype with data
function save_and_navigate(frm, doctype_name) {
    frm.save().then(() => {
        const data = {
            'patient_id': frm.doc.patient_unique_id || '',
            'patient_name': frm.doc.patient_name || '',
            'age': frm.doc.age || '',
            'gender': frm.doc.gender || '',
            'community_name': frm.doc.community_name || ''
        };
        frappe.new_doc(doctype_name, data).then(() => {
            frappe.msgprint(__('Nurse Interventions form saved successfully! Navigating to {0} form.', [doctype_name]));
        });
    }).catch((error) => {
        console.error('Failed to save Nurse Interventions:', error);
        frappe.msgprint(__('Failed to save Nurse Interventions form. Please try again.'));
    });
}
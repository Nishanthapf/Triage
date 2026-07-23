// === nurse_interventions.js (original) ===
// Copyright (c) 2025, Nishanth and contributors
// For license information, please see license.txt

frappe.ui.form.on("Nurse Interventions", {
    refresh(frm) {
        // --- 1. Basic Defaults ---
        if (!frm.doc.created_by) {
            frm.set_value("created_by", frappe.session.user_email);
        }
        if (!frm.doc.date) {
            frm.set_value("date", frappe.datetime.now_datetime());
        }

        // --- 2. Button Visibility Logic (from Button Navigation.js) ---
        // Hide all buttons initially
        const buttons = [
            'screening_for_diebetes_button', 'diabetic_follow_up_form', 'button_kapr',
            'hypertension_follow_up_form', 'respiratory_issue_fever_cough_cold_and_headache_form',
            'chest_pain_form', 'abdominal_pain_form', 'diarrhea_form', 'vomiting_form',
            'back_pain_and_neck_pain_form', 'button_klpy', 'leg_or_knee_or_hip_pain_form',
            'foot_and_ankle_pain_form', 'anemia_adolescent_form', 'anemia_children_form',
            'anemia_adults',
            'pregnancy_care_form', 'postnatal_care_form', 'thyroid_problem_form',
            'skin_problem_form', 'button_smfg', 'jaundice_form', 'headache_form',
            'dyspepsia_form', 'fatigue_form', 'eye_problem_form', 'constipation_form'
        ];
        buttons.forEach(btn => frm.set_df_property(btn, 'hidden', 1));

        // Show buttons based on checkboxes
        const dependencyMap = {
            'screening_for_diebetes': 'screening_for_diebetes_button',
            'diabetic_follow_up': 'diabetic_follow_up_form',
            'screening_for_hypertension': 'button_kapr',
            'hypertension_follow_up': 'hypertension_follow_up_form',
            'respiratory_issue': 'respiratory_issue_fever_cough_cold_and_headache_form',
            'chest_pain': 'chest_pain_form',
            'abdominal_pain': 'abdominal_pain_form',
            'diarrhea': 'diarrhea_form',
            'vomiting': 'vomiting_form',
            'back_pain_and_neck_pain': 'back_pain_and_neck_pain_form',
            'shoulder_and_hand_pain': 'button_klpy',
            'leg_or_knee_or_hip_pain': 'leg_or_knee_or_hip_pain_form',
            'foot_and_ankle_pain': 'foot_and_ankle_pain_form',
            'anemia_adolescent': 'anemia_adolescent_form',
            'anemia_children': 'anemia_children_form',
            'anemia': 'anemia_adults',
            'pregnancy_care': 'pregnancy_care_form',
            'postnatal_care': 'postnatal_care_form',
            'thyroid_problem': 'thyroid_problem_form',
            'skin_problem': 'skin_problem_form',
            'lymph_node': 'button_smfg',
            'jaundice': 'jaundice_form',
            'headache': 'headache_form',
            'dyspepsia': 'dyspepsia_form',
            'fatigue': 'fatigue_form',
            'eye_problem': 'eye_problem_form',
            'constipation': 'constipation_form'
        };

        Object.keys(dependencyMap).forEach(checkField => {
            frm.set_df_property(dependencyMap[checkField], 'hidden', !frm.doc[checkField]);
        });

        // --- 3. Initialize Visuals ---
        apply_color_formatting(frm);
        setTimeout(() => {
            calculate_bmi_and_category(frm);
        }, 500);

        // --- 4. Bind Navigation Events ---
        bind_all_navigation(frm);
    },

    // --- Validation Logic ---
    validate: function (frm) {
        if ((frm.doc.screening_for_diebetes || frm.doc.diabetic_follow_up) && !frm.doc.rbg_level) {
            frappe.throw('RBG Level is required for Diabetes-related interventions.');
        }
    },

    // --- BMI Logic Trigger ---
    height: function (frm) {
        if (!frm.doc.height) {
            frappe.msgprint(__('Please enter a valid height'));
            frm.set_value('bmi', '');
            frm.set_value('bmi_category', '');
            apply_bmi_color(frm, true);
            return;
        }
        calculate_bmi_and_category(frm);
    },

    weight: function (frm) {
        if (!frm.doc.weight) {
            frappe.msgprint(__('Please enter a valid weight'));
            frm.set_value('bmi', '');
            frm.set_value('bmi_category', '');
            apply_bmi_color(frm, true);
            return;
        }
        calculate_bmi_and_category(frm);
    },

    // --- Red Flag Alerts & Formatting Triggers ---
    temperature: function (frm) {
        apply_color_formatting(frm); // Update color
        if (frm.doc.temperature > 100) {
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('Fever is more than 100 deg. F') });
        }
    },

    pulse: function (frm) {
        apply_color_formatting(frm);
        let sweating = frm.doc.sweating ? ' with sweating' : '';
        if (frm.doc.pulse < 60) {
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('Low pulse rate - less than 60 at rest' + sweating) });
        } else if (frm.doc.pulse > 100) {
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('High pulse rate - more than 100 at rest' + sweating) });
        }
    },

    saturation: function (frm) {
        apply_color_formatting(frm);
        if (frm.doc.saturation < 90) {
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('SPo2 less than 90') });
        }
    },

    blood_pressure_mmhg: function (frm) {
        apply_color_formatting(frm);
        if (frm.doc.blood_pressure_mmhg > 140) { // Simple check, ideally parse syst/diast
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('Blood pressure high') });
        } else if (frm.doc.blood_pressure_mmhg < 90) {
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('Blood pressure low') });
        }
    },

    rbg_level: function (frm) {
        apply_color_formatting(frm);
        if (frm.doc.rbg_level > 200) {
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('RBS more than 200 mg/dl') });
        } else if (frm.doc.rbg_level < 70) {
            frappe.msgprint({ title: __('Alert'), indicator: 'red', message: __('RBS less than 70 mg/dl') });
        } else if (!frm.doc.rbg_level && frm._user_interacting) {
            frappe.msgprint({ title: __('Alert'), indicator: 'orange', message: __('GRBS not recordable') });
        }
    }
});

// --- Dynamic Checkbox Handlers ---
// Generates handlers like: screening_for_diebetes: function(frm) { ... }
const checkboxFields = [
    'screening_for_diebetes', 'diabetic_follow_up', 'screening_for_hypertension', 'hypertension_follow_up',
    'respiratory_issue', 'chest_pain', 'abdominal_pain', 'diarrhea', 'vomiting', 'back_pain_and_neck_pain',
    'shoulder_and_hand_pain', 'leg_or_knee_or_hip_pain', 'foot_and_ankle_pain', 'anemia_adolescent',
    'anemia_children', 'anemia', 'pregnancy_care', 'postnatal_care', 'thyroid_problem', 'skin_problem',
    'lymph_node', 'jaundice', 'headache', 'dyspepsia', 'fatigue', 'eye_problem', 'constipation'
];
checkboxFields.forEach(field => {
    frappe.ui.form.on('Nurse Interventions', field, function (frm) {
        frm.trigger('refresh'); // Re-run refresh to toggle button visibility
    });
});


// --- Helper Functions ---

function calculate_bmi_and_category(frm) {
    let height = frm.doc.height;
    let weight = frm.doc.weight;

    if (height && weight) {
        let height_in_m = height / 100;
        let bmi = weight / (height_in_m * height_in_m);
        bmi = parseFloat(bmi).toFixed(2);
        frm.set_value('bmi', bmi);

        let category = '';
        if (bmi < 18.5) category = 'Underweight';
        else if (bmi < 25) category = 'Normal';
        else if (bmi < 30) category = 'Overweight';
        else category = 'Obese';

        frm.set_value('bmi_category', category);
        setTimeout(() => { apply_bmi_color(frm); }, 300);
    } else {
        frm.set_value('bmi', '');
        frm.set_value('bmi_category', '');
        apply_bmi_color(frm, true);
    }
}

function apply_bmi_color(frm, clear = false) {
    let category = frm.doc.bmi_category;
    let color = '';
    if (!clear && category) {
        if (category === 'Underweight') color = '#FFC107';
        else if (category === 'Normal') color = '#28A745';
        else if (category === 'Overweight') color = '#FD7E14';
        else if (category === 'Obese') color = '#DC3545';
    }

    // Apply to BMI field
    let bmiField = frm.get_field('bmi');
    if (bmiField) {
        bmiField.$wrapper.find('input, .control-value').css({ "background-color": color || "", "color": color ? "#fff" : "" });
    }
    // Apply to Category field
    let bmiCategoryField = frm.get_field('bmi_category');
    if (bmiCategoryField) {
        bmiCategoryField.$wrapper.find('input, select, .control-value').css({ "background-color": color || "", "color": color ? "#fff" : "" });
    }
}

function apply_color_formatting(frm) {
    [
        { field: 'temperature', fn: v => v > 100 ? 'red' : 'green' },
        { field: 'pulse', fn: v => v > 100 ? 'red' : (v < 60 ? 'blue' : 'green') },
        { field: 'saturation', fn: v => v < 90 ? 'red' : 'green' },
        { field: 'blood_pressure_mmhg', fn: v => v > 140 ? 'red' : (v < 90 ? 'blue' : 'green') },
        { field: 'rbg_level', fn: v => v > 200 ? 'red' : (v < 70 ? 'blue' : 'green') }
    ].forEach(f => {
        if (frm.doc[f.field]) {
            let $field = frm.get_field(f.field).$input;
            if ($field && $field.length) {
                $field.css({ 'background-color': f.fn(frm.doc[f.field]), 'color': 'white', 'font-weight': 'bold' });
            }
        }
    });
}

function bind_all_navigation(frm) {
    const nav_map = [
        { btn: 'screening_for_diebetes_button', doc: 'Screening for Diabetes', idfield: 'patient_unique_id' },
        { btn: 'diabetic_follow_up_form', doc: 'Diabetes Followup', idfield: 'patient_id' },
        { btn: 'button_kapr', doc: 'Screening for Hypertension', idfield: 'patient_id' },
        { btn: 'hypertension_follow_up_form', doc: 'Hypertension Follow up', idfield: 'patient_id' },
        { btn: 'respiratory_issue_fever_cough_cold_and_headache_form', doc: 'Respiratory Issue', idfield: 'patient_id' },
        { btn: 'chest_pain_form', doc: 'Chest Pain', idfield: 'patient_id' },
        { btn: 'abdominal_pain_form', doc: 'Abdominal pain Gastrointestinal', idfield: 'patient_id' },
        { btn: 'diarrhea_form', doc: 'Diarrhea', idfield: 'patient_id' },
        { btn: 'vomiting_form', doc: 'Vomiting', idfield: 'patient_id' },
        { btn: 'back_pain_and_neck_pain_form', doc: 'Back and Neck Pain', idfield: 'patient_id' },
        { btn: 'button_klpy', doc: 'Shoulder and Hand Pain', idfield: 'patient_id' },
        { btn: 'leg_or_knee_or_hip_pain_form', doc: 'Leg or Knee or Hip pain', idfield: 'patient_id' },
        { btn: 'foot_and_ankle_pain_form', doc: 'Foot and Ankle Pain', idfield: 'patient_id' },
        { btn: 'anemia_adolescent_form', doc: 'Anemia-Adolescents', idfield: 'patient_id' },
        { btn: 'anemia_children_form', doc: 'Anemia- Children', idfield: 'patient_id' },
        { btn: 'anemia_adults', doc: 'Anemia - adults', idfield: 'patient_id' },
        { btn: 'pregnancy_care_form', doc: 'Pregnancy Care', idfield: 'patient_id' },
        { btn: 'postnatal_care_form', doc: 'Postnatal Care', idfield: 'patient_id' },
        { btn: 'thyroid_problem_form', doc: 'Thyroid Problem', idfield: 'patient_id' },
        { btn: 'skin_problem_form', doc: 'Skin Problem', idfield: 'patient_id' },
        { btn: 'button_smfg', doc: 'Lymph node Enlargement', idfield: 'patient_id' },
        { btn: 'jaundice_form', doc: 'Jaundice', idfield: 'patient_id' },
        { btn: 'headache_form', doc: 'Headache', idfield: 'patient_id' },
        { btn: 'dyspepsia_form', doc: 'Dyspepsia_Acidity', idfield: 'patient_id' },
        { btn: 'fatigue_form', doc: 'Fatigue', idfield: 'patient_id' },
        { btn: 'eye_problem_form', doc: 'Eye problem', idfield: 'patient_id' },
        { btn: 'constipation_form', doc: 'Constipation', idfield: 'patient_id' }
    ];

    nav_map.forEach(item => {
        const field = frm.fields_dict[item.btn];
        if (!field || !field.wrapper) return;
        const $btn = $(field.wrapper).find('button');
        if (!$btn.length) return;

        $btn.off('click.nurseNav');
        $btn.on('click.nurseNav', function () {
            save_and_navigate(frm, item.doc, item.idfield);
        });
    });
}

function save_and_navigate(frm, doctype_name, patient_id_field) {
    frm.save()
        .then(() => {
            frappe.msgprint({ title: __('Success'), message: __('Nurse Interventions form saved successfully.'), indicator: 'green' });
            const patient_unique_id_value = frm.doc.patient_unique_id ? frm.doc.patient_unique_id.toString() : '';

            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: doctype_name,
                    filters: { [patient_id_field]: patient_unique_id_value },
                    fields: ['name'],
                    limit_page_length: 1
                },
                callback: function (response) {
                    if (response.message && response.message.length > 0) {
                        frappe.set_route('Form', doctype_name, response.message[0].name);
                    } else {
                        let route_options = {
                            patient_name: frm.doc.patient_name || '',
                            patient_unique_id: frm.doc.patient_unique_id || '',
                            age: frm.doc.age || '',
                            gender: frm.doc.gender || '',
                            community_name: frm.doc.community_name || '',
                            temperature: frm.doc.temperature || '',
                            pulse: frm.doc.pulse || '',
                            saturation: frm.doc.saturation || '',
                            bp: frm.doc.bp || '',
                            rbg_level: frm.doc.rbg_level || ''
                        };
                        route_options[patient_id_field] = patient_unique_id_value;
                        frappe.route_options = route_options;
                        frappe.new_doc(doctype_name);
                    }
                }
            });
        })
        .catch(() => {
            frappe.msgprint({ title: __('Error'), message: __('Failed to save form.'), indicator: 'red' });
        });
}

// === Red flag alert message.js ===
frappe.ui.form.on('Nurse Interventions', {
    // When temperature field is changed
    temperature: function (frm) {
        if (frm.doc.temperature > 100) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Fever is more than 100 deg. F')
            });
        }
    },

    // When pulse field is changed
    pulse: function (frm) {
        let sweating = frm.doc.sweating ? ' with sweating' : '';
        if (frm.doc.pulse < 60) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Low pulse rate - less than 60 at rest' + sweating)
            });
        } else if (frm.doc.pulse > 100) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('High pulse rate - more than 100 at rest' + sweating)
            });
        }
    },

    // When saturation field is changed
    saturation: function (frm) {
        if (frm.doc.saturation < 90) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('SPo2 less than 90')
            });
        }
    },

    // When blood_pressure_mmhg field is changed
    blood_pressure_mmhg: function (frm) {
        if (frm.doc.blood_pressure_mmhg < 90) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Blood pressure low')
            });
        } else if (frm.doc.blood_pressure_mmhg > 140) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('Blood pressure high')
            });
        }
    },

    // When rbg_level field is changed
    rbg_level: function (frm) {
        if (frm.doc.rbg_level > 200) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('RBS more than 200 mg/dl')
            });
        } else if (frm.doc.rbg_level < 70) {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('RBS less than 70 mg/dl')
            });
        } else if (!frm.doc.rbg_level || frm.doc.rbg_level === '') {
            frappe.msgprint({
                title: __('Alert'),
                indicator: 'red',
                message: __('GRBS not recordable')
            });
        }
    }
});

// === Nurse Interventions BMI 2.js ===
frappe.ui.form.on("Nurse Interventions", {
    refresh(frm) {
        if (!frm.doc.created_by) {
            frm.set_value("created_by", frappe.session.user_email);
        }

        if (!frm.doc.date) {
            frm.set_value("date", frappe.datetime.now_datetime());
        }
        setTimeout(() => {
            calculate_bmi_and_category(frm);
        }, 500);
    },

    height: function (frm) {
        if (!frm.doc.height) {
            frappe.msgprint(__('Please enter a valid height'));
            frm.set_value('bmi', '');
            frm.set_value('bmi_category', '');
            apply_bmi_color(frm, true);
            return;
        }
        calculate_bmi_and_category(frm);
    },

    weight: function (frm) {
        if (!frm.doc.weight) {
            frappe.msgprint(__('Please enter a valid weight'));
            frm.set_value('bmi', '');
            frm.set_value('bmi_category', '');
            apply_bmi_color(frm, true);
            return;
        }
        calculate_bmi_and_category(frm);
    }
});

function calculate_bmi_and_category(frm) {
    let height = frm.doc.height;
    let weight = frm.doc.weight;

    if (height && weight) {
        let height_in_m = height / 100;
        let bmi = weight / (height_in_m * height_in_m);
        bmi = parseFloat(bmi).toFixed(2);

        frm.set_value('bmi', bmi);

        let category = '';

        if (bmi < 18.5) {
            category = 'Underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            category = 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
            category = 'Overweight';
        } else {
            category = 'Obese';
        }

        frm.set_value('bmi_category', category);

        setTimeout(() => {
            apply_bmi_color(frm);
        }, 300);
    } else {
        frm.set_value('bmi', '');
        frm.set_value('bmi_category', '');
        apply_bmi_color(frm, true);
    }
}

function apply_bmi_color(frm, clear = false) {
    let category = frm.doc.bmi_category;
    let color = '';

    if (!clear) {
        if (category === 'Underweight') {
            color = '#FFC107';
        } else if (category === 'Normal') {
            color = '#28A745';
        } else if (category === 'Overweight') {
            color = '#FD7E14';
        } else if (category === 'Obese') {
            color = '#DC3545';
        }
    }
    let bmiField = frm.get_field('bmi');
    if (bmiField) {
        let target = bmiField.$wrapper.find('input, .control-value');
        target.css({
            "background-color": color || "",
            "color": color ? "#fff" : ""
        });
    }

    let bmiCategoryField = frm.get_field('bmi_category');
    if (bmiCategoryField) {
        let target = bmiCategoryField.$wrapper.find('input, select, .control-value');
        target.css({
            "background-color": color || "",
            "color": color ? "#fff" : ""
        });
    }
}

// === Button Navigation.js ===
// frappe.ui.form.on('Nurse Interventions', {
//     refresh: function(frm) {
//         // Hide all buttons initially
//         [
//             'screening_for_diebetes_button', 'diabetic_follow_up_form', 'button_kapr',
//             'hypertension_follow_up_form', 'respiratory_issue_fever_cough_cold_and_headache_form',
//             'chest_pain_form', 'abdominal_pain_form', 'diarrhea_form', 'vomiting_form',
//             'back_pain_and_neck_pain_form', 'button_klpy', 'leg_or_knee_or_hip_pain_form',
//             'foot_and_ankle_pain_form', 'anemia_adolescent_form', 'anemia_children_form',
//             'pregnancy_care_form', 'postnatal_care_form', 'thyroid_problem_form',
//             'skin_problem_form', 'button_smfg', 'jaundice_form', 'headache_form',
//             'dyspepsia_form', 'fatigue_form', 'eye_problem_form', 'constipation_form'
//         ].forEach(btn => frm.set_df_property(btn, 'hidden', 1));

//         // Show buttons based on checkboxes
//         frm.set_df_property('screening_for_diebetes_button', 'hidden', !frm.doc.screening_for_diebetes);
//         frm.set_df_property('diabetic_follow_up_form', 'hidden', !frm.doc.diabetic_follow_up);
//         frm.set_df_property('button_kapr', 'hidden', !frm.doc.screening_for_hypertension);
//         frm.set_df_property('hypertension_follow_up_form', 'hidden', !frm.doc.hypertension_follow_up);
//         frm.set_df_property('respiratory_issue_fever_cough_cold_and_headache_form', 'hidden', !frm.doc.respiratory_issue);
//         frm.set_df_property('chest_pain_form', 'hidden', !frm.doc.chest_pain);
//         frm.set_df_property('abdominal_pain_form', 'hidden', !frm.doc.abdominal_pain);
//         frm.set_df_property('diarrhea_form', 'hidden', !frm.doc.diarrhea);
//         frm.set_df_property('vomiting_form', 'hidden', !frm.doc.vomiting);
//         frm.set_df_property('back_pain_and_neck_pain_form', 'hidden', !frm.doc.back_pain_and_neck_pain);
//         frm.set_df_property('button_klpy', 'hidden', !frm.doc.shoulder_and_hand_pain);
//         frm.set_df_property('leg_or_knee_or_hip_pain_form', 'hidden', !frm.doc.leg_or_knee_or_hip_pain);
//         frm.set_df_property('foot_and_ankle_pain_form', 'hidden', !frm.doc.foot_and_ankle_pain);
//         frm.set_df_property('anemia_adolescent_form', 'hidden', !frm.doc.anemia_adolescent);
//         frm.set_df_property('anemia_children_form', 'hidden', !frm.doc.anemia_children);
//         frm.set_df_property('pregnancy_care_form', 'hidden', !frm.doc.pregnancy_care);
//         frm.set_df_property('postnatal_care_form', 'hidden', !frm.doc.postnatal_care);
//         frm.set_df_property('thyroid_problem_form', 'hidden', !frm.doc.thyroid_problem);
//         frm.set_df_property('skin_problem_form', 'hidden', !frm.doc.skin_problem);
//         frm.set_df_property('button_smfg', 'hidden', !frm.doc.lymph_node);
//         frm.set_df_property('jaundice_form', 'hidden', !frm.doc.jaundice);
//         frm.set_df_property('headache_form', 'hidden', !frm.doc.headache);
//         frm.set_df_property('dyspepsia_form', 'hidden', !frm.doc.dyspepsia);
//         frm.set_df_property('fatigue_form', 'hidden', !frm.doc.fatigue);
//         frm.set_df_property('eye_problem_form', 'hidden', !frm.doc.eye_problem);
//         frm.set_df_property('constipation_form', 'hidden', !frm.doc.constipation);

//         apply_color_formatting(frm);

//         // Always bind navigation with save, every refresh
//         bind_all_navigation(frm);
//     },

//     // All checkbox onchange logic unchanged...
//     screening_for_diebetes: function(frm) { frm.set_df_property('screening_for_diebetes_button', 'hidden', !frm.doc.screening_for_diebetes); },
//     diabetic_follow_up: function(frm) { frm.set_df_property('diabetic_follow_up_form', 'hidden', !frm.doc.diabetic_follow_up); },
//     screening_for_hypertension: function(frm) { frm.set_df_property('button_kapr', 'hidden', !frm.doc.screening_for_hypertension); },
//     hypertension_follow_up: function(frm) { frm.set_df_property('hypertension_follow_up_form', 'hidden', !frm.doc.hypertension_follow_up); },
//     respiratory_issue: function(frm) { frm.set_df_property('respiratory_issue_fever_cough_cold_and_headache_form', 'hidden', !frm.doc.respiratory_issue); },
//     chest_pain: function(frm) { frm.set_df_property('chest_pain_form', 'hidden', !frm.doc.chest_pain); },
//     abdominal_pain: function(frm) { frm.set_df_property('abdominal_pain_form', 'hidden', !frm.doc.abdominal_pain); },
//     diarrhea: function(frm) { frm.set_df_property('diarrhea_form', 'hidden', !frm.doc.diarrhea); },
//     vomiting: function(frm) { frm.set_df_property('vomiting_form', 'hidden', !frm.doc.vomiting); },
//     back_pain_and_neck_pain: function(frm) { frm.set_df_property('back_pain_and_neck_pain_form', 'hidden', !frm.doc.back_pain_and_neck_pain); },
//     shoulder_and_hand_pain: function(frm) { frm.set_df_property('button_klpy', 'hidden', !frm.doc.shoulder_and_hand_pain); },
//     leg_or_knee_or_hip_pain: function(frm) { frm.set_df_property('leg_or_knee_or_hip_pain_form', 'hidden', !frm.doc.leg_or_knee_or_hip_pain); },
//     foot_and_ankle_pain: function(frm) { frm.set_df_property('foot_and_ankle_pain_form', 'hidden', !frm.doc.foot_and_ankle_pain); },
//     anemia_adolescent: function(frm) { frm.set_df_property('anemia_adolescent_form', 'hidden', !frm.doc.anemia_adolescent); },
//     anemia_children: function(frm) { frm.set_df_property('anemia_children_form', 'hidden', !frm.doc.anemia_children); },
//     pregnancy_care: function(frm) { frm.set_df_property('pregnancy_care_form', 'hidden', !frm.doc.pregnancy_care); },
//     postnatal_care: function(frm) { frm.set_df_property('postnatal_care_form', 'hidden', !frm.doc.postnatal_care); },
//     thyroid_problem: function(frm) { frm.set_df_property('thyroid_problem_form', 'hidden', !frm.doc.thyroid_problem); },
//     skin_problem: function(frm) { frm.set_df_property('skin_problem_form', 'hidden', !frm.doc.skin_problem); },
//     lymph_node: function(frm) { frm.set_df_property('button_smfg', 'hidden', !frm.doc.lymph_node); },
//     jaundice: function(frm) { frm.set_df_property('jaundice_form', 'hidden', !frm.doc.jaundice); },
//     headache: function(frm) { frm.set_df_property('headache_form', 'hidden', !frm.doc.headache); },
//     dyspepsia: function(frm) { frm.set_df_property('dyspepsia_form', 'hidden', !frm.doc.dyspepsia); },
//     fatigue: function(frm) { frm.set_df_property('fatigue_form', 'hidden', !frm.doc.fatigue); },
//     eye_problem: function(frm) { frm.set_df_property('eye_problem_form', 'hidden', !frm.doc.eye_problem); },
//     constipation: function(frm) { frm.set_df_property('constipation_form', 'hidden', !frm.doc.constipation); },

//     validate: function(frm) {
//         if ((frm.doc.screening_for_diebetes || frm.doc.diabetic_follow_up) && !frm.doc.rbg_level) {
//             frappe.throw('RBG Level is required for Diabetes-related interventions.');
//         }
//     }
// });

// function apply_color_formatting(frm) {
//     [
//         { field: 'temperature', fn: v => v < 100 ? 'green' : 'red' },
//         { field: 'pulse', fn: v => v > 100 ? 'red' : (v < 60 ? 'blue' : 'green') },
//         { field: 'saturation', fn: v => v < 90 ? 'red' : 'green' },
//         { field: 'blood_pressure_mmhg', fn: v => v > 140 ? 'red' : (v < 90 ? 'blue' : 'green') },
//         { field: 'rbg_level', fn: v => v > 200 ? 'red' : (v < 70 ? 'blue' : 'green') }
//     ].forEach(f => {
//         if (frm.doc[f.field]) {
//             let $field = frm.get_field(f.field).$input;
//             $field.css({ 'background-color': f.fn(frm.doc[f.field]), 'color': 'white' });
//         }
//     });
// }

// function bind_all_navigation(frm) {
//     const nav_map = [
//         {btn: 'screening_for_diebetes_button', doc: 'Screening for Diabetes',          idfield: 'patient_unique_id'},
//         {btn: 'diabetic_follow_up_form',      doc: 'Diabetes Followup',                idfield: 'patient_id'},
//         {btn: 'button_kapr',                  doc: 'Screening for Hypertension',       idfield: 'patient_id'},
//         {btn: 'hypertension_follow_up_form',  doc: 'Hypertension Follow up',           idfield: 'patient_id'},
//         {btn: 'respiratory_issue_fever_cough_cold_and_headache_form', doc: 'Respiratory Issue', idfield: 'patient_id'},
//         {btn: 'chest_pain_form',              doc: 'Chest Pain',                       idfield: 'patient_id'},
//         {btn: 'abdominal_pain_form',          doc: 'Abdominal pain Gastrointestinal',  idfield: 'patient_id'},
//         {btn: 'diarrhea_form',                doc: 'Diarrhea',                         idfield: 'patient_id'},
//         {btn: 'vomiting_form',                doc: 'Vomiting',                         idfield: 'patient_id'},
//         {btn: 'back_pain_and_neck_pain_form', doc: 'Back and Neck Pain',               idfield: 'patient_id'},
//         {btn: 'button_klpy',                  doc: 'Shoulder and Hand Pain',           idfield: 'patient_id'},
//         {btn: 'leg_or_knee_or_hip_pain_form', doc: 'Leg or Knee or Hip pain',          idfield: 'patient_id'},
//         {btn: 'foot_and_ankle_pain_form',     doc: 'Foot and Ankle Pain',              idfield: 'patient_id'},
//         {btn: 'anemia_adolescent_form',       doc: 'Anemia-Adolescents',               idfield: 'patient_id'},
//         {btn: 'anemia_children_form',         doc: 'Anemia- Children',                 idfield: 'patient_id'},
//         {btn: 'pregnancy_care_form',          doc: 'Pregnancy Care',                   idfield: 'patient_id'},
//         {btn: 'postnatal_care_form',          doc: 'Postnatal Care',                   idfield: 'patient_id'},
//         {btn: 'thyroid_problem_form',         doc: 'Thyroid Problem',                  idfield: 'patient_id'},
//         {btn: 'skin_problem_form',            doc: 'Skin Problem',                     idfield: 'patient_id'},
//         {btn: 'button_smfg',                  doc: 'Lymph node Enlargement',           idfield: 'patient_id'},
//         {btn: 'jaundice_form',                doc: 'Jaundice',                         idfield: 'patient_id'},
//         {btn: 'headache_form',                doc: 'Headache',                         idfield: 'patient_id'},
//         {btn: 'dyspepsia_form',               doc: 'Dyspepsia_Acidity',                idfield: 'patient_id'},
//         {btn: 'fatigue_form',                 doc: 'Fatigue',                          idfield: 'patient_id'},
//         {btn: 'eye_problem_form',             doc: 'Eye problem',                      idfield: 'patient_id'},
//         {btn: 'constipation_form',            doc: 'Constipation',                     idfield: 'patient_id'}
//     ];

//     nav_map.forEach(item => {
//         if (frm.fields_dict[item.btn]) {
//             frm.fields_dict[item.btn].$input.off('click').on('click', function() {
//                 // Save and navigate, even if no changes were made
//                 save_and_navigate(frm, item.doc, item.idfield);
//             });
//         }
//     });
// }

// function save_and_navigate(frm, doctype_name, patient_id_field) {
//     frm.save()
//         .then(() => {
//             // Show user feedback for successful save
//             frappe.msgprint({
//                 title: 'Success',
//                 message: 'Nurse Interventions form saved successfully.',
//                 indicator: 'green'
//             });

//             // Check if a record exists for the given doctype using patient_unique_id
//             const patient_unique_id_value = frm.doc.patient_unique_id ? frm.doc.patient_unique_id.toString() : '';

//             frappe.call({
//                 method: 'frappe.client.get_list',
//                 args: {
//                     doctype: doctype_name,
//                     filters: {
//                         [patient_id_field]: patient_unique_id_value
//                     },
//                     fields: ['name'],
//                     limit_page_length: 1
//                 },
//                 callback: function(response) {
//                     if (response.message && response.message.length > 0) {
//                         // Record exists, fetch full document
//                         frappe.call({
//                             method: 'frappe.client.get',
//                             args: {
//                                 doctype: doctype_name,
//                                 name: response.message[0].name
//                             },
//                             callback: function(full_response) {
//                                 if (full_response.message) {
//                                     // Open the form with full data
//                                     frappe.route_options = full_response.message;
//                                     frappe.set_route('Form', doctype_name, response.message[0].name);
//                                 }
//                             }
//                         });
//                     } else {
//                         // No record exists, create a new form with pre-filled details
//                         let route_options = {
//                             patient_name: frm.doc.patient_name || '',
//                             age: frm.doc.age || '',
//                             gender: frm.doc.gender || '',
//                             community_name: frm.doc.community_name || '',
//                             temperature: frm.doc.temperature || '',
//                             pulse: frm.doc.pulse || '',
//                             saturation: frm.doc.saturation || '',
//                             blood_pressure_mmhg: frm.doc.blood_pressure_mmhg || '',
//                             rbg_level: frm.doc.rbg_level || '',
//                             screening_for_diebetes: frm.doc.screening_for_diebetes || 0,
//                             diabetic_follow_up: frm.doc.diabetic_follow_up || 0,
//                             screening_for_hypertension: frm.doc.screening_for_hypertension || 0,
//                             hypertension_follow_up: frm.doc.hypertension_follow_up || 0,
//                             respiratory_issue: frm.doc.respiratory_issue || 0,
//                             chest_pain: frm.doc.chest_pain || 0,
//                             abdominal_pain: frm.doc.abdominal_pain || 0,
//                             diarrhea: frm.doc.diarrhea || 0,
//                             vomiting: frm.doc.vomiting || 0,
//                             back_pain_and_neck_pain: frm.doc.back_pain_and_neck_pain || 0,
//                             shoulder_and_hand_pain: frm.doc.shoulder_and_hand_pain || 0,
//                             leg_or_knee_or_hip_pain: frm.doc.leg_or_knee_or_hip_pain || 0,
//                             foot_and_ankle_pain: frm.doc.foot_and_ankle_pain || 0,
//                             anemia_adolescent: frm.doc.anemia_adolescent || 0,
//                             anemia_children: frm.doc.anemia_children || 0,
//                             pregnancy_care: frm.doc.pregnancy_care || 0,
//                             postnatal_care: frm.doc.postnatal_care || 0,
//                             thyroid_problem: frm.doc.thyroid_problem || 0,
//                             skin_problem: frm.doc.skin_problem || 0,
//                             lymph_node: frm.doc.lymph_node || 0,
//                             jaundice: frm.doc.jaundice || 0,
//                             headache: frm.doc.headache || 0,
//                             dyspepsia: frm.doc.dyspepsia || 0,
//                             fatigue: frm.doc.fatigue || 0,
//                             eye_problem: frm.doc.eye_problem || 0,
//                             constipation: frm.doc.constipation || 0
//                         };
//                         route_options[patient_id_field] = patient_unique_id_value;
//                         frappe.route_options = route_options;
//                         frappe.new_doc(doctype_name);
//                     }
//                 },
//                 error: function(error) {
//                     frappe.msgprint({
//                         title: 'Error',
//                         message: `Failed to check for existing ${doctype_name} record. Please verify the field '${patient_id_field}' exists and is queryable. Error: ${error.message || 'No detailed error'}`,
//                         indicator: 'red'
//                     });
//                 }
//             });
//         })
//         .catch((error) => {
//             frappe.msgprint({
//                 title: 'Error',
//                 message: 'Failed to save Nurse Interventions form. Please try again.',
//                 indicator: 'red'
//             });
//         });
// }





frappe.ui.form.on('Nurse Interventions', {
    refresh: function (frm) {
        // Hide all buttons initially
        [
            'screening_for_diebetes_button', 'diabetic_follow_up_form', 'button_kapr',
            'hypertension_follow_up_form', 'respiratory_issue_fever_cough_cold_and_headache_form',
            'chest_pain_form', 'abdominal_pain_form', 'diarrhea_form', 'vomiting_form',
            'back_pain_and_neck_pain_form', 'button_klpy', 'leg_or_knee_or_hip_pain_form',
            'foot_and_ankle_pain_form', 'anemia_adolescent_form', 'anemia_children_form',
            'anemia_adults',  // New button for Anemia - adults
            'pregnancy_care_form', 'postnatal_care_form', 'thyroid_problem_form',
            'skin_problem_form', 'button_smfg', 'jaundice_form', 'headache_form',
            'dyspepsia_form', 'fatigue_form', 'eye_problem_form', 'constipation_form'
        ].forEach(btn => frm.set_df_property(btn, 'hidden', 1));

        // Show buttons based on corresponding checkboxes
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
        frm.set_df_property('anemia_adults', 'hidden', !frm.doc.anemia);  // Controlled by 'anemia' checkbox
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

        apply_color_formatting(frm);
        bind_all_navigation(frm);  // Re-bind navigation on every refresh
    },

    // Checkbox onchange handlers
    screening_for_diebetes: function (frm) { frm.set_df_property('screening_for_diebetes_button', 'hidden', !frm.doc.screening_for_diebetes); },
    diabetic_follow_up: function (frm) { frm.set_df_property('diabetic_follow_up_form', 'hidden', !frm.doc.diabetic_follow_up); },
    screening_for_hypertension: function (frm) { frm.set_df_property('button_kapr', 'hidden', !frm.doc.screening_for_hypertension); },
    hypertension_follow_up: function (frm) { frm.set_df_property('hypertension_follow_up_form', 'hidden', !frm.doc.hypertension_follow_up); },
    respiratory_issue: function (frm) { frm.set_df_property('respiratory_issue_fever_cough_cold_and_headache_form', 'hidden', !frm.doc.respiratory_issue); },
    chest_pain: function (frm) { frm.set_df_property('chest_pain_form', 'hidden', !frm.doc.chest_pain); },
    abdominal_pain: function (frm) { frm.set_df_property('abdominal_pain_form', 'hidden', !frm.doc.abdominal_pain); },
    diarrhea: function (frm) { frm.set_df_property('diarrhea_form', 'hidden', !frm.doc.diarrhea); },
    vomiting: function (frm) { frm.set_df_property('vomiting_form', 'hidden', !frm.doc.vomiting); },
    back_pain_and_neck_pain: function (frm) { frm.set_df_property('back_pain_and_neck_pain_form', 'hidden', !frm.doc.back_pain_and_neck_pain); },
    shoulder_and_hand_pain: function (frm) { frm.set_df_property('button_klpy', 'hidden', !frm.doc.shoulder_and_hand_pain); },
    leg_or_knee_or_hip_pain: function (frm) { frm.set_df_property('leg_or_knee_or_hip_pain_form', 'hidden', !frm.doc.leg_or_knee_or_hip_pain); },
    foot_and_ankle_pain: function (frm) { frm.set_df_property('foot_and_ankle_pain_form', 'hidden', !frm.doc.foot_and_ankle_pain); },
    anemia_adolescent: function (frm) { frm.set_df_property('anemia_adolescent_form', 'hidden', !frm.doc.anemia_adolescent); },
    anemia_children: function (frm) { frm.set_df_property('anemia_children_form', 'hidden', !frm.doc.anemia_children); },
    anemia: function (frm) { frm.set_df_property('anemia_adults', 'hidden', !frm.doc.anemia); },  // New handler
    pregnancy_care: function (frm) { frm.set_df_property('pregnancy_care_form', 'hidden', !frm.doc.pregnancy_care); },
    postnatal_care: function (frm) { frm.set_df_property('postnatal_care_form', 'hidden', !frm.doc.postnatal_care); },
    thyroid_problem: function (frm) { frm.set_df_property('thyroid_problem_form', 'hidden', !frm.doc.thyroid_problem); },
    skin_problem: function (frm) { frm.set_df_property('skin_problem_form', 'hidden', !frm.doc.skin_problem); },
    lymph_node: function (frm) { frm.set_df_property('button_smfg', 'hidden', !frm.doc.lymph_node); },
    jaundice: function (frm) { frm.set_df_property('jaundice_form', 'hidden', !frm.doc.jaundice); },
    headache: function (frm) { frm.set_df_property('headache_form', 'hidden', !frm.doc.headache); },
    dyspepsia: function (frm) { frm.set_df_property('dyspepsia_form', 'hidden', !frm.doc.dyspepsia); },
    fatigue: function (frm) { frm.set_df_property('fatigue_form', 'hidden', !frm.doc.fatigue); },
    eye_problem: function (frm) { frm.set_df_property('eye_problem_form', 'hidden', !frm.doc.eye_problem); },
    constipation: function (frm) { frm.set_df_property('constipation_form', 'hidden', !frm.doc.constipation); },

    validate: function (frm) {
        if ((frm.doc.screening_for_diebetes || frm.doc.diabetic_follow_up) && !frm.doc.rbg_level) {
            frappe.throw('RBS Level is required for Diabetes-related interventions.');
        }
    }
});

function apply_color_formatting(frm) {
    [
        { field: 'temperature', fn: v => v > 100 ? 'red' : 'green' },
        { field: 'pulse', fn: v => v > 100 ? 'red' : (v < 60 ? 'blue' : 'green') },
        { field: 'saturation', fn: v => v < 90 ? 'red' : 'green' },
        { field: 'blood_pressure_mmhg', fn: v => v > 140 ? 'red' : (v < 90 ? 'blue' : 'green') },
        { field: 'rbg_level', fn: v => v > 200 ? 'red' : (v < 70 ? 'blue' : 'green') }
    ].forEach(f => {
        if (frm.doc[f.field]) {
            let $field = frm.get_field(f.field).$input;
            if ($field && $field.length) {
                $field.css({ 'background-color': f.fn(frm.doc[f.field]), 'color': 'white', 'font-weight': 'bold' });
            }
        }
    });
}

function bind_all_navigation(frm) {
    const nav_map = [
        { btn: 'screening_for_diebetes_button', doc: 'Screening for Diabetes', idfield: 'patient_unique_id' },
        { btn: 'diabetic_follow_up_form', doc: 'Diabetes Followup', idfield: 'patient_id' },
        { btn: 'button_kapr', doc: 'Screening for Hypertension', idfield: 'patient_id' },
        { btn: 'hypertension_follow_up_form', doc: 'Hypertension Follow up', idfield: 'patient_id' },
        { btn: 'respiratory_issue_fever_cough_cold_and_headache_form', doc: 'Respiratory Issue', idfield: 'patient_id' },
        { btn: 'chest_pain_form', doc: 'Chest Pain', idfield: 'patient_id' },
        { btn: 'abdominal_pain_form', doc: 'Abdominal pain Gastrointestinal', idfield: 'patient_id' },
        { btn: 'diarrhea_form', doc: 'Diarrhea', idfield: 'patient_id' },
        { btn: 'vomiting_form', doc: 'Vomiting', idfield: 'patient_id' },
        { btn: 'back_pain_and_neck_pain_form', doc: 'Back and Neck Pain', idfield: 'patient_id' },
        { btn: 'button_klpy', doc: 'Shoulder and Hand Pain', idfield: 'patient_id' },
        { btn: 'leg_or_knee_or_hip_pain_form', doc: 'Leg or Knee or Hip pain', idfield: 'patient_id' },
        { btn: 'foot_and_ankle_pain_form', doc: 'Foot and Ankle Pain', idfield: 'patient_id' },
        { btn: 'anemia_adolescent_form', doc: 'Anemia-Adolescents', idfield: 'patient_id' },
        { btn: 'anemia_children_form', doc: 'Anemia- Children', idfield: 'patient_id' },
        { btn: 'anemia_adults', doc: 'Anemia - adults', idfield: 'patient_id' },
        { btn: 'pregnancy_care_form', doc: 'Pregnancy Care', idfield: 'patient_id' },
        { btn: 'postnatal_care_form', doc: 'Postnatal Care', idfield: 'patient_id' },
        { btn: 'thyroid_problem_form', doc: 'Thyroid Problem', idfield: 'patient_id' },
        { btn: 'skin_problem_form', doc: 'Skin Problem', idfield: 'patient_id' },
        { btn: 'button_smfg', doc: 'Lymph node Enlargement', idfield: 'patient_id' },
        { btn: 'jaundice_form', doc: 'Jaundice', idfield: 'patient_id' },
        { btn: 'headache_form', doc: 'Headache', idfield: 'patient_id' },
        { btn: 'dyspepsia_form', doc: 'Dyspepsia_Acidity', idfield: 'patient_id' },
        { btn: 'fatigue_form', doc: 'Fatigue', idfield: 'patient_id' },
        { btn: 'eye_problem_form', doc: 'Eye problem', idfield: 'patient_id' },
        { btn: 'constipation_form', doc: 'Constipation', idfield: 'patient_id' }
    ];

    nav_map.forEach(item => {
        const field = frm.fields_dict[item.btn];

        if (!field || !field.wrapper) return;

        const $btn = $(field.wrapper).find('button');

        if (!$btn.length) return;

        // 🔒 Prevent multiple bindings
        $btn.off('click.nurseNav');

        $btn.on('click.nurseNav', function () {
            save_and_navigate(frm, item.doc, item.idfield);
        });
    });
}


function save_and_navigate(frm, doctype_name, patient_id_field) {
    frm.save()
        .then(() => {
            frappe.msgprint({
                title: __('Success'),
                message: __('Nurse Interventions form saved successfully.'),
                indicator: 'green'
            });

            const patient_unique_id_value = frm.doc.patient_unique_id ? frm.doc.patient_unique_id.toString() : '';

            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: doctype_name,
                    filters: {
                        [patient_id_field]: patient_unique_id_value
                    },
                    fields: ['name'],
                    limit_page_length: 1
                },
                callback: function (response) {
                    if (response.message && response.message.length > 0) {
                        // Existing record found → open it
                        frappe.set_route('Form', doctype_name, response.message[0].name);
                    } else {
                        // No record → create new with pre-filled data
                        let route_options = {
                            patient_name: frm.doc.patient_name || '',
                            patient_unique_id: frm.doc.patient_unique_id || '',
                            age: frm.doc.age || '',
                            gender: frm.doc.gender || '',
                            community_name: frm.doc.community_name || '',
                            temperature: frm.doc.temperature || '',
                            pulse: frm.doc.pulse || '',
                            saturation: frm.doc.saturation || '',
                            bp: frm.doc.bp || '',
                            rbg_level: frm.doc.rbg_level || ''
                        };
                        // Add patient ID field
                        route_options[patient_id_field] = patient_unique_id_value;

                        frappe.route_options = route_options;
                        frappe.new_doc(doctype_name);
                    }
                },
                error: function (err) {
                    frappe.msgprint({
                        title: __('Error'),
                        message: __('Failed to check existing record. Error: ') + (err.message || 'Unknown'),
                        indicator: 'red'
                    });
                }
            });
        })
        .catch(() => {
            frappe.msgprint({
                title: __('Error'),
                message: __('Failed to save Nurse Interventions form.'),
                indicator: 'red'
            });
        });
}

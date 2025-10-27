frappe.ui.form.on('Shoulder and Hand Pain', {
    refresh(frm) {
        console.log("Script loaded"); // Debug
        frm.toggle_display("red_flags_section", true); // Always show red_flags_section
        frm.trigger("toggle_shoulder_and_hand_pain_field");
        frm.trigger("toggle_sections");
    },

    // Symptom checkboxes → trigger red flags and control shoulder_and_hand_pain visibility
    left_shoulder_rediatingto(frm) {
        show_red_flag(frm, 'left_shoulder_rediatingto');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    chest_pain(frm) {
        show_red_flag(frm, 'chest_pain');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    sweating(frm) {
        show_red_flag(frm, 'sweating');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    nausea_vomiting(frm) {
        show_red_flag(frm, 'nausea_vomiting');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    any_history_of_trauma_or_fall(frm) {
        show_red_flag(frm, 'any_history_of_trauma_or_fall');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    sever_sweeling_or_redness_of_the_affected_joint(frm) {
        show_red_flag(frm, 'sever_sweeling_or_redness_of_the_affected_joint');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    not_able_to_move_affected_part(frm) {
        show_red_flag(frm, 'not_able_to_move_affected_part');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    change_in_vital_signs_with_these_pains(frm) {
        show_red_flag(frm, 'change_in_vital_signs_with_these_pains');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    numbness_or_tingling_of_hands(frm) {
        show_red_flag(frm, 'numbness_or_tingling_of_hands');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    sudden_onset_of_pain(frm) {
        show_red_flag(frm, 'sudden_onset_of_pain');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },
    none_shoulder_hand_pain(frm) {
        show_red_flag(frm, 'none_shoulder_hand_pain');
        frm.trigger("toggle_shoulder_and_hand_pain_field");
    },

    // Screening select → controls section visibility
    shoulder_and_hand_pain(frm) {
        frm.trigger("toggle_sections");
    },

    // Show shoulder_and_hand_pain field if any red flag condition is met
    toggle_shoulder_and_hand_pain_field(frm) {
        let show = (
            frm.doc.left_shoulder_rediatingto ||
            frm.doc.chest_pain ||
            frm.doc.sweating ||
            frm.doc.nausea_vomiting ||
            frm.doc.any_history_of_trauma_or_fall ||
            frm.doc.sever_sweeling_or_redness_of_the_affected_joint ||
            frm.doc.not_able_to_move_affected_part ||
            frm.doc.change_in_vital_signs_with_these_pains ||
            frm.doc.numbness_or_tingling_of_hands ||
            frm.doc.sudden_onset_of_pain ||
            frm.doc.none_shoulder_hand_pain
        );

        frm.toggle_display("shoulder_and_hand_pain", show);

        if (show) {
            frm.set_df_property("shoulder_and_hand_pain", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("shoulder_and_hand_pain", "options", ["Yes", "No"]);
        } else {
            frm.set_value("shoulder_and_hand_pain", "");
        }
    },

    // Show/hide form sections based on shoulder_and_hand_pain
    toggle_sections(frm) {
        let show_sections = (frm.doc.shoulder_and_hand_pain === "Yes");
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("column_break_zecv", show_sections);
        frm.toggle_display("check_tfiz", show_sections);
        frm.toggle_display("check_rnxv", show_sections);
    },

    // Validation → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        if (frm.doc.shoulder_and_hand_pain === "Yes") {
            if (!frm.doc.check_tfiz) frappe.throw("You didn’t complete Section Present Complaints");
            if (!frm.doc.check_rnxv) frappe.throw("You didn’t complete Section Associated Complaints");
        }
    }
});

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        left_shoulder_rediatingto: {
            refer: "Tertiary health care centre",
            message: "Could be MI (Myocardial Infarction)."
        },
        chest_pain: {
            refer: "Tertiary health care centre",
            message: "Could indicate cardiac event, further evaluation needed."
        },
        sweating: {
            refer: "Tertiary health care centre",
            message: "Could indicate cardiac event, further evaluation needed."
        },
        nausea_vomiting: {
            refer: "Tertiary health care centre",
            message: "Could indicate cardiac event, further evaluation needed."
        },
        any_history_of_trauma_or_fall: {
            refer: "Tertiary health care centre",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        sever_sweeling_or_redness_of_the_affected_joint: {
            refer: "Tertiary health care centre",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        not_able_to_move_affected_part: {
            refer: "Tertiary health care centre",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        change_in_vital_signs_with_these_pains: {
            refer: "Tertiary health care centre",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        numbness_or_tingling_of_hands: {
            refer: "Tertiary health care centre",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        sudden_onset_of_pain: {
            refer: "Tertiary health care centre",
            message: "Sudden onset of pain requires further investigation."
        },
        none_shoulder_hand_pain: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    if (frm.doc[fieldname] && fieldname !== "none_shoulder_hand_pain") {
        let info = red_flags[fieldname];
        if (info) {
            frappe.msgprint({
                title: "Red Flag Warning",
                message: `<b>Refer to:</b> ${info.refer}<br><b>Note:</b> ${info.message}`,
                indicator: "red"
            });
        }
    }
}

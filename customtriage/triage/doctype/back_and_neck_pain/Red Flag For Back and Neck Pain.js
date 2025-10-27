frappe.ui.form.on('Back and Neck Pain', {
    refresh(frm) {
        // Initialize form by triggering visibility and section toggles
        console.log("Script loaded"); // Debugging
        frm.toggle_display("red_flags_section", true); // Always show red_flags_section
        frm.trigger("toggle_back_and_neck_pain_field");
        frm.trigger("toggle_sections");
    },

    // Symptom checkboxes → trigger red flags and control back_and_neck_pain visibility
    exercises_morethen_5days(frm) {
        show_red_flag(frm, 'exercises_morethen_5days');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    sudden_onset_back_pain(frm) {
        show_red_flag(frm, 'sudden_onset_back_pain');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    numbness_or_tingling_of_legs_or_hands(frm) {
        show_red_flag(frm, 'numbness_or_tingling_of_legs_or_hands');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    weakness_in_the_legs_or_hands(frm) {
        show_red_flag(frm, 'weakness_in_the_legs_or_hands');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    any_bowel_or_bladder_dysfunction(frm) {
        show_red_flag(frm, 'any_bowel_or_bladder_dysfunction');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    any_abnormal_gait(frm) {
        show_red_flag(frm, 'any_abnormal_gait');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    any_fever_or_unexplained_weight_loss(frm) {
        show_red_flag(frm, 'any_fever_or_unexplained_weight_loss');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    any_history_of_trauma_or_fall(frm) {
        show_red_flag(frm, 'any_history_of_trauma_or_fall');
        frm.trigger("toggle_back_and_neck_pain_field");
    },
    none_back_neck_pain(frm) {
        show_red_flag(frm, 'none_back_neck_pain');
        frm.trigger("toggle_back_and_neck_pain_field");
    },

    // Screening select → controls section visibility
    back_and_neck_pain(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show back_and_neck_pain field if any red flag condition is met
    toggle_back_and_neck_pain_field(frm) {
        let show = (
            frm.doc.exercises_morethen_5days ||
            frm.doc.sudden_onset_back_pain ||
            frm.doc.numbness_or_tingling_of_legs_or_hands ||
            frm.doc.weakness_in_the_legs_or_hands ||
            frm.doc.any_bowel_or_bladder_dysfunction ||
            frm.doc.any_abnormal_gait ||
            frm.doc.any_fever_or_unexplained_weight_loss ||
            frm.doc.any_history_of_trauma_or_fall ||
            frm.doc.none_back_neck_pain
        );

        console.log("toggle_back_and_neck_pain_field: show =", show, "back_and_neck_pain =", frm.doc.back_and_neck_pain); // Debugging
        frm.toggle_display("back_and_neck_pain", show);

        if (show) {
            frm.set_df_property("back_and_neck_pain", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("back_and_neck_pain", "options", ["Yes", "No"]);
        } else {
            frm.set_value("back_and_neck_pain", "");
        }
    },

    // Helper: Show/hide form sections and checkboxes based on back_and_neck_pain
    toggle_sections(frm) {
        let show_sections = (frm.doc.back_and_neck_pain === "Yes");
        console.log("toggle_sections: show_sections =", show_sections); // Debugging

        // Toggle visibility of section breaks (except red_flags_section, which is always visible)
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("section_break_cvvz", show_sections);

        // Toggle visibility of section completion checkboxes
        frm.toggle_display("check_eizy", show_sections);
        frm.toggle_display("check_mtyy", show_sections);
    },

    // Validation before save → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        console.log("Validation triggered", frm.doc); // Debugging
        console.log("back_and_neck_pain field value:", frm.doc.back_and_neck_pain); // Debugging
        console.log("check_eizy:", frm.doc.check_eizy); // Debugging
        console.log("check_mtyy:", frm.doc.check_mtyy); // Debugging

        if (frm.doc.back_and_neck_pain === "Yes") {
            if (!frm.doc.check_eizy) {
                frappe.throw("You didn’t complete Section Present Complaints and Associated Complaints");
            }
            if (!frm.doc.check_mtyy) {
                frappe.throw("You didn’t complete Section Family History and Physical Examination");
            }
        }
    }
});

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        exercises_morethen_5days: {
            refer: "Health centre/PHC/CHC",
            message: "Any back or neck pain not subsiding with pain killer or basic exercises more than 5 days requires evaluation."
        },
        sudden_onset_back_pain: {
            refer: "Tertiary health care center",
            message: "Could be disk involvement."
        },
        numbness_or_tingling_of_legs_or_hands: {
            refer: "Tertiary health care center",
            message: "Could be disk involvement."
        },
        weakness_in_the_legs_or_hands: {
            refer: "Tertiary health care center",
            message: "Could be disk involvement."
        },
        any_bowel_or_bladder_dysfunction: {
            refer: "Tertiary health care center",
            message: "Could be disk involvement."
        },
        any_abnormal_gait: {
            refer: "Tertiary health care center",
            message: "Could be disk involvement."
        },
        any_fever_or_unexplained_weight_loss: {
            refer: "Tertiary health care center",
            message: "Rule out secondary malignancy."
        },
        any_history_of_trauma_or_fall: {
            refer: "Tertiary health care center",
            message: "Will need further investigation."
        },
        none_back_neck_pain: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    if (frm.doc[fieldname]) {
        if (fieldname !== "none_back_neck_pain") {
            let info = red_flags[fieldname];
            if (info) {
                frappe.msgprint({
                    title: "Red Flag Warning",
                    message: "Refer to: " + info.refer + "<br>Note: " + info.message,
                    indicator: "red"
                });
            }
        }
    }
}

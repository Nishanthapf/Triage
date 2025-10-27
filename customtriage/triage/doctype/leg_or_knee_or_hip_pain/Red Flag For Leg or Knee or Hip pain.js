frappe.ui.form.on('Leg or Knee or Hip pain', {
    refresh(frm) {
        // Initialize form by triggering visibility and section toggles
        console.log("Script loaded"); // Debugging
        frm.trigger("toggle_pain_field");
        frm.trigger("toggle_sections");
    },

    // Red flag checkboxes → trigger red flags and control leg_or_knee_or_hip_pain visibility
    leg_knee_hip_pain(frm) {
        show_red_flag(frm, 'leg_knee_hip_pain');
        frm.trigger("toggle_pain_field");
    },
    sever_sweeling_or_redness_of_the_affected_joint(frm) {
        show_red_flag(frm, 'sever_sweeling_or_redness_of_the_affected_joint');
        frm.trigger("toggle_pain_field");
    },
    numbness_or_tingling_of_legs(frm) {
        show_red_flag(frm, 'numbness_or_tingling_of_legs');
        frm.trigger("toggle_pain_field");
    },
    weakness_in_the_legs(frm) {
        show_red_flag(frm, 'weakness_in_the_legs');
        frm.trigger("toggle_pain_field");
    },
    any_bowel_or_bladder_dysfunction(frm) {
        show_red_flag(frm, 'any_bowel_or_bladder_dysfunction');
        frm.trigger("toggle_pain_field");
    },
    any_abnormal_gait(frm) {
        show_red_flag(frm, 'any_abnormal_gait');
        frm.trigger("toggle_pain_field");
    },
    any_fever_or_unexplained_weight_loss(frm) {
        show_red_flag(frm, 'any_fever_or_unexplained_weight_loss');
        frm.trigger("toggle_pain_field");
    },
    any_history_of_trauma_or_fall(frm) {
        show_red_flag(frm, 'any_history_of_trauma_or_fall');
        frm.trigger("toggle_pain_field");
    },
    not_able_to_move_affected_part(frm) {
        show_red_flag(frm, 'not_able_to_move_affected_part');
        frm.trigger("toggle_pain_field");
    },
    change_in_vital_signs_with_these_pains(frm) {
        show_red_flag(frm, 'change_in_vital_signs_with_these_pains');
        frm.trigger("toggle_pain_field");
    },
    none_leg_knee_hip_pain(frm) {
        show_red_flag(frm, 'none_leg_knee_hip_pain');
        frm.trigger("toggle_pain_field");
    },

    // Select field → controls section visibility
    leg_or_knee_or_hip_pain(frm) {
        frm.trigger("toggle_sections");
    },

    // Helper: Show leg_or_knee_or_hip_pain field if any red flag condition is met
    toggle_pain_field(frm) {
        let show = (
            frm.doc.leg_knee_hip_pain ||
            frm.doc.sever_sweeling_or_redness_of_the_affected_joint ||
            frm.doc.numbness_or_tingling_of_legs ||
            frm.doc.weakness_in_the_legs ||
            frm.doc.any_bowel_or_bladder_dysfunction ||
            frm.doc.any_abnormal_gait ||
            frm.doc.any_fever_or_unexplained_weight_loss ||
            frm.doc.any_history_of_trauma_or_fall ||
            frm.doc.not_able_to_move_affected_part ||
            frm.doc.change_in_vital_signs_with_these_pains ||
            frm.doc.none_leg_knee_hip_pain
        );

        // Show/hide the leg_or_knee_or_hip_pain field
        frm.toggle_display("leg_or_knee_or_hip_pain", show);

        // Set label and options dynamically
        if (show) {
            frm.set_df_property("leg_or_knee_or_hip_pain", "label", "Still want to continue with Clinical Template?");
            frm.set_df_property("leg_or_knee_or_hip_pain", "options", ["Yes", "No"]);
        } else {
            frm.set_value("leg_or_knee_or_hip_pain", "");
        }
    },

    // Helper: Show all form sections if "Yes" is selected in leg_or_knee_or_hip_pain
    toggle_sections(frm) {
        let show_sections = (frm.doc.leg_or_knee_or_hip_pain === "Yes");

        // Toggle visibility of section breaks
        frm.toggle_display("section_break_evkf", show_sections);
        frm.toggle_display("knee_pain_section", show_sections);
        frm.toggle_display("section_break_dkpy", show_sections);
        frm.toggle_display("section_break_rltt", show_sections);
        frm.toggle_display("section_break_evsg", show_sections);

        // Toggle visibility of section completion checkboxes
        frm.toggle_display("check_nuqq", show_sections);
        frm.toggle_display("check_pwti", show_sections);
        frm.toggle_display("check_hftr", show_sections);
        frm.toggle_display("check_uydi", show_sections);
        frm.toggle_display("check_ymqq", show_sections);
    },

    // Validation before save → Ensure all sections are completed if "Yes" is selected
    validate(frm) {
        if (frm.doc.leg_or_knee_or_hip_pain === "Yes") {
            if (!frm.doc.check_nuqq) {
                frappe.throw("You didn’t complete Present Complaints Section");
            }
            if (!frm.doc.check_pwti) {
                frappe.throw("You didn’t complete Knee Pain Section");
            }
            if (!frm.doc.check_hftr) {
                frappe.throw("You didn’t complete Hip Pain Section");
            }
            if (!frm.doc.check_uydi) {
                frappe.throw("You didn’t complete Following Symptoms Section");
            }
            if (!frm.doc.check_ymqq) {
                frappe.throw("You didn’t complete Past and Family History Section");
            }
        }
    }
});

// Function to show red flag messages
function show_red_flag(frm, fieldname) {
    const red_flags = {
        leg_knee_hip_pain: {
            refer: "Health centre/PHC/CHC",
            message: "Any foot and ankle pain not subsiding with pain killer or basic exercises more than 5 days."
        },
        sever_sweeling_or_redness_of_the_affected_joint: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        numbness_or_tingling_of_legs: {
            refer: "Tertiary health care center",
            message: "Could indicate nerve involvement, needs further investigations."
        },
        weakness_in_the_legs: {
            refer: "Tertiary health care center",
            message: "Could indicate neurological or muscular issues, needs further investigations."
        },
        any_bowel_or_bladder_dysfunction: {
            refer: "Tertiary health care center",
            message: "Could indicate serious spinal or neurological issues, needs urgent evaluation."
        },
        any_abnormal_gait: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        any_fever_or_unexplained_weight_loss: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        any_history_of_trauma_or_fall: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        not_able_to_move_affected_part: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        change_in_vital_signs_with_these_pains: {
            refer: "Tertiary health care center",
            message: "Could be fracture or dislocation, needs further investigations."
        },
        none_leg_knee_hip_pain: {
            refer: "No referral needed",
            message: "No critical symptoms detected."
        }
    };

    let condition_met = frm.doc[fieldname];

    if (condition_met && fieldname !== "none_leg_knee_hip_pain") {
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
